

import { state, onLanguageChange } from './state.js';
import { translations } from './database/db.js';
import { fetchCountries } from "./utils/fetch.js";
import { createSidebar } from "./components/sideBar.js";
import { createLanguageSelector } from "./components/languageSelector.js";
import { createGameBoard } from "./components/gameBoard.js";

let currentLanguage = 'english';
let countries = [];


async function init() {
  const container = document.querySelector('.container');

  countries = await fetchCountries();
  
  createGameBoard(container, currentLanguage)
  const sideBar = createSidebar(container);
  createLanguageSelector(sideBar, countries);

  console.log('Fetched countries:', countries);


}

init()


