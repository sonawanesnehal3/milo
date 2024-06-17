var globalFooter = require('./global-footer-26f98613.js');

const IMS_CLIENT_ID = 'milo_ims';
const IMS_PROD_URL = 'https://auth.services.adobe.com/imslib/imslib.min.js';
const getImsToken = function (loadScript) {
  try {
    function _temp2() {
      return window.adobeIMS?.getAccessToken()?.token;
    }
    window.adobeid = {
      client_id: IMS_CLIENT_ID,
      environment: 'prod',
      scope: 'AdobeID,openid'
    };
    const _temp = function () {
      if (!window.adobeIMS) {
        return Promise.resolve(loadScript(IMS_PROD_URL)).then(function () {});
      }
    }();
    return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
  } catch (e) {
    return Promise.reject(e);
  }
};

/* eslint-disable */
const HEX_DIGITS = '0123456789abcdef'.split('');
const sha1 = function (message) {
  try {
    const data = new TextEncoder().encode(message);
    return Promise.resolve(crypto.subtle.digest('SHA-1', data));
  } catch (e) {
    return Promise.reject(e);
  }
};
const uint8ToHex = int => {
  const first = int >> 4;
  const second = int - (first << 4);
  return HEX_DIGITS[first] + HEX_DIGITS[second];
};
const uint8ArrayToHex = buf => [...buf].map(int => uint8ToHex(int)).join('');

// generates uuid v5
const hashToUuid = buf => [uint8ArrayToHex(buf.slice(0, 4)), '-', uint8ArrayToHex(buf.slice(4, 6)), '-', uint8ToHex(buf[6] & 0x0f | parseInt(5 * 10, 16)), uint8ToHex(buf[7]), '-', uint8ToHex(buf[8] & 0x3f | 0x80), uint8ToHex(buf[9]), '-', uint8ArrayToHex(buf.slice(10, 16))].join('');
const getUuid = function (str) {
  return Promise.resolve(sha1(str)).then(function (buf) {
    return hashToUuid(new Uint8Array(buf));
  });
};

/* eslint-disable compat/compat */
const LOCALES = {
  // Americas
  ar: {
    ietf: 'es-AR'
  },
  br: {
    ietf: 'pt-BR'
  },
  ca: {
    ietf: 'en-CA'
  },
  ca_fr: {
    ietf: 'fr-CA'
  },
  cl: {
    ietf: 'es-CL'
  },
  co: {
    ietf: 'es-CO'
  },
  cr: {
    ietf: 'es-CR'
  },
  ec: {
    ietf: 'es-EC'
  },
  el: {
    ietf: 'es-EL'
  },
  gt: {
    ietf: 'es-GT'
  },
  la: {
    ietf: 'es-LA'
  },
  mx: {
    ietf: 'es-MX'
  },
  pe: {
    ietf: 'es-PE'
  },
  pr: {
    ietf: 'es-PR'
  },
  '': {
    ietf: 'en-US'
  },
  langstore: {
    ietf: 'en-US'
  },
  // EMEA
  africa: {
    ietf: 'en-africa'
  },
  be_fr: {
    ietf: 'fr-BE'
  },
  be_en: {
    ietf: 'en-BE'
  },
  be_nl: {
    ietf: 'nl-BE'
  },
  cy_en: {
    ietf: 'en-CY'
  },
  dk: {
    ietf: 'da-DK'
  },
  de: {
    ietf: 'de-DE'
  },
  ee: {
    ietf: 'et-EE'
  },
  eg_ar: {
    ietf: 'ar-EG'
  },
  eg_en: {
    ietf: 'en-GB'
  },
  es: {
    ietf: 'es-ES'
  },
  fr: {
    ietf: 'fr-FR'
  },
  gr_en: {
    ietf: 'en-GR'
  },
  gr_el: {
    ietf: 'el-GR'
  },
  ie: {
    ietf: 'en-IE'
  },
  il_en: {
    ietf: 'en-IL'
  },
  il_he: {
    ietf: 'he-il'
  },
  it: {
    ietf: 'it-IT'
  },
  kw_ar: {
    ietf: 'ar-KW'
  },
  kw_en: {
    ietf: 'en-GB'
  },
  lv: {
    ietf: 'lv-LV'
  },
  lt: {
    ietf: 'lt-LT'
  },
  lu_de: {
    ietf: 'de-LU'
  },
  lu_en: {
    ietf: 'en-LU'
  },
  lu_fr: {
    ietf: 'fr-LU'
  },
  hu: {
    ietf: 'hu-HU'
  },
  mt: {
    ietf: 'en-MT'
  },
  mena_en: {
    ietf: 'en-mena'
  },
  mena_ar: {
    ietf: 'ar-mena'
  },
  ng: {
    ietf: 'en-NG'
  },
  nl: {
    ietf: 'nl-NL'
  },
  no: {
    ietf: 'no-NO'
  },
  pl: {
    ietf: 'pl-PL'
  },
  pt: {
    ietf: 'pt-PT'
  },
  qa_ar: {
    ietf: 'ar-QA'
  },
  qa_en: {
    ietf: 'en-GB'
  },
  ro: {
    ietf: 'ro-RO'
  },
  sa_en: {
    ietf: 'en-sa'
  },
  ch_fr: {
    ietf: 'fr-CH'
  },
  ch_de: {
    ietf: 'de-CH'
  },
  ch_it: {
    ietf: 'it-CH'
  },
  si: {
    ietf: 'sl-SI'
  },
  sk: {
    ietf: 'sk-SK'
  },
  fi: {
    ietf: 'fi-FI'
  },
  se: {
    ietf: 'sv-SE'
  },
  tr: {
    ietf: 'tr-TR'
  },
  ae_en: {
    ietf: 'en-ae'
  },
  uk: {
    ietf: 'en-GB'
  },
  at: {
    ietf: 'de-AT'
  },
  cz: {
    ietf: 'cs-CZ'
  },
  bg: {
    ietf: 'bg-BG'
  },
  ru: {
    ietf: 'ru-RU'
  },
  ua: {
    ietf: 'uk-UA'
  },
  ae_ar: {
    ietf: 'ar-ae'
  },
  sa_ar: {
    ietf: 'ar-sa'
  },
  za: {
    ietf: 'en-ZA'
  },
  // Asia Pacific
  au: {
    ietf: 'en-AU'
  },
  hk_en: {
    ietf: 'en-HK'
  },
  in: {
    ietf: 'en-in'
  },
  id_id: {
    ietf: 'id-id'
  },
  id_en: {
    ietf: 'en-id'
  },
  my_ms: {
    ietf: 'ms-my'
  },
  my_en: {
    ietf: 'en-my'
  },
  nz: {
    ietf: 'en-nz'
  },
  ph_en: {
    ietf: 'en-ph'
  },
  ph_fil: {
    ietf: 'fil-PH'
  },
  sg: {
    ietf: 'en-SG'
  },
  th_en: {
    ietf: 'en-th'
  },
  in_hi: {
    ietf: 'hi-in'
  },
  th_th: {
    ietf: 'th-th'
  },
  cn: {
    ietf: 'zh-CN'
  },
  hk_zh: {
    ietf: 'zh-HK'
  },
  tw: {
    ietf: 'zh-TW'
  },
  jp: {
    ietf: 'ja-JP'
  },
  kr: {
    ietf: 'ko-KR'
  },
  vn_en: {
    ietf: 'en-vn'
  },
  vn_vi: {
    ietf: 'vi-VN'
  }
};
globalFooter.getConfig();

