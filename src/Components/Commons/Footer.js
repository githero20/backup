import React from 'react';
import Button from "./Button";
import './footer.css';
import {SignUpLink} from "../../RouteLinks/RouteLinks";
import {redirectTo} from "../../Helpers/Helper";

const Footer = () => {
    return (
        <div className='review-footer d-flex position-absolute bottom-0'>
            <div className='flex-grow-1'>&nbsp;</div>
            <div className='flex-grow-1 d-flex justify-content-center align-items-center '>
                <Button onClick={()=>redirectTo(SignUpLink)}
                    className={'bg-transparent text-center text-white'}
                    text={'Create Account > '}
                />
            </div>
            <div className='flex-grow-1 text-white d-flex align-items-center '>
                <a href="http://www.facebook.com" target='_blank'>
                    <i className={'fa mr-3 fa-facebook'}/>
                </a>
                <a href="http://www.whatsapp.com" target='_blank'>
                    <i className={'fa fa-whatsapp'}/>
                </a>

            </div>
        </div>
    );
};

export default Footer;