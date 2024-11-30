import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const allowedOrigins = ['http://localhost:3000']; 
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function middleware(req: NextRequest) {
  const isPreflight = req.method === 'OPTIONS';
  const origin = req.headers.get('origin') || '';


  const isOriginAllowed = allowedOrigins.includes(origin);

  if (isPreflight) {
    const preflightHeaders = {
      'Access-Control-Allow-Origin': isOriginAllowed ? origin : '*',
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  const response = NextResponse.next();
  
  response.headers.set('Access-Control-Allow-Origin', isOriginAllowed ? origin : '*');
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  if (req.nextUrl.pathname.startsWith('/user')) {
    const userCookie: any = req.cookies.get('token');

    if (!userCookie) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    const value = userCookie.value;

    try {
      const { payload: user }:any = await jwtVerify(value, JWT_SECRET);
  

      if(!user) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      if (!user || !['admin', 'user'].includes(user.role)) {
        return NextResponse.redirect(new URL('/', req.url));
      }

      if (req.nextUrl.pathname.startsWith('/home') && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*', '/:path*'],
};
