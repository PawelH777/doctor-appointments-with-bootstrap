import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../../../Form/Form'
import axios from '../../../../axios-appointments';

class AppointmentDetails extends Component {

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
            }
        },
        isFormValid: false
    }

    submitHandler = (form) => {
        const dataToPersist = {
            userId: this.props.userId,
            selectedDates: [...this.props.history.location.state.dates],
            personalInfo: {
                name: form.name.attributes.value,
                lastName: form.lastName.attributes.value,
                email: form.email.attributes.value,
                number: form.number.attributes.value
            }
        };
        axios.post('/appointments.json?auth=' + this.props.token, dataToPersist)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        this.props.history.goBack();
    }

    render() {
        console.log(this.props);
        return (
            <Form 
                inputs={this.state.inputs}
                submitted={this.submitHandler} />
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    };
}

export default connect(mapStateToProps)(AppointmentDetails);