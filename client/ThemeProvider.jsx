import React from 'react'; // eslint-disable-line
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'flexboxgrid/css/flexboxgrid.min.css';
import './ThemeProvider.css';

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    {children}
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: React.PropTypes.object,
};

export default ThemeProvider;
