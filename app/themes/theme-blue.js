import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeBlue = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: '#2d5f8b',
  },
  drawer: {
    width: 230,
    color: '#4276a4',
  },
  raisedButton: {
    primaryColor: '#1E88E5',
  },
  tabs: {
    backgroundColor: '#2d5f8b',
    textColor: '#c0dff5',
    selectedTextColor: '#ffffff',
  },
  inkBar: {
    backgroundColor: '#d64635',
  },
  isRtl: true,
});


export default themeBlue;
