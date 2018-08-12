/**
*
* HistoryModal
*
*/

import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class HistoryModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { handleClose, open, id } = this.props;
    const actions = [
      <FlatButton
        label="الغاء"
        primary
        onClick={() => this.props.handleClose(false)}
      />,
    ];
    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={handleClose}
          container={() => document.getElementById(id)}
          overlayStyle={{ display: 'none' }}
          contentStyle={{ maxWidth: 'none' }}
          actionsContainerStyle={{
            textAlign: 'center',
            button: {
              minWidth: '25%',
            },
          }}
        >

        </Dialog>
      </div>
    );
  }
}

HistoryModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  id: PropTypes.string,
};

export default HistoryModal;
