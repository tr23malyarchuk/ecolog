export const filterTables = () => {
    const filterValue = document.getElementById('filterInput').value.toLowerCase();
    const tables = document.querySelectorAll('.table-container');

    tables.forEach(table => {
        const tableRows = table.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(filterValue) ? '' : 'none';
        });
    });
};
