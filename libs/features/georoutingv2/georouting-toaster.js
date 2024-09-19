import { getFederatedContentRoot } from '../../utils/federated.js';

let config;
let createTag;
let getMetadata;
let loadStyle;

export const getCookie = (name) => document.cookie
  .split('; ')
  .find((row) => row.startsWith(`${name}=`))
  ?.split('=')[1];

const getAkamaiCode = () => new Promise((resolve, reject) => {
  const urlParams = new URLSearchParams(window.location.search);
  const akamaiLocale = urlParams.get('akamaiLocale') || sessionStorage.getItem('akamai');
  if (akamaiLocale !== null) {
    resolve(akamaiLocale.toLowerCase());
  } else {
    fetch('https://geo2.adobe.com/json/', { cache: 'no-cache' }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          const code = data.country.toLowerCase();
          sessionStorage.setItem('akamai', code);
          resolve(code);
        });
      } else {
        reject(new Error(`Error fetching Akamai code: ${resp.statusText}`));
      }
    }).catch((error) => {
      reject(new Error(`Error fetching Akamai code: ${error.message}`));
    });
  }
});

async function getAvailableLocales(locales) {
  const fallback = getMetadata('fallbackrouting') || config.fallbackRouting;

  const { prefix } = config.locale;
  let path = window.location.href.replace(`${window.location.origin}`, '');
  if (path.startsWith(prefix)) path = path.replace(prefix, '');

  const availableLocales = [];
  const pagesExist = [];
  locales.forEach((locale, index) => {
    const locPrefix = locale.prefix ? `/${locale.prefix}` : '';
    const localePath = `${locPrefix}${path}`;

    const pageExistsRequest = fetch(localePath, { method: 'HEAD' }).then((resp) => {
      if (resp.ok) {
        locale.url = localePath;
        availableLocales[index] = locale;
      } else if (fallback !== 'off') {
        locale.url = `${locPrefix}`;
        availableLocales[index] = locale;
      }
    });
    pagesExist.push(pageExistsRequest);
  });
  if (pagesExist.length > 0) await Promise.all(pagesExist);

  return availableLocales.filter((a) => !!a);
}

function getGeoroutingOverride() {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('georouting');
  const georouting = param || getCookie('georouting');
  if (param === 'off') {
    const domain = window.location.host.endsWith('.adobe.com') ? 'domain=adobe.com' : '';
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `georouting=${georouting};${expires};path=/;${domain}`;
  } else if (param === 'on') document.cookie = 'georouting=; expires= Thu, 01 Jan 1970 00:00:00 GMT';
  return georouting === 'off';
}

function getCodes(data) {
  return data.akamaiCodes.split(',').map((a) => a.toLowerCase().trim());
}

function getMatches(data, suppliedCode) {
  return data.reduce((rdx, locale) => {
    const localeCodes = getCodes(locale);
    if (localeCodes.some((code) => code === suppliedCode)) rdx.push(locale);
    return rdx;
  }, []);
}

function decorateForOnLinkClick(link, urlPrefix, localePrefix, eventType = 'Switch') {
  const modCurrPrefix = localePrefix || 'us';
  const modPrefix = urlPrefix || 'us';
  const eventName = `${eventType}:${modPrefix.split('_')[0]}-${modCurrPrefix.split('_')[0]}|Geo_Routing_Modal`;
  link.setAttribute('daa-ll', eventName);
  link.addEventListener('click', () => {
    const domain = window.location.host === 'adobe.com' || window.location.host.endsWith('.adobe.com') 
      ? 'domain=adobe.com' 
      : '';
    document.cookie = `international=${modPrefix};path=/;${domain}`;
    window.location.href = link.href;
  });
}


