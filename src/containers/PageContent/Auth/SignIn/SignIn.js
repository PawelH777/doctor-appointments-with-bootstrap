import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../Form/Form';
import * as actions from '../../../../store/actions/auth';

class SignIn extends Component {
    state = {
        inputs: {
            email: {
                label: {
                    for: 'email',
                    value: 'Your e-mail'
                },
                attributes: {
                    id: 'email',
                    type: 'email',
                    placeholder: 'Your e-mail',
                    value: ''
                },
                validation: {
                    rules: {
                        required: {
                            errorMessage: 'E-mail is required'
                        },
                        isEmail: {
                            errorMessage: 'Wrong format'
                        }
                    },
                    errors: [],
                    isValid: false
                }
            },
            password: {
                label: {
                    for: 'password',
                    value: 'Password'
                },
                attributes: {
                    id: 'password',
                    type: 'password',
                    placeholder: 'Password',
                    value: ''
                },
                validation: {
                    rules: {
                        required: {
                            errorMessage: 'Password is required'
                        }
                    },
                    errors: [],
                    isValid: false
                }
            }
        },
        isFormValid: false
    }

    submitHandler = (form) => {
        const email = form.email.attributes.value;
        const password = form.password.attributes.value;
        this.props.onAuth(email, password);
        this.props.history.goBack();
    }

    render() {
        return (
            <Form
                inputs={this.state.inputs}
                submitted={this.submitHandler} />
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password))
    };
};

export default connect(null, mapDispatchToProps)(SignIn);