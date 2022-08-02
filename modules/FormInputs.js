import {
    inputAddressTagName,
    inputAddressRefTagName,
    inputAddressNoTagName,
    inputAddressStreetTagName,
    inputAddressLatTagName,
    inputAddressLonTagName,
    inputZipCodeTagName,
    inputCityTagName,
    inputCityCodeTagName,
    inputTagName,
    inputTagAuto,
    nonAutoDefaultValue,
    FiedsNamesAddressJson, typageAddressChoix, typageZipCodeChoix, typageCityChoix, FieldsNameGeoJson
} from "./FormConst.js";


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
                if (inpid === inputCityTagName) {
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

