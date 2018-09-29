import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, RaisedButton, ToolbarGroup, Chip, TextField } from 'material-ui';
import ChipInput from 'material-ui-chip-input';
import FontIcon from 'material-ui/FontIcon/index';
import { Toolbar } from '@material-ui/core';
import { fullWhite } from 'material-ui/styles/colors';

import messages from './messages';
const styles = {};
const variantsSuggestions = ['الوزن', 'الاصدار', 'اللون', 'الحجم'];

class VariantsInput extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      feature: '',
      variants: [],
    };
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.onUpdateVariantsInput = this.onUpdateVariantsInput.bind(this);
    this.handleNewVariant = this.handleNewVariant.bind(this);
  }

  onUpdateInput(value) {
    this.setState({ feature: value });
  }

  onUpdateVariantsInput(variants) {
    this.setState({ variants });
  }

  handleNewVariant() {
    if (this.state.feature && this.state.variants.length !== 0) {
      this.props.setNewVariant({ ...this.state });
    }
  }

  render() {
    const { intl } = this.props;
    const {
      feature,
      nameOf,
      addNewFeature,
      deleteFeature,
    } = messages;
    return (
      <Toolbar className={'row m-b-15'}>
        <ToolbarGroup className={'col-sm-2 col-md-2 col-xs-2 col-lg-2'}>
          <AutoComplete
            dataSource={variantsSuggestions}
            onUpdateInput={this.onUpdateInput}
            floatingLabelText={intl.formatMessage(nameOf, { thing: intl.formatMessage(feature) })}
            filter={AutoComplete.fuzzyFilter}
            fullWidth
            style={{ textIndent: 3, height: '53px' }}
          />
        </ToolbarGroup>
        <ToolbarGroup lastChild style={{ marginTop: 17 }} className={'col-sm-6 col-md-6 col-xs-6 col-lg-6 '}>
          <ChipInput
            onChange={this.onUpdateVariantsInput}
            blurBehavior={'add'}
            style={{ width: '75%' }}
          />
        </ToolbarGroup>

        <ToolbarGroup className={'col-sm-4 col-md-4 col-xs-4 col-lg-4 '}>
          <RaisedButton
            label={intl.formatMessage(addNewFeature)}
            onClick={this.handleNewVariant}
            primary
            style={styles.button}
            icon={<FontIcon className="material-icons">control_point</FontIcon>}
          />
          <RaisedButton
            label={intl.formatMessage(deleteFeature)}
            secondary
            onClick={this.props.removeVariant}
            style={{ margin: 5 }}
            icon={<FontIcon color={fullWhite} className={'material-icons'}>delete_forever</FontIcon>}

          />
        </ToolbarGroup>

      </Toolbar>);
  }
}

VariantsInput.propTypes = {
  setNewVariant: PropTypes.func,
  removeVariant: PropTypes.func,
  intl: PropTypes.any,
};
export default VariantsInput;
