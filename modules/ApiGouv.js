import {
    FieldsNameGeoJson, inputAddressTagName, inputCityTagName, inputZipCodeTagName,
    NbMaxAddressReturnJson,
    NbMaxCityReturnJson,
    NbMaxZipCodeReturnJson,
    typageAddressChoix,
    typageCityChoix,
    typageZipCodeChoix
} from './FormConst.js'

export class ApiGouv{

    async getCityFromZipBrut(val) {
        let url = 'https://geo.api.gouv.fr/communes?codePostal='+val+'&fields=departement&boost=population&limit='+NbMaxZipCodeReturnJson;
        return fetch(url,{method: 'GET'})
            .then(response=>{return response.json()});

    }
    async getCityFromCityBrute(val){
        let url =  'https://geo.api.gouv.fr/communes?nom='+val+'&fields=departement,codesPostaux&boost=population&limit='+NbMaxCityReturnJson;
        return fetch(url,{method: 'GET'})
            .then(response=>{return response.json()});
    }

    async getAdressBrute (val){

        let url = 'https://api-adresse.data.gouv.fr/search/?q='+val+'&limit='+NbMaxAddressReturnJson;

        return fetch(url,{method:'GET'})
            .then(response => {return response.json()});

    }

    async getAddressData(adress) {
        return this.getAdressBrute(adress)
            .then(results =>{
                let resultsFormatted = [];
                let datas = results['features'];
                if (datas.length > 0) {
                    datas.forEach(data =>{
                        let tmpObj = {};
                        tmpObj.id=               data['properties']['id'];
                        tmpObj.no=               data['properties']['housenumber'];
                        tmpObj.street=           data['properties']['street'];
                        tmpObj.zipcode=          data['properties']['postcode'];
                        tmpObj.codecity=         data['properties']['citycode'];
                        tmpObj.city=             data['properties']['city'];
                        tmpObj.lat=              data['geometry']['coordinates'][1];
                        tmpObj.lon=              data['geometry']['coordinates'][0];
                        tmpObj.short=            data['properties']['name'];
                        tmpObj.long=             data['properties']['label'];
                        tmpObj = this.checkValidityValue(tmpObj);
                        resultsFormatted.push(tmpObj);
                    });
                }
                return resultsFormatted;


            });

    }

    async getCityFromZip(zipcode){
        return this.getCityFromZipBrut(zipcode)
            .then(results=>{return this.formatedValuesFromGeo(results,zipcode);});
    }



    async getCityFromCity(city) {
        return this.getCityFromCityBrute(city)
            .then(results=>{
                let newResults = this.checkCityZipCodes(results);

                return this.formatedValuesFromGeo(newResults);
            });
    }

    checkCityZipCodes(results){
        let rslt = [];
        if (results.length > 0) {
            results.forEach(result=>{
                if (result.hasOwnProperty('codesPostaux')) {
                    for (let cp in result['codesPostaux']){
                        if (result['codesPostaux'].hasOwnProperty(cp)) {
                            let tmp = {};
                            for (let r in result) {
                                if (result.hasOwnProperty(r)){
                                    tmp[r] = result[r];
                                }
                            }
                            tmp["codesPostaux"] = result['codesPostaux'][cp];
                            rslt.push(tmp);
                        }
                    }
                }
            });
        }
        return rslt;
    }

    formatedValuesFromGeo(results =[], zipcode ='') {
        let resultsFormatted = [];
        if (results.length > 0) {
            results.forEach(data=>{
                let tmpObj = {};
                if (data.hasOwnProperty('codesPostaux')){
                    tmpObj[FieldsNameGeoJson.zipcode] =     data['codesPostaux'];
                }else{
                    tmpObj[FieldsNameGeoJson.zipcode] =          zipcode;
                }
                tmpObj[FieldsNameGeoJson.city] =             data['nom'];
                tmpObj[FieldsNameGeoJson.codecity] =         data['code'];
                tmpObj[FieldsNameGeoJson.departcode] =       data['departement']['code'];
                tmpObj[FieldsNameGeoJson.departnom] =        data['departement']['nom'];
                tmpObj = this.checkValidityValue(tmpObj);
                resultsFormatted.push(tmpObj);
            });
        }
    return resultsFormatted;
    }

    checkValidityValue(objValue){
        for(let i in objValue) {
            if (objValue.hasOwnProperty(i)){
                if(objValue[i] === undefined || objValue[i] === null){
                    objValue[i] = '';
                }
            }
        }
        return objValue;
    }


    async getDataFrom(inputValue, from){
        switch(from){
            case typageAddressChoix:
                return this.getAddressData(inputValue);
            case typageZipCodeChoix:
                return this.getCityFromZip(inputValue);
            case typageCityChoix:
                return this.getCityFromCity(inputValue);
        }
    }

    async getDataIdTag(inputValue, idTag){
        switch(idTag){
            case inputAddressTagName:
                return this.getAddressData(inputValue);
            case inputZipCodeTagName:
                return this.getCityFromZip(inputValue);
            case inputCityTagName:
                return this.getCityFromCity(inputValue);
        }
    }

}