document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    const rows = table.querySelectorAll('tbody tr');
    const showDataButtons = document.querySelectorAll('.showDataBtn');
    const modal=document.getElementById('dataModal');
    const modalContent = document.getElementById('modalContent');
    const closeModalButton = document.getElementById('closeModalBtn');

    showDataButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cellData = this.dataset.cellData;
            modalContent.textContent = cellData;
            modal.showModal();
        });
    });

    closeModalButton.addEventListener('click', function(){
        modal.close();
    });
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

    function addFormatting() {
        for (let i = 0; i < rows.length; i++) { 
            const cells = rows[i].getElementsByTagName('td');
            
            // Format for producer group
            const categoryCell = cells[11]; // assuming the producer group is in the 7th column (index 6)
            if (categoryCell.textContent.trim().toLowerCase() === "elite producer") {
                categoryCell.classList.add('elite');
            } else if (categoryCell.textContent.trim().toLowerCase() === "weekly starter"){
                categoryCell.classList.add('positive');
            } else if (categoryCell.textContent.trim().toLowerCase() === "flex play") {
                categoryCell.classList.add('neutral');
            } else if (categoryCell.textContent.trim().toLowerCase() === "benchwarmer") {
                categoryCell.classList.add('negative');
            }
            
             const positionRanking = cells[18];
            if (positionRanking) {
                const positionRankingCell = parseInt(positionRanking.textContent);
                if (positionRankingCell <= 5) {
                    positionRanking.classList.add('top-five');
                } else if (positionRankingCell >= 6 && positionRankingCell <= 10) {
                    positionRanking.classList.add('top-ten');
                } else if (positionRankingCell >= 11 && positionRankingCell <= 20) {
                    positionRanking.classList.add('positive');
                }
            }

            const rspPositionRanking = cells[6];
            if (rspPositionRanking) {
                const rspPositionRankingCell = parseInt(rspPositionRanking.textContent);
                if (rspPositionRankingCell <= 5) {
                    rspPositionRanking.classList.add('top-five');
                } else if (rspPositionRankingCell >= 6 && rspPositionRankingCell <= 10) {
                    rspPositionRanking.classList.add('top-ten');
                } else if (rspPositionRankingCell >= 11 && rspPositionRankingCell <= 20) {
                    rspPositionRanking.classList.add('positive');
                } else if (rspPositionRankingCell >= 21 && rspPositionRankingCell <= 30) {
                    rspPositionRanking.classList.add('neutral');
                } else if (rspPositionRankingCell >= 31 && rspPositionRankingCell <= 50) {
                        rspPositionRanking.classList.add('negative');
                } 
        }
            const rpPositionRanking = cells[7];
            if (rpPositionRanking) {
                const rpPositionRankingCell = parseInt(rpPositionRanking.textContent);
                if (rpPositionRankingCell <= 5) {
                    rpPositionRanking.classList.add('top-five');
                } else if (rpPositionRankingCell >= 6 && rpPositionRankingCell <= 10) {
                    rpPositionRanking.classList.add('top-ten');
                } else if (rpPositionRankingCell >= 11 && rpPositionRankingCell <= 20) {
                    rpPositionRanking.classList.add('positive');
                } else if (rpPositionRankingCell >= 21 && rpPositionRankingCell <= 30) {
                    rpPositionRanking.classList.add('neutral');
                } else if (rpPositionRankingCell >= 31 && rpPositionRankingCell <= 50) {
                    rpPositionRanking.classList.add('negative');
                } 
            

            const value = cells[19];
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
            const manPercentile = cells[28];
            if (manPercentile) {
                const manPercentileCell = parseInt(manPercentile.textContent);
                if(manPercentileCell >= 90) {
                    manPercentile.classList.add('top-five');
                } else if (manPercentileCell >= 80 && manPercentileCell <=89){
                    manPercentile.classList.add('elite');
                } else if (manPercentileCell >= 60 && manPercentileCell <=79) {
                    manPercentile.classList.add('positive');
                } else if (manPercentileCell >= 50 && manPercentileCell <=59) {
                    manPercentile.classList.add('neutral');
                } else if (manPercentileCell <= 49) {
                    manPercentile.classList.add('negative')
                }
            }
            const zonePercentile = cells[31];
            if (zonePercentile) {
                const zonePercentileCell = parseInt(zonePercentile.textContent);
                if(zonePercentileCell >= 90) {
                    zonePercentile.classList.add('top-five');
                } else if (zonePercentileCell >= 80 && zonePercentileCell <=89){
                    zonePercentile.classList.add('elite');
                } else if (zonePercentileCell >= 60 && zonePercentileCell <=79) {
                    zonePercentile.classList.add('positive');
                } else if (zonePercentileCell >= 50 && zonePercentileCell <=59) {
                    zonePercentile.classList.add('neutral');
                } else if (zonePercentileCell <= 49) {
                    zonePercentile.classList.add('negative')
                }
                
            }
            const pressPercentile = cells[34];
            if (pressPercentile) {
                const pressPercentileCell = parseInt(pressPercentile.textContent);
                if(pressPercentileCell >= 90) {
                    pressPercentile.classList.add('top-five');
                } else if (pressPercentileCell >= 80 && pressPercentileCell <=89){
                    pressPercentile.classList.add('elite');
                } else if (pressPercentileCell >= 60 && pressPercentileCell <=79) {
                    pressPercentile.classList.add('positive');
                } else if (pressPercentileCell >= 50 && pressPercentileCell <=59) {
                    pressPercentile.classList.add('neutral');
                } else if (pressPercentileCell <= 49) {
                    pressPercentile.classList.add('negative')
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

            const depthOfTalent = cells[10];
            if (depthOfTalent) {
                const dOTCell = parseInt(depthOfTalent.textContent);
                if(dOTCell >= 95) {
                    depthOfTalent.classList.add('rare');
                } else if (dOTCell >= 90 && dOTCell <=94){
                    depthOfTalent.classList.add('franchise');
                } else if (dOTCell >= 85 && dOTCell <=89) {
                    depthOfTalent.classList.add('starter');
                } else if (dOTCell >= 80 && dOTCell <=84) {
                    depthOfTalent.classList.add('rotational_starter');
                } else if (dOTCell >= 75 && dOTCell <=79) {
                    depthOfTalent.classList.add('contributor');
                } else if (dOTCell >=70 && dOTCell <= 74) {
                    depthOfTalent.classList.add('reserve');
                }
            }
        } 
    }

    }
    addFormatting();
});
