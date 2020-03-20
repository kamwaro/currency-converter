const axios = require('axios');

// API's
// Exchange Rate: http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1

// 1st Function -- Get Exchange Rate

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(
    'http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1'
  );

  const rate = response.data.rates;
  const euro = 1 / rate[fromCurrency];
  const exchangeRate = euro * rate[toCurrency];

  if (isNaN(exchangeRate)) {
    throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
  }

  return exchangeRate;
};

// 2nd function - getCountries
const getCountries = async toCurrency => {
  const response = await axios.get(
    `http://restcountries.eu/rest/v2/currency/${toCurrency}`
  );

  return response.data.map(country => country.name);
};

// 3rd function - convertCurrency
const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const countries = await getCountries(toCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  console.log(convertedAmount);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
};

// Call convert currency to get meaningful data.

convertCurrency('USD', 'EUR', 30)
  .then(message => {
    console.log(message);
  })
  .catch(error => {
    console.log(error.message);
  });
