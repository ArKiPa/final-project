import './PublishCardsPanel.css';
import { useContext, useEffect, useState } from "react";
import picture1 from './images/picture1.png';
import parse from 'html-react-parser';
import { Context } from "../..";
import {observer} from "mobx-react-lite";

async function ShowMore (store, setdatePublishArray) {
  const response = await store.documents()
  setdatePublishArray(response)
}



function PublishCards({data, siteName, header, kind, imgSrc, decription, numberWords, url}) {
  useEffect (() => {
    let arrayText = document.getElementsByClassName('publish-cards-description')
    for (let item of arrayText) {
      item.textContent = item.textContent.replace(/</g, "").replace(/>/g, "").replace(/span/g, "").replace(/div/g, "")
    }
}, [])
  return ( 
    <div className='publish-cards' key={header}>  
      <div>
        <p className='publish-cards-data'>{data}<span className='publish-cards-site-name'>{siteName}</span></p>
        <h5 className='publish-cards-header'>{header}</h5>
        {(kind === "isTechNews") && <div className='publish-cards-news'>Технические новости</div>}
        {(kind === "isAnnouncement") && <div className='publish-cards-news'>Анонсы и события</div>}
        {(kind === "isDigest") && <div className='publish-cards-news'>Сводки новостей</div>}
        {(!kind) && <div className='publish-cards-news-false'></div>}
        <img src={imgSrc} alt='новостная картинка'/>
        <div className='publish-cards-description'>{decription}</div>
        <div className='publish-cards-footer'>
            <button className='publish-cards-button'><a href={url}>Читать в источнике</a></button>
            <span className='publish-cards-number-words'>{numberWords} слова</span>
        </div>
      </div>
    </div>
  );
};

function PublishCardsPanel() {
  const {store} = useContext(Context)
  const [datePublishArray, setdatePublishArray] = useState(JSON.parse(localStorage.getItem('datePublish')))
  const [buttonEnable, setButtonEnable] = useState(true);
  if (buttonEnable) {
    datePublishArray.length === 0 && setButtonEnable(false)
    datePublishArray.length % 10 != 0 && setButtonEnable(false)
  }
  let nameSiteArray = JSON.parse(localStorage.getItem('nameSite'));
  let titleArray = JSON.parse(localStorage.getItem('title'));
  let isTechNewsArray = JSON.parse(localStorage.getItem('isTechNews'));
  let isAnnouncementArray = JSON.parse(localStorage.getItem('isAnnouncement'));
  let isDigestArray = JSON.parse(localStorage.getItem('isDigest'));
  let textArray = JSON.parse(localStorage.getItem('textArray'));
  let urlArray = JSON.parse(localStorage.getItem('urlArray'));
  let wordCoutnArray = JSON.parse(localStorage.getItem('wordCoutnArray'));
  let textJS = "";

  return ( 
    <div className='publish-cards-panel'> 
    {(!store.isLoadingDocument && (datePublishArray.length>0)) &&
        datePublishArray.map((item,index) => {
        let kindOfNews = (isTechNewsArray[index]) && "isTechNews";
        if (!kindOfNews) { kindOfNews=(isAnnouncementArray[index]) && "isAnnouncement" };
        if (!kindOfNews) { kindOfNews=(isDigestArray[index]) && "isDigest" };
        textJS = parse(textArray[index]);
          return (<PublishCards data={item} siteName={nameSiteArray[index]} header={titleArray[index]}
            kind={kindOfNews} imgSrc={picture1} decription={textJS} url={urlArray[index]}
            numberWords={wordCoutnArray[index]}/>)
        })}
        <div className='news-download'>
            <button disabled={!buttonEnable} onClick={() => ShowMore(store, setdatePublishArray)}>Показать больше</button>
        </div>  
    </div>
  );
};

export default observer(PublishCardsPanel)
