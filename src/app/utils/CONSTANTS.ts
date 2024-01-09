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
  {value: 'Negotiate', label: 'Negotiate'},
  {value: 'Develop', label: 'Develop'},
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
