/* eslint-disable no-param-reassign */
import sanitizeHtml from 'sanitize-html';
import Teachers from '../models/teachers';
import Reviews from '../models/reviews';
import Schools from '../models/schools';

export function createReview(req, res) {
  const takesAttendanceToF = (req.body.post.takesAttendance === true
    || req.body.post.takesAttendance === false);
  const wouldTakeAgainToF = (req.body.post.wouldTakeAgain === true
    || req.body.post.wouldTakeAgain === false);

  if (!req.body.post.name || !req.body.post.comment || !req.body.post.rating
    || !req.body.post.grade || !takesAttendanceToF || !wouldTakeAgainToF) {
    return res.status(403).json({ error: 'error' });
  }

  return Teachers.findOne({ slug: req.params.slug }, (err, teacher) => {
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
      takesAttendance: Boolean(sanitizeHtml(req.body.post.takesAttendance)),
      wouldTakeAgain: Boolean(sanitizeHtml(req.body.post.wouldTakeAgain)),
    });

    return newReview.save((err2, saved) => {
      if (err2) {
        return res.status(500).json({ error: err2 });
      }

      teacher.rating *= teacher.numberOfReviews;
      teacher.rating += saved.rating;
      teacher.numberOfReviews += 1;
      teacher.rating /= teacher.numberOfReviews;
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
          }

          school.rating *= school.numberOfReviews;
          school.rating += saved.rating;
          school.numberOfReviews += 1;
          school.rating /= school.numberOfReviews;
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
