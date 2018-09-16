/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 *
 * ProductsModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
// pick utils
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Subheader } from 'material-ui';
import ProductForm from '../ProductForm';
import MultiVariantForm from '../MultiVariantForm';
import data from '../../data';

const Fragment = React.Fragment;
const ProductTypeSelection = ({ handleSelection }) => (
  <div className={'row'}>
    <div className={'col-md-6 col-xs-6 col-lg-6 col-sm-6 m-b-15'}>
      <RaisedButton
        label={'اساسي'}
        primary
        fullWidth
        onClick={() => handleSelection(true)}
      />
    </div>
    <div className={'col-md-6 col-xs-6 col-lg-6 col-sm-6 m-b-15'}>
      <RaisedButton
        label={'متعدد الاصناف'}
        primary
        fullWidth
        onClick={() => handleSelection()}
      />
    </div>
  </div>
);

class ProductsModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      basicProductInfo: null,

    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.triggerSubmit = this.triggerSubmit.bind(this);
    this.getActiveInfo = this.getActiveInfo.bind(this);
  }

  getActiveInfo() {
    const { product } = this.props;
    const { basicProductInfo } = this.state;
    const basicInfoExists = basicProductInfo !== null;
    if (basicInfoExists) {
      return {
        ...product,
        ...Object.keys(basicProductInfo)
          .filter((key) => this.getValidation(key, basicProductInfo[key]))
          .reduce((acc, key) => ({ ...acc, [key]: basicProductInfo[key] }), {}),
      };
    }
    return product;
  }

  getValidation(key, value) {
    const validMap = {
      discount: (val) => !isNaN(val),
      name: (val) => !!val,
      price: (val) => !isNaN(val),
      quantity: (val) => !isNaN(val),
      barcode: (val) => !isNaN(val),
      tax: (val) => !isNaN(val),
    };
    return validMap[key] === undefined ? true : validMap[key](value);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <ProductForm user={this.props.user} product={this.getActiveInfo()} />
        );
      case 1:
        return (
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <MultiVariantForm
              user={this.props.user} existing={this.props.product}
              product={this.state.basicProductInfo}
            />
          </MuiPickersUtilsProvider>);
      default:
        this.props.handleClose();
        return null;
    }
  }

  handleClose() {
    this.setState({
      finished: false,
      stepIndex: 0,
      basicProductInfo: null,
    });
    this.props.handleClose();
  }

  handleNext = (initial) => {
    const { stepIndex, basicProductInfo } = this.state;
    let closeObj = {
      finished: false,
      stepIndex: 0,
      basicProductInfo: null,
    };
    const passThrough = 1;

    if (!(stepIndex === 1 && basicProductInfo)) {
      closeObj = {};
    }
    this.setState({
      stepIndex: basicProductInfo ? 1 : 0,
      finished: stepIndex >= 1,
      ...closeObj,
    });
  };

  triggerSubmit() {
    document.getElementById('products-form-submit').click();
  }

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: 0 });
    }
  };

  handleSelection = (selection) => {
    this.setState({ basicProduct: selection });
    this.handleNext();
  };

  handleSubmit(evt) {
    evt.preventDefault();
    const { basicProductInfo, stepIndex } = this.state;
    const formData = new FormData(document.getElementById('products-form'));
    const imgInput = document.getElementById('product-image-file');
    const img = formData.get('img');
    try {
      if (img.size) {
        const reader = new FileReader();

        reader.onload = function (e) {
          document.getElementById('product-img-preview').setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(img);
      }
    } catch (e) {
    }
    const dataObj = { validation: {} };
    const validation = {
      discount: (val) => !isNaN(val),
      name: (val) => !!val,
      price: (val) => !isNaN(val),
      quantity: (val) => !isNaN(val),
      barcode: (val) => !isNaN(val),
      tax: (val) => !isNaN(val),
    };
    let closeObj = {
      finished: false,
      stepIndex: 0,
      basicProductInfo: null,
    };
    formData.forEach((value, key) => {
      dataObj[key] = value;
      if (validation[key]) {
        dataObj.validation[key] = validation[key](value);
      }
    });
    if (!(stepIndex === 1 && basicProductInfo)) {
      closeObj = {};
    }
    if (!basicProductInfo) {
      if (dataObj.name && !isNaN(dataObj.quantity) && dataObj.price) {
        this.setState({ basicProductInfo: dataObj, stepIndex: 1 });
      }
    } else {
      this.setState({
        stepIndex: basicProductInfo ? 1 : 0,
        finished: stepIndex >= 1,
        ...closeObj,
      });
      if (stepIndex >= 1) {
        this.props.setProduct({
          ...{ variants: '{}',
            variantsProps: '{}',
          },
          ...this.props.product,
          ...basicProductInfo,
          ...dataObj });
        this.props.handleClose();
      }
    }
  }

  render() {
    const { open, product } = this.props;
    const { stepIndex, handleClose } = this.state;
    const actions = [

      <FlatButton
        label="الى الخلف"
        disabled={stepIndex === 0}
        onClick={this.handlePrev}
        style={{ marginRight: 12 }}
      />,
      <Fragment>
        {
          (stepIndex === 1) ? <RaisedButton
            label={'انهاء'}
            primary
            onClick={this.triggerSubmit}
          /> :
            <RaisedButton
              label={'التالي'}
              primary
              onClick={this.triggerSubmit}
            />
        }
      </Fragment>,
      <FlatButton
        label={'الغاء'}
        primary
        keyboardFocused
        onClick={this.handleClose}
      />,
    ];

    return (
      <Dialog
        actions={actions}
        title={product ? 'تعديل منتج' : 'انشاء منتج جديد'}
        modal={false}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent
        style={{ zIndex: 1300 }}
        container={() => document.getElementById(product.name)}
        contentStyle={{ width: '100%', maxWidth: 'none' }}
        fullWidth
      >
        <div>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>معلومات المنتج الاساسية</StepLabel>
            </Step>
            <Step>
              <StepLabel>اعدادات المنتج متعدد الاشكال</StepLabel>
            </Step>

          </Stepper>
          <form
            encType={'multipart/form-data'}
            id={'products-form'} onSubmit={this.handleSubmit}
            onKeyPress={(e) => e.which === 13 && e.preventDefault()}
          >
            {this.getStepContent(stepIndex)}
            <button
              type={'submit'} style={{ display: 'none' }} id={'products-form-submit'}
            />
          </form>

        </div>
      </Dialog>
    );
  }
}

ProductsModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  setProduct: PropTypes.func,
  product: PropTypes.object,
  user: PropTypes.any,
};

export default ProductsModal;
