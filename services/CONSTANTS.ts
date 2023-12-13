export const API = {
  QUOTE: {
    INDEX: '/quote',
    QUERY: '/quote/query',
    UpdateDraftByID: '/quote/updateQuoteDraft',
    UpdateCompleteByID: '/quote/updateQuoteComplete',
    UpdateQuoteByQuery: '/quote/updateQuoteByQuery',
    DeleteById: '/quote/deleteQuote',
  },
  QUOTE_LINE_ITEM: {
    INDEX: '/quoteLineItem',
    QUERY: '/quoteLineItem/query',
    UpdateQuoteLineItemQuantityById:
      '/quoteLineItem/updateQuantityOfQuoteLineItem',
    DeleteQuoteLineItemQuantityById: '/quoteLineItem/deleteQuoteLineItems',
    GetQuoteLineItemByQuoteId: '/quoteLineItem/getQuoteLineItemByQuoteId',
  },
  USER: {
    INDEX: '/user',
    LOGIN: '/user/login',
    QUERY: '/user/query',
  },
  PRODUCT: {
    INDEX: '/product',
    GetProductByPartNo: '/product/getProductByPartNo',
    QUERY: '/product/query',
  },
  BUNDLE: {
    INDEX: '/bundle',
  },
};
