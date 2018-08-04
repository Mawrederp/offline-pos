import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: '#37474F',
  },
  drawer: {
    width: 230,
    color: '#263238',
  },
  raisedButton: {
    primaryColor: '#1E88E5',
  },
  tabs: {
    backgroundColor: '#37474F',
  },
  inkBar: {
    backgroundColor: '#1E88E5',
  },
  isRtl: true,
});


export default themeDefault;
