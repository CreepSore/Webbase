/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/web/static/js/login-form.vue":
/*!******************************************!*\
  !*** ./src/web/static/js/login-form.vue ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login-form.vue?vue&type=script&lang=js& */ \"./src/web/static/js/login-form.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\nvar render, staticRenderFns\n;\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__.default)(\n  _login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__.default,\n  render,\n  staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/web/static/js/login-form.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://webbase/./src/web/static/js/login-form.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/login-form.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/login-form.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nlet RestApi = __webpack_require__(/*! ./rest-api.js */ \"./src/web/static/js/rest-api.js\");\nlet Notifications = __webpack_require__(/*! ./vue-components/notifications.vue */ \"./src/web/static/js/vue-components/notifications.vue\");\nlet Translatable = __webpack_require__(/*! ./vue-components/translatable.vue */ \"./src/web/static/js/vue-components/translatable.vue\");\n\nmodule.exports = {\n    render: h => h(\"div\"),\n    data: () => {\n        return {\n            alert: {\n                type: \"primary\"\n            },\n            loginForm: {\n                username: \"\",\n                password: \"\"\n            },\n            notifications: []\n        };\n    },\n    components: {\n        \"vue-notifications\": Notifications,\n        \"vue-translatable\": Translatable\n    },\n    methods: {\n        async update    (message, type) {\n            this.addNotification(\"Information:\", message, type);\n            return;\n            // @ts-ignore\n            this.alert.message = message || \"\";\n            // @ts-ignore\n            this.alert.type = type || \"\";\n        },\n        async doLogin() {\n            // @ts-ignore\n            const {username, password} = this.loginForm;\n\n            // @ts-ignore\n            const result = await RestApi.login(username, password);\n            let type = \"success\";\n            if(result.error) type = \"danger\";\n            this.updateAlert(result.message || result.error, type);\n        },\n        async doRegister() {\n            // @ts-ignore\n            const {username, password} = this.loginForm;\n\n            // @ts-ignore\n            const result = await RestApi.register(username, password);\n            let type = \"primary\";\n            if(result.error) type = \"danger\";\n            this.updateAlert(result.message || result.error, type);\n        },\n        async addNotification(title, text, type = null) {\n            let notification = {text, title, type};\n            // @ts-ignore\n            this.notifications.push(notification);\n        },\n        async removeNotification(notification) {\n            // @ts-ignore\n            this.notifications = this.notifications.filter(n => n !== notification);\n        }\n    }\n};\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/login-form.vue?./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./src/web/static/js/vue-components/notifications.vue":
/*!************************************************************!*\
  !*** ./src/web/static/js/vue-components/notifications.vue ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _notifications_vue_vue_type_template_id_3877982f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notifications.vue?vue&type=template&id=3877982f& */ \"./src/web/static/js/vue-components/notifications.vue?vue&type=template&id=3877982f&\");\n/* harmony import */ var _notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notifications.vue?vue&type=script&lang=js& */ \"./src/web/static/js/vue-components/notifications.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(\n  _notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _notifications_vue_vue_type_template_id_3877982f___WEBPACK_IMPORTED_MODULE_0__.render,\n  _notifications_vue_vue_type_template_id_3877982f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/web/static/js/vue-components/notifications.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/notifications.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/notifications.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/notifications.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************/
