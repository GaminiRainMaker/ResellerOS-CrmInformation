export const API = {
  AUTH: {
    INDEX: '/auth',
    VERIFY: '/auth/verify',
  },
  QUOTE: {
    INDEX: '/quote',
    QUERY: '/quote/query',
    UpdateDraftByID: '/quote/updateQuoteDraft',
    UpdateCompleteByID: '/quote/updateQuoteComplete',
    UpdateQuoteByQuery: '/quote/updateQuoteByQuery',
    DeleteById: '/quote/deleteQuote',
    GetQuotesByDateFilter: '/quote/getQuotesByDateFilter',
    GetQuoteByID: '/quote/getQuoteById',
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
    UpdateUserById: '/user/updateUserById',
    AddUser: '/user/addUser',
    TOKEN: '/user/getUserByToken',
    DeleteById: '/user/deleteById',
    USERBYID: 'user/getUserById',
  },
  PRODUCT: {
    INDEX: '/product',
    GetProductByPartNo: '/product/getProductByPartNo',
    QUERY: '/product/query',
    DeleteById: '/product/deleteById',
    UpdateProductById: '/product/updateProductById',
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
  VALIDATION: {
    INDEX: '/validation',
    QUERY: '/validation/query',
  },
  CONTRACT: {
    INDEX: '/contract',
    QUERY: '/contract/query',
  },
  CONTRACT_PRODUCT: {
    INDEX: '/contractProduct',
    QUERY: '/contractProduct/query',
  },
  CUSTOMER: {
    INDEX: '/customer',
    QUERY: '/customer/updateCustomer',
    SEARCH: '/customer/search',
    QUERYCUSTOMER: '/customer/query',
    GETBYID: '/customer/getAllCustomerById',
  },
  ADDRESS: {
    INDEX: '/address',
  },
  BILLINGADDRESS: {
    INDEX: '/billingContact',
    QUERY: '/billingContact/deleteBillingContact',
    SEARCH: '/billingContact/getBillingContactBySearch',
    QUERYCONTACT: '/billingContact/query',
  },
  OPPORTUNITY: {
    INDEX: '/opportunity',
    QUERY: '/opportunity/getOpportunityById',
    DELETE: '/opportunity/deleteOpportunityById',
    QUERYOPPORTUNITY: '/opportunity/query',
  },
  TABLECOLUMN: {
    INDEX: '/TableColumn',
  },
  GENERALSETTING: {
    INDEX: '/GeneralSetting',
  },
  CONTRACTSETTING_API: {
    INDEX: '/ContractSetting',
  },
  SYNCTABLE: {
    INDEX: '/syncTable',
  },
  UPLOADAWS: {
    INDEX: '/upload/uploadDocument',
  },
  OPPORLINEITEM: {
    INDEX: '/opportunityLineItem',
  },
  DEALREG: {
    INDEX: '/dealReg',
    QUERY: '/dealReg/query',
  },
  DEALREGADDRESS: {
    INDEX: '/dealRegAddress',
    QUERY: '/dealRegAddress/query',
  },
  PARTNER: {
    INDEX: '/partner',
    QUERY: 'partner/query',
    DeleteById: '/partner/deleteById',
    UpdatePartnerById: '/partner/updatePartnerById',
  },
};
