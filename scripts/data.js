import mongoose from 'mongoose';
import Schools from '../server/models/schools';

mongoose.connect('mongodb://localhost:27017/rankea-tu-profe', (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  } else {
    console.log('Connected to database!'); // eslint-disable-line no-console

    const toAdd = [
      {
        name: 'Colegio A',
        slug: 'colegio-a',
      },
      {
        name: 'Colegio B',
        slug: 'colegio-b',
      },
      {
        name: 'Colegio C',
        slug: 'colegio-c',
      },
    ];

    // eslint-disable-next-line no-console
    Schools.create(toAdd, (err, results) => console.log(results));
  }
});
