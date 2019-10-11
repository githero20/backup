import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../admin/assets/css/hamburgers.min.css';
import '../../admin/assets/css/backup-cash-style.css';
import backupCashLogo from "../../admin/app-assets/images/Logo@2x.png";
import sfsFooterLogo from "../../admin/app-assets/images/svg/sfs-footer.svg";
import {DashboardLink, FaqLink, HomeLink, LoginLink, SignUpLink} from "../../RouteLinks/RouteLinks";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import yellowIcon from "../../admin/app-assets/images/svg/icon-yellow.svg";
import {hideLoader} from "../../Helpers/Helper";

class Faq extends Component {

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

    scrollIntoView = () => {
        document.querySelector('.testimonial').scrollIntoView({
            behavior: 'smooth'
        });
    };

    componentDidMount() {
        hideLoader();
    }

    render() {
        return (
            <React.Fragment>
                <div className={'homeBody'}>
                    <header className="p-1 p-md-0 ">
                        <div className="container">
                            <nav className="home-nav navbar navbar-expand-lg ">
                                <Link to={HomeLink} className="navbar-brand">
                                    <img src={backupCashLogo} alt="logo" width="150px"/>
                                </Link>
                                <a onClick={this.showMobileMenu} className="hamburger hamburger--slider navbar-toggler"
                                   data-toggle="collapse" data-aria-controls="navbarSupportedContent"
                                   aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner"/>
                                    </span>
                                </a>

                                <div className="collapse navbar-collapse mobile d-md-none animated slideInLeft faster"
                                     id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={HomeLink}>Home </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={FaqLink}>FAQs </Link>
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
                                            <Link className="nav-link" to={FaqLink}>FAQs </Link>
                                        </li>
                                        {/*<li className="nav-item">*/}
                                        {/*    <Link className="nav-link" to={HomeLink}>Testimonials </Link>*/}
                                        {/*</li>*/}
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
                            </nav>

                        </div>
                    </header>
                    <section className='faq-main my-5'>
                        <div className="container">
                            <div className="row">
                                <div className="col-12 text-center text-md-left">
                                    <div className="faq-header mb-md-5">
                                        <div className="yellow-icon-holder">
                                            <img className="mb-2 pt-md-2 yellow-icon" src={yellowIcon}
                                                 alt="yellow icon"/>
                                        </div>
                                        <h2 className="section-details-header text-center text-md-left mb-md-2">
                                            Frequently Asked Questions.</h2>
                                        <p className='mb-3 mt-3 mt-md-0'>Backup Cash is a savings platform designed to
                                            help you encourage a disciplined
                                            financial lifestyle by automating your savings on daily, weekly or monthly
                                            basis. Backup Cash is encrypted with bank grade level security that makes
                                            saving quick,
                                            simple, flexible and convenient.
                                        </p>
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
                                                        How do I start saving on Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>

                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - Visit backupcash.com to create an account.<br/>
                                                    - Activate your account by making your first savings deposit. You
                                                    can use a MasterCard, Visa or Verve from any bank in Nigeria.<br/>
                                                    - Set your withdrawal account – This is the account we well debit
                                                    funds from.<br/>
                                                    - Then set up your savings plan.<br/>
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
                                                        Does Backup Cash charge me any fees?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - No, It's completely FREE. There are no charges for transferring
                                                    money to your Backup Cash account.
                                                    <br/>
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
                                                        Are my Card details Safe?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - Your security is our priority.<br/>
                                                    - Your card details are extremely safe as they are never stored on
                                                    Backup Cash.<br/>
                                                    - We work with a PCIDSS-compliant payment
                                                    processor,<strong>Paystack</strong> to handle your card transactions
                                                    and details.<br/>
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
                                                        What happens if I miss some days, weeks or months on my savings
                                                        plan?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - Nothing happens when you miss any day, week or month, there will
                                                    be no penalties.<br/>
                                                    - The “Instant save” option is available for you to manually make up
                                                    for any lost day, week or month as you please.<br/>
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
                                                        Can I pause and continue saving anytime?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - Yes, you can, it is up to you to pause or continue the automatic
                                                    saving any time without any charges.<br/>
                                                    - Just log in and click on “Autosave” and then click on “Pause” or
                                                    "Turn Off”.<br/>
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
                                                        What is Instant save and how does it work?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSix" className="collapse" aria-labelledby="headingSix"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - The “Instant save” feature enables you to add more funds to your
                                                    savings manually whenever you want.<br/>
                                                    - After the first savings payment of ₦500 using your registered
                                                    debit card, you have the option of saving any amount you wish to
                                                    deposit.<br/>
                                                    - You can add up to ₦500,000 at once with this option. However, you
                                                    can add this multiple times in a single day. For example, if you
                                                    want to add ₦1,000,000.00 you need to add ₦500,000.00 twice.<br/>
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
                                                        What is Steady Save?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSix0" className="collapse" aria-labelledby="headingSix0"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - “Steady save” allows you to reach your goal by helping you save
                                                    automatically.<br/>
                                                    - You have the option of setting a specific amount that is to be
                                                    deducted from your debit card on a daily, weekly or monthly basis.
                                                    <br/>
                                                    - You can also choose what time of the day you want the deductions
                                                    made and the date you want to start.<br/>
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
                                                        How much can I Start with?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - To get your account activated, you can save a minimum of ₦500.
                                                    <br/>
                                                    - To set up your savings plan, you can save a minimum of ₦500 daily,
                                                    weekly or monthly.<br/>
                                                    - When using the “InstantSave” option which allows you add more
                                                    funds to your savings anytime, you can add up to ₦500,000 per
                                                    transaction.<br/>
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
                                                        How safe is Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseEight" className="collapse" aria-labelledby="headingEight"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - Backup Cash is encrypted with a high level of security.<br/>
                                                    - All financial information is encrypted and stored to PCI DSS Level
                                                    1 compliance standards.<br/>
                                                    - PCI DSS Level 1 compliance is a set of rules stated by credit card
                                                    companies and audited by an independent third party.<br/>
                                                    - It is one of the highest possible rating in the electronic payment
                                                    processing industry.<br/>
                                                    - Additionally, all transmission within our site is via an encrypted
                                                    256-bit HTTPS SSL connection.<br/>
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
                                                        Are you licensed by SEC (Securities and Exchanges Commission)?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseEight0" className="collapse"
                                                 aria-labelledby="headingEight0"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - We are backed by the license of SFS Capital.<br/>
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
                                                        Are savings on my account done automatically?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseNine" className="collapse" aria-labelledby="headingNine"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - Yes, savings are done automatically, and you are not required to
                                                    login every time you want to save except when you want to use the
                                                    “Instant save” option.<br/>
                                                    - All transactions on your debit card will be visible in your
                                                    dashboard.<br/>
                                                    - We will send an email receipt to you every single time you save
                                                    with your debit card and your bank will also send you an alert.<br/>
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
                                                        What happens if I don't have funds in my bank
                                                        account/debit card?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTen" className="collapse" aria-labelledby="headingTen"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - You won’t be able to automatically save for that day, week or
                                                    month.<br/>
                                                    - We can only help you save when you have funds in your
                                                    account.<br/>
                                                    - However, you have options of using <strong>Instant
                                                    Save</strong> once your account is
                                                    funded by saving manually or <strong>Steady Save</strong> that
                                                    automatically debits your
                                                    registered account towards your targeted goal.
                                                    <br/>
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
                                                        What is Locked Savings?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseEleven" className="collapse"
                                                 aria-labelledby="headingEleven" data-parent="#accordion">
                                                <div className="card-body">
                                                    - “Locked Savings” is our short-term investment product that allows
                                                    you earn up to 13% per annum. We typically encourage
                                                    a minimum of 90days.<br/>
                                                    - This acts as your sub account which allows you transfer funds
                                                    from your “Central Vault” balance for a fixed period of time
                                                    (you can choose between 10 and 1000 days) without having any
                                                    access until maturity.<br/>
                                                    - The “Locked Savings” feature is a step further in curbing
                                                    your spending urge. We help you ensure your savings are kept
                                                    to meet your personal goals and needs. “Locked savings” attracts
                                                    an upfront interest payment into your central vault immediately
                                                    you lock funds for a specified period.<br/>
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
                                                        Is Backup Cash Licensed?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwelve" className="collapse"
                                                 aria-labelledby="headingTwelve" data-parent="#accordion">
                                                <div className="card-body">
                                                    - Backup Cash is promoted by SFS Capital Nigeria Limited (SFS).
                                                    SFS is a registered and regulated by Securities & Exchange
                                                    Commission (SEC) to do Investment Management and has an Investment
                                                    Management Rating of 'A'.
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
                                                        Where is Backup Cash Invested?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseThirteen" className="collapse"
                                                 aria-labelledby="headingThirteen" data-parent="#accordion">
                                                <div className="card-body">
                                                    - Backup Cash is investment primarily in the 'AA' rated SFS
                                                    Fixed Income Fund which is Invested mainly in CBN Treasury Bills
                                                    and FGN Bonds.<br/>
                                                    - SFS Fixed Income Fund is also listed on the Nigerian Stock
                                                    Exchange and has a 'AAA' rated Custodian to hold its investments
                                                    and a SEC regulated Trustee to monitor compliance and investment
                                                    decisions.<br/>
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
                                                        Can I effect a Bank Transfer to Backup Cash?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseFourteen" className="collapse"
                                                 aria-labelledby="headingFourteen" data-parent="#accordion">
                                                <div className="card-body">
                                                    - Yes you can effect a Bank transfer to:<br/>
                                                    - Bank Name: Stanbic IBTC Bank:<br/>
                                                    - Account Name: SFS BACKUP CASH<br/>
                                                    - Account Number: 0032263465<br/>
                                                    - Please ensure you quote your registered Mobile Number
                                                    in full in the reference section<br/>
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
                                                        Can I effect Payments and withdrawals via USSD?
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseSixteen" className="collapse"
                                                 aria-labelledby="headingSixteen"
                                                 data-parent="#accordion">
                                                <div className="card-body">
                                                    - Dial *372*Amount# to Invest.<br/>
                                                    - Dail *372*1*Amount# to withdraw.<br/>
                                                    - Always use your registered mobile number.<br/>
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
                                                     alt="yellow icon"/>
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
                                        <p className='gray-text text-capitalize'>Enquiries@SFSBackupcash.com</p>
                                    </div>
                                </div>
                                <div className="col-sm-4 text-center text-md-left">
                                    <div className="mb-3 mb-md-5 ">
                                        <h4 className='text-capitalize'>Phone</h4>
                                        <p className='gray-text text-capitalize'>+234 814 946 0946 | +234 701 856 7235
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
                                        <img src={sfsFooterLogo} alt="sfs footer logo"/>
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

                                    <p className='gray-text footer-p'>Plot 287 Ajose Adeogun Street, Victoria
                                        Island 23401, Lagos</p>
                                    <p className='gray-text footer-p'>Enquires: +234 814 946 0946 , +234 701 856
                                        7235 </p>
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