import mongoose from 'mongoose';
import Schools from '../server/models/schools';
import Teachers from '../server/models/teachers';
import Reviews from '../server/models/reviews';

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
    Schools.remove({}, () => console.log('Schools removed from schools collection.'));
    // eslint-disable-next-line no-console
    Teachers.remove({}, () => console.log('Teachers removed from teachers collection.'));
    // eslint-disable-next-line no-console
    Reviews.remove({}, () => console.log('Reviews removed from reviews collection.'));

    // eslint-disable-next-line no-console
    Schools.create(toAdd, () => console.log('Test schools added to schools collection.'));
  }
});
