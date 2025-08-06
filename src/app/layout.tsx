import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { getUser } from "@/lib/auth/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "CIVIX - Plateforme de Vote Électronique",
  description: "Plateforme sécurisée de vote électronique pour les citoyens",
  keywords: ["vote", "élection", "démocratie", "civique"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="fr" className="h-full">
      <body className="antialiased min-h-full bg-gray-50">
        <QueryProvider>
          <div className="min-h-screen flex flex-col">
            <Header isAuthenticated={!!user} user={user || undefined} />
            <main className="flex-1">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              }>
                {children}
              </Suspense>
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
