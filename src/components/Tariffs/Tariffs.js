import React from 'react';
import './Tariffs.css';
import lamp from './images/lamp.svg';
import target from './images/target.svg';
import laptop from './images/laptop.svg';
import mark from './images/mark.svg';

function TariffLi ({text}) {
    return (
        <li className='tariff-description'>
            <img src={mark} alt='галочка' className='tariff-description-unit'/>
            <span>{text}</span>
        </li>
    )
}

function Tariff ({currentTariff, name, annotation, color, svg, discountPrice, price, specialPrice, desciption}) {
    const TariffBlock = currentTariff && 'current-tariff-block'
    const TariffButtom = currentTariff ? 'current-tariff-button' : 'usual-button-tariff'
    const TariffButtomText = currentTariff ? 'Перейти в личный кабинет' : 'Подробнее'
    return (
        <div className={TariffBlock + " tariff-block"}>
            <div className={'tariff-'+name +' '+ 'tariff-header'}>
                <div className={color}>
                    <p className='tariff-header-name'>{name}</p>
                    <p className='tariff-header-annotation'>{annotation}</p>
                </div>
                <div className='tariff-header-svg'>
                    <img src={svg} alt='значок'/>
                </div>
            </div>
            <div className='tariff-main'>
                {currentTariff ? <div className='current-tariff'>
                     <p>Текущий тариф</p>
                </div>
                : 
                <div className='current-tariff'></div>}
                <p className='tariff-discount-price'>{discountPrice}</p>
                <span  className='tariff-price'>{price}</span>
                <p className='tariff-special-price'>{specialPrice}</p>
                <p className='tariff-includes'>В тариф входят:</p>
                <ul className='tariff-list'>
                    <TariffLi text={desciption[0]}/>
                    <TariffLi text={desciption[1]}/>
                    <TariffLi text={desciption[2]}/>                 
                </ul>
                <div className='button-tariff-block'>
                    <button className={TariffButtom + " button-tariff"}>{TariffButtomText}</button>
                </div>
                <div></div>
            </div>
        </div>     
    )
}
function Tariffs () {
    return (
    <div className='Tariffs'>
        <Tariff currentTariff={true} name={'Beginner'} annotation={'Для небольшого исследования'} svg={lamp}
        color={'black'} discountPrice={'799 ₽'} price={'1 200 ₽'}  specialPrice={'или 150 ₽/мес. при рассрочке на 24 мес.'}
        desciption={['Безлимитная история запросов', 'Безопасная сделка', 'Поддержка 24/7']}/>
        <Tariff currentTariff={false} name={'Pro'} annotation={'Для HR и фрилансеров'} svg={target}
        color={'black'} discountPrice={'1 299 ₽'} price={'2 600 ₽'}  specialPrice={'или 279 ₽/мес. при рассрочке на 24 мес.'}
        desciption={['Все пункты тарифа Beginner', 'Экспорт истории', 'Рекомендации по приоритетам']}/>
        <Tariff currentTariff={false} name={'Business'} annotation={'Для корпоративных клиентов'} svg={laptop}
        color={'white'} discountPrice={'2 379 ₽'} price={'3 700 ₽'}  specialPrice={''}
        desciption={['Все пункты тарифа Pro', 'Безлимитное количество запросов', 'Приоритетная поддержка']}/>
     </div>
     )
    }
export default Tariffs;