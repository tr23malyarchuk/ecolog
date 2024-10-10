fetch('/api/tables')
    .then(response => response.json())
    .then(tables => {
        const dataDiv = document.getElementById('data');
        tables.forEach(table => {
            const tableDiv = document.createElement('div');
            tableDiv.className = 'table-container'; // Добавление класса для контейнера
            tableDiv.innerHTML = `<h2>${table}</h2><table border="1" id="${table}"><thead><tr></tr></thead><tbody></tbody></table>`;
            dataDiv.appendChild(tableDiv);
            
            fetch(`/api/data/${table}`)
                .then(response => response.json())
                .then(data => {
                    const tbody = document.querySelector(`#${table} tbody`);
                    if (data.length > 0) {
                        const headers = Object.keys(data[0]);
                        headers.forEach(header => {
                            const th = document.createElement('th');
                            th.textContent = header;
                            tableDiv.querySelector('tr').appendChild(th);
                        });

                        // Логика для адаптивного отображения
                        if (window.innerWidth <= 425 && headers.length > 2) {
                            data.forEach(row => {
                                const tr = document.createElement('tr');
                                const singleColumnTd = document.createElement('td');
                                singleColumnTd.innerHTML = headers.map(header => `${header}: ${row[header]}`).join('<br>');
                                tr.appendChild(singleColumnTd);
                                tbody.appendChild(tr);
                            });
                        } else {
                            data.forEach(row => {
                                const tr = document.createElement('tr');
                                headers.forEach(header => {
                                    const td = document.createElement('td');
                                    td.textContent = row[header];
                                    tr.appendChild(td);
                                });
                                tbody.appendChild(tr);
                            });
                        }
                    }
                })
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                });
        });
    })
    .catch(error => {
        console.error('Ошибка при получении таблиц:', error);
    });
