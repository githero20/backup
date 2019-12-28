import React, {useState} from 'react';
import Navigation from "../Home/Navigation";
import Heading from "../../Components/Commons/Heading";
import Button from "../../Components/Commons/Button";
import Footer from "../../Components/Commons/Footer";
import './yearlyreview.css';
import LoginModal from "../../Components/Commons/LoginModal";
import {Form} from "react-bootstrap";
import LoginForm from "../../Components/Auth/LoginForm/LoginForm";


const YearlyReview = () => {

    const [modalShow, setModalShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted');
    };


    return (
        <div className='review-header mh-100 pt-lg-3 px-2 pt-2 px-lg-3 mh-lg-100-vh position-relative text-center'>
            <Navigation type={'review'}/>
            <Heading
                // text={['See your performance', <br/>, 'in 2019']}
                text={['Have a look at',<br/> ,'your Backup Cash ',<br/>,'report in 2019!']}
                     className={'text-center mt-5 mt-lg-0 mb-5 mb-lg-0 py-lg-5  text-white'}
            />
            <Button onClick={() => setModalShow(true)} className={'text-center'} text={'Log in'}/>
            <LoginModal onHide={() => setModalShow(false)} className={'review-modal br-3'} show={modalShow}>
                <LoginForm reviewForm />
            </LoginModal>
            <Footer/>
        </div>
    );
};

export default YearlyReview;