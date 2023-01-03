export default function createCountryInfo(country) {
    return country
      .map(({ capital, population, languages }) => {
        const languagesName = languages.map(({ name }) => name).join(', ');
        return `<p>Capital: ${capital}</p>Population: ${population}<p></p><p>Languages: ${languagesName}</p>`;
      })
      .join('');
  
    // divInfo.insertAdjacentHTML('beforeend', countryInfo);
  }