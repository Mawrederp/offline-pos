import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { white, cyan500, cyan600 } from 'material-ui/styles/colors';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import GlobalStyles from '../../../styles';

const MonthlySales = (props) => {
  const styles = {
    paper: {
      backgroundColor: cyan600,
      height: 250,
    },
    div: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%',
      height: 185,
    },
    header: {
      color: white,
      backgroundColor: cyan500,
      padding: 10,
    },
  };

  const renderLabel = (labelProps) => {
    const { x, y, width, value } = labelProps;

    if (x === +x && y === +y) {
      return (
        <text
          x={(x + (width / 2.1))}
          y={y}
          dy={-5}
          textAnchor={'middle'}
          key={value}
          style={{ color: white }}
        >
          {value}
        </text>);
    }

    return null;
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...GlobalStyles.title, ...styles.header }}>
        المبيعات خلال الاشهر
              </div>
      <div className="monthly-sales" style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={props.data}>
            <XAxis dataKey="name" stroke="none" tick={{ fill: white }} />
            <YAxis tickCount={10} tick={{ fill: white }} />
            <Bar dataKey="uv" fill={cyan500} label={renderLabel} stroke={white} />
            <CartesianGrid vertical={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

MonthlySales.propTypes = {
  data: PropTypes.array,
};

export default MonthlySales;
