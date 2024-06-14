/* eslint-disable no-plusplus */
/* eslint-disable no-multi-str */
/* eslint-disable no-unsafe-optional-chaining */
export const selectDataForProduct = [
  {value: 'Professional Services', label: 'Professional Services'},
  {value: 'Subscriptions', label: 'Subscriptions'},
  {value: 'Products', label: 'Products'},
  {value: 'Maintenance', label: 'Maintenance'},
];

export const selectData = [
  {value: 'Product Family', label: 'Product Family'},
  {value: 'Pricing Method', label: 'Pricing Method'},
  {value: 'Vendor/Disti', label: 'Vendor/Disti'},
  {value: 'OEM', label: 'OEM'},
  {value: 'File Name', label: 'File Name'},
];

export const quoteStatusOptions = [
  {value: 'In Progress', label: 'In Progress'},
];
export const quoteReviewStatusOptions = [
  {value: 'Approved', label: 'Approved'},
  {value: 'Rejected', label: 'Rejected'},
];

export const pricingMethod = [
  {value: 'cost_percentage', label: 'Cost + %'},
  {value: 'cost_dollar', label: 'Cost + $'},
  {value: 'list_percentage', label: 'List - %'},
  {value: 'list_dollar', label: 'List - $'},
  {value: 'manual', label: 'Manual'},
  {value: 'gp', label: 'GP'},
];

export const StageValue = [
  {value: 'Prove', label: 'Prove'},
  {value: 'Qualify', label: 'Qualify'},
  {value: 'Negotiate', label: 'Negotiate'},
  {value: 'Develop', label: 'Develop'},
  {value: 'Commit', label: 'Commit'},
];

export const ContractConfigurationColumn = [
  {value: 'quote', label: 'Quote'},
  {value: 'opportunity', label: 'Opportunity'},
  {value: 'quote_line_item', label: 'Quote Line Item'},
];

export const opportunityColumn = [
  {value: 'title', label: 'Title'},
  {value: 'stages', label: 'Stages'},
  {value: 'pdf_url', label: 'PDF'},
];

export const quoteLineItemColumn = [
  {value: 'product_code', label: 'Product Code'},
  {value: 'description', label: 'Description'},
  {value: 'pdf_url', label: 'PDF'},
];

export const quoteLineItemColumnForSync = [
  {value: 'product_code', label: 'SKU'},
  {value: 'quantity', label: 'QUANTITY'},
  {value: 'list_price', label: 'MSRP'},
  {value: 'adjusted_price', label: 'COST'},
  {value: 'description', label: 'DESCRIPTION'},
];

