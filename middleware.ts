import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes qui ne nécessitent aucune vérification
  const staticRoutes = ["/api", "/favicon.ico", "/_next", "/images", "/public"];

  if (staticRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Vérifier la session utilisateur via API
  const sessionToken = request.cookies.get("sessionToken")?.value;

  let user = null;

  if (sessionToken) {
    try {
      // Appel API interne pour vérifier la session (compatible edge runtime)
      const baseUrl = request.nextUrl.origin;
      const response = await fetch(`${baseUrl}/api/auth/session`, {
        headers: {
          Cookie: `sessionToken=${sessionToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        user = data.user;
      }
    } catch (error) {
      console.error("❌ Middleware session error:", error);
    }
  }

  // Gestion des routes d'authentification
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    if (user) {
      // Si l'utilisateur n'est pas vérifié, rediriger vers verification
      if (!user.isVerify) {
        return NextResponse.redirect(new URL("/verify-email", request.url));
      }
      const redirectTo = user.onboarding ? "/feeds" : "/onboarding";

      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    return NextResponse.next();
  }

  // Route de vérification email - accessible même sans session
  if (pathname === "/verify-email") {
    return NextResponse.next();
  }

  if (pathname === "/forgot-password") {
    return NextResponse.next();
  }
  if (pathname === "/reset-password") {
    return NextResponse.next();
  }

  // Page home - accessible sans authentification
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Route d'onboarding
  if (pathname.startsWith("/onboarding")) {
    if (!user) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // Vérifier si l'email est vérifié avant l'onboarding
    if (!user.isVerify) {
      return NextResponse.redirect(new URL("/verify-email", request.url));
    }
    if (user.onboarding) {
      return NextResponse.redirect(new URL("/feeds", request.url));
    }

    return NextResponse.next();
  }

  // Routes protégées (feeds, profile, etc.)

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Vérifier si l'email est vérifié avant d'accéder aux routes protégées
  if (!user.isVerify) {
    return NextResponse.redirect(new URL("/verify-email", request.url));
  }

  if (!user.onboarding) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
