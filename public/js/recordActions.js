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
        event.preventDefault();  // Prevent form submission
        const newRecord = {};
        headers.forEach(header => {
            newRecord[header] = form.elements[header].value;
        });
        await addRecordToDatabase(newRecord);
        form.reset();
        loadData();  // Ensure this function is defined
    });

    return form;
};

export const addRecordToDatabase = async (record) => {
    try {
        const response = await fetch('http://localhost:3000/api/records', { // Полный URL
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json', // Заголовок указывающий, что отправляем JSON
            },
            body: JSON.stringify(record), // Преобразуем объект записи в строку JSON
        });

        // Проверяем, успешно ли прошел запрос
        if (!response.ok) {
            console.error("Failed to add record");
            // Можно дополнительно вывести статус ошибки
            const errorData = await response.json();
            console.error("Error details:", errorData);
        }
    } catch (error) {
        console.error("Error adding record:", error); // Логируем ошибки
    }
};


// Define the loadData function
const loadData = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/records');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.error('Failed to load data:', error);
    }
};
