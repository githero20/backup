import React from 'react';
import {Link} from 'react-router-dom';

class StartNowButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showEditModal: false,
            showMainModal: true,
        };

    }

    render() {



        return (
            <React.Fragment>
                <Link className={'btn btn-custom-blue round'} to={this.props.link}>Start Now</Link>
            </React.Fragment>
        );
    }
}

export default StartNowButton;