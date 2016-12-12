import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import 'pages/HomePage.css';

export default () => (
  <div className="row center-xs middle-xs home-page-container">
    <div className="col-xs-10">
      <div className="row">
        <div className="col-xs-12">
          <Link to={{ pathname: '/busqueda', hash: '#profesores' }}>
            <RaisedButton className="search-button" label="Busca Un Profesor" primary />
          </Link>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-xs-12">
          <Link to={{ pathname: '/busqueda', hash: '#escuelas' }}>
            <RaisedButton className="search-button" label="Busca Una Escuela" secondary />
          </Link>
        </div>
      </div>
    </div>
  </div>
);
