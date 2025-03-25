document.addEventListener('DOMContentLoaded', function(){
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
