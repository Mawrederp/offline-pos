/**
*
* SelectableList
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { List, makeSelectable } from 'material-ui/List';

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      className: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number,
      onSelectedIndexChanged: PropTypes.func,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      if (index > -1) {
        this.setState({
          selectedIndex: index,
        });

        if (this.props.onSelectedIndexChanged) {
          this.props.onSelectedIndexChanged(index);
        }
      }
    };

    setSelectedIndex(index) {
      this.setState({
        selectedIndex: index,
      });
    }

    render() {
      return (
        <ComposedComponent
          className={this.props.className}
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

export default wrapState(makeSelectable(List));
