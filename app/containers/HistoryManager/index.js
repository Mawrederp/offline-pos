/*
 *
 * HistoryManager
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import AutoComplete from 'material-ui/AutoComplete';
// import { FormattedMessage } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import PageBase from '../../components/PageBase';
import MultiCart from '../MultiCart';
// import PaymentModal from '../../components/PaymentModal';
import TransactionsTimedList from '../../components/TransactionsTimedList';
import makeSelectCheckout, { makeSelectGlobal } from '../Checkout/selectors';
import makeSelectHistoryManager from './selectors';
import * as transactionActions from './actions';
import * as checkoutActions from '../Checkout/actions';

import * as posActions from '../Registry/actions';

// import messages from './messages';
export class HistoryManager extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static getDerivedStateFromProps(props) {
    console.log(props, 'the props i got in history');
    if (!props.store.loaded) {
      props.actions.getCheckoutProducts();
    }
    if (!props.historyManager.loaded) {
      console.log(props.actions.getAllTransactions(), 'transactions action');
    }
    console.log(props);
    return null;
  }
  constructor(props) {
    super(props);
    console.log(props, 'i am history');
    this.state = {
      loading: true,
      paymentModalOpen: false,
      id: props.id || 'checkout2',
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.paymentConcluded = this.paymentConcluded.bind(this);
    this.openPaymentModal = this.openPaymentModal.bind(this);
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [value, value + value, value + value + value],
    });
  };
  openPaymentModal = () => {
    this.setState({
      paymentModalOpen: true,
    });
  };

  paymentConcluded = (status) => {
    this.setState({ paymentModalOpen: false });
    if (!status) return 0;
    return true;
  };
  render() {
    const { store, historyManager, global } = this.props;

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      },
    };

    return (
      <PageBase
        navigation=""
        noWrapContent
        loading={!!(!store.loaded && !historyManager.loaded)}
      >
        <Helmet
          title="HistoryManager"
          meta={[
            { name: 'description', content: 'Description of HistoryManager' },
          ]}
        />
        <div className={'row'}>
          <div className={'col-md-6 col-lg-6 col-xs-6 col-sm-6'}>
            <Paper
              style={{
                height: 600,
                maxHeigh: 600,
              }}
            >
              <Subheader style={styles.subheader}>المبيعات</Subheader>
              <AutoComplete
                hintText="يمكنك البحث باستخدام احرف او كلمات"
                dataSource={[]}
                onUpdateInput={this.handleUpdateInput}
                floatingLabelText="البحث "
                filter={AutoComplete.fuzzyFilter}
                fullWidth
                className={'search-box'}
                style={{ textIndent: 3 }}
                id={'products-search-box'}
              />

              <TransactionsTimedList
                {...historyManager}
                isRTL={global.isRtl === 'rtl'}
              />
            </Paper>
          </div>
          <div className={'col-md-6 col-lg-6 col-xs-6 col-sm-6'}>
            <MultiCart
              products={{ products: [] }}
              openPaymentModal={this.openPaymentModal}
            />
          </div>
        </div>
        {/* <PaymentModal open={this.state.paymentModalOpen} handleClose={this.paymentConcluded} container={this.state.id} currency={'ريال'} data={{}} /> */}
      </PageBase>
    );
  }
}

HistoryManager.propTypes = {
  store: PropTypes.any,
  global: PropTypes.any,
  historyManager: PropTypes.any,
  id: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  store: makeSelectCheckout(),
  global: makeSelectGlobal(),
  historyManager: makeSelectHistoryManager(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...transactionActions, ...posActions, ...checkoutActions },
      dispatch
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryManager);
