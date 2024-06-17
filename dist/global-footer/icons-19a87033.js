const loadIcons = function (icons, config) {
  try {
    return Promise.resolve(fetchIcons(config)).then(function (iconSVGs) {
      if (!iconSVGs) return;
      icons.forEach(function (icon) {
        try {
          const {
            classList
          } = icon;
          if (classList.contains('icon-tooltip')) decorateToolTip(icon);
          const iconName = icon.classList[1].replace('icon-', '');
          const existingIcon = icon.querySelector('svg');
          if (!iconSVGs[iconName] || existingIcon) return Promise.resolve();
          const parent = icon.parentElement;
          if (parent.childNodes.length > 1) {
            if (parent.lastChild === icon) {
              icon.classList.add('margin-left');
            } else if (parent.firstChild === icon) {
              icon.classList.add('margin-right');
              if (parent.parentElement.tagName === 'LI') parent.parentElement.classList.add('icon-list-item');
            } else {
              icon.classList.add('margin-left', 'margin-right');
            }
          }
          icon.insertAdjacentHTML('afterbegin', iconSVGs[iconName].outerHTML);
          return Promise.resolve();
        } catch (e) {
          return Promise.reject(e);
        }
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const getSVGsfromFile = function (path) {
  try {
    /* c8 ignore next */
    if (!path) return Promise.resolve(null);
    return Promise.resolve(Promise.resolve().then(function () { return require('./helpers-d88ce857.js'); })).then(function ({
      customFetch
    }) {
      return Promise.resolve(customFetch({
        resource: path,
        withCacheRules: true
      }).catch(() => ({}))).then(function (resp) {
        /* c8 ignore next */
        if (!resp.ok) return null;
        const miloIcons = {};
        return Promise.resolve(resp.text()).then(function (text) {
          const parser = new DOMParser();
          const parsedText = parser.parseFromString(text, 'image/svg+xml');
          const symbols = parsedText.querySelectorAll('symbol');
          symbols.forEach(symbol => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            while (symbol.firstChild) svg.appendChild(symbol.firstChild);
            [...symbol.attributes].forEach(attr => svg.attributes.setNamedItem(attr.cloneNode()));
            svg.classList.add('icon-milo', `icon-milo-${svg.id}`);
            miloIcons[svg.id] = svg;
          });
          return miloIcons;
        });
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
}; // eslint-disable-next-line no-async-promise-executor
let fetchedIcons;
let fetched = false;
const fetchIcons = config => new Promise(function (resolve) {
  try {
    function _temp2() {
      resolve(fetchedIcons);
    }
    const _temp = function () {
      if (!fetched) {
        const {
          miloLibs,
          codeRoot
        } = config;
        const base = miloLibs || codeRoot;
        return Promise.resolve(getSVGsfromFile(`${base}/img/icons/icons.svg`)).then(function (_getSVGsfromFile) {
          fetchedIcons = _getSVGsfromFile;
          fetched = true;
        });
      }
    }();
    /* c8 ignore next */
    return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
  } catch (e) {
    return Promise.reject(e);
  }
});
function decorateToolTip(icon) {
  const wrapper = icon.closest('em');
  wrapper.className = 'tooltip-wrapper';
  if (!wrapper) return;
  const conf = wrapper.textContent.split('|');
  // Text is the last part of a tooltip
  const content = conf.pop().trim();
  if (!content) return;
  icon.dataset.tooltip = content;
  // Position is the next to last part of a tooltip
  const place = conf.pop()?.trim().toLowerCase() || 'right';
  icon.className = `icon icon-info milo-tooltip ${place}`;
  wrapper.parentElement.replaceChild(icon, wrapper);
}

exports["default"] = loadIcons;
exports.fetchIcons = fetchIcons;
//# sourceMappingURL=icons-19a87033.js.map
