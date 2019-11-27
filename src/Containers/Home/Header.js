import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import facebookCreateBtn from "../../admin/app-assets/images/create-with-whatsapp@2x.png";
import whatsappCreateBtn from "../../admin/app-assets/images/create-with-facebook@2x.png";
import ReactOwlCarousel from "react-owl-carousel";

const Header = ({button, slides, label, text,className ,textClassName}) => {
    return (
        <Fragment>
            <div className="row pt-lg-1">
                <div className="col-lg-6 mt-md-5 mt-lg-0 text-center text-lg-left">
                    <div className="header-words-container pt-lg-5 pr-lg-3">
                        <h1 className={`animated fadeInDown delay-1s fast header-title mt-5 mt-lg-0 mb-1 mb-md-3 mt-md-0 ${textClassName} px-2 px-sm-0`}>
                            {label ? label : <>Earn up to <strong>13% </strong><br/>interest on Savings.</>}
                        </h1>
                        {text ?
                            <>
                                <p className={`header-sub-title animated fadeInDown fast delay-1s `}>{text}</p>
                            </> :
                            <>
                                <p className="header-sub-title animated fadeInDown fast delay-1s">Save as little as <strong>₦500 </strong></p>
                                <p className="header-sub-title animated fadeInDown fast delay-1s mb-3">Save Money , Grow Wealth.</p>
                            </>
                        }


                        {
                            button &&
                            <>
                                <Link to={'/sign-up'}
                                      className="btn px-5 btn-light-blue-round btn-hover-shadow animated fadeIn fast delay-1s">
                                    Create a free account
                                </Link>

                                <div
                                    className="hero-cta-btn-container pt-3 mb-3  d-lg-flex text-center animated fadeIn fast delay-1s">
                                    <a href='https://www.messenger.com/t/BackUpCash' rel='noreferrer' target='_blank'>
                                        <img src={facebookCreateBtn} className=' cursor-pointer mr-1'
                                             alt="facebook create button"/>
                                    </a>
                                    <a href="https://api.whatsapp.com/send?phone=18883699915" target='_blank'>
                                        <img src={whatsappCreateBtn} className=' cursor-pointer'
                                             alt="whatsapp create button"/>
                                    </a>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div
                    className={`col-lg-6 mt-md-5 mt-lg-0 text-center pt-lg-2 text-lg-left my-4 d-lg-block ${className}`}>
                    <ReactOwlCarousel
                        className="owl-theme hero-carousel"
                        loop
                        margin={10}
                        autoplay={1000}
                        autoplayTimeout={5000}
                        dots={false}
                        responsiveClass={true}
                        items={1}
                        nav={true}
                    >
                        {slides && slides.length > 0 ?
                            slides.map((slide) => {
                                return <img src={slide.img} className='item hero-slide-item'
                                            alt="first slide image"/>
                            }) :
                            ''}
                    </ReactOwlCarousel>
                </div>
            </div>
        </Fragment>
    );
};

Header.propTypes = {};

export default Header;