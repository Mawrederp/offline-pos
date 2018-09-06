/*
 *
 * Registry
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {browserHistory} from 'react-router';

import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import OpenRegistry from '../../components/OpenRegıstry';
import { makeSelectGlobal } from '../App/selectors';
import * as posActions from './actions';

export class Registry extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.manageRegistry = this.manageRegistry.bind(this);
  }

  manageRegistry(form) {
    // validations goes here
    const idKey = '_id';
    const payload = {
      user: this.props.appStore.user[idKey],
      time: Date.now(),
    };

    this.props.actions.SetPosState({ ...payload, ...form });
    if (this.props.appStore.box.open) {
      browserHistory.push('/');
    }
  }

  render() {
    return (
      <OpenRegistry manageRegistry={this.manageRegistry} user={this.props.appStore.user} box={this.props.appStore.box} />
    );
  }
}

Registry.propTypes = {
  actions: PropTypes.any,
  appStore: PropTypes.any,
  router: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  appStore: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(posActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registry);
