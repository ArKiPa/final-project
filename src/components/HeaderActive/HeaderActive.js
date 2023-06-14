import React, { useContext } from 'react';
import {observer} from "mobx-react-lite";
import { Link } from 'react-router-dom';
import './HeaderActive.css';
import load from '../images/load.svg';
import icon from './images/icon.jpg';
import menu from './images/menu.svg';
import xSvg from '././images/X.svg';
import logo from '../images/logo.svg';
import { Context } from '../..';

function burderMenuButton() {
    document.querySelector('.open-burger-menu').classList.toggle('burger-menu-visualisation');;
}

function burderMenuLogOut (store) {
    burderMenuButton();
    store.logout();
}

function HeaderActive () {

    const {store} = useContext(Context)
    
    return (
        <>
            {store.isAuth && <div className='header-information-panel'>
                {store.isLoading ?
                <div className='header-load-svg'>
                    <img src={load} alt='загрузка'/>
                </div> 
                :
                <>
                    <p>Использовано компаний</p>
                    <span>{localStorage.getItem('usedCompanyCount')}</span>
                    <p>Лимит по компаниям</p>
                    <span>{localStorage.getItem('companyLimit')}</span>
                </>
                }
            </div>} 
            <div className='header-control-panel'>        
                {store.isAuth ? 
                    <>
                        <div className='header-control-panel-logged'> 
                            <p>Алексей А.</p>
                            <button onClick={() => store.logout()}><Link to="/">Выйти</Link></button>
                        </div>
                        <img src={icon} alt='иконка'/>
                    </>
                    : 
                    <>
                        <span className='header-registration'><Link to="/authorization">Зарегистироваться</Link></span>
                        <div className='control-panel-line'></div>
                        <Link to="/authorization"><button className='header-login-button'>Войти</button></Link>
                    </>} 
            </div>
            <button className='burger-menu' onClick={burderMenuButton}>
                <img src={menu} alt='открыть меню'/>
            </button>
            <div className='open-burger-menu burger-menu-visualisation'>
                <div className='open-burger-menu-header'>
                    <img src={logo} alt='логотип'/>
                    <button className='burger-menu-close' onClick={burderMenuButton}>
                        <img src={xSvg} alt='закрыть меню'/>
                    </button>
                </div>
                <nav className='open-burger-menu-main'>
                    <ul>
                        <Link to="/"><li><p onClick={burderMenuButton}>Главная</p></li></Link>
                        <li><a href='#'>Тарифы</a></li>
                        <li><a href='#'>FAQ</a></li>
                    </ul>
                    <div className='open-burger-menu-entry'>
                        {!store.isAuth ? <>
                            <Link to="/authorization"><p className='open-burger-menu-registration' onClick={burderMenuButton}>Зарегистрироваться</p></Link>
                            <Link to="/authorization"><button className='open-burger-menu-authorization-button' onClick={burderMenuButton}>Войти</button></Link>
                            </> :
                            <button className='open-burger-menu-authorization-button' onClick={() => burderMenuLogOut(store)}><Link to="/">Выйти</Link></button>
                        }
                    </div>
                </nav>
            </div>
        </>
    )
};
export default observer(HeaderActive);