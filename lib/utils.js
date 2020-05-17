export const checkIfStringInEnglish = (str) => {
    var english = /^[A-Za-z0-9]*$/;
    return english.test(str);
}

export const getTimeFromTitle = (str) => {
    //Havdalah (50 min): 7:34pm
    const splited = str.split(':');
    return splited.slice(1).join(':').trim();

}

export const getFlagPathByCountryName = (countryName) => {
    return '/images/country-flags/' + countryName.split(' ').join('-') + '.svg';
}

export const getFlagPathByCountryCode = (countryCode) => {
    return '/images/new-flags/' + countryCode + '.svg';
}
