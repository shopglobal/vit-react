import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'moment-timezone';
import steem from 'steem';

import axios from 'axios';
import reducers from './reducers';

// Styling
import './sass/bootstrap.scss';
import './sass/App.scss';
import './sass/Select.scss';
import './sass/VideoPlayer.scss';
import './sass/Header.scss';
import './sass/LeftSidebar.scss';
import './sass/Item.scss';
import './sass/Upload.scss';


// Components
import Bootstrap from './Bootstrap';
import Home from './Home';
import Tag from './Tag';
import Post from './Post';
import Login from './Login';
import Channel from './Channel';
import Upload from './Upload';

// Add Steem
steem.api.setOptions({ url: 'https://api.steemit.com'});

ReactDOM.render((
    <Provider store={reducers}>
        <Router>
            <Switch>

                <Route exact path="/login" component={ Login } /> 
                
            	<Bootstrap>

                    <Route 
                        exact
                        path="/:filter?" 
                        render={ props => { 

                            if( props.location.pathname != '/upload') return <Home {...props} /> 
                            else return null;

                        } } 
                    />
        
                	<Route path="/tag/:tag/:filter" component={ Tag } />  
                	<Route exact path="/:author/:permalink" component={ Post } /> 
                    <Route path="/upload" component={ Upload } /> 

                </Bootstrap> 

            </Switch>
        </Router>
    </Provider> 
), document.getElementById('root'));