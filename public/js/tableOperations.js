import { fetchTables, fetchTableData } from './fetchTables.js';
import { buildTable, createTableDiv } from './tableBuilder.js';
import { createAddForm } from './recordActions.js';

const tableContainer = document.getElementById('tableContainer');

export const loadData = async () => {
    try {
        const tables = await fetchTables();
        tableContainer.innerHTML = '';

        for (const table of tables) {
            const data = await fetchTableData(table);
            const tableDiv = createTableDiv(table);
            tableContainer.appendChild(tableDiv);

            if (data.length > 0) {
                const headers = Object.keys(data[0]);
                const addForm = createAddForm(tableDiv, headers);
                tableDiv.appendChild(addForm);
            }

            buildTable(tableDiv.querySelector('tbody'), data, tableDiv);
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
};
