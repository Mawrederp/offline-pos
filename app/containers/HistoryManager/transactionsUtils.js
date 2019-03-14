import moment from 'moment';

const symetricDiff = (a, b) =>
  a.filter((x) => !b.includes(x)).concat(b.filter((x) => !a.includes(x)));
export const getNewTransactionsState = (transactions, newTransactions) => {
  const transactionsKeys = Object.keys(transactions);
  const transactionsLength = transactionsKeys.length;
  const newTransactionsKeys = Object.keys(newTransactions);
  const newtransactionsLength = newTransactionsKeys.length;
  let diff = [];
  if (transactionsLength !== newtransactionsLength) {
    diff = symetricDiff(transactionsKeys, newTransactionsKeys);
  }
  return {
    result: {
      ...transactions,
      ...diff.reduce((acc, key) => {
        const temp = acc;
        temp[key] = newTransactions[key];
        return temp;
      }, {}),
    },
    diff,
  };
};

const DateTo = (format, timestamp) =>
  moment(new Date(timestamp)).format(format);

export const getTransactionsTimeIndex = (transactions) => {
  const transactionsIndex = Object.keys(transactions).reduce(
    (acc, prefixedKey) => {
      const temp = acc;
      const key = Number(prefixedKey.replace('TRANSACTION_', ''));
      const monthDate = DateTo('MMMM', key).toLocaleLowerCase();
      const yearDate = DateTo('YYYY', key).toLocaleLowerCase();
      console.log(key);
      if (!temp[`${yearDate}_${monthDate}`]) {
        temp[`${yearDate}_${monthDate}`] = {};
      }
      temp[`${yearDate}_${monthDate}`][prefixedKey] = {
        day: DateTo('dddd', key).toLocaleLowerCase(),
        hour: DateTo('HH', key),
        id: prefixedKey,
      };
      return temp;
    },
    {}
  );
  return transactionsIndex;
};
