/*
 *
 * HistoryManager
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { grey400, cyan600, white } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectHistoryManager from './selectors';
import messages from './messages';
import PageBase from '../../components/PageBase';
import MultiCart from '../MultiCart';
import Data from '../../data';
import PaymentModal from '../../components/PaymentModal';


export class HistoryManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      paymentModalOpen: false,
      id: props.id || 'checkout2',
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.paymentConcluded = this.paymentConcluded.bind(this);
    this.openPaymentModal = this.openPaymentModal.bind(this);
  }
  componentWillMount() {
    this.setState({
      loading: false,
    });
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
  openPaymentModal = () => {
    this.setState({
      paymentModalOpen: true,
    });
  }

  paymentConcluded = (status) => {
    this.setState({ paymentModalOpen: false });
    if (!status) return 0;
    return true;
  }
  render() {
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
    const iconButtonElement = (
      <IconButton
        touch
        tooltipPosition="bottom-left"
      >
        <FontIcon color={grey400} className="material-icons">more_vert_icon</FontIcon>
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>View</MenuItem>
      </IconMenu>
    );
    return (
      <PageBase
        navigation=""
        noWrapContent
        loading={this.state.loading}
      >
        <Helmet
          title="HistoryManager"
          meta={[
            { name: 'description', content: 'Description of HistoryManager' },
          ]}
        />
        <div className={'row'}>
          <div className={'col-md-6 col-lg-6 col-xs-6 col-sm-6'}>
            <Paper style={{ height: '90%' }}>
              <Subheader style={styles.subheader}>المبيعات</Subheader>
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
              <List>
                <div >
                  <ListItem

                    primaryText={
                      <Chip onClick={() => { }}>
                        <Avatar src="http://i.pravatar.cc/100" />
                        محمد سليم

                      </Chip>}
                    secondaryText={'رقم الفاتورة : 0021   | قيمة الفاتورة:249 ريال  | الخصم:5%'}
                    rightIconButton={rightIconMenu}
                  />
                  <Divider inset />
                  <ListItem

                    primaryText={
                      <Chip onClick={() => { }}>
                        <Avatar src="" >
                          <FontIcon className={'material-icons'} style={{ color: white }}>avatar</FontIcon>
                        </Avatar>
                        زبون مجهول
                      </Chip>}
                    secondaryText={'رقم الفاتورة : 0021   | قيمة الفاتورة:249 ريال  | الخصم:5%'}
                    rightIconButton={rightIconMenu}
                  />
                  <Divider inset />
                </div>

              </List>
            </Paper>

          </div>
          <div className={'col-md-6 col-lg-6 col-xs-6 col-sm-6'}>
            <MultiCart
              products={Data.dashBoardPage.recentProducts}
              openPaymentModal={this.openPaymentModal}
            />

          </div>
        </div>
        <PaymentModal open={this.state.paymentModalOpen} handleClose={this.paymentConcluded} container={this.state.id} currency={'ريال'} data={Data.dashBoardPage.recentProducts} />

      </PageBase>
    );
  }
}

HistoryManager.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  HistoryManager: makeSelectHistoryManager(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryManager);
