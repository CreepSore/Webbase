let React = require("react");
let ReactDom = require("react-dom");
let coreJs = require("core-js");
let regeneratorRuntime = require("regenerator-runtime");
let LoginForm = require("../react-components/login-form.jsx");

window.addEventListener("load", () => {
    ReactDom.render(<LoginForm />, document.getElementById("login-form"));
});
