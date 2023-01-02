import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('input#search-box');
const list = document.querySelector('.country-list');
const divInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onIput, DEBOUNCE_DELAY));

function onIput(e) {
  list.innerHTML = '';
  divInfo.innerHTML = '';

  const named = e.target.value;

  const name = named.trim();

  if (name === '') {
    return;
  }

  fetchCountries(name)
    .then(country => {
      createCountrylist(country);

      if (country.length > 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        
      }

      if (country.length === 1) {
        createCountryInfo(country);
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
}

function createCountrylist(country) {
  const countryItem = country
    .map(
      ({
        name,
        flags,
      }) => `<li class="country-item"><img class='country-img' src="${flags.png}" alt="" width="30" height="25"/>
            <p>${name}</p></li>`
    )
    .join('');

  list.insertAdjacentHTML('beforeend', countryItem);
}

function createCountryInfo(country) {
  const countryInfo = country
    .map(({ capital, population, languages }) => {
      const languagesName = languages.map(({ name }) => name).join(', ');
      return `<p>Capital: ${capital}</p>Population: ${population}<p></p><p>Languages: ${languagesName}</p>`;
    })
    .join('');

    divInfo.insertAdjacentHTML('beforeend', countryInfo);
}
