/**
*
* DateTimeLabel
*
*/

import React from 'react';
// import styled from 'styled-components';


class DateTimeLabel extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dateString: new Date().toLocaleString(),
    };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    setInterval(this.tick, 1000);
  }

  tick() {
    this.setState({ dateString: new Date().toLocaleString() });
  }

  render() {
    return (
      <span {...this.props}>
        {this.state.dateString}
      </span>
    );
  }
}

DateTimeLabel.propTypes = {

};

export default DateTimeLabel;
