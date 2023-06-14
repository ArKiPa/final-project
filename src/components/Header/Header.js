import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from './images/logo.svg';
import HeaderActive from '../HeaderActive/HeaderActive.js'

function Header () {
    return (
        <header className='header'>
            <img src={logo} alt='логотип'/>
            <div className='header-right-part'>
                <nav >
                    <ul className='header-menu'>
                        <li><span><Link to="/">Главная</Link></span></li>
                        <li><a href='#'>Тарифы</a></li>
                        <li><a href='#'>FAQ</a></li>
                    </ul>
                </nav>
                <HeaderActive />
            </div>
        </header>
    )
};
export default Header;