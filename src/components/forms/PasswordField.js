import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';
import ReactDOM from 'react-dom';

class PasswordField extends Component {

    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget.value);
    }

    togglePasswordVisibility(field_id) {

        const field = ReactDOM.findDOMNode( this.refs[field_id] ),
        toggle = ReactDOM.findDOMNode( this.refs['toggle'] );

        if( field.getAttribute('type') == 'password') {
            field.setAttribute("type", "text");
            toggle.innerHTML = 'Hide';
        } else {
            field.setAttribute("type", "password");
            toggle.innerHTML = 'Show';
        }
    }

    render() {

        const className = ( this.props.showError() && !this.props.isValid() || ( this.props.showRequired() && this.props.isFormSubmitted() ) ) ? 'form-control is-invalid inset-control' : 'form-control';

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        const errorMessage = this.props.getErrorMessage();

        return (
            <div className="form-group inset-control">
                <label htmlFor={this.props.id} className="form-label">{ this.props.label } { this.props.isRequired() ? '*' : null }</label>
                <input 
                    ref={this.props.id}
                    id={this.props.id}
                    className={className} 
                    type="password"
                    onChange={this.changeValue} 
                    value={this.props.getValue()} 
                    autoComplete="off" 
                    placeholder={this.props.placeholder}/>

                <a ref="toggle" className="btn btn-link btn-sm" onClick={() => this.togglePasswordVisibility(this.props.id)}>Show</a>

                <div className='invalid-feedback'>{ this.props.getErrorMessage() ? this.props.getErrorMessage() : null }</div>
                <div className='invalid-feedback'>{ this.props.showRequired() ? 'This field is required' : null }</div>
            </div>
        );

    }

}

export default withFormsy(PasswordField);