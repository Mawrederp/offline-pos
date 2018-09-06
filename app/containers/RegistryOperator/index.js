/*
 *
 * RegistryOperator
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectGlobal} from '../App/selectors';
import * as appActions from '../../containers/App/actions';
import OpenRegistry from '../../components/OpenRegıstry';

export class RegistryOperator extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      isClosing: props.appStore.box.open,
    };
    this.openBox = this.openBox.bind(this);
  }

  openBox() {
    // validations goes here
    const payload = {
      open: true,
      time: Date.now(),
    };

    this.props.actions.openBox(payload);
  }

  render() {
    return (
      <OpenRegistry openBox={this.openBox} />
    );
  }
}

RegistryOperator.propTypes = {
  actions: PropTypes.any,
  appStore: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  appStore: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistryOperator);
