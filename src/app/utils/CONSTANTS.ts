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

export const changeTheALpabetsFromFormula = (formula: any) => {
  function extractColumnLetters(formula: any) {
    // Regex to match cell references and capture the column part
    const cellRefRegex = /\b([A-Z]+)(\d+)\b/g;
    const columnLetters = new Set(); // Use a Set to avoid duplicates
    let match;

    // Find all matches and extract column letters
    while ((match = cellRefRegex.exec(formula)) !== null) {
      columnLetters.add(match[1]);
    }

    // Convert Set to Array and sort
    return Array.from(columnLetters).sort();
  }

  // Function to replace old column letters with a new column letter
  function replaceColumnLetters(
    formula: any,
    oldColumnLetters: any,
    newColumnLetter: any,
  ) {
    oldColumnLetters.forEach((oldCol: any) => {
      // Regex to match the old column letter and capture the row number
      const columnRegex = new RegExp(`\\b${oldCol}(\\d+)\\b`, 'g');
      // Replace all occurrences of the old column letter with the new column letter
      formula = formula.replace(columnRegex, `${newColumnLetter}$1`);
    });

    return formula;
  }

  // Example usage
  const newColumnLetter = 'N';

  // Extract old column letters from the formula
  const oldColumnLetters = extractColumnLetters(formula);

  // Replace old column letters with the new column letter
  const updatedFormula = replaceColumnLetters(
    formula,
    oldColumnLetters,
    newColumnLetter,
  );

  return updatedFormula;
};
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
export const QuoteMappingRejectOption = [
  {
    value: 'This is not suitable as per PDF Header',
    label: 'This is not suitable as per PDF Header',
  },
  {value: 'Other', label: 'Other'},
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

export const SaleForceQuoteLineItemColumnSync = [
  {label: 'Line Number', value: 'line_number'},
  {label: 'MPN', value: 'mpn'},
  {label: 'Description', value: 'description'},
  {label: 'Product Code', value: 'product_code'},
  {label: 'Display Mpn', value: 'display_mpn'},
  {label: 'Product Type', value: 'product_type'},
  {label: 'SS Part', value: 'ss_part'},
  {label: 'Notes', value: 'notes'},
  {label: 'Quantity', value: 'quantity'},
  {label: 'Line Amount', value: 'line_amount'},
  {label: 'Adjusted Price', value: 'adjusted_price'},
  {label: 'List Price', value: 'list_price'},
  {label: 'Gsa Price', value: 'gsa_price'},
  {label: 'Line Type', value: 'line_type'},
  {label: 'Open Market', value: 'open_market'},
  {label: 'Input', value: 'input'},
  {label: 'Taa Flag', value: 'taa_flag'},
  {label: 'Epeat Flag', value: 'epeat_flag'},
  {label: 'Energy Star Flag', value: 'energy_star_flag'},
  {label: 'Bundle Name', value: 'bundle_name'},
];

export const quoteColumns = [
  {value: 'quote_id', label: 'Quote Id'},
  {value: 'cage_code', label: 'Stages'},
  {value: 'createdAt', label: 'Created At'},
  {value: 'customer_address', label: 'Customer Address'},
  {value: 'quote_notes', label: 'Quote Notes'},
  {value: 'quote_tax', label: 'Quote Tax'},
  {value: 'quote_shipping', label: 'Quote Shipping'},
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
  {value: 'quoute_line_item_id', label: 'Quote Line Item Id', type: 'number'},
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
  {value: 'opportunity_id', label: 'Opportunity Id'},
  {value: 'user_id', label: 'User Id'},
  {value: 'organization', label: 'Organization'},
  {value: 'customer_id', label: 'Customer Id'},
  {value: 'title', label: 'Title'},
  {value: 'amount', label: 'Amount'},
  {value: 'stages', label: 'Stages'},
  {value: 'pdf_url', label: 'PDF Url'},
];
export const customerColumnsSync = [
  {value: 'customer_id', label: 'Customer Id'},
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
  {value: 'adjusted_price', label: 'Adjusted Price'},
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
  {value: 'New', label: 'New'},
  {value: 'In Progress', label: 'In Progress'},
  // {value: 'Submitted', label: 'Submitted'},
  {value: 'Rejected', label: 'Rejected'},
  {value: 'Expired', label: 'Expired'},
  {value: 'Approved', label: 'Approved'},
  // {value: 'Cancelled', label: 'Cancelled'},
  // {value: 'Closed Lost', label: 'Closed Lost'},
  // {value: 'Closed Won', label: 'Closed Won'},
  // {value: 'Approved - Ext Submitted', label: 'Approved - Ext Submitted'},
  // {value: 'Ext Approved', label: 'Ext Approved'},
  // {value: 'Vendor Received - Held', label: 'Vendor Received - Held'},
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
    value: 'Customer',
  },
  {
    label: 'Opportunity',
    value: 'Opportunity',
  },
  {
    label: 'Partner',
    value: 'Partner',
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

export const AccountOptions = [
  {
    label: 'Customer Name',
    value: 'name',
  },
  {
    label: 'Currency',
    value: 'currency',
  },
  {
    label: 'Industry',
    value: 'industry',
  },
  {
    label: 'Website',
    value: 'website',
  },
];

export const OpportunityOptions = [
  {
    label: 'Opportunity',
    value: 'title',
  },
  {
    label: 'Amount',
    value: 'amount',
  },
  {
    label: 'Stage',
    value: 'stages',
  },
];

export const PartnerOptions = [
  {
    label: 'Partner Name',
    value: 'partner',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Website',
    value: 'website',
  },
  {
    label: 'Industry',
    value: 'industry',
  },
];

export const dealregData = {
  id: 66,
  opportunity_id: 28,
  is_deleted: false,
  partner_id: 108,
  partner_program_id: 101,
  status: "In Progress",
  unique_form_data: [
    '{"u_company_name166_required":"ASUS","u_country266_required":"United States","u_street_address366":"1301, California","u_city466_required":"New York","u_state566_required":"New York","u_zip/postal_code666_required":"13013","u_total_number_of_employees766_required":"2","u_company_type866":"Private Sector","u_first_name1166_required":"Demo","u_last_name1266_required":"Last name","u_email1466_required":"user@gmail.com","u_phone1566_required":"3123213233","u_date1766":null,"u_checkbox966":"on","u_1666":"on","u_date1766_required":"2024-10-23T18:30:00.000Z"}',
  ],
  common_form_data: [
    '{"c_description066_required":"Paul Opportunity","c_email166_required":"partner@gmail.com","c_deal_no066_required":"53253456"}',
  ],
  type: 'registered',
  PartnerProgram: {
    id: 101,
    is_deleted: false,
    user_id: 1,
    organization: 'rainmakercloud',
    status: null,
    partner: 108,
    partner_program: 'partner_community',
    email: null,
    website: null,
    description: 'It is for hardware resources.',
    form_data: [
      [
        '[{"section":"Section1","content":[{"name":"Text Content","sectionTitle":"Partner Community","Alignemnt":"center","FontSize":"h2"},{"name":"Text","label":"Company Name","type":"text","required":true,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Multi-Select","label":"Country","type":"tag","user_fill":false,"required":true,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue","options":["United States","India"]},{"name":"Text","label":"Street Address","type":"text","required":false,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Text","label":"City","type":"text","required":true,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Multi-Select","label":"State","type":"tag","user_fill":false,"required":true,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue","options":["New York","Punjab"]},{"name":"Text","label":"ZIP/Postal Code","type":"number","required":true,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Text","label":"Total Number of Employees","type":"number","required":true,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Radio Button","label":"Company Type","type":"multiple","required":false,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"Hint Value","labelOptions":["Private Sector","Public Sector","Nonprofit and Nonprofit Higher Education"]},{"name":"Checkbox","placeholdertext":"placeholder text","labelOptions":["This prospect company is government owned/controlled, employs a government official or close family members of government officials."],"user_fill":false,"type":"multiple","columnRequired":1,"required":false,"requiredLabel":true,"filedType":"Checkbox","label":"Checkbox"},{"name":"Line Break"},{"name":"Text","label":"First Name","type":"text","required":true,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Text","label":"Last Name","type":"text","required":true,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Text","label":"Title","type":"text","required":false,"user_fill":true,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Text","label":"Email","type":"email","required":true,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Text","label":"Phone","type":"number","required":true,"user_fill":false,"requiredLabel":true,"hintext":false,"hintTextValue":"hint Vlaue"},{"name":"Checkbox","placeholdertext":"placeholder text","labelOptions":["Validation of Customer Consent"],"user_fill":false,"type":"multiple","columnRequired":1,"required":false,"requiredLabel":true,"filedType":"Checkbox","label":""},{"name":"Date","label":"Date","user_fill":false,"type":"Date","required":true,"requiredLabel":true,"hintext":false,"hintTextValue":"","dateformat":"mm/dd/yyyy","weekStartOn":"sunday","StartDate":"","enddate":""}]}]',
      ],
    ],
    form_data_active: false,
    admin_approved: true,
    admin_request: true,
    script: [
      "\"await page.goto('https://partners.salesforce.com/pdx/s/login/?language=en_US');\\n  await page.locator('c-pc-login-tbid').getByRole('button', { name: 'Log in' }).click();\\n  await page.getByRole('button', { name: 'Continue with Salesforce' }).click();\\n  await page.getByLabel('Username').press('ControlOrMeta+f');\\n  await page.getByLabel('Username').click();\\n  await page.getByLabel('Username').fill('rjaiswal@rainmakercloud.com');\\n  await page.getByLabel('Password').click();\\n  await page.getByLabel('Password').fill('sfdc54321_1');\\n  await page.getByRole('button', { name: 'Log In' }).click();\\n  await page.getByLabel('Verification Code').click();\\n  await page.getByLabel('Verification Code').fill('082500');\\n  await page.getByLabel('Verification Code').press('Enter');\\n  await page.goto('https://partners.salesforce.com/pdx/services/authcallback/tbidCommunityLogin?code=hitMAQ-MuajMU7MJ4n3at3inrBpzKwX7GDm3QkVnyrE&state=CAAAAZItSGkbMDAwMDAwMDAwMDAwMDAwAAAA_A7e4ysFUm2gPsFcJziGjNALQKkQ-J-R8jyHgFpHYGHywilplWePcIsssFCq0gFfAVm2LTwiLM_CRHdEQbQmqZWEQ5VlU7Smi7IHbXW4nUhHawEfvvGD55boUfWi6x7V91Nglzd05e2qHYIWHXhx3AV9GOu__YDrAQUCsMQ_xLaas2_NYv-w9Gb4ZrAX7FDIPhdbrVfvH5G9cHRqLfYuIOjKz2yqSNVgOapXJ0Mj0elXr_9J710_QqgFD4bIV-gL9jZu4j7SnFaPwRfo7IRTTRMDdlm91CnMJYGEYCnZptu1hJTcyGTS-8I6YF2eSuM-d0nVxcDgS5ANgqrvfGdx58A%3D');\\n  await page.goto('https://partners.salesforce.com/pdx/secur/frontdoor.jsp?sid=00D300000000iTz%21AQ4AQObWTCWVox2UL0UswNPYRIXkWstfUb8buYwLXql0v7nnyWSkIB.an83rsv76j8oiJ3nmcKJeGXph0dGxwCoV9W3b_m96&retURL=%2Fpdx%2Fs%2Fuser-setup%3Fgt%3Dhttps%3A%2F%2Fpartners.salesforce.com&apv=1&allp=1&untethered=&cshc=V00000Gfm8900000000iTz&refURL=https%3A%2F%2Fpartners.salesforce.com%2Fpdx%2Fsecur%2Ffrontdoor.jsp&fromSsoFlow=1');\\nawait page.goto('https://partners.salesforce.com/pdx/s/user-setup?gt=https%3A%2F%2Fpartners.salesforce.com');\\n  await page.goto('https://partners.salesforce.com/');\\n  await page.goto('https://partners.salesforce.com/pdx/s/?redirected=RGSUDODQUL');\\n  await page.getByRole('menuitem', { name: 'Manage Submenu' }).click();\\n  await page.getByRole('menuitem', { name: 'Leads/Deals' }).click();\\n  await page.getByRole('button', { name: 'New Lead/Deal' }).click();\\n  await page.getByRole('button', { name: 'Next' }).click();\\n  await page.locator('#input-185').fill('ASUS');\\n  await page.locator('#select-188').selectOption('Country_Choices.GB');\\n  await page.locator('#input-193').click();\\n  await page.locator('#input-193').fill('1301, California');\\n  await page.locator('#input-198').click();\\n  await page.locator('#input-198').fill('New York');\\n  await page.locator('#input-239').click();\\n  await page.locator('#input-239').fill('State');\\n  await page.locator('#input-244').click();\\n  await page.locator('#input-244').fill('12343');\\n  await page.locator('#RADIO-LABEL-0-207 span').first().click();\\n  await page.locator('#input-220').click();\\n  await page.locator('#input-220').fill('2');\\n  await page.locator('lightning-primitive-input-checkbox span').nth(1).click();\\n  await page.getByRole('button', { name: 'Next' }).click();\\n  await page.locator('#input-292').fill('User');\\n  await page.locator('#input-297').click();\\n  await page.locator('#input-297').fill('lastname');\\n  await page.locator('#input-302').click();\\n  await page.locator('#input-302').fill('Devops');\\n  await page.locator('flowruntime-input-wrapper2').filter({ hasText: 'Validation of Customer Consent' }).locator('span').nth(1).click();\\n  await page.locator('#input-307').click();\\n  await page.locator('#input-307').fill('user@gmail.com');\\n  await page.locator('#input-312').click();\\n  await page.locator('#input-312').fill('1232123456');\\n  await page.locator('flowruntime-input-wrapper2').filter({ hasText: 'Contact me before' }).locator('span').nth(1).click();\\n  await page.getByRole('button', { name: 'Next' }).click();\\n  await page.getByPlaceholder('you@example.com').click({\\n    clickCount: 3\\n  });\\n  await page.getByPlaceholder('you@example.com').fill('rj@gmail.com');\\n  await page.getByLabel('Phone').click();\\n  await page.getByLabel('Phone').fill('2345676543');\\n  await page.getByRole('button', { name: 'Next' }).click();\\n  await page.getByRole('button', { name: 'Next' }).click();\\n  await page.locator('#select-409').selectOption('Product_Interest_Choices.Artificial Intelligence');\\n  await page.locator('#CHECKBOX-LABEL-0-410 span').first().click();\\n  await page.locator('#input-441').click();\\n  await page.locator('#input-441').fill('Demo');\\n  await page.locator('#input-449').click();\\n  await page.locator('#input-449').fill('Demo');\\n  await page.locator('#input-453').click();\\n  await page.locator('#input-453').fill('Demo');\\n  await page.locator('#input-458').click();\\n  await page.locator('#input-458').fill('Demo');\\n  await page.locator('#input-467').click();\\n  await page.locator('#input-467').fill('Test');\\n  await page.locator('lightning-primitive-input-checkbox span').nth(1).click();\\n\\n  await page.pause();\"",
    ],
    login_step: true,
    login_template: null,
    createdAt: '2024-08-21T11:01:51.850Z',
    updatedAt: '2024-10-07T11:35:12.055Z',
    PartnerPassword: {
      id: 10,
      is_deleted: false,
      created_by: 67,
      partner_id: 108,
      partner_program_id: 101,
      organization: 'cloudanalogy',
      username: 'rjaiswal@rainmakercloud.com',
      email: 'rjaiswal',
      password: 'htPbqLpi+Zzl1pJh:/ouhudntYdjjUgrqnUC34Pt8Mpa37TSaPjbJ',
      shared_password: false,
      createdAt: '2024-08-21T11:36:40.316Z',
      updatedAt: '2024-09-25T14:19:25.569Z',
    },
  },
  Partner: {
    id: 108,
    is_deleted: false,
    user_id: 1,
    organization: 'rainmakercloud',
    status: null,
    partner: 'partner',
    email: 'partner@gmail.com',
    industry: 'Information Technology',
    is_active: false,
    website: 'www.partner.com',
    form_data: null,
    admin_approved: true,
    admin_request: true,
    createdAt: '2024-08-21T11:00:55.497Z',
    updatedAt: '2024-09-23T10:42:45.848Z',
  },
};
