import { search } from './controllers/search.controller';
import { getSchool } from './controllers/schools.controller';
import { getTeacher } from './controllers/teachers.controller';

export default function ssrFetchData(reqUrl, callback) {
  const req = { params: { slug: '', type: '' }, query: { nombre: '' } };
  const res = data => callback(data);
  switch (true) {
    case /^\/busqueda\/(\w|-)+\?nombre=(\w|-|\+)+/.test(reqUrl):
      req.query.nombre = reqUrl.split('?nombre=')[1];
      req.params.type = reqUrl.split('/')[2].split('?')[0];
      return search(req, res, null, true);
    case /^\/profesor\/(\w|-)+\/review/.test(reqUrl):
      req.params.slug = reqUrl.split('/')[2];
      return getTeacher(req, res, null, true);
    case /^\/profesor\/(\w|-)+/.test(reqUrl):
      req.params.slug = reqUrl.split('/')[2];
      return getTeacher(req, res, null, true);
    case /^\/escuela\/(\w|-)+/.test(reqUrl):
      req.params.slug = reqUrl.split('/')[2];
      return getSchool(req, res, null, true);
    default:
      return callback({});
  }
}
