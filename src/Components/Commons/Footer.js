import React from 'react';
import Button from "./Button";
import './footer.css';
import {SignUpLink} from "../../RouteLinks/RouteLinks";
import {redirectTo} from "../../Helpers/Helper";

const Footer = () => {
    return (
        <div className='review-footer d-flex flex-column flex-md-row position-absolute bottom-0'>
            {/*<div className='flex-grow-1'>&nbsp;</div>*/}
            <div className='flex-grow-1 d-flex justify-content-center justify-content-lg-start align-items-center '>
                <Button onClick={()=>redirectTo(SignUpLink)}
                    className={'bg-transparent text-center text-white'}
                    text={'Create Account > '}
                />
            </div>
            <div className='flex-grow-1 text-white d-flex justify-content-center justify-content-lg-end align-items-center '>
                <a href="https://www.facebook.com/BackUpCash/" target='_blank'>
                    <i className={'fa mr-3 fa-facebook'}/>
                </a>
                <a href="https://www.instagram.com/mybackupcash/" target='_blank'>
                    <i className={'fa mr-3 fa-instagram'}/>
                </a>
                <a href="https://twitter.com/mybackupcash" target='_blank'>
                    <i className={'fa mr-3 fa-twitter'}/>
                </a>
                <a href="http://bit.ly/SaveWithBackupCash" target='_blank'>
                    <i className={'fa fa-whatsapp'}/>
                </a>

            </div>
        </div>
    );
};

export default Footer;