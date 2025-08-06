import { NextResponse } from 'next/server';
import { AuthentificationService } from '@/lib/services/AuthentificationService';

export async function POST() {
  try {
    // Tentative de déconnexion via l'API Spring Boot
    try {
      await AuthentificationService.logout();
    } catch (error) {
      // Ignorer les erreurs de déconnexion de l'API
      console.warn('Erreur lors de la déconnexion API:', error);
    }

    // Créer la réponse et supprimer le cookie
    const response = NextResponse.json({ success: true });
    
    response.cookies.set('civix-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}