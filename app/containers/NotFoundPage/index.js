/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const styles = {
  container: {
    textAlign: 'center',
    marginTop: 180,
  },
  header: {
    fontSize: 48,
    fontWeight: 100,
    margin: 20,
    lineHeight: '48px',
  },
};

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={styles.container}>
        <div>
          <h1 style={styles.header}>
            404 Page Not Found
          </h1>
          <p>
            <FormattedMessage {...messages.header} />
          </p>
          <p>
            <FormattedMessage {...messages.description} />
          </p>
        </div>
      </div>
    );
  }
}
