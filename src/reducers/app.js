const initialState = {

};

export default function(state = initialState, action) {

    switch(action.type) {

        case 'LOGIN_USER':

            if( action.payload.status == 200 ) {

                return Object.assign({}, state, {
                    unresolved: false, 
                    authorized: true, 
                    access_token: action.payload.data.access_token,
                    refresh_token: action.payload.data.refresh_token
                });

            } else {

                return Object.assign({}, state, {
                    unresolved: true, 
                    authorized: false, 
                    access_token: "",
                    refresh_token: ""
                });

            }

        break;

        case 'RESTORE_LOGIN':

            return Object.assign({}, state, {
                unresolved: action.payload.unresolved, 
                authorized: action.payload.authorized,
                access_token: action.payload.access_token,
                refresh_token: action.payload.refresh_token
            });

        break;

        case 'GET_USER_INFO':

            if( action.payload.status == 200 ) {
                
                return Object.assign({}, state, {
                    user: action.payload.data,
                    team: action.payload.data.teams[0]
                });

            } else {

                return state;
                
            }

        break;

        case 'LOGOUT':

            return Object.assign({}, state, {
            	unresolved: true, 
			    authorized: false, 
			    user: null,
                team: null,
			    call_registration: false,
			    access_token: "",
			    refresh_token: ""
            });

        break;

        case 'UPDATE_USER':

            let UpdatedObject = action.payload,
                UserObject = Object.assign({}, state.user); // clone user object to work with

            for (var property in UpdatedObject) {
                UserObject[property] = UpdatedObject[property]; // update the keys from UpdatedObject only
            }

            return Object.assign({}, state, {
                user: UserObject
            });

        break;


        default:
            return state;
    }

}