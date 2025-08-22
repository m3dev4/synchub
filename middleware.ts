import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🔍 Middleware checking:", pathname);

  // Routes qui ne nécessitent aucune vérification
  const staticRoutes = ["/api", "/favicon.ico", "/_next", "/images", "/public"];

  if (staticRoutes.some((route) => pathname.startsWith(route))) {
    console.log("✅ Static route, allowing access");
    return NextResponse.next();
  }

  // Vérifier la session utilisateur via API
  const sessionToken = request.cookies.get("sessionToken")?.value;
  console.log("🍪 SessionToken found:", !!sessionToken);

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
        console.log("👤 User found:", !!user, user?.email);
        console.log("📋 User onboarding status:", user?.onboarding);
      }
    } catch (error) {
      console.error("❌ Middleware session error:", error);
    }
  }

  // Gestion des routes d'authentification
  if (pathname === "/sign-in" || pathname === "/sign-up") {
    console.log("🔐 Auth route detected");
    if (user) {
      const redirectTo = user.onboarding ? "/feeds" : "/onboarding";
      console.log("🔄 Redirecting authenticated user to:", redirectTo);
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    console.log("✅ Allowing access to auth route");
    return NextResponse.next();
  }

  // Route de vérification email - accessible même sans session
  if (pathname === "/verify-email") {
    console.log("📧 Verify email route, allowing access");
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
    console.log("🏠 Home page, allowing access");
    return NextResponse.next();
  }

  // Route d'onboarding
  if (pathname.startsWith("/onboarding")) {
    console.log("📝 Onboarding route detected");
    if (!user) {
      console.log("🔄 No user, redirecting to sign-in");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    if (user.onboarding) {
      console.log("🔄 User already onboarded, redirecting to feeds");
      return NextResponse.redirect(new URL("/feeds", request.url));
    }
    console.log("✅ Allowing access to onboarding");
    return NextResponse.next();
  }

  // Routes protégées (feeds, profile, etc.)
  console.log("🛡️ Protected route detected");
  if (!user) {
    console.log("🔄 No user, redirecting to sign-in");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (!user.onboarding) {
    console.log("🔄 User not onboarded, redirecting to onboarding");
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  console.log("✅ User authenticated and onboarded, allowing access");
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