export const quoteColumns = [
  {value: 'cage_code', label: 'Stages'},
  {value: 'customer_address', label: 'Customer Address'},
  {value: 'customer_city', label: 'Customer City'},
  {value: 'customer_email', label: 'Customer Email'},
  {value: 'customer_name', label: 'Customer Name'},
  {value: 'distributor_address', label: 'Distributor Address'},
  {value: 'distributor_city', label: 'Distributor City'},
  {value: 'distributor_email', label: 'Distributor Email'},
  {value: 'distributor_name', label: 'Distributor Name'},
  {value: 'fob_shipping', label: 'Fob Shipping'},
  {value: 'ftin', label: 'Ftin'},
  {value: 'oem_name', label: 'Oem Name'},
  {value: 'reseller_email', label: 'Reseller Email'},
  {value: 'reseller_name', label: 'Reseller Name'},
  {value: 'reseller_state', label: 'Reseller State'},
  {value: 'reseller_street', label: 'Reseller Street'},
  {value: 'shipping', label: 'Shipping'},
  {value: 'subtotal', label: 'Subtotal'},
  {value: 'uei', label: 'UEI'},
  {value: 'file_name', label: 'File Name'},
  {value: 'opportunity', label: 'Opportunity'},
  {value: 'pdf_url', label: 'PDF'},
];
export const quotLineItemsColumnsSync = [
  {value: 'line_number', label: 'Line Number', type: 'number'},
  {value: 'adjusted_price', label: 'Adjusted Price', type: 'number'},
  {value: 'product_code', label: 'Product Code', type: 'string'},
  {value: 'line_amount', label: 'Line Amount', type: 'number'},
  {value: 'list_price', label: 'List Price', type: 'number'},
  {value: 'description', label: 'Description', type: 'string'},
  {value: 'quantity', label: 'Quantity', type: 'number'},
  {value: 'pdf_url', label: 'Pdf Url', type: 'string'},
  {value: 'eventId', label: 'EventId', type: 'number'},
  {value: 'portalId', label: 'PortalId', type: 'number'},
  {value: 'occurredAt', label: 'OccurredAt', type: 'string'},
  {value: 'subscriptionType', label: 'Subscription Type', type: 'string'},
  {value: 'attemptNumber', label: 'Attempt Number', type: 'number'},
  {value: 'objectId', label: 'ObjectId', type: 'number'},
  {value: 'changeSource', label: 'Change Source', type: 'string'},
  {value: 'changeFlag', label: 'Change Flag', type: 'string'},
  {value: 'appId', label: 'AppId', type: 'number'},
  {value: 'quote_file_id', label: 'Quote File Id', type: 'number'},
  {value: 'contract_price', label: 'Contract Price', type: 'number'},
  {value: 'unit_price', label: 'Unit Price', type: 'number'},
  {value: 'customer_id', label: 'Customer Id', type: 'number'},
  {value: 'user_id', label: 'User Id', type: 'number'},
  {value: 'organization', label: 'Organization', type: 'string'},
  {value: 'quote_id', label: 'Quote Id', type: 'number'},
  {value: 'product_id', label: 'Product Id', type: 'number'},
  {value: 'bundle_id', label: 'Bundle Id', type: 'number'},
];
export const opportunityColumnsSync = [
  {value: 'user_id', label: 'User Id'},
  {value: 'organization', label: 'Organization'},
  {value: 'customer_id', label: 'Customer Id'},
  {value: 'title', label: 'Title'},
  {value: 'amount', label: 'Amount'},
  {value: 'stages', label: 'Stages'},
  {value: 'pdf_url', label: 'PDF Url'},
];
export const customerColumnsSync = [
  {value: 'name', label: 'Name'},
  {value: 'currency', label: 'Currency'},
  {value: 'website', label: 'Website'},
  {value: 'industry', label: 'Industry'},
  {value: 'profile_image', label: 'Profile Image'},
  {value: 'organization', label: 'Organization'},
];

export const ContractStatusOptions = [
  {value: 'green', label: 'Green'},
  {value: 'yellow', label: 'Yellow'},
  {value: 'red', label: 'Red'},
];

export const LogicOptions = [
  {value: 'AND', label: 'AND'},
  {value: 'OR', label: 'OR'},
  {value: 'custom_logic', label: 'Custom Logic'},
];

export const ContractOperatorsOptions = [
  {
    label: 'Equals',
    value: '==',
  },
  {
    label: 'Does not Equals',
    value: '!=',
  },
  {
    label: 'Greater than',
    value: '>',
  },
  {
    label: 'Less than',
    value: '<',
  },
  {
    label: 'Greater than or Equal',
    value: '>=',
  },
  {
    label: 'Less than or Equal',
    value: '<=',
  },
];

export const quoteAndOpportunityLineItemOptions = [
  {value: 'line_number', label: 'Line Number'},
  {value: 'adjusted_price', label: 'Adjustet Price'},
  {value: 'product_code', label: 'Product Code'},
  {value: 'line_amount', label: 'Line Amount'},
  {value: 'list_price', label: 'List Price'},
  {value: 'description', label: 'Description'},
  {value: 'quantity', label: 'Quantity'},
];

export const quoteOptions = [
  {value: 'credit_cards', label: 'Credit Cards'},
  {value: 'customer_address', label: 'Customer Address'},
  {value: 'customer_city', label: 'Customer City'},
  {value: 'customer_contact', label: 'Customer Contact'},
  {value: 'customer_email', label: 'Customer Email'},
  {value: 'customer_name', label: 'Customer Name'},
  {value: 'customer_phone', label: 'Customer Phone'},
  {value: 'customer_state', label: 'Customer State'},
];

