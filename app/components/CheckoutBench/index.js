/**
 *
 * CheckoutBench
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import { cyan600, white } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { FontIcon } from 'material-ui';
import VariantSelector from '../VariantSelector';

const noImage = require('../../assets/no-image.gif');
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
const ItemSubTitle = ({ unitPrice, quantity, discount }) => (
  <div className="row">
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'}>السعر <b>{unitPrice}</b></span>
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'}>الكمية <b>{quantity}</b></span>
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'}>الخصم <b>{discount}</b></span>
  </div>

);

class CheckoutBench extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
      variantsModalOpen: false,

    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.closeVariantsModal = this.closeVariantsModal.bind(this);
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
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
    const { products } = this.props;
    const id = 'checkoutbench';
    console.log(this.state);
    return (
      <Paper id={id} style={styles.container} className="cart">
        <Subheader style={styles.subheader}>المنتجات</Subheader>

        <AutoComplete
          hintText="يمكنك البحث باستخدام احرف او كلمات"
          dataSource={colors}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText="البحث "
          filter={AutoComplete.fuzzyFilter}
          fullWidth
          className={'search-box'}
          style={{ textIndent: 3 }}
          id={'products-search-box'}
        />
        <GridList
          cellHeight={80}
          cols={3}
          style={styles.gridList}
          spacing={2}
        >
          {Object.keys(products).map((key, idx) => (
            <GridTile
              key={key}
              value={key}
              onClick={(e) => this.handleProductClick(e)}
              title={products[key].name}
              className={'items-tile'}
              subtitle={<ItemSubTitle
                unitPrice={products[key].price} quantity={products[key].quantity}
                discount={`${products[key].discount}%`}
              />}
            >

              <img
                src={`${products[key].img && products[key].img.size ? URL.createObjectURL(products[key].img) : noImage}`}
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

export default CheckoutBench;
