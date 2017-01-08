import path from 'path';
import slug from 'limax';

const filename = process.argv[2];
const filepath = path.join('../data/', filename);
let data = require(filepath).default;

console.log(data);
