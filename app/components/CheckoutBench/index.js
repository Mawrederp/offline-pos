/**
 *
 * CheckoutBench
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';

import { cyan600, white } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import { injectIntl } from 'react-intl';
import messages from '../Items/messages';
import VariantSelector from '../VariantSelector';
import { TextField } from 'material-ui';

const noImage = require('../../assets/no-image.gif');
const attachmentKey = '_attachments';

const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan600,
    color: white,
    lineHeight: '34px',

  },
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

const colors = [
  'احمر',
  'اصفر',
  'اسود',
  'اخضر',
  'Blue',
  'Purple',
  'Black',
  'White',
];
const ItemSubTitle = ({ unitPrice, quantity, discount, labels, intl }) => (
  <div className="row">
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'}>
      {labels.price}: <b> {unitPrice} {labels.priceUnit} </b></span>
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'}>
      {labels.quantity}:<b> {quantity} {intl.formatMessage(labels.quantityUnit, { plural: quantity > 1 ? 's' : '' })}</b></span>
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'}>
      {labels.discount}:<b> {discount}</b>%</span>
  </div>

);

class CheckoutBench extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      variantsModalOpen: false,
      query: '',
    };
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.closeVariantsModal = this.closeVariantsModal.bind(this);
  }

  handleSearchInput = (event, query) => {
    this.setState({ query });
  };

  closeVariantsModal(result) {
    console.log('result', result);
    if (result) {
      this.props.addToCart(result);
    }

    this.setState({ variantsModalOpen: false, currentProduct: {} });
  }


  handleProductClick(event) {
    event.stopPropagation();
    const { products } = this.props;
    const product = products[event.currentTarget.getAttribute('value')];
    if (Object.keys(product.variants).length) {
      this.setState({
        variantsModalOpen: true,
        currentProduct: products[event.currentTarget.getAttribute('value')],
      });
    } else {
      this.props.addToCart({ product, variantPropId: '$' });
    }
  }

  render() {
    const { products, intl } = this.props;
    const id = 'checkoutbench';
    console.log(products, 'checkout', attachmentKey);
    const {
      theProducts,
      searchText,
      searchHint,
    } = messages;
    const itemLabels = {
      price: intl.formatMessage(messages.price),
      quantity: intl.formatMessage(messages.quantity),
      discount: intl.formatMessage(messages.discount),
      priceUnit: intl.formatMessage(messages.currencySrInitials),
      quantityUnit: messages.quantityUnit,
    };

    let filteredProducts = { ...products };
    if (this.state.query) {
      filteredProducts = Object.keys(products).reduce(
        (acc, key) => {
          if (AutoComplete.fuzzyFilter(this.state.query, products[key].name)) {
            // eslint-disable-next-line no-param-reassign
            acc[key] = products[key];
          }
          return acc;
        }
        , {});
    }
    return (
      <Paper id={id} style={styles.container} className="cart">
        <Subheader style={styles.subheader}>{intl.formatMessage(theProducts)}</Subheader>

        <TextField
          hintText={intl.formatMessage(searchHint)}
          onChange={this.handleSearchInput}
          floatingLabelText={intl.formatMessage(searchText)}
          fullWidth
          value={this.state.query}
          style={{ textIndent: 3 }}
          autoComplete={'off'}
          id={'products-search-box'}
        />
        <GridList
          cellHeight={80}
          cols={3}
          style={styles.gridList}
          spacing={2}
        >
          {Object.keys(filteredProducts).map((key) => (
            <GridTile
              key={key}
              value={key}
              onClick={(e) => this.handleProductClick(e)}
              title={filteredProducts[key].name}
              className={'items-tile'}
              subtitle={<ItemSubTitle
                unitPrice={filteredProducts[key].price} quantity={filteredProducts[key].quantity}
                discount={`${filteredProducts[key].discount}`} labels={itemLabels} intl={intl}
              />}
              subtitleStyle={{ marginRight: '10px' }}
              titleStyle={{ marginRight: '10px' }}
            >
              <img
                className={'tile-image'}
                src={`${filteredProducts[key][attachmentKey] ? URL.createObjectURL(filteredProducts[key][attachmentKey].img.data) : noImage}`}
                role="presentation"
              />
            </GridTile>
          ))}
        </GridList>
        {
          this.state.currentProduct.variants ? <VariantSelector
            product={this.state.currentProduct} open={this.state.variantsModalOpen}
            handleClose={this.closeVariantsModal}
            id={id}
          /> : ''
        }

      </Paper>
    );
  }
}

CheckoutBench.propTypes = {
  addToCart: PropTypes.func,
  products: PropTypes.any,
};

export default injectIntl(CheckoutBench);
