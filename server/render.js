export default function render(html) {
  // const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  // const chunkManifest = process.env.webpackChunkAssets &&
  // JSON.parse(process.env.webpackChunkAssets);
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>RankeaTuProfe</title>
      <meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css?family=Concert+One" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700,700i" rel="stylesheet">
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/dist/vendor.js"></script>
      <script src="/dist/index.js"></script>
    </body>
  </html>
  `;
}
