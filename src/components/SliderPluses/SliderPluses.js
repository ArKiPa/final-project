import React, {useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import './SliderPluses.css';
import SliderArrow from '../SliderArrow/SliderArrow.js';
import timer from './images/timer.svg';
import loupe from './images/loupe.svg';
import shield from './images/shield.svg';

function Pluses ({src, text}) {
    return (
        <div className='plus-panel'>
            <div className='plus-panel-unit'>
                <img src={src} alt='значок'/>
                <p>{text}</p>
            </div>
        </div>
    )
};

function SliderPluses () {
    let deviceSize = document.body.clientWidth;
    let numberSlidesFirst = 3
    if (deviceSize<=768) {numberSlidesFirst = 1}

    const [numberSlides, setNumberSlides] = useState(numberSlidesFirst);

    window.onresize = function( event ) {
        deviceSize = document.body.clientWidth;
        if (deviceSize>768) {setNumberSlides(3)}
        if (deviceSize<=768) {setNumberSlides(1)}
    };

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: numberSlides,
      slidesToScroll: numberSlides,
      nextArrow: <SliderArrow arrowClass={'plus-panel-next-arrow'}/>,
      prevArrow: <SliderArrow arrowClass={'plus-panel-next-arrow plus-panel-prev-arrow'} />
    };
    return (
        <Slider {...settings}>
            <Pluses src={timer} text={'Высокая и оперативная скорость обработки заявки'} />
            <Pluses src={loupe} text={'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'} />
            <Pluses src={shield} text={'Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству'} />
            <Pluses src={loupe} text={'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос'} />
        </Slider>
    );
}

export default SliderPluses;