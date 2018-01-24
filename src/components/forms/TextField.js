import React, { Component } from 'react';
import { withFormsy } from 'formsy-react';

class TextField extends Component {

    constructor(props) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget.value);
    }

    render() {

        const inputSize = this.props.size ? 'form-control-' + this.props.size : ''
        const className = ( this.props.showError() && this.props.isFormSubmitted() || ( this.props.showRequired() && this.props.isFormSubmitted() ) ) ? 'form-control is-invalid' : 'form-control';

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        const errorMessage = this.props.getErrorMessage();

        return (
            <div className="form-group">
                <label htmlFor={this.props.id} className="form-label">{ this.props.label } { this.props.isRequired() ? '*' : null }</label>
                <input
                    formNoValidate={true}
                    id={this.props.id}
                    className={className + ' ' + inputSize} 
                    type={this.props.type ? this.props.type : 'text'}
                    onChange={this.changeValue} 
                    value={this.props.getValue()} 
                    placeholder={this.props.placeholder}/>
                <div className='invalid-feedback'>{ this.props.getErrorMessage() ? this.props.getErrorMessage() : null }</div>
                <div className='invalid-feedback'>{ this.props.showRequired() ? 'This field is required' : null }</div>
            </div>
        );

    }

}

export default withFormsy(TextField);