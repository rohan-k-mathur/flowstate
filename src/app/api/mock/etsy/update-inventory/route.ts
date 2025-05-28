import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { listing_id, quantity } = await request.json();

  // Simulated Etsy inventory update response
  return NextResponse.json({
    success: true,
    listing_id,
    updated_quantity: quantity,
  });
}
