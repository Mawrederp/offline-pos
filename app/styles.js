import typography from 'material-ui/styles/typography';
import { grey600 } from 'material-ui/styles/colors';

const styles = {
  navigation: {
    fontSize: 15,
    fontWeight: typography.fontWeightLight,
    color: grey600,
    paddingBottom: 15,
    display: 'block',
  },
  title: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    marginBottom: 20,
  },
  paper: {
    padding: 30,
  },
  clear: {
    clear: 'both',
  },
  pageBaseContent: {
    height: '100%',
    minHeight: 500,
  },
};

export default styles;
