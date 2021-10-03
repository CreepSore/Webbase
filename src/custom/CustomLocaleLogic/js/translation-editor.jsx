"use strict";
/* eslint-disable */
let React = require("react");
let ReactDom = require("react-dom");
let coreJs = require("core-js");
let regeneratorRuntime = require("regenerator-runtime");
let TranslationEditor = require("./translation-editor-component.jsx");

window.addEventListener("load", () => {
    ReactDom.render(<TranslationEditor />, document.getElementById("translation-editor"));
});
