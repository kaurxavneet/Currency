document.getElementById("convertButton").addEventListener("click", convertCurrency);

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  // Show the loading spinner while fetching the conversion rate
  document.getElementById("loadingSpinner").style.display = "block";
  document.getElementById("conversionResult").innerText = "";

  const apiKey = 'YOUR_API_KEY'; // Replace with your API key
  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[toCurrency];
      if (rate) {
        const result = (amount * rate).toFixed(2);
        document.getElementById("conversionResult").innerText = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
      } else {
        document.getElementById("conversionResult").innerText = "Conversion not available.";
      }
      document.getElementById("loadingSpinner").style.display = "none";
    })
    .catch(error => {
      document.getElementById("conversionResult").innerText = "An error occurred. Please try again later.";
      document.getElementById("loadingSpinner").style.display = "none";
    });
}
