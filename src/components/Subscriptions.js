import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import List from './../featured.json'

class Subscriptions extends Component {

    constructor(props) {

        super(props);

        this.state = {
            subscriptions: [],
            loading: true
        }  

    } 

    componentDidMount() {

        steem.api.getFollowing('sundaybaking', 0, 'blog', 10, (err, result) => {

            console.log(result)

            this.setState({
                subscriptions: result,
                loading: false
            });

        });

    }

    renderSubscription() {

        if( !this.props.app.username && !this.props.app.publicWif ) {
            return null;
        }

        if(this.state.loading) {
            return (
                <div>Loading</div>
            )
        } else {
            return [
                <h3 key="section-title">Subscriptions</h3>,
                <ul className="list-unstyled" ref="subscriptions" key="subscriptions-list">
                    { 

                    this.state.subscriptions.map(

                        (Subscription) =>
                            <li key={ Subscription.following } ref={ Subscription.following }>
    
                                <NavLink to={ '/channel/' + Subscription.following }>
                                    { Subscription.following }
                                </NavLink>
                            </li>
                        ) 

                    }
                </ul>
            ]
        }
    }

    render() {
        
        return this.renderSubscription();
        
    }

}

function mapStateToProps(state) {

    return { 
        app: state.app
    };
    
}

export default connect(mapStateToProps, {})(Subscriptions);
