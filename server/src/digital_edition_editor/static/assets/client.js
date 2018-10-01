'use strict';



;define('client/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.JSONAPIAdapter.extend({
        session: Ember.inject.service(),
        headers: Ember.computed('session.data.authenticated.token', function () {
            return {
                'Authorization': 'Bearer ' + this.session.data.authenticated.token
            };
        })
    });
});
;define('client/app', ['exports', 'client/resolver', 'ember-load-initializers', 'client/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('client/authenticators/local', ['exports', 'ember-simple-auth/authenticators/base'], function (exports, _base) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _base.default.extend({
        store: Ember.inject.service(),

        restore(data) {
            let authenticator = this;
            data = data || {};
            return new Ember.RSVP.Promise((resolve, reject) => {
                if (data.token) {
                    authenticator.store.queryRecord('user', {
                        filter: {
                            token: data.token
                        }
                    }).then(data => {
                        resolve({ token: data.get('token') });
                    }).catch(data => {
                        reject();
                    });
                } else {
                    reject();
                }
            });
        },

        authenticate(username, password) {
            let authenticator = this;
            return new Ember.RSVP.Promise((resolve, reject) => {
                authenticator.store.queryRecord('user', {
                    filter: {
                        username: username,
                        password: password
                    }
                }).then(data => {
                    resolve({ token: data.get('token') });
                }).catch(data => {
                    reject('Username or password incorrect or unknown');
                });
            });
        }
    });
});
;define('client/components/accordion-item', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        classNameBindings: ['is_active:is-active'],

        actions: {
            toggle: function () {
                this.set('is_active', !this.get('is_active'));
            }
        }
    });
});
;define("client/components/body-editor", ["exports", "prosemirror-model", "prosemirror-state", "prosemirror-view", "prosemirror-history", "prosemirror-keymap", "prosemirror-commands", "client/utils/prosemirror-editor"], function (exports, _prosemirrorModel, _prosemirrorState, _prosemirrorView, _prosemirrorHistory, _prosemirrorKeymap, _prosemirrorCommands, _prosemirrorEditor) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    function paragraph_attrs_to_class(node) {
        let classes = [];
        if (node.attrs.no_indent) {
            classes.push('no-indent');
        }
        if (node.attrs.text_align === 'center') {
            classes.push('text-center');
        } else if (node.attrs.text_align === 'right') {
            classes.push('text-right');
        }
        if (classes.length > 0) {
            return classes.join(' ');
        } else {
            return null;
        }
    }

    function paragraph_class_to_attrs(dom) {
        let attrs = {
            no_indent: False,
            text_align: 'left'
        };
        if (dom.class) {
            if (dom.class.indexOf('no-indent') >= 0) {
                attrs.no_indent = true;
            }
            if (dom.class.indexOf('text-center') >= 0) {
                attrs.text_align = 'center';
            } else if (dom.class.indexOf('text-right') >= 0) {
                attrs.text_align = 'right';
            }
        }
        return attrs;
    }

    exports.default = Ember.Component.extend({
        classNames: ['tei-body-editor', 'full-height'],

        menu: undefined,

        didInsertElement() {
            this._super(...arguments);

            let menu = [{
                id: 'block',
                title: 'Current Block',
                items: [{
                    id: 'heading_level_1',
                    title: 'Heading 1',
                    action: 'select-block-type'
                }, {
                    id: 'heading_level_2',
                    title: 'Heading 2',
                    action: 'select-block-type'
                }, {
                    id: 'paragraph',
                    title: 'Paragraph',
                    action: 'select-block-type'
                }]
            }, {
                id: 'block_styling',
                title: 'Block Styling',
                items: [{
                    id: 'no_indent',
                    title: 'No indentation',
                    action: 'toggle-block-attr'
                }, {
                    id: 'text_align_left',
                    title: 'Left align',
                    action: 'set-block-attr'
                }, {
                    id: 'text_align_center',
                    title: 'Center align',
                    action: 'set-block-attr'
                }, {
                    id: 'text_align_right',
                    title: 'Right align',
                    action: 'set-block-attr'
                }]
            }, {
                id: 'font_size',
                title: 'Font Size',
                items: [{
                    id: 'default',
                    title: 'Normal',
                    action: 'set-font-size'
                }, {
                    id: 'font_size_small',
                    title: 'Small',
                    action: 'set-font-size'
                }, {
                    id: 'font_size_medium',
                    title: 'Medium',
                    action: 'set-font-size'
                }, {
                    id: 'font_size_large',
                    title: 'Large',
                    action: 'set-font-size'
                }]
            }, {
                id: 'inline',
                title: 'Inline Styles',
                items: [{
                    id: 'font_weight_bold',
                    title: 'Bold',
                    action: 'toggle-mark'
                }, {
                    id: 'page_break',
                    title: 'Page Break',
                    action: 'toggle-mark'
                }, {
                    id: 'sup',
                    title: 'Superscript',
                    action: 'toggle-mark'
                }, {
                    id: 'letter_sparse',
                    title: 'Sparse lettering',
                    action: 'toggle-mark'
                }, {
                    id: 'foreign_language',
                    title: 'Foreign Language',
                    action: 'toggle-mark'
                }]
            }];
            this.set('menu', menu);

            let schema = new _prosemirrorModel.Schema({
                nodes: {
                    doc: {
                        content: 'block+'
                    },
                    paragraph: {
                        group: 'block',
                        content: 'inline*',
                        attrs: {
                            no_indent: {
                                default: false
                            },
                            text_align: {
                                default: 'left'
                            }
                        },
                        toDOM(node) {
                            return ['p', { class: paragraph_attrs_to_class(node) }, 0];
                        },
                        parseDOM: [{ tag: 'p', paragraph_class_to_attrs }]
                    },
                    heading: {
                        group: 'block',
                        content: 'inline*',
                        attrs: {
                            level: {
                                default: 1
                            }
                        },
                        defining: true,
                        toDOM(node) {
                            return ['h' + node.attrs.level, 0];
                        },
                        parseDOM: [{ tag: "h1", attrs: { level: 1 } }, { tag: "h2", attrs: { level: 2 } }]
                    },
                    text: {
                        group: 'inline',
                        inline: true
                    }
                },
                marks: {
                    foreign_language: {
                        toDOM() {
                            return ['span', { class: 'foreign-language' }, 0];
                        },
                        parseDOM: [{ tag: 'span.foreign-language' }]
                    },
                    letter_sparse: {
                        toDOM() {
                            return ['span', { class: 'letter-sparse' }, 0];
                        },
                        parseDOM: [{ tag: 'span.letter-sparse' }]
                    },
                    sup: {
                        toDOM() {
                            return ['sup', 0];
                        },
                        parseDOM: [{ tag: 'sup' }]
                    },
                    font_size_large: {
                        toDOM() {
                            return ['span', { class: 'font-size-large' }, 0];
                        },
                        parseDOM: [{ tag: 'span.font-size-large' }]
                    },
                    font_size_medium: {
                        toDOM() {
                            return ['span', { class: 'font-size-medium' }, 0];
                        },
                        parseDOM: [{ tag: 'span.font-size-medium' }]
                    },
                    font_size_small: {
                        toDOM() {
                            return ['span', { class: 'font-size-small' }, 0];
                        },
                        parseDOM: [{ tag: 'span.font-size-small' }]
                    },
                    page_break: {
                        toDOM() {
                            return ['span', { class: 'page-break' }, 0];
                        },
                        parseDOM: [{ tag: 'span.page-break' }]
                    },
                    font_weight_bold: {
                        toDOM() {
                            return ['span', { class: 'font-weight-bold' }, 0];
                        },
                        parseDOM: [{ tag: 'span.font-weight-bold' }]
                    }
                }
            });
            this.set('editor-schema', schema);

            let state = _prosemirrorState.EditorState.create({
                schema,
                doc: schema.nodeFromJSON(this.get('body')),
                plugins: [(0, _prosemirrorHistory.history)(), (0, _prosemirrorKeymap.keymap)({
                    'Mod-z': _prosemirrorHistory.undo,
                    'Mod-y': _prosemirrorHistory.redo
                }), (0, _prosemirrorKeymap.keymap)(_prosemirrorCommands.baseKeymap)]
            });

            let component = this;
            let view = new _prosemirrorView.EditorView(this.element.querySelector('.editor'), {
                state,
                dispatchTransaction(transaction) {
                    let new_state = view.state.apply(transaction);
                    // Calculate which block types are currently selected
                    component.setMenuState('block.heading_level_1', { is_active: false });
                    component.setMenuState('block.heading_level_2', { is_active: false });
                    component.setMenuState('block.paragraph', { is_active: false });
                    component.setMenuState('block_styling.no_indent', { is_active: false });
                    component.setMenuState('block_styling.text_align_left', { is_active: false });
                    component.setMenuState('block_styling.text_align_center', { is_active: false });
                    component.setMenuState('block_styling.text_align_right', { is_active: false });
                    let blocks = (0, _prosemirrorEditor.getBlockHierarchy)(new_state);
                    blocks.forEach(node => {
                        if (node.type.isBlock) {
                            component.setMenuState('block.' + node.type.name, { is_active: true });
                            component.setMenuState('block.' + node.type.name + '_level_' + node.attrs.level, { is_active: true });
                            if (node.type.name === 'paragraph') {
                                component.setMenuState('block_styling.no_indent', { is_active: node.attrs.no_indent });
                                if (node.attrs.text_align === 'left') {
                                    component.setMenuState('block_styling.text_align_left', { is_active: true });
                                } else if (node.attrs.text_align === 'center') {
                                    component.setMenuState('block_styling.text_align_center', { is_active: true });
                                } else if (node.attrs.text_align === 'right') {
                                    component.setMenuState('block_styling.text_align_right', { is_active: true });
                                }
                            }
                        } else {
                            component.setMenuState('inline.' + node.type.name, { is_active: true });
                        }
                    });
                    // Calculate which marks are currently selected
                    let selected_marks = (0, _prosemirrorEditor.getActiveMarks)(new_state);
                    component.setMenuState('font_size.default', { is_active: true });
                    component.setMenuState('font_size.font_size_small', { is_active: false });
                    component.setMenuState('font_size.font_size_medium', { is_active: false });
                    component.setMenuState('font_size.font_size_large', { is_active: false });
                    component.setMenuState('inline.sup', { is_active: false });
                    component.setMenuState('inline.letter_sparse', { is_active: false });
                    component.setMenuState('inline.foreign_language', { is_active: false });
                    component.setMenuState('inline.page_break', { is_active: false });
                    for (let idx = 0; idx < selected_marks.length; idx++) {
                        let mark = selected_marks[idx];
                        if (mark.indexOf('font_size_') === 0) {
                            component.setMenuState('font_size.default', { is_active: false });
                            component.setMenuState('font_size.' + mark, { is_active: true });
                        } else if (mark === 'page_break') {
                            component.setMenuState('inline.page_break', { is_active: true });
                        } else {
                            component.setMenuState('inline.' + mark, { is_active: true });
                        }
                    }
                    view.updateState(new_state);
                    component.set('body', new_state.doc.toJSON());
                }
            });
            this.set('editor-view', view);
        },

        willDestroyElement() {
            this.get('editor-view').destroy();
        },

        setMenuState(path, attrs) {
            let menu = this.get('menu');
            function recursive_find(items, subpath) {
                let found = false;
                for (let idx = 0; idx < items.length; idx++) {
                    if (items[idx].id === subpath[0]) {
                        found = true;
                        if (subpath.length > 1 && items[idx].items) {
                            let tmp = recursive_find(items[idx].items, subpath.slice(1));
                            if (tmp !== null) {
                                tmp.splice(0, 0, idx, 'items');
                            }
                            return tmp;
                        } else if (subpath.length === 1) {
                            return [idx];
                        } else {
                            return null;
                        }
                    }
                }
                if (!found) {
                    return null;
                }
            }
            let set_path = recursive_find(menu, path.split('.'));
            if (set_path !== null) {
                set_path = set_path.join('.');
                let keys = Object.keys(attrs);
                for (let idx = 0; idx < keys.length; idx++) {
                    menu.set(set_path + '.' + keys[idx], attrs[keys[idx]]);
                }
            }
        },

        getMenuState(path) {
            let menu = this.get('menu');
            function recursive_find(items, subpath) {
                let found = false;
                for (let idx = 0; idx < items.length; idx++) {
                    if (items[idx].id === subpath[0]) {
                        found = true;
                        if (subpath.length > 1 && items[idx].items) {
                            let tmp = recursive_find(items[idx].items, subpath.slice(1));
                            if (tmp !== null) {
                                tmp.splice(0, 0, idx, 'items');
                            }
                            return tmp;
                        } else if (subpath.length === 1) {
                            return [idx];
                        } else {
                            return null;
                        }
                    }
                }
                if (!found) {
                    return null;
                }
            }
            let get_path = recursive_find(menu, path.split('.'));
            if (get_path !== null) {
                get_path = get_path.join('.');
                return menu.get(get_path);
            } else {
                return null;
            }
        },

        actions: {
            'select-block-type': function (param) {
                let view = this.get('editor-view');
                let schema = this.get('editor-schema');
                view.focus();
                if (param === 'paragraph') {
                    (0, _prosemirrorCommands.setBlockType)(schema.nodes[param], { no_indent: false })(view.state, view.dispatch);
                } else if (param === 'heading_level_1') {
                    (0, _prosemirrorCommands.setBlockType)(schema.nodes['heading'], { level: 1 })(view.state, view.dispatch);
                } else if (param === 'heading_level_2') {
                    (0, _prosemirrorCommands.setBlockType)(schema.nodes['heading'], { level: 2 })(view.state, view.dispatch);
                }
            },
            'toggle-mark': function (param) {
                let view = this.get('editor-view');
                let schema = this.get('editor-schema');
                view.focus();
                (0, _prosemirrorCommands.toggleMark)(schema.marks[param])(view.state, view.dispatch);
            },
            'set-font-size': function (param) {
                let view = this.get('editor-view');
                let schema = this.get('editor-schema');
                view.focus();
                let marks = (0, _prosemirrorEditor.getActiveMarks)(view.state);
                marks.forEach(mark => {
                    if (mark.indexOf('font_size_') === 0) {
                        (0, _prosemirrorCommands.toggleMark)(schema.marks[mark])(view.state, view.dispatch);
                    }
                });
                if (param.indexOf('font_size_') === 0) {
                    (0, _prosemirrorCommands.toggleMark)(schema.marks[param])(view.state, view.dispatch);
                }
            },
            'toggle-block-attr': function (param) {
                let view = this.get('editor-view');
                let schema = this.get('editor-schema');
                view.focus();
                let { $from } = view.state.selection;
                if ($from.parent.type.name === 'paragraph') {
                    let attrs = {
                        no_indent: $from.parent.attrs.no_indent,
                        text_align: $from.parent.attrs.text_align
                    };
                    if (param === 'no_indent') {
                        attrs.no_indent = !attrs.no_indent;
                    }
                    (0, _prosemirrorCommands.setBlockType)(schema.nodes['paragraph'], attrs)(view.state, view.dispatch);
                }
            },
            'set-block-attr': function (param) {
                let view = this.get('editor-view');
                let schema = this.get('editor-schema');
                view.focus();
                let { $from } = view.state.selection;
                if ($from.parent.type.name === 'paragraph') {
                    let attrs = {
                        no_indent: $from.parent.attrs.no_indent,
                        text_align: $from.parent.attrs.text_align
                    };
                    if (param === 'text_align_left') {
                        attrs.text_align = 'left';
                    } else if (param === 'text_align_center') {
                        attrs.text_align = 'center';
                    } else if (param === 'text_align_right') {
                        attrs.text_align = 'right';
                    }
                    (0, _prosemirrorCommands.setBlockType)(schema.nodes['paragraph'], attrs)(view.state, view.dispatch);
                }
            }
        }
    });
});
;define('client/components/dropdown-menu-item', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        tagName: 'li',
        classNameBindings: ['has_children:is-dropdown-submenu-parent', 'is_nested:is-submenu-item', 'is_nested:is-dropdown-submenu-item', 'has_children:opens-right', 'item.is_active:is-active'],
        is_focus: false,
        has_children: false,
        is_nested: false,

        didReceiveAttrs() {
            this._super(...arguments);
            this.set('has_children', this.get('item.items') !== undefined);
        },
        mouseEnter() {
            this.set('is_focus', true);
        },
        mouseLeave() {
            this.set('is_focus', false);
        },
        actions: {
            select() {
                if (this.get('item.action')) {
                    this.get('onaction')(this.get('item.action'), this.get('item.id'));
                }
            }
        }
    });
});
;define('client/components/dropdown-menu', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        tagName: 'ul',
        classNames: ['menu'],
        classNameBindings: ['dropdown', 'submenu', 'isDropdownSubmenu', 'vertical', 'is_focus:is-visible'],
        dropdown: false,
        submenu: false,
        isDropdownSubmenu: false,
        vertical: false,
        is_focus: false,
        is_nested: false,

        didReceiveAttrs() {
            this._super(...arguments);
            if (this.is_nested) {
                this.set('submenu', true);
                this.set('isDropdownSubmenu', true);
                this.set('vertical', true);
            } else {
                this.set('dropdown', true);
            }
        }
    });
});
;define('client/components/header-editor', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        didInsertElement() {
            this._super(...arguments);

            let fields = [{
                'title': 'Publication',
                'items': [{
                    'type': 'single',
                    'title': 'Title',
                    'field': 'title'
                }, {
                    'type': 'single',
                    'title': 'Author',
                    'field': 'author'
                }, {
                    'type': 'single',
                    'title': 'Published',
                    'field': 'published'
                }, {
                    'type': 'multiple',
                    'schema': {
                        'items': [{
                            'type': 'single',
                            'title': 'Publication Date (machine-readable)',
                            'field': 'pub_date.machine'
                        }, {
                            'type': 'single',
                            'title': 'Publication Date (human-readable)',
                            'field': 'pub_date.human'
                        }]
                    }
                }, {
                    'type': 'single',
                    'title': 'Category',
                    'field': 'category'
                }]
            }, {
                'title': 'Editors',
                'items': [{
                    'type': 'list',
                    'field': 'editors',
                    'schema': {
                        'type': 'multiple',
                        'items': [{
                            'title': 'Identifier',
                            'field': 'identifier'
                        }, {
                            'title': 'Name',
                            'field': 'name'
                        }, {
                            'title': 'Responsible for',
                            'field': 'resp'
                        }]
                    }
                }]
            }, {
                'title': 'History',
                'items': [{
                    'type': 'list',
                    'field': 'history',
                    'schema': {
                        'type': 'multiple',
                        'items': [{
                            'title': 'Changed by',
                            'field': 'who'
                        }, {
                            'title': 'Changed on',
                            'field': 'when'
                        }, {
                            'title': 'Description',
                            'field': 'change'
                        }]
                    }
                }]
            }];
            this.set('fields', fields);
        },

        actions: {
            'update-field': function (field, ev) {
                let model = this.get('model');
                let header = model.get('header');
                Ember.set(header, field, ev.target.value);
                model.set('header', Object.assign({}, header));
            },
            'update-list-field': function (field, idx, sub_field, ev) {
                let model = this.get('model');
                let header = model.get('header');
                Ember.set(header, field + '.' + idx + '.' + sub_field, ev.target.value);
                model.set('header', Object.assign({}, header));
            }
        }
    });
});
;define('client/components/tabs-panel', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        classNames: ['tabs-panel', 'full-height'],
        classNameBindings: ['tab.is_active:is-active'],
        tab: Ember.computed('tabs', 'idx', function () {
            return this.get('tabs.' + this.get('idx'));
        })
    });
});
;define('client/components/tabs-title', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Component.extend({
        tagName: 'ul',
        classNames: ['tabs'],

        actions: {
            'select-tab': function (tab) {
                let tabs = this.get('tabs');
                tabs.forEach(old_tab => {
                    Ember.set(old_tab, 'is_active', false);
                });
                Ember.set(tab, 'is_active', true);
            }
        }
    });
});
;define('client/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('client/controllers/editor', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        selected_repository: null,
        selected_file: null,
        file_component: Ember.inject.controller('editor.file'),
        session: Ember.inject.service(),

        actions: {
            select_repository: function (repository_id) {
                this.transitionToRoute('editor.repository', repository_id);
            },
            reset_file: function () {
                window.location.reload();
            },
            save_file: function () {
                this.get('selected_file').save();
            },
            logout: function () {
                let controller = this;
                this.get('session').invalidate().then(() => {
                    controller.transitionToRoute('editor');
                });
            }
        }
    });
});
;define('client/controllers/editor/file', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        selected_metadata_node: null,
        tabs: null,

        init() {
            this._super(...arguments);
            this.set('tabs', [{
                title: 'Content',
                is_active: true
            }, {
                title: 'Metadata'
            }]);
        },

        actions: {
            'select-tab-panel': function (target, ev) {
                ev.preventDefault();
                var panel_root = ev.target.parentElement.parentElement.parentElement.parentElement;
                panel_root.querySelectorAll('.tabs-title.is-active').forEach(function (item) {
                    item.classList.remove('is-active');
                    item.querySelector('a').removeAttribute('aria-selected');
                });
                panel_root.querySelectorAll('.tabs-panel.is-active').forEach(function (item) {
                    item.classList.remove('is-active');
                });
                ev.target.parentElement.classList.add('is-active');
                ev.target.setAttribute('aria-selected', 'true');
                panel_root.querySelector(target + '.tabs-panel').classList.add('is-active');
            }
        }
    });
});
;define('client/controllers/editor/files', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        actions: {
            'select-file': function (rid, fid) {
                this.transitionToRoute('editor.file', rid, fid);
            }
        }
    });
});
;define('client/controllers/editor/repositories', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        actions: {
            'select-repository': function (rid) {
                this.transitionToRoute('editor.repository', rid);
            }
        }
    });
});
;define('client/controllers/editor/repository', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        button_text: 'Synchronise changes',
        button_class: 'button',
        selected_file: null,
        actions: {
            synchronise: function () {
                this.set('button_text', 'Synchronisation running...');
                this.set('button_class', 'button secondary');
                let controller = this;
                this.get('model').save().then(() => {
                    controller.set('button_text', 'Synchronisation complete');
                    this.set('button_class', 'button success');
                }).catch(() => {
                    controller.set('button_text', 'Synchronisation failed');
                    this.set('button_class', 'button alert');
                });
            }
        }
    });
});
;define('client/controllers/users/login', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({
        session: Ember.inject.service(),
        username: 'mhall',
        password: 'test',

        actions: {
            login() {
                let controller = this;
                let username = this.get('username');
                let password = this.get('password');
                this.set('errorMessage', null);
                if (username && password) {
                    this.get('session').authenticate('authenticator:local', username, password).then(() => {
                        controller.transitionToRoute('editor');
                    }).catch(reason => {
                        controller.set('errorMessage', reason.error || reason);
                    });
                } else {
                    if (!username && !password) {
                        this.set('errorMessage', 'Please provide a username and password');
                    } else if (!username) {
                        this.set('errorMessage', 'Please provide a username');
                    } else {
                        this.set('errorMessage', 'Please provide a password');
                    }
                }
            }
        }
    });
});
;define('client/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
;define('client/helpers/app-version', ['exports', 'client/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('client/helpers/array-contains', ['exports', 'ember-array-contains-helper/helpers/array-contains'], function (exports, _arrayContains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _arrayContains.default;
    }
  });
  Object.defineProperty(exports, 'arrayContains', {
    enumerable: true,
    get: function () {
      return _arrayContains.arrayContains;
    }
  });
});
;define('client/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
;define('client/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
;define('client/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
;define('client/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
;define('client/helpers/is-empty', ['exports', 'ember-truth-helpers/helpers/is-empty'], function (exports, _isEmpty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
;define('client/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
;define('client/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
;define('client/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
;define('client/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
;define('client/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
;define('client/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
;define('client/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('client/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('client/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
;define('client/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'client/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('client/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('client/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('client/initializers/ember-simple-auth', ['exports', 'client/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service', 'ember-simple-auth/initializers/setup-session-restoration'], function (exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize(registry) {
      const config = _environment.default['ember-simple-auth'] || {};
      config.rootURL = _environment.default.rootURL || _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }
  };
});
;define('client/initializers/export-application-global', ['exports', 'client/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('client/instance-initializers/ember-data', ['exports', 'ember-data/initialize-store-service'], function (exports, _initializeStoreService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _initializeStoreService.default
  };
});
;define('client/instance-initializers/ember-simple-auth', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize() {}
  };
});
;define('client/models/file', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        filename: _emberData.default.attr('string'),
        key: _emberData.default.attr('string'),
        header: _emberData.default.attr(),
        body: _emberData.default.attr(),

        basename: Ember.computed('filename', function () {
            var filename = this.get('filename');
            if (filename.lastIndexOf('/') >= 0) {
                return filename.substring(filename.lastIndexOf('/') + 1);
            } else {
                return filename;
            }
        })
    });
});
;define('client/models/repository', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        title: _emberData.default.attr('string'),
        is_dirty: _emberData.default.attr('boolean'),
        local_changes: _emberData.default.attr(),
        tei_files: _emberData.default.attr()
    });
});
;define('client/models/user', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        username: _emberData.default.attr(),
        token: _emberData.default.attr()
    });
});
;define('client/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('client/router', ['exports', 'client/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('editor', { path: '/' }, function () {
      this.route('repositories');
      this.route('repository', { path: 'repositories/:rid' });
      this.route('files', { path: 'repositories/:rid/files' });
      this.route('file', { path: 'repositories/:rid/files/:fid' });
    });

    this.route('users', function () {
      this.route('login');
    });
  });

  exports.default = Router;
});
;define('client/routes/application', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    const { UnauthorizedError } = _emberData.default;

    exports.default = Ember.Route.extend({
        actions: {
            error(error, transition) {
                if (error instanceof UnauthorizedError) {
                    this.transitionTo('editor');
                    return;
                }
            }
        }
    });
});
;define('client/routes/editor', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('client/routes/editor/file', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function (params) {
            var route = this;
            var repository_promise = this.store.findRecord('repository', params.rid);
            repository_promise.then(function (repository) {
                route.controllerFor('editor').set('selected_repository', repository);
            });
            var file_promise = this.store.findRecord('file', params.rid + ':' + params.fid);
            file_promise.then(function (file) {
                route.controllerFor('editor').set('selected_file', file);
            });
            return file_promise;
        }
    });
});
;define('client/routes/editor/files', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function (params) {
            var model = this.store.findRecord('repository', params.rid);
            var route = this;
            model.then(function (repository) {
                route.controllerFor('editor').set('selected_repository', repository);
            });
            return model;
        }
    });
});
;define('client/routes/editor/repositories', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function () {
            return this.store.findAll('repository');
        }
    });
});
;define('client/routes/editor/repository', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model: function (params) {
            var model = this.store.findRecord('repository', params.rid);
            var route = this;
            model.then(function (repository) {
                route.controllerFor('editor').set('selected_repository', repository);
            });
            return model;
        }
    });
});
;define('client/routes/users/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
;define('client/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define('client/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _cookies) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookies.default;
});
;define('client/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
;define('client/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _adaptive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adaptive.default.extend();
});
;define("client/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8PzX6Lwz", "block": "{\"symbols\":[],\"statements\":[[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/application.hbs" } });
});
;define("client/templates/components/accordion-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PmqStIqn", "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[23,[\"is_active\"]]],null,{\"statements\":[[0,\"  \"],[7,\"a\"],[11,\"class\",\"accordion-title\"],[3,\"action\",[[22,0,[]],\"toggle\"]],[9],[1,[21,\"title\"],false],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"accordion-content\"],[11,\"style\",\"display:block;\"],[9],[0,\"\\n    \"],[14,1],[0,\"\\n  \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"a\"],[11,\"class\",\"accordion-title\"],[3,\"action\",[[22,0,[]],\"toggle\"]],[9],[1,[21,\"title\"],false],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/accordion-item.hbs" } });
});
;define("client/templates/components/body-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IGM6cqkP", "block": "{\"symbols\":[\"item\",\"action\"],\"statements\":[[7,\"div\"],[11,\"class\",\"grid-x grid-padding-x full-height\"],[9],[0,\"\\n  \"],[7,\"nav\"],[11,\"class\",\"cell medium-3 full-height auto-overflow\"],[9],[0,\"\\n    \"],[7,\"ul\"],[11,\"class\",\"accordion no-padding\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"menu\"]]],null,{\"statements\":[[4,\"accordion-item\",null,[[\"title\"],[[22,1,[\"title\"]]]],{\"statements\":[[0,\"          \"],[7,\"ul\"],[11,\"class\",\"menu vertical\"],[9],[0,\"\\n\"],[4,\"each\",[[22,1,[\"items\"]]],null,{\"statements\":[[4,\"if\",[[22,2,[\"is_active\"]]],null,{\"statements\":[[0,\"                \"],[7,\"li\"],[11,\"class\",\"is-active\"],[9],[7,\"a\"],[3,\"action\",[[22,0,[]],[22,2,[\"action\"]],[22,2,[\"id\"]]]],[9],[1,[22,2,[\"title\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                \"],[7,\"li\"],[9],[7,\"a\"],[3,\"action\",[[22,0,[]],[22,2,[\"action\"]],[22,2,[\"id\"]]]],[9],[1,[22,2,[\"title\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[2]},null],[0,\"          \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"cell auto full-height editor auto-overflow\"],[9],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/body-editor.hbs" } });
});
;define("client/templates/components/dropdown-menu-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MWJtEXol", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[23,[\"item\",\"items\"]]],null,{\"statements\":[[0,\"  \"],[7,\"a\"],[11,\"role\",\"menuitem\"],[3,\"action\",[[22,0,[]],\"select\"]],[9],[1,[23,[\"item\",\"title\"]],false],[10],[0,\"\\n  \"],[1,[27,\"dropdown-menu\",null,[[\"items\",\"is_nested\",\"is_focus\",\"onaction\"],[[23,[\"item\",\"items\"]],true,[23,[\"is_focus\"]],[23,[\"onaction\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[7,\"a\"],[11,\"role\",\"menuitem\"],[3,\"action\",[[22,0,[]],\"select\"]],[9],[1,[23,[\"item\",\"title\"]],false],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/dropdown-menu-item.hbs" } });
});
;define("client/templates/components/dropdown-menu", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YvFEjaD6", "block": "{\"symbols\":[\"item\"],\"statements\":[[4,\"each\",[[23,[\"items\"]]],null,{\"statements\":[[0,\"  \"],[1,[27,\"dropdown-menu-item\",null,[[\"item\",\"is_nested\",\"onaction\"],[[22,1,[]],[23,[\"is_nested\"]],[23,[\"onaction\"]]]]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/dropdown-menu.hbs" } });
});
;define("client/templates/components/header-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+88CtP+K", "block": "{\"symbols\":[\"group\",\"item\",\"data_item\",\"idx\",\"sub_item\",\"sub_item\"],\"statements\":[[7,\"ul\"],[11,\"class\",\"accordion\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"fields\"]]],null,{\"statements\":[[4,\"accordion-item\",null,[[\"title\"],[[22,1,[\"title\"]]]],{\"statements\":[[4,\"each\",[[22,1,[\"items\"]]],null,{\"statements\":[[4,\"if\",[[27,\"eq\",[[22,2,[\"type\"]],\"single\"],null]],null,{\"statements\":[[0,\"          \"],[7,\"label\"],[9],[1,[22,2,[\"title\"]],false],[0,\"\\n            \"],[1,[27,\"input\",null,[[\"type\",\"value\",\"change\"],[\"text\",[27,\"get\",[[23,[\"header\"]],[22,2,[\"field\"]]],null],[27,\"action\",[[22,0,[]],\"update-field\",[22,2,[\"field\"]]],null]]]],false],[0,\"\\n          \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[27,\"eq\",[[22,2,[\"type\"]],\"multiple\"],null]],null,{\"statements\":[[0,\"          \"],[7,\"div\"],[11,\"class\",\"grid-x\"],[9],[0,\"\\n\"],[4,\"each\",[[22,2,[\"schema\",\"items\"]]],null,{\"statements\":[[0,\"              \"],[7,\"div\"],[11,\"class\",\"cell auto\"],[9],[0,\"\\n                \"],[7,\"label\"],[9],[1,[22,6,[\"title\"]],false],[0,\"\\n                  \"],[1,[27,\"input\",null,[[\"type\",\"value\",\"change\"],[\"text\",[27,\"get\",[[23,[\"header\"]],[22,6,[\"field\"]]],null],[27,\"action\",[[22,0,[]],\"update-field\",[22,6,[\"field\"]]],null]]]],false],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"          \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"if\",[[27,\"eq\",[[22,2,[\"type\"]],\"list\"],null]],null,{\"statements\":[[0,\"          \"],[7,\"ul\"],[11,\"class\",\"no-indent\"],[9],[0,\"\\n\"],[4,\"each\",[[27,\"get\",[[23,[\"header\"]],[22,2,[\"field\"]]],null]],null,{\"statements\":[[4,\"if\",[[27,\"eq\",[[22,2,[\"schema\",\"type\"]],\"multiple\"],null]],null,{\"statements\":[[0,\"                \"],[7,\"li\"],[11,\"class\",\"grid-x\"],[9],[0,\"\\n\"],[4,\"each\",[[22,2,[\"schema\",\"items\"]]],null,{\"statements\":[[0,\"                    \"],[7,\"div\"],[11,\"class\",\"cell auto\"],[9],[0,\"\\n                      \"],[7,\"label\"],[9],[1,[22,5,[\"title\"]],false],[0,\"\\n                        \"],[1,[27,\"input\",null,[[\"type\",\"value\",\"change\"],[\"text\",[27,\"get\",[[22,3,[]],[22,5,[\"field\"]]],null],[27,\"action\",[[22,0,[]],\"update-list-field\",[22,2,[\"field\"]],[22,4,[]],[22,5,[\"field\"]]],null]]]],false],[0,\"\\n                      \"],[10],[0,\"\\n                    \"],[10],[0,\"\\n\"]],\"parameters\":[5]},null],[0,\"                \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[3,4]},null],[0,\"          \"],[10],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[2]},null]],\"parameters\":[]},null]],\"parameters\":[1]},null],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/header-editor.hbs" } });
});
;define("client/templates/components/tabs-panel", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "xnMvggZc", "block": "{\"symbols\":[\"&default\"],\"statements\":[[14,1]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/tabs-panel.hbs" } });
});
;define("client/templates/components/tabs-title", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "I6CGCkmO", "block": "{\"symbols\":[\"tab\"],\"statements\":[[4,\"each\",[[23,[\"tabs\"]]],null,{\"statements\":[[4,\"if\",[[22,1,[\"is_active\"]]],null,{\"statements\":[[0,\"    \"],[7,\"li\"],[11,\"class\",\"tabs-title is-active\"],[11,\"role\",\"none\"],[9],[7,\"a\"],[11,\"role\",\"tab\"],[11,\"aria-selected\",\"true\"],[3,\"action\",[[22,0,[]],\"select-tab\",[22,1,[]]]],[9],[1,[22,1,[\"title\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"    \"],[7,\"li\"],[11,\"class\",\"tabs-title\"],[11,\"role\",\"none\"],[9],[7,\"a\"],[11,\"role\",\"tab\"],[11,\"aria-selected\",\"false\"],[3,\"action\",[[22,0,[]],\"select-tab\",[22,1,[]]]],[9],[1,[22,1,[\"title\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/components/tabs-title.hbs" } });
});
;define("client/templates/editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "BSkCevLO", "block": "{\"symbols\":[],\"statements\":[[7,\"main\"],[11,\"class\",\"grid-y grid-frame\"],[9],[0,\"\\n  \"],[7,\"nav\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"top-bar\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"top-bar-left\"],[9],[0,\"\\n        \"],[7,\"ul\"],[11,\"class\",\"menu dropdown\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n          \"],[7,\"li\"],[11,\"class\",\"menu-text\"],[9],[0,\"TEI Editor\"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"            \"],[7,\"li\"],[11,\"title\",\"Open a project from the cloud\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"editor.repositories\"],null,{\"statements\":[[0,\"                \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                  \"],[7,\"path\"],[11,\"d\",\"M13,18H14A1,1 0 0,1 15,19H22V21H15A1,1 0 0,1 14,22H10A1,1 0 0,1 9,21H2V19H9A1,1 0 0,1 10,18H11V16H4A1,1 0 0,1 3,15V11A1,1 0 0,1 4,10H20A1,1 0 0,1 21,11V15A1,1 0 0,1 20,16H13V18M4,2H20A1,1 0 0,1 21,3V7A1,1 0 0,1 20,8H4A1,1 0 0,1 3,7V3A1,1 0 0,1 4,2M9,6H10V4H9V6M9,14H10V12H9V14M5,4V6H7V4H5M5,12V14H7V12H5Z\"],[9],[10],[0,\"\\n                \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"selected_repository\"]]],null,{\"statements\":[[0,\"              \"],[7,\"li\"],[11,\"class\",\"separator\"],[9],[10],[0,\"\\n              \"],[7,\"li\"],[11,\"class\",\"menu-text\"],[9],[1,[23,[\"selected_repository\",\"title\"]],false],[10],[0,\"\\n              \"],[7,\"li\"],[11,\"title\",\"Synchronise the project with the cloud\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"editor.repository\",[23,[\"selected_repository\",\"id\"]]],null,{\"statements\":[[0,\"                  \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                    \"],[7,\"path\"],[11,\"d\",\"M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z\"],[9],[10],[0,\"\\n                  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[10],[0,\"\\n              \"],[7,\"li\"],[11,\"title\",\"Open a file for editing\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"editor.files\",[23,[\"selected_repository\",\"id\"]]],null,{\"statements\":[[0,\"                  \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                    \"],[7,\"path\"],[11,\"d\",\"M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z\"],[9],[10],[0,\"\\n                  \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"selected_file\"]]],null,{\"statements\":[[0,\"                \"],[7,\"li\"],[11,\"class\",\"separator\"],[9],[10],[0,\"\\n                \"],[7,\"li\"],[11,\"class\",\"menu-text\"],[9],[1,[23,[\"selected_file\",\"basename\"]],false],[10],[0,\"\\n                \"],[7,\"li\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"editor.file\",[23,[\"selected_repository\",\"id\"]],[23,[\"selected_file\",\"key\"]]],null,{\"statements\":[[0,\"                    \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                      \"],[7,\"path\"],[11,\"fill\",\"#000000\"],[11,\"d\",\"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z\"],[9],[10],[0,\"\\n                    \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"                \"],[10],[0,\"\\n\"],[4,\"if\",[[23,[\"selected_file\",\"hasDirtyAttributes\"]]],null,{\"statements\":[[0,\"                  \"],[7,\"li\"],[11,\"title\",\"Save changes to the file\"],[11,\"role\",\"none\"],[9],[0,\"\\n                    \"],[7,\"a\"],[11,\"role\",\"menuitem\"],[3,\"action\",[[22,0,[]],\"save_file\"]],[9],[0,\"\\n                      \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                        \"],[7,\"path\"],[11,\"d\",\"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z\"],[9],[10],[0,\"\\n                      \"],[10],[0,\"\\n                    \"],[10],[0,\"\\n                  \"],[10],[0,\"\\n                  \"],[7,\"li\"],[11,\"title\",\"Discard changes to the file\"],[11,\"role\",\"none\"],[9],[0,\"\\n                    \"],[7,\"a\"],[11,\"role\",\"menuitem\"],[3,\"action\",[[22,0,[]],\"reset_file\"]],[9],[0,\"\\n                      \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                        \"],[7,\"path\"],[11,\"d\",\"M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M12.16,14.31C10.6,14.31 9.19,14.89 8.11,15.83L6,13.72V19H11.28L9.15,16.88C9.97,16.2 11,15.78 12.16,15.78C14.23,15.78 16,17.13 16.61,19L18,18.54C17.19,16.09 14.88,14.31 12.16,14.31Z\"],[9],[10],[0,\"\\n                      \"],[10],[0,\"\\n                    \"],[10],[0,\"\\n                  \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"                  \"],[7,\"li\"],[11,\"class\",\"menu-icon-disabled\"],[9],[0,\"\\n                    \"],[7,\"span\"],[9],[0,\"\\n                      \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                        \"],[7,\"path\"],[11,\"d\",\"M15,9H5V5H15M12,19A3,3 0 0,1 9,16A3,3 0 0,1 12,13A3,3 0 0,1 15,16A3,3 0 0,1 12,19M17,3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V7L17,3Z\"],[9],[10],[0,\"\\n                      \"],[10],[0,\"\\n                    \"],[10],[0,\"\\n                  \"],[10],[0,\"\\n                  \"],[7,\"li\"],[11,\"class\",\"menu-icon-disabled\"],[9],[0,\"\\n                    \"],[7,\"span\"],[9],[0,\"\\n                      \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                        \"],[7,\"path\"],[11,\"d\",\"M13,9H18.5L13,3.5V9M6,2H14L20,8V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V4C4,2.89 4.89,2 6,2M12.16,14.31C10.6,14.31 9.19,14.89 8.11,15.83L6,13.72V19H11.28L9.15,16.88C9.97,16.2 11,15.78 12.16,15.78C14.23,15.78 16,17.13 16.61,19L18,18.54C17.19,16.09 14.88,14.31 12.16,14.31Z\"],[9],[10],[0,\"\\n                      \"],[10],[0,\"\\n                    \"],[10],[0,\"\\n                  \"],[10],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"top-bar-right\"],[9],[0,\"\\n        \"],[7,\"ul\"],[11,\"class\",\"menu\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n\"],[4,\"if\",[[23,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"            \"],[7,\"li\"],[11,\"role\",\"none\"],[9],[0,\"\\n              \"],[7,\"a\"],[11,\"title\",\"Log out\"],[11,\"role\",\"menuitem\"],[3,\"action\",[[22,0,[]],\"logout\"]],[9],[0,\"\\n                \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                  \"],[7,\"path\"],[11,\"d\",\"M17,17.25V14H10V10H17V6.75L22.25,12L17,17.25M13,2A2,2 0 0,1 15,4V8H13V4H4V20H13V16H15V20A2,2 0 0,1 13,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2H13Z\"],[9],[10],[0,\"\\n                \"],[10],[0,\"\\n              \"],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[7,\"li\"],[11,\"role\",\"menuitem\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"users.login\"],null,{\"statements\":[[0,\"                \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"icon\"],[9],[0,\"\\n                  \"],[7,\"path\"],[11,\"d\",\"M10,17.25V14H3V10H10V6.75L15.25,12L10,17.25M8,2H17A2,2 0 0,1 19,4V20A2,2 0 0,1 17,22H8A2,2 0 0,1 6,20V16H8V20H17V4H8V8H6V4A2,2 0 0,1 8,2Z\"],[9],[10],[0,\"\\n                \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"        \"],[10],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"article\"],[11,\"class\",\"cell auto cell-block-container grid-padding-x\"],[9],[0,\"\\n    \"],[1,[21,\"outlet\"],false],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor.hbs" } });
});
;define("client/templates/editor/file", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ooY9ARaO", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[0,\"Edit File\"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"cell shrink\"],[9],[0,\"\\n  \"],[1,[27,\"tabs-title\",null,[[\"tabs\"],[[23,[\"tabs\"]]]]],false],[0,\"\\n\"],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"cell auto tabs-content\"],[9],[0,\"\\n\"],[4,\"tabs-panel\",null,[[\"tabs\",\"idx\"],[[23,[\"tabs\"]],0]],{\"statements\":[[0,\"    \"],[1,[27,\"body-editor\",null,[[\"body\"],[[23,[\"model\",\"body\"]]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"tabs-panel\",null,[[\"tabs\",\"idx\"],[[23,[\"tabs\"]],1]],{\"statements\":[[0,\"    \"],[7,\"div\"],[11,\"class\",\"grid-x full-height\"],[9],[0,\"\\n      \"],[7,\"div\"],[11,\"class\",\"cell small-12 medium-6 full-height auto-overflow\"],[9],[0,\"\\n        \"],[1,[27,\"header-editor\",null,[[\"model\",\"header\"],[[23,[\"model\"]],[23,[\"model\",\"header\"]]]]],false],[0,\"\\n      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/file.hbs" } });
});
;define("client/templates/editor/files", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "SCs/w0ES", "block": "{\"symbols\":[\"filename\",\"key\"],\"statements\":[[7,\"div\"],[11,\"class\",\"cell\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[0,\"Select the file to load\"],[10],[0,\"\\n  \"],[7,\"ul\"],[11,\"class\",\"menu vertical\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n\"],[4,\"each\",[[27,\"-each-in\",[[23,[\"model\",\"tei_files\"]]],null]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[11,\"role\",\"none\"],[9],[7,\"a\"],[11,\"role\",\"menuitem\"],[3,\"action\",[[22,0,[]],\"select-file\",[23,[\"model\",\"id\"]],[22,2,[]]]],[9],[1,[22,1,[]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[1,2]},null],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/files.hbs" } });
});
;define("client/templates/editor/repositories", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ILlCCrwE", "block": "{\"symbols\":[\"repository\"],\"statements\":[[7,\"div\"],[11,\"class\",\"cell\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[0,\"Select the Project to load\"],[10],[0,\"\\n  \"],[7,\"ul\"],[11,\"class\",\"menu vertical\"],[11,\"role\",\"menubar\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[11,\"role\",\"none\"],[9],[7,\"a\"],[11,\"role\",\"menuitem\"],[3,\"action\",[[22,0,[]],\"select-repository\",[22,1,[\"id\"]]]],[9],[1,[22,1,[\"title\"]],false],[10],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/repositories.hbs" } });
});
;define("client/templates/editor/repository", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JDV5d49Q", "block": "{\"symbols\":[\"change\",\"change\"],\"statements\":[[7,\"div\"],[11,\"class\",\"cell\"],[9],[0,\"\\n  \"],[7,\"h1\"],[9],[1,[23,[\"model\",\"title\"]],false],[10],[0,\"\\n  \"],[7,\"h2\"],[9],[0,\"Local Changes\"],[10],[0,\"\\n  \"],[7,\"ol\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"local_changes\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[9],[1,[22,2,[\"message\"]],false],[0,\" by \"],[1,[22,2,[\"author\"]],false],[10],[0,\"\\n\"]],\"parameters\":[2]},{\"statements\":[[0,\"      \"],[7,\"li\"],[9],[0,\"No changes\"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[10],[0,\"\\n  \"],[7,\"h2\"],[9],[0,\"Remote Changes\"],[10],[0,\"\\n  \"],[7,\"ol\"],[9],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"remote_changes\"]]],null,{\"statements\":[[0,\"      \"],[7,\"li\"],[9],[1,[22,1,[\"message\"]],false],[0,\" by \"],[1,[22,1,[\"author\"]],false],[10],[0,\"\\n\"]],\"parameters\":[1]},{\"statements\":[[0,\"      \"],[7,\"li\"],[9],[0,\"No changes\"],[10],[0,\"\\n\"]],\"parameters\":[]}],[0,\"  \"],[10],[0,\"\\n  \"],[7,\"button\"],[12,\"class\",[21,\"button_class\"]],[3,\"action\",[[22,0,[]],\"synchronise\"]],[9],[1,[21,\"button_text\"],false],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/editor/repository.hbs" } });
});
;define("client/templates/loading", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "h8/hysXA", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"loading\"],[9],[0,\"\\n  \"],[7,\"svg\"],[11,\"viewBox\",\"0 0 24 24\"],[11,\"class\",\"animate-rotate\"],[9],[0,\"\\n    \"],[7,\"path\"],[11,\"fill\",\"#000000\"],[11,\"d\",\"M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z\"],[9],[10],[0,\"\\n  \"],[10],[0,\"\\n  \"],[7,\"p\"],[9],[0,\"Loading...\"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/loading.hbs" } });
});
;define("client/templates/users/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uU1PGlGW", "block": "{\"symbols\":[],\"statements\":[[7,\"form\"],[11,\"class\",\"grid-container\"],[3,\"action\",[[22,0,[]],\"login\"],[[\"on\"],[\"submit\"]]],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"grid-x grid-padding-x\"],[9],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"cell small-12\"],[9],[0,\"\\n      \"],[7,\"h1\"],[9],[0,\"Login\"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"cell small-12 medium-6 large-4 large-offset-2\"],[9],[0,\"\\n      \"],[7,\"label\"],[9],[0,\"\\n        Username\\n        \"],[1,[27,\"input\",null,[[\"id\",\"placeholder\",\"value\"],[\"username\",\"Enter your username\",[23,[\"username\"]]]]],false],[0,\"\\n\"],[4,\"if\",[[23,[\"errorMessage\"]]],null,{\"statements\":[[0,\"          \"],[7,\"span\"],[11,\"class\",\"form-error is-visible\"],[9],[0,\"\\n            \"],[1,[21,\"errorMessage\"],false],[0,\"\\n          \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"cell small-12 medium-6 large-4\"],[9],[0,\"\\n      \"],[7,\"label\"],[9],[0,\"\\n        Password\\n        \"],[1,[27,\"input\",null,[[\"id\",\"placeholder\",\"type\",\"value\"],[\"password\",\"Enter your password\",\"password\",[23,[\"password\"]]]]],false],[0,\"\\n\"],[4,\"if\",[[23,[\"errorMessage\"]]],null,{\"statements\":[[0,\"          \"],[7,\"span\"],[11,\"class\",\"form-error is-visible\"],[9],[0,\"\\n            \"],[1,[21,\"errorMessage\"],false],[0,\"\\n          \"],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"div\"],[11,\"class\",\"cell small-12 large-8 large-offset-2 text-right\"],[9],[0,\"\\n      \"],[4,\"link-to\",[\"editor\"],[[\"class\"],[\"button secondary\"]],{\"statements\":[[0,\"Don't Login\"]],\"parameters\":[]},null],[0,\"\\n      \"],[7,\"button\"],[11,\"class\",\"button\"],[11,\"type\",\"submit\"],[9],[0,\"Login\"],[10],[0,\"\\n    \"],[10],[0,\"\\n  \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "client/templates/users/login.hbs" } });
});
;define('client/utils/prosemirror-editor', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.getActiveMarks = getActiveMarks;
    exports.getBlockHierarchy = getBlockHierarchy;
    /**
     * Returns a list of active mark names
     */
    function getActiveMarks(state) {
        let selection = state.selection;
        let active_marks = [];
        if (selection.from === selection.to) {
            // Get marks at the current cursor position
            if (state.doc.nodeAt(selection.from)) {
                state.doc.nodeAt(selection.from).marks.forEach(mark => {
                    if (active_marks.indexOf(mark.type.name) === -1) {
                        active_marks.push(mark.type.name);
                    }
                });
            }
            // Add marks from the previous cursor position if they are inclusive
            if (state.doc.nodeAt(selection.from - 1)) {
                state.doc.nodeAt(selection.from - 1).marks.forEach(mark => {
                    if (mark.type.spec.inclusive || mark.type.spec.inclusive === undefined) {
                        if (active_marks.indexOf(mark.type.name) === -1) {
                            active_marks.push(mark.type.name);
                        }
                    }
                });
            }
            // Add stored marks
            if (state.storedMarks) {
                state.storedMarks.forEach(mark => {
                    if (active_marks.indexOf(mark.type.name) === -1) {
                        active_marks.push(mark.type.name);
                    }
                });
            }
        } else {
            // Add all marks between the selection markers
            state.doc.nodesBetween(selection.from, selection.to, node => {
                node.marks.forEach(mark => {
                    if (active_marks.indexOf(mark.type.name) === -1) {
                        active_marks.push(mark.type.name);
                    }
                });
            });
        }
        return active_marks;
    }

    /**
     * Gets a list of nodes from the current selection.
     */
    function getBlockHierarchy(state) {
        let selection = state.selection;
        let blocks = [];
        for (let idx = 0; idx < selection.$anchor.path.length; idx++) {
            if (typeof selection.$anchor.path[idx] === 'object') {
                let node_type = selection.$anchor.path[idx].type;
                if (node_type.name !== 'doc') {
                    blocks.splice(0, 0, selection.$anchor.path[idx]);
                }
            }
        }
        return blocks;
    }
});
;

;define('client/config/environment', [], function() {
  var prefix = 'client';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

;
          if (!runningTests) {
            require("client/app")["default"].create({"name":"client","version":"0.0.0+345e1852"});
          }
        
//# sourceMappingURL=client.map
