export const fetchCountries = nameCountry =>
  fetch(
    `https://restcountries.com/v2/name/${nameCountry}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
