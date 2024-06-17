function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

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
const _iteratorSymbol$1 = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
function _settle$1(pact, state, value) {
  if (!pact.s) {
    if (value instanceof _Pact$1) {
      if (value.s) {
        if (state & 1) {
          state = value.s;
        }
        value = value.v;
      } else {
        value.o = _settle$1.bind(null, pact, state);
        return;
      }
    }
    if (value && value.then) {
      value.then(_settle$1.bind(null, pact, state), _settle$1.bind(null, pact, 2));
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
const _Pact$1 = /*#__PURE__*/function () {
  function _Pact() {}
  _Pact.prototype.then = function (onFulfilled, onRejected) {
    const result = new _Pact();
    const state = this.s;
    if (state) {
      const callback = state & 1 ? onFulfilled : onRejected;
      if (callback) {
        try {
          _settle$1(result, 1, callback(this.v));
        } catch (e) {
          _settle$1(result, 2, e);
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
          _settle$1(result, 1, onFulfilled ? onFulfilled(value) : value);
        } else if (onRejected) {
          _settle$1(result, 1, onRejected(value));
        } else {
          _settle$1(result, 2, value);
        }
      } catch (e) {
        _settle$1(result, 2, e);
      }
    };
    return result;
  };
  return _Pact;
}();
function _isSettledPact$1(thenable) {
  return thenable instanceof _Pact$1 && thenable.s & 1;
}
function _forTo$1(array, body, check) {
  var i = -1,
    pact,
    reject;
  function _cycle(result) {
    try {
      while (++i < array.length && (!check || !check())) {
        result = body(i);
        if (result && result.then) {
          if (_isSettledPact$1(result)) {
            result = result.v;
          } else {
            result.then(_cycle, reject || (reject = _settle$1.bind(null, pact = new _Pact$1(), 2)));
            return;
          }
        }
      }
      if (pact) {
        _settle$1(pact, 1, result);
      } else {
        pact = result;
      }
    } catch (e) {
      _settle$1(pact || (pact = new _Pact$1()), 2, e);
    }
  }
  _cycle();
  return pact;
}
function _forOf$1(target, body, check) {
  if (typeof target[_iteratorSymbol$1] === "function") {
    var iterator = target[_iteratorSymbol$1](),
      step,
      pact,
      reject;
    function _cycle(result) {
      try {
        while (!(step = iterator.next()).done && (!check || !check())) {
          result = body(step.value);
          if (result && result.then) {
            if (_isSettledPact$1(result)) {
              result = result.v;
            } else {
              result.then(_cycle, reject || (reject = _settle$1.bind(null, pact = new _Pact$1(), 2)));
              return;
            }
          }
        }
        if (pact) {
          _settle$1(pact, 1, result);
        } else {
          pact = result;
        }
      } catch (e) {
        _settle$1(pact || (pact = new _Pact$1()), 2, e);
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
  return _forTo$1(values, function (i) {
    return body(values[i]);
  }, check);
}
const loadArea = function (area = document) {
  try {
    function _temp13() {
      const config = getConfig();
      return Promise.resolve(decoratePlaceholders(area, config)).then(function () {
        function _temp11() {
          function _temp9() {
            return Promise.resolve(loadDeferred(area, areaBlocks, config)).then(function () {});
          }
          const currentHash = window.location.hash;
          if (currentHash) {
            scrollToHashedElement(currentHash);
          }
          const _temp8 = function () {
            if (isDoc) return Promise.resolve(documentPostSectionLoading(config)).then(function () {});
          }();
          return _temp8 && _temp8.then ? _temp8.then(_temp9) : _temp9(_temp8);
        }
        if (isDoc) {
          decorateDocumentExtras();
        }
        const sections = decorateSections(area, isDoc);
        const areaBlocks = [];
        const _temp10 = _forOf$1(sections, function (section) {
          return Promise.resolve(processSection(section, config, isDoc)).then(function (sectionBlocks) {
            areaBlocks.push(...sectionBlocks);
            areaBlocks.forEach(block => {
              if (!block.className.includes('metadata')) block.dataset.block = '';
            });
          });
        });
        return _temp10 && _temp10.then ? _temp10.then(_temp11) : _temp11(_temp10);
      });
    }
    const isDoc = area === document;
    const _temp12 = function () {
      if (isDoc) {
        return Promise.resolve(checkForPageMods()).then(function () {
          appendHtmlToCanonicalUrl();
        });
      }
    }();
    return Promise.resolve(_temp12 && _temp12.then ? _temp12.then(_temp13) : _temp13(_temp12));
  } catch (e) {
    return Promise.reject(e);
  }
};
const processSection = function (section, config, isDoc) {
  try {
    function _temp29() {
      function _temp27() {
        const loaded = section.blocks.map(block => loadBlock$1(block));
        return Promise.resolve(decorateIcons(section.el, config)).then(function () {
          // Only move on to the next section when all blocks are loaded.
          // Show the section when all blocks inside are done.
          return Promise.resolve(Promise.all(loaded)).then(function () {
            function _temp25() {
              delete section.el.dataset.idx;
              return section.blocks;
            }
            delete section.el.dataset.status;
            const _temp24 = function () {
              if (isDoc && section.el.dataset.idx === '0') {
                return Promise.resolve(loadPostLCP(config)).then(function () {});
              }
            }();
            return _temp24 && _temp24.then ? _temp24.then(_temp25) : _temp25(_temp24);
          });
        });
      }
      const _temp26 = function () {
        if (section.preloadLinks.length) {
          const preloads = section.preloadLinks.map(block => loadBlock$1(block));
          return Promise.resolve(Promise.all(preloads)).then(function () {});
        }
      }();
      return _temp26 && _temp26.then ? _temp26.then(_temp27) : _temp27(_temp26);
    }
    const inlineFrags = [...section.el.querySelectorAll('a[href*="#_inline"]')];
    const _temp28 = function () {
      if (inlineFrags.length) {
        return Promise.resolve(import('./fragment-995a354d.js')).then(function ({
          default: loadInlineFrags
        }) {
          const fragPromises = inlineFrags.map(link => loadInlineFrags(link));
          return Promise.resolve(Promise.all(fragPromises)).then(function () {
            return Promise.resolve(decoratePlaceholders(section.el, config)).then(function () {
              const newlyDecoratedSection = decorateSection(section.el, section.idx);
              section.blocks = newlyDecoratedSection.blocks;
              section.preloadLinks = newlyDecoratedSection.preloadLinks;
            });
          });
        });
      }
    }();
    return Promise.resolve(_temp28 && _temp28.then ? _temp28.then(_temp29) : _temp29(_temp28));
  } catch (e) {
    return Promise.reject(e);
  }
};
const documentPostSectionLoading = function (config) {
  try {
    function _temp23() {
      loadFooter();
      return Promise.resolve(import('./favicon-fb3e02cd.js')).then(function ({
        default: loadFavIcon
      }) {
        loadFavIcon(createTag, getConfig(), getMetadata);
        if (config.experiment?.selectedVariant?.scripts?.length) {
          config.experiment.selectedVariant.scripts.forEach(script => loadScript(script));
        }
        initSidekick();
        return Promise.resolve(import('./delayed-bb61e147.js')).then(function ({
          default: delayed
        }) {
          delayed([getConfig, getMetadata, loadScript, loadStyle, loadIms]);
          Promise.resolve().then(function () { return attributes; }).then(analytics => {
            document.querySelectorAll('main > div').forEach((section, idx) => analytics.decorateSectionAnalytics(section, idx, config));
          });
          document.body.appendChild(createTag('div', {
            id: 'page-load-ok-milo',
            style: 'display: none;'
          }));
        });
      });
    }
    decorateFooterPromo();
    const appendage = getMetadata('title-append');
    if (appendage) {
      import('./title-append-dd636bee.js').then(module => module.default(appendage));
    }
    if (getMetadata('seotech-structured-data') === 'on' || getMetadata('seotech-video-url')) {
      import('./seotech-8063e6d2.js').then(module => module.default({
        locationUrl: window.location.href,
        getMetadata,
        createTag,
        getConfig
      }));
    }
    const richResults = getMetadata('richresults');
    const _temp22 = function () {
      if (richResults) {
        return Promise.resolve(import('./richresults-40dac747.js')).then(function ({
          default: addRichResults
        }) {
          addRichResults(richResults, {
            createTag,
            getMetadata
          });
        });
      }
    }();
    return Promise.resolve(_temp22 && _temp22.then ? _temp22.then(_temp23) : _temp23(_temp22));
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadDeferred = function (area, blocks, config) {
  try {
    const event = new Event(MILO_EVENTS.DEFERRED);
    area.dispatchEvent(event);
    if (area !== document) {
      return Promise.resolve();
    }
    config.resolveDeferred?.(true);
    if (config.links === 'on') {
      const path = `${config.contentRoot || ''}${getMetadata('links-path') || '/seo/links.json'}`;
      import('./links-c221abb0.js').then(mod => mod.default(path, area));
    }
    if (config.locale?.ietf === 'ja-JP') {
      // Japanese word-wrap
      import('./japanese-word-wrap-e0b93ebd.js').then(({
        default: controlJapaneseLineBreaks
      }) => {
        controlJapaneseLineBreaks(config, area);
      });
    }
    import('./samplerum-c0357919.js').then(({
      sampleRUM
    }) => {
      sampleRUM('lazy');
      sampleRUM.observe(blocks);
      sampleRUM.observe(area.querySelectorAll('picture > img'));
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadPostLCP = function (config) {
  try {
    function _temp21() {
      function _temp19() {
        function _temp17() {
          loadTemplate();
          return Promise.resolve(import('./fonts-73d14704.js')).then(function ({
            default: loadFonts
          }) {
            loadFonts(config.locale, loadStyle);
            if (config.mep?.preview) {
              import('./preview-ada2e813.js').then(({
                default: decoratePreviewMode
              }) => decoratePreviewMode());
            }
          });
        }
        const header = document.querySelector('header');
        const _temp16 = function () {
          if (header) {
            header.classList.add('gnav-hide');
            return Promise.resolve(loadBlock$1(header)).then(function () {
              header.classList.remove('gnav-hide');
            });
          }
        }();
        return _temp16 && _temp16.then ? _temp16.then(_temp17) : _temp17(_temp16);
      }
      const _temp18 = function () {
        if (config.mep?.targetEnabled === 'gnav') {
          return Promise.resolve(loadMartech({
            persEnabled: true,
            postLCP: true
          })).then(function () {});
        } else {
          loadMartech();
        }
      }();
      return _temp18 && _temp18.then ? _temp18.then(_temp19) : _temp19(_temp18);
    }
    const georouting = getMetadata('georouting') || config.geoRouting;
    const _temp20 = function () {
      if (georouting === 'on') {
        return Promise.resolve(import('./georoutingv2-4bdbf568.js')).then(function ({
          default: loadGeoRouting
        }) {
          return Promise.resolve(loadGeoRouting(config, createTag, getMetadata, loadBlock$1, loadStyle)).then(function () {});
        });
      }
    }();
    return Promise.resolve(_temp20 && _temp20.then ? _temp20.then(_temp21) : _temp21(_temp20));
  } catch (e) {
    return Promise.reject(e);
  }
};
const checkForPageMods = function () {
  try {
    const {
      mep: mepParam
    } = Object.fromEntries(PAGE_URL.searchParams);
    if (mepParam === 'off') return Promise.resolve();
    const persEnabled = getMepEnablement('personalization');
    const promoEnabled = getMepEnablement('manifestnames', 'promo');
    const targetEnabled = getMepEnablement('target');
    const mepEnabled = persEnabled || targetEnabled || promoEnabled || mepParam;
    if (!mepEnabled) return Promise.resolve();
    const config = getConfig();
    config.mep = {
      targetEnabled
    };
    loadLink(`${config.base}/features/personalization/personalization.js`, {
      as: 'script',
      rel: 'modulepreload'
    });
    return Promise.resolve(combineMepSources(persEnabled, promoEnabled, mepParam)).then(function (persManifests) {
      let _exit;
      function _temp15(_result) {
        if (_exit) return _result;
        if (!persManifests.length) return;
        loadIms().then(() => {
          if (window.adobeIMS.isSignedInUser()) loadMartech();
        }).catch(e => {
          console.log('Unable to load IMS:', e);
        });
        return Promise.resolve(import('./personalization-627dc147.js')).then(function ({
          preloadManifests,
          applyPers
        }) {
          const manifests = preloadManifests({
            persManifests
          }, {
            getConfig,
            loadLink
          });
          return Promise.resolve(applyPers(manifests)).then(function () {});
        });
      }
      const _temp14 = function () {
        if (targetEnabled === true) {
          return Promise.resolve(loadMartech({
            persEnabled: true,
            persManifests,
            targetEnabled
          })).then(function () {
            _exit = 1;
          });
        }
      }();
      return _temp14 && _temp14.then ? _temp14.then(_temp15) : _temp15(_temp14);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadMartech = function ({
  persEnabled = false,
  persManifests = []
} = {}) {
  try {
    // eslint-disable-next-line no-underscore-dangle
    if (window.marketingtech?.adobe?.launch && window._satellite) {
      return Promise.resolve(true);
    }
    const query = PAGE_URL.searchParams.get('martech');
    if (query === 'off' || getMetadata('martech') === 'off') {
      return Promise.resolve(false);
    }
    window.targetGlobalSettings = {
      bodyHidingEnabled: false
    };
    loadIms().catch(() => {});
    return Promise.resolve(import('./martech-203f80cb.js')).then(function ({
      default: initMartech
    }) {
      return Promise.resolve(initMartech({
        persEnabled,
        persManifests
      })).then(function () {
        return true;
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadIms = function () {
  try {
    imsLoaded = imsLoaded || new Promise((resolve, reject) => {
      const {
        locale,
        imsClientId,
        imsScope,
        env,
        base
      } = getConfig();
      if (!imsClientId) {
        reject(new Error('Missing IMS Client ID'));
        return;
      }
      const [unavMeta, ahomeMeta] = [getMetadata('universal-nav')?.trim(), getMetadata('adobe-home-redirect')];
      const defaultScope = `AdobeID,openid,gnav${unavMeta && unavMeta !== 'off' ? ',pps.read,firefly_api,additional_info.roles,read_organizations' : ''}`;
      const timeout = setTimeout(() => reject(new Error('IMS timeout')), 5000);
      window.adobeid = {
        client_id: imsClientId,
        scope: imsScope || defaultScope,
        locale: locale?.ietf?.replace('-', '_') || 'en_US',
        redirect_uri: ahomeMeta === 'on' ? `https://www${env.name !== 'prod' ? '.stage' : ''}.adobe.com${locale.prefix}` : undefined,
        autoValidateToken: true,
        environment: env.ims,
        useLocalStorage: false,
        onReady: () => {
          resolve();
          clearTimeout(timeout);
        },
        onError: reject
      };
      const path = PAGE_URL.searchParams.get('useAlternateImsDomain') ? 'https://auth.services.adobe.com/imslib/imslib.min.js' : `https://main--milo--adobecom.hlx.page/libs/deps/imslib.min.js`;
      loadScript(path);
    }).then(() => {
      if (!window.adobeIMS?.isSignedInUser()) {
        getConfig().entitlements([]);
      }
    });
    return Promise.resolve(imsLoaded);
  } catch (e) {
    return Promise.reject(e);
  }
};
const decorateFooterPromo = function (doc = document) {
  try {
    const footerPromoTag = getMetadata('footer-promo-tag', doc);
    const footerPromoType = getMetadata('footer-promo-type', doc);
    if (!footerPromoTag && footerPromoType !== 'taxonomy') return Promise.resolve();
    return Promise.resolve(import('./footer-promo-8e2b5984.js')).then(function ({
      default: initFooterPromo
    }) {
      return Promise.resolve(initFooterPromo(footerPromoTag, footerPromoType, doc)).then(function () {});
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadFooter = function () {
  try {
    const footer = document.querySelector('footer');
    if (!footer) return Promise.resolve();
    const footerMeta = getMetadata('footer');
    if (footerMeta === 'off') {
      footer.remove();
      return Promise.resolve();
    }
    footer.className = footerMeta || 'footer';
    return Promise.resolve(loadBlock$1(footer)).then(function () {});
  } catch (e) {
    return Promise.reject(e);
  }
};
const decoratePlaceholders = function (area, config) {
  try {
    const el = area.querySelector('main') || area;
    const regex = /{{(.*?)}}|%7B%7B(.*?)%7D%7D/g;
    const found = regex.test(el.innerHTML);
    if (!found) return Promise.resolve();
    return Promise.resolve(Promise.resolve().then(function () { return placeholders; })).then(function ({
      replaceText
    }) {
      return Promise.resolve(replaceText(el.innerHTML, config, regex)).then(function (_replaceText) {
        el.innerHTML = _replaceText;
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const decorateIcons = function (area, config) {
  try {
    const icons = area.querySelectorAll('span.icon');
    if (icons.length === 0) return Promise.resolve();
    const {
      miloLibs,
      codeRoot
    } = config;
    const base = miloLibs || codeRoot;
    return Promise.resolve(new Promise(resolve => {
      loadStyle(`${base}/features/icons/icons.css`, resolve);
    })).then(function () {
      return Promise.resolve(import('./icons-d923b8dc.js')).then(function ({
        default: loadIcons
      }) {
        return Promise.resolve(loadIcons(icons, config)).then(function () {});
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadBlock$1 = function (block) {
  try {
    if (block.classList.contains('hide-block')) {
      block.remove();
      return Promise.resolve(null);
    }
    const name = block.classList[0];
    const {
      miloLibs,
      codeRoot,
      mep
    } = getConfig();
    const base = miloLibs && MILO_BLOCKS.includes(name) ? miloLibs : codeRoot;
    let path = `${base}/blocks/${name}`;
    if (mep?.blocks?.[name]) path = mep.blocks[name];
    const blockPath = `${path}/${name}`;
    const styleLoaded = new Promise(resolve => {
      loadStyle(`${blockPath}.css`, resolve);
    });
    const scriptLoaded = new Promise(resolve => {
      (function () {
        try {
          function _temp5() {
            resolve();
          }
          const _temp4 = _catch$1(function () {
            return Promise.resolve(import(`${blockPath}.js`)).then(function ({
              default: init
            }) {
              return Promise.resolve(init(block)).then(function () {});
            });
          }, function (err) {
            console.log(`Failed loading ${name}`, err);
            const config = getConfig();
            const _temp3 = function () {
              if (config.env.name !== 'prod') {
                return Promise.resolve(import('./fallback-7aef520c.js')).then(function ({
                  showError
                }) {
                  showError(block, name);
                });
              }
            }();
            return _temp3 && _temp3.then ? _temp3.then(function () {}) : void 0;
          });
          return _temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4);
        } catch (e) {
          Promise.reject(e);
        }
      })();
    });
    return Promise.resolve(Promise.all([styleLoaded, scriptLoaded])).then(function () {
      return block;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadTemplate = function () {
  try {
    const template = getMetadata('template');
    if (!template) return Promise.resolve();
    const name = template.toLowerCase().replace(/[^0-9a-z]/gi, '-');
    document.body.classList.add(name);
    const {
      miloLibs,
      codeRoot
    } = getConfig();
    const base = miloLibs && MILO_TEMPLATES.includes(name) ? miloLibs : codeRoot;
    const styleLoaded = new Promise(resolve => {
      loadStyle(`${base}/templates/${name}/${name}.css`, resolve);
    });
    const scriptLoaded = new Promise(resolve => {
      (function () {
        try {
          function _temp2() {
            resolve();
          }
          const _temp = _catch$1(function () {
            return Promise.resolve(import(`${base}/templates/${name}/${name}.js`)).then(function () {});
          }, function (err) {
            console.log(`failed to load module for ${name}`, err);
          });
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        } catch (e) {
          Promise.reject(e);
        }
      })();
    });
    return Promise.resolve(Promise.all([styleLoaded, scriptLoaded])).then(function () {});
  } catch (e) {
    return Promise.reject(e);
  }
};
/* eslint-disable no-console */

const MILO_TEMPLATES = ['404', 'featured-story'];
const MILO_BLOCKS = ['accordion', 'action-item', 'action-scroller', 'adobetv', 'article-feed', 'article-header', 'aside', 'author-header', 'brick', 'bulk-publish', 'bulk-publish-v2', 'caas', 'caas-config', 'caas-marquee', 'caas-marquee-metadata', 'card', 'card-horizontal', 'card-metadata', 'carousel', 'chart', 'columns', 'faas', 'featured-article', 'figure', 'form', 'fragment', 'featured-article', 'global-footer', 'global-navigation', 'graybox', 'footer', 'gnav', 'how-to', 'icon-block', 'iframe', 'instagram', 'marketo', 'marquee', 'marquee-anchors', 'martech-metadata', 'media', 'merch', 'merch-card', 'merch-card-collection', 'merch-offers', 'mnemonic-list', 'mobile-app-banner', 'modal', 'modal-metadata', 'pdf-viewer', 'quote', 'read-more', 'recommended-articles', 'region-nav', 'review', 'section-metadata', 'slideshare', 'preflight', 'promo', 'quiz', 'quiz-entry', 'quiz-marquee', 'quiz-results', 'tabs', 'table-of-contents', 'text', 'walls-io', 'table', 'table-metadata', 'tags', 'tag-selector', 'tiktok', 'twitter', 'video', 'vimeo', 'youtube', 'z-pattern', 'share', 'reading-time'];
const AUTO_BLOCKS = [{
  adobetv: 'tv.adobe.com'
}, {
  gist: 'https://gist.github.com'
}, {
  caas: '/tools/caas'
}, {
  faas: '/tools/faas'
}, {
  fragment: '/fragments/'
}, {
  instagram: 'https://www.instagram.com'
}, {
  slideshare: 'https://www.slideshare.net'
}, {
  tiktok: 'https://www.tiktok.com'
}, {
  twitter: 'https://twitter.com'
}, {
  vimeo: 'https://vimeo.com'
}, {
  vimeo: 'https://player.vimeo.com'
}, {
  youtube: 'https://www.youtube.com'
}, {
  youtube: 'https://youtu.be'
}, {
  'pdf-viewer': '.pdf'
}, {
  video: '.mp4'
}, {
  merch: '/tools/ost?'
}];
const DO_NOT_INLINE = ['accordion', 'columns', 'z-pattern'];
const ENVS = {
  stage: {
    name: 'stage',
    ims: 'stg1',
    adobeIO: 'cc-collab-stage.adobe.io',
    adminconsole: 'stage.adminconsole.adobe.com',
    account: 'stage.account.adobe.com',
    edgeConfigId: '8d2805dd-85bf-4748-82eb-f99fdad117a6',
    pdfViewerClientId: '600a4521c23d4c7eb9c7b039bee534a0'
  },
  prod: {
    name: 'prod',
    ims: 'prod',
    adobeIO: 'cc-collab.adobe.io',
    adminconsole: 'adminconsole.adobe.com',
    account: 'account.adobe.com',
    edgeConfigId: '2cba807b-7430-41ae-9aac-db2b0da742d5',
    pdfViewerClientId: '3c0a5ddf2cc04d3198d9e48efc390fa9'
  }
};
ENVS.local = {
  ...ENVS.stage,
  name: 'local'
};
const MILO_EVENTS = {
  DEFERRED: 'milo:deferred'
};
const LANGSTORE = 'langstore';
const PAGE_URL = new URL(window.location.href);
function getEnv(conf) {
  const {
    host
  } = window.location;
  const query = PAGE_URL.searchParams.get('env');
  if (query) return {
    ...ENVS[query],
    consumer: conf[query]
  };
  if (host.includes('localhost')) return {
    ...ENVS.local,
    consumer: conf.local
  };
  /* c8 ignore start */
  if (host.includes('hlx.page') || host.includes('hlx.live') || host.includes('stage.adobe') || host.includes('corp.adobe')) {
    return {
      ...ENVS.stage,
      consumer: conf.stage
    };
  }
  return {
    ...ENVS.prod,
    consumer: conf.prod
  };
  /* c8 ignore stop */
}
function getLocale(locales, pathname = window.location.pathname) {
  if (!locales) {
    return {
      ietf: 'en-US',
      tk: 'hah7vzn.css',
      prefix: ''
    };
  }
  const split = pathname.split('/');
  const localeString = split[1];
  const locale = locales[localeString] || locales[''];
  if (localeString === LANGSTORE) {
    locale.prefix = `/${localeString}/${split[2]}`;
    if (Object.values(locales).find(loc => loc.ietf?.startsWith(split[2]))?.dir === 'rtl') locale.dir = 'rtl';
    return locale;
  }
  const isUS = locale.ietf === 'en-US';
  locale.prefix = isUS ? '' : `/${localeString}`;
  locale.region = isUS ? 'us' : localeString.split('_')[0];
  return locale;
}
function getMetadata(name, doc = document) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = doc.head.querySelector(`meta[${attr}="${name}"]`);
  return meta && meta.content;
}
const handleEntitlements = (() => {
  let entResolve;
  const entPromise = new Promise(resolve => {
    entResolve = resolve;
  });
  return resolveVal => {
    if (resolveVal !== undefined) {
      entResolve(resolveVal);
    }
    return entPromise;
  };
})();
function setupMiloObj(config) {
  window.milo ||= {};
  window.milo.deferredPromise = new Promise(resolve => {
    config.resolveDeferred = resolve;
  });
}
const [setConfig, updateConfig, getConfig] = (() => {
  let config = {};
  return [conf => {
    const origin = conf.origin || window.location.origin;
    const pathname = conf.pathname || window.location.pathname;
    config = {
      env: getEnv(conf),
      ...conf
    };
    config.codeRoot = conf.codeRoot ? `${origin}${conf.codeRoot}` : origin;
    config.base = config.miloLibs || config.codeRoot;
    config.locale = pathname ? getLocale(conf.locales, pathname) : getLocale(conf.locales);
    config.autoBlocks = conf.autoBlocks ? [...AUTO_BLOCKS, ...conf.autoBlocks] : AUTO_BLOCKS;
    config.doNotInline = conf.doNotInline ? [...DO_NOT_INLINE, ...conf.doNotInline] : DO_NOT_INLINE;
    const lang = getMetadata('content-language') || config.locale.ietf;
    document.documentElement.setAttribute('lang', lang);
    try {
      const dir = getMetadata('content-direction') || config.locale.dir || config.locale.ietf && new Intl.Locale(config.locale.ietf)?.textInfo?.direction || 'ltr';
      document.documentElement.setAttribute('dir', dir);
    } catch (e) {
      console.log('Invalid or missing locale:', e);
    }
    config.locale.contentRoot = `${origin}${config.locale.prefix}${config.contentRoot ?? ''}`;
    config.useDotHtml = !PAGE_URL.origin.includes('.hlx.') && (conf.useDotHtml ?? PAGE_URL.pathname.endsWith('.html'));
    config.entitlements = handleEntitlements;
    config.consumerEntitlements = conf.entitlements || [];
    setupMiloObj(config);
    return config;
  }, conf => config = conf, () => config];
})();
function isInTextNode(node) {
  return node.parentElement.firstChild.nodeType === Node.TEXT_NODE;
}
function createTag(tag, attributes, html, options = {}) {
  const el = document.createElement(tag);
  if (html) {
    if (html instanceof HTMLElement || html instanceof SVGElement || html instanceof DocumentFragment) {
      el.append(html);
    } else if (Array.isArray(html)) {
      el.append(...html);
    } else {
      el.insertAdjacentHTML('beforeend', html);
    }
  }
  if (attributes) {
    Object.entries(attributes).forEach(([key, val]) => {
      el.setAttribute(key, val);
    });
  }
  options.parent?.append(el);
  return el;
}
function getExtension(path) {
  const pageName = path.split('/').pop();
  return pageName.includes('.') ? pageName.split('.').pop() : '';
}
function localizeLink(href, originHostName = window.location.hostname, overrideDomain = false) {
  try {
    const url = new URL(href);
    const relative = url.hostname === originHostName;
    const processedHref = relative ? href.replace(url.origin, '') : href;
    const {
      hash
    } = url;
    if (hash.includes('#_dnt')) return processedHref.replace('#_dnt', '');
    const path = url.pathname;
    const extension = getExtension(path);
    const allowedExts = ['', 'html', 'json'];
    if (!allowedExts.includes(extension)) return processedHref;
    const {
      locale,
      locales,
      prodDomains
    } = getConfig();
    if (!locale || !locales) return processedHref;
    const isLocalizable = relative || prodDomains && prodDomains.includes(url.hostname) || overrideDomain;
    if (!isLocalizable) return processedHref;
    const isLocalizedLink = path.startsWith(`/${LANGSTORE}`) || Object.keys(locales).some(loc => loc !== '' && (path.startsWith(`/${loc}/`) || path.endsWith(`/${loc}`)));
    if (isLocalizedLink) return processedHref;
    const urlPath = `${locale.prefix}${path}${url.search}${hash}`;
    return relative ? urlPath : `${url.origin}${urlPath}`;
  } catch (error) {
    return href;
  }
}
function loadLink(href, {
  as,
  callback,
  crossorigin,
  rel,
  fetchpriority
} = {}) {
  let link = document.head.querySelector(`link[href="${href}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    if (as) link.setAttribute('as', as);
    if (crossorigin) link.setAttribute('crossorigin', crossorigin);
    if (fetchpriority) link.setAttribute('fetchpriority', fetchpriority);
    link.setAttribute('href', href);
    if (callback) {
      link.onload = e => callback(e.type);
      link.onerror = e => callback(e.type);
    }
    document.head.appendChild(link);
  } else if (callback) {
    callback('noop');
  }
  return link;
}
function loadStyle(href, callback) {
  return loadLink(href, {
    rel: 'stylesheet',
    callback
  });
}
function appendHtmlToCanonicalUrl() {
  const {
    useDotHtml
  } = getConfig();
  if (!useDotHtml) return;
  const canonEl = document.head.querySelector('link[rel="canonical"]');
  if (!canonEl) return;
  const canonUrl = new URL(canonEl.href);
  if (canonUrl.pathname.endsWith('/') || canonUrl.pathname.endsWith('.html')) return;
  const pagePath = PAGE_URL.pathname.replace('.html', '');
  if (pagePath !== canonUrl.pathname) return;
  canonEl.setAttribute('href', `${canonEl.href}.html`);
}
function appendHtmlToLink(link) {
  const {
    useDotHtml
  } = getConfig();
  if (!useDotHtml) return;
  const href = link.getAttribute('href');
  if (!href?.length) return;
  const {
    autoBlocks = [],
    htmlExclude = []
  } = getConfig();
  const HAS_EXTENSION = /\..*$/;
  let url = {
    pathname: href
  };
  try {
    url = new URL(href, PAGE_URL);
  } catch (e) {/* do nothing */}
  if (!(href.startsWith('/') || href.startsWith(PAGE_URL.origin)) || url.pathname?.endsWith('/') || href === PAGE_URL.origin || HAS_EXTENSION.test(href.split('/').pop()) || htmlExclude?.some(excludeRe => excludeRe.test(href))) {
    return;
  }
  const relativeAutoBlocks = autoBlocks.map(b => Object.values(b)[0]).filter(b => b.startsWith('/'));
  const isAutoblockLink = relativeAutoBlocks.some(block => href.includes(block));
  if (isAutoblockLink) return;
  try {
    const linkUrl = new URL(href.startsWith('http') ? href : `${PAGE_URL.origin}${href}`);
    if (linkUrl.pathname && !linkUrl.pathname.endsWith('.html')) {
      linkUrl.pathname = `${linkUrl.pathname}.html`;
      link.setAttribute('href', href.startsWith('/') ? `${linkUrl.pathname}${linkUrl.search}${linkUrl.hash}` : linkUrl.href);
    }
  } catch (e) {
    window.lana?.log(`Error while attempting to append '.html' to ${link}: ${e}`);
  }
}
const loadScript = (url, type) => new Promise((resolve, reject) => {
  let script = document.querySelector(`head > script[src="${url}"]`);
  if (!script) {
    const {
      head
    } = document;
    script = document.createElement('script');
    script.setAttribute('src', url);
    if (type) {
      script.setAttribute('type', type);
    }
    head.append(script);
  }
  if (script.dataset.loaded) {
    resolve(script);
    return;
  }
  const onScript = event => {
    script.removeEventListener('load', onScript);
    script.removeEventListener('error', onScript);
    if (event.type === 'error') {
      reject(new Error(`error loading script: ${script.src}`));
    } else if (event.type === 'load') {
      script.dataset.loaded = true;
      resolve(script);
    }
  };
  script.addEventListener('load', onScript);
  script.addEventListener('error', onScript);
});
function decorateSVG(a) {
  const {
    textContent,
    href
  } = a;
  if (!(textContent.includes('.svg') || href.includes('.svg'))) return a;
  try {
    // Mine for URL and alt text
    const splitText = textContent.split('|');
    const textUrl = new URL(splitText.shift().trim());
    const altText = splitText.join('|').trim();

    // Relative link checking
    const hrefUrl = a.href.startsWith('/') ? new URL(`${window.location.origin}${a.href}`) : new URL(a.href);
    const src = textUrl.hostname.includes('.hlx.') ? textUrl.pathname : textUrl;
    const img = createTag('img', {
      loading: 'lazy',
      src
    });
    if (altText) img.alt = altText;
    const pic = createTag('picture', null, img);
    if (textUrl.pathname === hrefUrl.pathname) {
      a.parentElement.replaceChild(pic, a);
      return pic;
    }
    a.textContent = '';
    a.append(pic);
    return a;
  } catch (e) {
    console.log('Failed to create SVG.', e.message);
    return a;
  }
}
function decorateImageLinks(el) {
  const images = el.querySelectorAll('img[alt*="|"]');
  if (!images.length) return;
  [...images].forEach(img => {
    const [source, alt, icon] = img.alt.split('|');
    try {
      const url = new URL(source.trim());
      const href = url.hostname.includes('.hlx.') ? `${url.pathname}${url.hash}` : url.href;
      if (alt?.trim().length) img.alt = alt.trim();
      const pic = img.closest('picture');
      const picParent = pic.parentElement;
      if (href.includes('.mp4')) {
        const a = createTag('a', {
          href: url,
          'data-video-poster': img.src
        });
        a.innerHTML = url;
        pic.replaceWith(a);
      } else {
        const aTag = createTag('a', {
          href,
          class: 'image-link'
        });
        picParent.insertBefore(aTag, pic);
        if (icon) {
          import('./image-video-link-c1951b29.js').then(mod => mod.default(picParent, aTag, icon));
        } else {
          aTag.append(pic);
        }
      }
    } catch (e) {
      console.log('Error:', `${e.message} '${source.trim()}'`);
    }
  });
}
function decorateAutoBlock(a) {
  const config = getConfig();
  const {
    hostname
  } = window.location;
  let url;
  try {
    url = new URL(a.href);
  } catch (e) {
    window.lana?.log(`Cannot make URL from decorateAutoBlock - ${a?.href}: ${e.toString()}`);
    return false;
  }
  const href = hostname === url.hostname ? `${url.pathname}${url.search}${url.hash}` : a.href;
  return config.autoBlocks.find(candidate => {
    const key = Object.keys(candidate)[0];
    const match = href.includes(candidate[key]);
    if (!match) return false;
    if (key === 'pdf-viewer' && !a.textContent.includes('.pdf')) {
      a.target = '_blank';
      return false;
    }
    const hasExtension = a.href.split('/').pop().includes('.');
    const mp4Match = a.textContent.match('media_.*.mp4');
    if (key === 'fragment' && (!hasExtension || mp4Match)) {
      if (a.href === window.location.href) {
        return false;
      }
      const isInlineFrag = url.hash.includes('#_inline');
      if (url.hash === '' || isInlineFrag) {
        const {
          parentElement
        } = a;
        const {
          nodeName,
          innerHTML
        } = parentElement;
        const noText = innerHTML === a.outerHTML;
        if (noText && nodeName === 'P') {
          const div = createTag('div', null, a);
          parentElement.parentElement.replaceChild(div, parentElement);
        }
      }

      // previewing a fragment page with mp4 video
      if (mp4Match) {
        a.className = 'video link-block';
        return false;
      }

      // Modals
      if (url.hash !== '' && !isInlineFrag) {
        a.dataset.modalPath = url.pathname;
        a.dataset.modalHash = url.hash;
        a.href = url.hash;
        a.className = `modal link-block ${[...a.classList].join(' ')}`;
        return true;
      }
    }

    // slack uploaded mp4s
    if (key === 'video' && !a.textContent.match('media_.*.mp4')) {
      return false;
    }
    a.className = `${key} link-block`;
    return true;
  });
}
function decorateLinks(el) {
  decorateImageLinks(el);
  const anchors = el.getElementsByTagName('a');
  return [...anchors].reduce((rdx, a) => {
    appendHtmlToLink(a);
    a.href = localizeLink(a.href);
    decorateSVG(a);
    if (a.href.includes('#_blank')) {
      a.setAttribute('target', '_blank');
      a.href = a.href.replace('#_blank', '');
    }
    if (a.href.includes('#_dnb')) {
      a.href = a.href.replace('#_dnb', '');
    } else {
      const autoBlock = decorateAutoBlock(a);
      if (autoBlock) {
        rdx.push(a);
      }
    }
    return rdx;
  }, []);
}
function decorateContent(el) {
  const children = [el];
  let child = el;
  while (child) {
    child = child.nextElementSibling;
    if (child && child.nodeName !== 'DIV') {
      children.push(child);
    } else {
      break;
    }
  }
  const block = document.createElement('div');
  block.className = 'content';
  block.append(...children);
  block.dataset.block = '';
  return block;
}
function decorateDefaults(el) {
  const firstChild = ':scope > *:not(div):first-child';
  const afterBlock = ':scope > div + *:not(div)';
  const children = el.querySelectorAll(`${firstChild}, ${afterBlock}`);
  children.forEach(child => {
    const prev = child.previousElementSibling;
    const content = decorateContent(child);
    if (prev) {
      prev.insertAdjacentElement('afterend', content);
    } else {
      el.insertAdjacentElement('afterbegin', content);
    }
  });
}
function decorateHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  const headerMeta = getMetadata('header');
  if (headerMeta === 'off') {
    document.body.classList.add('nav-off');
    header.remove();
    return;
  }
  header.className = headerMeta || 'gnav';
  const metadataConfig = getMetadata('breadcrumbs')?.toLowerCase() || getConfig().breadcrumbs;
  if (metadataConfig === 'off') return;
  const baseBreadcrumbs = getMetadata('breadcrumbs-base')?.length;
  const breadcrumbs = document.querySelector('.breadcrumbs');
  const autoBreadcrumbs = getMetadata('breadcrumbs-from-url') === 'on';
  if (baseBreadcrumbs || breadcrumbs || autoBreadcrumbs) header.classList.add('has-breadcrumbs');
  if (breadcrumbs) header.append(breadcrumbs);
  const promo = getMetadata('gnav-promo-source');
  if (promo?.length) header.classList.add('has-promo');
}
function filterDuplicatedLinkBlocks(blocks) {
  if (!blocks?.length) return [];
  const uniqueModalKeys = new Set();
  const uniqueBlocks = [];
  var _iterator = _createForOfIteratorHelper(blocks),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const obj = _step.value;
      if (obj.className.includes('modal')) {
        const key = `${obj.dataset.modalHash}-${obj.dataset.modalPath}`;
        if (!uniqueModalKeys.has(key)) {
          uniqueModalKeys.add(key);
          uniqueBlocks.push(obj);
        }
      } else {
        uniqueBlocks.push(obj);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return uniqueBlocks;
}
function decorateSection(section, idx) {
  let links = decorateLinks(section);
  decorateDefaults(section);
  const blocks = section.querySelectorAll(':scope > div[class]:not(.content)');
  const {
    doNotInline
  } = getConfig();
  const blockLinks = [...blocks].reduce((blkLinks, block) => {
    const blockName = block.classList[0];
    links.filter(link => block.contains(link)).forEach(link => {
      if (link.classList.contains('fragment') && MILO_BLOCKS.includes(blockName) // do not inline consumer blocks (for now)
      && !doNotInline.includes(blockName)) {
        if (!link.href.includes('#_inline')) {
          link.href = `${link.href}#_inline`;
        }
        blkLinks.inlineFrags.push(link);
      } else if (link.classList.contains('link-block')) {
        blkLinks.autoBlocks.push(link);
      }
    });
    return blkLinks;
  }, {
    inlineFrags: [],
    autoBlocks: []
  });
  const embeddedLinks = [...blockLinks.inlineFrags, ...blockLinks.autoBlocks];
  if (embeddedLinks.length) {
    links = links.filter(link => !embeddedLinks.includes(link));
  }
  section.className = 'section';
  section.dataset.status = 'decorated';
  section.dataset.idx = idx;
  return {
    blocks: [...links, ...blocks],
    el: section,
    idx,
    preloadLinks: filterDuplicatedLinkBlocks(blockLinks.autoBlocks)
  };
}
function decorateSections(el, isDoc) {
  const selector = isDoc ? 'body > main > div' : ':scope > div';
  return [...el.querySelectorAll(selector)].map(decorateSection);
}
let imsLoaded;
const getMepValue = val => {
  const valMap = {
    on: true,
    off: false,
    gnav: 'gnav'
  };
  const finalVal = val?.toLowerCase().trim();
  if (finalVal in valMap) return valMap[finalVal];
  return finalVal;
};
const getMepEnablement = (mdKey, paramKey = false) => {
  const paramValue = PAGE_URL.searchParams.get(paramKey || mdKey);
  if (paramValue) return getMepValue(paramValue);
  const mdValue = getMetadata(mdKey);
  if (!mdValue) return false;
  return getMepValue(mdValue);
};
const combineMepSources = function (persEnabled, promoEnabled, mepParam) {
  try {
    function _temp7() {
      if (mepParam && mepParam !== 'off') {
        const persManifestPaths = persManifests.map(manifest => {
          const {
            manifestPath
          } = manifest;
          if (manifestPath.startsWith('/')) return manifestPath;
          try {
            const url = new URL(manifestPath);
            return url.pathname;
          } catch (e) {
            return manifestPath;
          }
        });
        mepParam.split('---').forEach(manifestPair => {
          const manifestPath = manifestPair.trim().toLowerCase().split('--')[0];
          if (!persManifestPaths.includes(manifestPath)) {
            persManifests.push({
              manifestPath
            });
          }
        });
      }
      return persManifests;
    }
    let persManifests = [];
    if (persEnabled) {
      persManifests = persEnabled.toLowerCase().split(/,|(\s+)|(\\n)/g).filter(path => path?.trim()).map(manifestPath => ({
        manifestPath
      }));
    }
    const _temp6 = function () {
      if (promoEnabled) {
        return Promise.resolve(import('./promo-utils-2896259e.js')).then(function ({
          default: getPromoManifests
        }) {
          persManifests = persManifests.concat(getPromoManifests(promoEnabled, PAGE_URL.searchParams));
        });
      }
    }();
    return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp7) : _temp7(_temp6));
  } catch (e) {
    return Promise.reject(e);
  }
};
function scrollToHashedElement(hash) {
  if (!hash) return;
  const elementId = decodeURIComponent(hash).slice(1);
  let targetElement;
  try {
    targetElement = document.querySelector(`#${elementId}:not(.dialog-modal)`);
  } catch (e) {
    window.lana?.log(`Could not query element because of invalid hash - ${elementId}: ${e.toString()}`);
  }
  if (!targetElement) return;
  const bufferHeight = document.querySelector('.global-navigation')?.offsetHeight || 0;
  const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: topOffset - bufferHeight,
    behavior: 'smooth'
  });
}
function initSidekick() {
  const initPlugins = function () {
    try {
      return Promise.resolve(import('./sidekick-6ee82f92.js')).then(function ({
        default: init
      }) {
        init({
          createTag,
          loadBlock: loadBlock$1,
          loadScript,
          loadStyle
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  if (document.querySelector('helix-sidekick')) {
    initPlugins();
  } else {
    document.addEventListener('sidekick-ready', () => {
      initPlugins();
    });
  }
}
function decorateMeta() {
  const {
    origin
  } = window.location;
  const contents = document.head.querySelectorAll('[content*=".hlx."]');
  contents.forEach(meta => {
    if (meta.getAttribute('property') === 'hlx:proxyUrl') return;
    try {
      const url = new URL(meta.content);
      const localizedLink = localizeLink(`${origin}${url.pathname}`);
      const localizedURL = localizedLink.includes(origin) ? localizedLink : `${origin}${localizedLink}`;
      meta.setAttribute('content', `${localizedURL}${url.search}${url.hash}`);
    } catch (e) {
      window.lana?.log(`Cannot make URL from metadata - ${meta.content}: ${e.toString()}`);
    }
  });

  // Event-based modal
  window.addEventListener('modal:open', function (e) {
    try {
      const {
        miloLibs
      } = getConfig();
      return Promise.resolve(import('./modal-6e215c97.js')).then(function ({
        findDetails,
        getModal
      }) {
        loadStyle(`${miloLibs}/blocks/modal/modal.css`);
        const details = findDetails(e.detail.hash);
        if (details) getModal(details);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  });
}
function decorateDocumentExtras() {
  decorateMeta();
  decorateHeader();
  import('./samplerum-c0357919.js').then(({
    addRumListeners
  }) => {
    addRumListeners();
  });
}
function loadDelayed() {
  // TODO: remove after all consumers have stopped calling this method
}
const utf8ToB64 = str => window.btoa(unescape(encodeURIComponent(str)));
const b64ToUtf8 = str => decodeURIComponent(escape(window.atob(str)));
function parseEncodedConfig(encodedConfig) {
  try {
    return JSON.parse(b64ToUtf8(decodeURIComponent(encodedConfig)));
  } catch (e) {
    console.log(e);
  }
  return null;
}
function createIntersectionObserver({
  el,
  callback,
  once = true,
  options = {}
}) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(function (entry) {
      try {
        if (entry.isIntersecting) {
          if (once) observer.unobserve(entry.target);
          callback(entry.target, entry);
        }
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    });
  }, options);
  io.observe(el);
  return io;
}
function loadLana(options = {}) {
  if (window.lana) return;
  const lanaError = e => {
    window.lana?.log(e.reason || e.error || e.message, {
      errorType: 'i'
    });
  };
  window.lana = {
    log: function () {
      try {
        const _arguments = arguments;
        window.removeEventListener('error', lanaError);
        window.removeEventListener('unhandledrejection', lanaError);
        return Promise.resolve(import('./lana-4ae160d9.js')).then(function () {
          return window.lana.log(...[].slice.call(_arguments));
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    debug: false,
    options
  };
  window.addEventListener('error', lanaError);
  window.addEventListener('unhandledrejection', lanaError);
}
const reloadPage = () => window.location.reload();

var utils = {
  __proto__: null,
  loadArea: loadArea,
  loadDeferred: loadDeferred,
  loadMartech: loadMartech,
  loadIms: loadIms,
  decorateFooterPromo: decorateFooterPromo,
  loadBlock: loadBlock$1,
  loadTemplate: loadTemplate,
  MILO_EVENTS: MILO_EVENTS,
  getLocale: getLocale,
  getMetadata: getMetadata,
  setConfig: setConfig,
  updateConfig: updateConfig,
  getConfig: getConfig,
  isInTextNode: isInTextNode,
  createTag: createTag,
  localizeLink: localizeLink,
  loadLink: loadLink,
  loadStyle: loadStyle,
  appendHtmlToCanonicalUrl: appendHtmlToCanonicalUrl,
  appendHtmlToLink: appendHtmlToLink,
  loadScript: loadScript,
  decorateSVG: decorateSVG,
  decorateImageLinks: decorateImageLinks,
  decorateAutoBlock: decorateAutoBlock,
  decorateLinks: decorateLinks,
  filterDuplicatedLinkBlocks: filterDuplicatedLinkBlocks,
  getMepEnablement: getMepEnablement,
  combineMepSources: combineMepSources,
  scrollToHashedElement: scrollToHashedElement,
  loadDelayed: loadDelayed,
  utf8ToB64: utf8ToB64,
  b64ToUtf8: b64ToUtf8,
  parseEncodedConfig: parseEncodedConfig,
  createIntersectionObserver: createIntersectionObserver,
  loadLana: loadLana,
  reloadPage: reloadPage
};

const decorateSectionAnalytics = function (section, idx, config) {
  try {
    document.querySelector('main')?.setAttribute('daa-im', 'true');
    section.setAttribute('daa-lh', `s${idx + 1}`);
    section.querySelectorAll('[data-block] [data-block]').forEach(block => {
      block.removeAttribute('data-block');
    });
    const mepMartech = config?.mep?.martech || '';
    section.querySelectorAll('[data-block]').forEach((block, blockIdx) => {
      const blockName = block.classList[0] || '';
      block.setAttribute('daa-lh', `b${blockIdx + 1}|${blockName.slice(0, 15)}${mepMartech}`);
      decorateDefaultLinkAnalytics(block, config);
      block.removeAttribute('data-block');
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

// below functions are being sunset
const INVALID_CHARACTERS = /[^\u00C0-\u1FFF\u2C00-\uD7FF\w]+/g;
const LEAD_UNDERSCORES = /^_+|_+$/g;
function processTrackingLabels(text, config, charLimit) {
  let analyticsValue = text?.replace(INVALID_CHARACTERS, ' ').replace(LEAD_UNDERSCORES, '').trim();
  if (config) {
    const {
      analyticLocalization,
      loc = analyticLocalization?.[analyticsValue]
    } = config;
    if (loc) analyticsValue = loc;
  }
  if (charLimit) return analyticsValue.slice(0, charLimit);
  return analyticsValue;
}
function decorateDefaultLinkAnalytics(block, config) {
  if (block.classList.length && !block.className.includes('metadata') && !block.classList.contains('link-block') && !block.classList.contains('section') && block.nodeName === 'DIV') {
    let header = '';
    let linkCount = 1;
    const headerSelector = 'h1, h2, h3, h4, h5, h6';
    let analyticsSelector = `${headerSelector}, .tracking-header`;
    const headers = block.querySelectorAll(analyticsSelector);
    if (!headers.length) analyticsSelector = `${analyticsSelector}, b, strong`;
    block.querySelectorAll(`${analyticsSelector}, a:not(.video.link-block), button`).forEach(item => {
      if (item.nodeName === 'A' || item.nodeName === 'BUTTON') {
        if (item.classList.contains('tracking-header')) {
          header = processTrackingLabels(item.textContent, config, 20);
        } else if (!header) {
          const section = block.closest('.section');
          if (section?.className.includes('-up') || section?.classList.contains('milo-card-section')) {
            const previousHeader = section?.previousElementSibling?.querySelector(headerSelector);
            if (previousHeader) {
              header = processTrackingLabels(previousHeader.textContent, config, 20);
            }
          }
        }
        if (item.hasAttribute('daa-ll')) {
          const labelArray = item.getAttribute('daa-ll').split('-').map(part => {
            if (part === '') return '';
            return processTrackingLabels(part, config, 20);
          });
          item.setAttribute('daa-ll', labelArray.join('-'));
        } else {
          let label = item.textContent?.trim();
          if (label === '') {
            label = item.getAttribute('title') || item.getAttribute('aria-label') || item.querySelector('img')?.getAttribute('alt') || 'no label';
          }
          label = processTrackingLabels(label, config, 20);
          item.setAttribute('daa-ll', `${label}-${linkCount}--${header}`);
        }
        linkCount += 1;
      } else {
        if (item.nodeName === 'STRONG' || item.nodeName === 'B') {
          item.classList.add('tracking-header');
        }
        header = processTrackingLabels(item.textContent, config, 20);
      }
    });
  }
}
function decorateBlockAnalytics() {
  return false;
}
function decorateLinkAnalytics() {
  return false;
}
const RE_ALPHANUM = /[^0-9a-z]/gi;
const RE_TRIM_UNDERSCORE = /^_+|_+$/g;
const analyticsGetLabel = txt => txt.replaceAll('&', 'and').replace(RE_ALPHANUM, '_').replace(RE_TRIM_UNDERSCORE, '');
const analyticsDecorateList = (li, idx) => {
  const link = li.firstChild?.nodeName === 'A' && li.firstChild;
  if (!link) return;
  const label = link.textContent || link.getAttribute('aria-label');
  if (!label) return;
  link.setAttribute('daa-ll', `${analyticsGetLabel(label)}-${idx + 1}`);
};

var attributes = {
  __proto__: null,
  decorateSectionAnalytics: decorateSectionAnalytics,
  processTrackingLabels: processTrackingLabels,
  decorateDefaultLinkAnalytics: decorateDefaultLinkAnalytics,
  decorateBlockAnalytics: decorateBlockAnalytics,
  decorateLinkAnalytics: decorateLinkAnalytics,
  analyticsGetLabel: analyticsGetLabel,
  analyticsDecorateList: analyticsDecorateList
};

const replaceText = function (text, config, regex, sheet = 'default') {
  try {
    if (regex === undefined) regex = /{{(.*?)}}|%7B%7B(.*?)%7D%7D/g;
    if (typeof text !== 'string' || !text.length) return Promise.resolve('');
    const matches = [...text.matchAll(new RegExp(regex))];
    if (!matches.length) {
      return Promise.resolve(text);
    }
    const keys = Array.from(matches, match => match[1] || match[2]);
    return Promise.resolve(replaceKeyArray(keys, config, sheet)).then(function (placeholders) {
      // The .shift method is very slow, thus using normal iterator
      let i = 0;
      // eslint-disable-next-line no-plusplus
      const finalText = text.replaceAll(regex, () => placeholders[i++]);
      return finalText;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const replaceKeyArray = function (keys, config, sheet = 'default') {
  try {
    if (!Array.isArray(keys) || !keys.length) return Promise.resolve([]);
    const promiseArr = [];
    keys.forEach(key => {
      promiseArr.push(getPlaceholder(key, config, sheet));
    });
    return Promise.resolve(Promise.all(promiseArr));
  } catch (e) {
    return Promise.reject(e);
  }
};
const replaceKey = function (key, config, sheet = 'default') {
  try {
    if (typeof key !== 'string' || !key.length) return Promise.resolve('');
    return Promise.resolve(getPlaceholder(key, config, sheet));
  } catch (e) {
    return Promise.reject(e);
  }
};
const getPlaceholder = function (key, config, sheet) {
  try {
    let defaultFetched = false;
    const defaultLocale = 'en-US';
    const getDefaultContentRoot = () => {
      const defaultContentRoot = config.locale.contentRoot;
      const localePrefix = config.locale.prefix;
      if (!localePrefix.length) return defaultContentRoot;

      // Certain locale prefixes are common beginnings of words, such as /es
      // This could also be part of a page path, such as '/esign'
      if (defaultContentRoot.endsWith(localePrefix)) {
        return defaultContentRoot.replace(localePrefix, '');
      }
      return defaultContentRoot.replace(`${localePrefix}/`, '/');
    };
    const getDefaultPlaceholders = function () {
      try {
        const defaultConfig = {
          locale: {
            ietf: defaultLocale,
            contentRoot: getDefaultContentRoot()
          }
        };
        return Promise.resolve(fetchPlaceholders(defaultConfig, sheet).catch(() => ({}))).then(function (defaultPlaceholders) {
          defaultFetched = true;
          return defaultPlaceholders;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    if (config.placeholders?.[key]) return Promise.resolve(config.placeholders[key]);
    return Promise.resolve(fetchPlaceholders(config, sheet).catch(function () {
      return Promise.resolve(getDefaultPlaceholders());
    })).then(function (placeholders) {
      let _exit;
      function _temp3(_result) {
        return _exit ? _result : keyToStr(key);
      }
      if (typeof placeholders?.[key] === 'string') return placeholders[key];
      const _temp2 = function () {
        if (!defaultFetched && config.locale.ietf !== defaultLocale) {
          return Promise.resolve(getDefaultPlaceholders()).then(function (defaultPlaceholders) {
            if (defaultPlaceholders?.[key]) {
              const _defaultPlaceholders$ = defaultPlaceholders[key];
              _exit = 1;
              return _defaultPlaceholders$;
            }
          });
        }
      }();
      return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const fetchedPlaceholders = {};
const getPlaceholdersPath = (config, sheet) => {
  const path = `${config.locale.contentRoot}/placeholders.json`;
  const query = sheet !== 'default' && typeof sheet === 'string' && sheet.length ? `?sheet=${sheet}` : '';
  return `${path}${query}`;
};
const fetchPlaceholders = function (config, sheet) {
  try {
    const placeholdersPath = getPlaceholdersPath(config, sheet);
    return Promise.resolve(import('./helpers-07162686.js')).then(function ({
      customFetch
    }) {
      fetchedPlaceholders[placeholdersPath] = fetchedPlaceholders[placeholdersPath]
      // eslint-disable-next-line no-async-promise-executor
      || new Promise(function (resolve) {
        try {
          return Promise.resolve(customFetch({
            resource: placeholdersPath,
            withCacheRules: true
          }).catch(() => ({}))).then(function (resp) {
            function _temp(json) {
              if (json.data.length === 0) {
                resolve({});
                return;
              }
              const placeholders = {};
              json.data.forEach(item => {
                placeholders[item.key] = item.value;
              });
              resolve(placeholders);
            }
            const _resp$ok = resp.ok;
            return _resp$ok ? Promise.resolve(resp.json()).then(_temp) : _temp({
              data: []
            });
          });
        } catch (e) {
          return Promise.reject(e);
        }
      });
      return fetchedPlaceholders[placeholdersPath];
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
function keyToStr(key) {
  return key.replaceAll('-', ' ');
}

var placeholders = {
  __proto__: null,
  replaceText: replaceText,
  replaceKeyArray: replaceKeyArray,
  replaceKey: replaceKey
};

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
const fetchAndProcessPlainHtml = function ({
  url,
  shouldDecorateLinks = true
} = {}) {
  try {
    let path = getFederatedUrl(url);
    const mepGnav = getConfig()?.mep?.inBlock?.['global-navigation'];
    const mepFragment = mepGnav?.fragments?.[path];
    if (mepFragment && mepFragment.action === 'replace') {
      path = mepFragment.target;
    }
    return Promise.resolve(fetch(path.replace(/(\.html$|$)/, '.plain.html'))).then(function (res) {
      return Promise.resolve(res.text()).then(function (text) {
        function _temp5() {
          function _temp3() {
            // federatePictureSources should only be called after decorating the links.
            if (shouldDecorateLinks) {
              decorateLinks(body);
              federatePictureSources({
                section: body,
                forceFederate: path.includes('/federal/')
              });
            }
            const blocks = body.querySelectorAll('.martech-metadata');
            if (blocks.length) {
              import('./martech-metadata-c7ffd8ad.js').then(({
                default: decorate
              }) => blocks.forEach(block => decorate(block)));
            }
            return Promise.resolve(replaceText(body.innerHTML, getFedsPlaceholderConfig())).then(function (_replaceText) {
              body.innerHTML = _replaceText;
              return body;
            });
          }
          const inlineFrags = [...body.querySelectorAll('a[href*="#_inline"]')];
          const _temp2 = function () {
            if (inlineFrags.length) {
              return Promise.resolve(import('./fragment-995a354d.js')).then(function ({
                default: loadInlineFrags
              }) {
                const fragPromises = inlineFrags.map(link => {
                  link.href = getFederatedUrl(localizeLink(link.href));
                  return loadInlineFrags(link);
                });
                return Promise.resolve(Promise.all(fragPromises)).then(function () {});
              });
            }
          }();
          return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
        }
        const {
          body
        } = new DOMParser().parseFromString(text, 'text/html');
        if (mepFragment?.manifestId) body.dataset.manifestId = mepFragment.manifestId;
        const commands = mepGnav?.commands;
        const _temp4 = function () {
          if (commands?.length) {
            return Promise.resolve(import('./personalization-627dc147.js')).then(function ({
              handleCommands,
              deleteMarkedEls
            }) {
              handleCommands(commands, body, true);
              deleteMarkedEls(body);
            });
          }
        }();
        return _temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4);
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadDecorateMenu = function () {
  try {
    if (cachedDecorateMenu) return Promise.resolve(cachedDecorateMenu);
    let resolve;
    cachedDecorateMenu = new Promise(_resolve => {
      resolve = _resolve;
    });
    return Promise.resolve(Promise.all([loadBlock('https://main--milo--adobecom.hlx.page/libs/blocks/global-navigation/utilities/menu/menu.js'), loadStyles('utilities/menu/menu.css')])).then(function ([{
      decorateMenu,
      decorateLinkGroup
    }]) {
      resolve({
        decorateMenu,
        decorateLinkGroup
      });
      return cachedDecorateMenu;
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
// Base styles are shared between top navigation and footer,
// since they can be independent of each other.
// CSS imports were not used due to duplication of file include
const loadBaseStyles = function () {
  try {
    return Promise.resolve(loadStyles('base.css')).then(function () {});
  } catch (e) {
    return Promise.reject(e);
  }
};
loadLana();
const FEDERAL_PATH_KEY = 'federal';

// TODO when porting this to milo core, we should define this on config level
// and allow consumers to add their own origins
const allowedOrigins = ['https://www.adobe.com', 'https://business.adobe.com', 'https://blog.adobe.com', 'https://milo.adobe.com'];
const lanaLog = ({
  message,
  e = '',
  tags = 'errorType=default'
}) => {
  const url = getMetadata('gnav-source');
  window.lana.log(`${message} | gnav-source: ${url} | href: ${window.location.href} | ${e.reason || e.error || e.message || e}`, {
    clientId: 'feds-milo',
    sampleRate: 1,
    tags
  });
};
const logErrorFor = function (fn, message, tags) {
  try {
    const _temp = _catch(function () {
      return Promise.resolve(fn()).then(function () {});
    }, function (e) {
      lanaLog({
        message,
        e,
        tags
      });
    });
    return Promise.resolve(_temp && _temp.then ? _temp.then(function () {}) : void 0);
  } catch (e) {
    return Promise.reject(e);
  }
};
function toFragment(htmlStrings) {
  var values = [].slice.call(arguments, 1);
  const templateStr = htmlStrings.reduce((acc, htmlString, index) => {
    if (values[index] instanceof HTMLElement) {
      return `${acc + htmlString}<elem ref="${index}"></elem>`;
    }
    return acc + htmlString + (values[index] || '');
  }, '');
  const fragment = document.createRange().createContextualFragment(templateStr).children[0];
  Array.prototype.map.call(fragment.querySelectorAll('elem'), replaceable => {
    const ref = replaceable.getAttribute('ref');
    replaceable.replaceWith(values[ref]);
  });
  return fragment;
}

// TODO we might eventually want to move this to the milo core utilities
let federatedContentRoot;
const getFederatedContentRoot = () => {
  if (federatedContentRoot) return federatedContentRoot;
  const {
    origin
  } = window.location;
  federatedContentRoot = allowedOrigins.some(o => origin.replace('.stage', '') === o) ? origin : 'https://www.adobe.com';
  if (origin.includes('localhost') || origin.includes('.hlx.')) {
    // Akamai as proxy to avoid 401s, given AEM-EDS MS auth cross project limitations
    federatedContentRoot = origin.includes('.hlx.live') ? 'https://main--federal--adobecom.hlx.live' : 'https://www.stage.adobe.com';
  }
  return federatedContentRoot;
};

// TODO we should match the akamai patterns /locale/federal/ at the start of the url
// and make the check more strict.
const getFederatedUrl = (url = '') => {
  if (typeof url !== 'string' || !url.includes('/federal/')) return url;
  if (url.startsWith('/')) return `${getFederatedContentRoot()}${url}`;
  try {
    const {
      pathname,
      search,
      hash
    } = new URL(url);
    return `${getFederatedContentRoot()}${pathname}${search}${hash}`;
  } catch (e) {
    lanaLog({
      message: `getFederatedUrl errored parsing the URL: ${url}`,
      e,
      tags: 'errorType=warn,module=utilities'
    });
  }
  return url;
};
const getPath = (urlOrPath = '') => {
  try {
    const url = new URL(urlOrPath);
    return url.pathname;
  } catch (error) {
    return urlOrPath.replace(/^\.\//, '/');
  }
};
const federatePictureSources = ({
  section,
  forceFederate
} = {}) => {
  const selector = forceFederate ? '[src], [srcset]' : `[src*="/${FEDERAL_PATH_KEY}/"], [srcset*="/${FEDERAL_PATH_KEY}/"]`;
  section?.querySelectorAll(selector).forEach(source => {
    const type = source.hasAttribute('src') ? 'src' : 'srcset';
    const path = getPath(source.getAttribute(type));
    const [, localeOrKeySegment, keyOrPathSegment] = path.split('/');
    if (forceFederate || [localeOrKeySegment, keyOrPathSegment].includes(FEDERAL_PATH_KEY)) {
      const federalPrefix = path.includes('/federal/') ? '' : '/federal';
      source.setAttribute(type, `${getFederatedContentRoot()}${federalPrefix}${path}`);
    }
  });
};
let fedsPlaceholderConfig;
const getFedsPlaceholderConfig = ({
  useCache = true
} = {}) => {
  if (useCache && fedsPlaceholderConfig) return fedsPlaceholderConfig;
  const {
    locale
  } = getConfig();
  const libOrigin = getFederatedContentRoot();
  fedsPlaceholderConfig = {
    locale: {
      ...locale,
      contentRoot: `${libOrigin}${locale.prefix}/federal/globalnav`
    }
  };
  return fedsPlaceholderConfig;
};
function getAnalyticsValue(str, index) {
  if (typeof str !== 'string' || !str.length) return str;
  let analyticsValue = processTrackingLabels(str, getConfig(), 30);
  analyticsValue = typeof index === 'number' ? `${analyticsValue}-${index}` : analyticsValue;
  return analyticsValue;
}
function getExperienceName() {
  const experiencePath = getMetadata('gnav-source');
  const explicitExperience = experiencePath?.split('/').pop();
  if (explicitExperience?.length && explicitExperience !== 'gnav') return explicitExperience;
  const {
    imsClientId
  } = getConfig();
  if (imsClientId?.length) return imsClientId;
  return '';
}
function loadStyles(path) {
  const {
    miloLibs,
    codeRoot
  } = getConfig();
  return new Promise(resolve => {
    loadStyle(`${miloLibs || codeRoot}/blocks/global-navigation/${path}`, resolve);
  });
}
function loadBlock(path) {
  return import(path).then(module => module.default);
}
let cachedDecorateMenu;
window.matchMedia('(min-width: 900px)');
window.matchMedia('(min-width: 900px) and (max-width: 1440px)');
const yieldToMain = () => new Promise(resolve => {
  setTimeout(resolve, 0);
});
(() => {
  let profileData;
  let profileResolve;
  let profileTimeout;
  const profilePromise = new Promise(resolve => {
    profileResolve = resolve;
    profileTimeout = setTimeout(() => {
      profileData = {};
      resolve(profileData);
    }, 5000);
  });
  return [data => {
    if (data && !profileData) {
      profileData = data;
      clearTimeout(profileTimeout);
      profileResolve(profileData);
    }
  }, () => profilePromise];
})();

/* eslint-disable no-async-promise-executor */

//import './global-footer.css';
const _asyncIteratorSymbol = typeof Symbol !== "undefined" ? Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator")) : "@@asyncIterator";
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
  }(),
  _iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
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
const {
  miloLibs,
  codeRoot,
  locale,
  mep
} = getConfig();
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
function _forAwaitOf(target, body, check) {
  if (typeof target[_asyncIteratorSymbol] === "function") {
    var pact = new _Pact();
    var iterator = target[_asyncIteratorSymbol]();
    iterator.next().then(_resumeAfterNext).then(void 0, _reject);
    return pact;
    function _resumeAfterBody(result) {
      if (check && check()) {
        return _settle(pact, 1, iterator.return ? iterator.return().then(function () {
          return result;
        }) : result);
      }
      iterator.next().then(_resumeAfterNext).then(void 0, _reject);
    }
    function _resumeAfterNext(step) {
      if (step.done) {
        _settle(pact, 1);
      } else {
        Promise.resolve(body(step.value)).then(_resumeAfterBody).then(void 0, _reject);
      }
    }
    function _reject(error) {
      _settle(pact, 2, iterator.return ? iterator.return().then(function () {
        return error;
      }) : error);
    }
  }
  return Promise.resolve(_forOf(target, function (value) {
    return Promise.resolve(value).then(body);
  }, check));
}
const CONFIG = {
  socialPlatforms: ['facebook', 'instagram', 'twitter', 'linkedin', 'pinterest', 'discord', 'behance', 'youtube', 'weibo', 'social-media'],
  delays: {
    decoration: 3000
  }
};
class Footer {
  constructor(_temp) {
    const _this3 = this,
      _this4 = this,
      _this5 = this,
      _this6 = this,
      _this7 = this;
    let {
      block
    } = _temp === void 0 ? {} : _temp;
    this.init = () => {
      const _this = this;
      return logErrorFor(function () {
        try {
          // We initialize the footer decoration logic when either 3s have passed
          // OR when the footer element is close to coming into view
          let decorationTimeout;

          // Set up intersection observer
          const intersectionOptions = {
            rootMargin: '300px 0px'
          };
          const observer = new window.IntersectionObserver(entries => {
            const isIntersecting = entries.find(entry => entry.isIntersecting === true);
            if (isIntersecting) {
              clearTimeout(decorationTimeout);
              observer.disconnect();
              _this.decorateContent();
            }
          }, intersectionOptions);
          observer.observe(_this.block);

          // Set timeout after which we load the footer automatically
          decorationTimeout = setTimeout(() => {
            observer.disconnect();
            _this.decorateContent();
          }, CONFIG.delays.decoration);
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      }, 'Error in global footer init', 'errorType=error,module=global-footer');
    };
    this.decorateContent = () => {
      const _this2 = this;
      return logErrorFor(function () {
        try {
          // Fetch footer content
          const nonMiloFooterUrl = "https://main--milo--adobecom.hlx.page/footer";
          const url = nonMiloFooterUrl || getMetadata('footer-source') || `${locale.contentRoot}/footer`;
          return Promise.resolve(fetchAndProcessPlainHtml({
            url,
            shouldDecorateLinks: false
          }).catch(e => lanaLog({
            message: `Error fetching footer content ${url}`,
            e,
            tags: 'errorType=error,module=global-footer'
          }))).then(function (_fetchAndProcessPlain) {
            function _temp3() {
              const mepMartech = mep?.martech || '';
              _this2.block.setAttribute('daa-lh', `gnav|${getExperienceName()}|footer${mepMartech}`);
              _this2.block.append(_this2.elements.footer);
            }
            _this2.body = _fetchAndProcessPlain;
            if (!_this2.body) return;
            const [region, social] = ['.region-selector', '.social'].map(selector => _this2.body.querySelector(selector));
            const [regionParent, socialParent] = [region?.parentElement, social?.parentElement];
            // We remove and add again the region and social elements from the body to make sure
            // they don't get decorated twice
            // Order is important, decorateFooter makes use of elements
            // which have already been created in previous steps
            [regionParent, socialParent].forEach(parent => parent?.replaceChildren());
            decorateLinks(_this2.body);
            regionParent?.appendChild(region);
            socialParent?.appendChild(social);
            const path = getFederatedUrl(url);
            federatePictureSources({
              section: _this2.body,
              forceFederate: path.includes('/federal/')
            });
            const tasks = [loadBaseStyles, _this2.decorateGrid, _this2.decorateProducts, _this2.loadIcons, _this2.decorateRegionPicker, _this2.decorateSocial, _this2.decoratePrivacy, _this2.decorateFooter];
            const _temp2 = _forAwaitOf(tasks, function (task) {
              return Promise.resolve(yieldToMain()).then(function () {
                return Promise.resolve(task()).then(function () {});
              });
            });
            return _temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2);
          });
        } catch (e) {
          return Promise.reject(e);
        }
      }, 'Failed to decorate footer content', 'errorType=error,module=global-footer');
    };
    this.loadMenuLogic = function () {
      try {
        _this3.menuLogic = _this3.menuLogic || new Promise(function (resolve) {
          try {
            return Promise.resolve(loadDecorateMenu()).then(function (menuLogic) {
              _this3.decorateMenu = menuLogic.decorateMenu;
              _this3.decorateLinkGroup = menuLogic.decorateLinkGroup;
              resolve();
            });
          } catch (e) {
            return Promise.reject(e);
          }
        });
        return Promise.resolve(_this3.menuLogic);
      } catch (e) {
        return Promise.reject(e);
      }
    };
    this.decorateGrid = function () {
      try {
        _this4.elements.footerMenu = '';
        const columns = _this4.body.querySelectorAll(':scope > div > h2:first-child');
        if (!columns || !columns.length) return Promise.resolve(_this4.elements.footerMenu);
        _this4.elements.footerMenu = toFragment`<div class="feds-menu-content"></div>`;
        columns.forEach(column => _this4.elements.footerMenu.appendChild(column.parentElement));
        return Promise.resolve(_this4.loadMenuLogic()).then(function () {
          return Promise.resolve(_this4.decorateMenu({
            item: _this4.elements.footerMenu,
            type: 'footerMenu'
          })).then(function () {
            _this4.elements.headlines = _this4.elements.footerMenu.querySelectorAll('.feds-menu-headline');
            return _this4.elements.footerMenu;
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    this.loadIcons = function () {
      try {
        return Promise.resolve(fetch(`https://main--milo--adobecom.hlx.page/libs/blocks/global-footer/icons.svg`)).then(function (file) {
          return Promise.resolve(file.text()).then(function (content) {
            const elem = toFragment`<div class="feds-footer-icons">${content}</div>`;
            _this5.block.append(elem);
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    this.decorateProducts = function () {
      try {
        _this6.elements.featuredProducts = '';

        // Get the featured products wrapper by looking for a link group's parent
        const featuredProductElem = _this6.body.querySelector('.link-group');
        if (!featuredProductElem) return Promise.resolve(_this6.elements.featuredProducts);
        const featuredProductsContent = featuredProductElem.parentElement;
        _this6.elements.featuredProducts = toFragment`<div class="feds-featuredProducts"></div>`;
        return Promise.resolve(Promise.all([replaceKey('featured-products', getFedsPlaceholderConfig()), _this6.loadMenuLogic()])).then(function (_ref) {
          let [placeholder] = _ref;
          if (placeholder && placeholder.length) {
            _this6.elements.featuredProducts.append(toFragment`<span class="feds-featuredProducts-label">${placeholder}</span>`);
          }
          featuredProductsContent.querySelectorAll('.link-group').forEach(linkGroup => {
            _this6.elements.featuredProducts.append(_this6.decorateLinkGroup(linkGroup));
          });
          return _this6.elements.featuredProducts;
        });
      } catch (e) {
        return Promise.reject(e);
      }
    };
    this.decorateRegionPicker = function () {
      try {
        function _temp5() {
          return _this7.regionPicker;
        }
        _this7.elements.regionPicker = '';
        const regionSelector = _this7.body.querySelector('.region-selector a');
        if (!regionSelector) return Promise.resolve(_this7.elements.regionPicker);
        let url;
        try {
          url = new URL(regionSelector.href);
        } catch (e) {
          lanaLog({
            message: `Could not create URL for region picker; href: ${regionSelector.href}`,
            tags: 'errorType=error,module=global-footer'
          });
          return Promise.resolve(_this7.elements.regionPicker);
        }
        const regionPickerClass = 'feds-regionPicker';
        const regionPickerTextElem = toFragment`<span class="feds-regionPicker-text">${regionSelector.textContent}</span>`;
        const regionPickerElem = toFragment`
      <a
        href="${regionSelector.href}"
        class="${regionPickerClass}"
        aria-expanded="false"
        aria-haspopup="true"
        role="button">
        <svg xmlns="http://www.w3.org/2000/svg" class="feds-regionPicker-globe" focusable="false">
          <use href="#footer-icon-globe" />
        </svg>
        ${regionPickerTextElem}
      </a>`;
        const regionPickerWrapperClass = 'feds-regionPicker-wrapper';
        _this7.elements.regionPicker = toFragment`<div class="${regionPickerWrapperClass}">
        ${regionPickerElem}
      </div>`;
        const isRegionPickerExpanded = () => regionPickerElem.getAttribute('aria-expanded') === 'true';

        // Note: the region picker currently works only with Milo modals/fragments;
        // in the future we'll need to update this for non-Milo consumers
        const _temp4 = function () {
          if (url.hash !== '') {
            // Hash -> region selector opens a modal
            decorateAutoBlock(regionPickerElem); // add modal-specific attributes
            // TODO remove logs after finding the root cause for the region picker 404s -> MWPW-143627
            if (regionPickerElem.classList[0] !== 'modal') {
              lanaLog({
                message: `Modal block class missing from region picker pre loading the block; locale: ${locale}; regionPickerElem: ${regionPickerElem.outerHTML}`,
                tags: 'errorType=warn,module=global-footer'
              });
            }
            return Promise.resolve(loadBlock$1(regionPickerElem)).then(function () {
              // load modal logic and styles
              if (regionPickerElem.classList[0] !== 'modal') {
                lanaLog({
                  message: `Modal block class missing from region picker post loading the block; locale: ${locale}; regionPickerElem: ${regionPickerElem.outerHTML}`,
                  tags: 'errorType=warn,module=global-footer'
                });
              }
              // 'decorateAutoBlock' logic replaces class name entirely, need to add it back
              regionPickerElem.classList.add(regionPickerClass);
              regionPickerElem.addEventListener('click', () => {
                if (!isRegionPickerExpanded()) {
                  regionPickerElem.setAttribute('aria-expanded', 'true');
                }
              });
              // Set aria-expanded to false when region modal is closed
              window.addEventListener('milo:modal:closed', () => {
                if (isRegionPickerExpanded()) {
                  regionPickerElem.setAttribute('aria-expanded', 'false');
                }
              });
            });
          } else {
            // No hash -> region selector expands a dropdown
            regionPickerElem.href = '#'; // reset href value to not get treated as a fragment
            decorateAutoBlock(regionSelector); // add fragment-specific class(es)
            _this7.elements.regionPicker.append(regionSelector); // add fragment after regionPickerElem
            return Promise.resolve(loadBlock$1(regionSelector)).then(function () {
              // load fragment and replace original link
              // Update aria-expanded on click
              regionPickerElem.addEventListener('click', e => {
                e.preventDefault();
                const isDialogActive = regionPickerElem.getAttribute('aria-expanded') === 'true';
                regionPickerElem.setAttribute('aria-expanded', !isDialogActive);
              });
              // Close region picker dropdown on outside click
              document.addEventListener('click', e => {
                if (isRegionPickerExpanded() && !e.target.closest(`.${regionPickerWrapperClass}`)) {
                  regionPickerElem.setAttribute('aria-expanded', false);
                }
              });
            });
          }
        }();
        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4));
      } catch (e) {
        return Promise.reject(e);
      }
    };
    this.decorateSocial = () => {
      this.elements.social = '';
      const socialBlock = this.body.querySelector('.social');
      if (!socialBlock) return this.elements.social;
      const socialElem = toFragment`<ul class="feds-social" daa-lh="Social"></ul>`;
      CONFIG.socialPlatforms.forEach((platform, index) => {
        const link = socialBlock.querySelector(`a[href*="${platform}"]`);
        if (!link) return;
        const iconElem = toFragment`<li class="feds-social-item">
          <a
            href="${link.href}"
            class="feds-social-link"
            aria-label="${platform}"
            daa-ll="${getAnalyticsValue(platform, index + 1)}"
            target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" class="feds-social-icon" alt="${platform} logo">
              <use href="#footer-icon-${platform}" />
            </svg>
          </a>
        </li>`;
        socialElem.append(iconElem);
      });
      this.elements.social = socialElem.childElementCount !== 0 ? socialElem : '';
      return this.elements.social;
    };
    this.decoratePrivacy = () => {
      this.elements.legal = '';
      // Get the legal links wrapper by looking for the copyright text's parent
      const copyrightElem = this.body.querySelector('div > p > em');
      if (!copyrightElem) return this.elements.legal;
      const privacyContent = copyrightElem.closest('div');

      // Decorate copyright element
      const currentYear = new Date().getFullYear();
      copyrightElem.replaceWith(toFragment`<span class="feds-footer-copyright">
        Copyright © ${currentYear} ${copyrightElem.textContent}
      </span>`);

      // Add Ad Choices icon
      const adChoicesElem = privacyContent.querySelector('a[href*="#interest-based-ads"]');
      adChoicesElem?.prepend(toFragment`<svg xmlns="http://www.w3.org/2000/svg" class="feds-adChoices-icon" focusable="false">
        <use href="#footer-icon-adchoices" />
      </svg>`);
      this.elements.legal = toFragment`<div class="feds-footer-legalWrapper" daa-lh="Legal"></div>`;
      while (privacyContent.children.length) {
        const privacySection = privacyContent.firstElementChild;
        privacySection.classList.add('feds-footer-privacySection');
        privacySection.querySelectorAll('a').forEach((link, index) => {
          link.classList.add('feds-footer-privacyLink');
          link.setAttribute('daa-ll', getAnalyticsValue(link.textContent, index + 1));
        });
        this.elements.legal.append(privacySection);
      }
      return this.elements.legal;
    };
    this.decorateFooter = () => {
      this.elements.footer = toFragment`<div class="feds-footer-wrapper">
        ${this.elements.footerMenu}
        ${this.elements.featuredProducts}
        <div class="feds-footer-options">
          <div class="feds-footer-miscLinks">
            ${this.elements.regionPicker}
            ${this.elements.social}
          </div>
          ${this.elements.legal}
        </div>
      </div>`;
      return this.elements.footer;
    };
    this.block = block;
    this.elements = {};
    this.init();
  }
}
const locales = {
  '': {
    ietf: 'en-US',
    tk: 'hah7vzn.css'
  },
  ae_ar: {
    ietf: 'ar-AE',
    tk: 'lpk1hwn.css',
    dir: 'rtl'
  },
  ae_en: {
    ietf: 'en',
    tk: 'hah7vzn.css'
  },
  africa: {
    ietf: 'en',
    tk: 'hah7vzn.css'
  },
  ar: {
    ietf: 'ar',
    tk: 'lpk1hwn.css',
    dir: 'rtl'
  },
  ar_es: {
    ietf: 'es-AR',
    tk: 'hah7vzn.css'
  },
  at: {
    ietf: 'de-AT',
    tk: 'hah7vzn.css'
  },
  au: {
    ietf: 'en-AU',
    tk: 'hah7vzn.css'
  },
  be_en: {
    ietf: 'en-BE',
    tk: 'hah7vzn.css'
  },
  be_fr: {
    ietf: 'fr-BE',
    tk: 'hah7vzn.css'
  },
  be_nl: {
    ietf: 'nl-BE',
    tk: 'qxw8hzm.css'
  },
  bg: {
    ietf: 'bg-BG',
    tk: 'qxw8hzm.css'
  },
  br: {
    ietf: 'pt-BR',
    tk: 'hah7vzn.css'
  },
  ca_fr: {
    ietf: 'fr-CA',
    tk: 'hah7vzn.css'
  },
  ca: {
    ietf: 'en-CA',
    tk: 'hah7vzn.css'
  },
  ch_de: {
    ietf: 'de-CH',
    tk: 'hah7vzn.css'
  },
  ch_fr: {
    ietf: 'fr-CH',
    tk: 'hah7vzn.css'
  },
  ch_it: {
    ietf: 'it-CH',
    tk: 'hah7vzn.css'
  },
  cl: {
    ietf: 'es-CL',
    tk: 'hah7vzn.css'
  },
  cn: {
    ietf: 'zh-CN',
    tk: 'qxw8hzm'
  },
  co: {
    ietf: 'es-CO',
    tk: 'hah7vzn.css'
  },
  cr: {
    ietf: 'es-419',
    tk: 'hah7vzn.css'
  },
  cy_en: {
    ietf: 'en-CY',
    tk: 'hah7vzn.css'
  },
  cz: {
    ietf: 'cs-CZ',
    tk: 'qxw8hzm.css'
  },
  de: {
    ietf: 'de-DE',
    tk: 'hah7vzn.css'
  },
  dk: {
    ietf: 'da-DK',
    tk: 'qxw8hzm.css'
  },
  ec: {
    ietf: 'es-419',
    tk: 'hah7vzn.css'
  },
  ee: {
    ietf: 'et-EE',
    tk: 'qxw8hzm.css'
  },
  eg_ar: {
    ietf: 'ar',
    tk: 'qxw8hzm.css',
    dir: 'rtl'
  },
  eg_en: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  el: {
    ietf: 'el',
    tk: 'qxw8hzm.css'
  },
  es: {
    ietf: 'es-ES',
    tk: 'hah7vzn.css'
  },
  fi: {
    ietf: 'fi-FI',
    tk: 'qxw8hzm.css'
  },
  fr: {
    ietf: 'fr-FR',
    tk: 'hah7vzn.css'
  },
  gr_el: {
    ietf: 'el',
    tk: 'qxw8hzm.css'
  },
  gr_en: {
    ietf: 'en-GR',
    tk: 'hah7vzn.css'
  },
  gt: {
    ietf: 'es-419',
    tk: 'hah7vzn.css'
  },
  hk_en: {
    ietf: 'en-HK',
    tk: 'hah7vzn.css'
  },
  hk_zh: {
    ietf: 'zh-HK',
    tk: 'jay0ecd'
  },
  hu: {
    ietf: 'hu-HU',
    tk: 'qxw8hzm.css'
  },
  id_en: {
    ietf: 'en',
    tk: 'hah7vzn.css'
  },
  id_id: {
    ietf: 'id',
    tk: 'qxw8hzm.css'
  },
  ie: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  il_en: {
    ietf: 'en-IL',
    tk: 'hah7vzn.css'
  },
  il_he: {
    ietf: 'he',
    tk: 'qxw8hzm.css',
    dir: 'rtl'
  },
  in_hi: {
    ietf: 'hi',
    tk: 'qxw8hzm.css'
  },
  in: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  it: {
    ietf: 'it-IT',
    tk: 'hah7vzn.css'
  },
  jp: {
    ietf: 'ja-JP',
    tk: 'dvg6awq'
  },
  kr: {
    ietf: 'ko-KR',
    tk: 'qjs5sfm'
  },
  kw_ar: {
    ietf: 'ar',
    tk: 'qxw8hzm.css',
    dir: 'rtl'
  },
  kw_en: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  la: {
    ietf: 'es-LA',
    tk: 'hah7vzn.css'
  },
  langstore: {
    ietf: 'en-US',
    tk: 'hah7vzn.css'
  },
  lt: {
    ietf: 'lt-LT',
    tk: 'qxw8hzm.css'
  },
  lu_de: {
    ietf: 'de-LU',
    tk: 'hah7vzn.css'
  },
  lu_en: {
    ietf: 'en-LU',
    tk: 'hah7vzn.css'
  },
  lu_fr: {
    ietf: 'fr-LU',
    tk: 'hah7vzn.css'
  },
  lv: {
    ietf: 'lv-LV',
    tk: 'qxw8hzm.css'
  },
  mena_ar: {
    ietf: 'ar',
    tk: 'qxw8hzm.css',
    dir: 'rtl'
  },
  mena_en: {
    ietf: 'en',
    tk: 'hah7vzn.css'
  },
  mt: {
    ietf: 'en-MT',
    tk: 'hah7vzn.css'
  },
  mx: {
    ietf: 'es-MX',
    tk: 'hah7vzn.css'
  },
  my_en: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  my_ms: {
    ietf: 'ms',
    tk: 'qxw8hzm.css'
  },
  ng: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  nl: {
    ietf: 'nl-NL',
    tk: 'qxw8hzm.css'
  },
  no: {
    ietf: 'no-NO',
    tk: 'qxw8hzm.css'
  },
  nz: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  pe: {
    ietf: 'es-PE',
    tk: 'hah7vzn.css'
  },
  ph_en: {
    ietf: 'en',
    tk: 'hah7vzn.css'
  },
  ph_fil: {
    ietf: 'fil-PH',
    tk: 'qxw8hzm.css'
  },
  pl: {
    ietf: 'pl-PL',
    tk: 'qxw8hzm.css'
  },
  pr: {
    ietf: 'es-419',
    tk: 'hah7vzn.css'
  },
  pt: {
    ietf: 'pt-PT',
    tk: 'hah7vzn.css'
  },
  qa_ar: {
    ietf: 'ar',
    tk: 'qxw8hzm.css',
    dir: 'rtl'
  },
  qa_en: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  ro: {
    ietf: 'ro-RO',
    tk: 'qxw8hzm.css'
  },
  ru: {
    ietf: 'ru-RU',
    tk: 'qxw8hzm.css'
  },
  sa_ar: {
    ietf: 'ar',
    tk: 'qxw8hzm.css',
    dir: 'rtl'
  },
  sa_en: {
    ietf: 'en',
    tk: 'hah7vzn.css'
  },
  se: {
    ietf: 'sv-SE',
    tk: 'qxw8hzm.css'
  },
  sg: {
    ietf: 'en-SG',
    tk: 'hah7vzn.css'
  },
  si: {
    ietf: 'sl-SI',
    tk: 'qxw8hzm.css'
  },
  sk: {
    ietf: 'sk-SK',
    tk: 'qxw8hzm.css'
  },
  th_en: {
    ietf: 'en',
    tk: 'hah7vzn.css'
  },
  th_th: {
    ietf: 'th',
    tk: 'qxw8hzm.css'
  },
  tr: {
    ietf: 'tr-TR',
    tk: 'qxw8hzm.css'
  },
  tw: {
    ietf: 'zh-TW',
    tk: 'jay0ecd'
  },
  ua: {
    ietf: 'uk-UA',
    tk: 'qxw8hzm.css'
  },
  uk: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  vn_en: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  vn_vi: {
    ietf: 'vi',
    tk: 'qxw8hzm.css'
  },
  za: {
    ietf: 'en-GB',
    tk: 'hah7vzn.css'
  },
  cis_en: {
    ietf: 'en',
    tk: 'rks2kng.css'
  },
  cis_ru: {
    ietf: 'ru',
    tk: 'qxw8hzm.css'
  },
  sea: {
    ietf: 'en',
    tk: 'hah7vzn.css'
  }
};
const config$1 = {
  geoRouting: 'on',
  fallbackRouting: 'on',
  links: 'on',
  imsClientId: 'milo',
  codeRoot: '/libs',
  locales,
  prodDomains: 'milo.adobe.com',
  jarvis: {
    id: 'milo',
    version: '1.0',
    onDemand: false
  },
  privacyId: '7a5eb705-95ed-4cc4-a11d-0cc5760e93db',
  // valid for *.adobe.com
  breadcrumbs: 'on',
  miloLibs: 'https://main--milo--adobecom.hlx.page/libs'
};
function init(block) {
  try {
    setConfig$1(config$1);
    block.classList.add('global-footer');
    const footer = new Footer({
      block
    });
    return footer;
  } catch (e) {
    lanaLog({
      message: 'Could not create footer',
      e
    });
    return null;
  }
}

export { _createForOfIteratorHelper as _, loadArea as a, getMetadata as b, createTag as c, loadStyle as d, loadScript as e, loadLink as f, getConfig as g, loadIms as h, decorateSectionAnalytics as i, init as j, utils as k, localizeLink as l, processTrackingLabels as p, updateConfig as u };
//# sourceMappingURL=global-footer-92adaea3.js.map
