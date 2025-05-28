import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const apiKey = process.env.SHOPIFY_API_KEY;
  const password = process.env.SHOPIFY_PASSWORD;

  const url = `https://${apiKey}:${password}@${domain}/admin/api/2024-04/orders.json?status=any`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, orders: data.orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
