document.addEventListener('DOMContentLoaded', function(){
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    let filterInputs;
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');

            cells.forEach(function(cell) {
                if(this.checked) {
                    cell.classList.add('selected');
                } else {
                    cell.classList.remove('selected');
                }
            }, this);
        });
    });
});

function sortTable(columnIndex) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const isAscending = headers[columnIndex].classList.contains('asc');

    rows.sort((rowA, rowB) => {
        const cellA = rowA.querySelectorAll('td')[columnIndex].textContent.trim();
        const cellB = rowB.querySelectorAll('td')[columnIndex].textContent.trim();

        if (isNan(cellA) || isNaN(cellB)) {
            return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
        } else {
            return isAscending ? cellA - cellB : cellB - cellA;
        }
    });

    table.querySelector('tbody').innerHTML = '';
    rows.forEach(row => table.querySelector('tbody').appendChild('row'));

    headers.forEach(header => header.classList.remove('asc', 'desc'));
    headers[columnIndex].classList.add(isAscending ? 'desc' : 'asc');

    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            sortTable(index);
        });
    });
}

function addCheckBoxes() {
    const table = document.querySelector('table');
    if (!table) return;

    const headerRow = table.querySelector('thead tr');
    if (headerRow) {
        const th = document.createElement('th');
        th.textContent = 'Select';
        headerRow.insertBefore(th, headerRow.firstChild);

    }

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const td = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        td.appendChild(checkbox);
        row.insertBefore(td, row.firstChild);
    } );
}


addCheckBoxes();

function addFilterRow() {
    const headerRow = table.querySelector('thead tr');
    const filterRow = document.createElement('tr');
    filterRow.classList.add('filter-row');

    headers.forEach(() => {
        const filterCell = document.createElement('th');
        const filterInput = document.createElement('input');
        filterInput.type ='text';
        filterCell.appendChild(filterInput);
        filterRow.appendChild(filterCell);
    });

    table.querySelector('thead').appendChild(filterRow);
    filterInputs = filterRow.querySelectorAll('input');
    
    filterInputs.forEach((input, index) => {
        input.addEventListener('input', () => filterTable (index, input.value))
});

function filterTable(columnIndex, filterValue) {
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach(row => {
        const cell = row.querySelectorAll('td')[columnIndex];
        if (cell) {
            const cellText = cell.textContent.toLowerCase();
            const filterText = filterValue.toLowerCase();
            if (cellText.includes(filterText)) {
                row.style.display = '';

            } else {
                row.style.display = 'none'
            }
        }
    }

    )
}
}