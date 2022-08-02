import {
    divTagType, FormAddrDefaultTimout,
    inputAddressTagName, inputCityTagName,
    inputTagName, inputZipCodeTagName,
    typageAddressChoix,
    typageCityChoix,
    typageZipCodeChoix
} from "./FormConst.js";
import {FormActions } from "./FormActions.js";

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