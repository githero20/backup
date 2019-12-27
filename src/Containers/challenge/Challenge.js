import React from 'react';
import Navigation from "../Home/Navigation";
import Header from "../Home/Header";

const Challenge = () => {
    const slides = [
        {img: require('../../admin/app-assets/images/slider/mybackupcash_1___B5TgrgWANCo___.jpg')},
        {img: require('../../admin/app-assets/images/slider/mybackupcash_2___B5TgrgWANCo___.jpg')},
    ];
    return (
        <div className='challenge'>
            <div className={'homeBody'}>
                <header className="challenge-hero hero-bg">
                    <div className="container">
                        <Navigation/>
                        <Header slides={slides} label={'21 Days Challenge \n is Over'}
                                textClassName={'pt-3'}
                                text={'We are happy to announce that the 21 days Challenge is over and ' +
                                'winners have been selected. You can keep saving and continue to earn interest on your funds.'}
                        />
                    </div>
                </header>

            </div>
        </div>
    );
};

Challenge.propTypes = {};

export default Challenge;