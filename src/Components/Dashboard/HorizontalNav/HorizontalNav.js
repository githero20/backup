import React, {Component} from 'react';
import Logo from "../../../admin/app-assets/images/Logo@2x.png";

import ProfileIcon from "../../../admin/app-assets/images/svg/profile-icon.svg";
import LogOutIcon from "../../../admin/app-assets/images/svg/logout-cion.svg";
import KycIcon from "../../../admin/app-assets/images/svg/kyc-icon.svg";
import AvatarImage from "../../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import {Link, Redirect} from "react-router-dom";
import {DashboardLink, KycSettingLink, LoginLink, ProfileSettingLink} from "../../../RouteLinks/RouteLinks";
import {USERINFO, USERTOKEN} from "../../Auth/HOC/authcontroller";
import {getUserData} from "../../../actions/UserAction";
import {hideLoader} from "../../../Helpers/Helper";

class HorizontalNav extends Component {

    //state to display user menu when clicked
    state = {
        show: '',
        redirectLogin: false,
        toggleMenu: false,
        userName: null
    };

    //toggle profile menu
    toggleSubMenu = () => {
        let toggle = (this.state.show === '') ? 'show' : '';
        this.setState({show: toggle});
    };

    //display user info on the menu
    //check if user info is stored retrieve the info
    // look for a way to securely store and retrieve data from local storage

    logout = () => {
        localStorage.removeItem(USERTOKEN);
        localStorage.removeItem(USERINFO);
        this.setState({
            redirectLogin: true,
        })
    };

    handleUserInfo = (status, response) => {
        if (status) {
            this.setState({userName: response.name})
        }
    };

    componentWillMount() {
        hideLoader();
    }


    componentDidMount() {

        try {
            //get name from localStorage
            const user = localStorage.getItem(USERINFO);
            if (user != null) {
                let userInfo = JSON.parse(user);
                this.setState({userName: userInfo.name});
            } else {
                getUserData(this.handleUserInfo);
            }
            // const user = getLocalStorage(USERINFO);

        } catch (e) {
            console.log(e);
        }
    }

    showMobileMenu = () => {
        //add is-active on
        let nav = document.querySelector('.navbar-toggler');
        nav.classList.toggle('is-active');
        // show dark background
        let bg = document.querySelector('.mobile-bg');
        bg.classList.toggle('d-none');
        //show toggle menu
        let mobileMenu = document.querySelector('.vertical-menu-modern');
        mobileMenu.classList.toggle('menu-open');
    };

    showTabMenu = (e) =>{
        e.preventDefault();
        let menu = document.querySelector('.main-menu');
        menu.classList.toggle('active');

    };

    // display toggler for tablet

    // only shows on table view
    // toggles the menu position on click


    render() {

        const {userName} = this.state;
        // const {userName} = this.state;


        if (this.state.redirectLogin) {

            return (
                <React.Fragment>
                    <Redirect to={LoginLink}/>
                </React.Fragment>
            );

        }
        return (
            <React.Fragment>
                <nav
                    className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-dark navbar-white navbar-shadow">
                    <div className="navbar-wrapper">
                        <div className="navbar-header expanded">
                            <ul className="nav navbar-nav flex-row position-relative">

                                <li className="nav-item mobile-menu d-md-none ml-auto order-4">
                                    {/*<button className="nav-link nav-menu-main menu-toggle hidden-xs" >*/}
                                    {/*    <i className="ft-menu font-large-1"></i></button>*/}
                                    <a onClick={this.showMobileMenu} href='#'
                                       className="hamburger hamburger--slider menu-toggle navbar-toggler"
                                       data-toggle="collapse" data-aria-controls="navbarSupportedContent"
                                       aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"></span>
                                    </span>
                                    </a>
                                </li>
                                <li className="nav-item mr-auto">
                                    <Link to={DashboardLink} className="navbar-brand">
                                        <img className="brand-logo" alt="Backup Cash"
                                             src={Logo}/>
                                    </Link>
                                </li>
                                <li className="nav-item d-none  d-md-block nav-toggle">

                                </li>
                                <li className="nav-item d-none">
                                    <button className="nav-link open-navbar-container" data-toggle="collapse"
                                            data-target="#navbar-mobile"><i className="la la-ellipsis-v"></i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-container content">
                            <div className="collapse navbar-collapse" id="navbar-mobile">
                                <ul className="nav navbar-nav ml-auto float-right">
                                    <li className={'dropdown dropdown-user nav-item ' + this.state.show}>
                                        <a className={'dropdown-toggle nav-link dropdown-user-link'}
                                           onClick={this.toggleSubMenu}
                                           data-toggle="dropdown">
                                            <span className="avatar avatar-online">
                                                <img src={AvatarImage} alt="avatar" onClick={this.toggleSubMenu}/>
                                                <i></i>
                                            </span>
                                            <span className="mr-1">
                                                <span
                                                    className="user-name text-bold-700 text-capitalize">{userName}</span>
                                            </span>
                                        </a>
                                        <a href='#' onClick={this.showTabMenu}
                                           className="hamburger hamburger--slider d-md-inline-block tab-toggler d-none d-lg-none menu-toggle navbar-toggler"
                                           data-toggle="collapse" data-aria-controls="navbarSupportedContent"
                                           aria-expanded="false" aria-label="Toggle navigation">
                                                    <span className="hamburger-box">
                                                        <span className="hamburger-inner"></span>
                                                    </span>
                                        </a>
                                        <div
                                            className={'dropdown-menu menu-custom-dropdown dropdown-menu-right ' + this.state.show}>
                                            <Link to={ProfileSettingLink} className="dropdown-item" >
                                                <img src={ProfileIcon} className="img-2x mr-1" alt={'profile '}/> Profile
                                            </Link>
                                            <Link to={KycSettingLink} className="dropdown-item" >
                                                <img
                                                    src={KycIcon}
                                                    className="img-2x mr-1" alt={''}/> KYC</Link>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" onClick={this.logout}><img
                                                src={LogOutIcon}
                                                className="img-2x mr-1" alt={''}/> Log Out</a>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>

            </React.Fragment>
        );
    }
}

export default HorizontalNav;