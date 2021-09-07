/**
 * Implements a wrapper for RestAPI calls
 * @class RestApi
 */
 class RestApi {
    static errorHandler(xhr, textStatus, error) {
        console.error(error, xhr, textStatus);
        return {success: false, error};
    }

    static login(username, password) {
        return new Promise(res => {
            $.post("/api/v1/usermgmt/login", {
                username,
                password
            }).done((data, status, xhr) => {
                if(data.href) {
                    location.href = data.href;
                }

                if(data.reload) {
                    location.reload();
                }

                res(data);
            }).catch(this.errorHandler);
        });
    }

    static register(username, password) {
        return new Promise(res => {
            $.post("/api/v1/usermgmt/register", {
                username,
                password
            }).done((data, status, xhr) => {
                if(data.href) {
                    location.href = data.href;
                }

                if(data.reload) {
                    location.reload();
                }

                res(data);
            }).catch(this.errorHandler);
        });
    }

    static fetchModel(modelName, where = null) {
        return new Promise(res => {
            if(!where) {
                $.get(`/api/v1/model/${modelName}`)
                    .done((data, status, xhr) => {
                        res(data);
                    }).catch(this.errorHandler);
            }
            else {
                $.post(`/api/v1/model/${modelName}/filter`, where)
                    .done((data, status, xhr) => {
                        res(data);
                    }).catch(this.errorHandler);
            }
        });
    }

    static getModelMeta(modelName) {
        return new Promise(res => {
            $.get(`/api/v1/model/${modelName}/metadata`)
                .done((data, status, xhr) => {
                    res(data);
                }).catch(this.errorHandler);
        });
    }

    static deleteModel(modelName, where = null) {
        return new Promise(res => {
            $.post(`/api/v1/model/${modelName}/delete`, where)
                .done((data, status, xhr) => {
                    res(data);
                }).catch(this.errorHandler);
        });
    }

    static updateModel(modelName, where, data) {
        return new Promise(res => {
            $.post(`/api/v1/model/${modelName}/update`, {
                where,
                data
            }).done((data, status, xhr) => {
                res(data);
            }).catch(this.errorHandler);
        });
    }

    static createModel(modelName, data) {
        return new Promise(res => {
            $.post(`/api/v1/model/${modelName}/create`, data)
                .done((data, status, xhr) => {
                    res(data);
                }).catch(this.errorHandler);
        });
    }

    static modelCustomUrl(modelName, url, method, data = {}) {
        return new Promise(res => {
            $[method.toLowerCase()](`/api/v1/model/${modelName}${url}`, data)
                .done((data, status, xhr) => {
                    res(data);
                }).catch(this.errorHandler);
        });
    }

    static async getSessionParameter(param) {
        return new Promise(res => {
            $.get(`/api/v1/usermgmt/getSessionParameter/${param}`)
                .done((data, status, xhr) => {
                    res(data);
                }).catch(this.errorHandler);
        });
    }

    static async setSessionParameter(param, data) {
        return new Promise(res => {
            $.post(`/api/v1/usermgmt/setSessionParameter/${param}`, {value: data})
                .done((data, status, xhr) => {
                    res(data);
                }).catch(this.errorHandler);
        });
    }

    static async runQuery(user, password, host, query, params = []) {
        return new Promise((res, rej) => {
            $.post(`/api/v1/runQuery/${user}/${password}/${host}`, {query, params})
                .done((data, status, xhr) => {
                    if(!data?.success) {
                        this.errorHandler(null, null, data.error);
                        rej(data.error);
                        return;
                    }
                    res(data.data);
                }).catch(this.errorHandler);
        });
    }

    static async getAllTranslations() {
        return await this.modelCustomUrl("Translation", `/getAll`, "GET");
    }

    static async getTranslation(locale, key, replaceKeys = {}) {
        return await this.modelCustomUrl("Translation", `/getTranslation/${locale}/${key}`, "POST", replaceKeys);
    }

    static async setTranslation(locale, key, value) {
        return await this.modelCustomUrl("Translation", `/setTranslation/${locale}/${key}`, "POST", {value});
    }
}

// @ts-ignore
window.RestApi = RestApi;
module.exports = RestApi;
