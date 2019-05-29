import React from 'react';

const Alert =(props) => {

        return (
            <React.Fragment>
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{props.message}</strong>
                    <button type="button" className="close" onClick={props.hideError} data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </React.Fragment>
        );
};

export default Alert;