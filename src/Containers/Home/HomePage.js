import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import '../../admin/assets/css/hamburgers.min.css';
import '../../admin/assets/css/backup-cash-style.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import moment from 'moment';
import {SESSION_INTERVAL, USERTOKEN} from "../../Components/Auth/HOC/authcontroller";

class HomePage extends Component {

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

    scrollIntoView = () => {
        document.querySelector('.testimonial').scrollIntoView({
            behavior: 'smooth'
        });
    };

    checkUser = () => {
        let timeStamp = JSON.parse(localStorage.getItem(SESSION_INTERVAL));
        let user = JSON.parse(localStorage.getItem(USERTOKEN));
        if (timeStamp != null) {
            // get the session and compare the current time
            var diff = moment(timeStamp);

            if (diff < moment().subtract(50, 'minutes') || user == null) {
                console.log('logged in a while ago');
                this.setState({
                    isLoggedIn: false
                })
            } else if (diff > moment().subtract(50, 'minutes') && user != null) {
                console.log(diff.fromNow());
                this.setState({
                    isLoggedIn: true
                })
            }

        }
    };


    componentDidMount() {
        this.checkUser();
    }


    render() {
        return (
            <Fragment>
                <header className='w-100'>
                    <nav>
                        <Link to='/' className="brand"/>
                        <nav>
                            <Link to={'/faq'}/>
                            <Link to={'/stories'}/>
                            <Link to={'/Blog'}/>
                            <Link to={'/login'}/>
                            <Link to={'/signup'} className='btn btn-round-navy-blue'/>
                        </nav>

                    </nav>
                    <div className="hero-items-container d-flex">
                        <div className="hero-item">
                            <h1>Save Money,Grow Wealth.</h1>
                            <p>Save as little as N500,</p>
                            <p>Earn upt to 13% interest on savings.</p>
                            <div className="hero-call-to-action">
                                <button className={'btn btn-round-light-blue'}>Create a free Account</button>
                                <div className="secondary-call-to-act">
                                    <button>Create With <br/> <b>Facebook</b></button>
                                    <button>Create With <br/> <b>Whatsapp</b></button>
                                </div>
                            </div>
                        </div>
                        <div className="hero-item">
                            <div className="hero-slide">


                            </div>
                        </div>
                    </div>


                </header>

            </Fragment>
        );
    }
}

export default HomePage;