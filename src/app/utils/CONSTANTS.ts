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
  {label: 'Description', value: 'description'},
  {label: 'Product Code', value: 'product_code'},
  {label: 'Quantity', value: 'quantity'},
  {label: 'Line Amount', value: 'line_amount'},
  {label: 'Adjusted Price', value: 'adjusted_price'},
  {label: 'List Price', value: 'list_price'},
  {label: 'Line Number', value: 'line_number'},
  {label: 'Start Date', value: 'start_date'},
  {label: 'End Date', value: 'end_date'},
  {label: 'Serial Number', value: 'serial_number'},
  {label: 'Oem Name', value: 'oem_name'},
  {label: 'Availability', value: 'availability'},
  {label: 'Service Duration', value: 'service_duration'},
  {label: 'TD#', value: 'td#'},
  {label: 'Distributor Name', value: 'distributor_name'},
  {label: 'Line Type', value: 'line_type'},
  {label: 'Open Market', value: 'open_market'},
  {label: 'Model Id', value: 'model_id'},
  {label: 'Input', value: 'input'},
  {label: 'Gsa Price', value: 'gsa_price'},
  {label: 'MPN', value: 'mpn'},
  {label: 'Display Mpn', value: 'display_mpn'},
  {label: 'Taa Flag', value: 'taa_flag'},
  {label: 'Product Type', value: 'product_type'},
  {label: 'Epeat Flag', value: 'epeat_flag'},
  {label: 'Energy Star Flag', value: 'energy_star_flag'},
  {label: 'SS Part', value: 'ss_part'},
  {label: 'Notes', value: 'notes'},
  {label: 'Bundle Name', value: 'bundle_name'},
];

