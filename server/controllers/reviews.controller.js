/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
import sanitizeHtml from 'sanitize-html';
import Teachers from '../models/teachers';
import Reviews from '../models/reviews';
import Schools from '../models/schools';

const ratingArray = ['rZero', 'rOne', 'rTwo', 'rThree', 'rFour', 'rFive'];

export function createReview(req, res) {
  const takesAttendanceToF = (req.body.post.takesAttendance === true
    || req.body.post.takesAttendance === false);
  const wouldTakeAgainToF = (req.body.post.wouldTakeAgain === true
    || req.body.post.wouldTakeAgain === false);

  if (!req.body.post.name || !req.body.post.comment || !req.body.post.rating
    || !req.body.post.grade || !takesAttendanceToF || !wouldTakeAgainToF) {
    return res.status(403).json({ error: 'error' });
  }

  return Teachers.findOne({ slug: req.params.slug, accepted: true }, (err, teacher) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else if (!teacher) {
      return res.status(404).json({ error: 'error' });
    }
    const newReview = new Reviews({
      name: sanitizeHtml(req.body.post.name),
      comment: sanitizeHtml(req.body.post.comment),
      teacherId: teacher._id,
      rating: Number(sanitizeHtml(req.body.post.rating)),
      grade: sanitizeHtml(req.body.post.grade),
      takesAttendance: (sanitizeHtml(req.body.post.takesAttendance)) === 'true' ? true : false,
      wouldTakeAgain: (sanitizeHtml(req.body.post.wouldTakeAgain)) === 'true' ? true : false,
    });

    return newReview.save((err2, saved) => {
      if (err2) {
        return res.status(500).json({ error: err2 });
      }

      const roundedRating = Math.round(saved.rating);

      teacher[ratingArray[roundedRating]] += 1;
      teacher.numberOfReviews += 1;
      teacher[saved.grade] += 1;
      if (saved.takesAttendance) { teacher.takesAttendance += 1; }
      if (saved.wouldTakeAgain) { teacher.wouldTakeAgain += 1; }

      return teacher.save((err3) => {
        if (err3) {
          return res.status(500).json({ error: err3 });
        }
        return Schools.findById(teacher.schoolId, (err4, school) => {
          if (err4) {
            return res.status(500).json({ error: err4 });
          } else if (!school) {
            return res.status(404).json({ error: 'error' });
          }

          school[ratingArray[roundedRating]] += 1;
          school.numberOfReviews += 1;
          school[saved.grade] += 1;
          if (saved.wouldTakeAgain) { school.wouldTakeAgain += 1; }

          return school.save((err5) => {
            if (err5) {
              return res.status(500).json({ error: err5 });
            }
            return res.json({ review: saved });
          });
        });
      });
    });
  });
}
