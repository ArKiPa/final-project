import { useContext } from "react";
import './SearchResultsPage.css';
import SliderSearchResult from '../SliderSearchResult/SliderSearchResult.js';
import PublishCardsPanel from '../PublishCardsPanel/PublishCardsPanel.js';
import searchImg from './images/searchImg.svg';
import { Context } from "../..";
import {observer} from "mobx-react-lite";

function SearchResultsPage() {
    const {store} = useContext(Context)
    const countResults = localStorage.getItem('countResults');
    return ( 
        <main className='search-result-page-main'>
            <section className='search-result-page-section1'>
                <div>
                    <h3>Ищем. Скоро <br></br> будут результаты</h3>
                    <p className='search-result-page-section1-description'>Поиск может занять некоторое время, <br></br> просим сохранять терпение.</p>
                </div>
                <div className='section1-search-image'>
                    <img src={searchImg} alt='картинка'/>
                </div>
            </section>
            <section className='search-result-page-section2'>
                <h4>Общая сводка</h4>
                {!store.isLoadingHistagram ? 
                    <p className='search-result-page-section2-description'>Найдено <span>{countResults}</span> вариантов</p>
                    :
                    <p className='search-result-page-section2-description'>Поиск вариантов</p>
                }               
                <SliderSearchResult />
            </section>
            <section className='search-result-page-section3'>
                <h4>Список документов</h4>
                <PublishCardsPanel />
            </section>
        </main>
    );
};

export default observer(SearchResultsPage);
