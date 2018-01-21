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

// Components
import Bootstrap from './Bootstrap';
import Home from './Home';
import Tag from './Tag';
import Post from './Post';

// Add Steem
steem.api.setOptions({ url: 'https://api.steemit.com'});

ReactDOM.render((
    <Provider store={reducers}>
        <Router>
            <Switch>

            	<Bootstrap>

                	<Route exact path="/:filter?" component={ Home } />  
                	<Route path="/tag/:tag/:filter" component={ Tag } />  
                	<Route exact path="/:author/:permalink" component={ Post } /> 
                    
                </Bootstrap> 

            </Switch>
        </Router>
    </Provider> 
), document.getElementById('root'));