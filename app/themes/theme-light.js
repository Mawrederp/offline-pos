import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeLight = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: '#ececec',
  },
  drawer: {
    width: 230,
    color: '#f3f3f3',
  },
  raisedButton: {
    primaryColor: '#1E88E5',
  },
  tabs: {
    backgroundColor: '#ececec',
    textColor: '#717171',
    selectedTextColor: '#717171',
  },
  inkBar: {
    backgroundColor: '#3399ff',
  },
  isRtl: true,
});


export default themeLight;
