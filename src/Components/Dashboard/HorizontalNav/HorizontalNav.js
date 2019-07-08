import React, {Component} from 'react';
import Logo from "../../../admin/app-assets/images/Newlogo-02.png";
import ProfileIcon from "../../../admin/app-assets/images/svg/profile-icon.svg";
import LogOutIcon from "../../../admin/app-assets/images/svg/logout-cion.svg";
import KycIcon from "../../../admin/app-assets/images/svg/kyc-icon.svg";
import AvatarImage from "../../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import {Link, Redirect} from "react-router-dom";
import {DashboardLink, LoginLink} from "../../../RouteLinks/RouteLinks";
import {USERINFO, USERTOKEN} from "../../Auth/HOC/authcontroller";
import {getUserData} from "../../../actions/UserAction";

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


    componentDidMount() {

        try {
            //get name from localStorage
            const user = localStorage.getItem(USERINFO);
            if (user != null) {
                let userInfo = JSON.parse(user);
                this.setState({userName:userInfo.name});
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

    //get user info
    //
    // GetUser = () => {
    //
    //
    //
    //
    //     //make request
    //     request(getUserInfoEndpoint, null, true, 'GET', this.setupNav)
    //
    //     //make request
    //     //show loader
    //     //get the response
    //     //hide loader
    //     //analyse info
    //
    //
    //     console.log('setting up dashboard');
    //
    //
    // };

    // setupNav = (status,res) => {
    //
    //     if(status){
    //
    //         this.setState({
    //             userName: res.data.data.name,
    //         });
    //     }
    //
    // }


    // componentDidMount() {
    //     this.GetUser();
    // }

    // display name

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
                                    <a onClick={this.showMobileMenu}
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
                                            data-target="#navbar-mobile"><i className="la la-ellipsis-v"></i></button>
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-container content">
                            <div className="collapse navbar-collapse" id="navbar-mobile">
                                <ul className="nav navbar-nav mr-auto float-left">
                                    <li className="nav-item d-none d-md-block"></li>
                                    <li className="dropdown nav-item mega-dropdown">
                                        <ul className="mega-dropdown-menu dropdown-menu row">
                                            <li className="col-md-3">
                                                <h6 className="dropdown-menu-header text-uppercase"><i
                                                    className="la la-list-ul"></i> Accordion
                                                </h6>
                                                <div id="accordionWrap" role="tablist" aria-multiselectable="true">
                                                    <div className="card">
                                                        <div className="card-header">

                                                            <div className="heading-elements">
                                                                <h4 className="text-center">
                                                                    <div>Total Interest</div>
                                                                    <div>10,156</div>
                                                                </h4>
                                                            </div>

                                                            <button className="heading-elements-toggle"><i
                                                                className="la la-ellipsis-v font-medium-3"></i></button>
                                                            <div className="heading-elements">
                                                                <h4 className="text-center">
                                                                    <div>Total Interest</div>
                                                                    <div>10,156</div>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <h4 className="card-title">&#8358;130,156</h4>
                                                            <div className="form-group">

                                                                <button type="button"
                                                                        className="btn btn-info round btn-min-width mr-1 mb-1">Info
                                                                </button>
                                                                <span>steady save</span>
                                                                <button type="button"
                                                                        className="btn btn-light round btn-min-width mr-1 mb-1">Light
                                                                </button>
                                                                <button type="button"
                                                                        className="btn btn-dark round btn-min-width mr-1 mb-1">Dark
                                                                </button>
                                                            </div>
                                                            <p className="card-text">Add a badge to card with <code>.badge
                                                                badge-COLOR</code> class with a wrapper of
                                                                <code>.heading-elements</code> class.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="col-md-4">
                                                <h6 className="dropdown-menu-header text-uppercase mb-1">
                                                    <i className="la la-envelope-o"></i>
                                                    Contact Us</h6>
                                                <form className="form form-horizontal">
                                                    <div className="form-body">
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 form-control-label"
                                                                   htmlFor="inputName1">Name</label>
                                                            <div className="col-sm-9">
                                                                <div className="position-relative has-icon-left">
                                                                    <input className="form-control" type="text"
                                                                           id="inputName1"
                                                                           placeholder="John Doe"/>
                                                                    <div className="form-control-position pl-1">
                                                                        <i className="la la-user"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 form-control-label"
                                                                   htmlFor="inputEmail1">Email</label>
                                                            <div className="col-sm-9">
                                                                <div className="position-relative has-icon-left">
                                                                    <input className="form-control" type="email"
                                                                           id="inputEmail1"
                                                                           placeholder="john@example.com"/>
                                                                    <div className="form-control-position pl-1">
                                                                        <i className="la la-envelope-o"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 form-control-label"
                                                                   htmlFor="inputMessage1">Message</label>
                                                            <div className="col-sm-9">
                                                                <div className="position-relative has-icon-left">
                                                                    <textarea className="form-control"
                                                                              id="inputMessage1" rows="2"
                                                                              placeholder="Simple Textarea"></textarea>
                                                                    <div className="form-control-position pl-1">
                                                                        <i className="la la-commenting-o"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12 mb-1">
                                                                <button className="btn btn-info float-right"
                                                                        type="button">
                                                                    <i className="la la-paper-plane-o"></i> Send
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item nav-search">
                                        <div className="search-input">
                                            <input className="input" type="text" placeholder="Explore Modern..."/>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="nav navbar-nav float-right">
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
                                        <div
                                            className={'dropdown-menu menu-custom-dropdown dropdown-menu-right ' + this.state.show}>
                                            <Link to={'/profile-setting'} className="dropdown-item" href="profile.html">
                                                <img src={ProfileIcon} className="img-2x mr-1" alt={''}/> Profile
                                            </Link>
                                            <Link to={'/kyc-setting'} className="dropdown-item" href="kyc.html">
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