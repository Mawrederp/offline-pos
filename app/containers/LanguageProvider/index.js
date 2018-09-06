/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { IntlProvider } from 'react-intl';
import { makeSelectLocale } from './selectors';

export class LanguageProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <IntlProvider
        locale={this.props.locale.locale} key={this.props.locale.locale}
        messages={this.props.messages[this.props.locale.locale]}
      >
        {React.Children.only(this.props.children)}
      </IntlProvider>
    );
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.object,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired,
};


const mapStateToProps = createSelector(
  makeSelectLocale(),
  (locale) => ({ locale })
)
;

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
