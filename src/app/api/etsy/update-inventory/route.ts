import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { listing_id, quantity } = await request.json();

  const ETSY_API_KEY = process.env.ETSY_API_KEY;
  const ETSY_SHOP_ID = process.env.ETSY_SHOP_ID;
  const ETSY_ACCESS_TOKEN = process.env.ETSY_ACCESS_TOKEN;

  const url = `https://openapi.etsy.com/v3/application/shops/${ETSY_SHOP_ID}/listings/${listing_id}/inventory`;

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ETSY_API_KEY,
        Authorization: `Bearer ${ETSY_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        products: [{ offerings: [{ quantity }] }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Etsy API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
