import { g as getConfig, e as loadScript, u as updateConfig, _ as _createForOfIteratorHelper, f as loadLink, c as createTag, l as localizeLink } from './global-footer-92adaea3.js';
import { getEntitlementMap } from './entitlements-8d8707ce.js';

/* c8 ignore start */

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
function _for(test, update, body) {
  var stage;
  for (;;) {
    var shouldContinue = test();
    if (_isSettledPact(shouldContinue)) {
      shouldContinue = shouldContinue.v;
    }
    if (!shouldContinue) {
      return result;
    }
    if (shouldContinue.then) {
      stage = 0;
      break;
    }
    var result = body();
    if (result && result.then) {
      if (_isSettledPact(result)) {
        result = result.s;
      } else {
        stage = 1;
        break;
      }
    }
    if (update) {
      var updateValue = update();
      if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
        stage = 2;
        break;
      }
    }
  }
  var pact = new _Pact();
  var reject = _settle.bind(null, pact, 2);
  (stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
  return pact;
  function _resumeAfterBody(value) {
    result = value;
    do {
      if (update) {
        updateValue = update();
        if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
          updateValue.then(_resumeAfterUpdate).then(void 0, reject);
          return;
        }
      }
      shouldContinue = test();
      if (!shouldContinue || _isSettledPact(shouldContinue) && !shouldContinue.v) {
        _settle(pact, 1, result);
        return;
      }
      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
        return;
      }
      result = body();
      if (_isSettledPact(result)) {
        result = result.v;
      }
    } while (!result || !result.then);
    result.then(_resumeAfterBody).then(void 0, reject);
  }
  function _resumeAfterTest(shouldContinue) {
    if (shouldContinue) {
      result = body();
      if (result && result.then) {
        result.then(_resumeAfterBody).then(void 0, reject);
      } else {
        _resumeAfterBody(result);
      }
    } else {
      _settle(pact, 1, result);
    }
  }
  function _resumeAfterUpdate() {
    if (shouldContinue = test()) {
      if (shouldContinue.then) {
        shouldContinue.then(_resumeAfterTest).then(void 0, reject);
      } else {
        _resumeAfterTest(shouldContinue);
      }
    } else {
      _settle(pact, 1, result);
    }
  }
}
const _iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
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
const applyPers = function (manifests, postLCP = false) {
  try {
    return Promise.resolve(_catch(function () {
      function _temp9() {
        function _temp7() {
          results = results.filter(Boolean);
          config.mep.experiments ??= [];
          config.mep.experiments = experiments;
          config.mep.blocks = consolidateObjects(results, 'blocks', config.mep.blocks);
          config.mep.fragments = consolidateObjects(results, 'fragments', config.mep.fragments);
          config.mep.commands = consolidateArray(results, 'commands', config.mep.commands);
          if (!postLCP) handleCommands(config.mep.commands);
          deleteMarkedEls();
          const pznList = results.filter(r => r.experiment?.manifestType === TRACKED_MANIFEST_TYPE);
          if (!pznList.length) return;
          const pznVariants = pznList.map(r => {
            const val = r.experiment.selectedVariantName.replace(TARGET_EXP_PREFIX, '').trim().slice(0, 15);
            return val === 'default' ? 'nopzn' : val;
          });
          const pznManifests = pznList.map(r => {
            const val = r.experiment?.manifestOverrideName || r.experiment?.manifest;
            return getFileName(val).replace('.json', '').trim().slice(0, 15);
          });
          config.mep.martech = `|${pznVariants.join('--')}|${pznManifests.join('--')}`;
        }
        experiments = cleanAndSortManifestList(experiments);
        let results = [];
        const _temp6 = _forOf(experiments, function (experiment) {
          return Promise.resolve(categorizeActions(experiment)).then(function (result) {
            if (result) {
              results.push(result);
            }
          });
        });
        return _temp6 && _temp6.then ? _temp6.then(_temp7) : _temp7(_temp6);
      }
      const config = getConfig();
      if (!postLCP) {
        const {
          mep: mepParam,
          mepHighlight,
          mepButton
        } = Object.fromEntries(PAGE_URL.searchParams);
        config.mep = {
          handleFragmentCommand,
          preview: mepButton !== 'off' && (config.env?.name !== 'prod' || mepButton),
          override: mepParam ? decodeURIComponent(mepParam) : '',
          highlight: mepHighlight !== undefined && mepHighlight !== 'false',
          mepParam,
          targetEnabled: config.mep?.targetEnabled
        };
      }
      if (!manifests?.length) return;
      let experiments = manifests;
      let i = 0;
      const _temp8 = _for(function () {
        return i < experiments.length;
      }, function () {
        return !!(i += 1);
      }, function () {
        return Promise.resolve(getPersConfig(experiments[i], config.mep?.override)).then(function (_getPersConfig) {
          experiments[i] = _getPersConfig;
        });
      });
      return _temp8 && _temp8.then ? _temp8.then(_temp9) : _temp9(_temp8);
    }, function (e) {
      console.warn(e);
      window.lana?.log(`MEP Error: ${e.toString()}`);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
const categorizeActions = function (experiment) {
  try {
    function _temp5() {
      selectedVariant.insertscript?.map(script => loadScript(script.val));
      selectedVariant.updatemetadata?.map(metadata => setMetadata(metadata));
      selectedVariant.fragments &&= selectedVariant.fragments.map(normalizeFragPaths);
      return {
        manifestPath,
        experiment,
        blocks: selectedVariant.useblockcode,
        fragments: selectedVariant.fragments,
        commands: selectedVariant.commands
      };
    }
    if (!experiment) return Promise.resolve(null);
    const {
      manifestPath,
      selectedVariant
    } = experiment;
    if (!selectedVariant || selectedVariant === 'default') return Promise.resolve({
      experiment
    });
    const _temp4 = function () {
      if (selectedVariant.replacepage) {
        // only one replacepage can be defined
        return Promise.resolve(replaceInner(selectedVariant.replacepage[0]?.val, document.querySelector('main'))).then(function () {
          document.querySelector('main').dataset.manifestId = manifestPath;
        });
      }
    }();
    return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4));
  } catch (e) {
    return Promise.reject(e);
  }
};
const getPersConfig = function (info, override = false) {
  try {
    function _temp3() {
      const persData = data?.experiences?.data || data?.data || data;
      if (!persData) return null;
      let manifestId = getFileName(manifestPath);
      const globalConfig = getConfig();
      if (!globalConfig.mep?.preview) {
        manifestId = false;
      } else if (name) {
        manifestId = `${name}: ${manifestId}`;
      }
      const config = parseConfig(persData, manifestId);
      if (!config) {
        /* c8 ignore next 3 */
        console.log('Error loading personalization config: ', name || manifestPath);
        return null;
      }
      const infoTab = manifestInfo || data?.info?.data;
      const infoKeyMap = {
        'manifest-type': ['Personalization', 'Promo', 'Test'],
        'manifest-execution-order': ['First', 'Normal', 'Last']
      };
      if (infoTab) {
        const infoObj = infoTab?.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        config.manifestOverrideName = infoObj?.['manifest-override-name']?.toLowerCase();
        config.manifestType = infoObj?.['manifest-type']?.toLowerCase();
        const executionOrder = {
          'manifest-type': 1,
          'manifest-execution-order': 1
        };
        Object.keys(infoObj).forEach(key => {
          if (!infoKeyMap[key]) return;
          const index = infoKeyMap[key].indexOf(infoObj[key]);
          executionOrder[key] = index > -1 ? index : 1;
        });
        config.executionOrder = `${executionOrder['manifest-execution-order']}-${executionOrder['manifest-type']}`;
      } else {
        // eslint-disable-next-line prefer-destructuring
        config.manifestType = infoKeyMap['manifest-type'][1];
        config.executionOrder = '1-1';
      }
      config.manifestPath = normalizePath(manifestPath);
      return Promise.resolve(getPersonalizationVariant(config.manifestPath, config.variantNames, variantLabel)).then(function (selectedVariantName) {
        if (selectedVariantName && config.variantNames.includes(selectedVariantName)) {
          config.run = true;
          config.selectedVariantName = selectedVariantName;
          config.selectedVariant = config.variants[selectedVariantName];
        } else {
          /* c8 ignore next 2 */
          config.selectedVariantName = 'default';
          config.selectedVariant = 'default';
        }
        const placeholders = manifestPlaceholders || data?.placeholders?.data;
        if (placeholders) {
          updateConfig(parsePlaceholders(placeholders, getConfig(), config.selectedVariantName));
        }
        config.name = name;
        config.manifest = manifestPath;
        config.manifestUrl = manifestUrl;
        config.disabled = disabled;
        config.event = event;
        return config;
      });
    }
    const {
      name,
      manifestData,
      manifestPath,
      manifestUrl,
      manifestPlaceholders,
      manifestInfo,
      variantLabel,
      disabled,
      event
    } = info;
    if (disabled && !override) {
      return Promise.resolve(createDefaultExperiment(info));
    }
    let data = manifestData;
    const _temp2 = function () {
      if (!data) {
        return Promise.resolve(fetchData(manifestPath, DATA_TYPE.JSON)).then(function (fetchedData) {
          if (fetchData) data = fetchedData;
        });
      }
    }();
    return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2));
  } catch (e) {
    return Promise.reject(e);
  }
};
const getPersonalizationVariant = function (manifestPath, variantNames = [], variantLabel = null) {
  try {
    const variantInfo = variantNames.reduce((acc, name) => {
      let nameArr = [name];
      if (!name.startsWith(TARGET_EXP_PREFIX)) nameArr = name.split(',');
      const vNames = nameArr.map(v => v.trim()).filter(Boolean);
      acc[name] = vNames;
      acc.allNames = [...acc.allNames, ...vNames];
      return acc;
    }, {
      allNames: []
    });
    return Promise.resolve(getEntitlementMap()).then(function (_getEntitlementMap) {
      function _temp11() {
        const hasMatch = name => {
          if (name === '') return true;
          if (name === variantLabel?.toLowerCase()) return true;
          if (name.startsWith('param-')) return checkForParamMatch(name);
          if (userEntitlements?.includes(name)) return true;
          return PERSONALIZATION_KEYS.includes(name) && PERSONALIZATION_TAGS[name]();
        };
        const matchVariant = name => {
          if (name.startsWith(TARGET_EXP_PREFIX)) return hasMatch(name);
          const processedList = name.split('&').map(condition => {
            const reverse = condition.trim().startsWith(COLUMN_NOT_OPERATOR);
            const match = hasMatch(condition.replace(COLUMN_NOT_OPERATOR, '').trim());
            return reverse ? !match : match;
          });
          return !processedList.includes(false);
        };
        const matchingVariant = variantNames.find(variant => variantInfo[variant].some(matchVariant));
        return matchingVariant;
      }
      const entitlementKeys = Object.values(_getEntitlementMap);
      const hasEntitlementTag = entitlementKeys.some(tag => variantInfo.allNames.includes(tag));
      let userEntitlements = [];
      const _temp10 = function () {
        if (hasEntitlementTag) {
          const config = getConfig();
          return Promise.resolve(config.entitlements()).then(function (_config$entitlements) {
            userEntitlements = _config$entitlements;
          });
        }
      }();
      return _temp10 && _temp10.then ? _temp10.then(_temp11) : _temp11(_temp10);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const replaceInner = function (path, element) {
  try {
    if (!path || !element) return Promise.resolve(false);
    let plainPath = path.endsWith('/') ? `${path}index` : path;
    plainPath = plainPath.endsWith('.plain.html') ? plainPath : `${plainPath}.plain.html`;
    return Promise.resolve(fetchData(plainPath, DATA_TYPE.TEXT)).then(function (html) {
      if (!html) return false;
      element.innerHTML = html;
      const {
        decorateArea
      } = getConfig();
      if (decorateArea) decorateArea(element);
      return true;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
/* c8 ignore stop */
const PHONE_SIZE = window.screen.width < 768 || window.screen.height < 768;
const PERSONALIZATION_TAGS = {
  all: () => true,
  chrome: () => navigator.userAgent.includes('Chrome') && !navigator.userAgent.includes('Edg'),
  firefox: () => navigator.userAgent.includes('Firefox'),
  safari: () => navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome'),
  edge: () => navigator.userAgent.includes('Edg'),
  android: () => navigator.userAgent.includes('Android'),
  ios: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
  windows: () => navigator.userAgent.includes('Windows'),
  mac: () => navigator.userAgent.includes('Macintosh'),
  'mobile-device': () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch/i.test(navigator.userAgent),
  phone: () => PERSONALIZATION_TAGS['mobile-device']() && PHONE_SIZE,
  tablet: () => PERSONALIZATION_TAGS['mobile-device']() && !PHONE_SIZE,
  desktop: () => !PERSONALIZATION_TAGS['mobile-device'](),
  loggedout: () => !window.adobeIMS?.isSignedInUser(),
  loggedin: () => !!window.adobeIMS?.isSignedInUser()
};
const PERSONALIZATION_KEYS = Object.keys(PERSONALIZATION_TAGS);
/* c8 ignore stop */

const CLASS_EL_DELETE = 'p13n-deleted';
const CLASS_EL_REPLACE = 'p13n-replaced';
const COLUMN_NOT_OPERATOR = 'not';
const TARGET_EXP_PREFIX = 'target-';
const INLINE_HASH = '_inline';
const PAGE_URL = new URL(window.location.href);
const TRACKED_MANIFEST_TYPE = 'personalization';

// Replace any non-alpha chars except comma, space, ampersand and hyphen
const RE_KEY_REPLACE = /[^a-z0-9\- _,&=]/g;
const MANIFEST_KEYS = ['action', 'selector', 'pagefilter', 'page filter', 'page filter optional'];
const DATA_TYPE = {
  JSON: 'json',
  TEXT: 'text'
};
const IN_BLOCK_SELECTOR_PREFIX = 'in-block:';
const appendJsonExt = path => path.endsWith('.json') ? path : `${path}.json`;
const normalizePath = (p, localize = true) => {
  let path = p;
  if (!path?.includes('/')) {
    return path;
  }
  const config = getConfig();
  if (path.startsWith(config.codeRoot) || path.includes('.hlx.') || path.includes('.adobe.')) {
    try {
      const url = new URL(path);
      const firstFolder = url.pathname.split('/')[1];
      if (!localize || config.locale.ietf === 'en-US' || url.hash.includes('#_dnt') || firstFolder in config.locales || path.includes('.json')) {
        path = url.pathname;
      } else {
        path = `${config.locale.prefix}${url.pathname}`;
      }
    } catch (e) {/* return path below */}
  } else if (!path.startsWith('http') && !path.startsWith('/')) {
    path = `/${path}`;
  }
  return path;
};
const preloadManifests = ({
  targetManifests = [],
  persManifests = []
}) => {
  let manifests = targetManifests;
  manifests = manifests.concat(persManifests.map(manifest => ({
    ...manifest,
    manifestPath: normalizePath(appendJsonExt(manifest.manifestPath)),
    manifestUrl: manifest.manifestPath
  })));
  var _iterator = _createForOfIteratorHelper(manifests),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const manifest = _step.value;
      if (!manifest.manifestData && manifest.manifestPath && !manifest.disabled) {
        loadLink(manifest.manifestPath, {
          as: 'fetch',
          crossorigin: 'anonymous',
          rel: 'preload'
        });
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return manifests;
};
const getFileName = path => path?.split('/').pop();
const createFrag = (el, url, manifestId) => {
  let href = url;
  try {
    const {
      pathname,
      search,
      hash
    } = new URL(url);
    href = `${pathname}${search}${hash}`;
  } catch {
    // ignore
  }
  const a = createTag('a', {
    href
  }, url);
  if (manifestId) a.dataset.manifestId = manifestId;
  let frag = createTag('p', undefined, a);
  const isSection = el.parentElement.nodeName === 'MAIN';
  if (isSection) {
    frag = createTag('div', undefined, frag);
  }
  loadLink(`${localizeLink(a.href)}.plain.html`, {
    as: 'fetch',
    crossorigin: 'anonymous',
    rel: 'preload'
  });
  return frag;
};
const GLOBAL_CMDS = ['insertscript', 'replacepage', 'updatemetadata', 'useblockcode'];
const CREATE_CMDS = {
  insertafter: 'afterend',
  insertbefore: 'beforebegin',
  prependtosection: 'afterbegin',
  appendtosection: 'beforeend'
};
const COMMANDS = {
  remove: (el, target, manifestId) => {
    if (target === 'false') return;
    if (manifestId) {
      el.dataset.removedManifestId = manifestId;
      return;
    }
    el.classList.add(CLASS_EL_DELETE);
  },
  replace: (el, target, manifestId) => {
    if (!el || el.classList.contains(CLASS_EL_REPLACE)) return;
    el.insertAdjacentElement('beforebegin', createFrag(el, target, manifestId));
    el.classList.add(CLASS_EL_DELETE, CLASS_EL_REPLACE);
  }
};
function checkSelectorType(selector) {
  return selector?.startsWith('/') || selector?.startsWith('http') ? 'fragment' : 'css';
}
const fetchData = function (url, type) {
  try {
    let _exit;
    if (type === undefined) type = DATA_TYPE.JSON;
    const _temp = _catch(function () {
      return Promise.resolve(fetch(url)).then(function (resp) {
        if (!resp.ok) {
          /* c8 ignore next 5 */
          if (resp.status === 404) {
            throw new Error('File not found');
          }
          throw new Error(`Invalid response: ${resp.status} ${resp.statusText}`);
        }
        return Promise.resolve(resp[type]()).then(function (_await$resp$type) {
          _exit = 1;
          return _await$resp$type;
        });
      });
    }, function (e) {
      /* c8 ignore next 3 */
      console.log(`Error loading content: ${url}`, e.message || e);
    });
    return Promise.resolve(_temp && _temp.then ? _temp.then(function (_result) {
      return _exit ? _result : null;
    }) : _exit ? _temp : null);
  } catch (e) {
    return Promise.reject(e);
  }
};
const getBlockProps = fVal => {
  let val = fVal;
  if (val?.includes('\\')) val = val?.split('\\').join('/');
  if (!val?.startsWith('/')) val = `/${val}`;
  const blockSelector = val?.split('/').pop();
  const {
    origin
  } = PAGE_URL;
  if (origin.includes('.hlx.') || origin.includes('localhost')) {
    if (val.startsWith('/libs/')) {
      /* c8 ignore next 2 */
      const {
        miloLibs,
        codeRoot
      } = getConfig();
      val = `${miloLibs || codeRoot}${val.replace('/libs', '')}`;
    } else {
      val = `${origin}${val}`;
    }
  }
  return {
    blockSelector,
    blockTarget: val
  };
};
const consolidateArray = (arr, prop, existing = []) => arr.reduce((results, i) => [...results, ...(i[prop] || [])], existing);
const consolidateObjects = (arr, prop, existing = {}) => arr.reduce((propMap, item) => {
  item[prop]?.forEach(i => {
    const {
      selector,
      val
    } = i;
    if (prop === 'blocks') {
      propMap[selector] = val;
      return;
    }
    if (selector in propMap) return;
    const action = {
      action: i.action,
      fragment: val,
      selector,
      manifestPath: item.manifestPath,
      manifestId: i.manifestId
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const key in propMap) {
      if (propMap[key].fragment === selector) propMap[key] = action;
    }
    propMap[selector] = action;
  });
  return {
    ...existing,
    ...propMap
  };
}, {});
const matchGlob = (searchStr, inputStr) => {
  const pattern = searchStr.replace(/\*\*/g, '.*');
  const reg = new RegExp(`^${pattern}(\\.html)?$`, 'i'); // devtool bug needs this backtick: `
  return reg.test(inputStr);
};
const setMetadata = metadata => {
  const {
    selector,
    val
  } = metadata;
  if (!selector || !val) return;
  const propName = selector.startsWith('og:') ? 'property' : 'name';
  let metaEl = document.querySelector(`meta[${propName}="${selector}"]`);
  if (!metaEl) {
    metaEl = document.createElement('meta');
    metaEl.setAttribute(propName, selector);
    document.head.append(metaEl);
  }
  metaEl.setAttribute('content', val);
};
function toLowerAlpha(str) {
  const s = str.toLowerCase();
  return s.replace(RE_KEY_REPLACE, '');
}
function normalizeKeys(obj) {
  return Object.keys(obj).reduce((newObj, key) => {
    newObj[toLowerAlpha(key)] = obj[key];
    return newObj;
  }, {});
}
const getDivInTargetedCell = tableCell => {
  tableCell.replaceChildren();
  const div = document.createElement('div');
  tableCell.appendChild(div);
  return div;
};
const querySelector = (el, selector, all = false) => {
  try {
    return all ? el.querySelectorAll(selector) : el.querySelector(selector);
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.log('Invalid selector: ', selector);
    return null;
  }
};
function getTrailingNumber(s) {
  const match = s.match(/\d+$/);
  return match ? parseInt(match[0], 10) : null;
}
function getSection(rootEl, idx) {
  return rootEl === document ? document.querySelector(`body > main > div:nth-child(${idx})`) : rootEl.querySelector(`:scope > div:nth-child(${idx})`);
}
function registerInBlockActions(cmd, manifestId) {
  const {
    action,
    target,
    selector
  } = cmd;
  const command = {
    action,
    target,
    manifestId
  };
  const blockAndSelector = selector.substring(IN_BLOCK_SELECTOR_PREFIX.length).trim().split(/\s+/);
  const [blockName] = blockAndSelector;
  const config = getConfig();
  config.mep.inBlock ??= {};
  config.mep.inBlock[blockName] ??= {};
  let blockSelector;
  if (blockAndSelector.length > 1) {
    blockSelector = blockAndSelector.slice(1).join(' ');
    command.selector = blockSelector;
    if (checkSelectorType(blockSelector) === 'fragment') {
      config.mep.inBlock[blockName].fragments ??= {};
      const {
        fragments
      } = config.mep.inBlock[blockName];
      delete command.selector;
      if (blockSelector in fragments) return;

      // eslint-disable-next-line no-restricted-syntax
      for (const key in fragments) {
        if (fragments[key].target === blockSelector) fragments[key] = command;
      }
      fragments[blockSelector] = command;
      blockSelector = normalizePath(blockSelector);
      // eslint-disable-next-line no-restricted-syntax
      for (const key in fragments) {
        if (fragments[key].target === blockSelector) fragments[key] = command;
      }
      fragments[blockSelector] = command;
      return;
    }
  }
  config.mep.inBlock[blockName].commands ??= [];
  config.mep.inBlock[blockName].commands.push(command);
}
function getSelectedElement(selector, action, rootEl) {
  if (!selector) return null;
  if (action.includes('appendtosection') || action.includes('prependtosection')) {
    if (!selector.includes('section')) return null;
    const section = selector.trim().replace('section', '');
    if (section !== '' && Number.isNaN(section)) return null;
  }
  if (checkSelectorType(selector) === 'fragment') {
    try {
      const fragment = document.querySelector(`a[href*="${normalizePath(selector, false)}"], a[href*="${normalizePath(selector, true)}"]`);
      if (fragment) return fragment.parentNode;
      return null;
    } catch (e) {
      return null;
    }
  }
  let selectedEl;
  if (selector.includes('.') || !['section', 'block', 'row'].some(s => selector.includes(s))) {
    selectedEl = querySelector(rootEl, selector);
    if (selectedEl) return selectedEl;
  }
  const terms = selector.split(/\s+/);
  let section = null;
  if (terms[0]?.startsWith('section')) {
    const sectionIdx = getTrailingNumber(terms[0]) || 1;
    section = getSection(rootEl, sectionIdx);
    terms.shift();
  }
  if (terms.length) {
    const blockStr = terms.shift();
    if (blockStr.includes('.')) {
      selectedEl = querySelector(section || rootEl, blockStr);
    } else {
      const blockIndex = getTrailingNumber(blockStr) || 1;
      const blockName = blockStr.replace(`${blockIndex}`, '');
      if (blockName === 'block') {
        if (!section) section = getSection(rootEl, 1);
        selectedEl = querySelector(section, `:scope > div:nth-of-type(${blockIndex})`);
      } else {
        selectedEl = querySelector(section || rootEl, `.${blockName}`, true)?.[blockIndex - 1];
      }
    }
  } else if (section) {
    return section;
  }
  if (terms.length) {
    // find targeted table cell in rowX colY format
    const rowColMatch = /row(?<row>\d+)\s+col(?<col>\d+)/gm.exec(terms.join(' '));
    if (rowColMatch) {
      const {
        row,
        col
      } = rowColMatch.groups;
      const tableCell = querySelector(selectedEl, `:nth-child(${row}) > :nth-child(${col})`);
      if (!tableCell) return null;
      return getDivInTargetedCell(tableCell);
    }
  }
  return selectedEl;
}
const addHash = (url, newHash) => {
  if (!newHash) return url;
  try {
    const {
      origin,
      pathname,
      search
    } = new URL(url);
    return `${origin}${pathname}${search}#${newHash}`;
  } catch (e) {
    return `${url}#${newHash}`;
  }
};
function handleCommands(commands, rootEl = document, forceInline = false) {
  commands.forEach(cmd => {
    const {
      manifestId
    } = cmd;
    const {
      action,
      selector,
      target: trgt
    } = cmd;
    const target = forceInline ? addHash(trgt, INLINE_HASH) : trgt;
    if (selector.startsWith(IN_BLOCK_SELECTOR_PREFIX)) {
      registerInBlockActions(cmd, manifestId);
      return;
    }
    if (action in COMMANDS) {
      const el = getSelectedElement(selector, action, rootEl);
      COMMANDS[action](el, target, manifestId);
    } else if (action in CREATE_CMDS) {
      const el = getSelectedElement(selector, action, rootEl);
      el?.insertAdjacentElement(CREATE_CMDS[action], createFrag(el, target, manifestId));
    } else {
      /* c8 ignore next 2 */
      console.log('Invalid command found: ', cmd);
    }
  });
}
const getVariantInfo = (line, variantNames, variants, manifestId) => {
  const action = line.action?.toLowerCase().replace('content', '').replace('fragment', '');
  const {
    selector
  } = line;
  const pageFilter = line['page filter'] || line['page filter optional'];
  if (pageFilter && !matchGlob(pageFilter, new URL(window.location).pathname)) return;
  variantNames.forEach(vn => {
    if (!line[vn] || line[vn].toLowerCase() === 'false') return;
    const variantInfo = {
      action,
      selector,
      pageFilter,
      target: line[vn],
      selectorType: checkSelectorType(selector),
      manifestId
    };
    if (action in COMMANDS && variantInfo.selectorType === 'fragment') {
      variants[vn].fragments.push({
        selector: normalizePath(variantInfo.selector),
        val: normalizePath(line[vn]),
        action,
        manifestId
      });
    } else if (GLOBAL_CMDS.includes(action)) {
      variants[vn][action] = variants[vn][action] || [];
      if (action === 'useblockcode') {
        const {
          blockSelector,
          blockTarget
        } = getBlockProps(line[vn]);
        variants[vn][action].push({
          selector: blockSelector,
          val: blockTarget,
          pageFilter,
          manifestId
        });
      } else {
        variants[vn][action].push({
          selector: normalizePath(selector),
          val: normalizePath(line[vn]),
          pageFilter,
          manifestId
        });
      }
    } else if (action in COMMANDS || action in CREATE_CMDS) {
      variants[vn].commands.push(variantInfo);
    } else {
      /* c8 ignore next 2 */
      console.log('Invalid action found: ', line);
    }
  });
};
function parseConfig(data, manifestId) {
  if (!data?.length) return null;
  const config = {};
  const experiences = data.map(d => normalizeKeys(d));
  try {
    const variants = {};
    const variantNames = Object.keys(experiences[0]).filter(vn => !MANIFEST_KEYS.includes(vn));
    variantNames.forEach(vn => {
      variants[vn] = {
        commands: [],
        fragments: []
      };
    });
    experiences.forEach(line => getVariantInfo(line, variantNames, variants, manifestId));
    config.variants = variants;
    config.variantNames = variantNames;
    return config;
  } catch (e) {
    /* c8 ignore next 3 */
    console.log('error parsing personalization config:', e, experiences);
  }
  return null;
}

/* c8 ignore start */
function parsePlaceholders(placeholders, config, selectedVariantName = '') {
  if (!placeholders?.length || selectedVariantName === 'default') return config;
  const valueNames = ['value', selectedVariantName.toLowerCase(), config.locale.ietf.toLowerCase(), ...config.locale.ietf.toLowerCase().split('-')];
  const [val] = Object.entries(placeholders[0]).find(([key]) => valueNames.includes(key.toLowerCase()));
  if (val) {
    const results = placeholders.reduce((res, item) => {
      res[item.key] = item[val];
      return res;
    }, {});
    config.placeholders = {
      ...(config.placeholders || {}),
      ...results
    };
  }
  return config;
}
const checkForParamMatch = paramStr => {
  const [name, val] = paramStr.split('param-')[1].split('=');
  if (!name) return false;
  const params = new URLSearchParams(Array.from(PAGE_URL.searchParams, ([key, value]) => [key.toLowerCase(), value?.toLowerCase()]));
  const searchParamVal = params.get(name.toLowerCase());
  if (searchParamVal !== null) {
    if (val) return val === searchParamVal;
    return true; // if no val is set, just check for existence of param
  }
  return false;
};
const createDefaultExperiment = manifest => ({
  disabled: manifest.disabled,
  event: manifest.event,
  manifest: manifest.manifestPath,
  selectedVariant: {
    commands: [],
    fragments: []
  },
  selectedVariantName: 'default',
  variantNames: ['all'],
  variants: {}
});
const deleteMarkedEls = (rootEl = document) => {
  [...rootEl.querySelectorAll(`.${CLASS_EL_DELETE}`)].forEach(el => el.remove());
};
const normalizeFragPaths = ({
  selector,
  val,
  action
}) => ({
  selector: normalizePath(selector),
  val: normalizePath(val),
  action
});
function overridePersonalizationVariant(manifest, config) {
  const {
    manifestPath,
    variantNames
  } = manifest;
  if (!config.mep?.override) return;
  let selectedVariant;
  config.mep?.override?.split('---').some(item => {
    const pair = item.trim().split('--');
    if (pair[0] === manifestPath && pair.length > 1) {
      [, selectedVariant] = pair;
      return true;
    }
    return false;
  });
  if (!selectedVariant) return;
  if (variantNames.includes(selectedVariant)) {
    manifest.selectedVariantName = selectedVariant;
    manifest.selectedVariant = manifest.variants[selectedVariant];
    return;
  }
  manifest.selectedVariantName = selectedVariant;
  manifest.selectedVariant = manifest.variants[selectedVariant];
}
function compareExecutionOrder(a, b) {
  if (a.executionOrder === b.executionOrder) return 0;
  return a.executionOrder > b.executionOrder ? 1 : -1;
}
function cleanAndSortManifestList(manifests) {
  const config = getConfig();
  const manifestObj = {};
  let allManifests = manifests;
  if (config.mep?.experiments) allManifests = [...manifests, ...config.mep.experiments];
  allManifests.forEach(manifest => {
    try {
      if (!manifest?.manifest) return;
      if (!manifest.manifestPath) manifest.manifestPath = normalizePath(manifest.manifest);
      if (manifest.manifestPath in manifestObj) {
        let fullManifest = manifestObj[manifest.manifestPath];
        let freshManifest = manifest;
        if (manifest.name) {
          fullManifest = manifest;
          freshManifest = manifestObj[manifest.manifestPath];
        }
        freshManifest.name = fullManifest.name;
        freshManifest.selectedVariantName = fullManifest.selectedVariantName;
        freshManifest.selectedVariant = freshManifest.variants[freshManifest.selectedVariantName];
        manifestObj[manifest.manifestPath] = freshManifest;
      } else {
        manifestObj[manifest.manifestPath] = manifest;
      }
      if (config.mep?.override) overridePersonalizationVariant(manifest, config);
    } catch (e) {
      console.warn(e);
      window.lana?.log(`MEP Error parsing manifests: ${e.toString()}`);
    }
  });
  return Object.values(manifestObj).sort(compareExecutionOrder);
}
function handleFragmentCommand(command, a) {
  const {
    action,
    fragment,
    manifestId
  } = command;
  if (action === 'replace') {
    a.href = fragment;
    if (manifestId) a.dataset.manifestId = manifestId;
    return fragment;
  }
  if (action === 'remove') {
    if (manifestId) {
      a.parentElement.dataset.removedManifestId = manifestId;
    } else {
      a.parentElement.remove();
    }
  }
  return false;
}

export { PERSONALIZATION_TAGS, TRACKED_MANIFEST_TYPE, appendJsonExt, applyPers, categorizeActions, cleanAndSortManifestList, deleteMarkedEls, getFileName, getPersConfig, handleCommands, handleFragmentCommand, matchGlob, normalizePath, parseConfig, preloadManifests, replaceInner };
//# sourceMappingURL=personalization-627dc147.js.map
