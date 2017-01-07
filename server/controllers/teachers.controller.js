import Teachers from '../models/teachers';
import Reviews from '../models/reviews';

export function getTeacher(req, res, next, local = false) {
  return Teachers.findOne({ slug: req.params.slug }, (err, teacher) => {
    if (err) {
      return local ? res({ error: err }) : res.status(500).json({ error: err });
    } else if (!teacher) {
      return local ? res({ error: 'error' }) : res.status(500).json({ error: 'error' });
    }
    return Reviews.find({ teacherId: teacher._id }).sort('-createdAt').exec((err2, reviews) => {
      if (err2) {
        return local ? res({ error: err2 }) : res.status(500).json({ error: err2 });
      }
      return local ? res({ teacher, reviews }) : res.json({ teacher, reviews });
    });
  });
}
