/**
 *
 * MultiVariantForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableFooter,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Paper,
  Subheader,
  RaisedButton,
  TextField,
  Chip,
} from 'material-ui';
import FontIcon from 'material-ui/FontIcon';
import { red500, green500, blue300, fullWhite } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import { GridList, GridTile } from 'material-ui/GridList';
import { ListItem } from 'material-ui/List';
import { injectIntl } from 'react-intl';

import DateTimeLabel from '../DateTimeLabel';
// import styled from 'styled-components';

import messages from './messages';
import VariantsInput from './VariantsInput';
import SelectableList from './SelectableList';

const noImage = require('../../assets/no-image.gif');

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  selectedChip: {
    backgroundColor: blue300,
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class MultiVariantForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static existsInArray(haystack, needle) {
    if (haystack && Array.isArray(haystack) && !(haystack.length === 0)) {
      return haystack.indexOf(needle) >= 0;
    }
    return false;
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDateTime: new Date('2018-01-01T00:00:00.000Z'),
      selectedEndDateTime: new Date('2018-01-01T00:00:00.000Z'),
      rules: {},
      variants: props.existing.variants || {},
      variantsProps: props.existing.variantsProps || {},
      selectedVariant: '',
      selectedProps: {},
      selectedVariantRow: null,
      // will cause uncessarry renders @todo should not be here .
      discount: '0.0',
      quantity: 0,
      price: '0.0',
      barcode: '-',
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.setNewVariant = this.setNewVariant.bind(this);
    this.removeVariant = this.removeVariant.bind(this);
    this.selectVariant = this.selectVariant.bind(this);
    this.selectVariantProp = this.selectVariantProp.bind(this);
    this.handleVariantPropClick = this.handleVariantPropClick.bind(this);
    this.handleDiscountChange = this.handleDiscountChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleBarcodeChange = this.handleBarcodeChange.bind(this);
    this.addVariantProp = this.addVariantProp.bind(this);
    this.selectVariantRow = this.selectVariantRow.bind(this);
    this.removeVariantRow = this.removeVariantRow.bind(this);
  }


  setNewVariant(variantData) {
    this.setState({
      variants: {
        ...this.state.variants,
        ...{
          [variantData.feature]:
            variantData.variants.filter(
              (value, index, self) => self.indexOf(value) === index
            ),
        },
      },
    });
  }

  selectVariant(evt, index) {
    this.setState({ selectedVariant: index });
  }

  removeVariant() {
    const { selectedVariant } = this.state;
    const variants = { ...this.state.variants };
    delete variants[selectedVariant];
    this.setState({ variants });
  }

  removeVariantRow() {
    const { variantsProps, selectedVariantRow } = this.state;
    const variantsMap = { ...variantsProps };
    delete variantsMap[selectedVariantRow];

    this.setState({ variantsProps: variantsMap });
  }

  selectVariantRow(index) {
    const { variantsProps } = this.state;
    const keysArray = Object.keys(variantsProps);
    this.setState({ selectedVariantRow: keysArray[index - 1] });
  }

  selectVariantProp(prop) {
    const key = Object.keys(prop)[0];
    const prevProps = this.state.selectedProps;

    if (!prevProps[key] || (prevProps[key].label !== prop[key].label)) {
      this.setState({ selectedProps: { ...prevProps, ...prop } });
    } else {
      this.setState({ selectedProps: { ...this.state.selectedProps, ...{ [key]: {} } } });
    }
  }

  addVariantProp() {
    if (this.state.selectedProps) {
      const { variantsProps, selectedProps, discount, quantity, price, barcode } = this.state;
      const keys = Object.keys(selectedProps).join('_');
      const values = Object.values(selectedProps).map((obj) => obj.label).join('_');
      const key = `${keys}$${values}`;
      this.setState({
        variantsProps: {
          ...variantsProps,
          ...{
            [key]: {
              selectedProps,
              discount,
              quantity,
              price,
              barcode,
            },
          },
        },
      });
    }
  }

  handleVariantPropClick(event) {
    event.stopPropagation();
    const variantProp = event.currentTarget.getAttribute('value').split('_');
    const variantPropObject = { [variantProp[0]]: { ...{ label: variantProp[1] } } };
    this.selectVariantProp(variantPropObject);
  }

// should be changed to avoid uneccessary renders
  handleDiscountChange(event) {
    this.setState({ discount: event.target.value });
  }

  handleQuantityChange(event) {
    this.setState({ quantity: event.target.value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleBarcodeChange(event) {
    this.setState({ barcode: event.target.value });
  }


// //////////
  handleAdd(chip) {
    this.setState({
      chips: [...this.state.chips, chip],
    });
  }

  handleDelete(deletedChip) {
    this.setState({
      chips: this.state.chips.filter((c) => c !== deletedChip),
    });
  }

  handleDateChange = (date, start) => {
    this.setState({ [start ? 'selectedStartDateTime' : 'selectedEndDateTime']: date });
  };
  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };
  handleRequestDelete = (key) => {
    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.setState({ chipData: this.chipData });
  };

  renderChip(variant) {
    const selectedProp = this.component.state.selectedProps[this.key];
    const selected = selectedProp && selectedProp.label === variant;
    const key = `${this.key}_${variant}`;
    return (
      <Chip
        key={key}
        style={{ margin: 4, backgroundColor: '#eee', boxShadow: selected ? '0px 2px 20px 1px rgba(0,0,0,0.35)' : 'none' }}
        value={key}
        onClick={this.component.handleVariantPropClick}
      >
        {variant}
      </Chip>
    );
  }


  render() {
    const { variantsProps, selectedProps, variants } = this.state;
    const { product, user, intl } = this.props;
    const {
      time,
      EmployeeName,
      name,
      productName,
      quantityUnit,
      price,
      basic,
      thePrice,
      barcode,
      criteria,
      discount,
      quantity,
      settings,
      variform,
      currencySrInitials,
      custom,
      overall,
      productVariformSettings,
    } = messages;
    const currencySrLabel = intl.formatMessage(currencySrInitials);
    return (
      <Paper>
        <Subheader className={'text-center'}>
          {intl.formatMessage(productVariformSettings, {
            settings: intl.formatMessage(settings),
            product: intl.formatMessage(messages.product),
            variform: intl.formatMessage(variform),
          })}
        </Subheader>
        <Table allRowsSelected={false} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>{intl.formatMessage(time)}: <DateTimeLabel /></TableHeaderColumn>
              <TableHeaderColumn>{' '}</TableHeaderColumn>
              <TableHeaderColumn>{intl.formatMessage(EmployeeName)}: {user.fullName}</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} deselectOnClickaway={false} showRowHover={false}>
            <TableRow>
              <TableRowColumn rowSpan={3}>
                <table>
                  <TableRow>
                    <TableRowColumn>{intl.formatMessage(productName,
                      {
                        name: intl.formatMessage(name),
                        product: intl.formatMessage(messages.product),
                      })}{': '}{product.name}
                    </TableRowColumn>
                  </TableRow>
                  <TableRow>
                    <TableRowColumn>{intl.formatMessage(overall,
                      {
                        action: intl.formatMessage(discount),
                      })}{': '}{product.discount}%
                    </TableRowColumn>
                  </TableRow>
                  <TableRow><TableRowColumn>{intl.formatMessage(quantity)}{': '}{product.quantity}</TableRowColumn></TableRow>
                </table>
              </TableRowColumn>
              <TableRowColumn rowSpan={3}>
                <GridList
                  cellHeight={120}
                  cols={1}
                  style={styles.gridList}
                  spacing={2}
                >
                  <GridTile
                    title={product.name}
                    subtitle={<span>{intl.formatMessage(thePrice)}{': '}<b>{product.price}{' '}{currencySrLabel}</b></span>}
                  >
                    <img
                      id={'product-img-preview'} src={product.img ? URL.createObjectURL(product.img) : noImage}
                      role="presentation"
                    />
                  </GridTile>
                </GridList>
              </TableRowColumn>
            </TableRow>
            <TableRow />
            <TableRow />
          </TableBody>
        </Table>
        <VariantsInput intl={intl} setNewVariant={this.setNewVariant} removeVariant={this.removeVariant} />
        <Paper>
          <SelectableList fullWidth onChange={this.selectVariant} defaultValue={1}>
            {
              Object.keys(variants).map((key) =>
                <ListItem value={key}>
                  <div className={'row'}>
                    <div className={'col-lg-4 col-sm-4 col-md-4 col-xs-4'}>
                      {key}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        height: 'auto',
                      }}
                      className={'col-lg-8 col-sm-8 col-md-8 col-xs-8'}
                    >
                      <input type={'hidden'} name={'variantsProps'} value={JSON.stringify(variants)} />
                      {variants[key].map(this.renderChip, { key, component: this })}
                    </div>
                  </div>
                </ListItem>
              )
            }
          </SelectableList>
        </Paper>
        <Divider className={'m-b-15'} />
        <Table
          height={{
            height: '300px',
          }}
          fixedHeader
          onRowSelection={this.selectVariantRow}
        >
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
            <td
              style={{
                paddingRight: '24px',
                paddingLeft: '24px',
                height: '48px',
                textAlign: 'right',
                fontSize: '13px',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                backgroundColor: 'inherit',
                width: '24px',
                cursor: 'inherit',
              }}
            >{' '}</td>
            <TableHeaderColumn className={'text-center'}>{intl.formatMessage(criteria)}</TableHeaderColumn>
            <TableHeaderColumn className={'text-center'}>{intl.formatMessage(discount)}</TableHeaderColumn>
            <TableHeaderColumn className={'text-center'}>{intl.formatMessage(quantity)}</TableHeaderColumn>
            <TableHeaderColumn className={'text-center'}>{intl.formatMessage(thePrice)}</TableHeaderColumn>
            <TableHeaderColumn className={'text-center'}>{intl.formatMessage(barcode)}</TableHeaderColumn>
          </TableHeader>
          <TableBody
            className={'variants-table'}
            deselectOnClickaway={false}
          >
            <TableRow selectable={false}>
              <TableHeaderColumn className={'text-center'}>{intl.formatMessage(basic)}</TableHeaderColumn>
              <TableHeaderColumn className={'text-center'}>{product.discount || 0}%</TableHeaderColumn>
              <TableHeaderColumn className={'text-center'}> {product.quantity || 0} {intl.formatMessage(quantityUnit, { plural: product.quantity > 1 ? 's' : '' })}</TableHeaderColumn>
              <TableHeaderColumn className={'text-center'}>{product.price ? `${product.price} ${currencySrLabel}` : '-'}</TableHeaderColumn>
              <TableHeaderColumn className={'text-center'}>{product.barcode || '-'}</TableHeaderColumn>
              <input type={'hidden'} name={'variantsProps'} value={JSON.stringify(variantsProps)} />
              <input type={'hidden'} name={'variants'} value={JSON.stringify(variants)} />
            </TableRow>
            {
              Object.keys(variantsProps).map((key) => (
                <TableRow key={key}>

                  <TableHeaderColumn>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        height: 'auto',
                      }}
                    >
                      {Object.keys(variantsProps[key].selectedProps).map((prop) =>
                        this.constructor.existsInArray(variants[prop], variantsProps[key].selectedProps[prop].label)
                          ?
                            <Chip
                              key={`${prop}_${variantsProps[key].selectedProps[prop].label}_table`}
                              style={{ margin: 4, backgroundColor: '#eee' }}
                              value={`${prop}_${variantsProps[key].selectedProps[prop]}`}
                            >
                              {variantsProps[key].selectedProps[prop].label}
                            </Chip> : ''
                      )}
                    </div>

                  </TableHeaderColumn>
                  <TableHeaderColumn><TextField
                    className={'text-center'} defaultValue={'0.0'}
                    floatingLabelText={intl.formatMessage(custom, { action: intl.formatMessage(discount) })}
                    fullWidth
                    value={variantsProps[key].discount}
                    type={'number'}
                    step={0.1}
                    disabled
                    onChange={this.handleDiscountChange}
                  />%</TableHeaderColumn>
                  <TableHeaderColumn><TextField
                    className={'text-center'} defaultValue={'0'}
                    floatingLabelText={intl.formatMessage(custom, { action: intl.formatMessage(quantity) })}
                    fullWidth
                    value={variantsProps[key].quantity}
                    type={'number'}
                    step={1}
                    disabled
                    onChange={this.handleQuantityChange}
                  />{intl.formatMessage(quantityUnit, { plural: variantsProps[key].quantity > 1 ? 's' : '' })}</TableHeaderColumn>
                  <TableHeaderColumn><TextField
                    className={'text-center'} defaultValue={'0'}
                    floatingLabelText={intl.formatMessage(custom, { action: intl.formatMessage(price) })}
                    fullWidth
                    value={variantsProps[key].price}
                    type={'number'}
                    step={0.1}
                    disabled
                    onChange={this.handlePriceChange}
                  />{currencySrLabel}</TableHeaderColumn>
                  <TableHeaderColumn><TextField
                    className={'text-center '} defaultValue={''}
                    floatingLabelText={intl.formatMessage(custom, { action: intl.formatMessage(barcode) })}
                    fullWidth
                    value={variantsProps[key].barcode}
                    type={'number'}
                    step={1}
                    disabled
                    onChange={this.handleBarcodeChange}
                  /></TableHeaderColumn>
                </TableRow>
              ))
            }
          </TableBody>
          <TableFooter
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  height: 'auto',
                }}
              >
                {Object.keys(selectedProps).map((key) =>
                  this.constructor.existsInArray(variants[key], selectedProps[key].label)
                    ?
                      <Chip
                        key={`${key}_${selectedProps[key].label}_table`}
                        style={{ margin: 4, backgroundColor: '#eee' }}
                        value={`${key}_${selectedProps[key]}`}
                      >
                        {selectedProps[key].label}
                      </Chip> : ''
                )}

              </TableHeaderColumn>
              <TableHeaderColumn><TextField
                className={'text-center'} defaultValue={'0.0'}
                floatingLabelText={intl.formatMessage(custom, { action: intl.formatMessage(discount) })}
                fullWidth
                value={this.state.discount}
                type={'number'}
                step={0.1}
                onChange={this.handleDiscountChange}
              />%</TableHeaderColumn>
              <TableHeaderColumn><TextField
                className={'text-center'} defaultValue={'0'}
                floatingLabelText={intl.formatMessage(custom, { action: intl.formatMessage(quantity) })}
                fullWidth
                value={this.state.quantity}
                type={'number'}
                step={1}
                onChange={this.handleQuantityChange}
              />{intl.formatMessage(quantityUnit, { plural: this.state.quantity > 1 ? 's' : '' })}</TableHeaderColumn>
              <TableHeaderColumn><TextField
                className={'text-center'} defaultValue={'0'}
                floatingLabelText={intl.formatMessage(custom, { action: intl.formatMessage(price) })}
                fullWidth
                value={this.state.price}
                type={'number'}
                step={0.1}
                onChange={this.handlePriceChange}
              />{currencySrLabel}</TableHeaderColumn>
              <TableHeaderColumn><TextField
                className={'text-center '} defaultValue={''}
                floatingLabelText={intl.formatMessage(custom, { action: intl.formatMessage(barcode) })}
                fullWidth
                value={this.state.barcode}
                type={'number'}
                step={1}
                onChange={this.handleBarcodeChange}
              /></TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan={2}>
                <RaisedButton
                  onClick={this.removeVariantRow}
                  style={{ margin: 5 }}
                  backgroundColor={red500}
                  icon={<FontIcon color={fullWhite} className={'material-icons'}>delete_forever</FontIcon>}
                />
                <RaisedButton
                  onClick={this.addVariantProp}
                  style={{ margin: 5 }}
                  backgroundColor={green500}
                  icon={<FontIcon color={fullWhite} className={'material-icons'}>add_box</FontIcon>}
                />
              </TableRowColumn>
              <TableRowColumn>{' '}</TableRowColumn>
              <TableRowColumn>{' '}</TableRowColumn>
              <TableRowColumn>{' '}</TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

MultiVariantForm.propTypes = {
  product: PropTypes.object,
  user: PropTypes.any,
  existing: PropTypes.any,
  intl: PropTypes.any,
};

export default injectIntl(MultiVariantForm);
