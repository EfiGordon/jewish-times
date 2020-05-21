export const addFetchedDataToTable = (events) => {
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