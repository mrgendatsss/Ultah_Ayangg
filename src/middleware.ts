import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Basic Auth for Admin routes
  if (pathname.startsWith('/admin')) {
    const basicAuth = request.headers.get('authorization');
    const url = request.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      if (user === 'admin' && pwd === 'papoyyy') {
        return NextResponse.next();
      }
    }
    
    url.pathname = '/api/auth';
    return new NextResponse('Auth Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  // Paths that are always allowed
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.startsWith('/send-wishes') ||
    pathname === '/locked' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // Fetch lock status directly from Supabase REST API (works in Edge runtime)
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const response = await fetch(`${supabaseUrl}/rest/v1/site_settings?id=eq.1&select=is_locked`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        // Cache the response for 10 seconds to avoid hitting DB on every single asset request
        next: { revalidate: 10 } 
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0 && data[0].is_locked === true) {
          return NextResponse.redirect(new URL('/locked', request.url));
        }
      }
    }
  } catch (error) {
    console.error('Middleware Supabase Error:', error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
