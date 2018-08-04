import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { white, purple600, purple500 } from 'material-ui/styles/colors';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import typography from 'material-ui/styles/typography';

const NewOrders = (props) => {
  const styles = {
    paper: {
      backgroundColor: purple500,
      height: 250,
    },
    div: {
      height: 185,
      padding: '5px 15px 0 15px',
    },
    header: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      color: white,
      backgroundColor: purple600,
      padding: 10,
    },
  };

  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header }}>
        الاداء الكلي
      </div>
      <div style={styles.div}>
        <ResponsiveContainer >
          <LineChart data={props.data}>
            <XAxis dataKey="name" stroke="none" />
            <Line type="monotone" dataKey="New Orders" stroke="#8884d8" strokeWidth={2} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Paper >
  );
};

NewOrders.propTypes = {
  data: PropTypes.array,
};

export default NewOrders;
