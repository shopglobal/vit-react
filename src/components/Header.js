import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FeaturedChannels from './FeaturedChannels';

class Header extends Component {

    constructor(props) {

        super(props);

        this.state = {

        }   

    } 

    componentDidMount() {

    }

    render() {
        
        return (
            <div className="row mx-0 header align-items-center" key="header">
                <div className="col logo-wrapper">
                    Welcome to ViceTube
                </div>
                <div className="col search-wrapper">
                    <div class="form-group my-0">
                        <input type="email" className="form-control" placeholder="Search something..." />
                    </div>
                </div>
                <div className="col controls-wrapper">
                    <div class="d-flex justify-content-end">
                        <button type="button" className="btn btn-light">Login</button>
                        <button type="button" className="btn btn-light mx-3">Signup</button>
                        <button type="button" className="btn btn-danger">Upload</button>
                    </div>
                </div>
            </div>
        )
        
    }

}

function mapStateToProps(state) {

    return { 
        search: state.search
    };
    
}

export default connect(mapStateToProps, {})(Header);
