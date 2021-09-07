let React = require("react");

class Notification extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div v-for="notification in notifications"
                className={`notification card bg-dark text-light w-100 mb-1 border border-${this.props.type || 'white'}`}>
                <div className={`card-header d-flex justify-content-between border-${this.props.type || 'white'}`}>
                <h4>{ this.props.title }</h4>
                <div>
                        <i className="bi bi-x-square-fill link-danger"
                        style={{
                            cursor: "pointer",
                            fontSize: "1.25em"
                        }}
                        onClick={this.props.onClose}></i>
                </div>
                </div>
                <div className="card-body">
                    <p className="m-0">{ this.props.text }</p>
                </div>
            </div>
        );
    }
}

class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="vue-notification-container"
                className="d-flex flex-column mw-100 me-1"
                style={{
                    width: "450px",
                    position: "fixed",
                    right: "20px",
                    bottom: "20px"
                }}>
                {this.props.notifications.map((notification) => {
                    return (
                        <Notification
                            key={notification.key}
                            title={notification.title}
                            type={notification.type}
                            text={notification.text}
                            onClose={() => this.props.onClose(notification.key)}
                            />
                    );
                })}
            </div>
        )
    }
}

module.exports = Notifications;
