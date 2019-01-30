
const URL = "http://assignment.bunq.com/";

let token = '';
export const setToken = (value) => {
    token = value;
};

const promises = new Map();

const aborted = (promise) => {
    if (promises.get(promise)) {
        return {
            reason: 'abort',
        };
    }
    return false;
};

const request = (endpoint, method = 'GET', data = null, anonymously = false) => {
    const promise = new Promise((resolve, reject) => {
        const params = { method };
        let path = `${URL}/${endpoint}`;
        if (!anonymously) {
            params.headers = { 'Authorization': `Bearer ${token}` };
        }
        if (['POST', 'PATCH', 'PUT'].includes(method)) {
            if (data instanceof Object) {
                if (data instanceof FormData) {
                    params.body = data;
                } else {
                    params.headers = { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` };
                    params.body = JSON.stringify(data);
                }
            } else {
                throw new Error('Wrong data parameter in request call');
            }
        }

        //
        fetch(path, params)
            .then((response) => {
                if (!response.ok) {
                    return response.json()
                        .then(error => reject(aborted(promise) || {
                            apiErrorCode: error.code,
                            apiErrorMessage: error.message,
                            httpStatusCode: response.status,
                            httpStatusMessage: response.statusText,
                        }), () => reject(aborted(promise) || {
                            httpStatusCode: response.status,
                            httpStatusMessage: response.statusText,
                        }));
                }
                return response.json();
            })
            .then((json) => {
                if (promises.has(promise)) {
                    promises.delete(promise);
                }

                const error = aborted(promise);
                if (error) {
                    reject(error);
                } else {
                    resolve(json);
                }
            })
            .catch((error) => {
                if (promises.has(promise)) {
                    promises.delete(promise);
                }

                reject(aborted(promise) || {
                    message: error.message,
                });
            });
    });

    return promise;
};

export const abort = (promise) => {
    promises.set(promise, true);
};

export default request;
