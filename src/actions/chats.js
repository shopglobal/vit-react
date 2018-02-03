import axios from 'axios';
import store from './../reducers';
import Config from './../config.json';

export function getChats(request) {

    /* FIX ME */

    return axios.get(Config.api_url + 'chat?populate=users,last_message&sort=updatedAt+DESC&unread=true&team=' + request.team_id + '&limit=1000&skip=0').then(response => {
        console.log("response.data", response.data)
        return {
            type: 'GET_CHATS',
            payload: response.data
        }

    }).catch(err => {

        console.log(err);

    });

}

export function getFavouriteGroups(request) {

    /* FIX ME */
    
    return axios.get(Config.api_url + 'chat?populate=users&favorite=true&unread=true&type=room&sort=last_message_time+DESC&team=' + request.team_id + '&last_message_time_from=2017-10-24T20%3A50%3A44Z').then(response => {

        return {
            type: 'GET_FAVOURITE_GROUPS',
            payload: response.data
        }

    }).catch(err => {

        console.log(err);

    });

}

export function getFavouriteDirect(request) {

    /* FIX ME */
    
    return axios.get(Config.api_url + 'chat?populate=users&favorite=true&unread=true&type=private&sort=last_message_time+DESC&team=' + request.team_id + '&last_message_time_from=2017-10-24T20%3A50%3A44Z').then(response => {

        return {
            type: 'GET_FAVOURITE_DIRECT',
            payload: response.data
        }

    }).catch(err => {

        console.log(err);

    });

}

export function createChat(request) {

    /* FIX ME */
    
    return axios.post(Config.api_url + 'chat', {

        type: request.type,
        team: request.team_id,
        users: request.users,
        name: request.name,
        purpose: request.purpose

    }).then(response => {

        return {
            type: 'ADD_CHAT',
            payload: response.data
        }

    }).catch(err => {

        console.log(err);

    });

}

export function sendMessage(request) {

    /* FIX ME */

    return axios.post(Config.api_url + 'chat/' + request.chat_id + "/messages/", {

        "type": request.type,
        "body": request.body

    }).then(response => {

        return response.data;

    }).catch(err => {

        console.log(err);

    });
    
}

export function unpinChat(request) {

    /* FIX ME */

    return axios.patch(Config.api_url + 'chat/' + request.chat_id + "/users/" + request.user_id, {

        "favorite": request.isFavourite

    }).then(response => {

        console.log("chat unpinned/unpinned", response)

        return {
            type: 'UNPIN_CHAT',
            payload: response.data[0]
        }

    }).catch(err => {

        console.log(err);

    });

}

export function getMessages(request) {

    /* FIX ME */

    return axios.get(Config.api_url + 'chat/' + request.chat_id + "/messages").then(response => {

        return {
            type: 'MESSAGES',
            payload: response.data.reverse()
        }

    }).catch(err => {

        return err;

    });

}

export function updateChat(request) {

    console.log("updateChat was called", request)

    return {
        type: 'UPDATE_CHAT',
        payload: request
    }

}