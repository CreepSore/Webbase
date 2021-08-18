class LoginForm {
    // @ts-ignore
    constructor(baseElement) {
        // @ts-ignore
        this.vue = Vue.createApp({
            data: () => {
                return {
                    alert: {
                        type: "primary",
                        message: ""
                    },
                    loginForm: {
                        username: "",
                        password: ""
                    },
                    notifications: []
                };
            },
            methods: {
                doLogin: this.doLogin,
                doRegister: this.doRegister,
                updateAlert: this.updateAlert,
                addNotification: this.addNotification,
                removeNotification: this.removeNotification
            }
        }).component("vue-notification", Notifications.setupComponent())
            .component("vue-translatable", Translatable.setupComponent())
            .mount(baseElement);
    }

    async updateAlert(message, type) {
        this.addNotification("Information:", message, type);
        return;
        // @ts-ignore
        this.alert.message = message || "";
        // @ts-ignore
        this.alert.type = type || "";
    }

    async doLogin() {
        // @ts-ignore
        const {username, password} = this.loginForm;

        // @ts-ignore
        const result = await RestApi.login(username, password);
        let type = "success";
        if(result.error) type = "danger";
        this.updateAlert(result.message || result.error, type);
    }

    async doRegister() {
        // @ts-ignore
        const {username, password} = this.loginForm;

        // @ts-ignore
        const result = await RestApi.register(username, password);
        let type = "primary";
        if(result.error) type = "danger";
        this.updateAlert(result.message || result.error, type);
    }

    async addNotification(title, text, type = null) {
        let notification = {text, title, type};
        // @ts-ignore
        this.notifications.push(notification);
    }

    async removeNotification(notification) {
        // @ts-ignore
        this.notifications = this.notifications.filter(n => n !== notification);
    }
}
