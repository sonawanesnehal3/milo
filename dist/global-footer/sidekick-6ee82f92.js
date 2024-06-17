function stylePublish(sk) {
  const style = new CSSStyleSheet();
  style.replaceSync(`
    :host {
      --bg-color: rgb(129 27 14);
      --text-color: #fff0f0;
      color-scheme: light dark;
    }
    .publish.plugin {
      order: 100;
    }
    .publish.plugin button {
      background: var(--bg-color);
      border-color: #b46157;
      color: var(--text-color);
      position: relative;
    }
    .publish.plugin button:hover {
      background-color: var(--hlx-sk-button-hover-bg);
      border-color: unset;
      color: var(--hlx-sk-button-hover-color);
    }
    .publish.plugin button > span {
      display: none;
      background: var(--bg-color);
      border-radius: 4px;
      line-height: 1.2rem;
      padding: 8px 12px;
      position: absolute;
      top: 34px;
      left: 50%;
      transform: translateX(-50%);
      width: 150px;
      white-space: pre-wrap;
    }
    .publish.plugin button:hover > span {
      display: block;
      color: var(--text-color);
    }
    .publish.plugin button > span:before {
      content: '';
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid var(--bg-color);
      position: absolute;
      text-align: center;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
    }
  `);
  sk.shadowRoot.adoptedStyleSheets = [style];
  setTimeout(() => {
    const btn = sk.shadowRoot.querySelector('.publish.plugin button');
    btn?.insertAdjacentHTML('beforeend', `
      <span>Are you sure? This will publish to production.</span>
    `);
  }, 500);
}

// loadScript and loadStyle are passed in to avoid circular dependencies
function init({
  createTag,
  loadBlock,
  loadScript,
  loadStyle
}) {
  // manifest v3
  const sendToCaasListener = function (e) {
    try {
      const {
        host,
        project,
        ref: branch,
        repo,
        owner
      } = e.detail.data.config;
      // eslint-disable-next-line import/no-unresolved
      return Promise.resolve(import('https://milo.adobe.com/tools/send-to-caas/send-to-caas.js')).then(function ({
        sendToCaaS
      }) {
        sendToCaaS({
          host,
          project,
          branch,
          repo,
          owner
        }, loadScript, loadStyle);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const checkSchemaListener = function () {
    try {
      const schema = document.querySelector('script[type="application/ld+json"]');
      if (schema === null) return Promise.resolve();
      const resultsUrl = 'https://search.google.com/test/rich-results?url=';
      window.open(`${resultsUrl}${encodeURIComponent(window.location.href)}`, 'check-schema');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };
  const preflightListener = function () {
    try {
      const preflight = createTag('div', {
        class: 'preflight'
      });
      return Promise.resolve(loadBlock(preflight)).then(function (content) {
        return Promise.resolve(import('./modal-6e215c97.js')).then(function ({
          getModal
        }) {
          getModal(null, {
            id: 'preflight',
            content,
            closeEvent: 'closeModal'
          });
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  // Support for legacy manifest v2 - Delete once everyone is migrated to v3
  document.addEventListener('send-to-caas', function (e) {
    try {
      const {
        host,
        project,
        branch,
        repo,
        owner
      } = e.detail;
      return Promise.resolve(import('./send-to-caas-fac81f50.js')).then(function ({
        sendToCaaS
      }) {
        sendToCaaS({
          host,
          project,
          branch,
          repo,
          owner
        }, loadScript, loadStyle);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  });
  const sk = document.querySelector('helix-sidekick');

  // Add plugin listeners here
  sk.addEventListener('custom:send-to-caas', sendToCaasListener);
  sk.addEventListener('custom:check-schema', checkSchemaListener);
  sk.addEventListener('custom:preflight', preflightListener);

  // Color code publish button
  stylePublish(sk);
}

export { init as default };
//# sourceMappingURL=sidekick-6ee82f92.js.map
