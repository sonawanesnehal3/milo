const blockConfig = {
  header: {
    name: 'global-navigation',
    targetEl: 'header',
    appendType: 'prepend',
  },
  footer: {
    name: 'global-footer',
    targetEl: 'footer',
    appendType: 'appendChild',
  },
};

const envMap = {
  prod: 'https://www.adobe.com',
  stage: 'https://www.stage.adobe.com',
  qa: 'https://gnav--milo--adobecom.hlx.page',
};

export default async function loadBlock(configs, customLib) {
  const { header, footer, locale, env = 'prod' } = configs || {};
  const branch = new URLSearchParams(window.location.search).get('navbranch');
  const miloLibs = branch
    ? `https://${branch}--milo--adobecom.hlx.page`
    : customLib || envMap[env];

  if (!header && !footer) {
    console.error('No block configs found!');
    return;
  }
  // Relative path can't be used, as the script will run on consumer's app
  const [[{ default: bootstrapBlock }, { default: locales }]] = await Promise.all([
    Promise.all([
      import(`${miloLibs}/libs/navigation/bootstrapper.js`),
      import(`${miloLibs}/libs/utils/locales.js`),
    ]),
  ]);

  const clientConfig = {
    origin: miloLibs,
    miloLibs: `${miloLibs}/libs`,
    pathname: `/${locale || ''}`,
    locales: configs.locales || locales,
  };

  const miloConfigs = {
    footer: {
      privacyId: configs.privacyId,
      privacyLoadDelay: configs.privacyLoadDelay,
    },
    header: { imsClientId: configs.imsClientId },
  };

  [header, footer].forEach((block, idx) => {
    if (block) {
      const key = idx === 0 ? 'header' : 'footer';
      bootstrapBlock(
        {
          ...clientConfig,
          ...miloConfigs[key],
          contentRoot: block.authoringPath,
        },
        blockConfig[key],
      );
    }
  });
}