/***/ ((module) => {

eval("//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\nmodule.exports = {\n    name: \"vue-notifications\",\n    props: {\n        notifications: Array\n    },\n    methods: {\n        removeNotification(notification) {\n            this.$emit('remove-notification', notification)\n        }\n    }\n};\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/notifications.vue?./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./src/web/static/js/vue-components/translatable.vue":
/*!***********************************************************!*\
  !*** ./src/web/static/js/vue-components/translatable.vue ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _translatable_vue_vue_type_template_id_7181c94c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translatable.vue?vue&type=template&id=7181c94c& */ \"./src/web/static/js/vue-components/translatable.vue?vue&type=template&id=7181c94c&\");\n/* harmony import */ var _translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./translatable.vue?vue&type=script&lang=js& */ \"./src/web/static/js/vue-components/translatable.vue?vue&type=script&lang=js&\");\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n;\nvar component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__.default)(\n  _translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__.default,\n  _translatable_vue_vue_type_template_id_7181c94c___WEBPACK_IMPORTED_MODULE_0__.render,\n  _translatable_vue_vue_type_template_id_7181c94c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/web/static/js/vue-components/translatable.vue\"\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);\n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/translatable.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/translatable.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/translatable.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("//\n//\n//\n//\n//\n//\n\nlet RestApi = __webpack_require__(/*! ../rest-api */ \"./src/web/static/js/rest-api.js\");\nmodule.exports = {\n    data() {\n        return {\n            t: {}\n        }\n    },\n    props: {\n        locale: String,\n        keys: Object,\n        toTranslate: Object\n    },\n    methods: {\n        async translateAll() {\n            await Promise.all(Object.keys(this.toTranslate).map(async key => {\n                let mappingKey = key;\n                let translationKey = this.toTranslate[key];\n                if(!translationKey) return;\n\n                this.t[mappingKey] = (await RestApi.getTranslation(this.locale, translationKey, this.keys)).data;\n            }));\n        }\n    },\n    mounted() {\n        this.translateAll();\n    }\n};\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/translatable.vue?./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./src/web/static/js/login-form.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./src/web/static/js/login-form.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./login-form.vue?vue&type=script&lang=js& */ \"./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/login-form.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_lib_index_js_vue_loader_options_login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_vue_loader_lib_index_js_vue_loader_options_login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_vue_loader_lib_index_js_vue_loader_options_login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_vue_loader_lib_index_js_vue_loader_options_login_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default())); \n\n//# sourceURL=webpack://webbase/./src/web/static/js/login-form.vue?");

/***/ }),

/***/ "./src/web/static/js/vue-components/notifications.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./src/web/static/js/vue-components/notifications.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./notifications.vue?vue&type=script&lang=js& */ \"./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/notifications.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default())); \n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/notifications.vue?");

/***/ }),

/***/ "./src/web/static/js/vue-components/notifications.vue?vue&type=template&id=3877982f&":
/*!*******************************************************************************************!*\
  !*** ./src/web/static/js/vue-components/notifications.vue?vue&type=template&id=3877982f& ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_template_id_3877982f___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_template_id_3877982f___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_notifications_vue_vue_type_template_id_3877982f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./notifications.vue?vue&type=template&id=3877982f& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/notifications.vue?vue&type=template&id=3877982f&\");\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/notifications.vue?");

/***/ }),

/***/ "./src/web/static/js/vue-components/translatable.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./src/web/static/js/vue-components/translatable.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./translatable.vue?vue&type=script&lang=js& */ \"./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/translatable.vue?vue&type=script&lang=js&\");\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};\n/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== \"default\") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[__WEBPACK_IMPORT_KEY__]\n/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);\n /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((_node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default())); \n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/translatable.vue?");

/***/ }),

