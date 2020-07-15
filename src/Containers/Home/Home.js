import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../admin/assets/css/hamburgers.min.css';
import '../../admin/assets/css/backup-cash-style.css';
import sfsFooterLogo from "../../admin/app-assets/images/Logo@2x.png";
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
import whatsAppIcon from "../../admin/app-assets/images/whatsapp-ico@2x.png";
import paystackImage from "../../admin/app-assets/images/paystack.png";
import homeBGImg from "../../admin/app-assets/images/svg/header-bg.svg";
import CommentImage from "../../admin/app-assets/images/portrait/small/avatar-s-19.png";
import tm30 from "../../admin/app-assets/images/tm30logo.png";
import sfsImage from "../../admin/app-assets/images/SFS-LOGOS-4-150x150.jpg";
import commentIcon from "../../admin/app-assets/images/svg/comment-icon.svg";
import carouselLeftArrow from "../../admin/app-assets/images/svg/left-arrow.svg";
import {FaqLink, HomeLink, LoginLink, SignUpLink} from "../../RouteLinks/RouteLinks";
import ReactOwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import moment from 'moment';
import {SESSION_INTERVAL, USERTOKEN} from "../../Components/Auth/HOC/authcontroller";
import Navigation from "./Navigation";
import Header from "./Header";


export const checkUser = () => {
    let timeStamp = JSON.parse(localStorage.getItem(SESSION_INTERVAL));
    let user = JSON.parse(localStorage.getItem(USERTOKEN));
    if (timeStamp != null) {
        // get the session and compare the current time
        let diff = moment(timeStamp);
        if (diff < moment().subtract(50, 'minutes') || user == null) {
            return false;
        } else if (diff > moment().subtract(50, 'minutes') && user != null) {
            return true
        }

    }
};

const slides = [
    {img: require('../../admin/app-assets/images/slider/slider1.jpg')},
    {img: require('../../admin/app-assets/images/slider/slider2.jpg')},
    {img: require('../../admin/app-assets/images/slider/slider3.jpg')},
    {img: require('../../admin/app-assets/images/slider/slider4.jpg')},
];

class Home extends Component {

    state = {
        showMobileMenu: false,
        isLoggedIn: false,
        showLoader: true,
    };
    doAnimation = true;


    scrollIntoView = () => {
        document.querySelector('.testimonial').scrollIntoView({
            behavior: 'smooth'
        });
    };


    handleScrollAnimation = () => {
        if (this.doAnimation) {
            window.addEventListener('scroll', () => {
                const animatePos = 3400;
                let cards = document.getElementsByClassName("award-card");
                if (cards && cards.length > 0) {
                    if (window.scrollY < animatePos) {
                        cards[0].classList.add('active');
                        cards[1].classList.remove('active');
                    } else if (window.scrollY > animatePos && window.scrollY < 3600) {
                        cards[0].classList.remove('active');
                        cards[1].classList.add('active');
                    }

                }

            })
        }
    };

    componentWillUnmount() {
        this.doAnimation = false;
    }


    componentDidMount() {
        const isLoggedIn = checkUser();
        this.setState({isLoggedIn});
        this.doAnimation = this.handleScrollAnimation();
    }


