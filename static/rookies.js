document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    const rows = table.querySelectorAll('tbody tr');
    let filterInputs;

    // Add Checkboxes functionality (working correctly)
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
        });
    }

    addCheckBoxes(); // Call addCheckBoxes before adding listeners

    // Checkbox functionality (working correctly)
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            const row = this.closest('tr');
            const cells = row.querySelectorAll('td');

            cells.forEach(function(cell) {
                if (this.checked) {
                    cell.classList.add('selected');
                } else {
                    cell.classList.remove('selected');
                }
            }, this);
        });
    });

    // Sort Table functionality (corrected)
    function sortTable(columnIndex) {
        const rows = Array.from(table.querySelectorAll('tbody tr'));
        const isAscending = headers[columnIndex].classList.contains('asc');

        rows.sort((rowA, rowB) => {
            const cellA = rowA.querySelectorAll('td')[columnIndex].textContent.trim();
            const cellB = rowB.querySelectorAll('td')[columnIndex].textContent.trim();

            if (isNaN(cellA) || isNaN(cellB)) {
                return isAscending ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
            } else {
                return isAscending ? cellA - cellB : cellB - cellA;
            }
        });

        table.querySelector('tbody').innerHTML = '';
        rows.forEach(row => table.querySelector('tbody').appendChild(row));

        headers.forEach(header => header.classList.remove('asc', 'desc'));
        headers[columnIndex].classList.add(isAscending ? 'desc' : 'asc');
    }

    // Add event listeners for sorting (moved to the correct place)
    headers.forEach((header, index) => {
        header.addEventListener('click', () => {
            sortTable(index);
        });
    });

    function addFormatting() {
        for (let i = 0; i < rows.length; i++) { 
            const cells = rows[i].getElementsByTagName('td');
            
            // Format for producer group
            const categoryCell = cells[7]; // assuming the producer group is in the 7th column (index 6)
            if (categoryCell.textContent.trim().toLowerCase() === "elite producer") {
                categoryCell.classList.add('elite');
            } else if (categoryCell.textContent.trim().toLowerCase() === "weekly starter"){
                categoryCell.classList.add('positive');
            } else if (categoryCell.textContent.trim().toLowerCase() === "flex play") {
                categoryCell.classList.add('neutral');
            } else if (categoryCell.textContent.trim().toLowerCase() === "benchwarmer") {
                categoryCell.classList.add('negative');
            }
            
             const positionRanking = cells[9];
            if (positionRanking) {
                const positionRankingCell = parseInt(positionRanking.textContent);
                if (positionRankingCell <= 5) {
                    positionRanking.classList.add('top-five');
                } else if (positionRankingCell >= 6 && positionRankingCell <= 10) {
                    positionRanking.classList.add('top-ten');
                } else if (positionRankingCell >= 11 && positionRankingCell <= 20) {
                    positionRanking.classList.add('top-twenty');
                }
            }

            const value = cells[10];
            if (value) {
                const valueCell = parseInt(value.textContent);
                if(valueCell >= 7000) {
                    value.classList.add('top-five');
                } else if (valueCell >= 4000 && valueCell <=6999){
                    value.classList.add('elite');
                } else if (valueCell >= 3000 && valueCell <=3999) {
                    value.classList.add('positive');
                } else if (valueCell >= 1000 && valueCell <=2999) {
                    value.classList.add('neutral');
                }
            }

            const playerName = cells[2];
            const position = cells[3];
            switch (position.textContent) {
                case "QB":
                    playerName.classList.add('qb');
                    break;
                case "RB":
                    playerName.classList.add('rb');
                    break;
                case "WR":
                    playerName.classList.add('wr');
                    break;
                case "TE":
                    playerName.classList.add('te');
                    break;
            }
        
    }
}
    
    // Add Filter Row functionality (working correctly)
    function addFilterRow() {
        const headerRow = table.querySelector('thead tr');
        const filterRow = document.createElement('tr');
        filterRow.classList.add('filter-row');

        headers.forEach(() => {
            const filterCell = document.createElement('th');
            const filterInput = document.createElement('input');
            filterInput.type = 'text';
            filterCell.appendChild(filterInput);
            filterRow.appendChild(filterCell);
        });

        table.querySelector('thead').appendChild(filterRow);
        filterInputs = filterRow.querySelectorAll('input');

        filterInputs.forEach((input, index) => {
            input.addEventListener('input', () => filterTable(index, input.value));
        });
    }

    

    // Filter Table functionality (working correctly)
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
                    row.style.display = 'none';
                }
            }
        });
    }
    addFilterRow();
    addFormatting();
});