/***/ "./src/web/static/js/vue-components/translatable.vue?vue&type=template&id=7181c94c&":
/*!******************************************************************************************!*\
  !*** ./src/web/static/js/vue-components/translatable.vue?vue&type=template&id=7181c94c& ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_template_id_7181c94c___WEBPACK_IMPORTED_MODULE_0__.render),\n/* harmony export */   \"staticRenderFns\": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_template_id_7181c94c___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)\n/* harmony export */ });\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_translatable_vue_vue_type_template_id_7181c94c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./translatable.vue?vue&type=template&id=7181c94c& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/translatable.vue?vue&type=template&id=7181c94c&\");\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/translatable.vue?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/notifications.vue?vue&type=template&id=3877982f&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/notifications.vue?vue&type=template&id=3877982f& ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      staticClass: \"d-flex flex-column mw-100 me-1\",\n      staticStyle: {\n        width: \"450px\",\n        position: \"fixed\",\n        right: \"20px\",\n        bottom: \"20px\"\n      },\n      attrs: { id: \"vue-notification-container\" }\n    },\n    _vm._l(_vm.notifications, function(notification) {\n      return _c(\n        \"div\",\n        {\n          key: notification,\n          staticClass: \"notification card bg-dark text-light w-100 mb-1 border\",\n          class: _vm.border - (\"\" + (notification.type || \"white\"))\n        },\n        [\n          _c(\n            \"div\",\n            {\n              staticClass: \"card-header d-flex justify-content-between\",\n              class: \"border-\" + (notification.type || \"white\")\n            },\n            [\n              _c(\"h4\", [_vm._v(_vm._s(notification.title))]),\n              _vm._v(\" \"),\n              _c(\"div\", [\n                _c(\"i\", {\n                  staticClass: \"bi bi-x-square-fill link-danger\",\n                  staticStyle: { cursor: \"pointer\", \"font-size\": \"1.25em\" },\n                  on: {\n                    click: function($event) {\n                      return _vm.removeNotification(notification)\n                    }\n                  }\n                })\n              ])\n            ]\n          ),\n          _vm._v(\" \"),\n          _c(\"div\", { staticClass: \"card-body\" }, [\n            _c(\"p\", { staticClass: \"m-0\" }, [_vm._v(_vm._s(notification.text))])\n          ])\n        ]\n      )\n    }),\n    0\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/notifications.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/translatable.vue?vue&type=template&id=7181c94c&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/web/static/js/vue-components/translatable.vue?vue&type=template&id=7181c94c& ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": () => (/* binding */ render),\n/* harmony export */   \"staticRenderFns\": () => (/* binding */ staticRenderFns)\n/* harmony export */ });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", [_vm._t(\"default\", null, { t: _vm.t })], 2)\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/vue-components/translatable.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ normalizeComponent)\n/* harmony export */ });\n/* globals __VUE_SSR_CONTEXT__ */\n\n// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).\n// This module is a runtime utility for cleaner component module output and will\n// be included in the final webpack user bundle.\n\nfunction normalizeComponent (\n  scriptExports,\n  render,\n  staticRenderFns,\n  functionalTemplate,\n  injectStyles,\n  scopeId,\n  moduleIdentifier, /* server only */\n  shadowMode /* vue-cli only */\n) {\n  // Vue.extend constructor export interop\n  var options = typeof scriptExports === 'function'\n    ? scriptExports.options\n    : scriptExports\n\n  // render functions\n  if (render) {\n    options.render = render\n    options.staticRenderFns = staticRenderFns\n    options._compiled = true\n  }\n\n  // functional template\n  if (functionalTemplate) {\n    options.functional = true\n  }\n\n  // scopedId\n  if (scopeId) {\n    options._scopeId = 'data-v-' + scopeId\n  }\n\n  var hook\n  if (moduleIdentifier) { // server build\n    hook = function (context) {\n      // 2.3 injection\n      context =\n        context || // cached call\n        (this.$vnode && this.$vnode.ssrContext) || // stateful\n        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional\n      // 2.2 with runInNewContext: true\n      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {\n        context = __VUE_SSR_CONTEXT__\n      }\n      // inject component styles\n      if (injectStyles) {\n        injectStyles.call(this, context)\n      }\n      // register component module identifier for async chunk inferrence\n      if (context && context._registeredComponents) {\n        context._registeredComponents.add(moduleIdentifier)\n      }\n    }\n    // used by ssr in case component is cached and beforeCreate\n    // never gets called\n    options._ssrRegister = hook\n  } else if (injectStyles) {\n    hook = shadowMode\n      ? function () {\n        injectStyles.call(\n          this,\n          (options.functional ? this.parent : this).$root.$options.shadowRoot\n        )\n      }\n      : injectStyles\n  }\n\n  if (hook) {\n    if (options.functional) {\n      // for template-only hot-reload because in that case the render fn doesn't\n      // go through the normalizer\n      options._injectStyles = hook\n      // register for functional component in vue file\n      var originalRender = options.render\n      options.render = function renderWithStyleInjection (h, context) {\n        hook.call(context)\n        return originalRender(h, context)\n      }\n    } else {\n      // inject component registration as beforeCreate hook\n      var existing = options.beforeCreate\n      options.beforeCreate = existing\n        ? [].concat(existing, hook)\n        : [hook]\n    }\n  }\n\n  return {\n    exports: scriptExports,\n    options: options\n  }\n}\n\n\n//# sourceURL=webpack://webbase/./node_modules/vue-loader/lib/runtime/componentNormalizer.js?");

/***/ }),

/***/ "./src/web/static/js/pages/login.js":
/*!******************************************!*\
  !*** ./src/web/static/js/pages/login.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("let VueLoginComponent = __webpack_require__(/*! ../login-form.vue */ \"./src/web/static/js/login-form.vue\");\r\n\r\nwindow.addEventListener(\"load\", () => {\r\n    Vue.createApp(VueLoginComponent).mount(\"#login-form\");\r\n});\r\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/pages/login.js?");

/***/ }),

/***/ "./src/web/static/js/rest-api.js":
/*!***************************************!*\
  !*** ./src/web/static/js/rest-api.js ***!
  \***************************************/
