import { amber, green, grey, red, teal } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import type { IConfigStore } from 'types/store';

const commonOptions = {
  mixins: {
    drawer: {
      width: 220,
      miniWidth: 76,
    },
  },
  typography: {
    htmlFontSize: 20,
    h6: {
      fontSize: '1rem',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '0.8rem',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 42,
      },
    },
  },
};

const seriesColor = [
  '#f44336',
  '#e81e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
  '#8884d8',
  '#82ca9d',
  '#ff7300',
  teal[400],
  '#f50057',
];

const lightTheme = createMuiTheme({
  name: 'Light Theme',
  palette: {
    type: 'light',
    primary: teal,
    background: {
      nested: '#fff',
      paper: '#fff',
      default: grey[100],
      error: red.A100,
    },
    graphs: {
      grid: grey[300],
      axis: grey[700],
      tooltip: grey[50],
      series: seriesColor,
    },
    notifications: {
      info: grey[900],
      success: green[600],
      warning: amber[500],
      error: red[500],
    },
  },
  ...commonOptions,
});

const darkTheme = createMuiTheme({
  name: 'Dark Theme',
  palette: {
    type: 'dark',
    primary: {
      main: teal[500],
    },
    secondary: {
      main: red[500],
    },
    background: {
      nested: grey[800],
      paper: '#333',
      default: grey[900],
      error: red.A100,
    },
    graphs: {
      grid: grey[700],
      axis: grey[400],
      tooltip: grey[900],
      series: seriesColor,
    },
    notifications: {
      info: grey[100],
      success: green[600],
      warning: amber[500],
      error: red[800],
    },
  },
  ...commonOptions,
});

const getTheme = (config: IConfigStore) => (config.darkMode ? darkTheme : lightTheme);

export { lightTheme, darkTheme, getTheme as default };
