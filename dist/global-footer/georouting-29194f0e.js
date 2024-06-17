import { _ as _createForOfIteratorHelper } from './global-footer-92adaea3.js';

const loadGeoRouting = function (config, createTag, getMetadata) {
  try {
    const {
      locale
    } = config;
    const urlLocale = locale.prefix.replace('/', '');
    const storedInter = sessionStorage.getItem('international') || getCookie('international');
    const storedLocale = storedInter === 'us' ? '' : storedInter;
    return Promise.resolve(fetch(`${config.contentRoot ?? ''}/georouting.json`)).then(function (resp) {
      if (!resp.ok) return;
      return Promise.resolve(resp.json()).then(function (json) {
        let _exit;
        function _temp9(_result) {
          return _exit ? _result : Promise.resolve(getAkamaiCode()).then(function (akamaiCode) {
            const _temp7 = function () {
              if (akamaiCode && !getCodes(urlGeoData).includes(akamaiCode)) {
                const localeMatches = getMatches(json.data, akamaiCode);
                return Promise.resolve(getDetails(urlGeoData, localeMatches, config, createTag, getMetadata)).then(function (details) {
                  const _temp6 = function () {
                    if (details) {
                      return Promise.resolve(showModal(details)).then(function () {});
                    }
                  }();
                  if (_temp6 && _temp6.then) return _temp6.then(function () {});
                });
              }
            }();
            if (_temp7 && _temp7.then) return _temp7.then(function () {});
          });
        }
        const urlGeoData = json.data.find(d => d.prefix === urlLocale);
        if (!urlGeoData) return;
        const _temp8 = function () {
          if (storedLocale || storedLocale === '') {
            function _temp5() {
              _exit = 1;
            }
            const _temp4 = function () {
              if (urlLocale.split('_')[0] !== storedLocale.split('_')[0]) {
                const localeMatches = json.data.filter(d => d.prefix === storedLocale);
                return Promise.resolve(getDetails(urlGeoData, localeMatches, config, createTag, getMetadata)).then(function (details) {
                  const _temp3 = function () {
                    if (details) {
                      return Promise.resolve(showModal(details)).then(function () {});
                    }
                  }();
                  if (_temp3 && _temp3.then) return _temp3.then(function () {});
                });
              }
            }();
            // Show modal when url and cookie disagree
            return _temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4);
          }
        }();
        return _temp8 && _temp8.then ? _temp8.then(_temp9) : _temp9(_temp8); // Show modal when derived countries from url locale and akamai disagree
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const showModal = function (details) {
  try {
    return Promise.resolve(import('./modal-6e215c97.js')).then(function ({
      getModal
    }) {
      return getModal(null, {
        class: 'locale-modal',
        id: 'locale-modal',
        content: details,
        closeEvent: 'closeModal'
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const getDetails = function (currentPage, localeMatches, config, createTag, getMetadata) {
  return Promise.resolve(getAvailableLocales(localeMatches, config, getMetadata)).then(function (availableLocales) {
    if (availableLocales && availableLocales.length > 0) {
      currentPage.url = window.location.hash ? document.location.href : '#';
      const imgUrl = `${config.miloLibs || config.codeRoot}/img/icons/Smock_GlobeOutline_18_N.svg`;
      const worldIcon = createTag('img', {
        src: imgUrl,
        class: 'world-icon'
      });
      const text = buildText([...availableLocales, currentPage], config, createTag);
      const links = buildLinks([...availableLocales, currentPage], config, createTag);
      const detailsFragment = new DocumentFragment();
      detailsFragment.append(worldIcon, text, links);
      return detailsFragment;
    }
    return null;
  });
};
// Determine if any of the locales can be linked to.
const getAvailableLocales = function (locales, config, getMetadata) {
  try {
    function _temp2() {
      return availableLocales.filter(a => !!a);
    }
    const fallback = getMetadata('fallbackrouting') || config.fallbackRouting;
    const {
      contentRoot
    } = config.locale;
    const path = window.location.href.replace(contentRoot, '');
    const availableLocales = [];
    const pagesExist = [];
    var _iterator = _createForOfIteratorHelper(locales.entries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        const [index, locale] = _step.value;
        const prefix = locale.prefix ? `/${locale.prefix}` : '';
        const localeRoot = `${prefix}${config.contentRoot ?? ''}`;
        const localePath = `${localeRoot}${path}`;
        const pageExistsRequest = fetch(localePath, {
          method: 'HEAD'
        }).then(resp => {
          if (resp.ok) {
            locale.url = localePath;
            availableLocales[index] = locale;
          } else if (fallback !== 'off') {
            locale.url = `${localeRoot}/`;
            availableLocales[index] = locale;
          }
        });
        pagesExist.push(pageExistsRequest);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    const _temp = function () {
      if (pagesExist.length > 0) return Promise.resolve(Promise.all(pagesExist)).then(function () {});
    }();
    return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
  } catch (e) {
    return Promise.reject(e);
  }
};
const getCookie = name => document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1];
const geo2jsonp = callback => {
  // Setup a unique name that can be called & destroyed
  const callbackName = `jsonp_${Math.round(100000 * Math.random())}`;
  const script = document.createElement('script');
  script.src = `https://geo2.adobe.com/json/?callback=${callbackName}`;

  // Define the function that the script will call
  window[callbackName] = data => {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };
  document.body.appendChild(script);
};
const getAkamaiCode = () => new Promise(resolve => {
  const urlParams = new URLSearchParams(window.location.search);
  const akamaiLocale = urlParams.get('akamaiLocale') || sessionStorage.getItem('akamai');
  if (akamaiLocale !== null) {
    resolve(akamaiLocale.toLowerCase());
  } else {
    geo2jsonp(data => {
      const code = data.country.toLowerCase();
      sessionStorage.setItem('akamai', code);
      resolve(code);
    });
  }
});
function buildText(locales, config, createTag) {
  const fragment = new DocumentFragment();
  const wrapper = createTag('div', {
    class: 'text-wrapper'
  });
  locales.forEach(locale => {
    const lang = config.locales[locale.prefix]?.ietf ?? '';
    const text = createTag('p', {
      class: 'locale-text',
      lang
    }, locale.text);
    wrapper.append(text);
  });
  fragment.append(wrapper);
  return fragment;
}
function buildLinks(locales, config, createTag) {
  const fragment = new DocumentFragment();
  const wrapper = createTag('div', {
    class: 'link-wrapper'
  });
  locales.forEach(locale => {
    const lang = config.locales[locale.prefix]?.ietf ?? '';
    const link = createTag('a', {
      class: 'locale-link',
      lang,
      href: locale.url
    }, locale.button);
    const para = createTag('p', {
      class: 'locale-link-wrapper'
    }, link);
    wrapper.append(para);
    link.addEventListener('click', () => {
      const modPrefix = locale.prefix || 'us';
      // set cookie so legacy code on adobecom still works properly.
      document.cookie = `international=${modPrefix};path=/`;
      sessionStorage.setItem('international', modPrefix);
      link.closest('.dialog-modal').dispatchEvent(new Event('closeModal'));
    });
  });
  fragment.append(wrapper);
  return fragment;
}
function getCodes(data) {
  return data.akamaiCodes.split(',').map(a => a.toLowerCase().trim());
}
function getMatches(data, suppliedCode) {
  return data.reduce((rdx, locale) => {
    const localeCodes = getCodes(locale);
    if (localeCodes.some(code => code === suppliedCode)) rdx.push(locale);
    return rdx;
  }, []);
}

export { loadGeoRouting as default, getCookie };
//# sourceMappingURL=georouting-29194f0e.js.map
