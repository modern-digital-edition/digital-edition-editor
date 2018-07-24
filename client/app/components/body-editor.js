import Component from '@ember/component'
import {Schema} from "prosemirror-model"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap, setBlockType, toggleMark} from "prosemirror-commands"

export default Component.extend({
    classNames: ['tei-body-editor', 'full-height'],

    block_types: [
        {key: 'main_heading', label: 'Heading 1'},
        {key: 'sub_heading', label: 'Heading 2'},
        {key: 'paragraph', label: 'Paragraph'},
        {key: 'paragraph_no_indent', label: 'Paragraph (no Indent)'},
    ],
    selected_block_type: null,
    mark_types: [
        {key: '', label: ''},
        {key: 'page_number', label: 'Page Number'},
        {key: 'invert_font_family', label: 'Font Highlight'},
        {key: 'letter_sparse', label: 'Sparse Lettering'},
        {key: 'sup', label: 'Superscript'},
    ],
    selected_mark_types: null,

    didInsertElement() {
        this._super(...arguments);

        let schema = new Schema({
            nodes: {
                doc: {
                    content: 'block+'
                },
                main_heading: {
                    group: 'block',
                    content: 'inline*',
                    toDOM() {return ['h1', 0]},
                    parseDOM: [{tag: 'h1'}]
                },
                sub_heading: {
                    group: 'block',
                    content: 'inline*',
                    toDOM() {return ['h2', 0]},
                    parseDOM: [{tag: 'h2'}]
                },
                paragraph_no_indent: {
                    group: 'block',
                    content: 'inline*',
                    toDOM() {return ['p', {class: 'no-indent'}, 0]},
                    parseDOM: [{tag: 'p.no-indent'}]
                },
                paragraph: {
                    group: 'block',
                    content: 'inline*',
                    toDOM() {return ['p', 0]},
                    parseDOM: [{tag: 'p'}]
                },
                text: {
                    group: 'inline',
                    inline: true
                }
            },
            marks: {
                page_number: {
                    inclusive: true,
                    toDOM() {return ['span', {class: 'page-number'}, 0]},
                    parseDOM: [{tag: 'span.page-number'}]
                },
                invert_font_family: {
                    toDOM() {return ['span', {class: 'invert-font-family'}, 0]},
                    parseDOM: [{tag: 'span.invert-font-family'}]
                },
                letter_sparse: {
                    toDOM() {return ['span', {class: 'letter-sparse'}, 0]},
                    parseDOM: [{tag: 'span.letter-sparse'}]
                },
                sup: {
                    toDOM() {return ['sup', 0]},
                    parseDOM: [{tag: 'sup'}]
                }
            }
        })
        this.set('editor-schema', schema)

        let state = EditorState.create({
            schema,
            doc: schema.nodeFromJSON(this.get('body')),
            plugins: [
                history(),
                keymap({
                    'Mod-z': undo,
                    'Mod-y': redo
                }),
                keymap(baseKeymap),
                keymap({
                    'Ctrl-1': setBlockType(schema.nodes.main_heading),
                    'Ctrl-2': setBlockType(schema.nodes.sub_heading),
                    'Ctrl-3': setBlockType(schema.nodes.paragraph)
                })
            ]
        })

        let component = this;
        let view = new EditorView(this.element.querySelector('.editor'), {
            state,
            dispatchTransaction(transaction) {
                let new_state = view.state.apply(transaction)
                let selection = new_state.selection
                for(let idx = 0; idx < selection.$anchor.path.length; idx++) {
                    if(typeof(selection.$anchor.path[idx]) === 'object') {
                        let node_type = selection.$anchor.path[idx].type
                        if(node_type.name !== 'doc' && node_type.isBlock) {
                            component.set('selected_block_type', node_type.name)
                        }
                    }
                }
                // Calculate which marks are currently selected
                let selected_marks = []
                if(selection.from === selection.to) {
                    // Get marks at the current cursor position
                    new_state.doc.nodeAt(selection.from).marks.forEach((mark) => {
                        if(selected_marks.indexOf(mark.type.name) === -1) {
                            selected_marks.push(mark.type.name)
                        }
                    })
                    // Add marks from the previous cursor position if they are inclusive
                    new_state.doc.nodeAt(selection.from - 1).marks.forEach((mark) => {
                        if(mark.type.spec.inclusive && selected_marks.indexOf(mark.type.name) === -1) {
                            selected_marks.push(mark.type.name)
                        }
                    })
                    // Add stored marks
                    if(new_state.storedMarks) {
                        new_state.storedMarks.forEach((mark) => {
                            if(selected_marks.indexOf(mark.type.name) === -1) {
                                selected_marks.push(mark.type.name)
                            }
                        })
                    }
                } else {
                    // Add all marks between the selection markers
                    new_state.doc.nodesBetween(selection.from, selection.to, (node) => {
                        node.marks.forEach((mark) => {
                            if(selected_marks.indexOf(mark.type.name) === -1) {
                                selected_marks.push(mark.type.name)
                            }
                        })
                    })
                }
                component.set('selected_mark_types', selected_marks)
                view.updateState(new_state)
                component.set('body', new_state.doc.toJSON())
            }
        })
        this.set('editor-view', view)
    },

    willDestroyElement() {
        this.get('editor-view').destroy()
    },

    actions: {
        'set-block-type'(value) {
            this.set('selected_block_type', value)
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            setBlockType(schema.nodes[value])(view.state, view.dispatch)
        },
        'toggle-mark'(value) {
            this.set('selected_inline_type', value)
            let view = this.get('editor-view')
            let schema = this.get('editor-schema')
            view.focus()
            toggleMark(schema.marks[value])(view.state, view.dispatch)
        }
    }
});
