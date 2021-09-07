let React = require("react");
let uuid = require("uuid");

let RestApi = require("../rest-api.js");
let Notifications = require("./notifications.jsx");
let Translatable = require("./translatable.jsx");


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: {
                type: ""
            },
            notifications: [],
            input: {

            },
            t: {}
        };
    }

    render = () => {
        return (
            <div className="w-100">
                <div className={"w-100 bg-" + (this.state.alert.type || "primary")}
                    style={{
                        position: "fixed",
                        left: "0",
                        top: "0",
                        bottom: "0",
                        width: "320px",
                        maxWidth: "25%"
                    }}></div>
                <Translatable 
                    keys={{
                        header: 'LOGIN::HEADER',
                        btnLogin: 'LOGIN::BTN::LOGIN',
                        btnRegister: 'LOGIN::BTN::REGISTER',
                        placeholderUsername: 'LOGIN::PLACEHOLDER::USERNAME',
                        placeholderPassword: 'LOGIN::PLACEHOLDER::PASSWORD'
                    }}
                    afterUpdate={(t) => {this.setState({t});}} />
                <div className="container d-flex justify-content-center align-items-center h-100">
                    <div className={`card border border-2 w-50 border-${this.state.alert.type || 'primary'}`} style={{minWidth: "250px"}}>
                        <div className="card-header">
                            <h2>{this.state.t.header}</h2>
                        </div>
                        <div className="card-body">
                            <input type="text"
                                className="form-control mb-1"
                                placeholder={this.state.t.placeholderUsername}
                                id="username"
                                aria-autocomplete="none"
                                name="username"
                                onChange={this.updateInputValue} />

                            <input type="password"
                                className="form-control mb-2"
                                placeholder={this.state.t.placeholderPassword}
                                id="password"
                                aria-autocomplete="none"
                                name="password"
                                onChange={this.updateInputValue} />

                            <button type="submit"
                                className={`btn form-control btn-${this.state.alert.type || 'primary'}`}
                                onClick={this.doLogin}>{this.state.t.btnLogin}</button>

                            <button className="btn btn-sm btn-outline-secondary form-control mt-2"
                                onClick={this.doRegister}>{this.state.t.btnRegister}</button>
                        </div>
                    </div>
                </div>

                <Notifications
                    onClose={this.onCloseNotification}
                    notifications={this.state.notifications} />
            </div>
        )
    }

    /**
     * @param {string} title
     * @param {string} text
     * @param {"primary"|"success"|"danger"|"warn"|"info"|"secondary"|string} type
     */
    addNotification = (title, text, type) => {
        this.setState({
            notifications: this.state.notifications.concat({
                key: uuid.v4(),
                title: title,
                text: text,
                type: type
            })
        });
    }

    closeNotification = (key) => {
        this.setState({notifications: this.state.notifications.filter(notification => notification.key !== key)});
    }

    onCloseNotification = (key) => {
        this.closeNotification(key);
    }

    updateInputValue = (e) => {
        this.setState({
            input: {
                [e.target.name]: e.target.value
            }
        })
    }

    doLogin = async() => {
        // @ts-ignore
        const {username, password} = this.state.input;

        try {
            // @ts-ignore
            const result = await RestApi.login(username, password);
            let type = "success";
            if(result.error) type = "danger";
            this.addNotification("Info", result.message || result.error, type);
        }
        catch(err) {
            console.log("k");
        }
    }

    doRegister = async() => {
        // @ts-ignore
        const {username, password} = this.loginForm;

        // @ts-ignore
        const result = await RestApi.register(username, password);
        let type = "primary";
        if(result.error) type = "danger";
        this.addNotification("Info", result.message || result.error, type);
    }
}

module.exports = LoginForm;
