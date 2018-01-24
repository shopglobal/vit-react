import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import List from './../featured.json'

class FeaturedChannels extends Component {

    constructor(props) {

        super(props);

        this.state = {
            featured: List
        }  

    } 

    componentDidMount() {}

    render() {
        
        return (
            <div>
                <h3>Featured Channels</h3>
                <ul className="list-unstyled">
                    { 

                    this.state.featured.map(

                        (Channel) =>
                            <li key={ Channel.url } ref={ Channel.url }>
    
                                <NavLink to={ '/channel/' + Channel.url }>
                                    { Channel.name }
                                </NavLink>
                            </li>
                        ) 

                    }
                </ul>
                <button className="btn btn-dark btn-block btn-sm">Discover</button>
            </div>
        )
        
    }

}

function mapStateToProps(state) {

    return { 
        search: state.search
    };
    
}

export default connect(mapStateToProps, {})(FeaturedChannels);
