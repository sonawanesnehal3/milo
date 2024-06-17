var globalFooter = require('./global-footer-26f98613.js');

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
const initFooterPromo = function (footerPromoTag, footerPromoType, doc = document) {
  try {
    function _temp3() {
      if (!href) return;
      return Promise.resolve(Promise.resolve().then(function () { return require('./fragment-239b1cbd.js'); })).then(function ({
        default: loadFragment
      }) {
        const a = globalFooter.createTag('a', {
          href
        }, href);
        const div = globalFooter.createTag('div', null, a);
        const section = globalFooter.createTag('div', null, div);
        doc.querySelector('main > div:last-of-type').insertAdjacentElement('afterend', section);
        return Promise.resolve(loadFragment(a)).then(function () {
          section.classList.add('section');
          const sections = document.querySelectorAll('main > div');
          globalFooter.decorateSectionAnalytics(section, sections.length - 1, config);
        });
      });
    }
    const config = globalFooter.getConfig();
    const {
      locale: {
        contentRoot
      }
    } = config;
    let href = footerPromoTag && `${contentRoot}/fragments/footer-promos/${footerPromoTag}`;
    const _temp2 = function () {
      if (footerPromoType === 'taxonomy') {
        return Promise.resolve(getPromoFromTaxonomy(contentRoot, doc)).then(function (promo) {
          if (promo) href = promo;
        });
      }
    }();
    return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(_temp3) : _temp3(_temp2));
  } catch (e) {
    return Promise.reject(e);
  }
};
const getPromoFromTaxonomy = function (contentRoot, doc) {
  try {
    let _exit;
    const NAME_KEY = 'Name';
    const FOOTER_PROMO_LINK_KEY = 'Footer Promo Link';
    const taxonomyUrl = `${contentRoot}/taxonomy.json`;
    const tags = [...doc.head.querySelectorAll('meta[property="article:tag"]')].map(el => el.content);
    if (!tags.length) return Promise.resolve(undefined);
    const _temp = _catch(function () {
      return Promise.resolve(fetch(taxonomyUrl)).then(function (resp) {
        if (!resp.ok) {
          _exit = 1;
          return undefined;
        }
        return Promise.resolve(resp.json()).then(function ({
          data
        }) {
          const primaryTag = data.find(tag => {
            const name = tag[NAME_KEY].split('|').pop().trim();
            return tags.includes(name) && tag[FOOTER_PROMO_LINK_KEY];
          });
          if (primaryTag) {
            const _primaryTag$FOOTER_PR = primaryTag[FOOTER_PROMO_LINK_KEY];
            _exit = 1;
            return _primaryTag$FOOTER_PR;
          }
        });
      });
    }, function (error) {
      /* c8 ignore next 2 */
      window.lana.log(`Footer Promo - Taxonomy error: ${error}`, {
        tags: 'errorType=info,module=footer-promo'
      });
    });
    return Promise.resolve(_temp && _temp.then ? _temp.then(function (_result) {
      return _exit ? _result : undefined;
    }) : _exit ? _temp : undefined);
  } catch (e) {
    return Promise.reject(e);
  }
};

exports["default"] = initFooterPromo;
//# sourceMappingURL=footer-promo-d8ca713d.js.map
