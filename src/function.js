export default function createCountrylist(country) {
    return country
      .map(
        ({
          name,
          flags,
        }) => `<li class="country-item"><img class='country-img' src="${flags.png}" alt="" width="30" height="25"/>
              <p>${name}</p></li>`
      )
      .join('');
  
    //   list.insertAdjacentHTML('beforeend', countryItem);
    }