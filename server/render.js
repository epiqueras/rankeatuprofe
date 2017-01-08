import Helmet from 'react-helmet';

export default function render(html, data) {
  const head = Helmet.rewind();
  const assetsManifest = process.env.webpackAssets &&
    JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets &&
    JSON.parse(process.env.webpackChunkAssets);
  return `
    <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${process.env.NODE_ENV === 'production' ? `<link rel="stylesheet" href="${assetsManifest['/app.css']}" />` : ''}
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(data)};
          ${process.env.NODE_ENV === 'production' ?
            `
              //<![CDATA[
              window.webpackManifest = ${JSON.stringify(chunkManifest)};
              //]]>
            `
          :
            ''
          }
        </script>
        <script src="${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}"></script>
        <script src="${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}"></script>
      </body>
    </html>
  `;
}
