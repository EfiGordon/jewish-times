const { isFriday, isSaturday, parseISO } = require('date-fns');
export const addFetchedDataToTable = (events) => {
    const tableData = [];

    events.forEach((event, i) => {
        console.log({
            date: event.date,
            isFriday: isFriday(parseISO(event.date))
        })
        const row = {
            key: i,
            title: {
                title: event.title,
                date: event.date,
            },
            date: event.date,
            tags: [event.category],
            hebDate: event.date,
            hebrew: {
                heb: event.hebrew,
                en: event.title,
                date: event.date
            },
        }

        if (event.memo) {
            row.title.memo = (event.memo);
        }
        if (isFriday(parseISO(event.date))) {
            row.tags.push('כניסת שבת')
        }
        if (isSaturday(parseISO(event.date)) && !event.title.toLowerCase().includes('parashat')) {
            row.tags.push('יציאת שבת')
        }
        tableData.push(row);
    })
    return tableData;
}