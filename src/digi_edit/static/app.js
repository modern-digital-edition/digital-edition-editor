/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/ui/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=ts&":
/*!*************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ \"./node_modules/@babel/runtime/helpers/esm/createSuper.js\");\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-property-decorator */ \"./node_modules/vue-property-decorator/lib/vue-property-decorator.js\");\n/* harmony import */ var _components_AriaMenubar_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/AriaMenubar.vue */ \"./src/components/AriaMenubar.vue\");\n\n\n\n\n\n\n\n\nvar App = /*#__PURE__*/function (_Vue) {\n  Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(App, _Vue);\n\n  var _super = Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(App);\n\n  function App() {\n    Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, App);\n\n    return _super.apply(this, arguments);\n  }\n\n  Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(App, [{\n    key: \"selectedBranchId\",\n    get: function get() {\n      return '1';\n    }\n  }, {\n    key: \"selectedFileId\",\n    get: function get() {\n      return 'abcd';\n    }\n  }]);\n\n  return App;\n}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__[\"Vue\"]);\n\nApp = Object(tslib__WEBPACK_IMPORTED_MODULE_4__[\"__decorate\"])([Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__[\"Component\"])({\n  components: {\n    AriaMenubar: _components_AriaMenubar_vue__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n  }\n})], App);\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/AriaDialog.vue?vue&type=script&lang=ts&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AriaDialog.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ \"./node_modules/@babel/runtime/helpers/esm/createSuper.js\");\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-property-decorator */ \"./node_modules/vue-property-decorator/lib/vue-property-decorator.js\");\n\n\n\n\n\n\n\nvar AriaDialog = /*#__PURE__*/function (_Vue) {\n  Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(AriaDialog, _Vue);\n\n  var _super = Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(AriaDialog);\n\n  function AriaDialog() {\n    Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, AriaDialog);\n\n    return _super.apply(this, arguments);\n  }\n\n  Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(AriaDialog, [{\n    key: \"render\",\n    value: function render() {\n      if (this.$scopedSlots.default) {\n        return this.$scopedSlots.default({});\n      }\n    }\n  }]);\n\n  return AriaDialog;\n}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__[\"Vue\"]);\n\nAriaDialog = Object(tslib__WEBPACK_IMPORTED_MODULE_4__[\"__decorate\"])([vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]], AriaDialog);\n/* harmony default export */ __webpack_exports__[\"default\"] = (AriaDialog);\n\n//# sourceURL=webpack:///./src/components/AriaDialog.vue?./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/AriaMenubar.vue?vue&type=script&lang=ts&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AriaMenubar.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper */ \"./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ \"./node_modules/@babel/runtime/helpers/esm/createSuper.js\");\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-property-decorator */ \"./node_modules/vue-property-decorator/lib/vue-property-decorator.js\");\n\n\n\n\n\n\n\n\nvar AriaMenubar = /*#__PURE__*/function (_Vue) {\n  Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(AriaMenubar, _Vue);\n\n  var _super = Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(AriaMenubar);\n\n  function AriaMenubar() {\n    Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(this, AriaMenubar);\n\n    return _super.apply(this, arguments);\n  }\n\n  Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(AriaMenubar, [{\n    key: \"render\",\n    value: function render() {\n      if (this.$scopedSlots.default) {\n        return this.$scopedSlots.default({\n          keyboardNav: this.keyboardNavigation,\n          mouseClickNav: this.mouseClickNavigation\n        });\n      }\n    }\n  }, {\n    key: \"keyboardNavigation\",\n    value: function keyboardNavigation(ev) {\n      var target = ev.target;\n\n      if (target) {\n        if (ev.keyCode === 39) {\n          var next = this.findNextMenuitem(this.getParentMenubar(target), target, 'next');\n\n          if (next) {\n            next.focus();\n          }\n        } else if (ev.keyCode === 37) {\n          var _next = this.findNextMenuitem(this.getParentMenubar(target), target, 'previous');\n\n          if (_next) {\n            _next.focus();\n          }\n        } else if (ev.keyCode === 38 || ev.keyCode === 40) {\n          if (target.parentElement && target.parentElement.children) {\n            var _iterator = Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target.parentElement.children),\n                _step;\n\n            try {\n              for (_iterator.s(); !(_step = _iterator.n()).done;) {\n                var element = _step.value;\n\n                if (element.getAttribute('role') === 'menu') {\n                  element.setAttribute('aria-hidden', 'false');\n                  target.setAttribute('aria-expanded', 'true');\n\n                  var _next2 = this.findNextMenuitem(element, null, 'next');\n\n                  if (_next2) {\n                    _next2.focus();\n                  }\n                }\n              }\n            } catch (err) {\n              _iterator.e(err);\n            } finally {\n              _iterator.f();\n            }\n          }\n        } else if (ev.keyCode === 13 || ev.keyCode == 32) {\n          if (target.parentElement && target.parentElement.children) {\n            var _iterator2 = Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target.parentElement.children),\n                _step2;\n\n            try {\n              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n                var _element = _step2.value;\n\n                if (_element.getAttribute('role') === 'menu') {\n                  if (_element.getAttribute('aria-hidden') === 'false') {\n                    _element.setAttribute('aria-hidden', 'true');\n\n                    target.setAttribute('aria-expanded', 'false');\n                  } else {\n                    _element.setAttribute('aria-hidden', 'false');\n\n                    target.setAttribute('aria-expanded', 'true');\n\n                    var _next3 = this.findNextMenuitem(_element, null, 'next');\n\n                    if (_next3) {\n                      _next3.focus();\n\n                      return;\n                    }\n                  }\n                }\n              }\n            } catch (err) {\n              _iterator2.e(err);\n            } finally {\n              _iterator2.f();\n            }\n\n            target.click();\n          }\n        }\n      }\n    }\n  }, {\n    key: \"mouseClickNavigation\",\n    value: function mouseClickNavigation(ev) {\n      var target = ev.target;\n\n      if (target && target.parentElement && target.parentElement.children) {\n        var _iterator3 = Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target.parentElement.children),\n            _step3;\n\n        try {\n          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {\n            var element = _step3.value;\n\n            if (element.getAttribute('role') === 'menu') {\n              if (element.getAttribute('aria-hidden') === 'false') {\n                element.setAttribute('aria-hidden', 'true');\n                target.setAttribute('aria-expanded', 'false');\n              } else {\n                element.setAttribute('aria-hidden', 'false');\n                target.setAttribute('aria-expanded', 'true');\n                var next = this.findNextMenuitem(element, null, 'next');\n\n                if (next) {\n                  next.focus();\n                  return;\n                }\n              }\n            }\n          }\n        } catch (err) {\n          _iterator3.e(err);\n        } finally {\n          _iterator3.f();\n        }\n      }\n    }\n  }, {\n    key: \"getParentMenubar\",\n    value: function getParentMenubar(element) {\n      if (!element) {\n        return null;\n      } else if (element.getAttribute('role') === 'menubar') {\n        return element;\n      } else {\n        return this.getParentMenubar(element.parentElement);\n      }\n    }\n  }, {\n    key: \"findNextMenuitem\",\n    value: function findNextMenuitem(root, start, direction) {\n      if (!root) {\n        return null;\n      }\n\n      var stack = [];\n\n      if (direction === 'next') {\n        for (var idx = root.children.length - 1; idx >= 0; idx--) {\n          stack.push(root.children[idx]);\n        }\n      } else {\n        for (var _idx = 0; _idx < root.children.length; _idx++) {\n          stack.push(root.children[_idx]);\n        }\n      }\n\n      var mode = 0;\n\n      if (!start) {\n        mode = 1;\n      }\n\n      while (stack.length > 0) {\n        var current = stack.pop();\n\n        if (mode === 0 && current === start) {\n          mode = 1;\n        } else if (mode === 1 && current.getAttribute('role') === 'menuitem' && current.getAttribute('aria-disabled') !== 'true') {\n          return current;\n        }\n\n        if (current.getAttribute('role') !== 'menu') {\n          if (direction === 'next') {\n            for (var _idx2 = current.children.length - 1; _idx2 >= 0; _idx2--) {\n              stack.push(current.children[_idx2]);\n            }\n          } else {\n            for (var _idx3 = 0; _idx3 < current.children.length; _idx3++) {\n              stack.push(current.children[_idx3]);\n            }\n          }\n        }\n      }\n\n      return null;\n    }\n  }]);\n\n  return AriaMenubar;\n}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_6__[\"Vue\"]);\n\nAriaMenubar = Object(tslib__WEBPACK_IMPORTED_MODULE_5__[\"__decorate\"])([Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_6__[\"Component\"])({})], AriaMenubar);\n/* harmony default export */ __webpack_exports__[\"default\"] = (AriaMenubar);\n\n//# sourceURL=webpack:///./src/components/AriaMenubar.vue?./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/EditionOverview.vue?vue&type=script&lang=ts&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/EditionOverview.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/createSuper */ \"./node_modules/@babel/runtime/helpers/esm/createSuper.js\");\n/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ \"./node_modules/tslib/tslib.es6.js\");\n/* harmony import */ var vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-property-decorator */ \"./node_modules/vue-property-decorator/lib/vue-property-decorator.js\");\n/* harmony import */ var _components_AriaDialog_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/AriaDialog.vue */ \"./src/components/AriaDialog.vue\");\n\n\n\n\n\n\n\n\nvar EditionOverview = /*#__PURE__*/function (_Vue) {\n  Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(EditionOverview, _Vue);\n\n  var _super = Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createSuper__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(EditionOverview);\n\n  function EditionOverview() {\n    var _this;\n\n    Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, EditionOverview);\n\n    _this = _super.apply(this, arguments);\n    _this.addTask = false;\n    return _this;\n  }\n\n  Object(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(EditionOverview, [{\n    key: \"toggleAddTask\",\n    value: function toggleAddTask(ev) {\n      ev.preventDefault();\n      this.addTask = !this.addTask;\n    }\n  }, {\n    key: \"createTask\",\n    value: function createTask(ev) {\n      ev.preventDefault();\n      this.addTask = false;\n    }\n  }]);\n\n  return EditionOverview;\n}(vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__[\"Vue\"]);\n\nEditionOverview = Object(tslib__WEBPACK_IMPORTED_MODULE_4__[\"__decorate\"])([Object(vue_property_decorator__WEBPACK_IMPORTED_MODULE_5__[\"Component\"])({\n  components: {\n    AriaDialog: _components_AriaDialog_vue__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n  }\n})], EditionOverview);\n/* harmony default export */ __webpack_exports__[\"default\"] = (EditionOverview);\n\n//# sourceURL=webpack:///./src/views/EditionOverview.vue?./node_modules/cache-loader/dist/cjs.js??ref--14-0!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--14-2!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5b027735-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5b027735-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { attrs: { id: \"app\" } }, [\n    _c(\n      \"nav\",\n      { staticClass: \"main\" },\n      [\n        _c(\"aria-menubar\", {\n          scopedSlots: _vm._u([\n            {\n              key: \"default\",\n              fn: function(ref) {\n                var keyboardNav = ref.keyboardNav\n                return [\n                  _c(\n                    \"ul\",\n                    { attrs: { role: \"menubar\" } },\n                    [\n                      _c(\"li\", { attrs: { role: \"presentation\" } }, [\n                        _c(\"span\", [_vm._v(\"Digital Edition Editor\")])\n                      ]),\n                      _c(\"router-link\", {\n                        attrs: { to: \"/\" },\n                        scopedSlots: _vm._u(\n                          [\n                            {\n                              key: \"default\",\n                              fn: function(ref) {\n                                var href = ref.href\n                                var navigate = ref.navigate\n                                var isActive = ref.isActive\n                                var isExactActive = ref.isExactActive\n                                return [\n                                  _c(\n                                    \"li\",\n                                    { attrs: { role: \"presentation\" } },\n                                    [\n                                      _c(\n                                        \"a\",\n                                        {\n                                          attrs: {\n                                            role: \"menuitem\",\n                                            tabindex: \"0\",\n                                            href: href,\n                                            \"aria-current\": isExactActive\n                                              ? \"true\"\n                                              : \"false\"\n                                          },\n                                          on: {\n                                            click: navigate,\n                                            keyup: keyboardNav\n                                          }\n                                        },\n                                        [_vm._v(\"Edition\")]\n                                      )\n                                    ]\n                                  )\n                                ]\n                              }\n                            }\n                          ],\n                          null,\n                          true\n                        )\n                      }),\n                      _c(\"router-link\", {\n                        attrs: { to: \"/\" + _vm.selectedBranchId },\n                        scopedSlots: _vm._u(\n                          [\n                            {\n                              key: \"default\",\n                              fn: function(ref) {\n                                var href = ref.href\n                                var navigate = ref.navigate\n                                var isActive = ref.isActive\n                                var isExactActive = ref.isExactActive\n                                return [\n                                  _c(\n                                    \"li\",\n                                    { attrs: { role: \"presentation\" } },\n                                    [\n                                      _c(\n                                        \"a\",\n                                        {\n                                          attrs: {\n                                            role: \"menuitem\",\n                                            tabindex: \"-1\",\n                                            href: href,\n                                            \"aria-current\": isExactActive\n                                              ? \"true\"\n                                              : \"false\"\n                                          },\n                                          on: {\n                                            click: navigate,\n                                            keyup: keyboardNav\n                                          }\n                                        },\n                                        [_vm._v(\"Branch-Name\")]\n                                      )\n                                    ]\n                                  )\n                                ]\n                              }\n                            }\n                          ],\n                          null,\n                          true\n                        )\n                      }),\n                      _c(\"router-link\", {\n                        attrs: {\n                          to:\n                            \"/\" +\n                            _vm.selectedBranchId +\n                            \"/\" +\n                            _vm.selectedFileId\n                        },\n                        scopedSlots: _vm._u(\n                          [\n                            {\n                              key: \"default\",\n                              fn: function(ref) {\n                                var href = ref.href\n                                var navigate = ref.navigate\n                                var isActive = ref.isActive\n                                var isExactActive = ref.isExactActive\n                                return [\n                                  _c(\n                                    \"li\",\n                                    { attrs: { role: \"presentation\" } },\n                                    [\n                                      _c(\n                                        \"a\",\n                                        {\n                                          attrs: {\n                                            role: \"menuitem\",\n                                            tabindex: \"-1\",\n                                            href: href,\n                                            \"aria-current\": isExactActive\n                                              ? \"true\"\n                                              : \"false\"\n                                          },\n                                          on: {\n                                            click: navigate,\n                                            keyup: keyboardNav\n                                          }\n                                        },\n                                        [_vm._v(\"File\")]\n                                      )\n                                    ]\n                                  )\n                                ]\n                              }\n                            }\n                          ],\n                          null,\n                          true\n                        )\n                      })\n                    ],\n                    1\n                  )\n                ]\n              }\n            }\n          ])\n        })\n      ],\n      1\n    ),\n    _c(\"main\", [_c(\"router-view\")], 1)\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225b027735-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5b027735-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/About.vue?vue&type=template&id=039c5b43&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5b027735-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/About.vue?vue&type=template&id=039c5b43& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _vm._m(0)\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"about\" }, [\n      _c(\"h1\", [_vm._v(\"This is an about page\")])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/About.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225b027735-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5b027735-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/EditionOverview.vue?vue&type=template&id=36f302e6&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"5b027735-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/EditionOverview.vue?vue&type=template&id=36f302e6& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"home\" },\n    [\n      _vm.addTask\n        ? _c(\"aria-dialog\", [\n            _c(\"div\", { attrs: { role: \"dialog\", \"aria-modal\": \"true\" } }, [\n              _c(\n                \"form\",\n                {\n                  staticClass: \"flex vertical\",\n                  on: { submit: _vm.createTask }\n                },\n                [\n                  _c(\"div\", [\n                    _c(\"h2\", [_vm._v(\"Add a Task\")]),\n                    _c(\"label\", [\n                      _vm._v(\"Task Name \"),\n                      _c(\"input\", { attrs: { type: \"text\" } })\n                    ])\n                  ]),\n                  _c(\"div\", { staticClass: \"shrink\" }, [\n                    _c(\"button\", { on: { click: _vm.toggleAddTask } }, [\n                      _vm._v(\"Don't add\")\n                    ]),\n                    _c(\"button\", [_vm._v(\"Add a Task\")])\n                  ])\n                ]\n              )\n            ])\n          ])\n        : _vm._e(),\n      _c(\"div\", { staticClass: \"width-limited\" }, [\n        _c(\"div\", { staticClass: \"flex\" }, [\n          _c(\"h1\", [_vm._v(\"Currently Active Tasks\")]),\n          _c(\n            \"a\",\n            {\n              staticClass: \"shrink with-icon\",\n              on: { click: _vm.toggleAddTask }\n            },\n            [\n              _c(\n                \"svg\",\n                { staticClass: \"icon small\", attrs: { viewBox: \"0 0 24 24\" } },\n                [\n                  _c(\"path\", {\n                    attrs: {\n                      d:\n                        \"M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z\"\n                    }\n                  })\n                ]\n              ),\n              _c(\"span\", [_vm._v(\"Add a Task\")])\n            ]\n          )\n        ]),\n        _vm._m(0)\n      ])\n    ],\n    1\n  )\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"dl\", { staticClass: \"detail-list\" }, [\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 1\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 2\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 3\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 4\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 5\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 6\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 7\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 8\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 9\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 10\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ]),\n      _c(\"dt\", [\n        _c(\"h2\", [_c(\"a\", { attrs: { href: \"\" } }, [_vm._v(\"Branch 11\")])])\n      ]),\n      _c(\"dd\", [\n        _c(\"span\", [_vm._v(\"Created: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Last Change: 01.01.2020\")]),\n        _c(\"span\", [_vm._v(\"Edited By: Person 1 and Person 2\")])\n      ])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/EditionOverview.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%225b027735-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/App.vue":
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=7ba5bd90& */ \"./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony import */ var _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts& */ \"./src/App.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/App.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=script&lang=ts&":
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=ts& ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_14_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_14_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js??ref--14-0!../node_modules/babel-loader/lib!../node_modules/ts-loader??ref--14-2!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=ts& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_14_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_14_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!****************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \****************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5b027735-vue-loader-template\"}!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/cache-loader/dist/cjs.js??ref--0-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=7ba5bd90& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5b027735-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_7ba5bd90___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/App.vue?");

