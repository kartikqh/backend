import { getAPI, patchAPI, postAPI, putAPI} from "../src/utils/api";

import endPoints from "../src/utils/endpoints";





export const LoginNew = (payload, callBack, errorCallback) => {
    return (dispatch) => {
        postAPI(
            endPoints.LOGIN_NEW,
            payload,
            (response) => {
                console.log('Response For Login', response);
                callBack(response);
            },
            (error) => {
                console.log('Error While Login', error);
                errorCallback(error)
            },
        );
    };
};

export const SignUp = (payload, callBack, errorCallback) => {
    return (dispatch) => {
        postAPI(
            endPoints.SIGN_UP,
            payload,
            (response) => {
                console.log('Response For Login', response);
                callBack(response);
            },
            (error) => {
                console.log('Error While Login', error);
                errorCallback(error)
            },
        );
    };
};

export const SubmitCar = (payload, callBack, errorCallback,manualToken) => {
    return (dispatch) => {
        putAPI(
            endPoints.GET_CAR,
            payload,
            (response) => {
                console.log('Response For Patch Api', response);
                callBack(response);
            },
            (error) => {
                console.log('Error While Submit', error);
                errorCallback(error)
            },
            manualToken
        );
    };
};

export const GetCar = (payload, callBack, errorCallback,manualToken) => {
    return (dispatch) => {
        getAPI(
            endPoints.GET_CAR,
            payload,
            (response) => {
                console.log('Response For Get Car', response);
                callBack(response);
            },
            (error) => {
                console.log('Error While Fetching Car', error);
                errorCallback(error)
            },
            manualToken
        );
    };
};

