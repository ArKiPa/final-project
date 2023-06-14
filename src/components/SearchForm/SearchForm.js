import React, {useContext, useState, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import validateInn from './validationInn'
import validationNumberDocument from './validationNumberDocument'
import './SearchForm.css';
import { Context } from "../..";
import { Link } from "react-router-dom";

function SearchCheackbox({name, text, state, setState}) { 
  return (
    <>
    <label className='form-search-checkbox-block'>
      <input className='form-search-checkbox' name={name} type='checkbox' checked={state} onChange={setState}></input>
      <span></span>
      <span className='form-search-checkbox-description'>{text}</span>
    </label>
    </>
  )
}

function SearchForm() {
  const [inn, setInn] = useState('7710137066');
  const [limit, setLimit] = useState('100');
  const [tonality, setTonality] = useState('Любая');
  const [startDate, setStartDate] = useState("2019-01-01");  
  const [endDate, setEndDate] = useState("2022-08-31");
  const [buttonEnable, setButtonEnable] = useState(false);
  const [onlyMainRole, setOnlyMainRole] = useState(false);
  const [maxFullness, setMaxFullness] = useState(true);
  const [inBusinessNews, setInBusinessNews] = useState(true);
  const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
  const [excludeTechNews, setExcludeTechNews] = useState(true);
  const [excludeAnnouncements, setExcludeAnnouncements] = useState(true);
  const [excludeDigests, setExcludeDigests] = useState(true);

  const {store} = useContext(Context);
  const navigate = useNavigate();

  let tonalityEng = ''
  if (tonality == "Любая") {tonalityEng = 'any'}
  if (tonality == "Негативная") {tonalityEng = 'negative'}
  if (tonality == "Позитивная") {tonalityEng = 'positive'}

  function checkInn (testInn){
    setInn(testInn);
    let data = validateInn(testInn, {});
    if (!data.result) {
      document.querySelector('.form-search-input-inn-help').innerText = data.error;
      setButtonEnable(false)
    }
    if (data.result) {
      document.querySelector('.form-search-input-inn-help').innerText = '';
      let resultNumberDocument = validationNumberDocument(limit);
      let resultDate = checkDate(startDate, endDate);
      if (resultDate && resultNumberDocument.result) {
        setButtonEnable(true)
      }
    } 
  }

  function checkNumberDocument (testNumberDocument){
    setLimit(testNumberDocument);
    let data = validationNumberDocument(testNumberDocument);
    if (!data.result) {
      document.querySelector('.form-search-input-number-document-help').innerText = data.error;
      setButtonEnable(false)
    }
    if (data.result) {
      document.querySelector('.form-search-input-number-document-help').innerText = ''
      let resultDate = checkDate(startDate, endDate);
      let resultInn = validateInn(inn, {});
      if (resultInn.result  && resultDate) {
        setButtonEnable(true)
      }
    }
  }

  function checkDate (testStartDate, testEndDate){
    setEndDate(testEndDate);
    setStartDate(testStartDate);
    if (testStartDate>=testEndDate) {
      document.querySelector('.form-search-input-date-help').innerText = 'Введите корректные данные'
      setButtonEnable(false)
    } else {
      document.querySelector('.form-search-input-date-help').innerText = ''
      let resultNumberDocument = validationNumberDocument(limit);
      let resultInn = validateInn(inn, {});
      if (resultInn.result  && resultNumberDocument.result) {
        setButtonEnable(true)
      }
      return (true)
    }
  }
  return ( 
    <form className='form-search' onSubmit={async (e) => { 
      e.preventDefault();
      store.histograms(inn,limit,tonalityEng,startDate,endDate,onlyMainRole,maxFullness,inBusinessNews,onlyWithRiskFactors,excludeTechNews,excludeAnnouncements,excludeDigests)
      navigate('/search-results')
    }
    }>
      <div>
          <div className='form-search-input-panel'>   
            <label>
              <p className='form-search-input-help'>ИНН компании<span className="form-search-required">*</span></p>
              <input name='inn' placeholder='10 цифр' className='form-search-input' value={inn} onChange={e => checkInn(e.target.value)}></input>
              <p className='form-search-input-inn-help'></p>
            </label>
            <label>
              <p className='form-search-input-help'>Тональность</p>
              <div className='form-search-select-block'>
                <label>
                <select className='form-search-select' name='tonality' value={tonality} onChange={(e) => setTonality(e.target.value)}>
                  <option name='любая'>Любая</option>
                  <option name='негативная'>Негативная</option>
                  <option name='позитивная'>Позитивная</option>
                </select>
                </label>
              </div>
            </label>
            <label>
              <p className='form-search-input-help'>Количество документов в выдаче<span>*</span></p>
              <input name='limit' placeholder='От 1 до 1000' className='form-search-input' value={limit} onChange={e => checkNumberDocument(e.target.value)}></input>
              <p className='form-search-input-number-document-help'></p>
            </label>
            <label>
              <p className='form-search-input-help'>Диапазон поиска<span>*</span></p>
              <div className='form-search-data'>
                <div className='form-search-data-element'>
                  <input type='date' className='form-search-data-input' name='startdate' placeholder='Дата начала' value={startDate} onChange={e =>checkDate(e.target.value, endDate)}></input>
                </div>
                <div className='form-search-data-element'>
                  <input type='date' className='form-search-data-input' name='endDate' placeholder='Дата конца' value={endDate} onChange={e => checkDate(startDate, e.target.value)}></input>
                  <p className='form-search-input-date-help'></p>
                </div>
              </div>
            </label>
          </div>  
          <div className='form-search-checkbox-panel'>
            <div>
              <SearchCheackbox name={'onlyMainRole'} text={'Признак максимальной полноты'} state={onlyMainRole} setState={() => setOnlyMainRole(!onlyMainRole)}/>
              <SearchCheackbox name={'inBusinessNews'} text={'Упоминания в бизнес-контексте'} state={inBusinessNews} setState={() => setInBusinessNews(!inBusinessNews)}/>
              <SearchCheackbox name={'maxFullness'} text={'Главная роль в публикации'} state={maxFullness} setState={() => setMaxFullness(!maxFullness)}/>
              <SearchCheackbox name={'OnlyWithRiskFactors'} text={'Публикации только с риск-факторами'} state={onlyWithRiskFactors} setState={() => setOnlyWithRiskFactors(!onlyWithRiskFactors)}/>
              <SearchCheackbox name={'excludeTechNews2'} text={'Включать технические новости рынков'} state={excludeTechNews} setState={() => setExcludeTechNews(!excludeTechNews)}/>
              <SearchCheackbox name={'excludeAnnouncements2'} text={'Включать анонсы и календари'} state={excludeAnnouncements} setState={() => setExcludeAnnouncements(!excludeAnnouncements)}/>
              <SearchCheackbox name={'excludeDigests2'} text={'Включать сводки новостей'} state={excludeDigests} setState={() => setExcludeDigests(!excludeDigests)}/>          
            </div>
            <div className='form-search-sending'>
              <button type="submit" disabled={!buttonEnable}>Поиск</button>
              <p>* Обязательные к заполнению поля</p>
            </div>
          </div>
        </div>
    </form>
);
};

export default SearchForm;