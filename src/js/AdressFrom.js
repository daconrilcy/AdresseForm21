
/******************div Adress names ****************************/
export const divAddressName =                'divadress';
export const inputAddressTagName =           'inputaddress';
export const divParentAddressChoixName =     'divaddresschoix';
export const inputAddressRefTagName =        'inputrefaddress';
export const inputAddressNoTagName =         'inputnoaddress';
export const inputAddressStreetTagName =     'inputstreetaddress';
export const inputAddressLatTagName =        'inputlataddress';
export const inputAddressLonTagName =        'inputlonaddress';
export const typageAddressChoix =            'typeaddresschoix';

/****************** div ZipCode names ***************************/
export const divZipCodeName =               'divzipcode';
export const inputZipCodeTagName =          'inputzipcode';
export const divParenttZipCodeChoixName =   'divzipcodechoix';
export const typageZipCodeChoix =           'typezipcodechoix';

/****************** div City names *****************************/
export const divCityName =                  'divcity';
export const inputCityTagName =             'inputcity';
export const divParentCityChoixName =       'divcitychoix';
export const typageCityChoix =              'typecitychoix';
export const inputCityCodeTagName =         'inputcodecity';

/****************** class *************************************/
export const classNameDivChoixParent =      "mb-3 dropdown-menu relative";
export const classNameDivChild =            'myMenu';

/****************** general Tags ******************************/
export const inputTagAuto =                 'data-auto';
export const inputTagName =                 'data-name';
export const divTagType =                   'data-type';

/****************** Fields Json *******************************/
export const FiedsNamesAddressJson =        {
    id:'id',
    no:'no',
    street:'street',
    zipcode:'zipcode',
    codecity:'codecity',
    city:'city',
    lon:'lon',
    lat:'lat',
    short:'short',
    long:'long'
};
export const FieldsNameGeoJson =            {
    zipcode:'zipcode',
    codecity:'codecity',
    city:'city',
    departcode:'departcode',
    departnom:'departnom',
};

/****************** Other *************************************/
export const nonAutoDefaultValue =          "NaN";
export const FormAddrDefaultTimout =        1000;
export const NbMaxAddressReturnJson =       15;
export const NbMaxZipCodeReturnJson =       10;
export const NbMaxCityReturnJson =          25;
export const miniInput = {
    inputAddressTagName : 3,
    inputZipCodeTagName : 3,
    inputCityTagName: 2

}
export const classShow = "show";

export const ApiGouv = class{
    async getCityFromZipBrut(val) {
        let url = 'https://geo.api.gouv.fr/communes?codePostal='+val+'&fields=departement&boost=population&limit='+NbMaxZipCodeReturnJson;
        return fetch(url,{method: 'GET'})
            .then(response=>{return response.json()});

    };
    async getCityFromCityBrute(val){
        let url =  'https://geo.api.gouv.fr/communes?nom='+val+'&fields=departement,codesPostaux&boost=population&limit='+NbMaxCityReturnJson;
        return fetch(url,{method: 'GET'})
            .then(response=>{return response.json()});
    };
    async getAdressBrute (val){
        let url = 'https://api-adresse.data.gouv.fr/search/?q='+val+'&limit='+NbMaxAddressReturnJson;
        return fetch(url,{method:'GET'})
            .then(response => {return response.json()});
    };
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

    };

    async getCityFromZip(zipcode){
        return this.getCityFromZipBrut(zipcode)
            .then(results=>{return this.formatedValuesFromGeo(results,zipcode);});
    };
    async getCityFromCity(city) {
        return this.getCityFromCityBrute(city)
            .then(results=>{
                let newResults = this.checkCityZipCodes(results);
                return this.formatedValuesFromGeo(newResults);
            });
    };
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
    };
    formatedValuesFromGeo(results=[], zipcode ='') {
        let resultsFormatted = [];
        if (results.length > 0) {
            results.forEach(data=>{
                let tmpObj = {};
                if (data.hasOwnProperty('codesPostaux')){
                    tmpObj[ FieldsNameGeoJson.zipcode] =     data['codesPostaux'];
                }else{
                    tmpObj[ FieldsNameGeoJson.zipcode] =          zipcode;
                }
                tmpObj[ FieldsNameGeoJson.city] =             data['nom'];
                tmpObj[ FieldsNameGeoJson.codecity] =         data['code'];
                tmpObj[ FieldsNameGeoJson.departcode] =       data['departement']['code'];
                tmpObj[ FieldsNameGeoJson.departnom] =        data['departement']['nom'];
                tmpObj = this.checkValidityValue(tmpObj);
                resultsFormatted.push(tmpObj);
            });
        }
        return resultsFormatted;
    };
    checkValidityValue(objValue){
        for(let i in objValue) {
            if (objValue.hasOwnProperty(i)){
                if(objValue[i] === undefined || objValue[i] === null){
                    objValue[i] = '';
                }
            }
        }
        return objValue;
    };
    async getDataIdTag(inputValue, idTag){
        switch(idTag){
            case inputAddressTagName:
                return this.getAddressData(inputValue);
            case inputZipCodeTagName:
                return this.getCityFromZip(inputValue);
            case inputCityTagName:
                return this.getCityFromCity(inputValue);
        }
    };
}

