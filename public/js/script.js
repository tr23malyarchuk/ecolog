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

    const tables = document.querySelectorAll('.table-container');

    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            
            const matchesObject = selectedObject ? (cells.length > 0 && cells[0].textContent.includes(selectedObject)) : true; // Первый столбец
            const matchesPollutant = selectedPollutant ? (cells.length > 1 && cells[1].textContent.includes(selectedPollutant)) : true; // Второй столбец
            const matchesYear = selectedYear ? (cells.length > 2 && cells[2].textContent.trim() === selectedYear) : true; // Третий столбец

            row.style.display = (matchesObject && matchesPollutant && matchesYear) ? '' : 'none';
        });
    });
};

const populateTable = (data, tableDiv) => {
    const tbody = tableDiv.querySelector('tbody');
    data.forEach(row => {
        const tr = document.createElement('tr');
        Object.values(row).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });

        // Create Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = "Редагувати";
        editButton.className = "edit-button";

        // Create Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Видалити запис";
        deleteButton.className = "delete-button";

        // Add functionality for editing
        editButton.addEventListener('click', () => {
            console.log("Редактирование записи:", row);
            // Implement your edit functionality here
            // You can display an edit form or modal with the existing data pre-filled
        });

        // Add functionality for deleting
        deleteButton.addEventListener('click', async () => {
            const confirmed = confirm("Ви впевнені, що хочете видалити цей запис?");
            if (confirmed) {
                await deleteRecordFromDatabase(row);
                loadData();
            }
        });

        const actionTd = document.createElement('td');
        actionTd.appendChild(editButton);
        actionTd.appendChild(deleteButton);
        tr.appendChild(actionTd);
        
        tbody.appendChild(tr);
    });
};

const createAddForm = (tableDiv, headers) => {
    const form = document.createElement('form');
    form.className = 'add-record-form';
    
    headers.forEach(header => {
        const input = document.createElement('input');
        input.placeholder = header; // Устанавливаем плейсхолдер в соответствии с заголовком
        input.name = header; // Устанавливаем имя для поля
        form.appendChild(input);
    });

    const addButton = document.createElement('button');
    addButton.textContent = "Добавити запис";
    form.appendChild(addButton);

    addButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const newRecord = {};
        
        // Получаем значения из полей ввода
        headers.forEach(header => {
            newRecord[header] = form.elements[header].value;
        });

        await addRecordToDatabase(newRecord, tableDiv);
        form.reset(); // Сброс формы после добавления
        loadData();
    });

    return form;
};

// Функция добавления записи в базу данных
const addRecordToDatabase = async (record, tableDiv) => {
    console.log("Добавление записи:", record);
    // Здесь нужно будет написать код для добавления записи в базу данных
};

// Функция удаления записи из базы данных
const deleteRecordFromDatabase = async (record) => {
    console.log("Удаление записи:", record);
    // Здесь нужно будет написать код для удаления записи из базы данных
};

const loadData = async () => {
    try {
        const tables = await fetchTables();
        console.log("Available tables:", tables); // Log available tables

        // Clear the container before loading new data
        tableContainer.innerHTML = '';

        for (const table of tables) {
            const data = await fetchTableData(table);
            console.log(`Data for ${table}:`, data); // Log data for each table

            // Create and append the table div
            const tableDiv = createTableDiv(table);
            tableContainer.appendChild(tableDiv);

            // Create toggle button
            const toggleButton = document.createElement('button');
            toggleButton.classList.add('toggle-button');
            toggleButton.textContent = 'Expand';
            tableDiv.prepend(toggleButton); // Add button at the top of the tableDiv

            // Create and append the add form based on headers
            if (data.length > 0) { // Check if data exists to avoid errors
                const headers = Object.keys(data[0]);
                const addForm = createAddForm(tableDiv, headers);
                tableDiv.appendChild(addForm); // Add form under the table
            }

            // Build the table with the fetched data
            buildTable(tableDiv.querySelector('tbody'), data, tableDiv);

            // Add event listener for toggle functionality
            toggleButton.addEventListener('click', () => {
                const tbody = tableDiv.querySelector('tbody');
                const isVisible = tbody.style.display !== 'none';
                tbody.style.display = isVisible ? 'none' : 'table-row-group';
                toggleButton.textContent = isVisible ? 'Expand' : 'Collapse'; // Change button text
            });
        }
    } catch (error) {
        console.error("Error loading data:", error); // Log errors
    }
};

objectNameSelect.addEventListener('change', filterData);
pollutantNameSelect.addEventListener('change', filterData);
yearSelect.addEventListener('change', filterData);

loadData();
