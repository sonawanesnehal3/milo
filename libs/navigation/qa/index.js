const authoringPath = new URLSearchParams(window.location.search).get('authoringpath') || '/federal/dev';
const env = new URLSearchParams(window.location.search).get('env') || 'qa';
const privacyId = new URLSearchParams(window.location.search).get('privacyid');
const locale = new URLSearchParams(window.location.search).get('locale');
const navBranch = new URLSearchParams(window.location.search).get('navbranch') || 'gnav';
const universalNavComponents = new URLSearchParams(window.location.search).get('universalnav');
const breadcrumbs = new URLSearchParams(window.location.search).get('breadcrumbs') || 'off';

async function init() {
  const { default: loadBlock } = await import(`https://${navBranch}--milo--adobecom.hlx.page/libs/navigation/navigation.js`);
  loadBlock({ env, locale, authoringPath, footer: { privacyId }, header: { imsClientId: 'milo', universalNavComponents, breadcrumbs } });
}
init();
