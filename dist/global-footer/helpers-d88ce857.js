var globalFooter = require('./global-footer-26f98613.js');

/**
 * Prefixes the link with the language root defined in the metadata
 * @param link
 * @returns {string|*}
 */
// eslint-disable-next-line import/prefer-default-export

const customFetch = function ({
  resource,
  withCacheRules
}) {
  try {
    const options = {};
    if (withCacheRules) {
      const params = new URLSearchParams(window.location.search);
      options.cache = params.get('cache') === 'off' ? 'reload' : 'default';
    }
    return Promise.resolve(fetch(resource, options));
  } catch (e) {
    return Promise.reject(e);
  }
};
function updateLinkWithLangRoot(link) {
  const langRoot = globalFooter.getMetadata('lang-root');
  if (!langRoot) return link;
  try {
    const url = new URL(link);
    url.pathname = `${langRoot}${url.pathname}`;
    return url.href;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Could not update link with lang root', e);
    return link;
  }
}

exports.customFetch = customFetch;
exports.updateLinkWithLangRoot = updateLinkWithLangRoot;
//# sourceMappingURL=helpers-d88ce857.js.map