/***/ }),

/***/ "./src/components/AriaDialog.vue":
/*!***************************************!*\
  !*** ./src/components/AriaDialog.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AriaDialog_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AriaDialog.vue?vue&type=script&lang=ts& */ \"./src/components/AriaDialog.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _AriaDialog_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/AriaDialog.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/AriaDialog.vue?");

/***/ }),

/***/ "./src/components/AriaDialog.vue?vue&type=script&lang=ts&":
/*!****************************************************************!*\
  !*** ./src/components/AriaDialog.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_14_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_14_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AriaDialog_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--14-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--14-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./AriaDialog.vue?vue&type=script&lang=ts& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/AriaDialog.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_14_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_14_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AriaDialog_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/AriaDialog.vue?");

/***/ }),

/***/ "./src/components/AriaMenubar.vue":
/*!****************************************!*\
  !*** ./src/components/AriaMenubar.vue ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _AriaMenubar_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AriaMenubar.vue?vue&type=script&lang=ts& */ \"./src/components/AriaMenubar.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  _AriaMenubar_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/components/AriaMenubar.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/components/AriaMenubar.vue?");

/***/ }),

/***/ "./src/components/AriaMenubar.vue?vue&type=script&lang=ts&":
/*!*****************************************************************!*\
  !*** ./src/components/AriaMenubar.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_14_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_14_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AriaMenubar_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--14-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--14-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./AriaMenubar.vue?vue&type=script&lang=ts& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/AriaMenubar.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_14_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_14_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AriaMenubar_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/components/AriaMenubar.vue?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_home_mhall_Projects_digital_edition_editor_src_frontend_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./router */ \"./src/router/index.ts\");\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ \"./src/store/index.ts\");\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_4__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({\n  router: _router__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n  store: _store__WEBPACK_IMPORTED_MODULE_7__[\"default\"],\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]);\n  }\n}).$mount('#app');\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/router/index.ts":