export const opportunityOptions = [
  {value: 'title', label: 'Title'},
  {value: 'amount', label: 'Amount'},
  {value: 'stages', label: 'Stages'},
];

export const partnerOptions = [
  {value: 'CISCO', label: 'CISCO'},
  {value: 'DELL', label: 'DELL'},
  {value: 'AMAZON', label: 'AMAZON'},
];

export const CiscoPartnerProgramOptions = [
  {value: 'CISCO HARDWARE', label: 'CISCO HARDWARE'},
  {value: 'CISCO GLASS', label: 'CISCO GLASS'},
];

export const DellPartnerProgramOptions = [
  {value: 'DELL HARDWARE', label: 'DELL HARDWARE'},
  {value: 'DELL GLASS', label: 'DELL GLASS'},
];

export const AmazonPartnerProgramOptions = [
  {value: 'AMAZON HARDWARE', label: 'AMAZON HARDWARE'},
  {value: 'AMAZON GLASS', label: 'AMAZON GLASS'},
];

export const PartnerData = [
  {
    id: 1,
    partner_program: 'Cisco- Hardware',
    generated_date: '12/11/2023',
    opportunity: 'Precision 7920 Rack XCTO Base TAA',
    customer: 'Impres Technologies',
    status: 'In Progress',
  },
  {
    id: 2,
    partner_program: 'Enterprise Switching',
    generated_date: '12/11/2023',
    opportunity: 'Precision 7920 Rack XCTO Base TAA',
    customer: 'Impres Technologies',
    status: 'Drafts',
  },
  {
    id: 3,
    partner_program: 'Cisco Security',
    generated_date: '12/11/2023',
    opportunity: 'Precision 7920 Rack XCTO Base TAA',
    customer: 'Impres Technologies',
    status: 'Drafts',
  },
  {
    id: 4,
    partner_program: 'Cisco Data Centre',
    generated_date: '12/11/2023',
    opportunity: 'Precision 7920 Rack XCTO Base TAA',
    customer: 'Impres Technologies',
    status: 'Completed',
  },
  {
    id: 5,
    partner_program: 'Cisco IoT',
    generated_date: '12/11/2023',
    opportunity: 'Precision 7920 Rack XCTO Base TAA',
    customer: 'Impres Technologies',
    status: 'Completed',
  },
];

export const dealRegStatusOptions = [
  {value: 'In Progress', label: 'In Progress'},
  {value: 'New', label: 'New'},
  {value: 'Submitted', label: 'Submitted'},
  {value: 'Approved', label: 'Approved'},
  {value: 'Rejected', label: 'Rejected'},
  {value: 'Cancelled', label: 'Cancelled'},
  {value: 'Expired', label: 'Expired'},
  {value: 'Closed Lost', label: 'Closed Lost'},
  {value: 'Closed Won', label: 'Closed Won'},
  {value: 'Approved - Ext Submitted', label: 'Approved - Ext Submitted'},
  {value: 'Ext Approved', label: 'Ext Approved'},
  {value: 'Vendor Received - Held', label: 'Vendor Received - Held'},
];

