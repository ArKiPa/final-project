import React from "react";
import './AuthorizationPage.css';
import AuthorizationPanel from '../AuthorizationPanel/AuthorizationPanel.js';
import authorizationImg from './images/authorizationImg.svg'

function AuthorizationPage() {
  return ( 
    <main className='authorization-page-main'>
        <h3 className="authorization-page-header">Для оформления подписки <br></br> на тариф, необходимо <br></br> авторизоваться.</h3>
        <div>
          <AuthorizationPanel />
        </div>
        <img src={authorizationImg} alt='Картинка авторизации' className="authorization-image"/>
    </main>
  );
};

export default AuthorizationPage