/*!*****************************!*\
  !*** ./src/router/index.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.esm.js\");\n/* harmony import */ var _views_EditionOverview_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/views/EditionOverview.vue */ \"./src/views/EditionOverview.vue\");\n/* harmony import */ var _views_About_vue__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/views/About.vue */ \"./src/views/About.vue\");\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\nvar routes = [{\n  path: '/',\n  name: 'EditionOverview',\n  component: _views_EditionOverview_vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n}, {\n  path: '/about',\n  name: 'About',\n  component: _views_About_vue__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n}];\nvar router = new vue_router__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n  mode: 'history',\n  base: \"/ui/\",\n  routes: routes\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./src/router/index.ts?");

/***/ }),

/***/ "./src/store/index.ts":
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.runtime.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n\n\nvue__WEBPACK_IMPORTED_MODULE_0__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__[\"default\"].Store({\n  state: {},\n  mutations: {},\n  actions: {},\n  modules: {}\n}));\n\n//# sourceURL=webpack:///./src/store/index.ts?");

/***/ }),

/***/ "./src/views/About.vue":
/*!*****************************!*\
  !*** ./src/views/About.vue ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _About_vue_vue_type_template_id_039c5b43___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./About.vue?vue&type=template&id=039c5b43& */ \"./src/views/About.vue?vue&type=template&id=039c5b43&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _About_vue_vue_type_template_id_039c5b43___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _About_vue_vue_type_template_id_039c5b43___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/About.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/About.vue?");

