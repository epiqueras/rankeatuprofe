import passport from 'passport';
import Strategy from 'passport-local';
import Admins from '../models/admins';

passport.use(new Strategy((username, password, cb) => {
  Admins.findOne({ username }, (err, user) => {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { error: 'Nombre de usuario incorrecto.' }); }
    return user.comparePassword(password, (err2, isMatch) => {
      if (isMatch) {
        return cb(null, user);
      }
      return cb(null, false, { error: 'Contrasena incorrecta.' });
    });
  });
}));

passport.serializeUser((user, cb) => (
  cb(null, user._id)
));

passport.deserializeUser((id, cb) => {
  Admins.findById(id, (err, user) => {
    if (err) { return cb(err); }
    return cb(null, user);
  });
});
