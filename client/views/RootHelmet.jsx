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
    ]}
    link={[
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Concert+One' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700,700i' },
    ]}
  />
);

export default RootHelmet;
