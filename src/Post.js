import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { Player } from 'video-react';

class Post extends Component {

    constructor(props) {

        super(props);
        //console.log("props of tags", this.props.match.params.tag, this.props.match.params.filter)

        this.state = {
            posts: [],
            loading: true,
            tag: this.props.match.params.tag,
            author: this.props.match.params.author,
            permalink: this.props.match.params.permalink
        }

    } 

    componentDidMount() {

        this.loadContent(this.props.match.params.author, this.props.match.params.permalink)

    }


    loadContent(author, permalink) {

        console.log("loadContent Post", author, permalink)

    }

    render() {
        
        return (
            <div>
                <Player
                    playsInline
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                />
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
