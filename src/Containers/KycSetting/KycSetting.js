import React, {Component} from 'react';
import HorizontalNav from "../../Components/Dashboard/HorizontalNav/HorizontalNav";
import VerticalNav from "../../Components/Dashboard/VerticalNav/VerticalNav";
import MessageBox from "../../Components/Dashboard/DashboardContainer/MessageBox/MessageBox";
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import ButtonLoader from "../../Components/Auth/Buttonloader/ButtonLoader";
import SimpleReactValidator from "simple-react-validator";
import {_handleFormChange} from "../../utils/index";
import {request,multipartrequest} from "../../ApiUtils/ApiUtils";
import {GetUserKYC} from "../../RouteLinks/RouteLinks";
import {withToastManager,ToastProvider} from "react-toast-notifications";
import KycSettingForm from "../KycSetting/KycSettingForm";

let formData = new FormData();

class KycSetting extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
           
        };
    }

    render() {
        return (
           <React.Fragment>
            <KycSettingForm/>
        </React.Fragment>
        )
    }
    }


export default withToastManager(KycSetting);