function _catch$1(body, recover) {
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
const CAAS_TAG_URL = 'https://www.adobe.com/chimera-api/tags';
const _iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
function _settle(pact, state, value) {
  if (!pact.s) {
    if (value instanceof _Pact) {
      if (value.s) {
        if (state & 1) {
          state = value.s;
        }
        value = value.v;
      } else {
        value.o = _settle.bind(null, pact, state);
        return;
      }
    }
    if (value && value.then) {
      value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
      return;
    }
    pact.s = state;
    pact.v = value;
    const observer = pact.o;
    if (observer) {
      observer(pact);
    }
  }
}
const _Pact = /*#__PURE__*/function () {
  function _Pact() {}
  _Pact.prototype.then = function (onFulfilled, onRejected) {
    const result = new _Pact();
    const state = this.s;
    if (state) {
      const callback = state & 1 ? onFulfilled : onRejected;
      if (callback) {
        try {
          _settle(result, 1, callback(this.v));
        } catch (e) {
          _settle(result, 2, e);
        }
        return result;
      } else {
        return this;
      }
    }
    this.o = function (_this) {
      try {
        const value = _this.v;
        if (_this.s & 1) {
          _settle(result, 1, onFulfilled ? onFulfilled(value) : value);
        } else if (onRejected) {
          _settle(result, 1, onRejected(value));
        } else {
          _settle(result, 2, value);
        }
      } catch (e) {
        _settle(result, 2, e);
      }
    };
    return result;
  };
  return _Pact;
}();
function _isSettledPact(thenable) {
  return thenable instanceof _Pact && thenable.s & 1;
}
function _forTo(array, body, check) {
  var i = -1,
    pact,
    reject;
  function _cycle(result) {
    try {
      while (++i < array.length && (!check || !check())) {
        result = body(i);
        if (result && result.then) {
          if (_isSettledPact(result)) {
            result = result.v;
          } else {
            result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
            return;
          }
        }
      }
      if (pact) {
        _settle(pact, 1, result);
      } else {
        pact = result;
      }
    } catch (e) {
      _settle(pact || (pact = new _Pact()), 2, e);
    }
  }
  _cycle();
  return pact;
}
const HLX_ADMIN_STATUS = 'https://admin.hlx.page/status';
function _forOf(target, body, check) {
  if (typeof target[_iteratorSymbol] === "function") {
    var iterator = target[_iteratorSymbol](),
      step,
      pact,
      reject;
    function _cycle(result) {
      try {
        while (!(step = iterator.next()).done && (!check || !check())) {
          result = body(step.value);
          if (result && result.then) {
            if (_isSettledPact(result)) {
              result = result.v;
            } else {
              result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
              return;
            }
          }
        }
        if (pact) {
          _settle(pact, 1, result);
        } else {
          pact = result;
        }
      } catch (e) {
        _settle(pact || (pact = new _Pact()), 2, e);
      }
    }
    _cycle();
    if (iterator.return) {
      var _fixup = function (value) {
        try {
          if (!step.done) {
            iterator.return();
          }
        } catch (e) {}
        return value;
      };
      if (pact && pact.then) {
        return pact.then(_fixup, function (e) {
          throw _fixup(e);
        });
      }
      _fixup();
    }
    return pact;
  }
  // No support for Symbol.iterator
  if (!("length" in target)) {
    throw new TypeError("Object is not iterable");
  }
  // Handle live collections properly
  var values = [];
  for (var i = 0; i < target.length; i++) {
    values.push(target[i]);
  }
  return _forTo(values, function (i) {
    return body(values[i]);
  }, check);
}
const URL_POSTXDM = 'https://14257-milocaasproxy.adobeio-static.net/api/v1/web/milocaas/postXDM';
const VALID_URL_RE = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
const VALID_MODAL_RE = /fragments(.*)#[a-zA-Z0-9_-]+$/;
const isKeyValPair = /(\s*\S+\s*:\s*\S+\s*)/;
const isValidUrl = u => VALID_URL_RE.test(u);
const isValidModal = u => VALID_MODAL_RE.test(u);
const [setConfig, getConfig] = (() => {
  let config = {
    isInjectedDoc: () => undefined.doc !== document,
    doc: document
  };
  return [c => {
    config = {
      ...config,
      ...c
    };
    return config;
  }, () => config];
})();
const getKeyValPairs = s => {
  if (!s) return [];
  return s.split(',').filter(v => v.length).filter(v => isKeyValPair.test(v)).map(v => {
    const [key, ...value] = v.split(':');
    return {
      key: key.trim(),
      value: value.join(':').trim()
    };
  });
};
const addHost = url => {
  if (url.startsWith('http')) return url;
  const {
    host
  } = getConfig();
  return `https://${host}${url.startsWith('/') ? '' : '/'}${url}`;
};
const getMetaContent = (propType, propName) => {
  const metaEl = getConfig().doc.querySelector(`meta[${propType}='${propName}']`);
  if (!metaEl) return undefined;
  return metaEl.content;
};
const prefixHttps = url => {
  if (!(url?.startsWith('https://') || url?.startsWith('http://'))) {
    return `https://${url}`;
  }
  return url;
};
const flattenLink = link => {
  const htmlElement = document.createElement('div');
  htmlElement.innerHTML = link;
  return htmlElement.querySelector('a').getAttribute('href');
};
const checkUrl = (url, errorMsg) => {
  if (url === undefined || isValidModal(url)) return url;
  const flatUrl = url.includes('href=') ? flattenLink(url) : url;
  if (isValidModal(flatUrl)) {
    return flatUrl;
  }
  return isValidUrl(flatUrl) ? prefixHttps(flatUrl) : {
    error: errorMsg
  };
};

// Case-insensitive search through tag name, path, id and title for the searchStr
const findTag = (tags, searchStr, ignore = []) => {
  const childTags = [];
  let matchingTag = Object.values(tags).find(tag => {
    if (ignore.includes(tag.title) || ignore.includes(tag.name) || ignore.includes(tag.path) || ignore.includes(tag.tagID)) return false;
    if (tag.tags && Object.keys(tag.tags).length) {
      childTags.push(tag.tags);
    }
    const tagMatches = [tag.title.toLowerCase(), tag.name, tag.path, tag.path.replace('/content/cq:tags/', ''), tag.tagID];
    if (tagMatches.includes(searchStr.toLowerCase())) return true;
    return false;
  });
  if (!matchingTag) {
    childTags.some(childTag => {
      matchingTag = findTag(childTag, searchStr, ignore);
      return matchingTag;
    });
  }
  return matchingTag;
};
const [getCaasTags, loadCaasTags] = (() => {
  let tags;
  return [() => tags, function () {
    try {
      let _exit;
      function _temp2(_result) {
        return _exit ? _result : Promise.resolve(Promise.resolve().then(function () { return require('./caas-tags-7f716e6d.js'); })).then(function ({
          default: caasTags
        }) {
          tags = caasTags.namespaces.caas.tags;
        });
      }
      const _temp = _catch$1(function () {
        return Promise.resolve(fetch(CAAS_TAG_URL)).then(function (resp) {
          return function () {
            if (resp.ok) {
              return Promise.resolve(resp.json()).then(function (json) {
                tags = json.namespaces.caas.tags;
                _exit = 1;
              });
            }
          }();
        });
      }, function () {});
      return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
    } catch (e) {
      return Promise.reject(e);
    }
  }];
})();
const getTag = (tagName, errors) => {
  if (!tagName) return undefined;
  const caasTags = getCaasTags();
  // search all except Events first
  const tag = findTag(caasTags, tagName, ['Events']) || findTag(caasTags.events.tags, tagName, []);
  if (!tag) {
    errors.push(tagName);
  }
  return tag;
};
const getTags = s => {
  let rawTags = [];
  if (s) {
    rawTags = s.toLowerCase().split(/,|(\s+)|(\\n)|;/g).filter(t => t && t.trim() && t !== '\n');
  }
  const errors = [];
  const tagIds = rawTags.map(tag => getTag(tag, errors)).filter(tag => tag !== undefined).map(tag => tag.tagID);
  const tags = [...new Set(tagIds)].map(tagID => ({
    id: tagID
  }));
  return {
    tagErrors: errors,
    tags
  };
};
const getDateProp = (dateStr, errorMsg) => {
  if (!dateStr) return undefined;
  try {
    const date = new Date(dateStr);
    if (date.getFullYear() < 2000) return {
      error: `${errorMsg} - Date is before the year 2000`
    };
    return date.toISOString();
  } catch (e) {
    return {
      error: errorMsg
    };
  }
};
const processRepoForFloodgate = (repo, fgColor) => {
  if (repo && fgColor && fgColor !== 'default') {
    return repo.slice(0, repo.lastIndexOf(`-${fgColor}`));
  }
  return repo;
};
const getOrigin = fgColor => {
  const {
    project,
    repo
  } = getConfig();
  const origin = project || processRepoForFloodgate(repo, fgColor);
  const mappings = {
    cc: 'hawks',
    dc: 'doccloud'
  };
  const originLC = (mappings[origin] || origin).toLowerCase();
  if (originLC) {
    return originLC;
  }
  if (window.location.hostname.endsWith('.hlx.page')) {
    const [, singlePageRepo] = window.location.hostname.split('.')[0].split('--');
    return processRepoForFloodgate(singlePageRepo, fgColor);
  }
  throw new Error('No Project or Repo defined in config');
};
const getUrlWithoutFile = url => `${url.split('/').slice(0, -1).join('/')}/`;
const getImagePathMd = keyName => {
  const mdEl = getConfig().doc.querySelector('.card-metadata');
  if (!mdEl) return null;
  let url = '';
  [...mdEl.children].some(n => {
    const key = n.firstElementChild.textContent?.trim().toLowerCase();
    if (key !== keyName) return false;
    const img = n.lastElementChild.querySelector('img');
    if (img) {
      let imgSrc = img.src;
      if (getConfig().bulkPublish) {
        const rawImgSrc = img.attributes.src.value;
        if (rawImgSrc.startsWith('./')) {
          const urlWithoutFile = getUrlWithoutFile(getConfig().pageUrl);
          imgSrc = `${urlWithoutFile}${rawImgSrc}`;
        } else if (rawImgSrc.startsWith('/')) {
          imgSrc = `${new URL(getConfig.pageUrl.origin)}${rawImgSrc}`;
        } else {
          imgSrc = rawImgSrc;
        }
      }
      url = new URL(imgSrc)?.pathname;
    } else {
      // url string to img
      url = n.lastElementChild.textContent?.trim();
    }
    return true;
  });
  return url;
};
const getCardImageUrl = () => {
  const {
    doc
  } = getConfig();
  const imageUrl = getImagePathMd('image') || getImagePathMd('cardimage') || getImagePathMd('cardimagepath') || doc.querySelector('main')?.querySelector('img')?.src.replace(/\?.*/, '') || doc.querySelector('meta[property="og:image"]')?.content;
  if (!imageUrl) return null;
  return addHost(imageUrl);
};
const getCardImageAltText = () => {
  // eslint-disable-next-line no-use-before-define
  const pageMd = parseCardMetadata();
  if (pageMd.cardimage) return '';
  const cardImageUrl = getCardImageUrl();
  const cardImagePath = new URL(cardImageUrl).pathname.split('/').pop();
  const imgTagForCardImage = getConfig().doc.querySelector(`img[src*="${cardImagePath}"]`);
  return imgTagForCardImage?.alt;
};
const getBadges = p => {
  const badges = [];
  if (p.badgeimage) {
    badges.push({
      type: 'image',
      value: addHost(p.badgeimage)
    });
  }
  if (p.badgetext) {
    badges.push({
      type: 'text',
      value: p.badgetext
    });
  }
  return badges;
};
const isPagePublished = function () {
  try {
    let {
      branch,
      repo,
      owner
    } = getConfig();
    if (!(branch || repo || owner) && window.location.hostname.endsWith('.hlx.page')) {
      [branch, repo, owner] = window.location.hostname.split('.')[0].split('--');
    }
    if (!(branch || repo || owner)) {
      throw new Error(`Branch, Repo or Owner is not set - branch: ${branch}, repo: ${repo}, owner: ${owner}`);
    }
    return Promise.resolve(fetch(`${HLX_ADMIN_STATUS}/${owner}/${repo}/${branch}${window.location.pathname}`)).then(function (res) {
      let _exit2;
      const _temp4 = function () {
        if (res.ok) {
          return Promise.resolve(res.json()).then(function (json) {
            const _temp3 = json.live.status === 200;
            _exit2 = 1;
            return _temp3;
          });
        }
      }();
      return _temp4 && _temp4.then ? _temp4.then(function (_result3) {
        return _exit2 ? _result3 : false;
      }) : _exit2 ? _temp4 : false;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const getBulkPublishLangAttr = function (options) {
  try {
    function _temp6() {
      return getLocale(LOCALES, options.prodUrl).ietf;
    }
    let {
      getLocale
    } = getConfig();
    const _temp5 = function () {
      if (!getLocale) {
        // This is only imported from the bulk publisher so there is no dependency cycle
        // eslint-disable-next-line import/no-cycle
        return Promise.resolve(Promise.resolve().then(function () { return require('./global-footer-26f98613.js'); }).then(function (n) { return n.utils; })).then(function ({
          getLocale: utilsGetLocale
        }) {
          getLocale = utilsGetLocale;
          setConfig({
            getLocale
          });
        });
      }
    }();
    return Promise.resolve(_temp5 && _temp5.then ? _temp5.then(_temp6) : _temp6(_temp5));
  } catch (e) {
    return Promise.reject(e);
  }
};
const getCountryAndLang = function (options) {
  try {
    function _temp8(langStr) {
      const langAttr = langStr?.toLowerCase().split('-') || [];
      const [lang = 'en', country = 'us'] = langAttr;
      return {
        country,
        lang
      };
    }
    const _temp7 = window.location.pathname === '/tools/send-to-caas/bulkpublisher.html';
    return Promise.resolve(_temp7 ? Promise.resolve(getBulkPublishLangAttr(options)).then(_temp8) : _temp8((LOCALES[window.location.pathname.split('/')[1]] || LOCALES['']).ietf));
  } catch (e) {
    return Promise.reject(e);
  }
};
const parseCardMetadata = () => {
  const pageMd = {};
  const marqueeMetadata = getConfig().doc.querySelector('.caas-marquee-metadata');
  const cardMetadata = getConfig().doc.querySelector('.card-metadata');
  const mdEl = cardMetadata || marqueeMetadata;
  const allowHtml = ['description'];
  if (mdEl) {
    mdEl.childNodes.forEach(n => {
      const key = n.children?.[0]?.textContent?.toLowerCase();
      let val = n.children?.[1]?.textContent;
      if (marqueeMetadata && allowHtml.includes(key)) {
        val = n.children?.[1]?.innerHTML;
      }
      if (!key) return;
      pageMd[key] = val;
    });
  }
  return pageMd;
};
function checkCtaUrl(s, options, i) {
  if (s?.trim() === '') return '';
  const url = s || options.prodUrl || window.location.origin + window.location.pathname;
  return checkUrl(url, `Invalid Cta${i}Url: ${url}`);
}

/** card metadata props - either a func that computes the value or
 * 0 to use the string as is
 * funcs that return an object with { error: string } will report the error
 */
const props = {
  arbitrary: s => getKeyValPairs(s).map(pair => ({
    key: pair.key,
    value: pair.value
  })),
  badgeimage: () => getImagePathMd('badgeimage'),
  badgetext: 0,
  bookmarkaction: 0,
  bookmarkenabled: (s = '') => {
    if (s) {
      const lcs = s.toLowerCase();
      if (lcs === 'true' || lcs === 'on' || lcs === 'yes') {
        return true;
      }
    }
    return undefined;
  },
  bookmarkicon: 0,
  carddescription: 0,
  cardtitle: 0,
  cardimage: () => getCardImageUrl(),
  cardimagealttext: s => s || getCardImageAltText(),
  contentid: (_, options) => getUuid(options.prodUrl),
  contenttype: s => s || getMetaContent('property', 'og:type') || getConfig().contentType,
  country: function (s, options) {
    return s ? Promise.resolve(s) : Promise.resolve(getCountryAndLang(options)).then(function ({
      country
    }) {
      return country;
    });
  },
  created: s => {
    if (s) {
      return getDateProp(s, `Invalid Created Date: ${s}`);
    }
    const cardDate = parseCardMetadata()?.carddate;
    if (cardDate) {
      return getDateProp(cardDate, `Invalid Date: ${cardDate}`);
    }
    const pubDate = getMetaContent('name', 'publishdate') || getMetaContent('name', 'publication-date');
    const {
      doc,
      lastModified
    } = getConfig();
    return pubDate ? getDateProp(pubDate, `publication-date metadata is not a valid date: ${pubDate}`) : getDateProp(lastModified || doc.lastModified, `document.lastModified is not a valid date: ${doc.lastModified}`);
  },
  cta1icon: s => checkUrl(s, `Invalid Cta1Icon url: ${s}`),
  cta1style: 0,
  cta1target: 0,
  cta1text: 0,
  cta1url: (s, options) => checkCtaUrl(s, options, 1),
  cta2icon: s => checkUrl(s, `Invalid Cta2Icon url: ${s}`),
  cta2style: 0,
  cta2target: 0,
  cta2text: 0,
  cta2url: s => checkCtaUrl(s, {}, 2),
  description: s => s || getMetaContent('name', 'description') || '',
  details: 0,
  entityid: (_, options) => {
    const floodGateColor = options.floodgatecolor || globalFooter.getMetadata('floodgatecolor') || '';
    const salt = floodGateColor === 'default' || floodGateColor === '' ? '' : floodGateColor;
    return getUuid(`${options.prodUrl}${salt}`);
  },
  env: s => s || '',
  eventduration: 0,
  eventend: s => getDateProp(s, `Invalid Event End Date: ${s}`),
  eventstart: s => getDateProp(s, `Invalid Event Start Date: ${s}`),
  floodgatecolor: (s, options) => s || options.floodgatecolor || globalFooter.getMetadata('floodgatecolor') || 'default',
  lang: function (s, options) {
    return s ? Promise.resolve(s) : Promise.resolve(getCountryAndLang(options)).then(function ({
      lang
    }) {
      return lang;
    });
  },
  modified: s => {
    const {
      doc,
      lastModified
    } = getConfig();
    return s ? getDateProp(s, `Invalid Modified Date: ${s}`) : getDateProp(lastModified || doc.lastModified, `document.lastModified is not a valid date: ${doc.lastModified}`);
  },
  origin: (s, options) => {
    if (s) return s;
    const fgColor = options.floodgatecolor || globalFooter.getMetadata('floodgatecolor');
    return getOrigin(fgColor);
  },
  playurl: s => checkUrl(s, `Invalid PlayURL: ${s}`),
  primarytag: s => {
    const tag = getTag(s);
    return tag ? {
      id: tag.tagID
    } : {};
  },
  style: s => s || 'default',
  tags: s => getTags(s),
  title: s => s || getMetaContent('property', 'og:title') || '',
  uci: (s, options) => s || options.prodUrl || window.location.pathname,
  url: (s, options) => {
    const url = s || options.prodUrl || window.location.origin + window.location.pathname;
    return checkUrl(url, `Invalid URL: ${url}`);
  }
};

// Map the flat props into the structure needed by CaaS
const getCaasProps = p => {
  const caasProps = {
    entityId: p.entityid,
    contentId: p.contentid,
    contentType: p.contenttype,
    environment: p.env,
    url: p.url,
    floodGateColor: p.floodgatecolor,
    universalContentIdentifier: p.uci,
    title: p.cardtitle || p.title,
    description: p.carddescription || p.description,
    createdDate: p.created,
    modifiedDate: p.modified,
    tags: p.tags,
    primaryTag: p.primarytag,
    ...(p.cardimage && {
      thumbnail: {
        altText: p.cardimagealttext,
        url: p.cardimage
      }
    }),
    country: p.country,
    language: p.lang,
    cardData: {
      style: p.style,
      headline: p.cardtitle || p.title,
      ...(p.details && {
        details: p.details
      }),
      ...((p.bookmarkenabled || p.bookmarkicon || p.bookmarkaction) && {
        bookmark: {
          enabled: p.bookmarkenabled,
          bookmarkIcon: p.bookmarkicon,
          action: p.bookmarkaction
        }
      }),
      badges: getBadges(p),
      ...(p.playurl && {
        playUrl: p.playurl
      }),
      ...((p.cta1url || p.cta2url) && {
        cta: {
          ...(p.cta1url && {
            primaryCta: {
              text: p.cta1text,
              url: p.cta1url,
              style: p.cta1style,
              icon: p.cta1icon,
              target: p.cta1target
            }
          }),
          ...(p.cta2url && {
            secondaryCta: {
              text: p.cta2text,
              url: p.cta2url,
              style: p.cta2style,
              icon: p.cta2icon,
              target: p.cta2target
            }
          })
        }
      }),
      ...((p.eventduration || p.eventstart || p.eventend) && {
        event: {
          duration: p.eventduration,
          startDate: p.eventstart,
          endDate: p.eventend
        }
      })
    },
    origin: p.origin,
    ...(p.arbitrary?.length && {
      arbitrary: p.arbitrary
    })
  };
  return caasProps;
};
const getCaaSMetadata = function (pageMd, options) {
  try {
    function _temp11() {
      if (!md.contenttype && tags.length) {
        md.contenttype = tags.find(tag => tag.startsWith('caas:content-type'));
      }
      return {
        caasMetadata: md,
        errors,
        tags,
        tagErrors
      };
    }
    const md = {};
    const errors = [];
    let tagErrors = [];
    let tags = [];
    // for-of required to await any async computeVal's
    const _temp10 = _forOf(Object.entries(props), function ([key, computeFn]) {
      function _temp9(val) {
        if (val?.error) {
          errors.push(val.error);
        } else if (val?.tagErrors !== undefined) {
          tagErrors = val.tagErrors;
          md[key] = val.tags;
          tags = val.tags.map(t => t.id);
        } else if (val !== undefined) {
          md[key] = val;
        }
      }
      return computeFn ? Promise.resolve(computeFn(pageMd[key], options)).then(_temp9) : _temp9(pageMd[key]);
    });
    return Promise.resolve(_temp10 && _temp10.then ? _temp10.then(_temp11) : _temp11(_temp10));
  } catch (e) {
    return Promise.reject(e);
  }
};
const getCardMetadata = function (options) {
  try {
    const pageMd = parseCardMetadata();
    return getCaaSMetadata(pageMd, options);
  } catch (e) {
    return Promise.reject(e);
  }
};
const postDataToCaaS = function ({
  accessToken,
  caasEnv,
  caasProps,
  draftOnly
}) {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(caasProps),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        draft: !!draftOnly,
        'caas-env': caasEnv
      }
    };
    let response;
    return Promise.resolve(fetch(URL_POSTXDM, options)).then(function (res) {
      const _temp12 = function () {
        if (res !== undefined) {
          return Promise.resolve(res.text()).then(function (text) {
            try {
              response = JSON.parse(text);
            } catch {
              response = text;
            }
          });
        }
      }();
      return _temp12 && _temp12.then ? _temp12.then(function () {
        return response;
      }) : response;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

/* eslint-disable new-cap */
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
const [setPublishingTrue, setPublishingFalse, isPublishing] = (() => {
  let publishing = false;
  return [() => {
    publishing = true;
  }, () => {
    publishing = false;
  }, () => publishing];
})();

// Tingle is the js library for displaying modals
const loadTingleModalFiles = function (loadScript, loadStyle) {
  try {
    const _temp = function () {
      if (!window.tingle?.modal) {
        return Promise.resolve(Promise.all([loadScript('https://milo.adobe.com/libs/deps/tingle.js'), loadStyle('https://milo.adobe.com/libs/deps/tingle.css')])).then(function () {});
      }
    }();
    return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
  } catch (e) {
    return Promise.reject(e);
  }
};
const showAlert = (msg, {
  error = false,
  onClose,
  showBtn = true,
  btnText = 'OK'
} = {}) => {
  const modal = new tingle.modal({
    footer: true,
    closeMethods: ['overlay', 'escape'],
    onClose() {
      if (onClose) {
        onClose();
      }
      this.destroy();
    }
  });
  let msgContent = msg;
  if (error) {
    // show alert icon
    msgContent = `<div class="modal-error"><div class="modal-alert"></div><div>${msg}</div></div>`;
  }
  modal.setContent(msgContent);
  if (showBtn) {
    modal.addFooterBtn(btnText, 'tingle-btn tingle-btn--primary tingle-btn--pull-right', () => modal.close());
  }
  modal.open();
  return modal;
};
const showConfirm = (msg, {
  onClose,
  cssClass = [],
  ctaBtnType = 'primary',
  ctaText = 'OK',
  cancelBtnType = 'default',
  cancelText = 'Cancel',
  footerContent = '',
  initCode,
  leftButton
} = {}) => new Promise(resolve => {
  let ok = false;
  const modal = new tingle.modal({
    cssClass,
    footer: true,
    closeMethods: ['escape'],
    onClose() {
      if (onClose) onClose(this);
      this.destroy();
      resolve(ok);
    }
  });
  modal.setContent(msg);
  if (footerContent) {
    modal.setFooterContent(footerContent);
  }
  if (ctaText) {
    modal.addFooterBtn(ctaText, `tingle-btn tingle-btn--${ctaBtnType} tingle-btn--pull-right`, () => {
      ok = true;
      modal.close();
    });
  }
  modal.addFooterBtn(cancelText, `tingle-btn tingle-btn--${cancelBtnType} tingle-btn--pull-right`, () => {
    ok = false;
    modal.close();
  });
  if (leftButton) {
    modal.addFooterBtn(leftButton.text, 'tingle-btn tingle-btn--default tingle-btn--pull-left', () => {
      leftButton.callback?.();
    });
  }
  if (initCode) initCode(modal.modal);
  modal.open();
});
const displayPublishingModal = () => {
  const publishingModal = new tingle.modal({
    closeMethods: [],
    cssClass: ['modal-text-align-center'],
    onClose() {
      this.destroy();
    }
  });
  publishingModal.setContent('Publishing to CaaS...');
  publishingModal.open();
  return publishingModal;
};
const verifyInfoModal = function (tags, tagErrors, showAllPropertiesAlert) {
  try {
    function _temp4() {
      return {
        caasEnv,
        draftOnly,
        okToContinue,
        useHtml
      };
    }
    let okToContinue = false;
    let draftOnly = false;
    let useHtml = false;
    let caasEnv;
    const seeAllPropsBtn = {
      text: 'See all properties',
      callback: showAllPropertiesAlert
    };
    const footerOptions = `
    <div class="verify-info-footer">
      <div class="caas-env">
        <label for="caas-env-select">CaaS Env</label>
        <select name="1A" id="caas-env-select">
          <option>Prod</option>
          <option>Stage</option>
          <option>Dev</option>
        </select>
      </div>
      <div id="caas-draft-cb">
        <input type="checkbox" id="draftcb" name="draftcb">
        <label for="draftcb">Publish to Draft only</label>
      </div>
      <div id="caas-use-html-cb" class="field checkbox">
        <input type="checkbox" id="usehtml" name="usehtml">
        <label for="usehtml">Use .html extension</label>
      </div>
    </div>`;
    const onClose = () => {
      caasEnv = document.getElementById('caas-env-select')?.value?.toLowerCase();
      draftOnly = document.getElementById('draftcb')?.checked;
      useHtml = document.getElementById('usehtml')?.checked;
    };
    const modalInit = modal => {
      const caasEnvSelect = modal.querySelector('#caas-env-select');
      const caasEnvVal = caasEnvSelect.value?.toLowerCase();
      const useHtmlCb = modal.querySelector('#usehtml');
      if (caasEnvVal === 'prod') {
        useHtmlCb.checked = true;
      }
      caasEnvSelect.addEventListener('change', e => {
        useHtmlCb.checked = e.target.value?.toLowerCase() === 'prod';
      });
    };
    const _temp3 = function () {
      if (!tags.length) {
        const msg = '<div><p><b>No Tags found on page</b></p><p>Please add at least one tag to the Card Metadata</p></div>';
        return Promise.resolve(showConfirm(msg, {
          cssClass: ['verify-info-modal'],
          ctaText: '',
          cancelBtnType: 'danger',
          cancelText: 'Cancel Registration',
          footerContent: footerOptions,
          leftButton: seeAllPropsBtn,
          onClose
        })).then(function (_showConfirm) {
          okToContinue = _showConfirm;
        });
      } else {
        const _temp2 = function () {
          if (tagErrors.length) {
            const msg = ['<div class="">', '<p><b>The following tags were not found:</b></p>', tagErrors.join('<br>'), '<p><b>Ok to publish without those tags defined?</b></p>', '<p>The following tags will be used:</p>', tags.join('<br>'), '</div>'].join('');
            return Promise.resolve(showConfirm(msg, {
              cssClass: ['verify-info-modal'],
              ctaText: 'Publish with missing tags',
              cancelBtnType: 'grey',
              cancelText: 'Cancel Registration',
              ctaBtnType: 'danger',
              footerContent: footerOptions,
              initCode: modalInit,
              leftButton: seeAllPropsBtn,
              onClose
            })).then(function (_showConfirm2) {
              okToContinue = _showConfirm2;
            });
          } else {
            const msg = ['<div><p><b>The following tags will be used:</b></p>', tags.join('<br>'), '<p><b>Please verify that these are correct.</b></p></div>'].join('');
            return Promise.resolve(showConfirm(msg, {
              cssClass: ['verify-info-modal'],
              cancelBtnType: 'grey',
              cancelText: 'Cancel Registration',
              ctaText: 'Continue with these tags',
              footerContent: footerOptions,
              initCode: modalInit,
              leftButton: seeAllPropsBtn,
              onClose
            })).then(function (_showConfirm3) {
              okToContinue = _showConfirm3;
            });
          }
        }();
        if (_temp2 && _temp2.then) return _temp2.then(function () {});
      }
    }();
    return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3));
  } catch (e) {
    return Promise.reject(e);
  }
};
const isUseHtmlChecked = () => document.getElementById('usehtml')?.checked;
const sortObjByPropName = obj => Object.keys(obj)
// eslint-disable-next-line no-return-assign, no-sequences
.sort().reduce((c, d) => (c[d] = obj[d], c), {});
const validateProps = function (prodHost, publishingModal) {
  try {
    return Promise.resolve(getCardMetadata({
      prodUrl: `${prodHost}${window.location.pathname}`
    })).then(function ({
      caasMetadata,
      errors,
      tags,
      tagErrors
    }) {
      const showAllPropertiesAlert = function () {
        try {
          return Promise.resolve(getCardMetadata({
            prodUrl: `${prodHost}${window.location.pathname}${isUseHtmlChecked() ? '.html' : ''}`
          })).then(function ({
            caasMetadata: cMetaData
          }) {
            const mdStr = JSON.stringify(sortObjByPropName(cMetaData), undefined, 4);
            showAlert(`<h3>All CaaS Properties</h3><pre id="json" style="white-space:pre-wrap;font-size:14px;">${mdStr}</pre>`);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      };
      return Promise.resolve(verifyInfoModal(tags, tagErrors, showAllPropertiesAlert)).then(function ({
        draftOnly,
        caasEnv,
        okToContinue,
        useHtml
      }) {
        function _temp6() {
          return {
            caasEnv,
            caasMetadata: metaWithUseHtml || caasMetadata,
            draftOnly
          };
        }
        if (!okToContinue) {
          setPublishingFalse();
          publishingModal.close();
          return false;
        }
        if (errors.length) {
          publishingModal.close();
          const msg = ['<p>There were problems with the following:</p>', errors.join('<br>'), '<p>Publishing to CaaS aborted, please fix errors and try again.</p>'].join('');
          showAlert(msg, {
            error: true,
            onClose: setPublishingFalse
          });
          return false;
        }
        let metaWithUseHtml;
        const _temp5 = function () {
          if (useHtml) {
            return Promise.resolve(getCardMetadata({
              prodUrl: `${prodHost}${window.location.pathname}.html`
            })).then(function (_getCardMetadata) {
              ({
                caasMetadata: metaWithUseHtml
              } = _getCardMetadata);
            });
          }
        }();
        return _temp5 && _temp5.then ? _temp5.then(_temp6) : _temp6(_temp5);
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const checkPublishStatus = function (publishingModal) {
  try {
    let _exit;
    return Promise.resolve(isPagePublished()).then(function (_isPagePublished) {
      if (!_isPagePublished) {
        publishingModal.close();
        showAlert('Page must be published before it can be registered with CaaS.<br>Please publish the page and try again.', {
          error: true
        });
        setPublishingFalse();
        _exit = 1;
        return false;
      }
      return true;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const checkIms = function (publishingModal, loadScript) {
  try {
    return Promise.resolve(getImsToken(loadScript)).then(function (accessToken) {
      let _exit2;
      const _temp7 = function () {
        if (!accessToken) {
          publishingModal.close();
          return Promise.resolve(showConfirm('You must be logged in with an Adobe ID in order to publish to CaaS.\nDo you want to log in?')).then(function (shouldLogIn) {
            if (shouldLogIn) {
              window.adobeIMS.signIn();
            }
            setPublishingFalse();
            _exit2 = 1;
            return false;
          });
        }
      }();
      return _temp7 && _temp7.then ? _temp7.then(function (_result) {
        return _exit2 ? _result : accessToken;
      }) : _exit2 ? _temp7 : accessToken;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const postToCaaS = function ({
  accessToken,
  caasEnv,
  caasProps,
  draftOnly,
  publishingModal
}) {
  try {
    const _temp10 = _catch(function () {
      return Promise.resolve(postDataToCaaS({
        accessToken,
        caasEnv,
        caasProps,
        draftOnly
      })).then(function (response) {
        publishingModal.close();
        const _temp9 = function () {
          if (response.success) {
            showAlert(`<p>Successfully published page to CaaS!<p><p>Card ID: ${caasProps.entityId}</p>`, {
              onClose: setPublishingFalse
            });
          } else {
            const _temp8 = function () {
              if (response.error?.startsWith('Invalid User: Not an Adobe employee')) {
                const msg = 'Please login with your Adobe company account.  Do you want to try logging in again?';
                return Promise.resolve(showConfirm(msg, {
                  cancelBtnType: 'grey',
                  cancelText: 'Cancel',
                  ctaText: 'Login'
                })).then(function (shouldLogIn) {
                  setPublishingFalse();
                  if (shouldLogIn) window.adobeIMS.signIn();
                });
              } else {
                showAlert(response.message || response.error || JSON.stringify(response), {
                  error: true,
                  onClose: setPublishingFalse
                });
              }
            }();
            if (_temp8 && _temp8.then) return _temp8.then(function () {});
          }
        }();
        if (_temp9 && _temp9.then) return _temp9.then(function () {});
      });
    }, function (e) {
      publishingModal.close();
      setPublishingFalse();
      showAlert(`Error posting to CaaS:<br>${e.message}`, {
        error: true
      });
    });
    return Promise.resolve(_temp10 && _temp10.then ? _temp10.then(function () {}) : void 0);
  } catch (e) {
    return Promise.reject(e);
  }
};
const noop = () => {};
const sendToCaaS = function ({
  host = '',
  project = '',
  branch = '',
  repo = '',
  owner = ''
} = {}, loadScript = noop, loadStyle = noop) {
  try {
    if (isPublishing()) return Promise.resolve();
    return Promise.resolve(loadTingleModalFiles(loadScript, loadStyle)).then(function () {
      if (window.adobeid?.environment !== 'prod') {
        showAlert('Send to CaaS needs to reload the page with prod IMS setup.  Please try again after reload.', {
          onClose: () => {
            const url = new URL(window.location);
            url.searchParams.append('env', 'prod');
            window.location.assign(url);
          }
        });
        return;
      }
      setConfig({
        host: host || window.location.host,
        project,
        branch,
        repo,
        owner,
        doc: document
      });
      loadStyle('https://milo.adobe.com/tools/send-to-caas/send-to-caas.css');
      setPublishingTrue();
      const publishingModal = displayPublishingModal();
      return _catch(function () {
        if (!host) throw new Error('host must be specified');
        return Promise.resolve(loadCaasTags()).then(function () {
          return Promise.resolve(validateProps(host, publishingModal)).then(function ({
            caasEnv,
            caasMetadata,
            draftOnly
          }) {
            if (!caasMetadata) return;
            return Promise.resolve(checkPublishStatus(publishingModal)).then(function (isPublished) {
              if (!isPublished) return;
              return Promise.resolve(checkIms(publishingModal, loadScript)).then(function (accessToken) {
                if (!accessToken) return;
                const caasProps = getCaasProps(caasMetadata);
                postToCaaS({
                  accessToken,
                  caasEnv,
                  caasProps,
                  draftOnly,
                  publishingModal
                });
              });
            });
          });
        });
      }, function (e) {
        setPublishingFalse();
        publishingModal.close();
        showAlert(`ERROR: ${e.message}`, {
          error: true
        });
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

exports.loadTingleModalFiles = loadTingleModalFiles;
exports.sendToCaaS = sendToCaaS;
exports.showAlert = showAlert;
exports.showConfirm = showConfirm;
//# sourceMappingURL=send-to-caas-d58a79a7.js.map
