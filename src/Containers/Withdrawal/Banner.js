import React, {Component, Fragment} from 'react';

class Banner extends Component {
    render() {
        return (
            <Fragment>
                <div className='banner round '>
                    <p>Your next free withdrawal Date is </p>
                    <p>You are using Backup Cash's Free WITHDRAWAL DAYS: </p>
                    <strong>June !st 2020 </strong>
                    <ul>
                        <li>Every 01 January</li>
                        <li>Every 01 January</li>
                        <li>Every 01 January</li>
                        <li>Every 01 January</li>
                    </ul>

                    <button className='btn btn-custom-blue'>Change Settings</button>
                </div>

            </Fragment>
        );
    }
}

export default Banner;