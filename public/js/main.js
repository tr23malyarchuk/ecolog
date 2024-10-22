import { loadData } from './tableOperations.js';
import { filterData } from './filterFunctions.js';

const objectNameSelect = document.getElementById('objectName');
const pollutantNameSelect = document.getElementById('pollutantName');
const yearSelect = document.getElementById('year');

objectNameSelect.addEventListener('change', filterData);
pollutantNameSelect.addEventListener('change', filterData);
yearSelect.addEventListener('change', filterData);

loadData();
