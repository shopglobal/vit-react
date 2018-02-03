import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class FilterBar extends Component {

    constructor(props) {

        super(props);

        console.log("PROPS OF FILTER", this.props)

        this.state = {

        }   

    } 

    render() {
        
        return [
            <ul className="col filter-bar" key="filter-bar">
                <li><NavLink to={ this.props.path + "trending"} activeClassName="active">Trending</NavLink></li>
                <li><NavLink to={ this.props.path + "new"} activeClassName="active">New</NavLink></li>
                <li><NavLink to={ this.props.path + "hot"} activeClassName="active">Hot</NavLink></li>
                <li><NavLink to={ this.props.path + "promoted"} activeClassName="active">Promoted</NavLink></li>
            </ul>
        ]
        
    }

}

function mapStateToProps(state) {

    return { 
        search: state.search
    };
    
}

export default connect(mapStateToProps, {})(FilterBar);
