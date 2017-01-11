import escapeStringRegexp from 'escape-string-regexp';
import sanitizeHtml from 'sanitize-html';
import Schools from '../models/schools';
import Teachers from '../models/teachers';

export function search(req, res, next, local = false) {
  let name;
  if (!req.query.nombre) {
    name = '';
  } else {
    name = escapeStringRegexp(sanitizeHtml(req.query.nombre));
  }

  const schoolFields = 'name slug';
  const teacherFields = 'name rating slug schoolId schoolSlug schoolName rZero rOne rTwo rThree rFour rFive numberOfReviews';

  if (req.params.type === 'profesores') {
    return Teachers.find({ name: { $regex: name, $options: 'i' }, accepted: true }).limit(20).select(teacherFields).exec((err, teachers) => {
      if (err) {
        return local ? res({ error: err }) : res.status(500).json({ error: err });
      }
      return local ? res({ results: teachers }) : res.json({ results: teachers });
    });
  } else if (req.params.type === 'escuelas') {
    return Schools.find({ name: { $regex: name, $options: 'i' } }).limit(20).select(schoolFields).exec((err, schools) => {
      if (err) {
        return local ? res({ error: err }) : res.status(500).json({ error: err });
      }
      return local ? res({ results: schools }) : res.json({ results: schools });
    });
  }
  return Teachers.find({ name: { $regex: name, $options: 'i' }, accepted: true }).limit(20).select(teacherFields).exec((err, teachers) => {
    if (err) {
      return local ? res({ error: err }) : res.status(500).json({ error: err });
    }
    return Schools.find({ name: { $regex: name, $options: 'i' } }).limit(20).select(schoolFields).exec((err2, schools) => {
      if (err2) {
        return local ? res({ error: err2 }) : res.status(500).json({ error: err2 });
      }
      return local ?
        res({ results: teachers.concat(schools) })
      :
        res.json({ results: teachers.concat(schools) });
    });
  });
}
