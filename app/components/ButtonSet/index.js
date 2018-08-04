import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';


const ButtonSet = ({ buttons, name, pressHandler, className }) => {
  const percentagePerButton = `${100 / buttons.length}%`;
  const rowStyle = {
    height: percentagePerButton,
  };

  const btns = buttons.map((row, i) => (
    <div className="buttonRow" style={rowStyle} key={`row-${name}-${i}`}>
      {row.map((label) => (
        <FlatButton
          labelStyle={{
            color: 'black',
            fontSize: '3vh',
            fontWeight: '100',
          }}
          style={{
            margin: 'auto',
            height: '100%',
            width: '100%',
            minWidth: '10px',
          }}
          hoverColor={'none'}
          label={label}
          key={label}
          onTouchTap={() => pressHandler(label)}
        />
      ))}
    </div>
  ));
  return (
    <div className={className}>
      {btns.map((button) => (
        button
      ))}
    </div>
  );
};

ButtonSet.propTypes = {
  buttons: PropTypes.array,
  name: PropTypes.string,
  className: PropTypes.string,
  pressHandler: PropTypes.func,
};

export default ButtonSet;
