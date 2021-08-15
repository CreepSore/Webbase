/**
 * Implements a wrapper for RestAPI calls
 * @class RestApi
 */
class RestApi {
    static errorHandler(xhr, textStatus, error) {
        location.reload();
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
}
