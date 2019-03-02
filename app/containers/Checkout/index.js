/*
 *
 * Checkout
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import { cyan500, green500, red300, white } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import makeSelectCheckout, { makeSelectGlobal } from './selectors';
import messages from './messages';
import Data from '../../data';
import MultiCart from '../MultiCart';
import CheckoutBench from '../../components/CheckoutBench';
import PageBase from '../../components/PageBase';
import PaymentModal from '../../components/PaymentModal';
import * as checkoutActions from './actions';

export class Checkout extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static getDerivedStateFromProps(props) {
    if (!props.store.loaded) {
      props.actions.getCheckoutProducts();
    }
    console.log(props);
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      paymentModalOpen: false,
      id: props.id || 'checkout1',
      cartsMenuOpen: false,
    };
    this.paymentConcluded = this.paymentConcluded.bind(this);
    this.openPaymentModal = this.openPaymentModal.bind(this);
    this.openCartsMenu = this.openCartsMenu.bind(this);
    this.handleCartChange = this.handleCartChange.bind(this);
    this.chooseCart = this.chooseCart.bind(this);
    this.addCart = this.addCart.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  openPaymentModal = () => {
    this.setState(
      {
        paymentModalOpen: true,
      },
      () => console.log(this.state)
    );
  };
  openCartsMenu = () => {
    this.setState({ cartsMenuOpen: true });
  };
  handleCartChange = (open, reason) => {
    if (reason === 'clickAway' || reason === 'itemTap') {
      this.setState({ cartsMenuOpen: false });
    }
  };

  addToCart({ product, variantPropId }) {
    this.props.actions.addToCart({ product, variantPropId });
  }

  chooseCart(event, child) {
    this.props.actions.setActiveCart(child.props.value);
  }

  addCart() {
    this.props.actions.addCart();
  }

  removeFromCart({ product, variantPropId }) {
    this.props.actions.removeFromCart({ product, variantPropId });
  }

  paymentConcluded = (status, cart) => {
    console.log('start of the chain', cart);
    if (status) {
      this.props.actions.setTransaction(cart);
      // this.props.actions.resetActiveCart();
      // setTimeout(() => window.print(), 500);
    }
    this.setState({ paymentModalOpen: false });
    if (!status) return 0;
    return true;
  };

  render() {
    const { store, global } = this.props;
    console.log(global);
    return (
      <PageBase navigation="" noWrapContent loading={!store.loaded}>
        <Helmet
          title="Checkout"
          meta={[{ name: 'description', content: 'Description of Checkout' }]}
        />

        <div className="row" id={this.state.id}>
          <Toolbar
            style={{ height: '6vh' }}
            className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-5"
          >
            <ToolbarGroup firstChild>
              <IconMenu
                iconButtonElement={<Fragment />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'middle' }}
                targetOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={this.state.cartsMenuOpen}
                onRequestChange={this.handleCartChange}
                onItemClick={this.chooseCart}
              >
                {Object.keys(store.carts).map(key => (
                  <MenuItem
                    key={`menu_guest_${key}`}
                    value={key}
                    primaryText={`guest ${key}`}
                  />
                ))}
              </IconMenu>
              <Chip onClick={this.openCartsMenu}>
                {/* <Avatar src="http://i.pravatar.cc/100" />*/}
                {`guest ${store.activeCart}`}
                <IconButton
                  style={{
                    height: 'auto',
                    width: 'auto',
                    padding: 0,
                    verticalAlign: 'middle',
                    right: '-4px',
                  }}
                  tooltip="bottom-right"
                  tooltipPosition="bottom-right"
                >
                  <FontIcon className={'material-icons'}>expand_more</FontIcon>
                </IconButton>
              </Chip>
              <Avatar
                onClick={this.addCart}
                size={32}
                style={{ backgroundColor: green500, cursor: 'pointer' }}
              >
                <ContentAdd color={white} />
              </Avatar>
            </ToolbarGroup>
            <ToolbarGroup>
              <Chip title={'قيمة ايصالات الدفع البنكي'}>
                <Avatar
                  style={{ backgroundColor: cyan500 }}
                  icon={
                    <FontIcon className="material-icons">credit_card</FontIcon>
                  }
                />
                {Number(global.box.receipts)} ريال
              </Chip>
              <Chip title={'الكاش'}>
                <Avatar
                  style={{ backgroundColor: green500 }}
                  icon={<FontIcon className="material-icons">money</FontIcon>}
                />
                {Number(global.box.cash)} ريال
              </Chip>
              <Chip title={'المجموع'}>
                <Avatar
                  style={{ backgroundColor: green500 }}
                  icon={
                    <FontIcon className="material-icons">
                      account_balance
                    </FontIcon>
                  }
                />
                {Number(Number(global.box.cash) + Number(global.box.receipts))}{' '}
                ريال
              </Chip>
            </ToolbarGroup>

            <ToolbarGroup lastChild>
              <Chip>
                <Avatar style={{ backgroundColor: cyan500 }} size={32}>
                  $
                </Avatar>
                3.65
              </Chip>
              <Chip>
                <Avatar style={{ backgroundColor: green500 }} size={32}>
                  €
                </Avatar>
                3.65
              </Chip>
              <Chip>
                <Avatar style={{ backgroundColor: red300 }} size={32}>
                  £
                </Avatar>
                3.65
              </Chip>
            </ToolbarGroup>
          </Toolbar>
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 m-b-15 ">
            <MultiCart
              removeProduct={this.removeFromCart}
              products={store.carts[store.activeCart]}
              openPaymentModal={this.openPaymentModal}
            />
          </div>
          <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 m-b-15 ">
            <CheckoutBench
              products={store.products}
              addToCart={this.addToCart}
            />
          </div>
        </div>

        <PaymentModal
          open={this.state.paymentModalOpen}
          handleClose={this.paymentConcluded}
          container={this.state.id}
          currency={'ريال'}
          data={store.carts[store.activeCart]}
          removeProduct={this.removeFromCart}
          user={this.props.global.user}
        />
      </PageBase>
    );
  }
}

Checkout.propTypes = {
  store: PropTypes.any,
  actions: PropTypes.any,
  global: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  store: makeSelectCheckout(),
  global: makeSelectGlobal(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(checkoutActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
