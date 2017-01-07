import { getSchool } from './controllers/schools.controller';
import { getTeacher } from './controllers/teachers.controller';

export default function ssrFetchData(reqUrl, callback) {
  const req = { params: { slug: '' } };
  req.params.slug = reqUrl.split('/')[2];
  const res = data => callback(data);
  switch (true) {
    case /(^\/profesor\/(\w|-)+\/review)/.test(reqUrl):
      return getTeacher(req, res, null, true);
    case /(^\/profesor\/(\w|-)+)/.test(reqUrl):
      return getTeacher(req, res, null, true);
    case /(^\/escuela\/(\w|-)+)/.test(reqUrl):
      return getSchool(req, res, null, true);
    default:
      return callback({});
  }
}
