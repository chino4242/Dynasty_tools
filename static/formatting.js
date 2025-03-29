function applyConditionalFormatting() {
    const table = document.getElementById('team');
    const rows = table.getElementsByTagName('tr');

    for (let i =1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const trendCell = cells[13];

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
        const positionalRankCell = cells[3]; // overallRank column
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
        const buyCell = cells[7];
            switch (buyCell.textContent) {
                case "Super Buy":
                    buyCell.classList.add('super-buy');
                    break;
                case "Buy":
                    buyCell.classList.add('positive');
                    break;
                case "Hold":
                    buyCell.classList.add('neutral');
                    break;
                case "Sell":
                    buyCell.classList.add('negative');
                    break;
            }
      }
    }
  
    // Get the button element
    const formatButton = document.getElementById('formatButton');
  
    // Add a click event listener to the button
    formatButton.addEventListener('click', applyConditionalFormatting);