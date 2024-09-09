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

function createToasterElement(currentPage, locale, geoData) {
  const toaster = createTag('div', { class: 'georouting-toaster' });
  const titleText = geoData.find((c) => c.prefix === locale.prefix)?.geo || '';
  const text = `We noticed that you're browsing from ${titleText}. Would you prefer the localized site?`;
  const message = createTag('p', {}, text);
  const switchButton = createTag('button', { class: 'switch-btn' }, 'Switch');
  const dismissButton = createTag('button', { class: 'dismiss-btn' }, 'Dismiss');

  toaster.append(message, switchButton, dismissButton);
  document.body.appendChild(toaster);

  switchButton.addEventListener('click', () => {
    window.location.href = locale.url;
  });

  dismissButton.addEventListener('click', () => {
    toaster.remove();
  });
}

async function showToaster(details) {
  await loadStyle(`${config.miloLibs || config.codeRoot}/features/georoutingv2/georoutingv2.css`);
  createToasterElement(details);
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
      const details = await getAvailableLocales(localeMatches);
      if (details.length) {
        await showToaster(details[0]);
      }
    }
    return;
  }

  try {
    let akamaiCode = await getAkamaiCode();
    if (akamaiCode && !getCodes(urlGeoData).includes(akamaiCode)) {
      const localeMatches = getMatches(json.georouting.data, akamaiCode);
      const details = await getAvailableLocales(localeMatches);
      if (details.length) {
        await showToaster(details[0]);
      }
    }
  } catch (e) {
    console.error(e.message);
  }
}
