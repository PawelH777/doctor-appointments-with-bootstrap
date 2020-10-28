import React, {Component} from 'react';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

class Start extends Component {

    redirectToNewAppointment = () => {
        this.props.history.push('/new');
    }

    render() {
        return (
            <Aux>
                <p> Welcome to my page! </p>
                <button className="btn btn-primary" onClick={this.redirectToNewAppointment}>SCHEDULE THE MEETING</button>
            </Aux>
        );
    }
};

export default Start;