//TODO: get navigator language(EN vs PT)
const defaultLocale = "pt";
const supportedLocales = ["pt", "en"];

let locale; // The active locale
let translations = {}; // Gets filled with active locale translations
let browserLocale; // User’s preferred locale 

// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
  const initialLocale = supportedOrDefault(browserLocales());
  setLocale(initialLocale);
  
  bindLocaleSwitcher(initialLocale);
});

function isSupported(locale) {
  return supportedLocales.indexOf(locale) > -1;
}

// Retrieve the first locale we support from the given
// array, or return our default locale
function supportedOrDefault(locales) {
  return locales.find(isSupported) || defaultLocale;
}

function browserLocales() {
  return navigator.languages.map((locale) =>
    locale.split("-")[0]
  );
}

// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
  if (newLocale === locale) return;

  const newTranslations = await fetchTranslationsFor(newLocale);
  locale = newLocale;
  translations = newTranslations;

  translatePage();
}

// Whenever the user selects a new locale, we
// load the locale's translations and update
// the page
function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector(".locale-selector");
  switcher.value = initialValue;

  switcher.onchange = (e) => {
    setLocale(e.target.value);
    closeMenu();
  };
}

// Retrieve translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`/lang/${newLocale}.json`);
  return await response.json();
}

// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
function translatePage() {
  document
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement);
}

function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[key];

  if (element.hasAttribute("placeholder")){
    //Could have used element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement 
    element.placeholder = translation;  
  } else if(element.hasAttribute("value")){
    element.value = translation; 
  } else{
    element.innerHTML = translation; // innerHTML vs innerText 
  }
}