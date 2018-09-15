/**
 *
 * VariantSelector
 *
 */

import React, { Fragment } from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import { FormattedMessage } from 'react-intl';

import typography from 'material-ui/styles/typography';
import { black, cyan600, white } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton/index';
import { List, ListItem } from 'material-ui/List';
import { Chip, Paper } from 'material-ui';
import messages from './messages';


class VariantSelector extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedProps: {},
    };
    this.handleVariantPropClick = this.handleVariantPropClick.bind(this);
    this.selectVariantProp = this.selectVariantProp.bind(this);
    this.makeKeyAndReturnToParent = this.makeKeyAndReturnToParent.bind(this);
  }
  makeKeyAndReturnToParent() {
    const { selectedProps } = this.state;
    const { product, handleClose } = this.props;
    const keys = Object.keys(selectedProps).join('_');
    const values = Object.values(selectedProps).map((obj) => obj.label).join('_');
    const key = `${keys}$${values}`;
    handleClose({ variantPropId: key, product });
  }

  handleVariantPropClick(event) {
    event.stopPropagation();
    const variantProp = event.currentTarget.getAttribute('value').split('_');
    const variantPropObject = { [variantProp[0]]: { ...{ label: variantProp[1] } } };
    this.selectVariantProp(variantPropObject);
  }

  selectVariantProp(prop) {
    const key = Object.keys(prop)[0];
    const prevProps = this.state.selectedProps;

    if (!prevProps[key] || (prevProps[key].label !== prop[key].label)) {
      this.setState({ selectedProps: { ...prevProps, ...prop } });
    } else {
      this.setState({ selectedProps: { ...this.state.selectedProps, ...{ [key]: {} } } });
    }
  }

  renderChip(variant) {
    const selectedProp = this.component.state.selectedProps[this.key];
    const selected = selectedProp && selectedProp.label === variant;
    const key = `${this.key}_${variant}`;
    return (
      <Chip
        key={key}
        style={{ margin: 4, backgroundColor: '#eee', boxShadow: selected ? '0px 2px 20px 1px rgba(0,0,0,0.35)' : 'none' }}
        value={key}
        onClick={this.component.handleVariantPropClick}
      >
        {variant}
      </Chip>
    );
  }

  render() {
    const { handleClose, open, id, product } = this.props;
    const actions = [
      <FlatButton
        label="الغاء"
        primary
        onClick={() => handleClose()}
      />,
      < FlatButton
        label="اضافة"
        primary
        keyboardFocused
        onClick={this.makeKeyAndReturnToParent}
      />,
    ];

    return (
      <Fragment>
        <Dialog
          actions={actions}
          modal
          open={open}
          onRequestClose={handleClose}
          container={() => document.getElementById(id)}
          overlayStyle={{ display: 'none' }}
          contentStyle={{ maxWidth: 'none' }}
          actionsContainerStyle={{
            textAlign: 'center',
            button: {
              minWidth: '25%',
            },
          }}
        >
          <Paper>
            <List fullWidth>
              {
                Object.keys(product.variants).map((key) =>
                  <ListItem value={key}>
                    <div className={'row'}>
                      <div className={'col-lg-4 col-sm-4 col-md-4 col-xs-4'}>
                        {key}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          height: 'auto',
                        }}
                        className={'col-lg-8 col-sm-8 col-md-8 col-xs-8'}
                      >
                        {product.variants[key].map(this.renderChip, { key, component: this })}
                      </div>
                    </div>
                  </ListItem>
                )
              }
            </List>
          </Paper>
        </Dialog>
        {/* <FormattedMessage {...messages.header} />*/}
      </Fragment>
    );
  }
}

// handleClose, open, product
VariantSelector.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  product: PropTypes.any,
  id: PropTypes.string,
};

export default VariantSelector;
