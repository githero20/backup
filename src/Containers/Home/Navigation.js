import React, {Component, Fragment} from 'react';
import backupCashLogo from "../../admin/app-assets/images/Logo@2x.png";
import {Link} from "react-router-dom";
import {ChallengeLink, DashboardLink, FaqLink, HomeLink, LoginLink, SignUpLink} from "../../RouteLinks/RouteLinks";

class Navigation extends Component {


    state = {
        showMobileMenu: false,
        isLoggedIn: false,
        showLoader: true,
    };


    showMobileMenu = () => {
        //add is-active on
        let nav = document.querySelector('.navbar-toggler');
        nav.classList.toggle('is-active');

        //show toggle menu
        let mobileMenu = document.querySelector('.navbar-collapse');
        mobileMenu.classList.toggle('show');
    };

    // scrollIntoView = () => {
    //     document.querySelector('.testimonial').scrollIntoView({
    //         behavior: 'smooth'
    //     });
    // };

    render() {
        const {isLoggedIn, scrollIntoView} = this.props;
        return (
            <Fragment>
                <nav className="home-nav navbar navbar-expand-lg ">
                    <Link to={HomeLink} className="navbar-brand">
                        <img src={backupCashLogo} alt="logo" width="180px"/>
                    </Link>
                    <a onClick={this.showMobileMenu}
                       className="hamburger hamburger--slider navbar-toggler"
                       data-toggle="collapse" data-aria-controls="navbarSupportedContent"
                       aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"/>
                                    </span>
                    </a>
                    <div className="collapse navbar-collapse res-menu mobile animated slideInLeft faster"
                         id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={FaqLink}>FAQs </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={ChallengeLink}>21 Days Challenge </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   onClick={(e) => scrollIntoView ? scrollIntoView() : e.preventDefault()}>Testimonials </a>
                            </li>
                            {
                                isLoggedIn ? (
                                    <li className="nav-item">
                                        <Link to={DashboardLink} className="nav-link">Dashboard </Link>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link to={LoginLink} className="nav-link">Login </Link>
                                    </li>
                                )
                            }
                        </ul>
                        <ul className="cta-link">
                            <li>
                                <Link to={SignUpLink}
                                      className="btn-rounded-blue btn-gradient-blue">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse desktop "
                         id="navbarSupportedContent">
                        <ul className="navbar-nav ml-lg-3">
                            <li className="nav-item">
                                <Link className="nav-link" to={FaqLink}>FAQs </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"
                                   onClick={(e) => {
                                       scrollIntoView ? scrollIntoView() : e.preventDefault()
                                   }}>Stories </a>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <Link className="nav-link" to={BlogLink}>Blog </Link>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                <Link className="nav-link" to={ChallengeLink}>21 Days Challenge </Link>
                            </li>
                            {
                                isLoggedIn ? (
                                    <li className="nav-item">
                                        <Link to={DashboardLink}
                                              className="nav-link">Dashboard </Link>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link to={LoginLink} className="nav-link">Login </Link>
                                    </li>
                                )
                            }
                        </ul>
                        <ul className="cta-link">
                            <li>
                                <Link to={SignUpLink}
                                      className="btn-rounded-blue btn-gradient-blue">
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </Fragment>
        );
    }
}

Navigation.propTypes = {};

export default Navigation;