export const quoteColumns = [
  {value: 'quote_id', label: 'Quote Id'},
  {value: 'cage_code', label: 'Stages'},
  {value: 'createdAt', label: 'Created At'},
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
export const SaleForArray = [
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn5GOAS',
    },
    Id: '0QLHn000008Tn5GOAS',
    rosquoteai__Bundle_Name__c: 'Cables',
    rosquoteai__Quote_Line_Items__r: {
      totalSize: 7,
      done: true,
      records: [
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4NOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4NOAS',
          rosquoteai__LineNumber__c: 1,
          Quantity: 100,
          rosquoteai__OEM__c: '001Hn00002424K6IAI',
          rosquoteai__Product_Code__c: '210-3212-L9-13BC09A12',
          rosquoteai__Description__c:
            'Adobe Acrobat Pro for enterprise Subscription New,\nMonthly, 1 User, Large Government Agencies - Level 9\n10,000+ (VIP # Req) 12 Month Term\n12 Month\nNamed User\nAdobe Inc.\n65324113BC09A12',
          UnitPrice: 0,
          TotalPrice: 0,
          rosquoteai__OEM__r: {
            attributes: {
              type: 'Account',
              url: '/services/data/v61.0/sobjects/Account/001Hn00002424K6IAI',
            },
            Name: 'TechData',
            Id: '001Hn00002424K6IAI',
          },
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4TOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4TOAS',
          rosquoteai__LineNumber__c: 7,
          Quantity: 8,
          rosquoteai__Product_Code__c: '340-AFMQ',
          rosquoteai__Description__c: 'None',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4SOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4SOAS',
          rosquoteai__LineNumber__c: 6,
          Quantity: 8,
          rosquoteai__Product_Code__c: '490-BJDZ',
          rosquoteai__Description__c: 'NVIDIA RTX 3500 Ada 12GB GDDR6',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4ROAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4ROAS',
          rosquoteai__LineNumber__c: 5,
          Quantity: 8,
          rosquoteai__Product_Code__c: '583-BHBG',
          rosquoteai__Description__c:
            'English US backlit keyboard with numeric keypad 99-key',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4QOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4QOAS',
          rosquoteai__LineNumber__c: 4,
          Quantity: 8,
          rosquoteai__Product_Code__c: '370-BBBX',
          rosquoteai__Description__c: '32GB 1x32GB 5600MT/s CAMM non-ECC',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4POAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4POAS',
          rosquoteai__LineNumber__c: 3,
          Quantity: 8,
          rosquoteai__Product_Code__c: '379-BBBW',
          rosquoteai__Description__c: 'TAA Information',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4OOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4OOAS',
          rosquoteai__LineNumber__c: 2,
          Quantity: 8,
          rosquoteai__Product_Code__c: '210-BGNZ',
          rosquoteai__Description__c:
            'Dell Mobile Precision Workstation 7780 CTOG',
          UnitPrice: 3073.84,
          TotalPrice: 24590.72,
        },
      ],
    },
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn5HOAS',
    },
    Id: '0QLHn000008Tn5HOAS',
    rosquoteai__Bundle_Name__c: 'Switches',
    rosquoteai__Quote_Line_Items__r: {
      totalSize: 9,
      done: true,
      records: [
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4fOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4fOAC',
          rosquoteai__LineNumber__c: 19,
          Quantity: 8,
          rosquoteai__Product_Code__c: '823-3810',
          rosquoteai__Description__c:
            'Dell Limited Hardware Warranty Plus Service',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4eOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4eOAC',
          rosquoteai__LineNumber__c: 18,
          Quantity: 8,
          rosquoteai__Product_Code__c: '823-0013',
          rosquoteai__Description__c:
            'ProSupport Flex: Next Business Day Onsite 5 Years',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4dOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4dOAC',
          rosquoteai__LineNumber__c: 17,
          Quantity: 8,
          rosquoteai__Product_Code__c: '340-AGIK',
          rosquoteai__Description__c: 'SERI Guide (ENG/FR/Multi)',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4cOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4cOAC',
          rosquoteai__LineNumber__c: 16,
          Quantity: 8,
          rosquoteai__Product_Code__c: '379-BDZB',
          rosquoteai__Description__c: 'EPEAT 2018 Registered (Gold)',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4bOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4bOAC',
          rosquoteai__LineNumber__c: 15,
          Quantity: 8,
          rosquoteai__Product_Code__c: '800-BBGF',
          rosquoteai__Description__c: 'BTO Standard shipment Air',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4aOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4aOAC',
          rosquoteai__LineNumber__c: 14,
          Quantity: 8,
          rosquoteai__Product_Code__c: '620-AALW',
          rosquoteai__Description__c: 'OS-Windows Media Not Included',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4ZOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4ZOAS',
          rosquoteai__LineNumber__c: 13,
          Quantity: 8,
          rosquoteai__Product_Code__c: '450-ALLF',
          rosquoteai__Description__c: 'E5 Power cord 1M US',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4rOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4rOAC',
          rosquoteai__LineNumber__c: 16,
          Quantity: 8,
          rosquoteai__Product_Code__c: '387-BBQJ',
          rosquoteai__Description__c: 'ENERGY STAR Qualified',
          UnitPrice: 43.4783,
          TotalPrice: 347.8264,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4YOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4YOAS',
          rosquoteai__LineNumber__c: 12,
          Quantity: 8,
          rosquoteai__Product_Code__c: '555-BGGV',
          rosquoteai__Description__c: 'No Wireless LAN Card',
          UnitPrice: 0,
          TotalPrice: 0,
        },
      ],
    },
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4UOAS',
    },
    Id: '0QLHn000008Tn4UOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4VOAS',
    },
    Id: '0QLHn000008Tn4VOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4WOAS',
    },
    Id: '0QLHn000008Tn4WOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4XOAS',
    },
    Id: '0QLHn000008Tn4XOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4gOAC',
    },
    Id: '0QLHn000008Tn4gOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4hOAC',
    },
    Id: '0QLHn000008Tn4hOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4iOAC',
    },
    Id: '0QLHn000008Tn4iOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4jOAC',
    },
    Id: '0QLHn000008Tn4jOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4kOAC',
    },
    Id: '0QLHn000008Tn4kOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4lOAC',
    },
    Id: '0QLHn000008Tn4lOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4mOAC',
    },
    Id: '0QLHn000008Tn4mOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4nOAC',
    },
    Id: '0QLHn000008Tn4nOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4oOAC',
    },
    Id: '0QLHn000008Tn4oOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4pOAC',
    },
    Id: '0QLHn000008Tn4pOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4qOAC',
    },
    Id: '0QLHn000008Tn4qOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4sOAC',
    },
    Id: '0QLHn000008Tn4sOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4tOAC',
    },
    Id: '0QLHn000008Tn4tOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4uOAC',
    },
    Id: '0QLHn000008Tn4uOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4vOAC',
    },
    Id: '0QLHn000008Tn4vOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4wOAC',
    },
    Id: '0QLHn000008Tn4wOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4xOAC',
    },
    Id: '0QLHn000008Tn4xOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4yOAC',
    },
    Id: '0QLHn000008Tn4yOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4zOAC',
    },
    Id: '0QLHn000008Tn4zOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn50OAC',
    },
    Id: '0QLHn000008Tn50OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn51OAC',
    },
    Id: '0QLHn000008Tn51OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn52OAC',
    },
    Id: '0QLHn000008Tn52OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn53OAC',
    },
    Id: '0QLHn000008Tn53OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn54OAC',
    },
    Id: '0QLHn000008Tn54OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn55OAC',
    },
    Id: '0QLHn000008Tn55OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn56OAC',
    },
    Id: '0QLHn000008Tn56OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn57OAC',
    },
    Id: '0QLHn000008Tn57OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn58OAC',
    },
    Id: '0QLHn000008Tn58OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn59OAC',
    },
    Id: '0QLHn000008Tn59OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn5AOAS',
    },
    Id: '0QLHn000008Tn5AOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn5BOAS',
    },
    Id: '0QLHn000008Tn5BOAS',
  },
];
export const FullStackForArray = [
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn5GOAS',
    },
    Id: '0QLHn000008Tn5GOAS',
    rosquoteai__Bundle_Name__c: 'Cables',
    Quote_Line_Items: {
      totalSize: 7,
      done: true,
      records: [
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4NOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4NOAS',
          rosquoteai__LineNumber__c: 1,
          Quantity: 100,
          rosquoteai__OEM__c: '001Hn00002424K6IAI',
          rosquoteai__Product_Code__c: '210-3212-L9-13BC09A12',
          Description:
            'Adobe Acrobat Pro for enterprise Subscription New,\nMonthly, 1 User, Large Government Agencies - Level 9\n10,000+ (VIP # Req) 12 Month Term\n12 Month\nNamed User\nAdobe Inc.\n65324113BC09A12',
          UnitPrice: 0,
          TotalPrice: 0,
          rosquoteai__OEM__r: {
            attributes: {
              type: 'Account',
              url: '/services/data/v61.0/sobjects/Account/001Hn00002424K6IAI',
            },
            Name: 'TechData',
            Id: '001Hn00002424K6IAI',
          },
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4TOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4TOAS',
          rosquoteai__LineNumber__c: 7,
          Quantity: 8,
          rosquoteai__Product_Code__c: '340-AFMQ',
          Description: 'None',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4SOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4SOAS',
          rosquoteai__LineNumber__c: 6,
          Quantity: 8,
          rosquoteai__Product_Code__c: '490-BJDZ',
          Description: 'NVIDIA RTX 3500 Ada 12GB GDDR6',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4ROAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4ROAS',
          rosquoteai__LineNumber__c: 5,
          Quantity: 8,
          rosquoteai__Product_Code__c: '583-BHBG',
          Description: 'English US backlit keyboard with numeric keypad 99-key',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4QOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4QOAS',
          rosquoteai__LineNumber__c: 4,
          Quantity: 8,
          rosquoteai__Product_Code__c: '370-BBBX',
          Description: '32GB 1x32GB 5600MT/s CAMM non-ECC',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4POAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4POAS',
          rosquoteai__LineNumber__c: 3,
          Quantity: 8,
          rosquoteai__Product_Code__c: '379-BBBW',
          Description: 'TAA Information',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4OOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5GOAS',
          Id: '0QLHn000008Tn4OOAS',
          rosquoteai__LineNumber__c: 2,
          Quantity: 8,
          rosquoteai__Product_Code__c: '210-BGNZ',
          Description: 'Dell Mobile Precision Workstation 7780 CTOG',
          UnitPrice: 3073.84,
          TotalPrice: 24590.72,
        },
      ],
    },
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn5HOAS',
    },
    Id: '0QLHn000008Tn5HOAS',
    rosquoteai__Bundle_Name__c: 'Switches',
    Quote_Line_Items: {
      totalSize: 9,
      done: true,
      records: [
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4fOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4fOAC',
          rosquoteai__LineNumber__c: 19,
          Quantity: 8,
          rosquoteai__Product_Code__c: '823-3810',
          Description: 'Dell Limited Hardware Warranty Plus Service',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4eOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4eOAC',
          rosquoteai__LineNumber__c: 18,
          Quantity: 8,
          rosquoteai__Product_Code__c: '823-0013',
          Description: 'ProSupport Flex: Next Business Day Onsite 5 Years',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4dOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4dOAC',
          rosquoteai__LineNumber__c: 17,
          Quantity: 8,
          rosquoteai__Product_Code__c: '340-AGIK',
          Description: 'SERI Guide (ENG/FR/Multi)',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4cOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4cOAC',
          rosquoteai__LineNumber__c: 16,
          Quantity: 8,
          rosquoteai__Product_Code__c: '379-BDZB',
          Description: 'EPEAT 2018 Registered (Gold)',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4bOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4bOAC',
          rosquoteai__LineNumber__c: 15,
          Quantity: 8,
          rosquoteai__Product_Code__c: '800-BBGF',
          Description: 'BTO Standard shipment Air',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4aOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4aOAC',
          rosquoteai__LineNumber__c: 14,
          Quantity: 8,
          rosquoteai__Product_Code__c: '620-AALW',
          Description: 'OS-Windows Media Not Included',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4ZOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4ZOAS',
          rosquoteai__LineNumber__c: 13,
          Quantity: 8,
          rosquoteai__Product_Code__c: '450-ALLF',
          Description: 'E5 Power cord 1M US',
          UnitPrice: 0,
          TotalPrice: 0,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4rOAC',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4rOAC',
          rosquoteai__LineNumber__c: 16,
          Quantity: 8,
          rosquoteai__Product_Code__c: '387-BBQJ',
          Description: 'ENERGY STAR Qualified',
          UnitPrice: 43.4783,
          TotalPrice: 347.8264,
        },
        {
          attributes: {
            type: 'QuoteLineItem',
            url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4YOAS',
          },
          rosquoteai__Quote_Line_Item__c: '0QLHn000008Tn5HOAS',
          Id: '0QLHn000008Tn4YOAS',
          rosquoteai__LineNumber__c: 12,
          Quantity: 8,
          rosquoteai__Product_Code__c: '555-BGGV',
          Description: 'No Wireless LAN Card',
          UnitPrice: 0,
          TotalPrice: 0,
        },
      ],
    },
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4UOAS',
    },
    Id: '0QLHn000008Tn4UOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4VOAS',
    },
    Id: '0QLHn000008Tn4VOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4WOAS',
    },
    Id: '0QLHn000008Tn4WOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4XOAS',
    },
    Id: '0QLHn000008Tn4XOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4gOAC',
    },
    Id: '0QLHn000008Tn4gOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4hOAC',
    },
    Id: '0QLHn000008Tn4hOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4iOAC',
    },
    Id: '0QLHn000008Tn4iOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4jOAC',
    },
    Id: '0QLHn000008Tn4jOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4kOAC',
    },
    Id: '0QLHn000008Tn4kOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4lOAC',
    },
    Id: '0QLHn000008Tn4lOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4mOAC',
    },
    Id: '0QLHn000008Tn4mOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4nOAC',
    },
    Id: '0QLHn000008Tn4nOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4oOAC',
    },
    Id: '0QLHn000008Tn4oOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4pOAC',
    },
    Id: '0QLHn000008Tn4pOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4qOAC',
    },
    Id: '0QLHn000008Tn4qOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4sOAC',
    },
    Id: '0QLHn000008Tn4sOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4tOAC',
    },
    Id: '0QLHn000008Tn4tOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4uOAC',
    },
    Id: '0QLHn000008Tn4uOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4vOAC',
    },
    Id: '0QLHn000008Tn4vOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4wOAC',
    },
    Id: '0QLHn000008Tn4wOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4xOAC',
    },
    Id: '0QLHn000008Tn4xOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4yOAC',
    },
    Id: '0QLHn000008Tn4yOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn4zOAC',
    },
    Id: '0QLHn000008Tn4zOAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn50OAC',
    },
    Id: '0QLHn000008Tn50OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn51OAC',
    },
    Id: '0QLHn000008Tn51OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn52OAC',
    },
    Id: '0QLHn000008Tn52OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn53OAC',
    },
    Id: '0QLHn000008Tn53OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn54OAC',
    },
    Id: '0QLHn000008Tn54OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn55OAC',
    },
    Id: '0QLHn000008Tn55OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn56OAC',
    },
    Id: '0QLHn000008Tn56OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn57OAC',
    },
    Id: '0QLHn000008Tn57OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn58OAC',
    },
    Id: '0QLHn000008Tn58OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn59OAC',
    },
    Id: '0QLHn000008Tn59OAC',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn5AOAS',
    },
    Id: '0QLHn000008Tn5AOAS',
  },
  {
    attributes: {
      type: 'QuoteLineItem',
      url: '/services/data/v61.0/sobjects/QuoteLineItem/0QLHn000008Tn5BOAS',
    },
    Id: '0QLHn000008Tn5BOAS',
  },
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
