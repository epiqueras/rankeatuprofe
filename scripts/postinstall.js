const path = require('path');
const prepend = require('prepend-file');
const findUp = require('find-up');

const FIXED_FILE = ['chart.js', 'src', 'core', 'core.helpers.js'];
const FIXED_CODE = '// < HACK >\n'
  + 'if (!process.env.BROWSER) {\n'
  + '  global.window = {};\n'
  + '}\n// </ HACK >\n\n';

function hackChartJs() {
  findUp('node_modules')
    .then(nodeModules => prepend(
      // eslint-disable-next-line prefer-spread
      path.resolve.apply(path, [nodeModules].concat(FIXED_FILE)),
      FIXED_CODE,
      console.log, // eslint-disable-line no-console
    ));
}

hackChartJs();
