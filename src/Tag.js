import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { Link } from 'react-router-dom';
import moment from 'moment'
import FilterBar from './components/FilterBar';
import Item from './components/Item';

class Tag extends Component {

    constructor(props) {

        super(props);
        //console.log("props of tags", this.props.match.params.tag, this.props.match.params.filter)

        this.state = {
            posts: [],
            loading: true,
            tag: this.props.match.params.tag,
            filter: this.props.match.params.filter
        }

    } 

    componentDidMount() {

        this.loadContent(this.props.match.params.tag, this.props.match.params.filter)

    }

    componentWillReceiveProps(nextProps) {        

        if( nextProps.match.params.tag != this.state.tag || nextProps.match.params.filter != this.state.filter ) {
            this.setState({
                tag: nextProps.match.params.tag,
                filter: nextProps.match.params.filter,
                loading: true
            },
            () => {
                this.loadContent(this.state.tag, this.state.filter);
            });
            
        }

    }

    loadContent(tag, filter) {

        console.log("loadContent called", tag, filter)

        let query = {
            'tag': tag,
            'limit': 30,
        }

        if(filter == 'trending') {

            steem.api.getDiscussionsByTrending(query, (err, result) => {

                console.log("result", result)
            
                this.setState({
                    posts: result,
                    loading: false
                });

            });

        } else if(filter == 'new') {

            steem.api.getDiscussionsByCreated(query, (err, result) => {
            
                this.setState({
                    posts: result,
                    loading: false
                });

            });

        } else if(filter == 'hot') {

            steem.api.getDiscussionsByHot(query, (err, result) => {
            
                this.setState({
                    posts: result,
                    loading: false
                });

            });
            
        } else if(filter == 'promoted') {

            steem.api.getDiscussionsByPromoted(query, (err, result) => {
            
                this.setState({
                    posts: result,
                    loading: false
                });

            });

        } else {

            this.props.history.push('trending');

        }

    }

    renderPosts() {

        if(this.state.loading) {
            return (
                <div className="row w-100 h-100 justify-content-center mt-5">

                    <div class="loader">Loading...</div>

                </div>
            )
        } else {
            return (
                <div className="row">
                    { 
                    this.state.posts.map(

                        (Post) =>
                            <Item key={ Post.id } ref={ Post.id } data={ Post } />
                        ) 
                    }
                </div>
            )
        }

    }

    render() {
        
        
        return [
            <FilterBar { ...this.props } key="filter-bar" path={ "/tag/" + this.state.tag + "/" } />,
            <div key="posts">{ this.renderPosts() }</div>
        ]
        
    }

}

function mapStateToProps(state) {

    return { 
        search: state.search
    };
    
}


export default connect(mapStateToProps, {})(Tag);
