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
// pick utils
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import ContentAdd from 'material-ui/svg-icons/content/add';
import PageBase from '../../components/PageBase';
import Data from '../../data';

import makeSelectProductsManagement from './selectors';
import messages from './messages';
import Items from '../../components/Items';
import ProductsModal from '../../components/ProductsModal';

export class ProductsManagement extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      productsModalOpen: false,
      currentId: null,
    };
    this.openProductsModal = this.openProductsModal.bind(this);
    this.closeProductsModal = this.closeProductsModal.bind(this);
    this.openEditProductsModal = this.openEditProductsModal.bind(this);
  }
  componentWillMount() {
    this.setState({
      loading: false,
    });
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
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>

        <PageBase
          navigation=""
          noWrapContent
          loading={this.state.loading}
          id={'products-management'}
        >
          <Helmet
            title="Checkout"
            meta={[
              { name: 'description', content: 'Description of Checkout' },
            ]}
          />


          <div className="row" style={{ position: 'relative' }} >
            <Items data={Data.products} openEditModal={this.openEditProductsModal} />
          </div>

          <FloatingActionButton onClick={this.openProductsModal} style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <ContentAdd />
          </FloatingActionButton>
          <ProductsModal id={this.state.currentId} open={this.state.productsModalOpen} handleClose={this.closeProductsModal} />
        </PageBase>
      </MuiPickersUtilsProvider>
    );
  }
}

ProductsManagement.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  ProductsManagement: makeSelectProductsManagement(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsManagement);
