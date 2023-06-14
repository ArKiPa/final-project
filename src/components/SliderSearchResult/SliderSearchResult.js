import React, {useState, useContext} from "react";
import {observer} from "mobx-react-lite";
import './SliderSearchResult.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import SliderArrow from '../SliderArrow/SliderArrow.js';
import load from '../images/load.svg';
import { Context } from "../..";


function SearchResultColumn ({period, total, risks, className}) {
    return (
        <div className={className} key={period}>
            <p key={period+"1"}>{period}</p>
            <p key={period+"2"}>{total}</p>
            <p key={period+"3"}>{risks}</p>
        </div>
    )
};

function SliderSearchResult () {
    const {store} = useContext(Context)

    let dateArray =  JSON.parse(localStorage.getItem('histogramsDate'));
    let totalArray = JSON.parse(localStorage.getItem('histogramsDocuments'));
    let riskArray = JSON.parse(localStorage.getItem('histogramsRisk'));
    let countColumn = dateArray.length
    let deviceSize = document.body.clientWidth;
      
    let numberSlidesFirst = countColumn-1
    if (countColumn>8 && deviceSize>960) {numberSlidesFirst = 8}
    if (countColumn<=8 && deviceSize>960) {numberSlidesFirst = countColumn-1}
    if (countColumn>4 && deviceSize<=960 && deviceSize>768) {numberSlidesFirst = 4}
    if (countColumn<=4 && deviceSize<=960 && deviceSize>768) {numberSlidesFirst = countColumn-1}
    if (deviceSize<=768) {numberSlidesFirst = 1}

    const [numberSlides, setNumberSlides] = useState(numberSlidesFirst);

    window.onresize = function( event ) {
        deviceSize = document.body.clientWidth;
        if (countColumn>8 && deviceSize>960) {setNumberSlides(8)}
        if (countColumn<=8 && deviceSize>960) {setNumberSlides(countColumn-1)}
        if (countColumn>4 && deviceSize<=960 && deviceSize>768) {setNumberSlides(4)}
        if (countColumn<=4 && deviceSize<=960 && deviceSize>768) {setNumberSlides(countColumn-1)}
        if (deviceSize<=768) {setNumberSlides(1)}
    };

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: numberSlides,
      slidesToScroll: numberSlides,
      className: 'slider-search-result',
      nextArrow: <SliderArrow arrowClass={'search-result-block-next-arrow'}/>,
      prevArrow: <SliderArrow arrowClass={'search-result-block-next-arrow search-result-block-prev-arrow'} />
    };
    return (
        <div className='search-result-block'>
            <SearchResultColumn period={'Период'} total={'Всего'} risks={'Риски'} className={'slider-header'} key={'header'}/>
            {!store.isLoadingHistagram ? <div>
                <Slider {...settings}>
                    {dateArray.map((item,index) => {
                        return (<SearchResultColumn period={item} total={totalArray[index]} risks={riskArray[index]} className={'search-result-column'} key={'item'}/>)
                    })}
                </Slider>
            </div> 
            : <div className='search-result-load'>
                <div>
                    <img src={load} alt='загрузка'/>
                    <p>Загружаем данные</p>
                </div>
            </div>
            }
        </div>
    );
}

export default observer(SliderSearchResult);
