import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../admin/assets/css/hamburgers.min.css';
import '../../admin/assets/css/backup-cash-style.css';
import backupCashLogo from "../../admin/app-assets/images/Newlogo-02.png";
import illustration1 from "../../admin/app-assets/images/wymg@2x.png";
import yellowIcon from "../../admin/app-assets/images/svg/icon-yellow.svg";
import securityIcon from "../../admin/app-assets/images/svg/security-icon.svg";
import cardIll1 from "../../admin/app-assets/images/svg/card-ill-1.svg";
import cardIll2 from "../../admin/app-assets/images/custom-plan@2x.png";
import cardIll3 from "../../admin/app-assets/images/svg/card-ill-2.svg";
import carouselRightArrow from "../../images/svg/righ-arrow.svg";
import featureImage1 from "../../admin/app-assets/images/svg/feature-image-1.svg";
import featureImage2 from "../../admin/app-assets/images/svg/feature-img-2.svg";
import featureImage3 from "../../admin/app-assets/images/svg/feature-img-3.svg";
import featureImage4 from "../../admin/app-assets/images/svg/feature-img-4.svg";
import sfsFooterLogo from "../../admin/app-assets/images/svg/sfs-footer.svg";
import pinIcon from "../../admin/app-assets/images/svg/pin-icon.svg";
import paystackImage from "../../admin/app-assets/images/svg/paystack.svg";
import polarisBank from "../../admin/app-assets/images/polaris-bank.png";
import CommentImage from "../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import tm30 from "../../admin/app-assets/images/tm30logo.png";
import sfsImage from "../../images/sfs.jpg";
import commentIcon from "../../admin/app-assets/images/svg/comment-icon.svg";
import carouselLeftArrow from "../../admin/app-assets/images/svg/left-arrow.svg";
import {DashboardLink, FaqLink, HomeLink, LoginLink, SignUpLink} from "../../RouteLinks/RouteLinks";
import ReactOwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {USERINFO} from "../../Components/Auth/HOC/authcontroller";
import {hideLoader, showHomeLoader, Support} from "../../Helpers/Helper";

class Home extends Component {

    state = {
        showMobileMenu: false,
        isLoggedIn: false,
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
        if (localStorage.getItem(USERINFO) != null) {
            this.setState({
                isLoggedIn: !this.state.isLoggedIn
            })
        }
    };

    componentWillMount() {
        showHomeLoader();
    }


    componentDidMount() {
        this.checkUser();
        hideLoader();
    }





