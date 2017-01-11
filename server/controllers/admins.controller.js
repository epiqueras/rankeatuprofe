/* eslint-disable no-param-reassign */
import passport from 'passport';
import Teachers from '../models/teachers';
import Reviews from '../models/reviews';
import Schools from '../models/schools';

const ratingArray = ['rZero', 'rOne', 'rTwo', 'rThree', 'rFour', 'rFive'];

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

export function acceptTeacher(req, res) {
  if (!req.isAuthenticated()) {
    return res.json({ error: 'No estas autorizado.' });
  }
  return Teachers.findByIdAndUpdate(req.params._id, { $set: { accepted: true } }, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.json({ result: 'success' });
  });
}

export function deleteTeacher(req, res) {
  if (!req.isAuthenticated()) {
    return res.json({ error: 'No estas autorizado.' });
  }
  return Teachers.findByIdAndRemove(req.params._id, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.json({ result: 'success' });
  });
}

export function acceptReview(req, res) {
  if (!req.isAuthenticated()) {
    return res.json({ error: 'No estas autorizado.' });
  }
  return Reviews.findByIdAndUpdate(req.params._id, { $set: { accepted: true } }, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.json({ result: 'success' });
  });
}

export function deleteReview(req, res) {
  if (!req.isAuthenticated()) {
    return res.json({ error: 'No estas autorizado.' });
  }
  return Reviews.findById(req.params._id, (err, review) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return Teachers.findById(review.teacherId, (err2, teacher) => {
      if (err2) {
        return res.status(500).json({ error: err2 });
      }
      return Schools.findById(teacher.schoolId, (err3, school) => {
        if (err3) {
          return res.status(500).json({ error: err3 });
        }

        const roundedRating = Math.round(review.rating);

        teacher[ratingArray[roundedRating]] -= 1;
        teacher.numberOfReviews -= 1;
        teacher[review.grade] -= 1;
        if (review.takesAttendance) { teacher.takesAttendance -= 1; }
        if (review.wouldTakeAgain) { teacher.wouldTakeAgain -= 1; }

        school[ratingArray[roundedRating]] -= 1;
        school.numberOfReviews -= 1;
        school[review.grade] -= 1;
        if (review.wouldTakeAgain) { school.wouldTakeAgain -= 1; }

        return teacher.save((err4) => {
          if (err4) {
            return res.status(500).json({ error: err4 });
          }
          return school.save((err5) => {
            if (err5) {
              return res.status(500).json({ error: err5 });
            }
            return review.remove((err6) => {
              if (err6) {
                return res.status(500).json({ error: err6 });
              }
              return res.json({ result: 'success' });
            });
          });
        });
      });
    });
  });
}
