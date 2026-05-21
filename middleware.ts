import { proxy } from './src/proxy';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: ['/admin/:path*'],
};
