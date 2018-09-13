import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, makeSelectable } from 'material-ui/List';
let SelectableList = makeSelectable(List);
function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      onChange: PropTypes.func,
      defaultValue: PropTypes.number.isRequired,
    };

    static getDerivedStateFromProps(props, state) {
      if (!state) {
        return { selectedIndex: props.defaultValue };
      }
      return null;
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
      if (this.props.onChange) {
        this.props.onChange(event, index);
      }
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

export default SelectableList = wrapState(SelectableList);
