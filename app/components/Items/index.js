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
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';


import { cyan600, white } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import { FontIcon } from 'material-ui';
import { injectIntl } from 'react-intl';
import messages from './messages';


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
    const { openEditModal, products, intl } = this.props;
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
    return (
      <Paper style={{ width: '100%' }}>

        <Subheader style={styles.subheader}>{intl.formatMessage(theProducts)}</Subheader>
        <AutoComplete
          hintText={intl.formatMessage(searchHint)}
          dataSource={colors}
          onUpdateInput={this.handleUpdateInput}
          floatingLabelText={intl.formatMessage(searchText)}
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
            {Object.keys(products).map((key) => (
              <GridTile
                key={key}
                title={products[key].name}
                className={'items-tile'}
                subtitle={<ItemSubTitle
                  unitPrice={products[key].price} quantity={products[key].quantity}
                  discount={`${products[key].discount}`} labels={itemLabels} intl={intl}
                />}
                subtitleStyle={{ marginRight: '10px' }}
                titleStyle={{ marginRight: '10px' }}
                actionIcon={
                  <div>
                    <IconButton onClick={(event) => openEditModal(products[key], event)}><FontIcon
                      className={'material-icons'} color={white}
                    >edit</FontIcon></IconButton>
                    <IconButton onClick={() => this.props.removeProduct(products[key])}><FontIcon
                      className={'material-icons'} color={white}
                    >delete</FontIcon></IconButton>
                  </div>
                }
              >

                <img
                  className={'tile-image'}
                  src={`${products[key][attachmentKey] ? URL.createObjectURL(products[key][attachmentKey].img.data) : noImage}`}
                  role="presentation"
                />
              </GridTile>
            ))}
          </GridList>
        </div>
      </Paper>
    );
  }
}

Items.propTypes = {
  openEditModal: PropTypes.func,
  products: PropTypes.any,
  removeProduct: PropTypes.func,
};

ItemSubTitle.propTypes = {
  unitPrice: PropTypes.string,
  quantity: PropTypes.string,
  discount: PropTypes.string,
  labels: PropTypes.object,
  intl: PropTypes.any,
};

export default injectIntl(Items);
