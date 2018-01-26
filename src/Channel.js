import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';

class Channel extends Component {

    constructor(props) {

        super(props);
        //console.log("props of tags", this.props.match.params.tag, this.props.match.params.filter)

        /*
        this.state = {
            posts: [],
            loading: true,
            tag: this.props.match.params.tag,
            author: this.props.match.params.author,
            permalink: this.props.match.params.permalink
        }
        */

    } 

    componentDidMount() {

        //this.loadContent(this.props.match.params.author, this.props.match.params.permalink)

    }


    loadContent(author, permalink) {

        console.log("loadContent Post", author, permalink)

    }

    render() {
        
        return (
            <div>
                Channel view. Work in progress.
            </div>
        )
        
    }

}

function mapStateToProps(state) {

    return { 
        app: state.app
    };
    
}


export default connect(mapStateToProps, {})(Channel);
