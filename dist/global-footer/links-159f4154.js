const init = function (path, area = document) {
  return Promise.resolve(fetchSeoLinks(path)).then(function (seoLinks) {
    if (!seoLinks) return;
    const {
      origin
    } = window.location;
    const pageLinks = area.querySelectorAll('a:not([href^="/"])');
    [...pageLinks].forEach(link => {
      seoLinks.filter(s => link.href.startsWith(s.domain) || s.domain === 'off-origin' && !link.href.startsWith(origin)).forEach(s => {
        if (s.rel) link.setAttribute('rel', s.rel);
        if (s.window && !link.getAttribute('target')) link.setAttribute('target', s.window);
      });
    });
  });
};
let fetched = false;
let linkData = null;
const fetchSeoLinks = function (path) {
  try {
    if (!path) return Promise.resolve(null);
    const _temp3 = function () {
      if (!fetched) {
        return Promise.resolve(fetch(path)).then(function (resp) {
          function _temp2() {
            fetched = true;
          }
          const _temp = function () {
            if (resp.ok) {
              return Promise.resolve(resp.json()).then(function (json) {
                linkData = json.data;
              });
            }
          }();
          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        });
      }
    }();
    return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(function () {
      return linkData;
    }) : linkData);
  } catch (e) {
    return Promise.reject(e);
  }
};

exports["default"] = init;
//# sourceMappingURL=links-159f4154.js.map
