<template>
<div id="vue-notification-container"
class="d-flex flex-column mw-100 me-1"
style="width: 450px; position: fixed; right: 20px; bottom: 20px;">
    <div v-for="notification in notifications"
        class="notification card bg-dark text-light w-100 mb-1 border"
        :class="border-`${notification.type || 'white'}`"
        :key="notification">
        <div class="card-header d-flex justify-content-between" :class="`border-${notification.type || 'white'}`">
        <h4>{{ notification.title }}</h4>
        <div>
            <i class="bi bi-x-square-fill link-danger"
            style="cursor: pointer; font-size: 1.25em;"
            @click="removeNotification(notification)"></i>
        </div>
        </div>
        <div class="card-body">
            <p class="m-0">{{ notification.text }}</p>
        </div>
    </div>
</div>
</template>

<script>
    module.exports = {
        name: "vue-notifications",
        props: {
            notifications: Array
        },
        methods: {
            removeNotification(notification) {
                this.$emit('remove-notification', notification)
            }
        }
    };
</script>

<style>

</style>
