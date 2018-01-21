import React, { Component } from 'react';
import LeftSidebar from './components/LeftSidebar';

class Bootstrap extends Component {

    render() {

        return [
            <div className="row mx-0 header align-items-center" key="header">
                <div className="col">
                    Welcome to ViceTube
                </div>
            </div>,
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
