import React, {Component} from 'react';
import sprinkles from '../../admin/app-assets/images/sprinkles@2x.png';
import './sprinkles.css';


class Sprinkles extends Component {
    render() {
        return (
            <img src={sprinkles} className={'position-absolute sprinkles'} alt=""/>
        );
    }
}

export default Sprinkles;