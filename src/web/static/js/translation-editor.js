class TranslationEditor {
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
                    notifications: [],
                    locales: [],
                    translations: [],
                    filters: {
                        locale: "",
                        key: "",
                        value: ""
                    },
                    emptyRow: {
                        Locale: {identifier: "", name: ""},
                        translationKey: "",
                        value: "",
                        changed: false
                    }
                };
            },
            methods: {
                addNotification: this.addNotification,
                removeNotification: this.removeNotification,
                updateData: this.updateData,
                saveTranslation: this.saveTranslation,
                saveNewRow: this.saveNewRow,
                saveAllRows: this.saveAllRows
            },
            mounted() {
                this.updateData();
            },
            computed: {
                filteredTranslations() {
                    return this.translations.filter(t => {
                        return (!this.filters.locale || t.Locale.identifier === this.filters.locale)
                            && t.translationKey.toLowerCase().match(this.filters.key.toLowerCase().replace(/\*/g, ".*"))
                            && (!t.value || t.value.toLowerCase().match(this.filters.value.toLowerCase().replace(/\*/g, ".*")))
                    });
                }
            }
        }).component("vue-notification", Notifications.setupComponent())
            .component("vue-translatable", Translatable.setupComponent())
            .mount(baseElement);
    }
    
    async saveAllRows() {
        this.translations.forEach(translation => {
            this.saveTranslation(translation);
            translation.changed = false;
        });
    }

    async saveNewRow(translation, event) {
        translation.Locale.name = this.locales.find(l => l.identifier === translation.Locale.identifier).name;
        this.translations.push(translation);
        this.saveTranslation(translation);
    }

    async saveTranslation(translation) {
        await RestApi.setTranslation(translation.Locale.identifier, translation.translationKey, translation.value);
        translation.changed = false;
    }

    async updateData() {
        this.locales = await RestApi.fetchModel("Locale");
        this.translations = (await RestApi.getAllTranslations()).data;
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
