import React from 'react';
import './Footer.css';
import logo from '../images/logo.svg';

function Header () {
    return (
        <footer className='footer'>
            <div>
                <div className='footer-logo'>
                    <img src={logo} alt='логотип' />
                </div>
                <div className='footer-text'>
                    <p>г. Москва, Цветной б-р, 40</p>
                    <p>+7 495 771 21 11</p>
                    <p>info@skan.ru</p>
                    <p className='footer-last-string'>Copyright. 2022</p>
                </div>
            </div>
        </footer>
    )
}
export default Header