// eslint-disable-next-line no-unused-vars
class RestApi {
    /**
     * @typedef {Object} BaseResponse
     * @property {Boolean} success
     * @property {String} [errorstack]
     * @property {String} [error]
     * @property {Object} [result]
     */

    /**
     * @static
     * @param {BaseResponse} data
     * @param {(value: any) => void} res
     * @param {(value: any) => void} rej
     * @return {void}
     * @memberof RestApi
     */
    static defaultAjaxCallback(data, res, rej) {
        return data.success ? res(data.result) : rej(data.errorstack || data.error);
    }

    /**
     * @static
     * @param {String} model
     * @param {"GET"|"UPDATE"|"DELETE"|"INSERT"} method
     * @param {Object} options
     * @return {Promise<Object>}
     * @memberof RestApi
     */
    static doModelRequest(model, method, options) {
        return new Promise((res, rej) => {
            $.post(`/api/v1/model/${model}/${method}`, options, d => this.defaultAjaxCallback(d, res, rej));
        });
    }

    /**
     * @static
     * @param {String} model
     * @param {Object} options
     * @return {Promise<Object>}
     * @memberof RestApi
     */
    static getModel(model, options) {
        return this.doModelRequest(model, "GET", {options});
    }

    /**
     * @static
     * @param {String} model
     * @param {Object} values
     * @param {Object} options
     * @return {Promise<Object>}
     * @memberof RestApi
     */
    static updateModel(model, values, options) {
        return this.doModelRequest(model, "UPDATE", {values, options});
    }

    /**
     * @static
     * @param {String} model
     * @param {Object} options
     * @return {Promise<Object>}
     * @memberof RestApi
     */
    static deleteModel(model, options) {
        return this.doModelRequest(model, "DELETE", {options});
    }

    /**
     * @static
     * @param {String} model
     * @param {Object} options
     * @return {Promise<Object>}
     * @memberof RestApi
     */
    static insertModel(model, options) {
        return this.doModelRequest(model, "INSERT", {options});
    }
}
