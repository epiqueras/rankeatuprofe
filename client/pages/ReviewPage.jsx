import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import StarRatingComponent from 'react-star-rating-component';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import TextField from 'material-ui/TextField';

export default class TeacherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      name: '',
      nameError: null,
      grade: null,
      gradeError: null,
      takesAttendance: false,
      wouldTakeAgain: false,
      message: 'Escribe un comentario....',
    };
    this.onStarClick = this.onStarClick.bind(this);
    this.onGradeChange = this.onGradeChange.bind(this);
    this.onTakesAttendanceToggle = this.onTakesAttendanceToggle.bind(this);
    this.onWouldTakeAgainToggle = this.onWouldTakeAgainToggle.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onStarClick(nextValue) {
    this.setState({ rating: nextValue });
  }

  onGradeChange(event, index, value) {
    this.setState({ grade: value });
  }

  onTakesAttendanceToggle(event, toggled) {
    this.setState({ takesAttendance: toggled });
  }

  onWouldTakeAgainToggle(event, toggled) {
    this.setState({ wouldTakeAgain: toggled });
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  onNameChange(event, newValue) {
    this.setState({ name: newValue });
  }

  submitForm() {
    let formIncomplete = false;

    if (this.state.rating === null) {
      this.setState({ ratingError: 'Por favor selecciona un rating.' });
      formIncomplete = true;
    } else {
      this.setState({ ratingError: null });
    }
    if (!this.state.name) {
      this.setState({ nameError: 'Por favor ingresa tu nombre.' });
      formIncomplete = true;
    } else {
      this.setState({ nameError: null });
    }
    if (!this.state.grade) {
      this.setState({ gradeError: 'Por favor selecciona una nota.' });
      formIncomplete = true;
    } else {
      this.setState({ gradeError: null });
    }

    if (formIncomplete) {
      return;
    }

    console.log('submitted');
    this.context.router.goBack();
  }

  render() {
    const grades = [
      <MenuItem key={1} value={'N/A'} primaryText="N/A" />,
      <MenuItem key={2} value={'zeroToTwo'} primaryText="0-2" />,
      <MenuItem key={3} value={'threeToFive'} primaryText="3-5" />,
      <MenuItem key={4} value={'sixToEight'} primaryText="6-8" />,
      <MenuItem key={5} value={'nineToEleven'} primaryText="9-11" />,
      <MenuItem key={6} value={'twelveToFourteen'} primaryText="12-14" />,
      <MenuItem key={7} value={'fifteenToSeventeen'} primaryText="15-17" />,
      <MenuItem key={8} value={'eighteenToTwenty'} primaryText="18-20" />,
    ];

    return (
      <div className="row center-xs">
        <Paper zDepth={4} className="col-xs-12" style={{ background: '#202020' }}>
          <Subheader style={{ fontSize: '20px' }}>Deja tu review</Subheader>
          <div className="row">
            <div className="col-xs-12">Profesor: {this.props.params.teacherUrl}</div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <StarRatingComponent
                name="ranking"
                value={this.state.rating}
                starCount={5}
                className="card-rating"
                onStarClick={this.onStarClick}
              />
            </div>
            <div className="col-xs-12" style={{ color: '#F44336' }}>
              {this.state.ratingError}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <TextField
                value={this.state.name}
                errorText={this.state.nameError}
                onChange={this.onNameChange}
                floatingLabelText="Tu nombre"
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-xs-12">
              <SelectField
                value={this.state.grade}
                onChange={this.onGradeChange}
                floatingLabelText="Nota recibida"
                style={{ textAlign: 'left' }}
                errorText={this.state.gradeError}
              >
                {grades}
              </SelectField>
            </div>
          </div>
          <br />
          <div className="row center-xs">
            <div className="col-xs-12">
              <Toggle
                label="Toma atendencia"
                toggled={this.state.takesAttendance}
                onToggle={this.onTakesAttendanceToggle}
                style={{ width: 'auto', margin: 'auto' }}
              />
            </div>
          </div>
          <br />
          <div className="row center-xs">
            <div className="col-xs-12">
              <Toggle
                label="Lo tomaria de nuevo"
                toggled={this.state.wouldTakeAgain}
                onToggle={this.onWouldTakeAgainToggle}
                style={{ width: 'auto', margin: 'auto' }}
              />
            </div>
          </div>
          <br />
          <div className="row center-xs">
            <div className="col-xs-11">
              <textarea
                rows="8"
                value={this.state.message}
                onChange={this.onMessageChange}
                style={{ background: 'gray', color: 'white', fontSize: '12px', width: '100%' }}
              />
            </div>
          </div>
          <br />
          <div className="row center-xs">
            <div className="col-xs-12">
              <RaisedButton
                label="Confirmar"
                labelPosition="before"
                primary
                icon={<NoteAdd />}
                onClick={this.submitForm}
              />
            </div>
          </div>
          <br />
        </Paper>
      </div>
    );
  }
}

TeacherPage.propTypes = {
  params: React.PropTypes.object,
};

TeacherPage.contextTypes = {
  router: React.PropTypes.object,
};
