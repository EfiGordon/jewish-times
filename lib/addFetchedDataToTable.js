export const addFetchedDataToTable = (res) => {

    const events = res.items.filter((item) => {
        return item.category !== 'parashat'
    });

    const tableData = [];
    events.forEach((event, i) => {
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
        tableData.push(row);
    })
    return tableData;
}