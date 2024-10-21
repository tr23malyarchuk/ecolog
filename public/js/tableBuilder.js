export const createTableDiv = (table) => {
    const tableDiv = document.createElement('div');
    tableDiv.className = 'table-container';
    tableDiv.innerHTML = `<h2>${table}</h2><table border="1" id="${table}"><thead><tr></tr></thead><tbody></tbody></table>`;
    return tableDiv;
};

export const buildTable = (tbody, data, tableDiv) => {
    if (data.length > 0) {
        const headers = Object.keys(data[0]);

        // Добавление заголовков столбцов
        const thead = tableDiv.querySelector('thead tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            thead.appendChild(th);
        });

        // Заполнение строк таблицы
        data.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    } else {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 100; // Установите значение для охвата всех столбцов
        td.textContent = 'Дані не знайдено'; // Сообщение, если данные отсутствуют
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
};
