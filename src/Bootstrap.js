import React, { Component } from 'react';
import LeftSidebar from './components/LeftSidebar';
import Header from './components/Header';

class Bootstrap extends Component {

    render() {

        return [
            <Header key="header"/>,
            <div className="row mx-0 content-wrapper h-100" key="content-wrapper">
                <LeftSidebar { ...this.props } />
                <div className="col content">
                    { this.props.children }
                </div>
            </div>
        ]

    }

}


export default Bootstrap;
