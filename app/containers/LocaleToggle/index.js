/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { bindActionCreators } from 'redux';

import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Wrapper from './Wrapper';
import messages from './messages';
import { appLocales, appLocalesLabels } from '../../i18n';
import * as localeActions from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class LocaleToggle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.menuItems = this.menuItems.bind(this);
    this.onLocaleToggle = this.onLocaleToggle.bind(this);
  }

  onLocaleToggle(evt, index, values) {
    this.props.actions.changeLocale(this.props.locale.mergeDeep({ locale: values }));
  }

  menuItems() {
    return appLocales.map((locale, index) => (
      <MenuItem
        key={locale}
        insetChildren
        checked={locale === this.props.locale.get('locale')}
        value={locale}
        primaryText={appLocalesLabels[index]}
      />
      )
    );
  }

  render() {
    return (
      <SelectField
        value={this.props.locale.get('locale')}
        onChange={this.onLocaleToggle}
        labelStyle={{color:'white',textAlign:'center'}}

      >
        {this.menuItems()}
      </SelectField>
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.object,
  actions: PropTypes.any,
};

const mapStateToProps = createSelector(makeSelectLocale(), (locale) => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(localeActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
