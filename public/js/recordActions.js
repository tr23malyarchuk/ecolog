export const createAddForm = (tableDiv, headers) => {
    const form = document.createElement('form');
    form.className = 'add-record-form';

    headers.forEach(header => {
        const input = document.createElement('input');
        input.placeholder = header;
        input.name = header;
        form.appendChild(input);
    });

    const addButton = document.createElement('button');
    addButton.textContent = 'Добавити запис';
    form.appendChild(addButton);

    addButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const newRecord = {};
        headers.forEach(header => {
            newRecord[header] = form.elements[header].value;
        });
        await addRecordToDatabase(newRecord);
        form.reset();
        loadData(); // Reload data after adding
    });

    return form;
};

export const addRecordToDatabase = async (record) => {
    try {
        const response = await fetch(`/api/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(record),
        });

        if (!response.ok) {
            console.error("Failed to add record");
        }
    } catch (error) {
        console.error("Error adding record:", error);
    }
};
