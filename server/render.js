export default function render(html, data) {
  const assetsManifest = process.env.webpackAssets &&
    JSON.parse(process.env.webpackAssets);
  const chunkManifest = process.env.webpackChunkAssets &&
    JSON.parse(process.env.webpackChunkAssets);
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>RankeaTuProfe</title>
        <meta charset="utf-8">
        ${process.env.NODE_ENV === 'production' ? `<link rel="stylesheet" href="${assetsManifest['/app.css']}" />` : ''}
        <link href="https://fonts.googleapis.com/css?family=Concert+One" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700,700i" rel="stylesheet">
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
