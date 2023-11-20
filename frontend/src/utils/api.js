import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000/",
    timeout: 30000,
});

const setAuthorizationToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common["authorization"] = `${token}`;
    } else {
        delete axiosInstance.defaults.headers.common["authorization"];
    }
};

const executeRequest = (method, endPoint, body, successCallback, errorCallback, manualToken) => {
    if (manualToken) {
        setAuthorizationToken(manualToken);
    } else {
        const token = localStorage.getItem('access_token');
        setAuthorizationToken("Bearer "+token);
    }
    const config = {
        method,
        url: endPoint,
        data: body,
        params: method === 'GET' || method === 'DELETE' ? body : null,
    };
    axiosInstance(config)
        .then((response) => {
            successCallback(response);
        })
        .catch((error) => {
            errorCallback(error);
        });
};

const getAPI = (endPoint, body, successCallback, errorCallback, manualToken) => {
    executeRequest('GET', endPoint, body, successCallback, errorCallback, manualToken);
};

const postAPI = (endPoint, body, successCallback, errorCallback, manualToken) => {
    executeRequest('POST', endPoint, body, successCallback, errorCallback, manualToken);
};

const putAPI = (endPoint, body, successCallback, errorCallback, manualToken) => {
    executeRequest('PUT', endPoint, body, successCallback, errorCallback, manualToken);
};

const patchAPI = (endPoint, body, successCallback, errorCallback, manualToken) => {
    executeRequest('PATCH', endPoint, body, successCallback, errorCallback, manualToken);
};

const deleteAPI = (endPoint, body, successCallback, errorCallback, manualToken) => {
    executeRequest('DELETE', endPoint, body, successCallback, errorCallback, manualToken);
};

export { axiosInstance, getAPI, postAPI, putAPI, patchAPI, deleteAPI };
