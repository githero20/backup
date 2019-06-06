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
import {Link, NavLink, withRouter} from 'react-router-dom';


class VerticalNav extends Component {

    //state to show inner nav when click and display active nav
    state = {
        open:'',
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
    toggleNav=()=>{
        let toggle = (this.state.open ==='')?'open':'';
         this.setState({open:toggle});
    };


    //show active class
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    };

    showUserMenu = () =>{


        //show toggle menu
        let mobileMenu = document.querySelector('.mobile-user');
        mobileMenu.classList.toggle('open');
    }


    render() {
        return (
            <React.Fragment>
                <div className="main-menu menu-fixed menu-dark menu-accordion menu-shadow">
                    <div className="main-menu-content">
                        <ul className="navigation navigation-main" id="main-menu-navigation">
                            <li className="nav-item has-sub mobile-user d-md-none " onClick={this.showUserMenu}>
                                <a>
                                    <span className="avatar avatar-online">
                                        <img src={avatar} alt="avatar"/><i></i>
                                    </span>
                                    <span className="menu-title">Susan Stark</span>
                                </a>
                                <ul className="menu-content">
                                    <li className="is-shown"><a className="menu-item" href="profile.html">Profile</a>
                                    </li>
                                    <li className="is-shown"><a className="menu-item" href="kyc.html">Kyc</a>
                                    </li>
                                    <li className="is-shown"><a className="menu-item" href="../../index.html">log
                                        Out</a>
                                    </li>
                                </ul>
                            </li>

                            <li className={'nav-item ' + this.getNavLinkClass('/dashboard')}>
                                <NavLink to={'/dashboard'}>
                                    <img src={dashboardIcon}/>
                                    <span className="menu-title">Dashboard</span>
                                </NavLink>
                            </li>
                            <li className=" navigation-header d-none d-md-inline">
                                <span data-i18n="nav.category.admin-panels">Central Vault</span>
                            </li>
                            <li className={'nav-item ' + this.getNavLinkClass('/instant-save')}>
                                <NavLink to={'/instant-save'}><img src={InstantSaveIcon}/><span
                                    className="menu-title"
                                    data-i18n="">Instant Save</span></NavLink>
                            </li>
                            <li className={' nav-item ' + this.getNavLinkClass('/steady-save')}>
                                <NavLink to={'/steady-save'}><img src={SteadySaveIcon}/><span
                                    className="menu-title"
                                    data-i18n="">Steady Saves</span></NavLink>
                            </li>

                            <li className=" navigation-header d-none d-md-inline">
                                <span data-i18n="nav.category.apps">Investments</span>
                                {/*<i className="la la-ellipsis-h ft-minus"></i>*/}
                            </li>
                            <li className={' nav-item ' + this.getNavLinkClass('/locked-savings')}>
                                <NavLink to={'/locked-savings'} >
                                    <img src={LockedSavings}/>
                                    <span className="menu-title">Locked Savings</span>
                                </NavLink>
                            </li>
                            <li className={' nav-item ' + this.getNavLinkClass('/backup-goals')}>
                                <NavLink to={'/backup-goals'} >
                                    <img src={BackUpGoalsIcon}/>
                                    <span className="menu-title">Backup Goals</span>
                                </NavLink>
                            </li>


                            <li className=" navigation-header d-none d-md-inline">
                                <span>Others</span>
                                {/*<i className="la la-ellipsis-h ft-minus" ></i>*/}
                            </li>
                            <li className={' nav-item ' + this.getNavLinkClass('/transactions')}>
                                <NavLink to={'/transactions'} >
                                    <img src={transactionIcon}/>
                                    <span className="menu-title">Transactions</span>
                                </NavLink>
                            </li>
                            <li className={' nav-item ' + this.getNavLinkClass('/withdrawal')}>
                                <NavLink to={'/withdrawal'} >
                                    <img src={WithdrawalIcon}/>
                                    <span className="menu-title">Withdrawal</span>
                                </NavLink>
                            </li>
                            <li className={'nav-item has-sub '+ this.state.open} onClick={this.toggleNav}>
                                <a>
                                    <img src={SettingsIcon}/>
                                    <span className="menu-title">Settings</span>
                                </a>
                                <ul className="menu-content">
                                    <li className={' is-shown ' + this.getNavLinkClass('/profile-setting')}>
                                        <NavLink to={'/profile-setting'} className={' menu-item '}>Account
                                            Settings</NavLink>
                                    </li>
                                    <li className={' is-shown ' + this.getNavLinkClass('/bank-card-setting')}>
                                        <NavLink to={'/bank-card-setting'} className={' menu-item '}
                                              >Bank/Cards</NavLink>
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