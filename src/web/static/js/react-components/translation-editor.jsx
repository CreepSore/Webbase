let React = require("react");

let RestApi = require("../rest-api.js");

class TranslationEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {},
            locales: [],
            translations: [],
            changedTranslations: []
        };
        this.updateData();
    }

    render() {
        return (
            <div className="container-fluid table-responsive w-100">
                <table className="table table-sm table-hover table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Locale</th>
                            <th scope="col">Key</th>
                            <th scope="col">Value</th>
                            <th scope="col">Save</th>
                        </tr>
                        <tr>
                            <td>
                                <select
                                    className="form-select"
                                    onChange={this.updateFilter}
                                    name="locale">
                                    <option value=""></option>
                                    {this.state.locales.map(locale => <option value={locale.identifier} key={locale.id}>{ locale.name }</option>)}
                                </select>
                            </td>
                            <td><input className="form-control" type="text" onChange={this.updateFilter} name="key" /></td>
                            <td><input className="form-control" type="text" onChange={this.updateFilter} name="value" /></td>
                            <td><input className="form-control btn btn-primary" type="button" value="Save all" onClick={this.saveAllRows} /></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getFilteredTranslations().map(translation => 
                            <tr key={translation.id}>
                                <th scope="col" className="align-middle">{translation.Locale.name}</th>
                                <th scope="col" className="align-middle">{translation.translationKey}</th>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        onChange={(e) => this.setTranslationData(translation.id, e.target.value)}
                                        value={translation.value} />
                                </td>
                                <td>
                                    <input
                                        type="button"
                                        className={`form-control btn btn-sm ${!this.isChanged(translation.id) ? "btn-secondary" : "btn-primary"}`}
                                        value="Save"
                                        disabled={!this.isChanged(translation.id)}
                                        onClick={() => this.saveTranslation(translation.id)} />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    isChanged = (id) => {
        return this.state.changedTranslations.includes(id);
    }

    setChanged = (id, changed) => {
        let changedTranslations = this.state.changedTranslations;
        if (changed) {
            changedTranslations.push(id);
        } else {
            changedTranslations = changedTranslations.filter(t => t !== id);
        }
        this.setState({ changedTranslations });
    }

    getFilteredTranslations = () => {
        return this.state.translations.filter(t => {
            return (!this.state.filter.locale || t.Locale.identifier === this.state.filter.locale)
                && t.translationKey.toLowerCase().match(this.state.filter.key?.toLowerCase().replace(/\*/g, ".*"))
                && (!t.value || t.value.toLowerCase().match(this.state.filter.value?.toLowerCase().replace(/\*/g, ".*")))
        }).sort((a, b) => a.translationKey.localeCompare(b.translationKey))
            .sort((a, b) => a.Locale.name.localeCompare(b.Locale.name));
    }

    saveAllRows = async() => {
        let translations = this.state.changedTranslations;
        await Promise.all(translations.map(id => this.saveTranslation(id)));
    }

    saveTranslation = async(id) => {
        this.setChanged(id, false);
        let translation = this.state.translations.find(t => t.id === id);
        await RestApi.setTranslation(translation.Locale.identifier, translation.translationKey, translation.value);
    }

    setTranslationData = (id, value) => {
        this.state.translations.find(t => t.id === id).value = value;
        this.setState({ translations: this.state.translations });
        this.setChanged(id, true);
    }

    updateInput = (e, type) => {
        this.state[type][e.target.name] = e.target.value;
        this.setState({
            [type]: this.state[type]
        });
    }

    updateFilter = (e) => {
        this.updateInput(e, "filter");
    }

    updateData = async() => {
        let translations = ((await RestApi.getAllTranslations()).data || []).map(t => {
            if(!t.value) t.value = "";
            return t;
        });
        let locales = await RestApi.fetchModel("Locale");

        this.setState({translations, locales});
    }
}

module.exports = TranslationEditor;
