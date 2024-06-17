import { g as getConfig, l as localizeLink, c as createTag, _ as _createForOfIteratorHelper, a as loadArea } from './global-footer-92adaea3.js';

const init = function (a) {
  try {
    var _iterator, _step;
    const {
      decorateArea,
      mep
    } = getConfig();
    let relHref = localizeLink(a.href);
    let inline = false;
    if (a.parentElement?.nodeName === 'P') {
      const children = a.parentElement.childNodes;
      const div = createTag('div');
      _iterator = _createForOfIteratorHelper(a.parentElement.attributes);
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          const attr = _step.value;
          div.setAttribute(attr.name, attr.value);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      a.parentElement.replaceWith(div);
      div.append(...children);
    }
    if (a.href.includes('#_inline')) {
      inline = true;
      a.href = a.href.replace('#_inline', '');
      relHref = relHref.replace('#_inline', '');
    }
    const path = new URL(a.href).pathname;
    if (mep?.fragments?.[path] && mep) {
      relHref = mep.handleFragmentCommand(mep?.fragments[path], a);
      if (!relHref) return Promise.resolve();
    }
    if (isCircularRef(relHref)) {
      window.lana?.log(`ERROR: Fragment Circular Reference loading ${a.href}`);
      return Promise.resolve();
    }
    return Promise.resolve(import('./helpers-07162686.js')).then(function ({
      customFetch
    }) {
      return Promise.resolve(customFetch({
        resource: `${a.href}.plain.html`,
        withCacheRules: true
      }).catch(() => ({}))).then(function (resp) {
        if (!resp?.ok) {
          window.lana?.log(`Could not get fragment: ${a.href}.plain.html`);
          return;
        }
        return Promise.resolve(resp.text()).then(function (html) {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          replaceDotMedia(a.href, doc);
          if (decorateArea) decorateArea(doc, {
            fragmentLink: a
          });
          const sections = doc.querySelectorAll('body > div');
          if (!sections.length) {
            window.lana?.log(`Could not make fragment: ${a.href}.plain.html`);
            return;
          }
          const fragment = createTag('div', {
            class: 'fragment',
            'data-path': relHref
          });
          if (!inline) {
            fragment.append(...sections);
          }
          updateFragMap(fragment, a, relHref);
          if (a.dataset.manifestId) {
            if (inline) {
              setManifestIdOnChildren(sections, a.dataset.manifestId);
            } else {
              fragment.dataset.manifestId = a.dataset.manifestId;
            }
          }
          const _temp = function () {
            if (inline) {
              insertInlineFrag(sections, a, relHref);
            } else {
              a.parentElement.replaceChild(fragment, a);
              return Promise.resolve(loadArea(fragment)).then(function () {});
            }
          }();
          if (_temp && _temp.then) return _temp.then(function () {});
        });
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const fragMap = {};
const removeHash = url => {
  const urlNoHash = url.split('#')[0];
  return url.includes('#_dnt') ? `${urlNoHash}#_dnt` : urlNoHash;
};
const isCircularRef = href => [...Object.values(fragMap)].some(tree => {
  const node = tree.find(href);
  return node ? !node.isLeaf : false;
});
const updateFragMap = (fragment, a, href) => {
  const fragLinks = [...fragment.querySelectorAll('a')].filter(link => localizeLink(link.href).includes('/fragments/'));
  if (!fragLinks.length) return;
  if (document.body.contains(a)) {
    // is fragment on page (not nested)
    // eslint-disable-next-line no-use-before-define
    fragMap[href] = new Tree(href);
    fragLinks.forEach(link => fragMap[href].insert(href, localizeLink(removeHash(link.href))));
  } else {
    Object.values(fragMap).forEach(tree => {
      if (tree.find(href)) {
        fragLinks.forEach(link => tree.insert(href, localizeLink(removeHash(link.href))));
      }
    });
  }
};
const setManifestIdOnChildren = (sections, manifestId) => {
  [...sections[0].children].forEach(child => child.dataset.manifestId = manifestId);
};
const insertInlineFrag = (sections, a, relHref) => {
  // Inline fragments only support one section, other sections are ignored
  const fragChildren = [...sections[0].children];
  fragChildren.forEach(child => child.setAttribute('data-path', relHref));
  if (a.parentElement.nodeName === 'DIV' && !a.parentElement.attributes.length) {
    a.parentElement.replaceWith(...fragChildren);
  } else {
    a.replaceWith(...fragChildren);
  }
};
function replaceDotMedia(path, doc) {
  const resetAttributeBase = (tag, attr) => {
    doc.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach(el => {
      el[attr] = new URL(el.getAttribute(attr), new URL(path, window.location)).href;
    });
  };
  resetAttributeBase('img', 'src');
  resetAttributeBase('source', 'srcset');
}
class Node {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.children = [];
  }
  get isLeaf() {
    return this.children.length === 0;
  }
}
class Tree {
  constructor(key, value = key) {
    this.root = new Node(key, value);
  }
  traverse(node = this.root) {
    var _this = this;
    return /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _iterator2, _step2, child;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return node;
          case 2:
            if (!node.children.length) {
              _context.next = 19;
              break;
            }
            _iterator2 = _createForOfIteratorHelper(node.children);
            _context.prev = 4;
            _iterator2.s();
          case 6:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 11;
              break;
            }
            child = _step2.value;
            return _context.delegateYield(_this.traverse(child), "t0", 9);
          case 9:
            _context.next = 6;
            break;
          case 11:
            _context.next = 16;
            break;
          case 13:
            _context.prev = 13;
            _context.t1 = _context["catch"](4);
            _iterator2.e(_context.t1);
          case 16:
            _context.prev = 16;
            _iterator2.f();
            return _context.finish(16);
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[4, 13, 16, 19]]);
    })();
  }
  insert(parentNodeKey, key, value = key) {
    var _iterator3 = _createForOfIteratorHelper(this.traverse()),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        const node = _step3.value;
        if (node.key === parentNodeKey) {
          node.children.push(new Node(key, value, node));
          return true;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return false;
  }
  remove(key) {
    var _iterator4 = _createForOfIteratorHelper(this.traverse()),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        const node = _step4.value;
        const filtered = node.children.filter(c => c.key !== key);
        if (filtered.length !== node.children.length) {
          node.children = filtered;
          return true;
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    return false;
  }
  find(key) {
    var _iterator5 = _createForOfIteratorHelper(this.traverse()),
      _step5;
    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        const node = _step5.value;
        if (node.key === key) return node;
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
    return undefined;
  }
}

export { Tree, init as default };
//# sourceMappingURL=fragment-995a354d.js.map