/***/ }),

/***/ "./src/views/About.vue?vue&type=template&id=039c5b43&":
/*!************************************************************!*\
  !*** ./src/views/About.vue?vue&type=template&id=039c5b43& ***!
  \************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_About_vue_vue_type_template_id_039c5b43___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5b027735-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./About.vue?vue&type=template&id=039c5b43& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5b027735-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/About.vue?vue&type=template&id=039c5b43&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_About_vue_vue_type_template_id_039c5b43___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_About_vue_vue_type_template_id_039c5b43___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/About.vue?");

/***/ }),

/***/ "./src/views/EditionOverview.vue":
/*!***************************************!*\
  !*** ./src/views/EditionOverview.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _EditionOverview_vue_vue_type_template_id_36f302e6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditionOverview.vue?vue&type=template&id=36f302e6& */ \"./src/views/EditionOverview.vue?vue&type=template&id=36f302e6&\");\n/* harmony import */ var _EditionOverview_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EditionOverview.vue?vue&type=script&lang=ts& */ \"./src/views/EditionOverview.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _EditionOverview_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _EditionOverview_vue_vue_type_template_id_36f302e6___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _EditionOverview_vue_vue_type_template_id_36f302e6___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/EditionOverview.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/EditionOverview.vue?");

/***/ }),

