// script.js

// Elements from the HTML
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDiv = document.getElementById("result");
const convertButton = document.getElementById("convertButton");

// API Configuration
const apiKey = "31a871f25312f030171c69ed"; // Your API key
const baseURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Event listener for the Convert button
convertButton.addEventListener("click", async () => {
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (!amount || isNaN(amount)) {
        resultDiv.innerText = "Please enter a valid amount.";
        return;
    }

    try {
        // Fetch exchange rates for the selected base currency
        const response = await fetch(`${baseURL}${from}`);
        const data = await response.json();

        // Check if we received valid data
        if (data && data.conversion_rates && data.conversion_rates[to]) {
            const rate = data.conversion_rates[to];
            const result = amount * rate;
            resultDiv.innerText = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        } else {
            resultDiv.innerText = "Unable to retrieve exchange rate.";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        resultDiv.innerText = "An error occurred. Please try again later.";
    }
});

// Function to populate the currency dropdowns
const currencies = ["USD", "EUR", "GBP", "INR", "JPY", "AUD"];

currencies.forEach(currency => {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.text = currency;
    fromCurrency.add(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.text = currency;
    toCurrency.add(optionTo);
});