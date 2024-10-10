export const fetchTables = () => {
    return fetch('/api/tables')
        .then(response => response.json())
        .catch(error => console.error('Error while getting the tables:', error));
};

export const fetchTableData = (table) => {
    return fetch(`/api/data/${table}`)
        .then(response => response.json())
        .catch(error => console.error('Error while receiving the data:', error));
};
