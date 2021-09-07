let React = require("react");

let RestApi = require("../rest-api.js");

class TranslationEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            t: {}
        };
        this.fetchTranslations();
    }

    render() {
        return (
            <template></template>
        );
    }

    fetchTranslations = async() => {
        let translations = {};
        let locale = this.props.locale;

        if(!this.props.keys) {
            console.warn("No keys to translate provided.");
            return;
        }

        if(!locale) {
            console.warn("No locale provided, trying to fetch from session storage ...");
            locale = (await RestApi.getSessionParameter("locale")).data;
            if(!locale) {
                console.warn("No locale provided, defaulting to 'en'");
                locale = "en";
            }
        }

        await Promise.all(Object.keys(this.props.keys || {}).map(async key => {
            translations[key] = (await RestApi.getTranslation(this.props.locale || "en", this.props.keys[key])).data;
        }));

        this.setState({t: translations});
        this.props.afterUpdate && this.props.afterUpdate(this.state.t);
    }
}

module.exports = TranslationEditor;