const DivManagement = class{
    #div;
    #parent;
    #className;
    #id;
    constructor(id, parentName, className){this.createFrame(id, parentName, className);}

    createFrame(id, parentName, className){
        this.#div = document.createElement('div');
        this.setClass(className);
        this.#div.className=className;
        this.setId(id);
        this.#parent = document.getElementById(parentName);
    }
    attachToParent(parentName ='') {
        if (parentName !== '') {this.#parent = document.getElementById(parentName);}
        if (this.#parent !== null && this.#parent !== undefined){
            this.#parent.appendChild(this.#div);
        }
    }
    getDiv(){return this.#div;}
    setClass(className){
        this.#className = className;
        this.#div.className = className;
    }
    addClass(className)     {
        this.#div.classList.add(className);
        this.#className = this.#div.className;
    }
    removeClass(className)  {
        this.#div.classList.remove(className);
        this.#className = this.#div.className;
    }

    putText(texToAdd)       {this.#div.childNodes[0].textContent = texToAdd;}

    setId(id){
        if(id === null || id === undefined || id === '') {
            id = idAlea();
        }
        this.#id = id;
        this.#div.id = id;
        this.#div.setAttribute('name', id);
    }
    getId(){return this.#div.id;}

    show(){this.addClass(classShow);}
    hide(){this.removeClass(classShow);}
}

const DivChoixParent = class extends DivManagement {
    constructor(id, parentName) {
        super(id, parentName, classNameDivChoixParent);
        this.attachToParent(parentName);
    }
}

const divParentAddressChoix = class extends DivChoixParent {
    constructor(){super(divParentAddressChoixName, divAddressName);}
}

const divParentZipCodeChoix = class extends DivChoixParent {
    constructor(){super(divParenttZipCodeChoixName, divZipCodeName);}
}

const divParentCityChoix = class extends DivChoixParent {
    constructor(){ super(divParentCityChoixName, divCityName)}
}

class DivChoixChild extends DivManagement {
    typeChild;
    jsonStruct = {};
    #datas;
    #textContent;
    constructor(id='',parentName, typeChild, jsonStruct ={}) {
        super(id, parentName, classNameDivChild);
        this.typeChild = typeChild;
        this.jsonStruct = jsonStruct;
        this.#datas = {};
        this.#textContent = '';
        const txtNd = document.createTextNode('');
        this.getDiv().appendChild(txtNd);
        this.getDiv().setAttribute(divTagType, typeChild);
    }

    setDatas(datas){
        this.#datas = datas;
    }
    getDatas(){
        return this.#datas;
    }
    setTextContent(text){
        this.#textContent = text;
    }

    putText(){
        this.getDiv().childNodes[0].textContent = this.#textContent;
    }
    getTextContent(){
        return this.#textContent;
    }

}

class divChoixAdressChild   extends     DivChoixChild {
    constructor(){ super('',divParentAddressChoixName,typageAddressChoix, FiedsNamesAddressJson); }
    setTextFromAddres(address){this.setTextContent(address.long);}
}

class divChoixZipCodeChild  extends     DivChoixChild {
    constructor(){super('',divParenttZipCodeChoixName, typageZipCodeChoix, FieldsNameGeoJson);}
    setTextFromAddres(address){this.setTextContent(address[FieldsNameGeoJson.city]);}
}

class divChoixCityChild     extends     DivChoixChild {
    constructor() {super('',divParentCityChoixName, typageCityChoix, FieldsNameGeoJson);}
    setTextFromAddres(address){
        let TextAffich = address[FieldsNameGeoJson.city] + " ("+address[FieldsNameGeoJson.zipcode]+"), " + address[FieldsNameGeoJson.departnom];
        this.setTextContent(TextAffich);}
}

export const FullChoixFormAddress = class {
    #parent;
    #childs =[];
    #type;
    #selectedChild;
    #nChildAffich;

    constructor(type) {
        this.#type = type;
        this.#childs = [];
        this.createParentChildrenChoix();
    }
    createParentChildrenChoix(){
        switch (this.#type) {
            case typageAddressChoix:
                this.#parent = new divParentAddressChoix();
                this.createEmptyChildrenChoixAddress();
                break;
            case typageZipCodeChoix:
                this.#parent = new divParentZipCodeChoix();
                this.createEmptyChildrenChoixZipCode();
                break;
            case typageCityChoix:
                this.#parent = new divParentCityChoix();
                this.createEmptyChildrenChoixCity();
                break;
        }
    }
    addChilds(child){
        this.#childs.push(child);
    }
    createEmptyChildrenChoixAddress(){
        for(let n = 0; n < NbMaxAddressReturnJson; n++){
            let tmp = new divChoixAdressChild();
            this.addChilds(tmp);
        }
    }
    createEmptyChildrenChoixZipCode(){
        for(let n = 0; n < NbMaxZipCodeReturnJson; n++){
            let tmp = new divChoixZipCodeChild();
            this.addChilds(tmp);
        }
    }
    createEmptyChildrenChoixCity(){
        for(let n = 0; n < NbMaxCityReturnJson; n++){
            let tmp = new divChoixCityChild();
            this.addChilds(tmp);
        }
    }
    fillChilds(address){
        if(address.length > 0){
            let l = address.length;
            if (this.#childs.length < address.length){
                l = this.#childs.length;
            }
            this.#nChildAffich = l;
            for(let n = 0; n < this.#nChildAffich; n++) {
                this.#childs[n].setDatas(address[n]);
                this.#childs[n].setTextFromAddres(address[n]);
            }
            this.affichChilds();
        }
    }
    affichChilds(){
        for(let n = 0; n < this.#nChildAffich; n++) {
            if (this.#childs[n].getTextContent() !==''&& this.#childs[n] !== undefined && this.#childs[n] !== null) {
                this.#childs[n].attachToParent();
                this.#childs[n].putText();
                this.#parent.show();
            }
        }
    }
    hideChilds(){
        this.#parent.hide();
    }
    setSelectedChild(id){
        for(let n = 0; n < this.#childs.length ; n++) {
            if (this.#childs[n].getId() === id){
                this.#selectedChild = this.#childs[n];
            }
        }
    }
    getDatafromId(id){
        this.setSelectedChild(id);
        return this.#selectedChild.getDatas();
    }
}

function idAlea(){
    const phrase = "abcdefghijklmnopqrstuvwxyz1234567890";
    let id = '';
    for (let i = 0; i < 15; i++) {
        let a = Math.floor(Math.random() * phrase.length);
        id += phrase[a];
    }
    return id;
}

export const FormActions = class{
    #all;
    #actual;
    #ag;
    #inputs;
    #lastInputValues;
    fromToTag;

    constructor(){
        this.#ag = new ApiGouv();
        this.#inputs = new FormAddressInputs();
        this.#all = {};
        this.#all[inputAddressTagName] = new FullChoixFormAddress(typageAddressChoix);
        this.#all[inputZipCodeTagName] = new FullChoixFormAddress(typageZipCodeChoix);
        this.#all[inputCityTagName] =    new FullChoixFormAddress(typageCityChoix);

        this.#lastInputValues = {};
        this.#lastInputValues[inputAddressTagName] =    '';
        this.#lastInputValues[inputZipCodeTagName] =    '';
        this.#lastInputValues[inputCityTagName] =       '';

        this.fromToTag = {};
        this.fromToTag[typageAddressChoix] =    inputAddressTagName;
        this.fromToTag[typageZipCodeChoix] =    inputZipCodeTagName;
        this.fromToTag[typageCityChoix] =       inputCityTagName;
    }
    actionsClickInput(idtag){
        let difVal = false;
        this.#actual = this.#all[idtag];
        let val = this.#inputs.getValueIdTag(idtag);
        if (val !== this.#lastInputValues[idtag]) { difVal = true;}
        this.#lastInputValues[idtag] = val;
        if (val.length > miniInput[idtag]) { difVal = true;}{
            if (difVal) {
                this.#ag.getDataIdTag(val, idtag)
                    .then(result => this.#actual.fillChilds(result));
            } else {
                this.#actual.affichChilds();
            }
        }
    }
    actionsClickOnChoix(from, id){
        let idtag = this.fromToTag[from];
        let datas = this.#all[idtag].getDatafromId(id);
        this.#inputs.fillInputsfrom(from,datas);
        this.#all[idtag].hideChilds();
    }
    actionClickOther(){
        for(let a in this.#all){
            if (this.#all.hasOwnProperty(a)) {
                this.#all[a].hideChilds();
            }
        }
    }
    onInput(idtag){
        this.#inputs.setNaInput(idtag);
        this.actionsClickInput(idtag);
    }
}


export function addlisteners() {
    let fA = new FormActions();
    document.addEventListener("click", function (event) {
        let id = event.target.id;
        let from = event.target.getAttribute(divTagType);
        let idTag = event.target.getAttribute(inputTagName);
        if (idTag === inputAddressTagName || idTag === inputCityTagName || idTag === inputZipCodeTagName) {
            fA.actionsClickInput(inputAddressTagName);
        }
        else if (from === typageAddressChoix || from === typageZipCodeChoix || from === typageCityChoix){
            fA.actionsClickOnChoix(from, id);
        }
        else{
            fA.actionClickOther();
        }

    });

    setTimeout(function () {
        document.addEventListener("input", function (event) {
            let lenValue = event.target.value.length;
            let idTag = event.target.getAttribute(inputTagName);
            if (lenValue > 3) {
                fA.onInput(idTag);
            }
        });
    }, FormAddrDefaultTimout);
}

let inputToFill = {};

inputToFill[typageAddressChoix] = FiedsNamesAddressJson;

export const FormAddressInputs = class {

    #inputAddress;
    #inputRefAddress;
    #inputNoAddress;
    #inputStreetAddress;
    #inputLatAddress;
    #inputLonAddress;

    #inputZipCode;

    #inputCityCode;
    #inputCity;

    #fromInput;
    #jsonType;

    constructor() {
        let inputs = document.getElementsByTagName("input");
        if (inputs.length > 0) {
            for (let n = 0; n < inputs.length; n++) {
                let inpid = inputs[n].getAttribute(inputTagName);
                if (inpid === inputAddressTagName) {
                    this.#inputAddress =        inputs[n];
                }
                if (inpid === inputAddressRefTagName) {
                    this.#inputRefAddress = inputs[n];
                }
                if (inpid === inputAddressNoTagName) {
                    this.#inputNoAddress = inputs[n];
                }
                if (inpid === inputAddressStreetTagName) {
                    this.#inputStreetAddress = inputs[n];
                }
                if (inpid === inputAddressLatTagName) {
                    this.#inputLatAddress = inputs[n];
                }
                if (inpid === inputAddressLonTagName) {
                    this.#inputLonAddress = inputs[n];
                }
                if (inpid === inputZipCodeTagName) {
                    this.#inputZipCode = inputs[n];
                }
                if (inpid === inputCityCodeTagName) {
                    this.#inputCityCode = inputs[n];
                }
                if (inpid ===inputCityTagName) {
                    this.#inputCity = inputs[n];
                }
            }
        }
        this.#fromInput = {};
        this.#fromInput[inputAddressTagName] =   this.#inputAddress;
        this.#fromInput[inputZipCodeTagName] =   this.#inputZipCode;
        this.#fromInput[inputCityTagName] =      this.#inputCity;

        this.#jsonType = {};
        this.#jsonType[typageAddressChoix] =    FiedsNamesAddressJson;
        this.#jsonType[typageZipCodeChoix] =    FieldsNameGeoJson;
        this.#jsonType[typageCityChoix] =       FieldsNameGeoJson;
    }
    getValueIdTag(idtag){
        this.validateInputZipCodeValueFrom(idtag);
        return this.#fromInput[idtag].value;
    }
    validateInputZipCodeValueFrom(from){
        if (from === typageZipCodeChoix){
            let val = this.#inputZipCode.value;
            if (val.length === 4 ){
                this.#inputZipCode.value = "0" + val;
            }
        }
    }
    fillAllAddressInputs(address){
        this.#inputAddress.value =          address[FiedsNamesAddressJson.short];
        this.#inputRefAddress.value =       address[FiedsNamesAddressJson.id];
        this.#inputNoAddress.value =        address[FiedsNamesAddressJson.no];
        this.#inputStreetAddress.value =    address[FiedsNamesAddressJson.street];
        this.#inputLatAddress.value =       address[FiedsNamesAddressJson.lat];
        this.#inputLonAddress.value =       address[FiedsNamesAddressJson.lon];
        this.setInputAddressAutoTrue();
    }
    fillZipCode(address, from){
        if (this.condtionToFillZipCode()) {
            let tg = this.#jsonType[from].zipcode;
            this.#inputZipCode.value = address[tg];
            this.setInputZipCodeAutoTrue();
        }
    }
    fillAllCity(address, from){
        if(this.condtionToFillCity()){
            let c = this.#jsonType[from].city;
            let o = this.#jsonType[from].codecity;
            this.#inputCityCode.value = address[o];
            this.#inputCity.value =     address[c];
            this.setInputCityAutoTrue();
        }
    }
    fillInputsfrom(from, datas){
        switch(from){
            case typageAddressChoix:
                this.fillAllAddressInputs(datas);
                this.fillZipCode(datas,from);
                this.fillAllCity(datas, from);
                break;
            case typageZipCodeChoix:
                this.#inputZipCode.value = '';
                this.fillZipCode(datas,from);
                this.fillAllCity(datas, from);
                this.adressNASemi();
                break;
            case typageCityChoix:
                this.#inputCity.value ='';
                this.fillZipCode(datas,from);
                this.fillAllCity(datas, from);
                this.adressNASemi();
                break;
        }
    }
    condtionToFillZipCode(){
        return (this.#inputZipCode.value ==="" || this.#inputZipCode.getAttribute(inputTagAuto) === "true");
    }
    condtionToFillCity(){
        return (this.#inputCity.value ==="" || this.#inputCity.getAttribute(inputTagAuto) === "true");
    }
    zipCodeNA(){
        this.setInputZipCodeAutoFalse();
    }
    cityNA(){
        this.#inputCityCode .value = nonAutoDefaultValue;
        this.setInputCityAutoFalse();
    }
    adressNASemi(){
        this.#inputRefAddress.value =       nonAutoDefaultValue;
        this.setInputAddressAutoFalse();
    }
    addressNA(){
        this.#inputRefAddress.value =       nonAutoDefaultValue;
        this.#inputNoAddress.value =        nonAutoDefaultValue;
        this.#inputStreetAddress.value =    nonAutoDefaultValue;
        this.#inputLatAddress.value =       nonAutoDefaultValue;
        this.#inputLonAddress.value =       nonAutoDefaultValue;
        this.setInputAddressAutoFalse();
    }
    setNaInput(idtag){
        switch (idtag){
            case inputAddressTagName:
                this.addressNA();
                break;
            case inputZipCodeTagName:
                this.zipCodeNA();
                break;
            case inputCityTagName:
                this.cityNA();
                break;
        }
    }
    setInputAddressAuto(value='false'){
        this.#inputAddress.setAttribute(inputTagAuto, value);
    }
    setInputZipCodeAuto(value='false'){
        this.#inputZipCode.setAttribute(inputTagAuto, value);
    }
    setInputCityAuto(value='false'){
        this.#inputCity.setAttribute(inputTagAuto, value);
    }
    setInputAddressAutoFalse(){
        this.setInputAddressAuto('false');
    }
    setInputZipCodeAutoFalse(){
        this.setInputZipCodeAuto('false');
    }
    setInputCityAutoFalse(){
        this.setInputCityAuto('false');
    }
    setInputAddressAutoTrue(){
        this.setInputAddressAuto('true');
    }
    setInputZipCodeAutoTrue(){
        this.setInputZipCodeAuto('true');
    }
    setInputCityAutoTrue(){
        this.setInputCityAuto('true');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    addlisteners();
});