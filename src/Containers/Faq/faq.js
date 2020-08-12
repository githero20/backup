import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../admin/assets/css/hamburgers.min.css';
import '../../admin/assets/css/backup-cash-style.css';
import sfsFooterLogo from "../../admin/app-assets/images/svg/sfs-footer.svg";
import { FaqLink, HomeLink, LoginLink, SignUpLink } from "../../RouteLinks/RouteLinks";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import yellowIcon from "../../admin/app-assets/images/svg/icon-yellow.svg";
import { hideLoader } from "../../Helpers/Helper";
import Navigation from "../Home/Navigation";

class Faq extends Component {

    state = { showMobileMenu: false, isLoggedIn: false };

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

    componentDidMount() {
        hideLoader();
        console.log('this faq props', this.props);
        // const isLoggedIn = checkUser();
        // this.setState({isLoggedIn});
    }

    render() {
        const { isLoggedIn, history } = this.props;
        return (
            <React.Fragment>
                <div className={'homeBody'}>
                    <header className=" faq-hero ">
                        <div className="container">
                            <Navigation isLoggedIn={isLoggedIn} />
                        </div>
                    </header>
                    <section className='faq-main my-5'>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center text-md-left">
                                    <div className="faq-header mb-md-5">
                                        <div className="yellow-icon-holder">
                                            <img className="mb-2 pt-md-2 yellow-icon" src={yellowIcon}
                                                alt="yellow icon" />
                                        </div>
                                        <h2 className="section-details-header text-center text-md-left mb-md-2">
                                            Frequently Asked Questions.</h2>
                                        {/*<p className='mb-3 mt-3 mt-md-0'>Backup Cash is a savings platform designed to*/}
                                        {/*    help you encourage a disciplined*/}
                                        {/*    financial lifestyle by automating your savings on daily, weekly or monthly*/}
                                        {/*    basis. Backup Cash is encrypted with bank grade level security that makes*/}
                                        {/*    saving quick,*/}
                                        {/*    simple, flexible and convenient.*/}
                                        {/*</p>*/}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="faq-title">
                                    </div>
                                    <div id="accordion">
                                        <div className="card">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link" data-toggle="collapse"
                                                        data-target="#collapseOne" aria-expanded="true"
                                                        aria-controls="collapseOne">
                                                        What is Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>

                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Backup Cash is a financial tool that allows individuals to save and
                                                    earn upto 16% interest on their savings. The goal is to encourage a
                                                    disciplined financial lifestyle using any of our savings options. It
                                                    is easy to use, convenient and equally flexible.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseTwo" aria-expanded="false"
                                                        aria-controls="collapseTwo">
                                                        Why should I save with Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    At Backup Cash, we have a team of investment experts who can help
                                                    you plan your financial goals and together, decide what savings
                                                    option works best for you. Our interest rate is not affected by the
                                                    workings of the money market. Which means that it is at the rate
                                                    that we tell you. Above all, we have amazing value added services
                                                    that our savers get to enjoy by saving on the platform.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingThree">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseThree" aria-expanded="false"
                                                        aria-controls="collapseThree">
                                                        What savings options are best for me?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    <ul>
                                                        <li>
                                                            We recommend <b>instant save</b> for people who wish to make
                                                            a one
                                                            time deposit to their account. This is common for people who
                                                            do not have a steady income, business owners, freelancers,
                                                            students. This is equally a great option if you are looking
                                                            at short term investment opportunities. You can access this
                                                            anytime.
                                                        </li>
                                                        <li>
                                                            For salary earners, we recommend <b>steady save</b>. The
                                                            best way
                                                            to use this will be to automate the savings according to how
                                                            you earn. It can be daily, weekly or monthly. If you wish to
                                                            change the automated amount, you can do so.
                                                        </li>
                                                        <li>
                                                            For long term investments, we recommend <b>locked
                                                            savings</b>. This
                                                            is for those who want to watch their money grow for a longer
                                                            period. It is also a medium to ensure that on no account do
                                                            you withdraw the money until the maturity day when you can
                                                            choose to withdraw or relock.
                                                        </li>
                                                        <li>
                                                            If you wish to save towards a specific project, we recommend
                                                            a
                                                            <b>backup goal</b>.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingFour">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseFour" aria-expanded="false"
                                                        aria-controls="collapseFour">
                                                        Can I pause my steady save?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Yes, you can. This can only be done via our website.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingFive">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseFive" aria-expanded="false"
                                                        aria-controls="collapseFive">
                                                        What if I am a bot user and wish to log in via the web. How do I
                                                        access that?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Click <a
                                                        href="https://mybackupcash.com/bot/create-password">here</a> to
                                                    enter the registered WhatsApp number you used to open the account.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingSix">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseSix" aria-expanded="false"
                                                        aria-controls="collapseSix">
                                                        Can I unlock my locked savings?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSix" className="collapse" aria-labelledby="headingSix"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    You cannot unlock your locked savings. This is because you are paid
                                                    an upfront interest. As such, you need to wait for the maturity
                                                    date.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingSix0">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseSix0" aria-expanded="false"
                                                        aria-controls="collapseSix0">
                                                        Can I add money to my locked savings?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSix0" className="collapse" aria-labelledby="headingSix0"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    You can create a new locked savings but cannot add to the existing
                                                    locked amount.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingSeven">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseSeven" aria-expanded="false"
                                                        aria-controls="collapseSeven">
                                                        What happens to the money in my locked savings upon maturity?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Upon maturity, the money goes to your backup stash. From your Backup
                                                    Stash, you can either withdraw the money, send it to your central
                                                    vault or lock the money again.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingEight">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseEight" aria-expanded="false"
                                                        aria-controls="collapseEight">
                                                        How much can I save on Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseEight" className="collapse" aria-labelledby="headingEight"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    The minimum investment on Backup Cash is N500 and there is no
                                                    maximum limit.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingEight0">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseEight0" aria-expanded="false"
                                                        aria-controls="collapseEight0">
                                                        How can I save on Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseEight0" className="collapse"
                                                aria-labelledby="headingEight0"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    To save, you have 3 options;
                                                    <ul>
                                                        <li>
                                                            The website which is <a
                                                                href="http://www.mybackupcash.com">www.mybackupcash.com</a>
                                                        </li>
                                                        <li>
                                                            The app which is available on ios and playstore
                                                        </li>
                                                        <li>
                                                            The whatsapp bot which you can access here
                                                        </li>
                                                    </ul>
                                                    Once you have signed up on any of these channels, kindly add the ATM
                                                    card of the bank account you wish to deduct the savings from.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingNine">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseNine" aria-expanded="false"
                                                        aria-controls="collapseNine">
                                                        Why do I need to add my bank ATM card?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseNine" className="collapse" aria-labelledby="headingNine"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    This is the medium through which you can deposit money into your
                                                    Backup Cash account. We do not initiate any transaction on your card
                                                    that you do not authorize as the card is not exactly stored on our
                                                    system. We use Paystack to carry out all our transactions.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingTen">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseTen" aria-expanded="false"
                                                        aria-controls="collapseTen">
                                                        Why do I need to set a withdrawal pin?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTen" className="collapse" aria-labelledby="headingTen"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    The withdrawal pin is not the same as your ATM pin. It can be any 4
                                                    digit that you can remember. This is used to make withdrawals from
                                                    the system into your bank account.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingEleven">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseEleven" aria-expanded="false"
                                                        aria-controls="collapseEleven">
                                                        What if my bank card has a limit?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseEleven" className="collapse"
                                                aria-labelledby="headingEleven" data-parent="#accordion">
                                                <div className="card-body">
                                                    You can also make bank transfers to us. To ensure that you are
                                                    making payment to the right channel, kindly contact our client
                                                    support on <a href="tel:08149460946">08149460946</a> or send an
                                                    email to
                                                    <a href="mailto:help@mybackupcash.com">help@mybackupcash.com</a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingTwelve">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseTwelve" aria-expanded="false"
                                                        aria-controls="collapseTwelve">
                                                        What makes you different from a traditional savings account?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwelve" className="collapse"
                                                aria-labelledby="headingTwelve" data-parent="#accordion">
                                                <div className="card-body">
                                                    At Backup Cash, we offer you an interest rate that most of the
                                                    traditional savings platforms will not offer you.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingThirteen">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseThirteen" aria-expanded="false"
                                                        aria-controls="collapseThirteen">
                                                        How do you get the interest that you pay on the savings?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseThirteen" className="collapse"
                                                aria-labelledby="headingThirteen" data-parent="#accordion">
                                                <div className="card-body">
                                                    All funds are invested into the SFS Fixed income fund, an AA rated
                                                    fund that is regulated by SEC and listed on FMDQ.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingFourteen">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseFourteen" aria-expanded="false"
                                                        aria-controls="collapseFourteen">
                                                        How do I calculate my interest?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFourteen" className="collapse"
                                                aria-labelledby="headingFourteen" data-parent="#accordion">
                                                <div className="card-body">
                                                    For all other savings options that are in your central vault, you
                                                    get 8% per annum and for locked savings, you get 11% per annum. To
                                                    calculate what you get every month, simply divide the percentage by
                                                    12. For locked savings, we have an inbuilt calculator.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingSixteen">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseSixteen" aria-expanded="false"
                                                        aria-controls="collapseSixteen">
                                                        How can you guarantee the security of my funds?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSixteen" className="collapse"
                                                aria-labelledby="headingSixteen"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Backup Cash is backed by SFS Capital and ensures the security of all
                                                    funds on the platform. It is registered and its activities are
                                                    regulated by the Security and Exchange Commission (SEC).
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingSeventeen">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus'> </i></span>
                                                    <button className="btn btn-link collapsed" data-toggle="collapse"
                                                        data-target="#collapseSeventeen" aria-expanded="false"
                                                        aria-controls="collapseSeventeen">
                                                        Can I withdraw my savings at any time?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSeventeen" className="collapse"
                                                aria-labelledby="headingSeventeen"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Yes, you can make withdrawals at any time so long as you have
                                                    exceeded the holding period on our platform. However, there is a
                                                    penalty fee if you wish to withdraw outside of your free withdrawal
                                                    dates. You have 4 free withdrawals in a year; one every quarter.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingEighteen">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseEighteen"
                                                        aria-expanded="false"
                                                        aria-controls="collapseEighteen">
                                                        What are the Backup Cash default withdrawal dates?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseEighteen" className="collapse"
                                                aria-labelledby="headingEighteen"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    <ul>
                                                        <li>
                                                            Every 31st of March
                                                        </li>
                                                        <li>
                                                            Every 30th of June
                                                        </li>
                                                        <li>
                                                            Every 30th of September
                                                        </li>
                                                        <li>
                                                            Every 31st of December

                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingNineteen">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseNineteen"
                                                        aria-expanded="false"
                                                        aria-controls="collapseNineteen">
                                                        Can I change my withdrawal date?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseNineteen" className="collapse"
                                                aria-labelledby="headingSixteen"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Yes, you can change your withdrawal dates once in 12months. To do
                                                    so, click on the withdrawal menu and click on change settings.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        What is the penalty fee?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    The penalty fee is 5% of the money you wish to withdraw.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        What is a holding period?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    At Backup Cash, we have a holding policy of 30days. This starts to
                                                    count from the moment that you join the platform. It means that you
                                                    cannot make any withdrawals for a period of 30days. This is to
                                                    ensure that there is no abuse of the platform and that you can
                                                    inculcate a healthy savings culture.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        Is there a minimum account balance on Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Yes, you need a minimum of N500 on your Backup Cash account.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        How about the referral program on Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    On Backup Cash, we do have a referral program that allows users earn
                                                    backup Cash points when they invite someone to signup on the
                                                    platform using their unique code. These points can be converted in
                                                    the future. To learn more, click
                                                    <a target='_blank'
                                                        href="https://medium.com/@mybackupcash/we-are-back-to-referral-points-60bfc41b65d4">here</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        Can I have multiple accounts on Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    No, each user is allowed to open just one account with the name that
                                                    is associated with your BVN.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        Why do you need my BVN?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    We need your BVN for security purposes. First, to confirm your
                                                    identity and to also guard against theft. This is a pre requisite
                                                    for withdrawal.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        Does Backup Cash have an office?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    Yes, we do. We are located at Plot 287 Ajose Adeogun, Victoria
                                                    Island Lagos.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        I still have more questions
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    You can reach us on;
                                                    +234 814 946 0946 or +234 908 776 6679
                                                    Email: help@mybackupcash.com
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-header" id="headingTwenty">
                                                <h5 className="mb-0 d-flex align-items-center">
                                                    <span><i className='fa fa-plus' /></span>
                                                    <button className="btn btn-link collapsed"
                                                        data-toggle="collapse"
                                                        data-target="#collapseTwenty"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwenty">
                                                        I am ready to open an account now
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwenty" className="collapse"
                                                aria-labelledby="headingTwenty"
                                                data-parent="#accordion">
                                                <div className="card-body">
                                                    <button onClick={() => history.push(SignUpLink)}
                                                        className='btn blue-round-btn btn-custom-blue'>Sign up
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="container">

                            <div className=" row pt-lg-1">
                                <div className="col-lg-6 my-md-5 mt-lg-0 text-center text-lg-left">
                                    <div className="header-words-container pt-lg-5 pr-lg-3">

                                        <h1 className="header-title mt-5 mt-lg-1 mb-2 mt-md-0  px-2 px-sm-0 ">
                                            <div className="yellow-icon-holder">
                                                <img className="mb-2 pt-md-2 yellow-icon" src={yellowIcon}
                                                    alt="yellow icon" />
                                            </div>
                                            We are here to Help.
                                        </h1>
                                        <p className="header-sub-title mb-0 ">
                                            Get in Touch With Us
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-row row mt-5">
                                <div className="col-sm-4 text-center text-md-left">
                                    <div className="mb-3 mt-3 mt-md-0 mb-md-5">
                                        <h4 className='text-capitalize'>Whatsapp</h4>
                                        <p className='gray-text '>+1 888 369 9915</p>
                                    </div>
                                </div>
                                <div className="col-sm-4 text-center text-md-left">
                                    <div className="mb-3 mb-md-5 ">
                                        <h4 className='text-capitalize'>Email</h4>
                                        {/*<p className='gray-text text-capitalize'>Enquiries@SFSBackupcash.com</p>*/}
                                        <p className='gray-text text-capitalize'>help@mybackupcash.com</p>
                                    </div>
                                </div>
                                <div className="col-sm-4 text-center text-md-left">
                                    <div className="mb-3 mb-md-5 ">
                                        <h4 className='text-capitalize'>Phone</h4>
                                        <p className='gray-text text-capitalize'> +234 814 946 0946 | +234 908 776 6679
                                        </p>
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
                                        <img src={sfsFooterLogo} alt="sfs footer logo" />
                                    </div>
                                </div>
                                <div className=" col-sm-6 col-md-4 col-lg-3 ">
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

                                    <p className='gray-text footer-p'>Plot 287 Ajose Adeogun Street, Victoria Island
                                        23401, Lagos</p>
                                    <p className='gray-text footer-p'>Enquires: +234 814 946 0946 , +234 908 776
                                        6679</p>
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

export default Faq;