import { fetchTables, fetchTableData } from './fetchTables.js';
import { createTableDiv, buildTable } from './tableBuilder.js';

const objectNameSelect = document.getElementById('objectName');
const pollutantNameSelect = document.getElementById('pollutantName');
const yearSelect = document.getElementById('year');
const tableContainer = document.getElementById('tableContainer');

const filterData = () => {
    const selectedObject = objectNameSelect.value;
    const selectedPollutant = pollutantNameSelect.value;
    const selectedYear = yearSelect.value;

    const tables = document.querySelectorAll('.table-container'); // Находим все контейнеры таблиц

    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr'); // Получаем все строки в текущей таблице

        rows.forEach(row => {
            const cells = row.querySelectorAll('td'); // Получаем все ячейки строки
            
            // Проверяем, есть ли достаточное количество ячеек
            const matchesObject = selectedObject ? (cells.length > 0 && cells[0].textContent.includes(selectedObject)) : true; // Первый столбец
            const matchesPollutant = selectedPollutant ? (cells.length > 1 && cells[1].textContent.includes(selectedPollutant)) : true; // Второй столбец
            const matchesYear = selectedYear ? (cells.length > 2 && cells[2].textContent.trim() === selectedYear) : true; // Третий столбец (сравнение на строгое равенство)

            // Условие для отображения строки
            row.style.display = (matchesObject && matchesPollutant && matchesYear) ? '' : 'none';
        });
    });
};

const populateTable = (data, tableDiv) => {
    const tbody = tableDiv.querySelector('tbody'); // Обратите внимание, что теперь мы передаём tableDiv
    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
};

const loadData = async () => {
    const tables = await fetchTables();
    for (const table of tables) {
        const data = await fetchTableData(table);
        const tableDiv = createTableDiv(table);
        tableContainer.appendChild(tableDiv);
        buildTable(tableDiv.querySelector('tbody'), data, tableDiv); // Передаем tbody и tableDiv
    }
};

objectNameSelect.addEventListener('change', filterData);
pollutantNameSelect.addEventListener('change', filterData);
yearSelect.addEventListener('change', filterData);

loadData();