    render() {
        return (
            <React.Fragment>
                <div className={'homeBody'}>
                    {Support()}
                    <header className="header header-background">
                        <div className="container">
                            <nav className="home-nav navbar navbar-expand-lg ">
                                <a className="navbar-brand">
                                    <img src={backupCashLogo} alt="logo" width="180px"/>
                                </a>
                                <a onClick={this.showMobileMenu} className="hamburger hamburger--slider navbar-toggler"
                                   data-toggle="collapse" data-aria-controls="navbarSupportedContent"
                                   aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"></span>
                                    </span>
                                </a>
                                <div className="collapse navbar-collapse mobile d-md-none animated slideInLeft faster"
                                     id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href={FaqLink}>FAQs </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={this.scrollIntoView}>Testimonials </a>
                                        </li>
                                        {
                                            this.state.isLoggedIn ? (
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
                                            <Link to={SignUpLink} className="btn-rounded-blue btn-gradient-blue">
                                                Sign Up
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="collapse navbar-collapse desktop "
                                     id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href={FaqLink}>FAQs </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={this.scrollIntoView}>Testimonials </a>
                                        </li>
                                        {
                                            this.state.isLoggedIn ? (
                                                <li className="nav-item">
                                                    <Link to={DashboardLink} className="nav-link">Dashboard </Link>
                                                </li>
                                            ) : (
                                                <li className="nav-item">
                                                    <Link to={LoginLink} className="nav-link">Login </Link>
                                                </li>
                                            )
                                        }

                                        {/*<li className="nav-item">*/}
                                        {/*    <Link to={LoginLink} className="nav-link" href={'#'}>Login </Link>*/}
                                        {/*</li>*/}
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
                            <div className="row pt-lg-1">
                                <div className="col-lg-6 mt-md-5 mt-lg-0 text-center text-lg-left">
                                    <div className="header-words-container pt-lg-5 pr-lg-3">
                                        <h1 className="header-title mt-5 mt-lg-1 mb-2 mt-md-0  px-2 px-sm-0 ">
                                            Protecting your <br/> interest is our business.</h1>
                                        <p className="header-sub-title mb-0 ">
                                            Save as little as <strong>₦500 </strong></p>
                                        <p className="header-sub-title mb-2">
                                            Earn up to <strong>13% </strong> interest on Savings. </p>
                                        <Link to={'/sign-up'}
                                              className="btn px-5 btn-custom-border btn-dark-blue  btn-hover-shadow"> Create
                                            free account</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <section className="pb-sm-0  mb-md-5 pt-md-5">
                        <div className="container">
                            <div className="row  mb-5 mb-md-0">
                                <div className="col-md-6 text-center text-md-left">
                                    <img src={illustration1} alt="backup cash illustration"
                                         className="ill-2x" width="100%"/>
                                </div>
                                <div className="offset-0 col-md-6 ">
                                    <div data-aos={'fade-up'} data-aos-delay={200}
                                         className="section-detail-card pl-md-5">
                                        <div className="yellow-icon-holder">
                                            <img className="mb-2 pt-md-2 yellow-icon" src={yellowIcon}
                                                 alt="yellow icon"/>
                                        </div>
                                        <h2 className="section-details-header text-center text-md-left mb-md-2">Watch
                                            Your Money
                                            Grow</h2>
                                        <p className="section-details-paragraph text-center text-md-left mb-md-2  ">
                                            Backup Cash is a secure and innovative savings
                                            platform that allows you automate your savings
                                            and earn interest on your deposits. </p>
                                        <p className="section-details-paragraph text-center text-md-left ">
                                            Our platform is designed to help users cultivate a
                                            focused financial attitude by saving little amounts
                                            of money periodically towards a specific financial
                                            goal and limiting withdrawals until a set date. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="security-section deep-blue-bg-drop">
                        <div className="container">
                            <div className="row text-center text-md-left">
                                <div className=" col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                                    {/*<div className="security-info-wrapper mt-md-5 pb-5 pb-md-0">*/}
                                    {/*    <div className="row pb-md-5">*/}
                                    {/*        <div className="col-md-12 col-lg-12">*/}
                                    {/*            <div className="security-img-wrapper mb-5 mb-md-0 pt-md-2">*/}
                                    {/*                <img className="img-2x" src={securityIcon}*/}
                                    {/*                     alt="security icon"/>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*        <div className="col-md-6 col-lg-8">*/}
                                    {/*            <div className="mt-md-3">*/}
                                    {/*                <h2 className="text-white pt-md-5">Your Security Is Our*/}
                                    {/*                    Business</h2>*/}
                                    {/*                <h6>Safest Security Measures</h6>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="security-info-wrapper mt-md-5 pb-5 pb-md-0">
                                        <div className="row pb-md-5">
                                            <div className="col-12">
                                                <div
                                                    className="d-flex flex-column flex-md-row justify-content-around align-items-center">
                                                    <div className="security-img-wrapper mb-2 mb-md-0">
                                                        <img className="img-2x" src={securityIcon}
                                                             alt="security icon"/>
                                                    </div>
                                                    <div className="ml-md-2 ml-md-0">
                                                        <h2 className="text-white ">Your Security Is Our
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
                    </div>
                    <section className="start-now yellow-gradient">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="section-header mt-md-5 ">
                                        <img className="mb-5 mb-md-3 yellow-icon-2" src={yellowIcon} alt=""/>
                                        <p>It’s Easy To Start With Backup Cash</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" pb-5 pb-md-0 height-100vh ">
                            {/*<img className="yellow-svg" src={yellowBg} alt=''/>*/}
                            <div className="container ">
                                <div className="row ">
                                    <div className="col-md-4">

                                        <div className="card-container text-center mb-xs-5">
                                            <div className="pt-5 mb-5  mb-md-3 pt-md-3">
                                                <button className="rounded-btn btn-dark-blue">1</button>
                                            </div>
                                            <p className="card-text mb-5">Create an account or login
                                                in less than two minutes </p>
                                            <div className="card mb-5" data-aos-delay={700} data-aos="fade-up">
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
                                            <div className="card mb-5" data-aos-delay={700} data-aos="fade-down">
                                                <img className="card-1-img mt-3" src={cardIll2} alt="illustration"/>
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
                                            <div className="card mb-5" data-aos-delay={700} data-aos="fade-up">
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
                                                {/*<img alt="step-3" src={arrowRight} className=" ml-2"/>*/}
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
                                    <div className="section-transparent-card reduced-section-transparent-card mb-5 ">
                                        <div className="section-transparent-card-icon">
                                            <img src={featureImage1} alt={""}/>
                                        </div>
                                        <div className="section-transparent-card-right text-center text-md-left">
                                            <h5>Stay focused, Earn more</h5>
                                            <p>Earn high interest upfront when you
                                                choose the option of saving for a
                                                specified period.</p>
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
                                                weekly or monthly.</p>
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
                                                your atm card or direct debit.</p>
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
                                                experience.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="client-say-section testimonial pt-sm-0 pt-md-5 mb-5">
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
                                <div className="row pt-5 px-lg-5 mx-lg-5">
                                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            <div className="carousel-item">
                                                <div className="comment-box">
                                                    <div className="thumbnail"><img className="user-image"
                                                                                    src={CommentImage}
                                                                                    alt="First slide"/></div>

                                                    <p>I was a bit skeptical about using Backup Cash given the large of
                                                        savings apps out there. In just 3 weeks of using this service,
                                                        I am definitely hooked.
                                                    </p>
                                                    <h4>Ambrose Clark</h4>
                                                    <span>Builder</span>
                                                    <img src={commentIcon} alt="comment" className="comment"/>
                                                </div>
                                            </div>
                                            <div className="carousel-item active">
                                                <div className="comment-box">
                                                    <div className="thumbnail">
                                                        <img className="user-image" src={CommentImage}
                                                             alt="First slide"/>
                                                    </div>
                                                    <p>I love that they have a USSD channel that works seamlessly.</p>
                                                    <h4 className="comment-name">Emeka Udoji</h4>
                                                    <span>Student</span>
                                                    <img className="comment" src={commentIcon} alt="comment"/>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="comment-box">
                                                    <div className="thumbnail">
                                                        <img className="user-image" src={CommentImage}
                                                             alt="First slide"/></div>

                                                    <p>Cool app. I signed up and made my 1st savings deposit via
                                                        Facebook messenger.</p>
                                                    <h4>Tomi Falade </h4>
                                                    <span className="comment-job-title">Voiceover Artist</span>
                                                    <img className="comment" src={commentIcon} alt="comment"/>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="comment-box">
                                                    <div className="thumbnail">
                                                        <img className="user-image" src={CommentImage}
                                                             alt="First slide"/></div>

                                                    <p>As an accountant, the daily interest growth calculation is a
                                                        feature that I love. </p>
                                                    <h4>Ikujenyo Olubunmi </h4>
                                                    <span className="comment-job-title">Finance Expert</span>
                                                    <img className="comment" src={commentIcon} alt="comment"/>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="comment-box">
                                                    <div className="thumbnail">
                                                        <img className="user-image" src={CommentImage}
                                                             alt="First slide"/></div>

                                                    <p>Being able to concurrently save for the office rent and my end of
                                                        year
                                                        vacation on one platform even though I am using two different
                                                        cards is so convenient.
                                                    </p>
                                                    <h4>Ope Craig </h4>
                                                    <span className="comment-job-title">Business Owner</span>
                                                    <img className="comment" src={commentIcon} alt="comment"/>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="comment-box">
                                                    <div className="thumbnail">
                                                        <img className="user-image" src={CommentImage}
                                                             alt="First slide"/></div>

                                                    <p>Last December, I couldn’t attend all my favorite shows because of
                                                        the costs.
                                                        Right now, I have saved enough for at least 3 shows and a nice
                                                        outfit.
                                                    </p>
                                                    <h4>Tobi Oladele </h4>
                                                    <span className="comment-job-title">Intern</span>
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
                                            <a href={'http://www.paystack.com'} rel={'noopener noreferrer'}
                                               target='_blank'><img className="partner-img " src={paystackImage}
                                                                    alt="paystack"/></a>

                                        </div>
                                        <div className="partner-img-container">
                                            <a href={'https://www.sfsnigeria.com/'} rel={'noopenner noreferrer'}
                                               target='_blank'><img className="partner-img-50 sfs-image" src={sfsImage}
                                                                    alt="sfs"/></a>

                                        </div>
                                        {/*<div className="partner-img-container">*/}
                                        {/*    <img src={accentureImage} alt="accenture" className="partner-img"/>*/}


                                        {/*</div>*/}
                                        {/*<div className="partner-img-container">*/}
                                        {/*    <img className="partner-img" src={horizonImage} alt="horizon"/>*/}

                                        {/*</div>*/}
                                        <div className="partner-img-container">
                                            <a href={'http://www.tm30.net'} rel={'noopenner noreferrer'}
                                               target='_blank'> <img className="partner-img-50 tm-30" src={tm30}
                                                                     alt="aa"/></a>

                                        </div>
                                        <div className="partner-img-container">
                                            <a href={'http://www.tm30.net'} rel={'noopenner noreferrer'}
                                               target='_blank'> <img className="partner-img-50 polaris"
                                                                     src={polarisBank} alt="aa"/></a>

                                        </div>


                                    </ReactOwlCarousel>
                                </div>

                            </div>

                        </div>
                    </section>
                    {/*call to action*/}
                    <section className="call-action-section cta pt-5">
                        <div className="container">
                            <div className="row px-lg-5 mx-lg-5">
                                <div className="col-md-6">
                                    <div className="action-placeholder ">
                                        <h2 className="mb-3 mt-5 pr-lg-5 text-white cas-title">Protect your interest
                                            with SFS
                                            Backup Cash</h2>
                                        <Link to={'/sign-up'}
                                              className="btn btn-yellow-outline btn-custom-border cas-btn">Start
                                            Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*whats app section*/}
                    <section className="chat-bg whatsapp pt-3 pt-md-5 mb-5 mb-md-0">
                        <div className="container">
                            <div className="row ">
                                <div className="col-md-6">
                                    {/*<div className="contact-detail-placeholder text-center pt-5 pt-md-0">*/}
                                    {/*    <img className="mb-5 chat-whatsapp-img" src={whatsAppImage}*/}
                                    {/*         alt="chat with us"/>*/}
                                    {/*</div>*/}
                                    <div className="contact-detail-placeholder text-center pt-md-5">
                                        <p className="deep-blue-color pt-md-5 chat-title">Chat with us on
                                            Whatsapp</p>
                                        <div data-aos="fade-up"
                                             className="btn btn-whatsapp">+234
                                            818 545 4545
                                            <img alt={'pin icon'} src={pinIcon} className="ml-md-2 w-20"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="contact-detail-placeholder pt-3 text-center pt-md-5">
                                        <p className="deep-blue-color pt-md-5 chat-title">Connect with social media</p>
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
                                        <div data-aos="fade-up" className="btn btn-whatsapp social-media">
                                            <div className="footer-icon-list d-flex justify-content-between">
                                                    <span className="fa-stack fa-sm">
                                                        <a href='http://www.facebook.com/sfsbackupcash' rel='noreferrer'
                                                           target='_blank'>
                                                            <i className="fa fa-circle fa-stack-2x"></i><i
                                                            className="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                                        </a>
                                                    </span>

                                                <span className="fa-stack fa-sm">
                                                        <a href='' target='_blank'>
                                                            <i className="fa fa-circle fa-stack-2x"></i>
                                                            <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                                        </a>
                                                    </span>

                                                <span className="fa-stack fa-sm">
                                                    <a href="http://www.instagram.com/sfsbackupcash" rel='noreferrer'
                                                       target='_blank'>
                                                         <i className="fa fa-circle fa-stack-2x"></i>
                                                        <i className="fa fa-instagram fa-stack-1x fa-inverse"></i>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="light-yellow-bg home-footer footer">
                        <div className="container my-0 my-lg-5">
                            <div className="row px-lg-5 mx-lg-5">
                                <div className="col-md-2 offset-md-2 d-none d-lg-block offset-lg-0 col-lg-3">
                                    <div className="footer-logo">
                                        <img src={sfsFooterLogo} alt="sfs footer logo"/>
                                    </div>
                                </div>
                                <div className=" col-sm-6 col-md-4 col-lg-3 ">
                                    <p className="footer-header">Company</p>
                                    <ul className="footer-list">
                                        {/*<li>*/}
                                        {/*    <a href={'#'}>About Us</a>*/}
                                        {/*</li>*/}
                                        <li>
                                            <Link to={HomeLink}>Testimonials</Link>
                                        </li>
                                        <li>
                                            <Link to={FaqLink}>FAQs</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 col-md-4 col-lg-3 ">
                                    <p className="footer-header">Quick Links</p>
                                    <ul className="footer-list ">
                                        <li>
                                            <Link to={SignUpLink}>Register</Link>
                                        </li>
                                        <li>
                                            <Link to={LoginLink}>Log in</Link>
                                        </li>
                                        <li>
                                            <Link to={FaqLink}>How it works</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-sm-6 offset-sm-6 offset-md-0 col-md-4 col-lg-3 ">
                                    <p className="footer-header">Physical Address</p>

                                    <p className='gray-text footer-p'>Plot 287 Ajose Adeogun Street, Victoria
                                        Island 23401, Lagos</p>
                                    <p className='gray-text footer-p'>Enquires: 08149460946, 07018567235 </p>
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
                                <div className="col-md-12 mt-5 d-flex flex-column flex-md-row justify-content-between">
                                    <p className="footer-sub-text text-center">&copy; SFSbackup Cash 2019. All RIghts
                                        Reserved</p>
                                    <p className="footer-sub-text text-center mr-lg-3">Powered by
                                        <a href='http://www.tm30.net' rel='noreferrer' className='footer-brand-link'
                                           target='_blank'> TM30
                                        </a>
                                    </p>
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