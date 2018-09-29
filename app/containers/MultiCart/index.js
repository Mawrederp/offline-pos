/*
 *
 * MultiCart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { cyan600, white } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import Subheader from 'material-ui/Subheader';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

import makeSelectMultiCart from './selectors';
import Cart from '../../components/Cart';

export class MultiCart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { products, openPaymentModal, removeProduct } = this.props;
    const styles = {
      subheader: {
        fontSize: 24,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan600,
        color: white,
        lineHeight: '34px',
      },
      headerToolBar: {
        backgroundColor: cyan600,

      },
    };
    return (
      <Cart
        data={products}
        payment={openPaymentModal}
        removeProduct={removeProduct}
      />
    );
  }
}

MultiCart.propTypes = {
  products: PropTypes.any,
  removeProduct: PropTypes.func,
  openPaymentModal: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  MultiCart: makeSelectMultiCart(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(MultiCart);
