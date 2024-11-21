
  // BITCOIN

    // Replace with your own Bitcoin address
    var address = "bc1qpqx2l8h277x7vnjg7d0srzhnrv3xd69f6589zp";
    // API endpoint to get transaction information
    var apiUrl = "https://blockchain.info/rawaddr/" + address;
    // Fetch transaction information from API
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var balance = data.final_balance;
        // Display balance in USD
        fetch("https://blockchain.info/ticker")
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var rate = data.USD.last;
            var balanceUsd = balance * rate / 100000000;
            document.getElementById("balance").innerHTML = "$" + balanceUsd.toFixed(2);
          });
        var transactions = data.txs;
        var contributors = {};
        // Loop through all transactions
        for (var i = 0; i < transactions.length; i++) {
          var transaction = transactions[i];
          var inputs = transaction.inputs;
          var input = inputs[0];
          var prevOut = input.prev_out;
          var sender = prevOut.addr;
          var value = prevOut.value;
          // Check if sender already exists in contributors object
          if (contributors[sender]) {
            // Add value to existing sender
            contributors[sender] += value;
          } else {
            // Add new sender to contributors object
            contributors[sender] = value;
          }
        }
        // Sort contributors by value in descending order
        var sortedContributors = Object.entries(contributors).sort((a, b) => b[1] - a[1]);
        var contributorList = document.getElementById("biggest-contributors");
        var symbols = '';
        // Display symbols for all contributors
        for (var i = 0; i < sortedContributors.length; i++) {
          var contributor = sortedContributors[i];
          var senderAddress = contributor[0];
          var value = (contributor[1]/1e8).toFixed(8);
          symbols += '<span style="word-break: break-all;" title="Sender: ' + senderAddress + ' | BTC Value: ' + value + '">─█──</span>';
        }
        contributorList.innerHTML = symbols;
      });


// TABS

      function openCity(evt, cityName) {
        // Declare all variables
        var i, tabcontent, tablinks;
      
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

// 5$ to BTC

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
      } 
      
      // Get the element with id="defaultOpen" and click on it
      document.getElementById("defaultOpen").click();
    

    const usdAmount = 5; // USD amount for which Bitcoin price is to be displayed
    // Fetch Bitcoin price from Blockchain.info API
    fetch('https://blockchain.info/ticker')
      .then(response => response.json())
      .then(data => {
        const bitcoinPrice = parseFloat(data.USD.last); // Extract and parse Bitcoin price from API response
        const bitcoinAmount = usdAmount / bitcoinPrice; // Calculate Bitcoin amount for given USD amount
        document.getElementById('bitcoin-price').textContent = '(' + bitcoinAmount.toFixed(8) + ' BTC)'; // Display Bitcoin amount with 8 decimal places
      })
      .catch(error => console.error('Error fetching Bitcoin price:', error));
