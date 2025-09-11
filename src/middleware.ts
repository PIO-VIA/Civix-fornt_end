
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// 1. Spécifiez les chemins protégés
const PROTECTED_PATHS = ['/vote', '/resultats', '/profil'];

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_COOKIE_NAME = 'auth_token'; // Assurez-vous que ce nom correspond à celui défini par votre backend

// Fonction pour vérifier le JWT
async function verifyToken(token: string) {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET n\'est pas défini dans les variables d\'environnement.');
  }
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return payload;
  } catch (error) {
    console.error('Erreur de vérification du JWT:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

  const isProtectedRoute = PROTECTED_PATHS.some(path => pathname.startsWith(path));

  if (isProtectedRoute) {
    if (!token) {
      // Pas de token, redirection vers la page de connexion
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      // Token invalide, redirection vers la page de connexion
      const response = NextResponse.redirect(new URL('/login', request.url));
      // Supprime le cookie invalide
      response.cookies.delete(TOKEN_COOKIE_NAME);
      return response;
    }

    // L'utilisateur est authentifié, autorise l'accès
    return NextResponse.next();
  }

  // Pour les autres pages (publiques), ne rien faire
  return NextResponse.next();
}

// 2. Le matcher pour exécuter le middleware uniquement sur les chemins nécessaires
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
