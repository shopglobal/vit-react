import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterBar from './components/FilterBar';
import steem from 'steem';
import { Link } from 'react-router-dom';
import moment from 'moment'

class Home extends Component {

    constructor(props) {

        super(props);

        this.state = {
            'filter': '',
            'loading': true,
            'posts': []
        }

    } 

    componentDidMount() {

        if(!this.props.match.params.filter) this.props.history.push('trending');
        else {
            this.loadContent(this.props.match.params.filter);
        }

    }

    componentWillReceiveProps(nextProps) {      

        if( nextProps.match.params.filter != this.state.filter ) {
            this.setState({
                filter: nextProps.match.params.filter,
                loading: true
            },
            () => {
                this.loadContent(this.state.filter);
            });
            
        }

    }

    loadContent(filter) {

        console.log("Loading Filter", filter)

        let query = {
            'tag': '',
            'limit': 30,
        }

        if(filter == 'trending') {

            steem.api.getDiscussionsByTrending(query, (err, result) => {
            
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

    truncateTitle(title) {
        return title.substring(0, 40);
    }

    renderPosts() {
        if(this.state.loading) {
            return (
                <div>Loading</div>
            )
        } else {
            return (
                <div className="row">
                    { 
                    this.state.posts.map(

                        (Post) =>
                            <div className="col-lg-3 col-md-4 item-wrapper mb-3" key={ Post.id } ref={ Post.id }>
                                <Link to={ "/" + Post.author + "/" + Post.permlink }>
                                    <img src="http://via.placeholder.com/300x180" clasName="img-fluid"/>
                                </Link>
                                <div className="d-flex w-100">
                                    <div className="title">
                                        <Link to={ "/" + Post.author + "/" + Post.permlink }>{this.truncateTitle(Post.title)}</Link>
                                    </div>
                                    <div className="earnings text-right">
                                        $300,35
                                    </div>
                                </div>
                                <div class="meta-info">
                                    { Post.author } &middot; { moment.utc(Post.active).tz( moment.tz.guess() ).fromNow() }
                                </div>
                            </div>
                        ) 
                    }
                </div>
            )
        }
    }

    render() {
        
        return [
            <FilterBar { ...this.props } key="filter-bar" path="/"/>,
            <div key="posts">{ this.renderPosts() }</div>
        ]
        
    }

}

function mapStateToProps(state) {

    return { 
        search: state.search
    };
    
}


export default connect(mapStateToProps, {})(Home);
