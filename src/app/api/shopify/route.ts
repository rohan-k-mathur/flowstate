// src/app/api/shopify/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
  const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
  const SHOPIFY_PASSWORD = process.env.SHOPIFY_PASSWORD;

  const response = await fetch(
    `https://${SHOPIFY_API_KEY}:${SHOPIFY_PASSWORD}@${SHOPIFY_STORE_DOMAIN}/admin/api/2024-04/orders.json`
  );

  const data = await response.json();

  return NextResponse.json(data);
}
