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
class CheckoutBench extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    alert('You clicked the Chip.');
  }
  render() {
    return (
      <Paper style={styles.container} className="cart">
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
          cellHeight={60}
          cols={3}
          style={styles.gridList}
          spacing={2}
        >
          {this.props.data.map((tile, idx) => (
            <GridTile
              key={tile.guid}
              title={tile.company}
              subtitle={<span>السعر <b>{tile.prıce}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >

              <img src={`${tile.img}?ver=${idx}`} role="presentation" />
            </GridTile>
          ))}
        </GridList>
      </Paper>
    );
  }
}

CheckoutBench.propTypes = {
  data: PropTypes.array,

};

export default CheckoutBench;
