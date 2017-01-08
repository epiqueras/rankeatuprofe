import mongoose from 'mongoose';
import path from 'path';
import slug from 'limax';
import Schools from '../server/models/schools';

const filename = process.argv[2];
const filepath = path.join('../data/', filename);
let data = require(filepath).default; // eslint-disable-line import/no-dynamic-require

mongoose.connect(process.env.MONGO_URL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  } else {
    console.log('Connected to database!'); // eslint-disable-line no-console

    data = data.map(school => (
      { name: school, slug: slug(school.toLowerCase(), { lowercase: true }) }
    ));

    // eslint-disable-next-line no-console
    Schools.create(data, () => console.log('Schools added to schools collection.'));
  }
});
