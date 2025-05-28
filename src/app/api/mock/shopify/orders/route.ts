import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Simulated Shopify orders response
  const mockOrders = [
    { id: '1001', sku: 'SKU-001', quantity: 5 },
    { id: '1002', sku: 'SKU-002', quantity: 3 },
  ];

  return NextResponse.json({
    success: true,
    orders: mockOrders,
  });
}
