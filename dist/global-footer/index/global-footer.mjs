/* eslint-disable no-console */

const AUTO_BLOCKS = [
  { adobetv: 'tv.adobe.com' },
  { gist: 'https://gist.github.com' },
  { caas: '/tools/caas' },
  { faas: '/tools/faas' },
  { fragment: '/fragments/' },
  { instagram: 'https://www.instagram.com' },
  { slideshare: 'https://www.slideshare.net' },
  { tiktok: 'https://www.tiktok.com' },
  { twitter: 'https://twitter.com' },
  { vimeo: 'https://vimeo.com' },
  { vimeo: 'https://player.vimeo.com' },
  { youtube: 'https://www.youtube.com' },
  { youtube: 'https://youtu.be' },
  { 'pdf-viewer': '.pdf' },
  { video: '.mp4' },
  { merch: '/tools/ost?' },
];
const DO_NOT_INLINE = [
  'accordion',
  'columns',
  'z-pattern',
];

const ENVS = {
  stage: {
    name: 'stage',
    ims: 'stg1',
    adobeIO: 'cc-collab-stage.adobe.io',
    adminconsole: 'stage.adminconsole.adobe.com',
    account: 'stage.account.adobe.com',
    edgeConfigId: '8d2805dd-85bf-4748-82eb-f99fdad117a6',
    pdfViewerClientId: '600a4521c23d4c7eb9c7b039bee534a0',
  },
  prod: {
    name: 'prod',
    ims: 'prod',
    adobeIO: 'cc-collab.adobe.io',
    adminconsole: 'adminconsole.adobe.com',
    account: 'account.adobe.com',
    edgeConfigId: '2cba807b-7430-41ae-9aac-db2b0da742d5',
    pdfViewerClientId: '3c0a5ddf2cc04d3198d9e48efc390fa9',
  },
};
ENVS.local = {
  ...ENVS.stage,
  name: 'local',
};

const LANGSTORE = 'langstore';
const PAGE_URL = new URL(window.location.href);
const SLD = PAGE_URL.hostname.includes('.aem.') ? 'aem' : 'hlx';

function getEnv(conf) {
  const { host } = window.location;
  const query = PAGE_URL.searchParams.get('env');

  if (query) return { ...ENVS[query], consumer: conf[query] };
  if (host.includes('localhost')) return { ...ENVS.local, consumer: conf.local };
  /* c8 ignore start */
  if (host.includes(`${SLD}.page`)
    || host.includes(`${SLD}.live`)
    || host.includes('stage.adobe')
    || host.includes('corp.adobe')) {
    return { ...ENVS.stage, consumer: conf.stage };
  }
  return { ...ENVS.prod, consumer: conf.prod };
  /* c8 ignore stop */
}

function getLocale(locales, pathname = window.location.pathname) {
  if (!locales) {
    return { ietf: 'en-US', tk: 'hah7vzn.css', prefix: '' };
  }
  const split = pathname.split('/');
  const localeString = split[1];
  const locale = locales[localeString] || locales[''];
  if (localeString === LANGSTORE) {
    locale.prefix = `/${localeString}/${split[2]}`;
    if (
      Object.values(locales)
        .find((loc) => loc.ietf?.startsWith(split[2]))?.dir === 'rtl'
    ) locale.dir = 'rtl';
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
  const entPromise = new Promise((resolve) => {
    entResolve = resolve;
  });

  return (resolveVal) => {
    if (resolveVal !== undefined) {
      entResolve(resolveVal);
    }
    return entPromise;
  };
})();

function setupMiloObj(config) {
  window.milo ||= {};
  window.milo.deferredPromise = new Promise((resolve) => {
    config.resolveDeferred = resolve;
  });
}

const [setConfig, updateConfig, getConfig] = (() => {
  let config = {};
  return [
    (conf) => {
      const origin = conf.origin || window.location.origin;
      const pathname = conf.pathname || window.location.pathname;
      config = { env: getEnv(conf), ...conf };
      config.codeRoot = conf.codeRoot ? `${origin}${conf.codeRoot}` : origin;
      config.base = config.miloLibs || config.codeRoot;
      config.locale = pathname ? getLocale(conf.locales, pathname) : getLocale(conf.locales);
      config.autoBlocks = conf.autoBlocks ? [...AUTO_BLOCKS, ...conf.autoBlocks] : AUTO_BLOCKS;
      config.doNotInline = conf.doNotInline
        ? [...DO_NOT_INLINE, ...conf.doNotInline]
        : DO_NOT_INLINE;
      const lang = getMetadata('content-language') || config.locale.ietf;
      document.documentElement.setAttribute('lang', lang);
      try {
        const dir = getMetadata('content-direction')
          || config.locale.dir
          || (config.locale.ietf && (new Intl.Locale(config.locale.ietf)?.textInfo?.direction))
          || 'ltr';
        document.documentElement.setAttribute('dir', dir);
      } catch (e) {
        console.log('Invalid or missing locale:', e);
      }
      config.locale.contentRoot = `${origin}${config.locale.prefix}${config.contentRoot ?? ''}`;
      config.useDotHtml = !PAGE_URL.origin.includes(`.${SLD}.`)
        && (conf.useDotHtml ?? PAGE_URL.pathname.endsWith('.html'));
      config.entitlements = handleEntitlements;
      config.consumerEntitlements = conf.entitlements || [];
      setupMiloObj(config);
      return config;
    },
    (conf) => (config = conf),
    () => config,
  ];
})();

