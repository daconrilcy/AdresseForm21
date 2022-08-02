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

/****************** Childs Tags *******************************/
export const tagsNamesAddressChild =        {
        id: 'data-id',
        no: 'data-no',
        street: 'data-street',
        zipcode: 'data-zipcode',
        codecity:'data-codecity',
        city:'data-city',
        lon:'data-lon',
        lat:'data-lat',
        short:'data-short',
        long:'text'
    };

export const tagsNamesGeoChild =            {
    zipcode:'data-zipcode',
    codecity:'data-codecity',
    city:'data-city',
    departcode:'data-departcode',
    departnom: 'data-departnom',
};

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