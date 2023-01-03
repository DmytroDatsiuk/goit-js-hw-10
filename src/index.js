import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import createCountrylist from './function';
import createCountryInfo from './createCountryInfp';

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
      if (country.length > 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
        return;
      }
      
      list.insertAdjacentHTML('beforeend', createCountrylist(country));

      if (country.length === 1) {
        divInfo.insertAdjacentHTML('beforeend', createCountryInfo(country));
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
}
