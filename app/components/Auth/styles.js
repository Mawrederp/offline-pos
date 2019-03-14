import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import { grey500, white, red500 } from 'material-ui/styles/colors';

const styles = {
  boxContainer: {
    minWidth: 320,
    maxWidth: 400,
    height: 'auto',
    position: 'absolute',
    top: '7%',
    left: 0,
    right: 0,
    margin: 'auto',
  },
  listItem: {
    textIndent: 20,
  },
  logoImg: {
    marginRight: 10,
    minWidth: 25,
  },
  title: {
    textIndent: 52,
    fontSize: 22,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightNormal,
    height: 60,
  },
  paper: {
    padding: 20,
    overflow: 'auto',
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10,
  },
  flatButton: {
    color: grey500,
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5,
    },
    labelStyle: {
      color: grey500,
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500,
    },
  },
  boxBtn: {
    float: 'right',
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13,
  },
  btnFacebook: {
    background: '#4f81e9',
  },
  btnGoogle: {
    background: '#e14441',
  },
  btnSpan: {
    marginLeft: 5,
  },
  buttonsContainer: {
    marginTop: 50,
  },
  errorMessage: {
    color: red500,
  },
  instructions: {
    textAlign: 'center',
    color: grey500,
  },
  logoContainer: {
    textAlign: 'center',
    width: 360,
    height: 80,
    paddingTop: 20,
  },
  logoImage: {
    width: 295,
    height: 54,
  },
  logoSmallContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
};

export default styles;
