import React, {useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import './AuthorizationForm.css';
import validationLogin from './validationLogin'
import { Context } from "../..";

function checkLogin(value, setLogin, setButtonEnable, password) {
  setLogin(value)
  let data = validationLogin(value);
  if (!data.result) {
    document.querySelector('.authorization-form-login-error').textContent = data.error;
    setButtonEnable(false)
  } else {
    document.querySelector('.authorization-form-login-error').textContent = '';
    let resultPassword = validationPassword(password);
    if (resultPassword.result) {
      setButtonEnable(true)
    }
  }
}

function validationPassword(password) {
	let error = {};
	let result = false;
  if (!password.length) {
    error.message = 'Обязательное поле';
	} else {result = true}
	return ({'result': result, 'error':error.message});	
}

function checkPassword (value, setPassword, setButtonEnable, login){
  setPassword(value)
  let data = validationPassword(value);
  if (!data.result) {
    document.querySelector('.authorization-form-password-error').textContent = 'Неправильный пароль';
    setButtonEnable(false)
  } else {
    document.querySelector('.authorization-form-password-error').textContent = '';
    let resultLogin = validationLogin(login);
    if (resultLogin.result) {
      setButtonEnable(true)
    }
  }
}

function AuthorizationForm() {
  const [login, setLogin] = useState('sf_student10');
  const [password, setPassword] = useState('KHKfTXb');
  const [buttonEnable, setButtonEnable] = useState(false);  
  const {store} = useContext(Context);
  const navigate = useNavigate();

  async function submitForm (e, store) {
    e.preventDefault();
    await store.login(login,password);
    if (store.isAuth) {navigate('/')};
  }

  return ( 
    <form className='authorization-form' onSubmit={e => submitForm(e, store)}>
      <label>
          <p className="authorization-form-input-help">Логин или номер телефона:</p>
          <input name='login' type='text' onChange={e => checkLogin(e.target.value, setLogin, setButtonEnable, password)} value={login} className="authorization-form-input"></input>
          <p className='authorization-form-login-error'></p>
      </label>
      <label>
          <p className="authorization-form-input-help">Пароль:</p>
          <input name='password' type='password' onChange={e => checkPassword(e.target.value, setPassword, setButtonEnable, login)} value={password} className="authorization-form-input"></input>
          <p className='authorization-form-password-error'></p>
      </label>
      <button type="submit" className="authorization-button" disabled={!buttonEnable}>Boйти</button>
    </form>
  );
};

export default AuthorizationForm
