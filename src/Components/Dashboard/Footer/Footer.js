import React, {Fragment} from 'react';

const Footer = () => {
    return (
        <Fragment>
            <div className='d-flex flex-column px-md-5 px-2 pb-2 flex-md-row justify-content-md-between'>
                <div className="footer-address mb-3 mb-0">
                    <h5>Backup Cash | A product of SFS Capital</h5>
                    <p className='faded-black'>
                        <i className='fa fa-map-marker '/> &nbsp; Plot 287 Ajose Adeogun
                        Street, Victoria Island 23401,
                        Lagos</p>
                    <p className='faded-black'>
                        <i className='fa fa-phone '/> &nbsp; +234 814 946 0946 , +234 908 776 6679
                    </p>
                    <p className='faded-black'>
                        <i className='fa fa-envelope '/>&nbsp; Enquiries@SFSBackupcash.com
                    </p>
                </div>
                <div className="footer-connect text-md-right">
                    <div className="social-connect mb-1 mb-md-0 text-md-right">
                        <a href="https://api.whatsapp.com/send?phone=18883699915" className='a-whatsapp'
                           target='_blank'><i className='fa fa-whatsapp fa-2x  mr-2'/></a>
                        <a href="https://www.facebook.com/BackUpCash/" className='a-facebook' target='_blank'>
                            <i className='fa fa-facebook fa-2x mr-2'/>
                        </a>
                        <a href="https://twitter.com/mybackupcash" className='a-twitter' target='_blank'>
                            <i className='fa fa-twitter fa-2x  mr-2'/>
                        </a>
                        <a href="https://www.instagram.com/mybackupcash/" className='a-instagram' target='_blank'>
                            <i className='fa fa-instagram fa-2x'/>
                        </a>
                    </div>
                    <p className=' faded-black'>All right reserved</p>
                    <p className=' faded-black'>Terms of use and policy</p>
                </div>
            </div>
        </Fragment>
    );
};

Footer.propTypes = {};

export default Footer;