/***/ "./src/views/EditionOverview.vue?vue&type=script&lang=ts&":
/*!****************************************************************!*\
  !*** ./src/views/EditionOverview.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_14_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_14_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditionOverview_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js??ref--14-0!../../node_modules/babel-loader/lib!../../node_modules/ts-loader??ref--14-2!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./EditionOverview.vue?vue&type=script&lang=ts& */ \"./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/ts-loader/index.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/EditionOverview.vue?vue&type=script&lang=ts&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_cache_loader_dist_cjs_js_ref_14_0_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_14_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditionOverview_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/EditionOverview.vue?");

/***/ }),

/***/ "./src/views/EditionOverview.vue?vue&type=template&id=36f302e6&":
/*!**********************************************************************!*\
  !*** ./src/views/EditionOverview.vue?vue&type=template&id=36f302e6& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditionOverview_vue_vue_type_template_id_36f302e6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"5b027735-vue-loader-template\"}!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../node_modules/vue-loader/lib??vue-loader-options!./EditionOverview.vue?vue&type=template&id=36f302e6& */ \"./node_modules/cache-loader/dist/cjs.js?{\\\"cacheDirectory\\\":\\\"node_modules/.cache/vue-loader\\\",\\\"cacheIdentifier\\\":\\\"5b027735-vue-loader-template\\\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/EditionOverview.vue?vue&type=template&id=36f302e6&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditionOverview_vue_vue_type_template_id_36f302e6___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_5b027735_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EditionOverview_vue_vue_type_template_id_36f302e6___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/EditionOverview.vue?");

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/main.ts */\"./src/main.ts\");\n\n\n//# sourceURL=webpack:///multi_./src/main.ts?");

/***/ })

/******/ });