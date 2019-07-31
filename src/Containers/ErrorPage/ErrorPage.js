import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../admin/assets/css/hamburgers.min.css';
import '../../admin/assets/css/backup-cash-style.css';
import backupCashLogo from "../../admin/app-assets/images/Logo.png";
import errorIll from "../../images/svg/error-ill.svg";
import errorBackArrow from "../../images/svg/error-back-arrow.svg";
import {HomeLink} from "../../RouteLinks/RouteLinks";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class ErrorPage extends Component {

    render() {
        return (
            <React.Fragment>

                <div className='error-body'>
                    <nav className='error-nav pl-1 pt-1 pl-md-5 pt-md-3'>
                        <Link to={HomeLink} className="navbar-brand">
                            <img src={backupCashLogo} alt="logo" width="200px"/>
                        </Link>
                    </nav>
                    <section className='text-center error-section mt-2 mt-md-3'>
                        <img src={errorIll} className='error-img pt-5'/>
                        <h2 className='error-header'>Error 404!</h2>
                        <h5 className='error-title mb-5'>Page Not Found</h5>
                        <a onClick={()=>this.props.history.goBack()} className='error-btn'><img src={errorBackArrow}/>Go Back</a>
                    </section>


                </div>

            </React.Fragment>
        );
    }
}

export default ErrorPage;