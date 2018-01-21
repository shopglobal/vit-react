import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import FeaturedChannels from './FeaturedChannels';

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

            this.setState({
                tags: result,
                loading: false
            });

        });

    }

    toggleTags() {

        var node = ReactDOM.findDOMNode(this.refs.taglist);
        node.classList.toggle('tag-list');

    }

    renderTags() {
        if(this.state.loading) {
            return (
                <div>Loading</div>
            )
        } else {
            return [
                <ul className="list-unstyled tag-list" ref="taglist" key="tag-list">
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
                </ul>,

                <button className="btn btn-dark btn-block" onClick={(e) => this.toggleTags(e)} key="tag-button-control">Expand</button>
            ]
        }
    }

    render() {
        
        return (
            <div className="col left-sidebar">
                { this.renderTags() }
                <FeaturedChannels/> 
            </div>
        )
        
    }

}

function mapStateToProps(state) {

    return { 
        search: state.search
    };
    
}

export default connect(mapStateToProps, {})(LeftSidebar);
