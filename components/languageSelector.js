import { setLanguage } from "../state.js";

export function createLanguageSelector(container, countries) {
  const dropdown = document.createElement("div");
  dropdown.classList.add("language-dropdown");

  const selectedFlag = document.createElement('img');
  selectedFlag.classList.add('selected-flag');
  selectedFlag.alt = 'Selected Language';
  dropdown.appendChild(selectedFlag);

  const flagDropdown = document.createElement('div');
  flagDropdown.classList.add('flag-dropdown');
  dropdown.appendChild(flagDropdown);
  
  let selectedLanguage = 'GBR';
  const defaultCountry = countries.find(c => c.cca3 === selectedLanguage);
  console.log(defaultCountry)
  if(defaultCountry) {selectedFlag.src = defaultCountry.flags.png;}
  
  countries.forEach(country => {
    const flagOption = document.createElement('img');
    flagOption.src = country.flags.png;
    flagOption.alt = country.name.common;
    flagOption.classList.add('flag-option');
    flagOption.dataset.code = country.cca3;
    
    flagOption.addEventListener('click', (event) => {
        event.stopPropagation();
      selectedLanguage = country.cca3;
      selectedFlag.src = country.flags.png;
      flagDropdown.classList.remove('show'); 
      console.log(`Language changed to: ${country.name.common}`);

      switch (country.cca3) {
        case 'ESP': setLanguage('spanish'); break;
        case 'PRT': setLanguage('portuguese'); break;
        case 'CZE': setLanguage('czech'); break;
        case 'FRA': setLanguage('french'); break;
        case 'DEU': setLanguage('german'); break;
        case 'JPN': setLanguage('japanese'); break;
        default: setLanguage('english');
      }
    });

    
    flagDropdown.appendChild(flagOption);
  });
  selectedFlag.addEventListener('click', (event) => {
    event.stopPropagation();
    flagDropdown.classList.toggle('show');    
  });
  window.addEventListener('click', () => {
    flagDropdown.classList.remove('show'); 
  });

  container.appendChild(dropdown);
}
