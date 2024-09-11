export const API = {
  AUTH: {
    INDEX: '/auth',
    VERIFY: '/auth/verify',
    SEND_EMAIL: '/auth/sendNewUserEmail',
    Send_Forgot_Password_Email: '/auth/sendForgotPasswordEmail',
    Contact_Sales: '/auth/contactSales',
    salesforceFileGet: '/auth/getSalesForceDataa',
    salesforceDataAsItIs: '/auth/getSalesForceDataaForEditAsItIs',
    salesforceAddUpdate: '/auth/addSalesForceDataa',
    runSalesForceBot: '/auth/runSalesForceBot',
    addForAccount: '/auth/addSalesForceDataaForAccount',
    getFields: '/auth/getSalesForceFields',
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
    getQuoteByIdForFormStack: '/quote/getQuoteByIdForFormStack',
    GetQuoteByManual: '/quote/getAllManualQuotes',
    UpdateQuoteWithNewlineItemAdd: '/quote/updateQuoteWithNewlineItemAdd',
    updateQuoteJson: '/quote/updateQuoteJsonAndManual',
    ConcernUpdate: '/quote/updateQuoteConcern',
    UpdateQuoteStatusById: '/quote/updateQuoteStatusById',
    QueryAllManualQuotes: '/quote/queryAllManualQuotes',
    GetAllQuotesByOrganization: '/quote/getAllQuotesByOrganization',
    GetQuotesByExistingQuoteFilter: '/quote/getQuotesByExistingQuoteFilter',
    UpdateQuoteCustomerId: '/quote/updateQuoteCustomerId',
  },
  QUOTE_LINE_ITEM: {
    INDEX: '/quoteLineItem',
    QUERY: '/quoteLineItem/query',
    UpdateQuoteLineItemQuantityById:
      '/quoteLineItem/updateQuantityOfQuoteLineItem',
    DeleteQuoteLineItemById: '/quoteLineItem/deleteQuoteLineItems',
    DeleteLineItemsByQuoteFileId: '/quoteLineItem/deleteLineItemsByQuoteFileId',
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
    ProductForContract: '/product/getAllProductForContract',
  },
  PROFITABALITY: {
    INDEX: '/profitability',
    QUERY: '/profitability/query',
    DeleteById: '/profitability/deleteProfitabilityById',
    RemoveBundleById: '/profitability/removeBundleLineItemsById',
    count: '/profitability/getAllProfitabilityCount',
    UpdateProfitabilityValueForBulk:
      '/profitability/updateProfitabilityValueForBulk',
  },
  BUNDLE: {
    INDEX: '/bundle',
    UpdateBundleBulk: '/bundle/updateBundleBulk',
  },
  CACHEFLOW: {
    INDEX: '/cacheFlow',
    GETBYID: '/cacheFlow/getSubscriptionByCutomerId',
    ProposalSub: '/cacheFlow/getProposalBySubscription',
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
  FORMULA: {
    INDEX: '/Formulas',
    GET_FORMULA: '/Formulas/getFormulaByFormula',
    GET_FORMULA_BY_OEM_DIST: '/Formulas/getAllFormulasByDistributorAndOem',
    getWithOemDist: '/Formulas/getFormulaByFormulaAndOemDist',
  },
  CONTRACT_PRODUCT: {
    INDEX: '/contractProduct',
    QUERY: '/contractProduct/deleteContractProduct',
    getContractInBulk: '/contractProduct/getContractInBulkByProductCode',
    delete: '/contractProduct/deleteContractProduct',
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
  ATTACHMENTDOCUMENT: {
    INDEX: '/AttachmentDocument',
    DeletebyId: '/AttachmentDocument/deleteAttachDocumentById',
  },
  FORMSTACK: {
    INDEX: '/formStackTable',
    GETBYDOCID: '/formStackTable/getFormStackByDocId',
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
    EXCEL: '/upload/uploadExcelFile',
  },
  OPPORLINEITEM: {
    INDEX: '/opportunityLineItem',
  },
  DEALREG: {
    INDEX: '/dealReg',
    QUERY: '/dealReg/query',
    GetDealRegByOpportunityId: '/dealReg/getDealRegByOpportunityId',
    GetDealRegByPartnerProgramId: '/dealReg/getDealRegByPartnerProgramId',
    UpdateDealRegStatus: '/dealReg/updateDealRegStatus',
    GetDealRegById: '/dealReg/getDealRegById',
    DealRegFormScript: '/dealReg/dealRegFormScript',
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
    filterData: 'partner/getAllPartnerandProgramFilterData',
    filterDataAdmin: 'partner/getAllPartnerandProgramFilterDataForAdmin',
    approvedForOrg: 'partner/getAllPartnerandProgramApprovedForOrganization',
    CanAddedToOrg: 'partner/getPartnerCanAddedToOrganization',
    GetAllPartnerandProgramFilterDataForOrganizationOnly:
      'partner/getAllPartnerandProgramFilterDataForOrganizationOnly',
    upadteRequestForOrgNewPartnerApproval:
      'partner/upadteRequestForOrgNewPartnerApproval',
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
    REQ_ADMIN: '/partnerProgram/upadteToRequestPartnerandprogramfromAmin',
    LaunchPlayWright: '/partnerProgram/launchPlayWright',
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
    DeleteById: '/quoteFile/deleteQuoteFileById',
    UpdateQuoteFileById: '/quoteFile/updateQuoteFileById',
    GetQuoteFileByQuoteId: '/quoteFile/getQuoteFileByQuoteId',
    QuoteFileVerification: '/quoteFile/quoteFileVerification',
    GetQuoteFileById: '/quoteFile/getQuoteFileById',
    getQuoteFileByQuoteIdAll: '/quoteFile/getQuoteFileByQuoteIdAll',
    getQuoteFileByIdForFormulas: '/quoteFile/getQuoteFileByIdForFormulas',
    postJson: '/quoteFile/updateQuoteFileByIdForQuoteJson',
    getQuoteFileCount: '/quoteFile/getQuoteFileCount',
    getfileByQuoteIdWithManualadd: '/quoteFile/getfileByQuoteIdWithManual',
  },
  ASSIGN_PARTNER_PROGRAM: {
    INDEX: '/assignPartnerProgram',
    QUERY: 'assignPartnerProgram/query',
    DeleteById: '/assignPartnerProgram/deleteById',
    UpdateAssignPartnerProgramById:
      '/assignPartnerProgram/updateAssignPartnerProgramById',
    updateForTheResellerRequest:
      '/assignPartnerProgram/updateForTheResellerRequest',
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
    QueryAttributeFieldForForm: '/attributeField/queryAttributeFieldForForm',
  },
  NOTIFICATION: {
    INDEX: '/notification',
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
    getByIdfororganization:
      '/sharedPartnerPassword/getSharedPartnerPasswordForOrganization',
  },
  FORM_STACK: {
    INDEX: '/formstack',
    QUERY: 'formstack/query',
    UpdateById: '/formstack/updateById',
  },
  CONTRACT_CONFIGURATION: {
    INDEX: '/contractConfiguration',
  },
  LINEITEM_SYNCING: {
    INDEX: '/lineItemSyncing',
    DeleteLineItemSyncingById: '/lineItemSyncing/deleteLineItemSyncingById',
    GetLineItemSyncingById: '/lineItemSyncing/getLineItemSyncingById',
    QUERY: 'lineItemSyncing/query',
    SalesForceAdd: '/lineItemSyncing/insertLineItemSyncingForSalesForce',
    SalesForceGet: '/lineItemSyncing/queryLineItemSyncinForSalesFOrce',
  },
};
