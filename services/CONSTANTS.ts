export const API = {
  QUOTE: {
    INDEX: '/quote',
    QUERY: '/quote/query',
    UpdateDraftByID: '/quote/updateQuoteDraft',
    UpdateCompleteByID: '/quote/updateQuoteComplete',
    UpdateQuoteByQuery: '/quote/updateQuoteByQuery',
    DeleteById: '/quote/deleteQuote',
    GetQuotesByDateFilter: '/quote/getQuotesByDateFilter',
  },
  QUOTE_LINE_ITEM: {
    INDEX: '/quoteLineItem',
    QUERY: '/quoteLineItem/query',
    UpdateQuoteLineItemQuantityById:
      '/quoteLineItem/updateQuantityOfQuoteLineItem',
    DeleteQuoteLineItemQuantityById: '/quoteLineItem/deleteQuoteLineItems',
    GetQuoteLineItemByQuoteId: '/quoteLineItem/getQuoteLineItemByQuoteId',
    GetQuoteLineItemByQuoteIdandBundleIdNull:
      '/quoteLineItem/getQuoteLineItemByQuoteIdandBundleIdNull',
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
  PROFITABALITY: {
    INDEX: '/profitability',
    QUERY: '/profitability/query',
  },
  BUNDLE: {
    INDEX: '/bundle',
  },
  REBATE_QUOTE_LINE_ITEM: {
    INDEX: '/rebatesQuoteLineItem',
    QUERY: '/rebatesQuoteLineItem/query',
  },
  REBATE: {
    INDEX: '/rebates',
    QUERY: '/rebates/query',
    GetRebatesByProductCode: '/rebates/getRebatesByProductCode',
  },
};
