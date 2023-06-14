import { makeAutoObservable } from "mobx";
import Servises from '../services/Services.js'

export default class Store {
    isAuth = false;
    isLoading = false;
    isLoadingDocument = false;
    isLoadingHistagram = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }
    
    setLoading(bool) {
        this.isLoading = bool;
    }

    setLoadingHistagram(bool) {
        this.isLoadingHistagram = bool;
    }

    setLoadingDocument(bool) {
        this.isLoadingDocument = bool;
    }

    async login(login, password) {
        try {
            const response = await Servises.login(login, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('expireToken', response.data.expire);
            this.setAuth(true);
            this.userInfo();           
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async logout() {
            localStorage.removeItem('token');
            this.setAuth(false);
    }

    checkAuth() {
        const currentdData = new Date()
        const dataExpireToken = new Date(localStorage.getItem('expireToken'))     
        console.log(dataExpireToken)
        console.log(currentdData)
        if ((dataExpireToken.getTime()-currentdData.getTime())>0) {
            this.setAuth(true);
        }
    }

    async userInfo() {
        try {
            this.setLoading(true);
            const response = await Servises.userInfo();
            console.log(response)
            localStorage.setItem('usedCompanyCount', response.data.eventFiltersInfo.usedCompanyCount);
            localStorage.setItem('companyLimit', response.data.eventFiltersInfo.companyLimit);
            this.setLoading(false)
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async histograms(inn,limit,tonalityEng,startDate,endDate,onlyMainRole,maxFullness,inBusinessNews,onlyWithRiskFactors,excludeTechNews,excludeAnnouncements,excludeDigests) {
        try {
            this.setLoadingHistagram(true)
            const response = await Servises.histograms(inn,limit,tonalityEng,startDate,endDate,onlyMainRole,maxFullness,inBusinessNews,onlyWithRiskFactors,excludeTechNews,excludeAnnouncements,excludeDigests);
            console.log(response);
            const data = response.data.data;
            let dataYMD = 0
            let dataString = ''
            let countResults = 0
            let dateArray = []
            let totalArray = []
            let riskArray = []
            data.forEach((tableString, index) => {
                if (index===0) {
                    tableString.data.forEach((totalUnit) => {
                        dataYMD = new Date(totalUnit.date)
                        dataString=dataYMD.getDate()+'.'+dataYMD.getMonth()+'.'+dataYMD.getFullYear()
                        dateArray.push(String(dataString))
                        countResults = countResults + totalUnit.value
                        totalArray.push(String(totalUnit.value))
                        }
                    )
                }
                if (index===1) {
                    tableString.data.forEach((riskUnit) => {
                        riskArray.push(String(riskUnit.value))
                        }
                    )
                }
            })
            localStorage.setItem('countResults', countResults);
            localStorage.setItem('histogramsDate', JSON.stringify(dateArray));
            localStorage.setItem('histogramsDocuments', JSON.stringify(totalArray));
            localStorage.setItem('histogramsRisk', JSON.stringify(riskArray));
            this.objectsearch(inn,limit,tonalityEng,startDate,endDate,onlyMainRole,maxFullness,inBusinessNews,onlyWithRiskFactors,excludeTechNews,excludeAnnouncements,excludeDigests)
            this.setLoadingHistagram(false)
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async objectsearch(inn,limit,tonalityEng,startDate,endDate,onlyMainRole,maxFullness,inBusinessNews,onlyWithRiskFactors,excludeTechNews,excludeAnnouncements,excludeDigests) {
        try {
            const response = await Servises.objectsearch(inn,limit,tonalityEng,startDate,endDate,onlyMainRole,maxFullness,inBusinessNews,onlyWithRiskFactors,excludeTechNews,excludeAnnouncements,excludeDigests);
            console.log(response)
            let data = response.data.items
            let idArray = []
            data.forEach((id, index) => {
                idArray.push(id.encodedId)
                })
            localStorage.setItem('idArray', JSON.stringify(idArray));

            localStorage.setItem('datePublish', JSON.stringify([]));
            localStorage.setItem('nameSite', JSON.stringify([]));
            localStorage.setItem('title', JSON.stringify([]));
            localStorage.setItem('isTechNews', JSON.stringify([]));
            localStorage.setItem('isAnnouncement', JSON.stringify([]));
            localStorage.setItem('isDigest', JSON.stringify([]));
            localStorage.setItem('textArray', JSON.stringify([]));
            localStorage.setItem('urlArray', JSON.stringify([]));
            localStorage.setItem('wordCoutnArray', JSON.stringify([]));
            if (idArray.length>0) {
                this.documents();
            }
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    async documents() {
        try {
            this.setLoadingDocument(true)
            let saveArray = JSON.parse(localStorage.getItem('idArray'));
            let batch = [];
            if (saveArray.length<10) {
                batch = saveArray
            } else {
                for (let i=0;i<10;i++) {
                    batch.push(saveArray[i]);
                    saveArray.shift();
                }
            }
            localStorage.setItem('idArray', JSON.stringify(saveArray));
            const response = await Servises.documents(batch);
            console.log(response);
            let dataYMD = ''
            let dataString = ''
            let datePublishArray = JSON.parse(localStorage.getItem('datePublish'));
            let nameSiteArray = JSON.parse(localStorage.getItem('nameSite'));
            let titleArray = JSON.parse(localStorage.getItem('title'));
            let isTechNewsArray = JSON.parse(localStorage.getItem('isTechNews'));
            let isAnnouncementArray = JSON.parse(localStorage.getItem('isAnnouncement'));
            let isDigestArray = JSON.parse(localStorage.getItem('isDigest'));
            let textArray = JSON.parse(localStorage.getItem('textArray'));
            let urlArray = JSON.parse(localStorage.getItem('urlArray'));
            let wordCoutnArray = JSON.parse(localStorage.getItem('wordCoutnArray'));
            
            let data = response.data;
            data.map((block) => {
                dataYMD = new Date(block.ok.issueDate);
                dataString=dataYMD.getDate()+'.'+dataYMD.getMonth()+'.'+dataYMD.getFullYear();
                datePublishArray.push(String(dataString));
                nameSiteArray.push(block.ok.source.name);
                titleArray.push(block.ok.title.text);
                isTechNewsArray.push(block.ok.attributes.isTechNews);
                isAnnouncementArray.push(block.ok.attributes.isAnnouncement);
                isDigestArray.push(block.ok.attributes.isDigest);
                textArray.push(block.ok.content.markup);
                urlArray.push(block.ok.url);
                wordCoutnArray.push(String(block.ok.attributes.wordCount));
                });
            localStorage.setItem('datePublish', JSON.stringify(datePublishArray));
            localStorage.setItem('nameSite', JSON.stringify(nameSiteArray));
            localStorage.setItem('title', JSON.stringify(titleArray));
            localStorage.setItem('isTechNews', JSON.stringify(isTechNewsArray));
            localStorage.setItem('isAnnouncement', JSON.stringify(isAnnouncementArray));
            localStorage.setItem('isDigest', JSON.stringify(isDigestArray));
            localStorage.setItem('textArray', JSON.stringify(textArray));
            localStorage.setItem('urlArray', JSON.stringify(urlArray));
            localStorage.setItem('wordCoutnArray', JSON.stringify(wordCoutnArray));
            this.setLoadingDocument(false)
            return (datePublishArray)
            // console.log((datePublishArray))
            // console.log((nameSiteArray))
            // console.log((titleArray))
            // console.log((isTechNewsArray))
            // console.log( (isAnnouncementArray))
            // console.log((isDigestArray))
            // console.log((textArray))
            // console.log((urlArray))
            // console.log((wordCoutnArray))

        } catch (error) {
            console.log(error.response?.data?.message);
        }
    }
}
