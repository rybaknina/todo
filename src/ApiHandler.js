export default class ApiHandler {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    getTask(onSuccess, onError) {
        this.send(onError, onSuccess, `${this.apiUrl}/task`);
    }

    addToTask(onSuccess, onError, data) {
        this.send(onError, onSuccess, `${this.apiUrl}/task`, 'POST', JSON.stringify(data), {"Content-Type": "application/json"});
    }

    removeFromTask(onSuccess, onError, data, id) {
        this.send(onError, onSuccess, `${this.apiUrl}/task/` + id, 'DELETE', JSON.stringify(data), {"Content-Type": "application/json"});
    }

    updateTask(onSuccess, onError, data, id) {
        this.send(onError, onSuccess, `${this.apiUrl}/task/` + id, 'PUT', JSON.stringify(data), {"Content-Type": "application/json"});
    }

    send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {

        let xhr;

        if (window.XMLHttpRequest) {
            // Chrome, Mozilla, Opera, Safari
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            // Internet Explorer
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.timeout = timeout;

        xhr.ontimeout = onError;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    onSuccess(xhr.responseText);
                } else if (xhr.status >= 400) {
                    onError(xhr.status);
                }
            }
        }

        xhr.open(method, url, true);

        for (const [key, value] of Object.entries(headers)) {
            xhr.setRequestHeader(key, value);
        }

        xhr.send(data);
    }

}