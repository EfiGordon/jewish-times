export const checkIfStringInEnglish = (str) => {
    var english = /^[A-Za-z0-9]*$/;
    return english.test(str);
}

/**
 * @param {string} pageTitle e.g AF-Kabul-on-2020-08-11
 * @returns {object} e.g {city: 'AF-Kabul', gm: 08, gd: 11, gy: 2020}
 */
export const extractPageTitleToObject = (pageTitle) => {
    let splited = pageTitle.split('-on-');
    let city = splited[0];
    let splitedDate = splited[1].split('-');
    return {
        city: city,
        gm: splitedDate[1],
        gd: splitedDate[2],
        gy: splitedDate[0]
    }
}

export const getTimeFromTitle = (str) => {
    //Havdalah (50 min): 7:34pm
    const splited = str.split(':');
    return splited.slice(1).join(':').trim();

}

export const getFlagPathByCountryCode = (countryCode) => {
    return '/images/new-flags/' + countryCode.toLowerCase() + '.svg';
}

export const generateJsonLdScript = (events, location) => {

    const scripts = events.map((event) => {
        return generateEventSchema(event, location);
    })
    return scripts;
}


export const generateEventSchema = (event, location) => {
    let about;
    if (event.memo) {
        about = event.memo;
    } else if (event.link) {
        about = {
            '@type': 'Thing',
            'sameAs': event.link
        }
    } else {
        about = 'Jewish Holiday'
    }
    console.log({
        eventDate: event.date
    })
    return {
        '@context': 'http://schema.org',
        '@type': 'Event',
        'about': about,
        'startDate': event.date,
        'endDate': event.date,
        'location': {
            '@type': 'Place',
            'address': location["city"],
            'name': about + 'At' + location["city"],
            'geo': {
                "@type": "GeoCoordinates",
                "latitude": location["latitude"],
                "longitude": location["longitude"]
            }
        },
        'name': event.title,
        'alternateName': event.hebrew,
        'eventAttendanceMode': 'MixedEventAttendanceMode',

    }
}

