import api from '../http/axios.js'
import axios from "axios";

export default class Services {
    static async login(login, password) {
        return api.post('api/v1/account/login', {
            "login": login, 
            "password": password
        })
    }
    static async userInfo() {
        return api.get('api/v1/account/info')
    }

    static async histograms(inn,limit,tonalityEng,startDate,endDate,onlyMainRole,maxFullness,inBusinessNews,onlyWithRiskFactors,excludeTechNews,excludeAnnouncements,excludeDigests) {
        return api.post('api/v1/objectsearch/histograms', {
            "issueDateInterval": {
              "startDate": startDate,
              "endDate": endDate
            },
            "searchContext": {
              "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                  {
                    "type": "company",
                    "sparkId": null,
                    "entityId": null,
                    "inn": inn,
                    "maxFullness": maxFullness,
                    "inBusinessNews": inBusinessNews
                  }
                ],
                "onlyMainRole": onlyMainRole,
                "tonality": tonalityEng,
                "onlyWithRiskFactors": onlyWithRiskFactors,
                "riskFactors": {
                  "and": [],
                  "or": [],
                  "not": []
                },
                "themes": {
                  "and": [],
                  "or": [],
                  "not": []
                }
              },
              "themesFilter": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "searchArea": {
              "includedSources": [],
              "excludedSources": [],
              "includedSourceGroups": [],
              "excludedSourceGroups": []
            },
            "attributeFilters": {
              "excludeTechNews": excludeTechNews,
              "excludeAnnouncements": excludeAnnouncements,
              "excludeDigests": excludeDigests
            },
            "similarMode": "duplicates",
            "limit": limit,
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
              "totalDocuments",
              "riskFactors"
            ]
          })
    }

    static async objectsearch(inn,limit,tonalityEng,startDate,endDate,onlyMainRole,maxFullness,inBusinessNews,onlyWithRiskFactors,excludeTechNews,excludeAnnouncements,excludeDigests) {
        return api.post('api/v1/objectsearch', {
            "issueDateInterval": {
              "startDate": startDate,
              "endDate": endDate
            },
            "searchContext": {
              "targetSearchEntitiesContext": {
                "targetSearchEntities": [
                  {
                    "type": "company",
                    "sparkId": null,
                    "entityId": null,
                    "inn": inn,
                    "maxFullness": maxFullness,
                    "inBusinessNews": inBusinessNews
                  }
                ],
                "onlyMainRole": onlyMainRole,
                "tonality": tonalityEng,
                "onlyWithRiskFactors": onlyWithRiskFactors,
                "riskFactors": {
                  "and": [],
                  "or": [],
                  "not": []
                },
                "themes": {
                  "and": [],
                  "or": [],
                  "not": []
                }
              },
              "themesFilter": {
                "and": [],
                "or": [],
                "not": []
              }
            },
            "searchArea": {
              "includedSources": [],
              "excludedSources": [],
              "includedSourceGroups": [],
              "excludedSourceGroups": []
            },
            "attributeFilters": {
              "excludeTechNews": excludeTechNews,
              "excludeAnnouncements": excludeAnnouncements,
              "excludeDigests": excludeDigests
            },
            "similarMode": "duplicates",
            "limit": limit,
            "sortType": "sourceInfluence",
            "sortDirectionType": "desc",
            "intervalType": "month",
            "histogramTypes": [
              "totalDocuments",
              "riskFactors"
            ]
          })
    }

    static async documents(batch) {
        return api.post('api/v1/documents', {
            "ids": batch
          })
    }
}
