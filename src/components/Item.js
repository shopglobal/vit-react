import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'

class Item extends Component {

    constructor(props) {

        super(props);

    } 

    truncateTitle(title) {
        return title.substring(0, 40);
    }

    displayPayoutAmount(amount) {
        return parseInt(amount.replace(' SBD','')).toFixed(2);
    }

    render() {
        
        return (
            <div className="col-lg-3 col-md-4 item-wrapper mb-3" key={ this.props.data.id } ref={ this.props.data.id }>
                <Link to={ "/@" + this.props.data.author + "/" + this.props.data.permlink }>
                    <img src="http://via.placeholder.com/300x180" className="img-fluid"/>
                </Link>
                <div className="d-flex w-100">
                    <div className="title">
                        <Link to={ "/@" + this.props.data.author + "/" + this.props.data.permlink }>{this.truncateTitle(this.props.data.title)}</Link>
                    </div>
                    <div className="earnings text-right">
                        ${ this.displayPayoutAmount(this.props.data.pending_payout_value) }
                    </div>
                </div>
                <div className="meta-info">
                    <Link to={ "/@" + this.props.data.author }>{ this.props.data.author }</Link> &middot; { moment.utc(this.props.data.active).tz( moment.tz.guess() ).fromNow() }
                </div>
            </div>
        )
        
    }

}

function mapStateToProps(state) {

    return { 
        app: state.app
    };
    
}

export default connect(mapStateToProps, {})(Item);
