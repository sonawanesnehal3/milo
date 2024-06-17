const appendScriptTag = function ({
  locationUrl,
  getMetadata,
  createTag,
  getConfig
}) {
  try {
    const windowUrl = new URL(locationUrl);
    const seotechAPIUrl = getConfig()?.env?.name === 'prod' ? SEOTECH_API_URL_PROD : SEOTECH_API_URL_STAGE;
    const append = obj => {
      const script = createTag('script', {
        type: 'application/ld+json'
      }, JSON.stringify(obj));
      document.head.append(script);
    };
    const promises = [];
    if (getMetadata('seotech-structured-data') === 'on') {
      const pageUrl = `${windowUrl.origin}${windowUrl.pathname}`;
      const sheetUrl = new URLSearchParams(windowUrl.search).get('seotech-sheet-url') || getMetadata('seotech-sheet-url');
      promises.push(getStructuredData(pageUrl, sheetUrl, seotechAPIUrl).then(objects => objects.forEach(obj => append(obj))).catch(e => logError(e.message)));
    }
    if (getMetadata('seotech-video-url')) {
      promises.push(getVideoObject(getMetadata('seotech-video-url'), seotechAPIUrl).then(videoObject => append(videoObject)).catch(e => logError(e.message)));
    }
    return Promise.all(promises);
  } catch (e) {
    return Promise.reject(e);
  }
};
const getStructuredData = function (url, sheetUrl, seotechAPIUrl) {
  try {
    const apiUrl = new URL(seotechAPIUrl);
    apiUrl.pathname = '/api/v1/web/seotech/getStructuredData';
    apiUrl.searchParams.set('url', url);
    if (sheetUrl) {
      apiUrl.searchParams.set('sheetUrl', sheetUrl);
    }
    return Promise.resolve(fetch(apiUrl.href, {
      headers: {
        'Content-Type': 'application/json'
      }
    })).then(function (resp) {
      return Promise.resolve(resp?.json()).then(function (body) {
        if (!resp.ok) {
          throw new Error(`Failed to fetch structured data: ${body?.error}`);
        }
        return body.objects;
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const getVideoObject = function (url, seotechAPIUrl) {
  try {
    const videoUrl = new URL(url)?.href;
    const videoObjectUrl = `${seotechAPIUrl}/api/v1/web/seotech/getVideoObject?url=${videoUrl}`;
    return Promise.resolve(fetch(videoObjectUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    })).then(function (resp) {
      return Promise.resolve(resp?.json()).then(function (body) {
        if (!resp.ok) {
          throw new Error(`Failed to fetch video: ${body?.error}`);
        }
        return body.videoObject;
      });
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const SEOTECH_API_URL_PROD = 'https://14257-seotech.adobeioruntime.net';
const SEOTECH_API_URL_STAGE = 'https://14257-seotech-stage.adobeioruntime.net';
function logError(msg) {
  window.lana?.log(`SEOTECH: ${msg}`, {
    debug: false,
    implicitSampleRate: 100,
    sampleRate: 100,
    tags: 'errorType=seotech'
  });
}

exports.SEOTECH_API_URL_PROD = SEOTECH_API_URL_PROD;
exports.SEOTECH_API_URL_STAGE = SEOTECH_API_URL_STAGE;
exports.appendScriptTag = appendScriptTag;
exports["default"] = appendScriptTag;
exports.getStructuredData = getStructuredData;
exports.getVideoObject = getVideoObject;
exports.logError = logError;
//# sourceMappingURL=seotech-5df838a3.js.map
