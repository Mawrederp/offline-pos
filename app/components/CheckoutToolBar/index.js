/**
*
* CheckoutToolBar
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function CheckoutToolBar() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

CheckoutToolBar.propTypes = {

};

export default CheckoutToolBar;
