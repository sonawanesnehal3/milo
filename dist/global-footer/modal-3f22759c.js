var globalFooter = require('./global-footer-26f98613.js');

/* eslint-disable import/no-cycle */
const getModal = function (details, custom) {
  try {
    function _temp4() {
      if (isDelayedModal) {
        dialog.classList.add('delayed-modal');
        const mediaBlock = dialog.querySelector('div.media');
        if (mediaBlock) {
          mediaBlock.classList.add('in-modal');
          const {
            miloLibs,
            codeRoot
          } = globalFooter.getConfig();
          const base = miloLibs || codeRoot;
          globalFooter.loadStyle(`${base}/styles/rounded-corners.css`);
        }
      }
      const localeModal = id?.includes('locale-modal') ? 'localeModal' : 'milo';
      const analyticsEventName = window.location.hash ? window.location.hash.replace('#', '') : localeModal;
      const close = globalFooter.createTag('button', {
        class: 'dialog-close',
        'aria-label': 'Close',
        'daa-ll': `${analyticsEventName}:modalClose:buttonClose`
      }, CLOSE_ICON);
      const focusVisible = {
        focusVisible: true
      };
      const focusablesOnLoad = [...dialog.querySelectorAll(FOCUSABLES)];
      const titleOnLoad = dialog.querySelector('h1, h2, h3, h4, h5');
      let firstFocusable;
      if (focusablesOnLoad.length && isElementInView(focusablesOnLoad[0])) {
        firstFocusable = focusablesOnLoad[0]; // eslint-disable-line prefer-destructuring
      } else if (titleOnLoad) {
        titleOnLoad.setAttribute('tabIndex', 0);
        firstFocusable = titleOnLoad;
      } else {
        firstFocusable = close;
      }
      dialog.addEventListener('keydown', event => {
        const isShiftKey = event.shiftKey;
        const isTab = event.key === 'Tab';
        const isCloseActive = document.activeElement === close;
        if (!isShiftKey && isTab && isCloseActive) {
          event.preventDefault();
          firstFocusable.focus(focusVisible);
        }
        if (isTab && isShiftKey && document.activeElement === firstFocusable) {
          event.preventDefault();
          close.focus(focusVisible);
        }
      });
      close.addEventListener('click', e => {
        closeModal(dialog);
        e.preventDefault();
      });
      dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          closeModal(dialog);
        }
      });
      dialog.append(close);
      document.body.append(dialog);
      firstFocusable.focus({
        preventScroll: true,
        ...focusVisible
      });
      window.dispatchEvent(loadedEvent);
      if (!dialog.classList.contains('curtain-off')) {
        document.body.classList.add('disable-scroll');
        const curtain = globalFooter.createTag('div', {
          class: 'modal-curtain is-open'
        });
        curtain.addEventListener('click', e => {
          if (e.target === curtain) closeModal(dialog);
        });
        dialog.insertAdjacentElement('afterend', curtain);
        [...document.querySelectorAll('header, main, footer')].forEach(element => element.setAttribute('aria-disabled', 'true'));
      }
      const iframe = dialog.querySelector('iframe');
      const _temp2 = function () {
        if (iframe) {
          const _temp = function () {
            if (dialog.classList.contains('commerce-frame')) {
              return Promise.resolve(Promise.resolve().then(function () { return require('./modal.merch-9a6aed90.js'); })).then(function ({
                default: enableCommerceFrameFeatures
              }) {
                return Promise.resolve(enableCommerceFrameFeatures({
                  dialog,
                  iframe
                })).then(function () {});
              });
            } else {
              /* Initially iframe height is set to 0% in CSS for the height auto adjustment feature.
              For modals without the 'commerce-frame' class height auto adjustment is not applicable */
              iframe.style.height = '100%';
            }
          }();
          if (_temp && _temp.then) return _temp.then(function () {});
        }
      }();
      return _temp2 && _temp2.then ? _temp2.then(function () {
        return dialog;
      }) : dialog;
    }
    if (!(details?.path || custom)) return Promise.resolve(null);
    const {
      id
    } = details || custom;
    const dialog = globalFooter.createTag('div', {
      class: 'dialog-modal',
      id
    });
    const loadedEvent = new Event('milo:modal:loaded');
    if (custom) getCustomModal(custom, dialog);
    const _temp3 = function () {
      if (details) return Promise.resolve(getPathModal(details.path, dialog)).then(function () {});
    }();
    return Promise.resolve(_temp3 && _temp3.then ? _temp3.then(_temp4) : _temp4(_temp3));
  } catch (e) {
    return Promise.reject(e);
  }
};
const getPathModal = function (path, dialog) {
  try {
    const block = globalFooter.createTag('a', {
      href: path
    });
    dialog.append(block);

    // eslint-disable-next-line import/no-cycle
    return Promise.resolve(Promise.resolve().then(function () { return require('./fragment-239b1cbd.js'); })).then(function ({
      default: getFragment
    }) {
      return Promise.resolve(getFragment(block)).then(function () {});
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const FOCUSABLES = 'a:not(.hide-video), button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]';
const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <g transform="translate(-10500 3403)">
    <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#707070"/>
    <line y1="8" x2="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"/>
    <line x1="8" y1="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"/>
  </g>
</svg>`;
let isDelayedModal = false;
function findDetails(hash, el) {
  const id = hash.replace('#', '');
  const a = el || document.querySelector(`a[data-modal-hash="${hash}"]`);
  const path = a?.dataset.modalPath || globalFooter.localizeLink(globalFooter.getMetadata(`-${id}`));
  return {
    id,
    path,
    isHash: hash === window.location.hash
  };
}
function sendAnalytics(event) {
  // eslint-disable-next-line no-underscore-dangle
  window._satellite?.track('event', {
    xdm: {},
    data: {
      web: {
        webInteraction: {
          name: event?.type
        }
      },
      _adobe_corpnew: {
        digitalData: event?.data
      }
    }
  });
}
function closeModal(modal) {
  const {
    id
  } = modal;
  const closeEvent = new Event('milo:modal:closed');
  window.dispatchEvent(closeEvent);
  document.querySelectorAll(`#${id}`).forEach(mod => {
    if (mod.classList.contains('dialog-modal')) {
      const modalCurtain = document.querySelector(`#${id}~.modal-curtain`);
      if (modalCurtain) {
        modalCurtain.remove();
      }
      mod.remove();
    }
    document.querySelector(`[data-modal-hash="#${mod.id}"]`)?.focus();
  });
  if (!document.querySelectorAll('.modal-curtain').length) {
    document.body.classList.remove('disable-scroll');
  }
  [...document.querySelectorAll('header, main, footer')].forEach(element => element.removeAttribute('aria-disabled'));
  const hashId = window.location.hash.replace('#', '');
  if (hashId === modal.id) window.history.pushState('', document.title, `${window.location.pathname}${window.location.search}`);
  isDelayedModal = false;
}
function isElementInView(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
function getCustomModal(custom, dialog) {
  const {
    miloLibs,
    codeRoot
  } = globalFooter.getConfig();
  globalFooter.loadStyle(`${miloLibs || codeRoot}/blocks/modal/modal.css`);
  if (custom.id) dialog.id = custom.id;
  if (custom.class) dialog.classList.add(custom.class);
  if (custom.closeEvent) {
    dialog.addEventListener(custom.closeEvent, () => {
      closeModal(dialog);
    });
  }
  dialog.append(custom.content);
}
function getHashParams(hashStr) {
  if (!hashStr) return {};
  return hashStr.split(':').reduce((params, part) => {
    if (part.startsWith('#')) {
      params.hash = part;
    } else {
      const [key, val] = part.split('=');
      if (key === 'delay' && parseInt(val, 10) > 0) {
        params.delay = parseInt(val, 10) * 1000;
      }
    }
    return params;
  }, {});
}
function delayedModal(el) {
  const {
    hash,
    delay
  } = getHashParams(el?.dataset.modalHash);
  if (!delay || !hash) return false;
  isDelayedModal = true;
  el.classList.add('hide-block');
  const modalOpenEvent = new Event(`${hash}:modalOpen`);
  const pagesModalWasShownOn = window.sessionStorage.getItem(`shown:${hash}`);
  el.dataset.modalHash = hash;
  el.href = hash;
  if (!pagesModalWasShownOn?.includes(window.location.pathname)) {
    setTimeout(() => {
      window.location.replace(hash);
      sendAnalytics(modalOpenEvent);
      window.sessionStorage.setItem(`shown:${hash}`, `${pagesModalWasShownOn || ''} ${window.location.pathname}`);
    }, delay);
  }
  return true;
}

// Deep link-based
function init(el) {
  const {
    modalHash
  } = el.dataset;
  if (delayedModal(el) || window.location.hash !== modalHash || document.querySelector(`div.dialog-modal${modalHash}`)) return null;
  const details = findDetails(window.location.hash, el);
  return details ? getModal(details) : null;
}

// Click-based modal
window.addEventListener('hashchange', e => {
  if (!window.location.hash) {
    try {
      const url = new URL(e.oldURL);
      const dialog = document.querySelector(`.dialog-modal${url.hash}`);
      if (dialog) closeModal(dialog);
    } catch (error) {
      /* do nothing */
    }
  } else {
    const details = findDetails(window.location.hash, null);
    if (details) getModal(details);
  }
});

exports.closeModal = closeModal;
exports["default"] = init;
exports.delayedModal = delayedModal;
exports.findDetails = findDetails;
exports.getHashParams = getHashParams;
exports.getModal = getModal;
exports.sendAnalytics = sendAnalytics;
//# sourceMappingURL=modal-3f22759c.js.map
