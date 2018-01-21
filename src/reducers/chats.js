import update from 'immutability-helper';
import _ from 'lodash';

const initialState = {
    all: [],
    favourite_direct: [],
    favourite_groups: []
};

export default function(state = initialState, action) {
    
    switch(action.type) {

        case 'GET_CHATS':

            var all_chats = {};

            action.payload.forEach(function(item, i) {

                if(item.type == 'room') {
                    all_chats[item.id] = item; // create associative array, filter out private chats
                }
                
            });

            return Object.assign({}, state, {
                all: all_chats
            });

        break;

        case 'GET_FAVOURITE_GROUPS':

            var favourite_groups = {}; // room

            action.payload.forEach(function(item, i) {
                favourite_groups[item.id] = item;
            });

            return Object.assign({}, state, {
                favourite_groups: favourite_groups
            });

        break;

        case 'GET_FAVOURITE_DIRECT':

            var favourite_direct = {}; // private

            action.payload.forEach(function(item, i) {
                favourite_direct[item.id] = item;
            });

            return Object.assign({}, state, {
                favourite_direct: favourite_direct
            });

        break;

        case 'ADD_CHAT':

            var NewChat = action.payload,
                ChatId = action.payload.id;

            if(NewChat.type == 'private') return state; // don't add new private chats to the list of all chats (TODO: fix it if it makes no sense)

            return update(
                state, {
                    all: {
                        [ChatId]: { $set: NewChat }
                    }
                }
            )


        break;

        case 'UPDATE_CHAT':

            console.log('UPDATE_CHAT got triggered', action.payload);

            var UpdatedChat = action.payload,
                ChatId = action.payload.id;

            return update(
                state, {
                    all: {
                        [ChatId]: { $set: UpdatedChat }
                    }
                }
            )

        break;

        case 'UNPIN_CHAT':

            return Object.assign({}, state, {
                favourite_groups: _.remove(state.favourite_groups, (item) => {
                    return item.id != action.payload.chat;
                })
            });


        break;

        default:

            return state;
            
    }

}