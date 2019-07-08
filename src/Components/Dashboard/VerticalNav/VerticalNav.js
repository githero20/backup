import React, {Component} from 'react';
import avatar from "../../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import dashboardIcon from "../../../admin/app-assets/images/svg/dashboard-icon.svg";
import InstantSaveIcon from "../../../admin/app-assets/images/svg/instant-save-icon.svg";
import LockedSavings from "../../../admin/app-assets/images/svg/locked-savings.svg";
import BackUpGoalsIcon from "../../../admin/app-assets/images/svg/steady-save-icon.svg";
import SteadySaveIcon from "../../../admin/app-assets/images/svg/steady-save-icon.svg";
import transactionIcon from "../../../admin/app-assets/images/svg/transactions.svg";
import WithdrawalIcon from "../../../admin/app-assets/images/svg/withdrawals.svg";
import SettingsIcon from "../../../admin/app-assets/images/svg/settings.svg";
import {Link, NavLink, Redirect, withRouter} from 'react-router-dom';
import {
    BackupGoalsLink,
    BankCardLink,
    DashboardLink,
    HomeLink,
    InstantSaveLink,
    KycSettingLink,
    LockedSavingsLink,
    ProfileSettingLink,
    SteadySaveLink,
    TransactionsLink,
    WithdrawalLink
} from "../../../RouteLinks/RouteLinks";
import {USERINFO, USERTOKEN} from "../../Auth/HOC/authcontroller";
import {getUserName, hideMobileMenu} from "../../../Helpers/Helper";

function logout() {
    localStorage.removeItem(USERTOKEN);
    localStorage.removeItem(USERINFO);
    return true;
}

class VerticalNav extends Component {

    //state to show inner nav when click and display active nav
    state = {
        open: '',
        redirect: false
    };

    showActiveMenu = () => {

        //select all navigations nav item link
        const navLinks = document.querySelectorAll('.navigation .nav-item a');
        // add on click listener to them

        //if one link is pressed

        //select all links parent (nav item) and

        // remove any active class on the parent

        //select the parent of the link pressed

        //add active class to it

    };


    //toggle sub menu
    toggleNav = () => {
        let toggle = (this.state.open === '') ? 'open' : '';
        this.setState({open: toggle});
    };


    //show active class
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? ' active' : '';
    };

    showUserMenu = () => {
        //show toggle menu
        let mobileMenu = document.querySelector('.mobile-user');
        mobileMenu.classList.toggle('open');
    };


    DoLogOut = () => {
        try {
            localStorage.removeItem(USERTOKEN);
            localStorage.removeItem(USERINFO);
            this.setState({
                redirect: true
            });
        } catch (e) {
            console.log('error during mobile logout ', e);
        }

    };


    handleUserName = (status, response) => {
        if (status) {
            this.setState({userName: response.name})
        }
    };


    componentWillMount() {
        getUserName(this, this.handleUserName)
    }

    render() {

        const {userName} = this.state;


        if (this.state.redirect) {

            return (
                <Redirect to={HomeLink}/>
            )

        }

        return (
            <React.Fragment>
                <div className='mobile-bg d-none' onClick={hideMobileMenu}></div>
                <div className="main-menu menu-fixed menu-dark menu-accordion menu-shadow">
                    <div className="main-menu-content">
                        <ul className="navigation navigation-main" id="main-menu-navigation">
                            <li className="nav-item has-sub mobile-user d-md-none " onClick={this.showUserMenu}>
                                <a>
                                    <span className="avatar avatar-online">
                                        <img src={avatar} alt="avatar"/>
                                    </span>
                                    <span className="menu-title text-capitalize">{userName}</span>
                                </a>
                                <ul className="menu-content mobile-profile-nav">
                                    <li className="is-shown"><Link className="menu-item"
                                                                   to={ProfileSettingLink}>Profile</Link>
                                    </li>
                                    <li className="is-shown"><Link className="menu-item" to={KycSettingLink}>KYC</Link>
                                    </li>
                                    <li className="is-shown"><Link to='#' onClick={this.DoLogOut} className="menu-item">log
                                        Out</Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={'nav-item ' + this.getNavLinkClass(DashboardLink)}>
                                <NavLink to={DashboardLink}>
                                    <img src={dashboardIcon}/>
                                    <span className="menu-title">Dashboard</span>
                                </NavLink>
                            </li>
                            <li className=" navigation-header d-none d-md-inline">
                                <span data-i18n="nav.category.admin-panels">Central Vault</span>
                            </li>
                            <li className={'nav-item ' + this.getNavLinkClass(InstantSaveLink)}>
                                <NavLink to={InstantSaveLink}><img src={InstantSaveIcon}/><span
                                    className="menu-title"
                                    data-i18n="">Instant Save</span></NavLink>
                            </li>
                            <li className={'nav-item ' + this.getNavLinkClass(SteadySaveLink)}>
                                <NavLink to={SteadySaveLink}><img src={SteadySaveIcon}/><span
                                    className="menu-title"
                                    data-i18n="">Steady Save</span></NavLink>
                            </li>

                            <li className="navigation-header d-none d-md-inline">
                                <span data-i18n="nav.category.apps">Investments</span>
                                {/*<i className="la la-ellipsis-h ft-minus"></i>*/}
                            </li>
                            <li className={'nav-item ' + this.getNavLinkClass(LockedSavingsLink)}>
                                <NavLink to={LockedSavingsLink}>
                                    <img src={LockedSavings}/>
                                    <span className="menu-title">Locked Savings</span>
                                </NavLink>
                            </li>
                            <li className={'nav-item ' + this.getNavLinkClass(BackupGoalsLink)}>
                                <NavLink to={BackupGoalsLink}>
                                    <img src={BackUpGoalsIcon}/>
                                    <span className="menu-title">Backup Goals</span>
                                </NavLink>
                            </li>


                            <li className="navigation-header d-none d-md-inline">
                                <span>Others</span>
                                {/*<i className="la la-ellipsis-h ft-minus" ></i>*/}
                            </li>
                            <li className={'nav-item ' + this.getNavLinkClass(TransactionsLink)}>
                                <NavLink to={TransactionsLink}>
                                    <img src={transactionIcon}/>
                                    <span className="menu-title">Transactions</span>
                                </NavLink>
                            </li>
                            <li className={'nav-item ' + this.getNavLinkClass(WithdrawalLink)}>
                                <NavLink to={WithdrawalLink}>
                                    <img src={WithdrawalIcon}/>
                                    <span className="menu-title">Withdrawal</span>
                                </NavLink>
                            </li>
                            <li className={'nav-item has-sub ' + this.state.open} onClick={this.toggleNav}>
                                <a>
                                    <img src={SettingsIcon}/>
                                    <span className="menu-title">Settings</span>
                                </a>
                                <ul className="menu-content">
                                    <li className={' is-shown ' + this.getNavLinkClass(ProfileSettingLink)}>
                                        <NavLink to={ProfileSettingLink} className={' menu-item '}>Account
                                            Settings</NavLink>
                                    </li>
                                    <li className={' is-shown ' + this.getNavLinkClass(BankCardLink)}>
                                        <NavLink to={BankCardLink} className={' menu-item '}
                                        >Bank/Cards</NavLink>
                                    </li>
                                    <li className={' is-shown ' + this.getNavLinkClass(KycSettingLink)}>
                                        <NavLink to={KycSettingLink} className={' menu-item '}
                                        >Kyc Settings</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

VerticalNav = withRouter(VerticalNav);

export default VerticalNav;