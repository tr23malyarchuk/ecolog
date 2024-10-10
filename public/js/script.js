import { fetchTables, fetchTableData } from './fetchTables.js';
import { createTableDiv, buildTable } from './tableBuilder.js';
import { filterTables } from './filterTables.js';

document.getElementById('filterInput').addEventListener('input', filterTables);

fetchTables().then(tables => {
    const dataDiv = document.getElementById('data');
    tables.forEach(table => {
        const tableDiv = createTableDiv(table);
        dataDiv.appendChild(tableDiv);

        fetchTableData(table).then(data => {
            const tbody = document.querySelector(`#${table} tbody`);
            buildTable(tbody, data, tableDiv);
        });
    });
});
