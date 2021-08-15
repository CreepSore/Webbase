class Notifications {
    // @ts-ignore
    static setupComponent() {
        return {
            props: {
                notifications: Array
            },
            template: `
<div id="vue-notification-container"
class="d-flex flex-column mw-100 me-1"
style="width: 450px; position: absolute; right: 0; bottom: 0;">

<div v-for="notification in notifications" class="notification card bg-dark text-light w-100 mb-1 border" :class="\`border-\${notification.type || 'white'}\`">
    <div class="card-header d-flex justify-content-between" :class="\`border-\${notification.type || 'white'}\`">
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
            `,
            methods: {
                removeNotification(notification) {
                    this.$emit('remove-notification', notification)
                }
            }
        };
    }
}
