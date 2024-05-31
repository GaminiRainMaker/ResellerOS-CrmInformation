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
  {value: 'Drafts', label: 'Drafts'},
  {value: 'In Progress', label: 'In Progress'},
  {value: 'In Review', label: 'In Review'},
  {value: 'Approved', label: 'Approved'},
  {value: 'Rejected', label: 'Rejected'},
  {value: 'Needs Review', label: 'Needs Review'},
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
  {value: 'Commit', label: 'Commit'},
  {value: 'Develop', label: 'Develop'},
  {value: 'Negotiate', label: 'Negotiate'},
  {value: 'Qualify', label: 'Qualify'},
  {value: 'Prove', label: 'Prove'},
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
  {value: 'line_number', label: 'Distributor City'},
  {value: 'adjusted_price', label: 'Distributor Email'},
  {value: 'product_code', label: 'Distributor Name'},
  {value: 'line_amount', label: 'Fob Shipping'},
  {value: 'list_price', label: 'Ftin'},
  {value: 'description', label: 'Oem Name'},
  {value: 'quantity', label: 'Reseller Email'},
  {value: 'pdf_url', label: 'Reseller Name'},
  {value: 'eventId', label: 'Reseller State'},
  {value: 'portalId', label: 'Reseller Street'},
  {value: 'occurredAt', label: 'Shipping'},
  {value: 'subscriptionType', label: 'Subtotal'},
  {value: 'attemptNumber', label: 'UEI'},
  {value: 'objectId', label: 'File Name'},
  {value: 'changeSource', label: 'Opportunity'},
  {value: 'changeFlag', label: 'PDF'},
  {value: 'appId', label: 'PDF'},
  {value: 'quote_file_id', label: 'PDF'},
  {value: 'customer_id', label: 'Stages'},
  {value: 'user_id', label: 'Customer Address'},
  {value: 'organization', label: 'Customer City'},
  {value: 'quote_id', label: 'Customer Email'},
  {value: 'product_id', label: 'Customer Name'},
  {value: 'bundle_id', label: 'Distributor Address'},
];
export const opportunityColumnsSync = [
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
export const customerColumnsSync = [
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

export const ContractStatusOptions = [
  {value: 'red', label: 'Red'},
  {value: 'green', label: 'Green'},
  {value: 'yellow', label: 'Yellow'},
];

export const LogicOptions = [
  {value: 'AND', label: 'AND'},
  {value: 'OR', label: 'OR'},
  {value: 'custom_logic', label: 'Custom Logic'},
];

export const OperatorsOptions = [
  {value: '=', label: '='},
  {value: '!=', label: '!='},
  {value: '<', label: '<'},
  {value: '>', label: '>'},
  {value: '<=', label: '<='},
  {value: '=>', label: '=>'},
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
