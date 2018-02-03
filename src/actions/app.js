import axios from 'axios';
import store from './../reducers';
import Config from './../config.json';

export async function loginUser(request) {

    /* FIX ME */

    return axios.post(Config.auth_url + "login-user", {
        username: request.username,
        password: request.password,
        client_id: Config.client_id,
        client_secret: Config.client_secret,
        grant_type: "password"
    }).then(response => {

        let auth_data = response.data;
        
        // Save access_token in localStorage
        localStorage.setItem('access_token', auth_data.access_token); 
        localStorage.setItem('refresh_token', auth_data.refresh_token);

        // Add access_token to axios
        axios.defaults.headers.common['Authorization'] = "Bearer " + auth_data.access_token; 
        axios.defaults.headers.common['Content-Type'] = "application/json";

        return {
            type: 'LOGIN_USER',
            payload: response
        }

    }).catch(err => {

        console.log(err);

    });

}

export function getUserInfo() {

    /* FIX ME */

    return axios.get(Config.api_url + 'user/me?populate=teams&extension=true').then(response => {

        return {
            type: 'GET_USER_INFO',
            payload: response
        }

    }).catch(err => {

        console.log(err);

    });

}

export function restoreLogin(request) {

    return {
        type: 'RESTORE_LOGIN',
        payload: request
    };

}