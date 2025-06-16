export const marketplaceTriggers = {
    Shopify: [
      { id: 'collection-created', label: 'Collection Created', description: 'This workflow starts when a collection is created' },
      { id: 'collection-deleted', label: 'Collection Deleted', description: 'This workflow starts when a collection is deleted' },
      { id: 'company-contact-created', label: 'Company Contact Created', description: 'This workflow starts when a company contact is created' },
      { id: 'customer-abandoned-checkout', label: 'Customer Abandons Checkout', description: 'This workflow starts when a customer abandons checkout' },
      // Add other Shopify triggers
    ],
    Etsy: [
      { id: 'order-created', label: 'Order Created', description: 'Starts workflow when an Etsy order is created' },
      // Add Etsy triggers
    ],
    Amazon: [
      { id: 'order-shipped', label: 'Order Shipped', description: 'Workflow triggered on Amazon order shipment' },
      // Add Amazon triggers
    ],
    eBay: [
      { id: 'listing-ended', label: 'Listing Ended', description: 'Workflow triggers when an eBay listing ends' },
      // Add eBay triggers
    ],
  };
