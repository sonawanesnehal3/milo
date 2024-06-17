var globalFooter = require('./global-footer-26f98613.js');

const getMetadata = (el, config) => [...el.childNodes].reduce((rdx, row) => {
  if (row.children?.length > 1) {
    const key = globalFooter.processTrackingLabels(row.children[0].textContent, config);
    const value = globalFooter.processTrackingLabels(row.children[1].textContent, config);
    if (key && value) rdx[key] = value;
  }
  return rdx;
}, {});
function init(el) {
  const config = globalFooter.getConfig();
  const {
    locale,
    ietf = locale?.ietf,
    analyticLocalization
  } = config;
  if (ietf !== 'en-US') {
    config.analyticLocalization = {
      ...analyticLocalization,
      ...getMetadata(el, config)
    };
  }
  el.remove();
  return config;
}

exports["default"] = init;
exports.getMetadata = getMetadata;
//# sourceMappingURL=martech-metadata-866acde7.js.map
