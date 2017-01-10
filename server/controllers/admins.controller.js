import passport from 'passport';
import Teachers from '../models/teachers';
import Reviews from '../models/reviews';

export function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.json(info); }
    return req.logIn(user, (err2) => {
      if (err2) { return next(err); }
      return res.json({ result: 'success' });
    });
  })(req, res, next);
}

export function logout(req, res) {
  req.logout();
  res.json({ result: 'success' });
}

export function checkAuth(req, res) {
  if (!req.isAuthenticated()) {
    return res.json({ authenticated: false });
  }
  return res.json({ authenticated: true });
}

export function getPendings(req, res) {
  if (!req.isAuthenticated()) {
    return res.json({ error: 'No estas autorizado.' });
  }
  return Teachers.find({ accepted: false }).sort('-createdAt').exec((err, teachers) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return Reviews.find({ accepted: false }).sort('-createdAt').exec((err2, reviews) => {
      if (err2) {
        return res.status(500).json({ error: err2 });
      }
      return res.json({ pendings: teachers.concat(reviews) });
    });
  });
}
