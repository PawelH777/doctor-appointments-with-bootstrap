import React, { Component } from 'react';

import Form from '../../../../containers/Form/Form';
import axios from 'axios';
import axiosAppointments from '../../../../axios-appointments';

class SignUp extends Component {
    state = {
        inputs: {
            name: {
                label: {
                    for: 'name',
                    value: 'First name'
                },
                attributes: {
                    id: 'name',
                    type: 'text',
                    placeholder: 'Name',
                    value: ''
                },
                validation: {
                    rules: {
                        required: {
                            errorMessage: 'Name is required'
                        }
                    },
                    errors: [],
                    isValid: false
                }
            },
            lastName: {
                label: {
                    for: 'lastName',
                    value: 'Last name'
                },
                attributes: {
                    id: 'lastName',
                    type: 'text',
                    placeholder: 'Last name',
                    value: ''
                },
                validation: {
                    rules: {
                        required: {
                            errorMessage: 'Last name is required'
                        }
                    },
                    errors: [],
                    isValid: false
                }
            },
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
            number: {
                label: {
                    for: 'number',
                    value: 'Your number'
                },
                attributes: {
                    id: 'number',
                    type: 'number',
                    placeholder: 'Your number',
                    value: ''
                },
                validation: {
                    rules: {
                        required: {
                            errorMessage: 'Number is required'
                        },
                        isNumber: {
                            errorMessage: 'Should be numeric'
                        },
                        minLength: {
                            errorMessage: 'Min length is ',
                            value: 9
                        },
                        maxLength: {
                            errorMessage: 'Max length is ',
                            value: 9
                        },
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
                        },
                        mustMatch: {
                            inputName: 'repeatedPassword',
                            errorMessage: 'The password must match'
                        }
                    },
                    errors: [],
                    isValid: false
                }
            },
            repeatedPassword: {
                label: {
                    for: 'repeatedPassword',
                    value: 'Repeat the password'
                },
                attributes: {
                    id: 'repeatedPassword',
                    type: 'password',
                    placeholder: 'Repeat the password',
                    value: ''
                },
                validation: {
                    rules: {
                        required: {
                            errorMessage: 'You need repeat the password'
                        },
                        mustMatch: {
                            inputName: 'password',
                            errorMessage: 'The password must match'
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
        const personalInfo = {
            name: form.name.attributes.value,
            lastName: form.lastName.attributes.value,
            email: email,
            number: form.number.attributes.value
        };
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOLpcWn2ABinExUQ6BzuXFW0AjVITXM94', authData)
            .then(response => {
                console.log(response);
                createNewUser(personalInfo);
                window.alert('New user has been signed up');
            })
            .catch(error => {
                console.log(error);
                window.alert('Critical error. Please do it again, now correctly');
            })
            .finally(
                () => this.props.history.goBack()
            );
    }

    render() {
        return (
            <Form
                inputs={this.state.inputs}
                submitted={this.submitHandler} />
        );
    }
};

const createNewUser = (personalInfo) => {
    axiosAppointments.post('/users.json', personalInfo)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

export default SignUp;