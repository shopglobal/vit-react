import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { NavLink } from 'react-router-dom';

class LeftSidebar extends Component {

    constructor(props) {

        super(props);

        this.state = {
            tags: [],
            loading: true
        }   

    } 

    componentDidMount() {

        steem.api.getTrendingTags('life', 40, (err, result) => {
            console.log(result)
            this.setState({
                tags: result,
                loading: false
            });

        });

    }

    renderTags() {
        if(this.state.loading) {
            return (
                <div>Loading</div>
            )
        } else {
            return (
                <ul className="list-unstyled">
                    { 
                    this.state.tags.map(

                        (Tag) =>
                            <li key={ Tag.name } ref={ Tag.name }>
    
                                <NavLink activeClassName="active" to={ '/tag/' + Tag.name + '/trending' }>
                                    { Tag.name }
                                </NavLink>
                            </li>
                        ) 
                    }
                </ul>
            )
        }
    }

    render() {
        
        return [
            <div className="col left-sidebar" key="left-sidebar">
                { this.renderTags() }  
            </div>
        ]
        
    }

}

function mapStateToProps(state) {

    return { 
        search: state.search
    };
    
}

export default connect(mapStateToProps, {})(LeftSidebar);
