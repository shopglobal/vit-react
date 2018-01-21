import axios from 'axios';
import store from './../reducers';
import Config from './../config.json';

export async function loginUser(request) {   

}

export function getUserInfo() {

}

export function restoreLogin(request) {

    return {
        type: 'RESTORE_LOGIN',
        payload: request
    };

}