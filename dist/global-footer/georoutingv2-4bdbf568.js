function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
const loadGeoRouting = function (conf, createTagFunc, getMetadataFunc, loadBlockFunc, loadStyleFunc) {
  try {
    if (getGeoroutingOverride()) return Promise.resolve();
    config = conf;
    createTag = createTagFunc;
    getMetadata = getMetadataFunc;
    loadBlock = loadBlockFunc;
    loadStyle = loadStyleFunc;
    return Promise.resolve(fetch(`${config.contentRoot ?? ''}/georoutingv2.json`)).then(function (resp) {
      let _exit;
      function _temp14(_result) {
        return _exit ? _result : Promise.resolve(resp.json()).then(function (json) {
          let _exit2;
          function _temp12(_result2) {
            if (_exit2) return _result2;
            const _temp10 = _catch(function () {
              return Promise.resolve(getAkamaiCode()).then(function (akamaiCode) {
                const _temp9 = function () {
                  if (akamaiCode && !getCodes(urlGeoData).includes(akamaiCode)) {
                    const localeMatches = getMatches(json.georouting.data, akamaiCode);
                    return Promise.resolve(getDetails(urlGeoData, localeMatches, json.geos.data)).then(function (details) {
                      const _temp8 = function () {
                        if (details) {
                          return Promise.resolve(showModal(details)).then(function () {
                            sendAnalyticsFunc(new Event(`Load:${urlLocale || 'us'}-${akamaiCode || 'us'}|Geo_Routing_Modal`));
                          });
                        }
                      }();
                      if (_temp8 && _temp8.then) return _temp8.then(function () {});
                    });
                  }
                }();
                if (_temp9 && _temp9.then) return _temp9.then(function () {});
              });
            }, function (e) {
              window.lana?.log(e.message);
            });
            if (_temp10 && _temp10.then) return _temp10.then(function () {});
          }
          const {
            locale
          } = config;
          const urlLocale = locale.prefix.replace('/', '');
          const storedInter = getCookie('international');
          const storedLocale = storedInter === 'us' ? '' : storedInter;
          const urlGeoData = json.georouting.data.find(d => d.prefix === urlLocale);
          if (!urlGeoData) return;
          const _temp11 = function () {
            if (storedLocale || storedLocale === '') {
              function _temp7() {
                _exit2 = 1;
              }
              const urlLocaleGeo = urlLocale.split('_')[0];
              const storedLocaleGeo = storedLocale.split('_')[0];
              // Show modal when url and cookie disagree
              const _temp6 = function () {
                if (urlLocaleGeo !== storedLocaleGeo) {
                  const localeMatches = json.georouting.data.filter(d => d.prefix === storedLocale);
                  return Promise.resolve(getDetails(urlGeoData, localeMatches, json.geos.data)).then(function (details) {
                    const _temp5 = function () {
                      if (details) {
                        return Promise.resolve(showModal(details)).then(function () {
                          sendAnalyticsFunc(new Event(`Load:${storedLocaleGeo || 'us'}-${urlLocaleGeo || 'us'}|Geo_Routing_Modal`));
                        });
                      }
                    }();
                    if (_temp5 && _temp5.then) return _temp5.then(function () {});
                  });
                }
              }();
              return _temp6 && _temp6.then ? _temp6.then(_temp7) : _temp7(_temp6);
            }
          }();
          return _temp11 && _temp11.then ? _temp11.then(_temp12) : _temp12(_temp11); // Show modal when derived countries from url locale and akamai disagree
        });
      }
      const _temp13 = function () {
        if (!resp.ok) {
          // eslint-disable-next-line import/no-cycle
          return Promise.resolve(import('./georouting-29194f0e.js')).then(function ({
            default: loadGeoRoutingOld
          }) {
            loadGeoRoutingOld(config, createTag, getMetadata);
            _exit = 1;
          });
        }
      }();
      return _temp13 && _temp13.then ? _temp13.then(_temp14) : _temp14(_temp13);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const showModal = function (details) {
  try {
    const {
      miloLibs,
      codeRoot
    } = config;
    const tabs = details.querySelector('.tabs');
    const promises = [tabs ? loadBlock(tabs) : null, tabs ? loadStyle(`${miloLibs || codeRoot}/blocks/section-metadata/section-metadata.css`) : null, loadStyle(`${miloLibs || codeRoot}/features/georoutingv2/georoutingv2.css`)];
    return Promise.resolve(Promise.all(promises)).then(function () {
      // eslint-disable-next-line import/no-cycle
      return Promise.resolve(import('./modal-6e215c97.js')).then(function ({
        getModal,
        sendAnalytics
      }) {
        sendAnalyticsFunc = sendAnalytics;
        return getModal(null, {
          class: 'locale-modal-v2',
          id: 'locale-modal-v2',
          content: details,
          closeEvent: 'closeModal'
        });
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const getDetails = function (currentPage, localeMatches, geoData) {
  return Promise.resolve(getAvailableLocales(localeMatches)).then(function (availableLocales) {
    function _temp4() {
      const georoutingWrapper = createTag('div', {
        class: 'georouting-wrapper fragment',
        style: 'display:none;'
      }, svgDiv);
      currentPage.url = window.location.hash ? document.location.href : '#';
      if (availableLocales.length === 1) {
        const content = buildContent(currentPage, availableLocales[0], geoData);
        georoutingWrapper.appendChild(content);
        return georoutingWrapper;
      }
      const sortedLocales = availableLocales.sort((a, b) => a.languageOrder - b.languageOrder);
      const tabsContainer = createTabsContainer(sortedLocales.map(l => l.language));
      georoutingWrapper.appendChild(tabsContainer);
      sortedLocales.forEach(locale => {
        const content = buildContent(currentPage, locale, geoData, sortedLocales);
        const tab = createTab(content, locale.language);
        georoutingWrapper.appendChild(tab);
      });
      return georoutingWrapper;
    }
    if (!availableLocales.length) return null;
    const {
      innerWidth
    } = window;
    let svgDiv = null;
    const _temp3 = function () {
      if (innerWidth < 480) {
        return Promise.resolve(import('./getMobileBg-dd2b8d11.js')).then(function ({
          default: getMobileBg
        }) {
          svgDiv = createTag('div', {
            class: 'georouting-bg'
          }, getMobileBg());
        });
      }
    }();
    return _temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4();
  });
};
// Determine if any of the locales can be linked to.
const getAvailableLocales = function (locales) {
  try {
    function _temp2() {
      return availableLocales.filter(a => !!a);
    }
    const fallback = getMetadata('fallbackrouting') || config.fallbackRouting;
    const {
      prefix
    } = config.locale;
    let path = window.location.href.replace(`${window.location.origin}`, '');
    if (path.startsWith(prefix)) path = path.replace(prefix, '');
    const availableLocales = [];
    const pagesExist = [];
    locales.forEach((locale, index) => {
      const locPrefix = locale.prefix ? `/${locale.prefix}` : '';
      const localePath = `${locPrefix}${path}`;
      const pageExistsRequest = fetch(localePath, {
        method: 'HEAD'
      }).then(resp => {
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
    const _temp = function () {
      if (pagesExist.length > 0) return Promise.resolve(Promise.all(pagesExist)).then(function () {});
    }();
    return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
  } catch (e) {
    return Promise.reject(e);
  }
};
let config;
let createTag;
let getMetadata;
let loadBlock;
let loadStyle;
let sendAnalyticsFunc;
const createTabsContainer = tabNames => {
  const ol = createTag('ol');
  tabNames.forEach(name => {
    const li = createTag('li', null, name);
    ol.appendChild(li);
  });
  const olDiv = createTag('div', null, ol);
  const outerDiv = createTag('div', null, olDiv);
  const divTabs = createTag('div', {
    class: 'tabs quiet'
  }, outerDiv);
  return createTag('div', {
    class: 'section tabs-background-transparent'
  }, divTabs);
};
const createTab = (content, tabName) => {
  const divTab = createTag('div', null, 'tab');
  const divTagName = createTag('div', null, tabName);
  const tab = createTag('div');
  tab.appendChild(divTab);
  tab.appendChild(divTagName);
  const sectionMeta = createTag('div', {
    class: 'section-metadata'
  }, tab);
  const topDiv = createTag('div', {
    class: 'section'
  });
  topDiv.append(content);
  topDiv.append(sectionMeta);
  return topDiv;
};
const getCookie = name => document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1];
const getAkamaiCode = () => new Promise((resolve, reject) => {
  const urlParams = new URLSearchParams(window.location.search);
  const akamaiLocale = urlParams.get('akamaiLocale') || sessionStorage.getItem('akamai');
  if (akamaiLocale !== null) {
    resolve(akamaiLocale.toLowerCase());
  } else {
    /* c8 ignore next 5 */
    fetch('https://geo2.adobe.com/json/', {
      cache: 'no-cache'
    }).then(resp => {
      if (resp.ok) {
        resp.json().then(data => {
          const code = data.country.toLowerCase();
          sessionStorage.setItem('akamai', code);
          resolve(code);
        });
      } else {
        reject(new Error(`Something went wrong getting the akamai Code. Response status text: ${resp.statusText}`));
      }
    }).catch(error => {
      reject(new Error(`Something went wrong getting the akamai Code. ${error.message}`));
    });
  }
});
function getGeoroutingOverride() {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('georouting');
  const georouting = param || getCookie('georouting');
  if (param === 'off') {
    const domain = window.location.host.endsWith('.adobe.com') ? 'domain=adobe.com' : '';
    const d = new Date();
    d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `georouting=${georouting};${expires};path=/;${domain}`;
  } else if (param === 'on') document.cookie = 'georouting=; expires= Thu, 01 Jan 1970 00:00:00 GMT';
  return georouting === 'off';
}
function decorateForOnLinkClick(link, urlPrefix, localePrefix) {
  link.addEventListener('click', () => {
    const modPrefix = urlPrefix || 'us';
    // set cookie so legacy code on adobecom still works properly.
    const domain = window.location.host === 'adobe.com' || window.location.host.endsWith('.adobe.com') ? 'domain=adobe.com' : '';
    document.cookie = `international=${modPrefix};path=/;${domain}`;
    link.closest('.dialog-modal').dispatchEvent(new Event('closeModal'));
    if (localePrefix !== undefined) {
      const modCurrPrefix = localePrefix || 'us';
      sendAnalyticsFunc(new Event(`Stay:${modPrefix.split('_')[0]}-${modCurrPrefix.split('_')[0]}|Geo_Routing_Modal`));
    }
  });
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
function removeOnClickOutsideElement(element, event, button) {
  const func = evt => {
    if (event === evt) return; // ignore initial click event
    let targetEl = evt.target;
    while (targetEl) {
      if (targetEl === element) {
        // click inside
        return;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    }
    // This is a click outside.
    element.remove();
    button.setAttribute('aria-expanded', false);
    document.removeEventListener('click', func);
  };
  document.addEventListener('click', func);
}
function openPicker(button, locales, country, event, dir) {
  if (document.querySelector('.locale-modal-v2 .picker')) {
    return;
  }
  const list = createTag('ul', {
    class: 'picker',
    dir
  });
  locales.forEach(l => {
    const lang = config.locales[l.prefix]?.ietf ?? '';
    const a = createTag('a', {
      lang,
      href: l.url
    }, `${country} - ${l.language}`);
    decorateForOnLinkClick(a, l.prefix);
    const li = createTag('li', {}, a);
    list.appendChild(li);
  });
  button.parentNode.insertBefore(list, button.nextSibling);
  const buttonRect = button.getBoundingClientRect();
  const spaceBelowButton = window.innerHeight - buttonRect.bottom;
  if (spaceBelowButton <= list.offsetHeight) {
    list.classList.add('top');
  }
  button.setAttribute('aria-expanded', true);
  removeOnClickOutsideElement(list, event, button);
}
function buildContent(currentPage, locale, geoData, locales) {
  const fragment = new DocumentFragment();
  const lang = config.locales[locale.prefix]?.ietf ?? '';
  const dir = config.locales[locale.prefix]?.dir ?? 'ltr';
  const geo = geoData.filter(c => c.prefix === locale.prefix);
  const titleText = geo.length ? geo[0][currentPage.geo] : '';
  const title = createTag('h3', {
    lang,
    dir
  }, locale.title.replace('{{geo}}', titleText));
  const text = createTag('p', {
    class: 'locale-text',
    lang,
    dir
  }, locale.text);
  const flagFile = locale.globeGrid?.toLowerCase().trim() === 'on' ? 'globe-grid.png' : `flag-${locale.geo.replace('_', '-')}.svg`;
  const img = createTag('img', {
    class: 'icon-milo',
    width: 15,
    height: 15,
    alt: locale.button
  });
  img.addEventListener('error', () => img.src = `${config.miloLibs || config.codeRoot}/features/georoutingv2/img/globe-grid.png`, {
    once: true
  });
  img.src = `${config.miloLibs || config.codeRoot}/img/georouting/${flagFile}`;
  const span = createTag('span', {
    class: 'icon margin-inline-end'
  }, img);
  const mainAction = createTag('a', {
    class: 'con-button blue button-l',
    lang,
    role: 'button',
    'aria-haspopup': !!locales,
    'aria-expanded': false,
    href: '#'
  }, span);
  mainAction.append(locale.button);
  if (locales) {
    const downArrow = createTag('img', {
      class: 'icon-milo down-arrow',
      src: `${config.miloLibs || config.codeRoot}/ui/img/chevron.svg`,
      width: 15,
      height: 15
    });
    span.appendChild(downArrow);
    mainAction.addEventListener('click', e => {
      e.preventDefault();
      openPicker(mainAction, locales, locale.button, e, dir);
    });
  } else {
    mainAction.href = locale.url;
    decorateForOnLinkClick(mainAction, locale.prefix);
  }
  const altAction = createTag('a', {
    lang,
    href: currentPage.url
  }, currentPage.button);
  decorateForOnLinkClick(altAction, currentPage.prefix, locale.prefix);
  const linkWrapper = createTag('div', {
    class: 'link-wrapper'
  }, mainAction);
  linkWrapper.appendChild(altAction);
  fragment.append(title, text, linkWrapper);
  return fragment;
}

export { loadGeoRouting as default, getCookie };
//# sourceMappingURL=georoutingv2-4bdbf568.js.map
