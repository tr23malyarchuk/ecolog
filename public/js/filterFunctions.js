export const filterData = () => {
    const selectedObject = document.getElementById('objectName').value;
    const selectedPollutant = document.getElementById('pollutantName').value;
    const selectedYear = document.getElementById('year').value;

    const tables = document.querySelectorAll('.table-container');
    tables.forEach(table => {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const matchesObject = selectedObject ? (cells[0]?.textContent.includes(selectedObject)) : true;
            const matchesPollutant = selectedPollutant ? (cells[1]?.textContent.includes(selectedPollutant)) : true;
            const matchesYear = selectedYear ? (cells[2]?.textContent.trim() === selectedYear) : true;
            row.style.display = (matchesObject && matchesPollutant && matchesYear) ? '' : 'none';
        });
    });
};