    render() {
        const {isLoggedIn} = this.props;

        return (
            <React.Fragment>
                <div className={'homeBody'}>
                    <div className="home-content">
                        <div className="home-content--inner">
                            <header className="header header-background hero-bg">
                                <img src={homeBGImg} className='home-bg-img d-none' alt="svg image"/>
                                <div className="container">
                                    <Navigation isLoggedIn={isLoggedIn} scrollIntoView={this.scrollIntoView}/>
                                    <Header slides={slides} button className='d-none'/>
                                </div>
                            </header>

                            <section className="pb-sm-0  mb-md-5 pt-md-5">
                                <div className="container">
                                    <div className="row  mb-5 mb-md-0">
                                        <div className="col-md-6 text-center text-md-left mt-3 mt-lg-0">
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
                                                <h2 className="section-details-header text-center text-md-left mb-md-2">Relax
                                                    and Watch
                                                    Your Money
                                                    Grow</h2>
                                                <p className="section-details-paragraph text-center text-md-left mb-md-2  ">
                                                    Backup Cash is a secure and automated savings app that allows you
                                                    earn higher interest on deposits than your bank. </p>
                                                <p className="section-details-paragraph text-center text-md-left ">
                                                    It helps make saving little amounts of money easy, so you can reach
                                                    your goals faster. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="security-section deep-blue-bg-drop">
                                <div className="container">
                                    <div className="row text-center text-md-left">
                                        <div className=" col-md-8 offset-md-2 col-lg-8 offset-lg-2">
                                            <div className="security-info-wrapper mt-md-5 pb-5 pb-md-0">
                                                <div className="row pb-md-5">
                                                    <div className="col-12">
                                                        <div
                                                            className="d-flex flex-column flex-md-row justify-content-around align-items-center">
                                                            <div className="security-img-wrapper mb-2 mb-md-0">
                                                                <img src={securityIcon}
                                                                     alt="security icon"/>
                                                            </div>
                                                            <div className="ml-md-2 ml-md-0">
                                                                <h2>Your money is safe and secure</h2>
                                                                <h6 className='pr-lg-5'>Your funds are invested in the
                                                                    SFS Fixed Income Fund, managed by SFS Capital.
                                                                    The SFS Fixed Income Fund is AA rated and has won
                                                                    the BusinessDay Award for the Best performing Fixed
                                                                    Income Fund in 2018 and 2019.</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section className="start-now ">
                                <div className="container ">
                                    <div className="row ">
                                        <div className="col-md-12">
                                            <div className="section-header mt-md-5 ">
                                                <img className="mb-5 mb-md-3 yellow-icon-2" src={yellowIcon} alt=""/>
                                                <p>It’s Easy To Start With Backup Cash</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" pb-5 pb-md-0 height-100vh ">
                                    <div className="container px-lg-5">
                                        <div className="row mx-lg-5">
                                            <div className="col-md-4 px-md-1">

                                                <div className="card-container text-center mb-xs-5">
                                                    <div className="pt-5 mb-5  mb-md-3 pt-md-3">
                                                        <button className="rounded-btn round-btn-dark-blue">1</button>
                                                    </div>
                                                    <p className="card-text mb-5">Create an account or login
                                                        in less than two minutes </p>
                                                    <div className="card mb-5">
                                                        <img className="card-1-img" src={cardIll1}
                                                             alt="illustration"/>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-4 px-md-1">

                                                <div className="card-container text-center">
                                                    <div className="pt-5 mb-5 mb-md-3 pt-md-3">
                                                        <button className="rounded-btn round-btn-dark-blue">2</button>
                                                    </div>
                                                    <p className="card-text mb-5">Choose a savings plan that
                                                        works for you </p>
                                                    <div className="card mb-5">
                                                        <img className="card-1-img mt-3" src={cardIll2}
                                                             alt="illustration"/>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="col-md-4 px-md-1">
                                                <div className="card-container text-center">
                                                    <div className="pt-5 mb-5 mb-md-3 pt-md-3">
                                                        <button className="rounded-btn round-btn-dark-blue">3</button>
                                                    </div>
                                                    <p className="card-text mb-5">Rest easy and watch
                                                        your money grow </p>
                                                    <div className="card mb-5">
                                                        <img className="card-2-img" src={cardIll3} alt="illustration"/>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row pb-md-5">
                                            <div className="col-md-4 offset-md-4 text-center">
                                                <div className="pb-4 pt-2">
                                                    <Link to={'/sign-up'}
                                                          className="btn-rounded-corner mb-5 btn-light-blue">
                                                        Start Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="pb-3 app-features home-blue-bg">
                                <div className="container">
                                    <div className="row mt-0 pt-md-5 mb-md-5">
                                        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                                            <div className="section-header mt-5 mb-5">
                                                <img className="mb-4 yellow-icon" src={yellowIcon} alt=""/>
                                                <p>Reach your savings goal the simple and
                                                    reliable way</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div
                                                className="section-transparent-card reduced-section-transparent-card mb-5 ">
                                                <div className="section-transparent-card-icon">
                                                    <img src={featureImage1} alt={""}/>
                                                </div>
                                                <div
                                                    className="section-transparent-card-right text-center text-md-left">
                                                    <h5>Stay focused, Earn more</h5>
                                                    <p>Earn high interest upfront when you choose the option of saving
                                                        for a specified period.</p>
                                                </div>
                                            </div>
                                            <div className="section-transparent-card mb-5">
                                                <div className="section-transparent-card-icon">
                                                    <img src={featureImage2} alt={""}/>
                                                </div>
                                                <div
                                                    className="section-transparent-card-right text-center text-md-left">
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
                                                <div
                                                    className="section-transparent-card-right text-center text-md-left">
                                                    <h5>Flexible funding options</h5>
                                                    <p>Start making deposits with
                                                        your atm card or direct debit.</p>
                                                </div>
                                            </div>
                                            <div className="section-transparent-card mb-5">
                                                <div className="section-transparent-card-icon">
                                                    <img src={featureImage4} alt={""}/>
                                                </div>
                                                <div
                                                    className="section-transparent-card-right text-center text-md-left">
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
                            <section className="awards awards-bg pt-5">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <p className='text-center gray-text fs-1-5 mt-5 mb-3 mb-lg-5 mt-lg-0 d-flex align-items-lg-center justify-content-lg-center flex-column flex-lg-row'>
                                                <span>
                                                    Start Saving with only
                                                </span>
                                                <span className='d-flex align-items-center justify-content-center'>
                                                    <a href="https://api.whatsapp.com/send?phone=18883699915"
                                                       className='deep-blue-link-underline cursor-pointer'
                                                       rel="noopener noreferrer"
                                                       target='_blank'>
                                                        <strong>Whatsapp</strong>
                                                    </a>
                                                    <span>or</span>
                                                    <a href="https://play.google.com/store/apps/details?id=com.sfs.backup_cash"
                                                       className='deep-blue-link-underline cursor-pointer'
                                                       rel="noopener noreferrer"
                                                       target='_blank'>
                                                        <strong>Download App</strong>
                                                    </a>
                                                </span>

                                            </p>
                                        </div>
                                        <div className="col-md-4 ">
                                            <div className='fs-1-8 mt-5 mt-md-2 mt-lg-5 mb-3 text-center'>
                                                <img className='mb-3 mb-md-1 mb-lg-3'
                                                     src={require('../../admin/app-assets/images/svg/award-medal.svg')}
                                                     alt="award medal"
                                                />
                                                <p className='circular-std-Book text-deep-blue'>Some of our </p>
                                                <p className='circular-std-Black text-deep-blue px-3 px-lg-0 mb-5'>Acheivements </p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="award-card p-3 p-md-1 p-lg-3 mb-3 ">
                                                <img className='w-100'
                                                     src={require('../../admin/app-assets/images/award-1.png')}
                                                     alt="award image one"/>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="award-card p-3 p-md-1 p-lg-3 mb-3 ">
                                                <img className='w-100'
                                                     src={require('../../admin/app-assets/images/award-1.png')}
                                                     alt="award image one"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="client-say-section testimonial pt-sm-0 pt-md-5 mb-3">
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


                                <div>
                                    <div className="container">
                                        <div className="row pt-5 px-lg-5 mx-lg-5">
                                            <div id="carouselExampleControls" className="carousel slide"
                                                 data-ride="carousel">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item">
                                                        <div className="comment-box">
                                                            <div className="thumbnail">
                                                                <img className="user-image" src={CommentImage} alt="First slide"/>
                                                            </div>

                                                            <p>I was a bit skeptical about using Backup Cash given the
                                                                large of
                                                                savings apps out there. In just 3 weeks of using this
                                                                service,
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
                                                            <p>Thanks for the app. I feel so proud to actually be able
                                                                to start a saving culture. Over time i will save even
                                                                more.</p>
                                                            <h4 className="comment-name">Bunmi Akinfenwa</h4>
                                                            <span>Entrepreneur</span>
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

                                                            <p>As an accountant, the daily interest growth calculation
                                                                is a
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

                                                            <p>Being able to concurrently save for the office rent and
                                                                my end of
                                                                year
                                                                vacation on one platform even though I am using two
                                                                different
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

                                                            <p>Last December, I couldn’t attend all my favorite shows
                                                                because of
                                                                the costs.
                                                                Right now, I have saved enough for at least 3 shows and
                                                                a nice
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
                            <section className="partner-section pt-0  pt-md-5 pb-md-3 pt-lg-0">
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
                                                    <a href={'http://www.paystack.com'} rel={'noopener noreferrer'} target='_blank'>
                                                        <img className="partner-img " src={paystackImage} alt="paystack"/>
                                                    </a>

                                                </div>
                                                <div className="partner-img-container">
                                                    <a href={'https://www.sfsnigeria.com/'} rel={'noopenner noreferrer'}
                                                       target='_blank'>
                                                        <img className="partner-img-50 sfs-image" src={sfsImage} alt="sfs"/>
                                                    </a>

                                                </div>
                                                <div className="partner-img-container">
                                                    <a href={'http://www.tm30.net'} rel={'noopenner noreferrer'}
                                                       target='_blank'>
                                                        <img className="partner-img-50 tm-30" src={tm30} alt="aa"/>
                                                    </a>

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
                                                <h2 className="mb-3 mt-5 pr-lg-5 text-white cas-title">
                                                    Protect your interest with SFS Backup Cash</h2>
                                                <Link to={'/sign-up'}
                                                      className="btn btn-yellow-outline btn-custom-border cas-btn">
                                                    Start Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/*whats app section*/}
                            <section className="whatsapp pt-3 pt-md-0 mb-5 mb-md-0">
                                <div className="container">
                                    <div className="row ">
                                        <div className="col-md-6">
                                            <div className="contact-detail-placeholder text-center pt-md-5">
                                                <p className="deep-blue-color pt-md-5 chat-title">
                                                    Chat with us on Whatsapp
                                                </p>
                                                <div className="btn btn-whatsapp chat-whats-app">
                                                    <a href="https://api.whatsapp.com/send?phone=18883699915"
                                                       className='whatsapp-link'
                                                       target='_blank'
                                                    >
                                                        <img alt={'pin icon'} src={whatsAppIcon} className="w-20"/>
                                                    </a>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="contact-detail-placeholder pt-3 text-center pt-md-5">
                                                <p className="deep-blue-color pt-md-5 chat-title">
                                                    Connect with social media
                                                </p>
                                                <div className="btn btn-whatsapp social-media">
                                                    <div className="footer-icon-list d-flex justify-content-between">
                                                    <span className="fa-stack fa-sm">
                                                        <a href='https://www.facebook.com/BackUpCash/' rel='noreferrer'
                                                           target='_blank'>
                                                            <i className="fa fa-circle fa-stack-2x"/>
                                                            <i className="fa fa-facebook fa-stack-1x fa-inverse"/>
                                                        </a>
                                                    </span>
                                                        <span className="fa-stack fa-sm">
                                                        <a href='https://twitter.com/mybackupcash' rel='noreferrer'
                                                           target='_blank'>
                                                            <i className="fa fa-circle fa-stack-2x"/>
                                                            <i className="fa fa-twitter fa-stack-1x fa-inverse"/>
                                                        </a>
                                                    </span>

                                                        <span className="fa-stack fa-sm">
                                                    <a href="https://www.instagram.com/mybackupcash/" rel='noreferrer'
                                                       target='_blank'>
                                                         <i className="fa fa-circle fa-stack-2x"/>
                                                        <i className="fa fa-instagram fa-stack-1x fa-inverse"/>
                                                    </a>
                                                </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <footer className="home-footer footer">
                                <div className="container my-0 my-lg-5">
                                    <div className="row px-lg-5 mx-lg-5">
                                        <div className="col-md-3 offset-md-0 d-lg-block offset-lg-0 col-lg-3">
                                            <div className="footer-logo">
                                                <img src={sfsFooterLogo} alt="sfs footer logo"/>
                                            </div>
                                        </div>
                                        <div className="col-md-9 offset-md-0 col-sm-12 offset-sm-0
                                             d-lg-block offset-lg-1 col-lg-8">
                                            <div className="row">
                                                <div className=" col-sm-6 col-md-4 col-lg-4 ">
                                                    <p className="footer-header">Company</p>
                                                    <ul className="footer-list">
                                                        <li>
                                                            <Link to={HomeLink}>Testimonials</Link>
                                                        </li>
                                                        <li>
                                                            <Link to={FaqLink}>FAQs</Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-6 col-md-4 col-lg-4 ">
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
                                                <div className="col-sm-6 offset-sm-6 offset-md-0 col-md-4 col-lg-4 ">
                                                    <p className="footer-header">Physical Address</p>

                                                    <p className='gray-text footer-p'>Plot 287 Ajose Adeogun Street,
                                                        Victoria
                                                        Island 23401, Lagos</p>
                                                    <div className='gray-text footer-p'>Enquires:
                                                        <p>Help@mybackupcash.com</p>
                                                        <p>08149460946,09087766679</p>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                        <div
                                            className="col-md-12 mt-5 d-flex flex-column flex-md-row justify-content-between">
                                            <p className="footer-sub-text text-center">&copy; SFSbackup Cash 2019. All
                                                Rights
                                                Reserved</p>
                                            <p className="footer-sub-text text-center mr-lg-3">Powered by
                                                <a href='http://www.tm30.net' rel='noreferrer'
                                                   className='footer-brand-link'
                                                   target='_blank'> TM30
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </div>

                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default Home;