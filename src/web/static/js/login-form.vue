<script>
    let RestApi = require("./rest-api.js");
    let Notifications = require("./vue-components/notifications.vue");
    let Translatable = require("./vue-components/translatable.vue");

    module.exports = {
        render: h => h("div"),
        data: () => {
            return {
                alert: {
                    type: "primary"
                },
                loginForm: {
                    username: "",
                    password: ""
                },
                notifications: []
            };
        },
        components: {
            "vue-notifications": Notifications,
            "vue-translatable": Translatable
        },
        methods: {
            async update    (message, type) {
                this.addNotification("Information:", message, type);
                return;
                // @ts-ignore
                this.alert.message = message || "";
                // @ts-ignore
                this.alert.type = type || "";
            },
            async doLogin() {
                // @ts-ignore
                const {username, password} = this.loginForm;

                // @ts-ignore
                const result = await RestApi.login(username, password);
                let type = "success";
                if(result.error) type = "danger";
                this.updateAlert(result.message || result.error, type);
            },
            async doRegister() {
                // @ts-ignore
                const {username, password} = this.loginForm;

                // @ts-ignore
                const result = await RestApi.register(username, password);
                let type = "primary";
                if(result.error) type = "danger";
                this.updateAlert(result.message || result.error, type);
            },
            async addNotification(title, text, type = null) {
                let notification = {text, title, type};
                // @ts-ignore
                this.notifications.push(notification);
            },
            async removeNotification(notification) {
                // @ts-ignore
                this.notifications = this.notifications.filter(n => n !== notification);
            }
        }
    };
</script>
