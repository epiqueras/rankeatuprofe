import React from 'react';
import Helmet from 'react-helmet';

const RootHelmet = () => (
  <Helmet
    htmlAttributes={{ lang: 'es' }}
    defaultTitle="RankeaTuProfe"
    titleTemplate="%s - RankeaTuProfe"
    meta={[
      { charset: 'utf-8' },
      { name: 'description', content: 'Busca a los mejores profesores.' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      },
      { name: 'apple-mobile-web-app-title', content: 'rankeatuprofe' },
      { name: 'application-name', content: 'rankeatuprofe' },
      { name: 'msapplication-config', content: 'https://res.cloudinary.com/dl5ymdqjb/raw/upload/v1484187498/browserconfig_v5favy.xml' },
      { name: 'theme-color', content: '#ffffff' },
    ]}
    link={[
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Concert+One' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700,700i' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://res.cloudinary.com/dl5ymdqjb/image/upload/v1484185908/apple-touch-icon_ac78pa.png' },
      { rel: 'icon', type: 'image/png', href: 'https://res.cloudinary.com/dl5ymdqjb/image/upload/v1484185908/favicon-32x32_sjzgmo.png', sizes: '32x32' },
      { rel: 'icon', type: 'image/png', href: 'https://res.cloudinary.com/dl5ymdqjb/image/upload/v1484185908/favicon-16x16_rr6au6.png', sizes: '16x16' },
      { rel: 'manifest', href: 'https://res.cloudinary.com/dl5ymdqjb/raw/upload/v1484187498/manifest_azxqy6.json' },
      { rel: 'mask-icon', href: 'https://res.cloudinary.com/dl5ymdqjb/image/upload/v1484185909/safari-pinned-tab_ypdbyr.svg', color: '#3fb3d4' },
      { rel: 'shortcut-icon', href: 'https://res.cloudinary.com/dl5ymdqjb/image/upload/v1484185909/favicon_tzgn2z.ico' },
    ]}
  />
);

export default RootHelmet;
