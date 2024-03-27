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

export const pricingMethod = [
  {value: 'cost_percentage', label: 'Cost + %'},
  {value: 'cost_dollar', label: 'Cost + $'},
  {value: 'list_percentage', label: 'List - %'},
  {value: 'list_dollar', label: 'List - $'},
  {value: 'manual', label: 'Manual'},
  {value: 'gp', label: 'GP'},
];

export const quoteDummyData = [
  {
    id: 7,
    is_deleted: false,
    quote_id: 2,
    product_id: 1,
    bundle_id: null,
    line_number: '1',
    adjusted_price: '$21,114.59',
    product_code: '422-BRSI',
    line_amount: '$42,229.18',
    list_price: '$31,302.32',
    description:
      'PowerTower PT549 Server\nDell Federal Systems L.P. c/o Dell USA L.P.\n422-BRSR',
    quantity: '2',
    createdAt: '2023-12-14T17:32:49.051Z',
    updatedAt: '2023-12-14T17:32:49.051Z',
    Bundle: null,
    status: 'Reject',
    name: 'IT Tech sample quote',
    opportunity: 'Precision 7920 Rack XC...',
    customer_name: 'Impres Technologies',
  },
  {
    id: 8,
    is_deleted: false,
    quote_id: 2,
    product_id: 2,
    bundle_id: null,
    line_number: '2',
    adjusted_price: '$0.00',
    product_code: '796-5228',
    line_amount: '$0.00',
    list_price: '$0.00',
    description:
      'Dell Hardware Limited Warranty Plus On-Site\nService\nDell Federal Systems L.P. c/o Dell USA L.P. -\n796-5225',
    quantity: '2',
    createdAt: '2023-12-14T17:32:49.051Z',
    updatedAt: '2023-12-14T17:32:49.051Z',
    Bundle: null,
    status: 'Drafts',
    name: 'IT Tech sample quote',
    opportunity: 'Precision 7920 Rack XC...',
    customer_name: 'Impres Technologies',
  },
  {
    id: 9,
    is_deleted: false,
    quote_id: 2,
    product_id: 3,
    bundle_id: null,
    line_number: '3',
    adjusted_price: '$0.00',
    product_code: '796-6299',
    line_amount: '$0.00',
    list_price: '$0.00',
    description:
      'ProSupport: Next Business Day On-Site Service\nAfter Problem Diagnosis, 3 Years\nDell Federal Systems L.P. c/o Dell USA L.P.\n796-6291',
    quantity: '2',
    createdAt: '2023-12-14T17:32:49.051Z',
    updatedAt: '2023-12-14T17:32:49.051Z',
    Bundle: null,
    status: 'Completed',
    name: 'IT Tech sample quote',
    opportunity: 'Precision 7920 Rack XC...',
    customer_name: 'Impres Technologies',
  },
];

export const StageValue = [
  {value: 'Commit', label: 'Commit'},
  {value: 'Develop', label: 'Develop'},
  {value: 'Negotiate', label: 'Negotiate'},
  {value: 'Qualify', label: 'Qualify'},
  {value: 'Prove', label: 'Prove'},
];

