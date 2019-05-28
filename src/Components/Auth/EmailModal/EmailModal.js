import React, {Component} from 'react';
import inboxImage from "../../../admin/app-assets/images/svg/airflight-icon.svg";

class EmailModal extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="modal sign-up-modal email-content-message fade text-left curved-radius" id="large"
                     role="dialog" aria-labelledby="myModalLabel17">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>

                    <div>
                        <div className=" text-center pt-5">
                            <h2 className="form-header-purple circular-std mb-2 mt-5">Just one more step</h2>
                            <p className="gray-text mt-3">SFS Backup Cash account created successfully,</p>
                            <p className="mb-5 gray-text">Kindly check your mail inbox for verification</p>
                            <div className="text-center">
                                <a href="index.html" className="btn btn-round blue-round-btn">Open Inbox
                                    <img className="img-2x ml-2" src={inboxImage}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default EmailModal;