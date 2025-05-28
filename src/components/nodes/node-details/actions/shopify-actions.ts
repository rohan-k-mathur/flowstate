import { Action } from '../types';

export const shopifyActions: Action[] = [
  { id: 'add-catalog-company-location', title: 'Add catalog to company location' },
  { id: 'add-customer-tags', title: 'Add customer tags' },
  { id: 'add-draft-order-tags', title: 'Add draft order tags' },
  { id: 'add-order-line-item', title: 'Add order line item' },
  { id: 'add-order-tags', title: 'Add order tags' },
  { id: 'add-product-tags', title: 'Add product tags' },
  { id: 'add-product-to-collections', title: 'Add product to collections' },
  { id: 'archive-order', title: 'Archive order' },
  { id: 'cancel-order', title: 'Cancel order' },
  { id: 'capture-payment', title: 'Capture payment' },
  // add remaining Shopify actions similarly...
];