function loadLana(options = {}) {
  if (window.lana) return;

  const lanaError = (e) => {
    window.lana?.log(e.reason || e.error || e.message, { errorType: 'i' });
  };

  window.lana = {
    log: async (...args) => {
      window.removeEventListener('error', lanaError);
      window.removeEventListener('unhandledrejection', lanaError);
      await Promise.resolve().then(() => lana);
      return window.lana.log(...args);
    },
    debug: false,
    options,
  };

  window.addEventListener('error', lanaError);
  window.addEventListener('unhandledrejection', lanaError);
}

loadLana();

window.matchMedia('(min-width: 900px)');
window.matchMedia('(min-width: 900px) and (max-width: 1440px)');

(() => {
  let profileData;
  let profileResolve;
  let profileTimeout;

  const profilePromise = new Promise((resolve) => {
    profileResolve = resolve;

    profileTimeout = setTimeout(() => {
      profileData = {};
      resolve(profileData);
    }, 5000);
  });

  return [
    (data) => {
      if (data && !profileData) {
        profileData = data;
        clearTimeout(profileTimeout);
        profileResolve(profileData);
      }
    },
    () => profilePromise,
  ];
})();

/* eslint-disable no-async-promise-executor */

getConfig();

(function () {
  const MSG_LIMIT = 2000;

  const defaultOptions = {
    clientId: '',
    endpoint: 'https://www.adobe.com/lana/ll',
    endpointStage: 'https://www.stage.adobe.com/lana/ll',
    errorType: 'e',
    sampleRate: 1,
    tags: '',
    implicitSampleRate: 1,
    useProd: true,
  };

  const w = window;

  function isProd() {
    const { host } = window.location;
    if (host.substring(host.length - 10) === '.adobe.com'
      && host.substring(host.length - 15) !== '.corp.adobe.com'
      && host.substring(host.length - 16) !== '.stage.adobe.com') {
      return true;
    }
    return false;
  }

  function mergeOptions(op1, op2) {
    if (!op1) {
      op1 = {};
    }

    if (!op2) {
      op2 = {};
    }

    function getOpt(key) {
      if (op1[key] !== undefined) {
        return op1[key];
      }
      if (op2[key] !== undefined) {
        return op2[key];
      }
      return defaultOptions[key];
    }

    return Object.keys(defaultOptions).reduce((options, key) => {
      options[key] = getOpt(key);
      return options;
    }, {});
  }

  function sendUnhandledError(e) {
    log(e.reason || e.error || e.message, { errorType: 'i' });
  }

  function log(msg, options) {
    msg = msg && msg.stack ? msg.stack : (msg || '');
    if (msg.length > MSG_LIMIT) {
      msg = `${msg.slice(0, MSG_LIMIT)}<trunc>`;
    }

    const o = mergeOptions(options, w.lana.options);
    if (!o.clientId) {
      console.warn('LANA ClientID is not set in options.');
      return;
    }

    const sampleRate = o.errorType === 'i' ? o.implicitSampleRate : o.sampleRate;

    if (!w.lana.debug && !w.lana.localhost && sampleRate <= Math.random() * 100) return;

    const isProdDomain = isProd();

    const endpoint = (!isProdDomain || !o.useProd) ? o.endpointStage : o.endpoint;
    const queryParams = [
      `m=${encodeURIComponent(msg)}`,
      `c=${encodeURI(o.clientId)}`,
      `s=${sampleRate}`,
      `t=${encodeURI(o.errorType)}`,
    ];

    if (o.tags) {
      queryParams.push(`tags=${encodeURI(o.tags)}`);
    }

    if (!isProdDomain || w.lana.debug || w.lana.localhost) console.log('LANA Msg: ', msg, '\nOpts:', o);

    if (!w.lana.localhost || w.lana.debug) {
      const xhr = new XMLHttpRequest();
      if (w.lana.debug) {
        queryParams.push('d');
        xhr.addEventListener('load', () => {
          console.log('LANA response:', xhr.responseText);
        });
      }
      xhr.open('GET', `${endpoint}?${queryParams.join('&')}`);
      xhr.send();
      return xhr;
    }
  }

  function hasDebugParam() {
    return w.location.search.toLowerCase().indexOf('lanadebug') !== -1;
  }

  function isLocalhost() {
    return w.location.host.toLowerCase().indexOf('localhost') !== -1;
  }

  w.lana = {
    debug: false,
    log,
    options: mergeOptions(w.lana && w.lana.options),
  };

  /* c8 ignore next */
  if (hasDebugParam()) w.lana.debug = true;
  if (isLocalhost()) w.lana.localhost = true;

  w.addEventListener('error', sendUnhandledError);
  w.addEventListener('unhandledrejection', sendUnhandledError);
}());

const lana = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));
