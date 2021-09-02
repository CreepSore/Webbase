let VueLoginComponent = require("../login-form.vue");

window.addEventListener("load", () => {
    Vue.createApp(VueLoginComponent).mount("#login-form");
});
