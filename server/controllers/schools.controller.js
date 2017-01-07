import sanitizeHtml from 'sanitize-html';
import slug from 'limax';
import Schools from '../models/schools';
import Teachers from '../models/teachers';

export function getSchool(req, res, next, local = false) {
  return Schools.findOne({ slug: req.params.slug }, (err, school) => {
    if (err) {
      return local ? res({ error: err }) : res.status(500).json({ error: err });
    } else if (!school) {
      return local ? res({ error: 'error' }) : res.status(500).json({ error: 'error' });
    }
    return Teachers.find({ schoolId: school._id }, (err2, teachers) => {
      if (err2) {
        return local ? res({ error: err2 }) : res.status(500).json({ error: err2 });
      }
      return local ? res({ school, teachers }) : res.json({ school, teachers });
    });
  });
}

export function addTeacher(req, res) {
  if (!req.body.post.name) {
    return res.status(403).end();
  }
  return Schools.findOne({ slug: req.params.slug }, (err, school) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else if (!school) {
      return res.status(500).json({ error: 'error' });
    }
    const newTeacher = new Teachers({ name: sanitizeHtml(req.body.post.name) });
    newTeacher.slug = slug(newTeacher.name.toLowerCase(), { lowercase: true });

    return Teachers.findOne({ slug: newTeacher.slug }, (err2, existingTeacher) => {
      if (err2) {
        return res.status(500).json({ error: err2 });
      }
      if (existingTeacher) {
        return res.status(403).json({ teacher: 'already exists' });
      }
      newTeacher.schoolId = school._id;
      newTeacher.schoolName = school.name;
      newTeacher.schoolSlug = school.slug;

      return newTeacher.save((err3, savedTeacher) => {
        if (err3) {
          return res.status(500).json({ error: err3 });
        }
        return res.json({ teacher: savedTeacher });
      });
    });
  });
}
