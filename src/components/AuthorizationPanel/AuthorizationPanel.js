import React from "react";
import './AuthorizationPanel.css';
import AuthorizationForm from '../AuthorizationForm/AuthorizationForm.js';
import lock from './images/lock.svg'
import google from './images/google.svg'
import facebook from './images/facebook.svg'
import yandex from './images/yandex.svg'

function AuthorizationPanel() {
  const entry = true;
  const loginClassName = entry ? 'authorization-login-active' : 'authorization-login-passive'
  const registerClassName = entry ? 'authorization-login-passive' : 'authorization-login-active'
  return ( 
    <div className='authorization-panel'>
      <img src={lock} alt='Замок' className="lockImage"/>
      <div>
        <div className='registration-and-login'>
          <div className={loginClassName + ' authorization-panel-login'}>Войти</div>
          <div className={registerClassName + ' authorization-panel-registration'}>Зарегистрироваться</div>
        </div>
        <AuthorizationForm />
        <div className='restore-password'><a href="#">Восстановить пароль</a></div>
        <div className='another-login'>
          <p className='another-login-description'>Войти через:</p>
          <div className='another-login-block'>
            <button className='another-login-button'><img src={google} alt='Войти через гугл'/></button>
            <button className='another-login-button'><img src={facebook} alt='Войти через фейсбук'/></button>
            <button className='another-login-button'><img src={yandex} alt='Войти через яндекс'/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationPanel