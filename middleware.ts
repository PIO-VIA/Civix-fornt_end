import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

const publicPaths = [
  '/',
  '/elections',
  '/candidats', 
  '/campagnes',
  '/login',
  '/api/public'
];

const protectedPaths = [
  '/vote',
  '/resultats',
  '/profil'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Vérifier si c'est une route publique
  if (publicPaths.some(path => pathname.startsWith(path)) || 
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api/public')) {
    return NextResponse.next();
  }

  // Vérifier si c'est une route protégée
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const token = request.cookies.get('civix-token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Token invalide, rediriger vers login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('civix-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};