import { NextRequest, NextResponse } from 'next/server';
import { AuthentificationService } from '@/lib/services/AuthentificationService';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation des données
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    // Tentative de connexion via l'API Spring Boot
    const loginResponse = await AuthentificationService.loginElecteur({
      email,
      motDePasse: password
    });

    if (loginResponse.token && loginResponse.electeur) {
      // Créer un JWT pour Next.js
      const token = await new SignJWT({
        externalIdElecteur: loginResponse.electeur.externalIdElecteur,
        username: loginResponse.electeur.username,
        email: loginResponse.electeur.email,
      })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('24h')
        .setIssuedAt()
        .sign(JWT_SECRET);

      // Créer la réponse avec le cookie
      const response = NextResponse.json({
        success: true,
        user: loginResponse.electeur,
        mustChangePassword: loginResponse.mustChangePassword || false
      });

      // Définir le cookie
      response.cookies.set('civix-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 heures
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Identifiants invalides' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}