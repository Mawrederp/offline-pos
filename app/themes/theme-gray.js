import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeGray = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: '#4f5a67',
  },
  drawer: {
    width: 230,
    color: '#5e6672',
  },
  raisedButton: {
    primaryColor: '#1E88E5',
  },
  tabs: {
    backgroundColor: '#4f5a67',
    textColor: '#e9e9ea',
    selectedTextColor: '#ffffff',
  },
  inkBar: {
    backgroundColor: '#31c7b2',
  },
  isRtl: true,
});


export default themeGray;
