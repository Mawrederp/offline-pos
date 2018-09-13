import getMuiTheme from 'material-ui/styles/getMuiTheme';

const themeDarkBlue = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: '#2b3643',
  },
  Chip: {
    backgroundColor: '#eee',
  },
  drawer: {
    width: 230,
    color: '#364150',
  },
  raisedButton: {
    primaryColor: '#1E88E5',
  },
  tabs: {
    backgroundColor: '#2b3643',
    textColor: '#ffffff',
    selectedTextColor: '#ffffff',
  },
  inkBar: {
    backgroundColor: '#36c6d3',
  },
  isRtl: true,
});


export default themeDarkBlue;
