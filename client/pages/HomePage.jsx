import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

import { go } from '../utils/goBack';

import './HomePage.css';

export default () => (
  <div className="row center-xs middle-xs home-page-container">
    <div className="col-xs-10">
      <div className="row">
        <div className="col-xs-12">
          <Link onTouchTap={go} to="/busqueda/profesores">
            <RaisedButton className="search-button" label="Busca Un Profesor" primary />
          </Link>
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-xs-12">
          <Link onTouchTap={go} to="/busqueda/escuelas">
            <RaisedButton className="search-button" label="Busca Una Escuela" secondary />
          </Link>
        </div>
      </div>
      <br /><br />
      <div className="row">
        <div className="col-xs-12 info-container">
          <h3>Hola, Bienvenido</h3>
          a rankeatuprofe.com, somos una nueva comunidad creada para ayudar a
          estudiantes a elegir a los profesores mas compatibles con sus formas de aprendizaje.
          Estamos empezando y es por eso que quizas no encuentres mucha información.
          La idea es que todos colaboren para que en un futuro esto se vuelva un gran recurso
          para estudiantes.
          <br /><br />
          <h3>Como Funciona?</h3>
          Si navegas a la zona de busqueda de universidades y buscas a tu universidad veras una
          página con la información que tenemos sobre ella. Podrás ver la distribución de notas
          de toda la universidad, un rating sobre 5 promediado de los comentarios de los alumnos
          y una lista de profesores. Si clickeas en un profesor y luego en &quot;Ver Reviews&quot;
          te llevara a una página similar pero con la información exclusiva a ese profesor.
          También podrás ver comentarios de los alumnos, saber si el profesor toma asistencia y si
          los alumnos tomarian de nuevo el curso con el.
          <br /><br />
          <h3>No Encuentras a tu Profesor?</h3>
          Navega a la página de tu universidad y clickea el botón de agregar profesor. Ingresa
          su nombre completo y listo. El profesor sera aprobado dentro de las siguientes 24 horas.
          <br /><br />
          <h3>No Encuentras a tu Escuela/Universidad?</h3>
          Manda un mail a soporte@rankeatuprofe.com
          <br /><br /><br /><br />
        </div>
      </div>
    </div>
  </div>
);
