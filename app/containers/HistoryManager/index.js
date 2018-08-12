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
import Subheader from 'material-ui/Subheader';
import AutoComplete from 'material-ui/AutoComplete';

import { cyan600, white } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectHistoryManager from './selectors';
import messages from './messages';
import PageBase from '../../components/PageBase';
import CartList from '../../components/CartList';
import Data from '../../data';


export class HistoryManager extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
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

            </Paper>

          </div>
          <div className={'col-md-6 col-lg-6 col-xs-6 col-sm-6'}>
            <Paper style={{ height: '90%' }}>
              <Subheader style={styles.subheader}>قائمة المشتريات</Subheader>
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
              <CartList
                style={{ height: '100%', paddingTop: 5, marginTop: -8, maxHeight: '80%' }}
                data={Data.dashBoardPage.recentProducts}
              />
            </Paper>

          </div>
        </div>
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
