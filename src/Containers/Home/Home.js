import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../admin/assets/css/hamburgers.min.css';
import '../../admin/assets/css/backup-cash-style.css';
import backupCashLogo from "../../admin/app-assets/images/Logo.png";
import illustration1 from "../../admin/app-assets/images/svg/backupcash-illustration-1.svg";
import yellowIcon from "../../admin/app-assets/images/svg/icon-yellow.svg";
import securityIcon from "../../admin/app-assets/images/svg/security-icon.svg";
import yellowBg from "../../admin/app-assets/images/svg/yellow-bg-img.svg";
import cardIll1 from "../../admin/app-assets/images/svg/card-ill-1.svg";
import cardIll2 from "../../admin/app-assets/images/svg/card-ill-3.svg";
import cardIll3 from "../../admin/app-assets/images/svg/card-ill-2.svg";
import arrowRight from "../../images/svg/righ-arrow.svg";
import carouselRightArrow from "../../images/svg/righ-arrow.svg";
import featureImage1 from "../../admin/app-assets/images/svg/feature-image-1.svg";
import featureImage2 from "../../admin/app-assets/images/svg/feature-img-2.svg";
import featureImage3 from "../../admin/app-assets/images/svg/feature-img-3.svg";
import featureImage4 from "../../admin/app-assets/images/svg/feature-img-4.svg";
import whatsAppImage from "../../admin/app-assets/images/svg/what-app-icon.svg";
import sfsFooterLogo from "../../admin/app-assets/images/svg/sfs-footer.svg";
import pinIcon from "../../admin/app-assets/images/svg/pin-icon.svg";
import paystackImage from "../../admin/app-assets/images/svg/paystack.svg";
import CommentImage from "../../admin/app-assets/images/call-to-act-bg.png";
import aaImage from "../../admin/app-assets/images/svg/aa.svg";
import horizonImage from "../../admin/app-assets/images/svg/horizon.svg";
import accentureImage from "../../images/svg/accenture.svg";
import sfsImage from "../../admin/app-assets/images/svg/sfs.svg";
import commentIcon from "../../admin/app-assets/images/svg/comment-icon.svg";
import carouselLeftArrow from "../../admin/app-assets/images/svg/left-arrow.svg";
import {HomeLink, LoginLink, SignUpLink} from "../../RouteLinks/RouteLinks";
import ReactOwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Home extends Component {

    state = {
        showMobileMenu: false,
    };


    showMobileMenu = () => {
        //add is-active on
        let nav = document.querySelector('.navbar-toggler');
        nav.classList.toggle('is-active');

        //show toggle menu
        let mobileMenu = document.querySelector('.navbar-collapse');
        mobileMenu.classList.toggle('show');
    };


    render() {
        return (
            <React.Fragment>
                <div className={'homeBody'}>
                    <header className="header header-background">
                        <div className="container">
                            <nav className="home-nav navbar navbar-expand-lg ">
                                <a className="navbar-brand">
                                    <img src={backupCashLogo} alt="logo" width="200px"/>
                                </a>
                                <a onClick={this.showMobileMenu} className="hamburger hamburger--slider navbar-toggler"
                                   data-toggle="collapse" data-aria-controls="navbarSupportedContent"
                                   aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"></span>
                                    </span>
                                </a>
                                <div className="collapse navbar-collapse animated slideInLeft faster"
                                     id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href={'#'}>FAQs </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href={'#'}>Testimonials </a>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={LoginLink}  className="nav-link" href={'#'}>Login </Link>
                                        </li>
                                    </ul>
                                    <ul className="cta-link">
                                        <li>
                                            <Link to={SignUpLink} className="btn-rounded-blue btn-gradient-blue">
                                                Sign Up
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            {/*row and two columns */}
                            <div className="row pt-lg-3">
                                <div className="col-lg-6 mt-md-5 mt-lg-1 text-center text-lg-left">
                                    <div className="header-words-container pt-lg-5 pr-lg-3">
                                        <h1 className="header-title mt-5 mb-5 mt-md-0 mb-sm-3 px-2 px-sm-0 ">
                                            Protecting your interest is our business.</h1>
                                        <p className="header-sub-title mb-0 ">
                                            Save as little as <strong>₦500 </strong></p>
                                        <p className="header-sub-title mb-5">
                                            Earn up to <strong>13% </strong> interest on Savings. </p>
                                        <Link to={'/sign-up'}
                                              className="btn px-5 btn-custom-border btn-dark-blue  btn-hover-shadow"> Create
                                            free account</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <section className="pb-sm-0 pb-md-5 mb-md-5 pt-md-5">
                        <div className="container">
                            <div className="row  mb-5 pt-md-5 mb-md-5">
                                <div className="col-md-6 text-center text-md-left">
                                    <img src={illustration1} alt="backup cash illustration"
                                         className="ill-2x pt-5" width="100%"/>
                                </div>
                                <div className="offset-0 col-md-6 ">
                                    <div className="section-detail-card pl-md-5">
                                        <div className="yellow-icon-holder">
                                            <img className="mb-4 yellow-icon" src={yellowIcon}
                                                 alt="yellow icon"/>
                                        </div>
                                        <h2 className="section-details-header text-center text-md-left">Watch Your Money
                                            Grow</h2>
                                        <p className="section-details-paragraph mb-1 text-center text-md-left ">
                                            Backup cash is a secure and innovative savings
                                            platform that allows you automate your savings
                                            and earn interest on your deposits. </p>
                                        <p className="section-details-paragraph text-center text-md-left">
                                            Our platform is designed to help users cultivate a
                                            focused financial attitude by saving little amounts
                                            of money periodically towards a specific financial
                                            goal and limiting withdrawals until a set date. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="security-section  deep-blue-bg-drop">
                        <div className="container">
                            <div className="row text-center text-md-left">
                                <div className=" col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    <div className="security-info-wrapper mt-md-5 pb-5 pb-md-0">
                                        <div className="row pb-md-5">
                                            <div className="col-md-6 col-lg-4">
                                                <div className="security-img-wrapper mb-5 mb-md-0 pt-md-2">
                                                    <img className="img-2x" src={securityIcon}
                                                         alt="security icon"/>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-8">
                                                <div className="mt-md-3">
                                                    <h2 className="text-white pt-md-5">Your Security Is Our
                                                        Business</h2>
                                                    <h6>Safest Security Measures</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="start-now yellow-gradient">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="section-header pb-md-0 ">
                                        <img className="mb-5 mb-md-3 yellow-icon-2" src={yellowIcon} alt=""/>
                                        <p>It’s Easy To Start With Backup Cash</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" pb-5 pb-md-0 height-100vh ">
                            <img className="yellow-svg" src={yellowBg} alt=''/>
                            <div className="container ">
                                <div className="row ">
                                    <div className="col-md-4">

                                        <div className="card-container text-center mb-xs-5">
                                            <div className="pt-5 mb-5  mb-md-3 pt-md-3">
                                                <button className="rounded-btn btn-dark-blue">1</button>
                                            </div>
                                            <p className="card-text mb-5">Create an account or login,
                                                in less than two minutes </p>
                                            <div className="card mb-5" data-aos="fade-up">
                                                <img className="card-1-img" src={cardIll1}
                                                     alt="illustration"/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-4">

                                        <div className="card-container text-center">
                                            <div className="pt-5 mb-5 mb-md-3 pt-md-3">
                                                <button className="rounded-btn btn-dark-blue">2</button>
                                            </div>
                                            <p className="card-text mb-5">Choose a savings plan that
                                                works for you </p>
                                            <div className="card mb-5" data-aos="fade-down">
                                                <img className="card-1-img" src={cardIll2} alt="illustration"/>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-4">


                                        <div className="card-container text-center">
                                            <div className="pt-5 mb-5 mb-md-3 pt-md-3">
                                                <button className="rounded-btn btn-dark-blue">3</button>
                                            </div>
                                            <p className="card-text mb-5">Rest easy and watch
                                                your money grow </p>
                                            <div className="card mb-5" data-aos="fade-up">
                                                <img className="card-2-img" src={cardIll3} alt="illustration"/>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="row pb-md-5">
                                    <div className="col-md-4 offset-md-4 text-center">
                                        <div className="mt-5 mb-5">
                                            <Link to={'/sign-up'} className="btn-rounded-corner mb-5 btn-light-blue">Start
                                                Now
                                                <img alt="step-3" src={arrowRight} className=" ml-2"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="mb-5">
                        <div className="container">
                            <div className="row mt-0 mt-md-5 mb-md-5">
                                <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                                    <div className="section-header mt-5 mb-5">
                                        <img className="mb-4 yellow-icon" src={yellowIcon} alt=""/>
                                        <p>Reach your savings goal the simple and
                                            reliable way</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="section-transparent-card mb-5 ">
                                        <div className="section-transparent-card-icon">
                                            <img src={featureImage1} alt={""}/>
                                        </div>
                                        <div className="section-transparent-card-right text-center text-md-left">
                                            <h5>Stay focused, Earn more</h5>
                                            <p>Earn high interest upfront when you
                                                choose the option of saving for a
                                                specified period</p>
                                        </div>
                                    </div>
                                    <div className="section-transparent-card mb-5">
                                        <div className="section-transparent-card-icon">
                                            <img src={featureImage2} alt={""}/>
                                        </div>
                                        <div className="section-transparent-card-right text-center text-md-left">
                                            <h5>Steady savings your way</h5>
                                            <p>Automate exactly how you
                                                want to save whether its daily,
                                                weekly or monthly</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="section-transparent-card mb-5">
                                        <div className="section-transparent-card-icon ">
                                            <img src={featureImage3} alt={""}/>
                                        </div>
                                        <div className="section-transparent-card-right text-center text-md-left">
                                            <h5>Flexible funding options</h5>
                                            <p>Start making deposits with
                                                your atm card or direct debit</p>
                                        </div>
                                    </div>
                                    <div className="section-transparent-card mb-5">
                                        <div className="section-transparent-card-icon">
                                            <img src={featureImage4} alt={""}/>
                                        </div>
                                        <div className="section-transparent-card-right text-center text-md-left">
                                            <h5>Trusted partner</h5>
                                            <p>Our partner, SFS capital has 30+
                                                years of fund management
                                                experience</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="client-say-section pt-sm-0 pt-md-5 mb-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="section-header text-center">
                                        <img className="mb-4 yellow-icon" src={yellowIcon} alt=""/>
                                        <p>What People are saying</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="light-yellow-backdrop">
                            <div className="container">
                                <div className="row pt-5">
                                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item">
                                                <div className="comment-box">
                                                    <div className="thumbnail"><img className="user-image"
                                                                                    src={CommentImage}
                                                                                    alt="First slide"/></div>

                                                    <p>Never believed i could be self-disciplined enough to put
                                                        money aside for savings until i joined the SFS Backup cash
                                                        platform.</p>
                                                    <h4>Sandra Stark</h4>
                                                    <span>Civil Servant</span>
                                                    <img src={commentIcon} alt="comment" className="comment"/>
                                                </div>
                                            </div>
                                            <div className="carousel-item active">
                                                <div className="comment-box">
                                                    <div className="thumbnail">
                                                        <img className="user-image" src={CommentImage}
                                                             alt="First slide"/>
                                                    </div>
                                                    <p>Never believed i could be self-disciplined enough to put
                                                        money aside for savings until i joined the SFS Backup cash
                                                        platform.</p>
                                                    <h4 className="comment-name">Sandra Stark</h4>
                                                    <span>Civil Servant</span>
                                                    <img className="comment" src={commentIcon} alt="comment"/>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="comment-box">
                                                    <div className="thumbnail">
                                                        <img className="user-image" src={CommentImage}
                                                             alt="First slide"/></div>

                                                    <p>Never believed i could be self-disciplined enough to put
                                                        money aside for savings until i joined the SFS Backup cash
                                                        platform.</p>
                                                    <h4>Sandra Stark</h4>
                                                    <span className="comment-job-title">Civil Servant</span>
                                                    <img className="comment" src={commentIcon} alt="comment"/>
                                                </div>
                                            </div>
                                        </div>
                                        <a className="carousel-control-prev carousel-btn"
                                           href="#carouselExampleControls"
                                           role="button" data-slide="prev">
                                            <img src={carouselLeftArrow} width="60%" alt={''}/>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-btn carousel-control-next"
                                           href="#carouselExampleControls" role="button" data-slide="next">
                                            <img src={carouselRightArrow} width="60%" alt={''}/>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                    {/*partners section*/}
                    <section className="partner-section pt-0  pt-md-5 pb-md-5 pt-lg-0">
                        <div className="container ">
                            <div className="row  pt-sm-0 pt-md-5 text-center mb-5 pb-5">
                                <div className="col-md-12 mb-md-5">
                                    <div className="section-header">
                                        <img className="mb-4 yellow-icon" src={yellowIcon}
                                             alt="yellow icon"/>
                                        <p>Our Partners</p>
                                        <span>You are in safe hands</span>
                                    </div>
                                </div>
                                <div className="col-12">
                                    {/*Set up your HTML*/}
                                    <div className="owl-carousel owl-theme carousel-container">

                                        <div className="partner-img-container">
                                            <img className="partner-img " src={paystackImage} alt="paystack"/>

                                        </div>
                                        <div className="partner-img-container">
                                            <img className="partner-img-50" src={sfsImage} alt="sfs"/>

                                        </div>
                                        <div className="partner-img-container">
                                            <img src={accentureImage} alt="accenture" className="partner-img"/>


                                        </div>
                                        <div className="partner-img-container">
                                            <img className="partner-img" src={horizonImage} alt="horizon"/>

                                        </div>
                                        <div className="partner-img-container">
                                            <img className="partner-img-50" src={aaImage} alt="aa"/>

                                        </div>

                                    </div>

                                    <ReactOwlCarousel
                                        className="owl-theme"
                                        loop
                                        margin={10}
                                        autoplay={1000}
                                        autoplayTimeout={5000}
                                        dots={false}
                                        responsiveClass={true}

                                    >

                                        <div className="partner-img-container">
                                            <img className="partner-img " src={paystackImage} alt="paystack"/>

                                        </div>
                                        <div className="partner-img-container">
                                            <img className="partner-img-50" src={sfsImage} alt="sfs"/>

                                        </div>
                                        <div className="partner-img-container">
                                            <img src={accentureImage} alt="accenture" className="partner-img"/>


                                        </div>
                                        <div className="partner-img-container">
                                            <img className="partner-img" src={horizonImage} alt="horizon"/>

                                        </div>
                                        <div className="partner-img-container">
                                            <img className="partner-img-50" src={aaImage} alt="aa"/>

                                        </div>


                                    </ReactOwlCarousel>
                                </div>

                            </div>

                        </div>
                    </section>
                    {/*call to action*/}
                    <section className="call-action-section cta pt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="action-placeholder ">
                                        <h2 className="mb-3 mt-5 text-white cas-title">Protect your interest with SFS
                                            Backup cash</h2>
                                        <Link to={'/sign-up'}
                                              className="btn btn-yellow-outline btn-custom-border cas-btn">Start Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*whats app section*/}
                    <section className="chat-bg whatsapp  pt-md-5 mb-5 mb-md-0">
                        <div className="container">
                            <div className="row ">
                                <div className="col-md-6">
                                    {/*<div className="contact-detail-placeholder text-center pt-5 pt-md-0">*/}
                                    {/*    <img className="mb-5 chat-whatsapp-img" src={whatsAppImage}*/}
                                    {/*         alt="chat with us"/>*/}
                                    {/*</div>*/}
                                    <div className="contact-detail-placeholder text-center pt-md-5">
                                        <p className="deep-blue-color pt-md-5 chat-title">Chat with us on
                                            whatsapp</p>
                                        <button type="button" data-aos="fade-up"
                                                className="btn btn-whatsapp">+234
                                            818 545 4545
                                            <img alt={''} src={pinIcon} className="ml-md-2 w-20"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="contact-detail-placeholder text-center pt-md-5">
                                        <p className="deep-blue-color pt-md-5 chat-title">Connect With Us
                                            whatsapp</p>
                                        {/*<button type="button" data-aos="fade-up"*/}
                                        {/*        className="btn btn-whatsapp">*/}
                                        {/*    <ul className="footer-icon-list ">*/}
                                        {/*        <li>*/}
                                        {/*    <span className="fa-stack fa-sm">*/}
                                        {/*        <i className="fa fa-circle fa-stack-2x"></i><i*/}
                                        {/*        className="fa fa-facebook fa-stack-1x fa-inverse"></i>*/}
                                        {/*    </span>*/}
                                        {/*        </li>*/}
                                        {/*        <li>*/}
                                        {/*    <span className="fa-stack fa-sm">*/}
                                        {/*        <i className="fa fa-circle fa-stack-2x"></i><i*/}
                                        {/*        className="fa fa-twitter fa-stack-1x fa-inverse"></i>*/}
                                        {/*    </span>*/}
                                        {/*        </li>*/}
                                        {/*        <li>*/}
                                        {/*    <span className="fa-stack fa-sm">*/}
                                        {/*        <i className="fa fa-circle fa-stack-2x"></i><i*/}
                                        {/*        className="fa fa-instagram fa-stack-1x fa-inverse"></i>*/}
                                        {/*    </span>*/}
                                        {/*        </li>*/}
                                        {/*    </ul>*/}

                                        {/*</button>*/}
                                        <button type="button" data-aos="fade-up" className="btn btn-whatsapp">
                                                <div className="footer-icon-list d-flex justify-content-between">
                                                    <span className="fa-stack fa-sm">
                                                        <i className="fa fa-circle fa-stack-2x"></i><i
                                                        className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                                    </span>

                                                    <span className="fa-stack fa-sm">
                                                        <i className="fa fa-circle fa-stack-2x"></i><i
                                                        className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                                    </span>

                                                    <span className="fa-stack fa-sm">
                                                        <i className="fa fa-circle fa-stack-2x"></i><i
                                                        className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                                                    </span>
                                                </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="light-yellow-bg home-footer footer">
                        <div className="container my-0 my-lg-5">
                            <div className="row ">
                                <div className="col-md-2 offset-md-2 d-none d-lg-block offset-lg-0 col-lg-3">
                                    <div className="footer-logo">
                                        <img src={sfsFooterLogo} alt="sfs footer logo"/>
                                    </div>
                                </div>
                                <div className=" col-sm-6 col-md-4 col-lg-3 ">
                                    <p className="footer-header">Company</p>
                                    <ul className="footer-list">
                                        <li>
                                            <a href={'#'}>About Us</a>
                                        </li>
                                        <li>
                                            <a href={'#'}>Testimonials</a>
                                        </li>
                                        <li>
                                            <a href={'#'}>FAQs</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3 ">
                                    <p className="footer-header">Quick Links</p>
                                    <ul className="footer-list ">
                                        <li>
                                            <Link to={'/sign-up'}>Register</Link>
                                        </li>
                                        <li>
                                            <Link to={'/log-in'}>Log in</Link>
                                        </li>
                                        <li>
                                            <a href="#">How it works</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 offset-sm-6 offset-md-0 col-md-4 col-lg-3 ">
                                    <p className="footer-header">Physical Address</p>

                                    <p className='gray-text footer-p'>Skye Bank Building, 287 Ajose Adeogun St, Victoria Island 23401, Lagos</p>
                                    {/*<ul className="footer-icon-list ">*/}
                                    {/*    <li>*/}
                                    {/*        <span className="fa-stack fa-sm">*/}
                                    {/*            <i className="fa fa-circle fa-stack-2x"></i><i*/}
                                    {/*            className="fa fa-facebook fa-stack-1x fa-inverse"></i>*/}
                                    {/*        </span>*/}
                                    {/*    </li>*/}
                                    {/*    <li>*/}
                                    {/*        <span className="fa-stack fa-sm">*/}
                                    {/*            <i className="fa fa-circle fa-stack-2x"></i><i*/}
                                    {/*            className="fa fa-twitter fa-stack-1x fa-inverse"></i>*/}
                                    {/*        </span>*/}
                                    {/*    </li>*/}
                                    {/*    <li>*/}
                                    {/*        <span className="fa-stack fa-sm">*/}
                                    {/*            <i className="fa fa-circle fa-stack-2x"></i><i*/}
                                    {/*            className="fa fa-instagram fa-stack-1x fa-inverse"></i>*/}
                                    {/*        </span>*/}
                                    {/*    </li>*/}
                                    {/*</ul>*/}
                                </div>
                                <div className="col-md-12 mt-5 ">
                                    <p className="footer-sub-text text-center">&copy; SFSbackupcash 2019. All RIghts
                                        Reserved</p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>

            </React.Fragment>
        );
    }
}

export default Home;