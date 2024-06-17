function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }
  if (result && result.then) {
    return result.then(void 0, recover);
  }
  return result;
}
const initGoogleLogin = function (loadIms, getMetadata, loadScript) {
  try {
    let _exit;
    function _temp2(_result) {
      if (_exit) return _result;
      if (window.adobeIMS?.isSignedInUser()) return;
      return Promise.resolve(loadScript(GOOGLE_SCRIPT)).then(function () {
        const placeholder = document.createElement('div');
        placeholder.id = PLACEHOLDER;
        document.querySelector(`.${WRAPPER}`)?.append(placeholder);
        window.google?.accounts?.id?.initialize({
          client_id: GOOGLE_ID,
          callback: data => onToken(getMetadata, data),
          prompt_parent_id: PLACEHOLDER,
          cancel_on_tap_outside: false
        });
        window.google?.accounts?.id?.prompt();
      });
    }
    const _temp = _catch(function () {
      return Promise.resolve(loadIms()).then(function () {});
    }, function () {
      _exit = 1;
    });
    return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
  } catch (e) {
    return Promise.reject(e);
  }
};
const GOOGLE_SCRIPT = 'https://accounts.google.com/gsi/client';
const GOOGLE_ID = '530526366930-l874a90ipfkn26naa71r010u8epp39jt.apps.googleusercontent.com';
const PLACEHOLDER = 'feds-googleLogin';
const WRAPPER = 'feds-profile';
const onToken = function (getMetadata, data) {
  try {
    let destination;
    try {
      destination = new URL(getMetadata('google-login-redirect'))?.href;
    } catch {
      // Do nothing
    }
    return Promise.resolve(window.adobeIMS.socialHeadlessSignIn({
      provider_id: 'google',
      idp_token: data?.credential,
      client_id: window.adobeid?.client_id,
      scope: window.adobeid?.scope
    }).then(() => {
      if (window.DISABLE_PAGE_RELOAD === true) return;
      // Existing account
      if (destination) {
        window.location.assign(destination);
      } else {
        window.location.reload();
      }
    }).catch(() => {
      // New account
      window.adobeIMS.signInWithSocialProvider('google', {
        redirect_uri: destination || window.location.href
      });
    })).then(function () {});
  } catch (e) {
    return Promise.reject(e);
  }
};

export { initGoogleLogin as default };
//# sourceMappingURL=google-login-13f4b1b5.js.map
