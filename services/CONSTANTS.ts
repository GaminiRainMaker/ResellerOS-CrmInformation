export const API = {
  AUTH: {
    INDEX: '/auth',
    VERIFY: '/auth/verify',
    SEND_EMAIL: '/auth/sendNewUserEmail',
    Send_Forgot_Password_Email: '/auth/sendForgotPasswordEmail',
    Contact_Sales: '/auth/contactSales',
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
    GetQuoteByManual: '/quote/getAllManualQuotes',
    UpdateQuoteWithNewlineItemAdd: '/quote/updateQuoteWithNewlineItemAdd',
    updateQuoteJson: '/quote/updateQuoteJsonAndManual',
    ConcernUpdate: '/quote/updateQuoteConcern',
    UpdateQuoteStatusById: '/quote/updateQuoteStatusById',
    QueryAllManualQuotes: '/quote/queryAllManualQuotes',
    GetAllQuotesByOrganization: '/quote/getAllQuotesByOrganization',
  },
  QUOTE_LINE_ITEM: {
    INDEX: '/quoteLineItem',
    QUERY: '/quoteLineItem/query',
    UpdateQuoteLineItemQuantityById:
      '/quoteLineItem/updateQuantityOfQuoteLineItem',
    DeleteQuoteLineItemById: '/quoteLineItem/deleteQuoteLineItems',
    GetQuoteLineItemByQuoteId: '/quoteLineItem/getQuoteLineItemByQuoteId',
    GetQuoteLineItemByQuoteIdandBundleIdNull:
      '/quoteLineItem/getQuoteLineItemByQuoteIdandBundleIdNull',
    UpdateQuoteLineItemById: '/quoteLineItem/updateQuoteLineItemById',
    UpdateQuoteLineItemConcern: '/quoteLineItem/updateQuoteLineItemConcern',
    UpdateQuoteLineItemVerified: '/quoteLineItem/updateQuoteLineItemVerified',
    deleteQuoteLineByQuoteId: '/quoteLineItem/deleteQuoteLineItemByQuoteId',
    GetQuoteLineItemByQuoteIdForTableEdits:
      '/quoteLineItem/getQuoteLineItemByQuoteIdForEditTable',
  },
  USER: {
    INDEX: '/user',
    LOGIN: '/user/login',
    QUERY: '/user/query',
    UpdateUserById: '/user/updateUserById',
    UpdateUserPassword: '/user/updateUserPassword',
    AddUser: '/user/addUser',
    TOKEN: '/user/getUserByToken',
    DeleteById: '/user/deleteById',
    USERBYID: '/user/getUserById',
    GetAdminUserOfAllOrganization: '/user/getAdminUserOfAllOrganization',
    GetGlobalSearchData: '/user/globalSearchApi',
    profileImage: '/user/getUserProfileImage',
    GetSeats: '/user/getOranizationSeats',
    UpdateUserPasswordForNew: '/user/updateUserPasswordForNew',
  },
  PRODUCT: {
    INDEX: '/product',
    GetProductByPartNo: '/product/getProductByPartNo',
    QUERY: '/product/query',
    DeleteById: '/product/deleteById',
    UpdateProductById: '/product/updateProductById',
    BULKINSERT: '/product/addProductInBulk',
    GETBULK: '/product/getBulkProductBYProductCode',
  },
  PROFITABALITY: {
    INDEX: '/profitability',
    QUERY: '/profitability/query',
    DeleteById: '/profitability/deleteProfitabilityById',
  },
  BUNDLE: {
    INDEX: '/bundle',
  },
  CACHEFLOW: {
    INDEX: '/cacheFlow',
    GETBYID: '/cacheFlow/getProposalDataById',
  },
  REBATE_QUOTE_LINE_ITEM: {
    INDEX: '/rebatesQuoteLineItem',
    QUERY: '/rebatesQuoteLineItem/query',
  },
  REBATE: {
    INDEX: '/rebates',
    QUERY: '/rebates/query',
    GetRebatesByProductCode: '/rebates/getRebatesByProductCode',
    RebatesInBul: '/rebates/getRebatesInBulkByProductCode',
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
    getContractInBulk: '/contractProduct/getContractInBulkByProductCode',
  },
  CUSTOMER: {
    INDEX: '/customer',
    QUERY: '/customer/updateCustomer',
    SEARCH: '/customer/search',
    QUERYCUSTOMER: '/customer/query',
    GETBYID: '/customer/getAllCustomerById',
    GetCustomerProfileById: '/customer/getCustomerProfileById',
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
    GetAllOpportunityByOrganization:
      '/opportunity/getAllOpportunityByOrganization',
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
    IMAGE: '/upload/imageUpload',
  },
  OPPORLINEITEM: {
    INDEX: '/opportunityLineItem',
  },
  DEALREG: {
    INDEX: '/dealReg',
    QUERY: '/dealReg/query',
    GetDealRegByOpportunityId: '/dealReg/getDealRegByOpportunityId',
    GetDealRegByPartnerProgramId: '/dealReg/getDealRegByPartnerProgramId',
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
    GetAllPartnerTemp: '/partner/getAllPartnerTemp',
    getAllPartnerandProgram: '/partner/getAllPartnerandProgram',
  },
  PARTNER_PROGRAM: {
    INDEX: '/partnerProgram',
    QUERY: 'partnerProgram/query',
    DeleteById: '/partnerProgram/deleteById',
    UpdatePartnerProgramById: '/partnerProgram/updatePartnerProgramById',
    GetPartnerProgramById: '/partnerProgram/getPartnerProgramById',
    deletePartnerFormData: '/partnerProgram/deletePartnerProgramFormData',
    GetUnassignedProgram: '/partnerProgram/getUnassignedProgram',
    GetFormDataProgram: '/partnerProgram/getFormDataProgram',
  },
  DISTRIBUTOR: {
    INDEX: '/distributor',
    QUERY: 'distributor/query',
    DeleteById: '/distributor/deleteById',
  },
  OEM: {
    INDEX: '/oem',
    QUERY: '/oem/query',
    DeleteById: '/oem/deleteById',
  },
  QUOTE_CONFIGURATION: {
    INDEX: '/quoteConfiguration',
    QUERY: '/quoteConfiguration/query',
    DeleteById: '/quoteConfiguration/deleteById',
    GetOemByDistributorId: '/quoteConfiguration/getOemByDistributorId',
    GetDistributorByOemId: '/quoteConfiguration/getDistributorByOemId',
  },
  QUOTE_FILE: {
    INDEX: '/quoteFile',
    QUERY: '/quoteFile/query',
    DeleteById: '/quoteFile/deleteById',
    UpdateQuoteFileById: '/quoteFile/updateQuoteFileById',
    GetQuoteFileByQuoteId: '/quoteFile/getQuoteFileByQuoteId',
    QuoteFileVerification: '/quoteFile/quoteFileVerification',
    GetQuoteFileById: '/quoteFile/getQuoteFileById',
    postJson: '/quoteFile/updateQuoteFileByIdForQuoteJson',
  },
  ASSIGN_PARTNER_PROGRAM: {
    INDEX: '/assignPartnerProgram',
    QUERY: 'assignPartnerProgram/query',
    DeleteById: '/assignPartnerProgram/deleteById',
    UpdateAssignPartnerProgramById:
      '/assignPartnerProgram/updateAssignPartnerProgramById',
  },
  ATTRIBUTE_SECTION: {
    INDEX: '/attributeSection',
    QUERY: 'attributeSection/query',
    DeleteById: '/attributeSection/deleteById',
    UpdateAttributeSectionById: '/attributeSection/updateAttributeSectionById',
  },
  ATTRIBUTE_FIELD: {
    INDEX: '/attributeField',
    QUERY: 'attributeField/query',
    DeleteById: '/attributeField/deleteById',
    UpdateAttributeFieldById: '/attributeField/updateAttributeFieldById',
  },
  NOTIFICATION: {
    INDEX: '/notification',
    NEWNOTIFICATION: '/notification/getAllNewNotification',
    DeleteById: '/notification/deleteNotificationById',
    GetRecentNotifications: '/notification/getRecentNotifications',
    GetEarlierNotifications: '/notification/getEarlierNotifications',
  },
  PARTNER_PASSWORD: {
    INDEX: '/partnerPassword',
    QUERY: 'partnerPassword/query',
    DeleteById: '/partnerPassword/deleteById',
    UpdateById: '/partnerPassword/updateById',
  },
  SHARED_PARTNER_PASSWORD: {
    INDEX: '/sharedPartnerPassword',
    QUERY: 'sharedPartnerPassword/query',
    DeleteById: '/sharedPartnerPassword/deleteById',
    UpdateById: '/sharedPartnerPassword/updateById',
  },
};
