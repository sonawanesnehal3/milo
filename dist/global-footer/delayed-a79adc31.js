/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const loadJarvisChat = function (getConfig, getMetadata, loadScript, loadStyle) {
  try {
    const config = getConfig();
    const jarvis = getMetadata('jarvis-chat')?.toLowerCase();
    if (!jarvis || !['mobile', 'desktop', 'on'].includes(jarvis) || !config.jarvis?.id || !config.jarvis?.version) return Promise.resolve();
    const desktopViewport = window.matchMedia('(min-width: 900px)').matches;
    if (jarvis === 'mobile' && desktopViewport) return Promise.resolve();
    if (jarvis === 'desktop' && !desktopViewport) return Promise.resolve();
    return Promise.resolve(Promise.resolve().then(function () { return require('./jarvis-chat-d84b30c6.js'); })).then(function ({
      initJarvisChat
    }) {
      initJarvisChat(config, loadScript, loadStyle, getMetadata);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadPrivacy = function (getConfig, loadScript) {
  try {
    const acom = '7a5eb705-95ed-4cc4-a11d-0cc5760e93db';
    const ids = {
      'hlx.page': '3a6a37fe-9e07-4aa9-8640-8f358a623271-test',
      'hlx.live': '926b16ce-cc88-4c6a-af45-21749f3167f3-test'
    };
    const otDomainId = ids?.[Object.keys(ids).find(domainId => window.location.host.includes(domainId))] ?? (getConfig()?.privacyId || acom);
    window.fedsConfig = {
      privacy: {
        otDomainId
      },
      documentLanguage: true
    };
    loadScript('https://www.adobe.com/etc.clientlibs/globalnav/clientlibs/base/privacy-standalone.js');

    // Privacy triggers can exist anywhere on the page and can be added at any time
    document.addEventListener('click', event => {
      if (event.target.closest('a[href*="#openPrivacy"]')) {
        event.preventDefault();
        window.adobePrivacy?.showPreferenceCenter();
      }
    });
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
const loadGoogleLogin = function (getMetadata, loadIms, loadScript) {
  try {
    const googleLogin = getMetadata('google-login')?.toLowerCase();
    if (window.adobeIMS?.isSignedInUser() || !['mobile', 'desktop', 'on'].includes(googleLogin)) return Promise.resolve();
    const desktopViewport = window.matchMedia('(min-width: 900px)').matches;
    if (googleLogin === 'mobile' && desktopViewport) return Promise.resolve();
    if (googleLogin === 'desktop' && !desktopViewport) return Promise.resolve();
    return Promise.resolve(Promise.resolve().then(function () { return require('./google-login-126f40f7.js'); })).then(function ({
      default: initGoogleLogin
    }) {
      initGoogleLogin(loadIms, getMetadata, loadScript);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * Executes everything that happens a lot later, without impacting the user experience.
 */
const loadDelayed = ([getConfig, getMetadata, loadScript, loadStyle, loadIms], DELAY = 3000) => new Promise(resolve => {
  setTimeout(() => {
    loadPrivacy(getConfig, loadScript);
    loadJarvisChat(getConfig, getMetadata, loadScript, loadStyle);
    loadGoogleLogin(getMetadata, loadIms, loadScript);
    if (getMetadata('interlinks') === 'on') {
      const {
        locale
      } = getConfig();
      const path = `${locale.contentRoot}/keywords.json`;
      const language = locale.ietf?.split('-')[0];
      Promise.resolve().then(function () { return require('./interlinks-934a4b00.js'); }).then(mod => {
        mod.default(path, language);
        resolve(mod);
      });
    } else {
      resolve(null);
    }
    Promise.resolve().then(function () { return require('./samplerum-c14e9218.js'); }).then(({
      sampleRUM
    }) => sampleRUM('cwv'));
  }, DELAY);
});

exports["default"] = loadDelayed;
exports.loadGoogleLogin = loadGoogleLogin;
exports.loadJarvisChat = loadJarvisChat;
exports.loadPrivacy = loadPrivacy;
//# sourceMappingURL=delayed-a79adc31.js.map
