import React, { Component } from 'react';
import Alert from 'react-s-alert';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import { List } from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import TextField from 'material-ui/TextField';
import Helmet from 'react-helmet';

import apiCaller from '../utils/apiCaller';

import SchoolCard from '../components/SchoolCard';
import TeacherListItem from '../components/TeacherListItem';

export default class SchoolPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      addFormOpen: false,
      addName: '',
      addNameError: null,
      school: this.context.data.school || {},
      teachers: this.context.data.teachers || [],
    };
    this.handleAddFormOpen = this.handleAddFormOpen.bind(this);
    this.handleAddFormClose = this.handleAddFormClose.bind(this);
    this.onAddNameChange = this.onAddNameChange.bind(this);
    this.submitAddForm = this.submitAddForm.bind(this);
    this.fetchSchool = this.fetchSchool.bind(this);
  }

  componentDidMount() {
    this.fetchSchool();
  }

  componentDidUpdate() {
    if (this.props.params.slug !== this.state.school.slug) {
      this.fetchSchool();
    }
  }

  onAddNameChange(event, newValue) {
    this.setState({ addName: newValue });
  }

  fetchSchool() {
    return apiCaller(`/escuela/${this.props.params.slug}`).then(res => (
      this.setState({ school: res.school, teachers: res.teachers })
    ));
  }

  handleAddFormOpen() {
    this.setState({ addFormOpen: true });
  }

  handleAddFormClose() {
    this.setState({ addFormOpen: false });
  }

  submitAddForm() {
    if (!this.state.addName) {
      return this.setState({ addNameError: 'Por favor ingrese un nombre' });
    }
    this.setState({ addNameError: null });
    return apiCaller(`/escuela/${this.props.params.slug}/agregar`, 'post', {
      post: {
        name: this.state.addName,
      },
    }).then((res) => {
      if (res.teacher === 'already exists') {
        return Alert.error('Este profesor ya existe');
      } else if (res.error) {
        return null;
      }
      this.setState({ addFormOpen: false });
      const newTeachers = this.state.teachers;
      newTeachers.unshift(res.teacher);
      return this.setState({ teachers: newTeachers });
    });
  }

  render() {
    const addFormActions = [
      <FlatButton
        label="Cancelar"
        primary
        onTouchTap={this.handleAddFormClose}
      />,
      <FlatButton
        label="Confirmar"
        primary
        keyboardFocused
        onTouchTap={this.submitAddForm}
      />,
    ];
    const teachersList = this.state.teachers.map(teacher => (
      <TeacherListItem key={teacher._id} teacher={teacher} inSchoolList />
    ));
    return (
      <div>
        <Helmet title={this.state.school.name} />
        <SchoolCard school={this.state.school} />
        <Paper zDepth={4}>
          <List style={{ marginTop: 25 }}>
            <div className="row">
              <div className="col-xs-6">
                <Subheader>Profesores: </Subheader>
              </div>
              <div className="col-xs-6">
                <RaisedButton
                  label="Agregar"
                  labelPosition="before"
                  primary
                  icon={<PersonAdd />}
                  style={{ float: 'right', marginRight: '10px', marginTop: '5px' }}
                  onTouchTap={this.handleAddFormOpen}
                />
                <Dialog
                  title="Agregue un profesor"
                  actions={addFormActions}
                  open={this.state.addFormOpen}
                  onRequestClose={this.handleAddFormClose}
                >
                  <TextField
                    id="name-input"
                    value={this.state.addName}
                    errorText={this.state.addNameError}
                    onChange={this.onAddNameChange}
                    floatingLabelText="Nombre del profesor"
                  />
                </Dialog>
              </div>
            </div>
            {teachersList.length === 0 ?
              <Subheader style={{ textAlign: 'center' }}>Todavia no hay profesores para esta escuela. Agregalos!</Subheader>
            :
              teachersList
            }
          </List>
        </Paper>
      </div>
    );
  }
}

SchoolPage.propTypes = {
  params: React.PropTypes.object,
};

SchoolPage.contextTypes = {
  data: React.PropTypes.object,
};
