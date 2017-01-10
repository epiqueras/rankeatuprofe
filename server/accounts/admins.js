import Admins from '../models/admins';

Admins.findOne({ username: process.env.ADMIN_USERNAME }, (err, admin) => {
  console.log('Checking if accounts are set up.'); // eslint-disable-line no-console
  // eslint-disable-next-line no-console
  if (err) { return console.log(err); }
  // eslint-disable-next-line no-console
  if (admin) { return console.log('Accounts already set up.'); }
  return Admins.create(
    {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
    (err2) => {
      if (err2) { console.log(err); } // eslint-disable-line no-console
      console.log('Accounts set up completed.'); // eslint-disable-line no-console
    });
});
