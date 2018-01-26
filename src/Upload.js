import React, { Component } from 'react';
import { connect } from 'react-redux';
import steem from 'steem';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from './components/Header';

class Upload extends Component {

    constructor(props) {

        super(props);

        this.state = {
            'uploading': false
        }

    } 

    componentDidMount() {

        

    }

    componentWillReceiveProps(nextProps) {    

    }

    

    render() {
        
        return (
            <div>Upload view. Work in progress.</div>
        )
        
    }

}

function mapStateToProps(state) {

    return { 
        search: state.search
    };
    
}


export default connect(mapStateToProps, {})(Upload);
