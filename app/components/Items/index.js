/**
*
* Items
*
*/

import React from 'react';
// import styled from 'styled-components';
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
import { FontIcon } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import PageBase from '../PageBase';

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
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'} >السعر <b>{unitPrice} ريال</b></span>
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'}>الكمية <b>{quantity} وحدة</b></span>
    <span className={'col-md-12 col-lg-12 col-sm-12 col-xs-12 items-tile-title'}>الخصم <b>{discount}</b></span>
  </div>

);

class Items extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
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

  render() {
    const { openEditModal, products } = this.props;
    return (
      <Paper style={{ width: '100%' }}>

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
        <div className={'row'}>
          <GridList
            cellHeight={180}
            style={{ width: '100%' }}
            className={'col-md-12 col-lg-12 col-sm-12 '}
            cols={Object.keys(products).length > 4 ? 7 : undefined}
            spacing={2}
          >
            {Object.keys(products).map((key, idx) => (
              <GridTile
                key={key}
                title={products[key].name}
                className={'items-tile'}
                subtitle={<ItemSubTitle unitPrice={products[key].price} quantity={products[key].quantity} discount={`${products[key].discount}%`} />}
                actionIcon={
                  <div>
                    <IconButton onClick={(event) => openEditModal(products[key], event)}><FontIcon className={'material-icons'} color={white}>edit</FontIcon></IconButton>
                    <IconButton onClick={() => this.props.removeProduct(products[key])}><FontIcon className={'material-icons'} color={white}>delete</FontIcon></IconButton>
                  </div>
                }
              >

                <img src={`${products[key].img && products[key].img.size ? URL.createObjectURL(products[key].img) : noImage}`} role="presentation" />
              </GridTile>
            ))}
          </GridList>
        </div>
      </Paper>
    );
  }
}

Items.propTypes = {
  data: PropTypes.array,
  openEditModal: PropTypes.func,
  products: PropTypes.any,
  removeProduct: PropTypes.func,
};

ItemSubTitle.propTypes = {
  unitPrice: PropTypes.string,
  quantity: PropTypes.string,
  discount: PropTypes.string,
};

export default Items;
