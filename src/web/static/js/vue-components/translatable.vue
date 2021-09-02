<template>
<div>
    <slot :t="t"></slot>
</div>
</template>

<script>
    let RestApi = require("../rest-api");
    module.exports = {
        data() {
            return {
                t: {}
            }
        },
        props: {
            locale: String,
            keys: Object,
            toTranslate: Object
        },
        methods: {
            async translateAll() {
                await Promise.all(Object.keys(this.toTranslate).map(async key => {
                    let mappingKey = key;
                    let translationKey = this.toTranslate[key];
                    if(!translationKey) return;

                    this.t[mappingKey] = (await RestApi.getTranslation(this.locale, translationKey, this.keys)).data;
                }));
            }
        },
        mounted() {
            this.translateAll();
        }
    };
</script>

<style>
</style>
