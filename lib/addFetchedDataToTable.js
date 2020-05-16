export const addFetchedDataToTable = (res) => {

    const events = res.items.filter((item) => {
        return item.category !== 'parashat'
    });

    const tableData = [];
    events.forEach((event, i) => {
        // console.log({
        //     event: event,
        //     path: 'addFetchedDataToTable.js'
        // })
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

        // if (new Date(event.date).getDay() === 5) {
        //     row.tags.push('Shabat');
        //     row.tags.push('שבת');
        // }
        // if (new Date(event.date).getDay() === 6) {
        //     row.tags.push('מוצ"ש');
        // }
        // if (event["yomtov"]) {
        //     row.tags.push('Yom Tov');
        //     row.tags.push('יום טוב');
        // }

        tableData.push(row);
    })
    return tableData;
}