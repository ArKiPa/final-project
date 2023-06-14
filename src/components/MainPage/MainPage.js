import { Link } from 'react-router-dom';
import { Context } from "../..";
import React, {useContext, useState} from 'react';
import './MainPage.css';
import SliderPluses from '../SliderPluses/SliderPluses.js';
import Tariffs from '../Tariffs/Tariffs.js';
import publicationSearchImg from './images/publication-search.png';
import advantages from './images/advantages.svg';

function ButtonRequest() {
  const {store} = useContext(Context);
  const [buttonState, setButtonState] = useState(false);
  setTimeout(() => setButtonState(true), 100)
  if (buttonState && store.isAuth) {
  return (
  <Link to="/search"><button className='button-request'>Запросить данные</button></Link>
  )}
}

function MainPage() {
  const {store} = useContext(Context);
  return ( 
    <main className='begin-page-main'>
      <section className='begin-page-section1'>
        <div>
          <h1>сервис по поиску <br></br> публикаций <br></br> о компании <br></br> по его ИНН</h1>
          <p className='begin-page-section1-description'>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту</p>
          <ButtonRequest />
        </div> 
        <div className='publication-searc-image'>
          <img src={publicationSearchImg} alt='Поиск публикаций'/>
        </div>
      </section>
      <section className='begin-page-section2'>
        <h2>Почему именно мы</h2>
        <SliderPluses />
        <div className='advantages-image' >
          <img src={advantages} alt='Поиск публикаций'/>
        </div>
      </section>
      <section className='mainPage-section3'>
        <h2>наши тарифы</h2>
        <Tariffs/>
      </section>
    </main>
);
};

export default MainPage;
