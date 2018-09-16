/*
 *
 * ProductsManagement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { bindActionCreators } from 'redux';
// pick utils
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PageBase from '../../components/PageBase';
import Data from '../../data';

import makeSelectProductsManagement, { makeSelectUser } from './selectors';
import * as productsActions from './actions';
import messages from './messages';
import Items from '../../components/Items';
import ProductsModal from '../../components/ProductsModal';

export class ProductsManagement extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static getDerivedStateFromProps(props) {
    if (!props.productsStore.loaded) {
      props.actions.getProducts();
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      productsModalOpen: false,
      currentId: null,
      products: props.productsStore.products,
    };
    this.openProductsModal = this.openProductsModal.bind(this);
    this.closeProductsModal = this.closeProductsModal.bind(this);
    this.openEditProductsModal = this.openEditProductsModal.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }


  setProduct(product) {
    console.log(product);
    this.props.actions.setProduct(product);
  }
  openProductsModal = () => {
    this.setState({ currentId: null, productsModalOpen: true });
  };
  closeProductsModal = () => {
    this.setState({ productsModalOpen: false, currentId: null });
  };
  openEditProductsModal = (id) => {
    this.setState({ currentId: id, productsModalOpen: true });
  };

  removeProduct(product) {
    this.props.actions.removeProduct(product);
  }

  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>

        <PageBase
          navigation=""
          noWrapContent
          loading={!this.props.productsStore.loaded}
          id={'products-management'}
        >
          <Helmet
            title="Checkout"
            meta={[
              { name: 'description', content: 'Description of Checkout' },
            ]}
          />


          <div className="row" >
            <Items
              products={this.props.productsStore.products} data={Data.products} removeProduct={this.removeProduct}
              openEditModal={this.openEditProductsModal}
            />
          </div>

          <FloatingActionButton onClick={this.openProductsModal} style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <ContentAdd />
          </FloatingActionButton>
          <ProductsModal
            product={this.state.currentId || {}} open={this.state.productsModalOpen}
            setProduct={this.setProduct}
            user={this.props.user}
            handleClose={this.closeProductsModal}
          />
        </PageBase>
      </MuiPickersUtilsProvider>
    );
  }
}

ProductsManagement.propTypes = {
  productsStore: PropTypes.any,
  actions: PropTypes.any,
  user: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  productsStore: makeSelectProductsManagement(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(productsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsManagement);