function buildToasterContent(geoData, locale, multipleLocales) {
  const lang = config.locales[locale.prefix]?.ietf ?? '';
  const geo = geoData.filter((c) => c.prefix === locale.prefix);
  const titleText = geo.length ? geo[0][currentPage.geo] : '';
  const toaster = createTag('div', { class: 'georouting-toaster' });
  const georoutingToasterContent = createTag('div', { class: 'georouting-toaster-content' });
  const navArrow = createTag('div', { class: 'nav-arrow' });
  const navArrowInner = createTag('div', { class: 'nav-arrow-inner' });
  const title = createTag('h5', { lang }, locale.title.replace('{{geo}}', titleText));
  const text = createTag('p', { class: 'locale-text', lang }, locale.text);
  
  navArrow.appendChild(navArrowInner);
  georoutingToasterContent.appendChild(navArrow);

  if (multipleLocales) {
    // Create dropdown for multiple locales
    const select = createTag('select');
    multipleLocales.forEach((loc) => {
      const option = createTag('option', { value: loc.url }, loc.language);
      select.appendChild(option);
    });
    georoutingToasterContent.appendChild(select);
  }

  georoutingToasterContent.appendChild(title);
  georoutingToasterContent.appendChild(text);

  const toasterFooter = createTag('div', { class: 'georouting-toaster-footer' });
  const span = createTag('span', { class: 'icon margin-inline-end' });
  
  const flagFile = locale.globeGrid?.toLowerCase().trim() === 'on' ? 'globe-grid.png' : `flag-${locale.geo.replace('_', '-')}.svg`;
  const img = createTag('img', {
    class: 'icon-milo',
    width: 15,
    height: 15,
    alt: locale.button,
  });
  
  img.addEventListener(
    'error',
    () => (img.src = `${config.miloLibs || config.codeRoot}/features/georoutingv2/img/globe-grid.png`),
    { once: true }
  );
  
  img.src = `${config.miloLibs || config.codeRoot}/img/georouting/${flagFile}`;
  span.appendChild(img); 

  const mainAction = createTag('a', {
    class: 'con-button blue button-l',
    lang: locale.lang,
    role: 'button',
    'aria-haspopup': !!multipleLocales,
    'aria-expanded': false,
    href: '#',
  }, span);
  mainAction.append(locale.button);

  if (multipleLocales) {
    const downArrow = createTag('img', {
      class: 'icon-milo down-arrow',
      src: `${config.miloLibs || config.codeRoot}/ui/img/chevron.svg`,
      role: 'presentation',
      width: 15,
      height: 15,
    });
    span.appendChild(downArrow);

    mainAction.addEventListener('click', (e) => {
      e.preventDefault();
      openPicker(mainAction, multipleLocales, locale.button, e, 'ltr', locale);
    });
  } else {
    mainAction.href = locale.url;
    decorateForOnLinkClick(mainAction, locale.prefix, locale.prefix);
  }
  
  const dismissButton = createTag('button', { class: 'dismiss-btn' }, 'Dismiss');
  toasterFooter.append(mainAction, dismissButton);
  georoutingToasterContent.append(toasterFooter);
  toaster.appendChild(georoutingToasterContent);
  
  return toaster;
}

function createToasterElement(geoData, locale, multipleLocales) {
  const toaster = buildToasterContent(geoData, locale, multipleLocales);
  //document.body.appendChild(toaster);
  const observer = new MutationObserver(() => {
  const brandContainer = document.querySelector('.feds-brand-container');
  if (brandContainer) {
    brandContainer.appendChild(toaster);
    observer.disconnect();
  }
  });

  observer.observe(document, {
    childList: true,
    subtree: true
  });
  

  toaster.querySelector('.switch-btn').addEventListener('click', () => {
    const selectedLocale = multipleLocales
      ? toaster.querySelector('select').value
      : locale.url;
    window.location.href = selectedLocale;
  });

  toaster.querySelector('.dismiss-btn').addEventListener('click', () => {
    toaster.remove();
  });
}

async function getDetails(currentPage, localeMatches, geoData) {
  const availableLocales = await getAvailableLocales(localeMatches);
  if (!availableLocales.length) return null;
  return availableLocales;
}

async function showToaster(currentPage, localeMatches, geoData) {
  const details = await getDetails(currentPage, localeMatches, geoData);
  if (details && details.length) {
    const multipleLocales = details.length > 1 ? details : null;
    createToasterElement(geoData, details[0], multipleLocales);
  }
}

export default async function loadGeoRoutingToaster(
  conf,
  createTagFunc,
  getMetadataFunc,
  loadStyleFunc,
) {
  if (getGeoroutingOverride()) return;

  config = conf;
  createTag = createTagFunc;
  getMetadata = getMetadataFunc;
  loadStyle = loadStyleFunc;

  //const { miloLibs, codeRoot } = config;
  //loadStyle(`${miloLibs || codeRoot}/features/georoutingv2/georoutingv2.css`);

  const urls = [
    `${config.contentRoot ?? ''}/georoutingv2.json`,
    `${config.contentRoot ?? ''}/georouting.json`,
    `${getFederatedContentRoot()}/federal/georouting/georoutingv2.json`,
  ];
  let resp;
  for (const url of urls) {
    resp = await fetch(url);
    if (resp.ok) {
      if (url.includes('georouting.json')) {
        const json = await resp.json();
        const { default: loadGeoRoutingOld } = await import('../georouting/georouting.js');
        loadGeoRoutingOld(config, createTag, getMetadata, json);
      }
      break;
    }
  }
  const json = await resp.json();
  const { locale } = config;

  const urlLocale = locale.prefix.replace('/', '');
  const storedInter = getCookie('international');
  const storedLocale = storedInter === 'us' ? '' : storedInter;

  const urlGeoData = json.georouting.data.find((d) => d.prefix === urlLocale);
  if (!urlGeoData) return;

  if (storedLocale || storedLocale === '') {
    const urlLocaleGeo = urlLocale.split('_')[0];
    const storedLocaleGeo = storedLocale.split('_')[0];
    if (urlLocaleGeo !== storedLocaleGeo) {
      const localeMatches = json.georouting.data.filter(
        (d) => d.prefix === storedLocale,
      );
      await showToaster(urlGeoData, localeMatches, json.geos.data);
    }
    return;
  }

  try {
    let akamaiCode = await getAkamaiCode();
    if (akamaiCode && !getCodes(urlGeoData).includes(akamaiCode)) {
      const localeMatches = getMatches(json.georouting.data, akamaiCode);
      await showToaster(urlGeoData, localeMatches, json.geos.data);
    }
  } catch (e) {
    console.error(e.message);
  }
}
