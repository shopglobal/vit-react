import axios from 'axios';
import store from './../reducers';
import Config from './../config.json';

export function getUsers(request) {

    /* FIX ME */
    
    return axios.get(Config.api_url + 'team/' + request.team_id + '/users?populate=teams,extension,role,plan&private_chats=true&limit=1000&skip=0').then(response => {

        return {
            type: 'GET_USERS',
            payload: response.data
        }

    }).catch(err => {

        console.log(err);

    });

}