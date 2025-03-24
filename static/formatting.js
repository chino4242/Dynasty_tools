function applyConditionalFormatting() {
    const table = document.getElementById('team');
    const rows = table.getElementsByTagName('tr');

    for (let i =1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const trendCell = cells[12];

        if (trendCell) {
            const trendValue = parseInt(trendCell.textContent);

            if (trendValue > 0) {
                trendCell.classList.add('positive');
            } else if (trendValue < 0) {
                trendCell.classList.add('negative');
            } else {
                trendCell.classList.add('neutral');
            }
        }
        const positionalRankCell = cells[5]; // overallRank column
        const positionCell = cells[1];

        if (positionalRankCell){
            const positionalRankValue = parseInt(positionalRankCell.textContent);
            if (positionCell.textContent === 'QB' || positionCell.textContent === 'TE') {
                if (positionalRankValue <= 10){
                    positionalRankCell.classList.add('positive');
            }}  else {
                if (positionalRankValue <= 20){
                    positionalRankCell.classList.add('positive');
            }    
            }
        }
  
      }
    }
  
    // Get the button element
    const formatButton = document.getElementById('formatButton');
  
    // Add a click event listener to the button
    formatButton.addEventListener('click', applyConditionalFormatting);