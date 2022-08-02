import { FullChoixFormAddress} from './DivChoix.js';
import {
    inputAddressTagName, inputCityTagName,
    inputZipCodeTagName,
    miniInput,
    typageAddressChoix,
    typageCityChoix,
    typageZipCodeChoix
} from "./FormConst.js";
import {ApiGouv} from "./ApiGouv.js";
import {FormAddressInputs} from "./FormInputs.js";

export class FormActions {
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