import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { white } from 'material-ui/styles/colors';
import typography from 'material-ui/styles/typography';

class InfoBox extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { color, title, value, Icon, iconColor } = this.props;

    const styles = {
      container: {
        backgroundColor: color,
      },
      content: {
        padding: '5px 10px',
        marginLeft: 0,
        textAlign: 'right',
        height: 120,
        zIndex: 1,
        position: 'relative',
      },
      number: {
        marginTop: 15,
        marginBottom: 8,
        display: 'block',
        fontWeight: typography.fontWeight,
        fontSize: 32,
        color: white,
      },
      text: {
        fontSize: 20,
        fontWeight: typography.fontWeightLight,
        color: white,
      },
      iconSpan: {
        float: 'left',
        height: 130,
        width: 90,
        textAlign: 'center',
        backgroundColor: color,
        position: 'absolute',
        zIndex: 0,
      },
      icon: {
        height: 96,
        width: 96,
        fontSize: 96,
        bottom: 0,
        position: 'absolute',
        left: 0,
        fill: iconColor,
      },
    };

    return (
      <Paper style={styles.container}>
        <span style={styles.iconSpan}>
          <FontIcon color={iconColor} style={styles.icon} className="material-icons">
            {Icon}
          </FontIcon>
        </span>

        <div style={styles.content}>
          <span style={styles.number}>{value}</span>
          <span style={styles.text}>{title}</span>
        </div>
      </Paper>
    );
  }
}

InfoBox.propTypes = {
  Icon: PropTypes.any, // eslint-disable-line
  iconColor: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
};

export default InfoBox;
