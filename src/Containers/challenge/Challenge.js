import React, {Component} from 'react';
import Navigation from "../Home/Navigation";

class Challenge extends Component {

    render() {
        return (
            <div className='challenge'>
                <div className={'homeBody'}>
                    <header className="challenge-hero">
                        <div className="container">
                            <Navigation/>
                            <div className="row mt-lg-5 pt-md-5">
                                <div className="col-lg-4 offset-lg-4">
                                    <div className="challenge-logo text-center">
                                        <img className='w-100'
                                             src={require('../../admin/app-assets/images/challenge/hero-21-challenge-logo.png')}
                                             alt="challenge logo"/>
                                        <a href={'https://api.whatsapp.com/send?phone=18883699915'} target="_blank"
                                           className={'btn-rounded-blue btn-deep-blue px-3 px-lg-5 animated fadeIn fast'}
                                        >Start Now</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </header>
                    <section className='bg-white-referral-img'>


                    </section>
                    <section className='bg-gold-prize-img'>


                    </section>
                    <section className='bg-prize-img'>


                    </section>
                    <section className='how-to-challenge mb-2 mb-lg-0'>
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className="py-lg-5 my-lg-5 py-2 my-2 px-1 fs-1-8 circular-std">
                                    <h1 className='fs-3'><strong>How to Enter:</strong></h1>
                                    <ol className='how-to-list'>
                                        <li><strong>Sign up</strong> on Backup Cash via whatsapp</li>
                                        <li><strong>Start </strong> a steady save</li>
                                        <li><strong>Save at least </strong>&#8358;500 every day from Nov. 1 - 21</li>
                                        <li><strong>Refer at least </strong>% friends with your referral code</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                        <div className="text-center mt-5 ">
                            <em>Terms & Conditions Apply.</em>
                        </div>
                    </section>
                    <section className='bg-challenge-message'>

                    </section>

                </div>
            </div>
        );
    }
}

Challenge.propTypes = {};

export default Challenge;