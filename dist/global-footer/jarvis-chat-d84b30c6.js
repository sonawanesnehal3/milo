let chatInitialized = false;
let loadScript;
let loadStyle;
let getMetadata;
const isSilentEvent = data => data['event.workflow'] === 'init' && data['event.type'] === 'request' || data['event.workflow'] === 'Chat' && data['event.type'] === 'load' && data['event.subtype'] === 'window';
const getBaseEvent = data => ({
  chatConversationId: data['event.context_guid'],
  chatConversationSessionId: data['event.session_guid'],
  chatWorkflow: data['event.workflow'],
  chatCategory: data['event.category'],
  chatSubcategory: data['event.subcategory'],
  chatType: data['event.type'],
  chatSubtype: data['event.subtype'],
  chatUserguid: data['event.user_guid'],
  chatLanguage: data['event.language'],
  chatPagename: data['event.pagename'],
  chatVisitorguid: data['event.visitor_guid'],
  chatUrl: data['event.url'],
  chatOrgguid: data['event.org_guid'],
  chatReferrer: data['event.referrer'],
  chatClientId: data['source.client_id'],
  chatSourceName: data['source.name'],
  chatPlatform: data['source.platform'],
  chatContentName: data['content.name'],
  chatEnv: data['env.com.name']
});
const setSophiaLayer = data => {
  const sophiaData = {
    variationId: data['exp.variation_id'],
    actionBlockId: data['exp.action_block_id'],
    campaignId: data['exp.campaign_id'],
    containerId: data['exp.container_id'],
    controlGroupId: data['exp.control_group_id'],
    treatmentId: data['exp.treatment_id'],
    surfaceId: data['exp.surface_id']
  };
  Object.keys(sophiaData).forEach(key => {
    if (!sophiaData[key]) delete sophiaData[key];
  });
  if (!Object.keys(sophiaData).length) return;
  const sophiaDataCaptured = id => {
    let captured = false;
    if (!id) return captured;
    const sophiaDataLayer = window.digitalData.sophiaResponse?.fromPage;
    if (Array.isArray(sophiaDataLayer)) {
      captured = sophiaDataLayer.some(sophiaEvent => sophiaEvent?.campaignId === id);
    } else {
      captured = sophiaDataLayer?.campaignId === id;
    }
    return captured;
  };
  if (sophiaDataCaptured(sophiaData.campaignId)) return;
  window.digitalData.sophiaResponse ||= {};
  window.digitalData.sophiaResponse.fromPage ||= [];
  if (Array.isArray(window.digitalData.sophiaResponse.fromPage)) {
    window.digitalData.sophiaResponse.fromPage.push(sophiaData);
  } else {
    window.digitalData.sophiaResponse.fromPage = sophiaData;
  }
};
const sendEvent = data => {
  setSophiaLayer(data);
  // eslint-disable-next-line no-underscore-dangle
  window._satellite?.track('event', {
    xdm: {},
    data: {
      web: {
        webInteraction: {
          name: window.digitalData.primaryEvent?.eventInfo?.eventName
        }
      },
      _adobe_corpnew: {
        digitalData: {
          primaryEvent: window.digitalData.primaryEvent,
          chat: window.digitalData.chat,
          sophiaResponse: window.digitalData.sophiaResponse
        }
      }
    }
  });
};
const getDataProperties = (data, properties = []) => properties.reduce((str, prop) => {
  let output = str;
  output += `${output && ':'}${data[prop] || ''}`;
  return output;
}, '');
const sendChatIconRenderEvent = data => {
  window.digitalData.primaryEvent = {
    eventInfo: {
      eventName: `chat:${getDataProperties(data, ['event.workflow', 'event.subcategory', 'event.subtype', 'content.name', 'event.type'])}`,
      eventAction: getDataProperties(data, ['event.subcategory', 'content.name', 'event.type'])
    }
  };
  window.digitalData.chat = {};
  window.digitalData.chat.chatInfo = getBaseEvent(data);
  window.digitalData.chat.chatInfo.chatConversationUnread = data['content.name'];
  sendEvent(data);
};
const sendChatIconClickEvent = data => {
  window.digitalData.primaryEvent = {
    eventInfo: {
      eventName: `chat:${getDataProperties(data, ['event.workflow', 'event.subcategory', 'event.subtype', 'content.name', 'event.type'])}`,
      eventAction: getDataProperties(data, ['event.subcategory', 'event.subtype', 'content.name', 'event.type'])
    }
  };
  window.digitalData.chat = {};
  window.digitalData.chat.chatInfo = getBaseEvent(data);
  window.digitalData.chat.chatInfo.chatConversationUnread = data['content.name'];
  sendEvent(data);
};
const sendProductEvent = data => {
  window.digitalData.primaryEvent = {
    eventInfo: {
      eventName: `chat:${getDataProperties(data, ['event.workflow', 'content.name', 'event.subtype', 'event.type'])}`,
      eventAction: getDataProperties(data, ['event.subcategory', 'content.name', 'event.subtype', 'event.type'])
    }
  };
  window.digitalData.chat = {
    chatInfo: {
      primaryProduct: {
        productName: data['event.subtype']
      }
    }
  };
  sendEvent(data);
};
const sendSurveyFeedbackEvent = data => {
  window.digitalData.primaryEvent = {
    eventInfo: {
      eventName: `chat:${getDataProperties(data, ['event.workflow', 'content.name', 'event.subtype', 'event.type', 'content.id'])}`,
      eventAction: getDataProperties(data, ['event.subcategory', 'content.name', 'event.subtype', 'event.type'])
    }
  };
  sendEvent(data);
};
const sendChatErrorEvent = data => {
  window.digitalData.primaryEvent = {
    eventInfo: {
      eventName: `chat:${getDataProperties(data, ['event.workflow', 'event.subtype', 'event.type'])}:error`,
      eventAction: `${getDataProperties(data, ['event.subcategory', 'event.subtype', 'event.type'])}:error`
    }
  };
  window.digitalData.chat = {};
  window.digitalData.chat.chatInfo = getBaseEvent(data);
  window.digitalData.chat.chatInfo.chatErrorCode = data['event.error_code'];
  window.digitalData.chat.chatInfo.chatErrorType = data['event.error_type'];
  window.digitalData.chat.chatInfo.chatErrorDescription = data['event.error_desc'];
  sendEvent(data);
};
const sendPrimaryEvent = data => {
  window.digitalData.primaryEvent = {
    eventInfo: {
      eventName: `chat:${getDataProperties(data, ['event.workflow', 'content.name', 'event.subtype', 'event.type'])}`,
      eventAction: getDataProperties(data, ['event.subcategory', 'content.name', 'event.subtype', 'event.type'])
    }
  };
  window.digitalData.chat = {};
  window.digitalData.chat.chatInfo = getBaseEvent(data);
  sendEvent(data);
};
const redirectToSupport = () => window.location.assign('https://helpx.adobe.com');
const isChatOpen = () => {
  const instance = window.AdobeMessagingExperienceClient;
  return instance?.isAdobeMessagingClientInitialized() && instance?.getMessagingExperienceState()?.windowState !== 'hidden';
};
const openChat = event => {
  if (!chatInitialized) redirectToSupport();
  const open = window.AdobeMessagingExperienceClient?.openMessagingWindow;
  if (typeof open !== 'function' || isChatOpen()) return;
  if (event) {
    const sourceType = event.target.tagName?.toLowerCase();
    const sourceText = sourceType === 'img' ? event.target.alt?.trim() : event.target.innerText?.trim();
    open({
      sourceType,
      sourceText
    });
  } else {
    open({});
  }
};
const startInitialization = function (config, event, onDemand) {
  try {
    const asset = 'https://client.messaging.adobe.com/latest/AdobeMessagingClient';
    return Promise.resolve(Promise.all([loadStyle(`${asset}.css`), loadScript(`${asset}.js`)])).then(function () {
      function _temp7(_window$alloy$then$ca) {
        _initialize.call(_window$AdobeMessagin, {
          appid: _temp,
          appver: _temp2,
          env: _temp3,
          clientId: _window$adobeid$clien,
          accessToken: _temp4,
          lazyLoad: true,
          loadedVia: 'milo',
          language: _temp5,
          region: _region,
          cookiesEnabled: _temp6,
          cookies: {
            mcid: _window$alloy$then$ca
          },
          callbacks: {
            initCallback: data => {
              chatInitialized = !!data?.releaseControl?.showAdobeMessaging;
            },
            onReadyCallback: () => {
              if (onDemand) {
                openChat(event);
              }
            },
            initErrorCallback: () => {},
            chatStateCallback: () => {},
            getContextCallback: () => {},
            signInProvider: window.adobeIMS?.signIn,
            analyticsCallback: eventData => {
              if (!window.alloy_all || !window.digitalData) return;
              const data = eventData?.events?.[0]?.data;
              if (!data || isSilentEvent(data)) return;
              if (data['event.subcategory']?.toLowerCase() === 'launch' && data['event.workflow']?.toLowerCase() === 'init') {
                if (data['event.type']?.toLowerCase() === 'render') {
                  sendChatIconRenderEvent(data);
                  return;
                }
                if (data['event.type']?.toLowerCase() === 'click') {
                  sendChatIconClickEvent(data);
                  return;
                }
              }
              if (data['content.name']?.toLowerCase() === 'auth-subproduct') {
                sendProductEvent(data);
                return;
              }
              if (data['content.name']?.toLowerCase() === '5-star-survey') {
                sendSurveyFeedbackEvent(data);
                return;
              }
              if (data['event.error_code'] && data['event.error_type']) {
                sendChatErrorEvent(data);
                return;
              }
              sendPrimaryEvent(data);
            }
          }
        });
      }
      let language;
      let region;
      if (config.locale.ietf.includes('-')) {
        [language, region] = config.locale.ietf.split('-');
      } else {
        [region, language] = config.locale.prefix.replace('/', '').split('_');
        if (region === 'africa') region = 'ZA';
      }
      const _window$AdobeMessagin = window.AdobeMessagingExperienceClient,
        _initialize = _window$AdobeMessagin.initialize,
        _temp6 = window.adobePrivacy?.activeCookieGroups()?.length > 1,
        _region = region,
        _temp5 = language || 'en',
        _temp4 = window.adobeIMS?.isSignedInUser() ? `Bearer ${window.adobeIMS.getAccessToken()?.token}` : undefined,
        _window$adobeid$clien = window.adobeid?.client_id,
        _temp3 = config.env.name !== 'prod' ? 'stage' : 'prod',
        _temp2 = getMetadata('jarvis-surface-version') || config.jarvis.version,
        _temp = getMetadata('jarvis-surface-id') || config.jarvis.id,
        _window$alloy = window.alloy;
      return _window$alloy ? Promise.resolve(window.alloy('getIdentity').then(data => data?.identity?.ECID).catch(() => undefined)).then(_temp7) : _temp7(undefined);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
const initJarvisChat = function (config, loadScriptFunction, loadStyleFunction, getMetadataFunction) {
  try {
    if (!config?.jarvis) return Promise.resolve();
    loadScript = loadScriptFunction;
    loadStyle = loadStyleFunction;
    getMetadata = getMetadataFunction;
    const onDemandMeta = getMetadata('jarvis-on-demand')?.toLowerCase();
    const onDemand = onDemandMeta ? onDemandMeta === 'on' : config.jarvis.onDemand;
    document.addEventListener('click', function (event) {
      try {
        if (!event.target.closest('[href*="#open-jarvis-chat"]')) return Promise.resolve();
        event.preventDefault();
        const _temp9 = function () {
          if (onDemand && !chatInitialized) {
            return Promise.resolve(startInitialization(config, event, onDemand)).then(function () {});
          } else {
            openChat(event);
          }
        }();
        return Promise.resolve(_temp9 && _temp9.then ? _temp9.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    });
    const _temp8 = function () {
      if (!onDemand) {
        return Promise.resolve(startInitialization(config)).then(function () {});
      }
    }();
    return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(function () {}) : void 0);
  } catch (e) {
    return Promise.reject(e);
  }
};

exports.initJarvisChat = initJarvisChat;
exports.openChat = openChat;
//# sourceMappingURL=jarvis-chat-d84b30c6.js.map
