import {
    divAddressName, divParentAddressChoixName, divCityName, divParentCityChoixName,
    classNameDivChoixParent, classNameDivChild,
    divZipCodeName, divParenttZipCodeChoixName, tagsNamesGeoChild, FieldsNameGeoJson, typageZipCodeChoix,
    tagsNamesAddressChild, FiedsNamesAddressJson, typageAddressChoix, divTagType,
    typageCityChoix,
    NbMaxAddressReturnJson, NbMaxZipCodeReturnJson, NbMaxCityReturnJson
} from './FormConst.js'

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

    show(){this.addClass("show");}
    hide(){this.removeClass("show");}
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
    tagNamesStruct = {};
    #datas;
    #textContent;
    constructor(id='',parentName, typeChild, tagNamesStruct = {}, jsonStruct ={}) {
        super(id, parentName, classNameDivChild);
        this.typeChild = typeChild;
        this.tagNamesStruct = tagNamesStruct;
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
    constructor(){ super('',divParentAddressChoixName,typageAddressChoix, tagsNamesAddressChild, FiedsNamesAddressJson); }
    setTextFromAddres(address){this.setTextContent(address.long);}
}

class divChoixZipCodeChild  extends     DivChoixChild {
    constructor(){super('',divParenttZipCodeChoixName, typageZipCodeChoix, tagsNamesGeoChild, FieldsNameGeoJson);}
    setTextFromAddres(address){this.setTextContent(address[FieldsNameGeoJson.city]);}
}

class divChoixCityChild     extends     DivChoixChild {
    constructor() {super('',divParentCityChoixName, typageCityChoix, tagsNamesGeoChild, FieldsNameGeoJson);}
    setTextFromAddres(address){
        let TextAffich = address[FieldsNameGeoJson.city] + " ("+address[FieldsNameGeoJson.zipcode]+"), " + address[FieldsNameGeoJson.departnom];
        this.setTextContent(TextAffich);}
}

export class FullChoixFormAddress {
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