import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { Player, BigPlayButton } from 'video-react';

class Post extends Component {

    constructor(props) {

        super(props);

        this.state = {
            post: '',
            loading: true,
            tag: this.props.match.params.tag,
            author: this.props.match.params.author,
            permalink: this.props.match.params.permalink
        }

    } 

    componentDidMount() {

        this.loadContent(this.props.match.params.author, this.props.match.params.permalink)

    }

    getVotes(votes) {

        if(votes) {
            return (
                <button type="button" className="btn btn-dark btn-sm">Like <span className="votes">{votes.length}</span></button>
            )
        }
        

    }


    loadContent(author, permalink) {

        console.log("loadContent Post", author, permalink)

        steem.api.getContent(author, permalink, (err, result) => {

            let post = result;

            console.log("Got post", post)

            steem.api.getAccounts([post.author], (err, result) => {

                post.author_profile = result[0];
                post.author_profile.json_metadata = JSON.parse(result[0].json_metadata);

                this.setState({
                    loading: false,
                    post: post
                });

            });

        });

    }

    displayPayoutAmount(amount) {
        if(amount) return parseInt(amount.replace(' SBD','')).toFixed(2);
    }

    render() {
        
        return (
            <div className="row justify-content-center">
                <div className="col-lg-9 col-md-10 col-10 mt-5 video-post">
                    <Player
                        playsInline
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    >
                        <BigPlayButton position="center" />
                    </Player>

                    {
                        !this.state.loading ? (
                            
                            <span>
                                <div className="row video-info mx-0">
                                    <div className="col-10">
                                        <h2>{ this.state.post.title }</h2>
                                    </div>
                                    <div className="col-2 text-right amount">
                                        ${ this.displayPayoutAmount(this.state.post.pending_payout_value) }
                                    </div>
                                </div>
                                <div className="row video-meta mx-0 align-items-center">
                                    <div className="col-6 author px-0">
                                        <div className="d-flex author-card-wrapper align-items-center">
                                            <div className="avatar-holder">

                                                <img className="rounded-circle" src={ this.state.post.author_profile.json_metadata.profile.profile_image }/>

                    
                                            </div>
                                            <div className="data-holder">
                                                { this.state.post.author }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 meta text-right px-0">
                                        { this.getVotes(this.state.post.active_votes) }
                                    </div>
                                </div>
                            </span>

                        ) : (
                            <div className="row w-100 h-100 justify-content-center mt-5">
                                <div className="loader">Loading...</div>
                            </div>
                        )
                    
                    }
                    
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


export default connect(mapStateToProps, {})(Post);