export const industryOptions = [
  {value: 'Information Technology', label: 'Information Technology'},
  {value: 'Design', label: 'Design'},
  {value: 'Technology', label: 'Technology'},
  {value: 'Search Engine', label: 'Search Engine'},
  {value: 'Manufacturing', label: 'Manufacturing'},
];
export function formatStatus(str: string) {
  if (str === 'inprogress') {
    return 'In Progress';
  }
  if (str === 'ro_closed') {
    return 'RO Closed';
  }
  if (str === 'require_customer_authorization') {
    return 'Requires Customer Authorization';
  }
  const frags = str?.toString()?.split('_');
  const fragLength = frags?.length;
  for (let i = 0; i < fragLength; i++) {
    frags[i] = frags[i]?.charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags?.join(' ');
}

export const IssueTypeOption = [
  {
    label: 'Missing Row',
    value: 'Missing Row',
  },
  {
    label: 'Unread Column/Unmatched Column',
    value: 'Unread Column/Unmatched Column',
  },
  {
    label: 'Other Issue',
    value: 'Other Issue',
  },
];
export const AttachmentOptions = [
  {label: 'ALL', value: 'all'},
  {label: 'Statement of Work', value: 'Statement of Work'},
  {label: 'Terms and Conditions', value: 'Terms and Conditions'},
  {label: 'Unison/FedBid Award', value: 'Unison/FedBid Award'},
  {label: 'Other', value: 'Other'},
  {label: 'Vendor Quote', value: 'Vendor Quote'},
  {label: 'Customer Quote', value: 'Customer Quote'},
  {label: 'Pro Forma Quotes', value: 'Pro Forma Quotes'},
  {label: 'Government Award', value: 'Government Award'},
];
export const concernDescription =
  'Your Concern has been raised to our support team. We are sorry for you experience and will try our best to provide you better experience next time.';

export const templateDummyData = [
  {
    id: 1,
    partner: 'Cisco',
    partner_program: 'Cisco Partner Program',
    createdAt: '12/11/2023',
    status: 'In Progress',
    is_active: true,
  },
  {
    id: 2,
    partner: 'Citrix',
    partner_program: 'Citrix Software Program',
    createdAt: '12/11/2023',
    status: 'In Progress',
    is_active: false,
  },
  {
    id: 3,
    partner: 'Google',
    partner_program: 'Google Partner Program',
    createdAt: '12/11/2023',
    status: 'In Progress',
    is_active: true,
  },
  {
    id: 4,
    partner: 'Adobe',
    partner_program: 'Adobe Partner Program',
    createdAt: '12/11/2023',
    status: 'Drafts',
    is_active: false,
  },
];

export const standardAttributesData = [
  {
    id: 1,
    attributes: 'Account Address',
    createdAt: '12/11/2023',
    attribute_label: 'Account Address',
    attribute_data_type: 'Text',
    order: 1,
    standard_attribute_section: 'Opportunity Information',
    is_active: true,
    is_required: false,
    is_view: true,
  },
  {
    id: 2,
    attributes: 'Partner Account',
    createdAt: '12/11/2023',
    attribute_label: 'Partner Account',
    attribute_data_type: 'Text',
    order: 2,
    standard_attribute_section: 'Address Information',
    is_active: false,
    is_required: true,
    is_view: false,
  },
  {
    id: 3,
    attributes: 'Expiration Date',
    createdAt: '12/11/2023',
    attribute_label: 'Expiration Date',
    attribute_data_type: 'Date',
    order: 4,
    standard_attribute_section: 'Opportunity Information',
    is_active: false,
    is_required: true,
    is_view: true,
  },
  {
    id: 4,
    attributes: 'Opportunity Value',
    createdAt: '12/11/2023',
    attribute_label: 'Opportunity Value',
    attribute_data_type: 'Currency',
    order: 2,
    standard_attribute_section: 'Opportunity Information',
    is_active: true,
    is_required: false,
    is_view: true,
  },
  {
    id: 5,
    attributes: 'Probability',
    createdAt: '12/11/2023',
    attribute_label: 'Probability',
    attribute_data_type: 'Drop Down',
    order: 1,
    standard_attribute_section: 'Opportunity Information',
    is_active: false,
    is_required: false,
    is_view: true,
  },
];

export const affectedColumns = [
  {
    label: '#Line',
    value: 'line_number',
  },
  {
    label: 'SKU',
    value: 'product_code',
  },
  {
    label: 'Quantity',
    value: 'quantity',
  },
  {
    label: 'MSRP',
    value: 'list_price',
  },
  {
    label: 'Cost',
    value: 'adjusted_price',
  },
  {
    label: 'Product Description',
    value: 'description',
  },
];

export const attributeFieldDataTypeOptions = [
  {
    label: 'DropDown',
    value: 'dropdown',
  },
  {
    label: 'Text',
    value: 'text',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Contact',
    value: 'contact',
  },
  {
    label: 'Textarea',
    value: 'textarea',
  },
  {
    label: 'Date',
    value: 'date',
  },
  {
    label: 'Time',
    value: 'time',
  },
  {
    label: 'Currency',
    value: 'currency',
  },
  {
    label: 'Table',
    value: 'table',
  },
  {
    label: 'Checkbox',
    value: 'checkbox',
  },
  {
    label: 'Radio',
    value: 'radio',
  },
  {
    label: 'Toggle',
    value: 'toggle',
  },
];

export const attributeFieldMapToOptions = [
  {
    label: 'Account',
    value: 'account',
  },
  {
    label: 'Opportunity',
    value: 'opportunity',
  },
  {
    label: 'Partner Registration',
    value: 'partner_registration',
  },
];

export const dummyValidationData = [
  {
    id: 19306,
    unit_price: 12345,
    contract_price: 23456,
    is_deleted: false,
    customer_id: null,
    user_id: null,
    organization: 'cloudanalogy',
    quote_id: 246,
    product_id: 3331,
    bundle_id: null,
    line_number: '13',
    adjusted_price: '10017',
    product_code: 'PAN-PA-3430-GP',
    line_amount: null,
    list_price: '11130',
    description: 'PAN-PA-3430-GP',
    quantity: '2',
    pdf_url: null,
    eventId: null,
    subscriptionId: null,
    portalId: null,
    occurredAt: null,
    subscriptionType: null,
    attemptNumber: null,
    objectId: null,
    changeSource: null,
    changeFlag: null,
    appId: null,
    quote_file_id: 258,
    createdAt: '2024-05-29T10:07:29.407Z',
    updatedAt: '2024-05-29T10:09:33.727Z',
    quote_config_id: null,
  },
  {
    id: 19285,
    unit_price: 64534,
    contract_price: 23561,
    is_deleted: false,
    customer_id: null,
    user_id: null,
    organization: 'cloudanalogy',
    quote_id: 246,
    product_id: 3310,
    bundle_id: null,
    line_number: '02',
    adjusted_price: null,
    product_code: 'SSP-PS400-250-CHAS-5-004-',
    line_amount: '1,190.00',
    list_price: '1,190.00',
    description:
      'Standard Service Plan includes Toll-Free 7 X 24 Technical\nphone support, Hardware/Firmware Maintenance, E-mail\nSupport 1 Year',
    quantity: '1',
    pdf_url: null,
    eventId: null,
    subscriptionId: null,
    portalId: null,
    occurredAt: null,
    subscriptionType: null,
    attemptNumber: null,
    objectId: null,
    changeSource: null,
    changeFlag: null,
    appId: null,
    quote_file_id: 257,
    createdAt: '2024-05-29T10:07:29.407Z',
    updatedAt: '2024-05-29T10:07:29.407Z',
    quote_config_id: null,
  },
  {
    id: 19286,
    unit_price: 98765,
    contract_price: 34567,
    is_deleted: false,
    customer_id: null,
    user_id: null,
    organization: 'cloudanalogy',
    quote_id: 246,
    product_id: 3311,
    bundle_id: null,
    line_number: '03',
    adjusted_price: null,
    product_code: 'PS444-02-NA',
    line_amount: '11,106.00',
    list_price: '11,106.00',
    description:
      'PacStar Small Form Factor GIG-E Switch Module, Built\nwith Cisco Switch technology. Network Advantage\npackage. Provides 8 X 1G ports (4 of which are PoE+)\nand 2 X 10G SFP Ports (SFP not included). Includes\nAC/DC brick.',
    quantity: '1',
    pdf_url: null,
    eventId: null,
    subscriptionId: null,
    portalId: null,
    occurredAt: null,
    subscriptionType: null,
    attemptNumber: null,
    objectId: null,
    changeSource: null,
    changeFlag: null,
    appId: null,
    quote_file_id: 257,
    createdAt: '2024-05-29T10:07:29.407Z',
    updatedAt: '2024-05-29T10:07:29.407Z',
    quote_config_id: null,
  },
];
