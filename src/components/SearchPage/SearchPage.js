import React from "react";
import './SearchPage.css';
import SearchForm from '../SearchForm/SearchForm.js';
import seacchImg from './images/seacrhImg.svg'
import folders from './images/folders.svg'
import document from './images/document.svg'

function SearchPage() {

  return ( 
    <main className='search-page-main'>
        <section className="search-page-section">
            <div className='search-page-header-block'>
                <h3 className="search-page-header">Найдите необходимые <br></br> данные в пару кликов.</h3>
                <p className="search-page-annotation">Задайте параметры поиска. <br></br> Чем больше заполните, тем точнее поиск</p>
            </div>
            <img src={document} alt='документ' className="document-image"/>
            <img src={folders} alt='папки' className="folders-image"/>
        </section>
        <section className="search-page-section">
            <SearchForm />
            <div className='search-image'>
              <img src={seacchImg} alt='картинка поиска'/>
            </div>
        </section>
    </main>
  );
};

export default SearchPage;