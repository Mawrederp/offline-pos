import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import globalStyles from '../../styles';

class PageBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.props.loading) {
      this.setState({
        loading: nextProps.loading,
      });
    }
  }

  render() {
    const { title, navigation, noWrapContent, children, minHeight, style } = this.props;

    const content = (
      <div style={{ minHeight: minHeight || 500, height: '100%' }}>
        {
          this.state.loading ? (
            <div style={{ position: 'relative' }}>
              <RefreshIndicator
                size={40}
                left={-20}
                top={200}
                status={'loading'}
                style={{ marginLeft: '50%' }}
              />
            </div>
          ) :
            <div>
              {children}
            </div>
        }
      </div>
    );

    return (
      <Fragment>
        <span style={globalStyles.navigation}>{navigation}</span>

        {noWrapContent ? (
          <Fragment>
            {content}
          </Fragment>
        ) : (
          <Paper style={globalStyles.paper}>
            <h3 style={globalStyles.title}>{title}</h3>

            <Divider />

            {content}

            <div style={globalStyles.clear} />

          </Paper>
          )}
      </Fragment>
    );
  }
}

PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  noWrapContent: PropTypes.bool,
  children: PropTypes.any,
  minHeight: PropTypes.number,
  loading: PropTypes.bool,
  style: PropTypes.object,
};

export default PageBase;
