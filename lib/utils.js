export const checkIfStringInEnglish = (str) => {
    var english = /^[A-Za-z0-9]*$/;
    return english.test(str);
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

    return {
        '@context': 'http://schema.org',
        '@type': 'Event',
        'about': about,
        'startDate': event.date,
        'location': {
            '@type': 'Place',
            'address': location["city"],
            'geo': {
                "@type": "GeoCoordinates",
                "latitude": location["latitude"],
                "longitude": location["longitude"]
            }
        },
        'name': event.title,
        'alternateName': event.hebrew
    }
}

