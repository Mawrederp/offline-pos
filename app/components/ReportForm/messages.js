/*
 * ReportForm Messages
 *
 * This contains all the text for the ReportForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  cashBalance: {
    id: 'app.components.OpenRegistryReport.cashBalance',
    defaultMessage: '{balance} {cash}',
  },
  receiptsBalance: {
    id: 'app.components.OpenRegistryReport.receiptsBalance',
    defaultMessage: '{balance} {receipts}',
  },
  theReceipts: {
    id: 'app.components.theReceipts',
    defaultMessage: 'الايصالات',
  },
  theCash: {
    id: 'app.components.theCash',
    defaultMessage: 'النقود',
  },
  balance: {
    id: 'app.components.balance',
    defaultMessage: 'رصيد',
  },
});
