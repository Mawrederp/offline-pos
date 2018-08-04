/*
 *
 * Checkout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Badge from 'material-ui/Badge';
import { grey400, cyan500, green500, red300, yellow500 } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import makeSelectCheckout from './selectors';
import messages from './messages';
import Data from '../../data';
import Cart from '../../components/Cart';
import CheckoutBench from '../../components/CheckoutBench';
import PageBase from '../../components/PageBase';
import PaymentModal from '../../components/PaymentModal';
// import Paper from 'material-ui/Paper/Paper';

export class Checkout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      paymentModalOpen: false,
      id: props.id || 'checkout1',
    };
    this.paymentConcluded = this.paymentConcluded.bind(this);
    this.openPaymentModal = this.openPaymentModal.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: false,
    });
  }

  openPaymentModal = () => {
    this.setState({
      paymentModalOpen: true,
    });
  }

  paymentConcluded = (status) => {
    this.setState({ paymentModalOpen: false });
    if (!status) return 0;
    return true;
  }
  render() {
    return (
      <PageBase
        navigation=""
        noWrapContent
        loading={this.state.loading}
      >
        <Helmet
          title="Checkout"
          meta={[
            { name: 'description', content: 'Description of Checkout' },
          ]}
        />
        {/* <Paper style={{ marginBottom: 20 }}>
          <div className="row" >
            this is a paper
          </div>
        </Paper> */}

        <div className="row" id={this.state.id}>
          <Toolbar style={{ height: '6vh' }} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-5">
            <ToolbarGroup firstChild>
              <Chip              >
                <Avatar src="http://i.pravatar.cc/100" />
                current customer
              </Chip>
            </ToolbarGroup>
            <ToolbarGroup >
              <Chip>
                <Avatar style={{ backgroundColor: cyan500 }} icon={<FontIcon className="material-icons">account_balance</FontIcon>} />
                1000,0.15 ريال
             </Chip>
              <Chip>
                <Avatar style={{ backgroundColor: green500 }} icon={<FontIcon className="material-icons">money</FontIcon>} />
                1000,0.15 ريال
             </Chip>
            </ToolbarGroup>

            <ToolbarGroup lastChild>
              <Chip >
                <Avatar style={{ backgroundColor: cyan500 }} size={32}>$</Avatar>
                3.65
            </Chip>
              <Chip >
                <Avatar style={{ backgroundColor: green500 }} size={32}>€</Avatar>
                3.65
            </Chip>
              <Chip >
                <Avatar style={{ backgroundColor: red300 }} size={32}>£</Avatar>
                3.65
            </Chip>
            </ToolbarGroup>

          </Toolbar>
          <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 m-b-15 ">
            <Cart data={Data.dashBoardPage.recentProducts} payment={this.openPaymentModal} />
          </div>
          <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 m-b-15 ">
            <CheckoutBench data={Data.products} />
          </div>
        </div>

        <PaymentModal open={this.state.paymentModalOpen} handleClose={this.paymentConcluded} container={this.state.id} currency={'ريال'} data={Data.dashBoardPage.recentProducts} />
      </PageBase>
    );
  }
}

Checkout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  Checkout: makeSelectCheckout(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