/***/ ((module) => {

eval("/**\r\n * Implements a wrapper for RestAPI calls\r\n * @class RestApi\r\n */\r\n class RestApi {\r\n    static errorHandler(xhr, textStatus, error) {\r\n        console.error(error, xhr, textStatus);\r\n    }\r\n\r\n    static login(username, password) {\r\n        return new Promise(res => {\r\n            $.post(\"/api/v1/usermgmt/login\", {\r\n                username,\r\n                password\r\n            }).done((data, status, xhr) => {\r\n                if(data.href) {\r\n                    location.href = data.href;\r\n                }\r\n\r\n                if(data.reload) {\r\n                    location.reload();\r\n                }\r\n\r\n                res(data);\r\n            }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static register(username, password) {\r\n        return new Promise(res => {\r\n            $.post(\"/api/v1/usermgmt/register\", {\r\n                username,\r\n                password\r\n            }).done((data, status, xhr) => {\r\n                if(data.href) {\r\n                    location.href = data.href;\r\n                }\r\n\r\n                if(data.reload) {\r\n                    location.reload();\r\n                }\r\n\r\n                res(data);\r\n            }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static fetchModel(modelName, where = null) {\r\n        return new Promise(res => {\r\n            if(!where) {\r\n                $.get(`/api/v1/model/${modelName}`)\r\n                    .done((data, status, xhr) => {\r\n                        res(data);\r\n                    }).catch(this.errorHandler);\r\n            }\r\n            else {\r\n                $.post(`/api/v1/model/${modelName}/filter`, where)\r\n                    .done((data, status, xhr) => {\r\n                        res(data);\r\n                    }).catch(this.errorHandler);\r\n            }\r\n        });\r\n    }\r\n\r\n    static getModelMeta(modelName) {\r\n        return new Promise(res => {\r\n            $.get(`/api/v1/model/${modelName}/metadata`)\r\n                .done((data, status, xhr) => {\r\n                    res(data);\r\n                }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static deleteModel(modelName, where = null) {\r\n        return new Promise(res => {\r\n            $.post(`/api/v1/model/${modelName}/delete`, where)\r\n                .done((data, status, xhr) => {\r\n                    res(data);\r\n                }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static updateModel(modelName, where, data) {\r\n        return new Promise(res => {\r\n            $.post(`/api/v1/model/${modelName}/update`, {\r\n                where,\r\n                data\r\n            }).done((data, status, xhr) => {\r\n                res(data);\r\n            }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static createModel(modelName, data) {\r\n        return new Promise(res => {\r\n            $.post(`/api/v1/model/${modelName}/create`, data)\r\n                .done((data, status, xhr) => {\r\n                    res(data);\r\n                }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static modelCustomUrl(modelName, url, method, data = {}) {\r\n        return new Promise(res => {\r\n            $[method.toLowerCase()](`/api/v1/model/${modelName}${url}`, data)\r\n                .done((data, status, xhr) => {\r\n                    res(data);\r\n                }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static async getSessionParameter(param) {\r\n        return new Promise(res => {\r\n            $.get(`/api/v1/usermgmt/getSessionParameter/${param}`)\r\n                .done((data, status, xhr) => {\r\n                    res(data);\r\n                }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static async setSessionParameter(param, data) {\r\n        return new Promise(res => {\r\n            $.post(`/api/v1/usermgmt/setSessionParameter/${param}`, {value: data})\r\n                .done((data, status, xhr) => {\r\n                    res(data);\r\n                }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static async runQuery(user, password, host, query, params = []) {\r\n        return new Promise((res, rej) => {\r\n            $.post(`/api/v1/runQuery/${user}/${password}/${host}`, {query, params})\r\n                .done((data, status, xhr) => {\r\n                    if(!data?.success) {\r\n                        this.errorHandler(null, null, data.error);\r\n                        rej(data.error);\r\n                        return;\r\n                    }\r\n                    res(data.data);\r\n                }).catch(this.errorHandler);\r\n        });\r\n    }\r\n\r\n    static async getAllTranslations() {\r\n        return await this.modelCustomUrl(\"Translation\", `/getAll`, \"GET\");\r\n    }\r\n\r\n    static async getTranslation(locale, key, replaceKeys = {}) {\r\n        return await this.modelCustomUrl(\"Translation\", `/getTranslation/${locale}/${key}`, \"POST\", replaceKeys);\r\n    }\r\n\r\n    static async setTranslation(locale, key, value) {\r\n        return await this.modelCustomUrl(\"Translation\", `/setTranslation/${locale}/${key}`, \"POST\", {value});\r\n    }\r\n}\r\n\r\nmodule.exports = RestApi;\r\n\n\n//# sourceURL=webpack://webbase/./src/web/static/js/rest-api.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/web/static/js/pages/login.js");
/******/ 	
/******/ })()
;