export const dummyData = [
  {
    id: 1,
    opportunity: 'Precision 7920 Rack XC...',
    customer_name: 'Impres Technologies',
  },
  {
    id: 2,
    opportunity: 'Precision 7920 Rack XC...',
    customer_name: 'Impres Technologies',
  },
  {
    id: 3,
    opportunity: 'Precision 7920 Rack XC...',
    customer_name: 'Impres Technologies',
  },
  {
    id: 4,
    opportunity: 'Precision 7920 Rack XC...',
    customer_name: 'Impres Technologies',
  },
  {
    id: 5,
    opportunity: 'Precision 7920 Rack XC...',
    customer_name: 'Impres Technologies',
  },
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
  {value: 'line_number', label: 'Line Number'},
  {value: 'product_code', label: 'Product Code'},
  {value: 'quantity', label: 'Quantity'},
  {value: 'list_price', label: 'List Price'},
  {value: 'adjusted_price', label: 'Adjusted Price'},
  {value: 'description', label: 'Description'},
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
    label: 'Qty',
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

//  const data = [
//   {
//     id: 36,
//     user_id: 28,
//     opportunity_id: 19,
//     customer_id: 21,
//     approver_id: null,
//     manually_updated: false,
//     concern: null,
//     is_deleted: false,
//     organization: 'rainmakercloud',
//     cage_code: null,
//     credit_cards: null,
//     customer_address: null,
//     customer_city: null,
//     customer_contact: null,
//     customer_email: null,
//     customer_name: null,
//     customer_phone: null,
//     customer_state: null,
//     customer_street: null,
//     customer_zip: null,
//     deal_id: null,
//     distributor_address: null,
//     distributor_city: null,
//     distributor_contact: null,
//     distributor_email: null,
//     distributor_fax: null,
//     distributor_name: null,
//     distributor_phone: null,
//     distributor_state: null,
//     distributor_street: null,
//     distributor_zip: null,
//     duns_number: null,
//     expiration_date: null,
//     fob_shipping: null,
//     ftin: null,
//     oem_name: 'ROLLER TECHNOLOGY CORPORATION-8',
//     payment_terms: null,
//     quote_amount: '$42,229.18',
//     quote_date: '4/5/2025',
//     quote_number: '2323435',
//     remit_to: null,
//     reseller_address: null,
//     reseller_city: null,
//     reseller_contact: null,
//     reseller_email: null,
//     reseller_name: null,
//     reseller_phone: null,
//     reseller_state: null,
//     reseller_street: null,
//     reseller_zip: null,
//     shipping: null,
//     shipping_amount: null,
//     subtotal: null,
//     uei: null,
//     is_completed: false,
//     is_drafted: false,
//     require_approval: false,
//     approved_request: false,
//     rejected_request: false,
//     file_name: 'Test1.pdf',
//     opportunity: null,
//     createdAt: '2024-03-27T05:05:17.248Z',
//     updatedAt: '2024-03-27T05:05:17.248Z',
//     QuoteFiles: [
//       {
//         id: 8,
//         is_deleted: false,
//         pdf_url:
//           'https://reselller-os.s3.amazonaws.com/1711515885522profile_image.pdf',
//         file_name: 'Test1.pdf',
//         is_verified: true,
//         quote_config_id: 19,
//         quote_id: 36,
//         issue_type: null,
//         affected_columns: null,
//         nanonets_id: '92be9561-ebf7-11ee-a682-9a76ee528011',
//         quote_json: [
//           '[{"line_number":"1","product_code":"422-BRSI","description":"PowerTower PT549 Server\\nDell Federal Systems L.P. c/o Dell USA L.P.\\n422-BRSR","list_price":"$31,302.32","quantity":"2","line_amount":"$42,229.18"},{"line_number":"2","product_code":"796-5228","description":"Dell Hardware Limited Warranty Plus On-Site\\nService\\nDell Federal Systems L.P. c/o Dell USA L.P. -\\n796-5225","list_price":"$0.00","quantity":"2","line_amount":"$0.00"},{"line_number":"3","product_code":"796-6299","description":"ProSupport: Next Business Day On-Site Service\\nAfter Problem Diagnosis, 3 Years\\nDell Federal Systems L.P. c/o Dell USA L.P.\\n796-6291","list_price":"$0.00","quantity":"2","line_amount":"$0.00"}]',
//         ],
//         createdAt: '2024-03-27T05:05:17.854Z',
//         updatedAt: '2024-03-27T05:05:17.854Z',
//       },
//     ],
//   },
//   {
//     id: 37,
//     user_id: 28,
//     opportunity_id: 48,
//     customer_id: 28,
//     approver_id: null,
//     manually_updated: false,
//     concern: null,
//     is_deleted: false,
//     organization: 'rainmakercloud',
//     cage_code: null,
//     credit_cards: null,
//     customer_address: null,
//     customer_city: null,
//     customer_contact: null,
//     customer_email: null,
//     customer_name: null,
//     customer_phone: null,
//     customer_state: null,
//     customer_street: null,
//     customer_zip: null,
//     deal_id: null,
//     distributor_address: null,
//     distributor_city: null,
//     distributor_contact: null,
//     distributor_email: null,
//     distributor_fax: null,
//     distributor_name: 'R',
//     distributor_phone: null,
//     distributor_state: null,
//     distributor_street: null,
//     distributor_zip: null,
//     duns_number: null,
//     expiration_date: null,
//     fob_shipping: null,
//     ftin: null,
//     oem_name: null,
//     payment_terms: null,
//     quote_amount: null,
//     quote_date: null,
//     quote_number: null,
//     remit_to: null,
//     reseller_address: null,
//     reseller_city: null,
//     reseller_contact: null,
//     reseller_email: null,
//     reseller_name: null,
//     reseller_phone: null,
//     reseller_state: null,
//     reseller_street: null,
//     reseller_zip: null,
//     shipping: null,
//     shipping_amount: null,
//     subtotal: null,
//     uei: null,
//     is_completed: false,
//     is_drafted: false,
//     require_approval: false,
//     approved_request: false,
//     rejected_request: false,
//     file_name: 'SEWP RFQ 266437 - OP418361-1 SOW-Quote - FINAL.pdf',
//     opportunity: null,
//     createdAt: '2024-03-27T05:19:18.461Z',
//     updatedAt: '2024-03-27T05:19:18.461Z',
//     QuoteFiles: [
//       {
//         id: 9,
//         is_deleted: false,
//         pdf_url:
//           'https://reselller-os.s3.amazonaws.com/1711516700522profile_image.pdf',
//         file_name: 'SEWP RFQ 266437 - OP418361-1 SOW-Quote - FINAL.pdf',
//         is_verified: false,
//         quote_config_id: 12,
//         quote_id: 37,
//         issue_type: 'Unread Column/Unmatched Column',
//         affected_columns: ['adjusted_price'],
//         nanonets_id: '81961021-ebf9-11ee-b3a2-7addbc8b9be2',
//         quote_json: [
//           '[{"description":"Due to global semiconductor chip shortages, Seller is experiencing longer than normal lead times on equipment. As a result, Seller cannot\\nguarantee lead times on equipment and will not be liable for any delays in equipment delivery to the extent caused by such shortages. However,\\nSeller is working with its global suppliers on a daily basis to understand the impact of this chip shortage on delivery timelines and will use\\nreasonable efforts to keep Buyer apprised of anticipated delivery timelines and delays. Should Buyer elect to purchase equipment immediately\\nupon placement of order to mitigate delays, Seller will immediately bill Buyer upon placement of such order and Buyer shall pay for such\\nequipment within the payment terms (e.g. net 30) specified herein, regardless of any other agreed upon billing terms or billing terms specified\\nherein. AVI-SPL will store such equipment in its warehouse until delivery to Buyer. Warranty on such equipment shall commence upon delivery\\nof the equipment to AVI-SPL\'s warehouse, notwithstanding any other agreed upon warranty terms or warranty terms specified herein.","line_amount":"$24,916.27","adjusted_price":"$499,598.13","product_code":"BAR14647","quantity":"1","list_price":"$24,916.27"},{"description":"All conduits, high voltage wiring panels, breakers, relays, boxes, receptacles, etc. Any related electrical\\nwork including, but not limited to, 110VAC, conduit, core drilling, raceway, and boxes.","line_amount":"$24,916.27","product_code":"BAR14647","quantity":"1","list_price":"$24,916.27"},{"description":"Voice/data cabling, IE analogue phone lines, ISDN lines, network ports, etc.\\nNetwork connectivity, routing, switching, and port configuration necessary to support audiovisual\\nequipment.","line_amount":"$25,599.88","product_code":"BAR14646","quantity":"1","list_price":"$25,599.88"},{"description":"Concrete saw cutting and/or core drilling.","line_amount":"$9,932.27","product_code":"BAR14647","quantity":"1","list_price":"$9,932.27"},{"description":"Fire wall, ceiling, roof and floor penetration, patching, removal, or fire stopping.","line_amount":"$17,333.33","product_code":"BAR10050","quantity":"1","list_price":"$17,333.33"},{"description":"Necessary sheet rock replacement, ceiling tile, T-bar replacement, and/or wall/ceiling repair.","line_amount":"$82.62","product_code":"BARR9838141","quantity":"2","list_price":"$41.31"},{"product_code":"BARR9821099","description":"Any and all millwork (moldings, trim, etc.). All millwork or modifications to project millwork/furniture\\nto accommodate the AV equipment is to be provided by others.","quantity":"1","list_price":"$123.92","line_amount":"$123.92"},{"product_code":"GFE","description":"Painting, patching, or finishing, of architectural surfaces.","quantity":"1","list_price":"OFE","line_amount":"OFE"},{"product_code":"BARR9832699","description":"Permits (unless specifically provided for elsewhere in this proposal document or scope of work statement).","quantity":"2","list_price":"$817.87","line_amount":"$1,635.74"},{"product_code":"BARR9832698","description":"Engineered (P.E.) seals and/or stamped structural/system details.","quantity":"2","list_price":"$965.74","line_amount":"$1,931.48"},{"product_code":"BARR9832702","description":"HVAC and plumbing relocation.","quantity":"16","list_price":"$161.10","line_amount":"$2,577.60"},{"product_code":"BARR9832703","description":"Rough-in, bracing, framing. or finish trim carpentry for installation.","quantity":"1","list_price":"$1,592.77","line_amount":"$1,592.77"},{"product_code":"BARR9832711","description":"Cutting, structural welding, or reinforcement of structural steel members required for support of","quantity":"1","list_price":"$5,591.21","line_amount":"$5,591.21"},{"product_code":"BARR9832708","description":"assemblies, if required.","quantity":"2","list_price":"$2,437.07","line_amount":"$4,874.14"},{"product_code":"BARR9832699","description":"Owner furnished equipment or equipment furnished by others that is integrated into the systems","quantity":"1","list_price":"$805.78","line_amount":"$805.78"},{"description":"(as described above) is assumed to be current, industry acceptable, and in good working order. If it is"},{"description":"determined that this equipment is faulty upon installation, additional project charges may be incurred."},{"description":"Additional or specific manufacturer\'s \\"User Adoption\\" training."},{"description":"Additional costs for union labor."}]',
//         ],
//         createdAt: '2024-03-27T05:19:19.178Z',
//         updatedAt: '2024-03-27T05:21:31.415Z',
//       },
//     ],
//   },
// ];
