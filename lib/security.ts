import { z } from "zod";

// Validation robuste du mot de passe côté serveur
export const passwordSchema = z
  .string()
  .min(8, "Le mot de passe doit contenir au moins 8 caractères")
  .max(128, "Le mot de passe ne peut pas dépasser 128 caractères")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)",
  );

// Validation de l'email côté serveur
export const emailSchema = z
  .string()
  .email("Format d'email invalide")
  .min(5, "L'email doit contenir au moins 5 caractères")
  .max(254, "L'email ne peut pas dépasser 254 caractères")
  .toLowerCase()
  .trim();

// Validation du token côté serveur
export const tokenSchema = z
  .string()
  .min(32, "Token invalide")
  .max(256, "Token invalide")
  .regex(/^[a-zA-Z0-9\-_]+$/, "Format de token invalide");

// Sanitisation des entrées utilisateur
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Supprime les balises HTML basiques
    .substring(0, 1000); // Limite la longueur
}

// Validation des paramètres de requête
export function validateQueryParam(
  param: string | null,
  maxLength = 100,
): string | null {
  if (!param) return null;

  const sanitized = sanitizeInput(param);
  if (sanitized.length > maxLength) return null;

  return sanitized;
}

// Rate limiting simple (à améliorer avec Redis en production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 15 * 60 * 1000, // 15 minutes
): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Validation des headers de sécurité
export function validateSecurityHeaders(headers: Headers): boolean {
  const contentType = headers.get("content-type");

  // Vérifier que le Content-Type est correct pour les requêtes JSON
  if (contentType && !contentType.includes("application/json")) {
    return false;
  }

  return true;
}

// Génération de token sécurisé
export function generateSecureToken(length = 32): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

// Validation de l'origine de la requête (CSRF protection basique)
export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  const allowedOrigins = [
    process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000",
    "http://localhost:3000",
    "https://localhost:3000",
  ];

  // Debug logs pour diagnostiquer le problème
  console.log("Origin:", origin);
  console.log("Referer:", referer);
  console.log("Allowed origins:", allowedOrigins);

  if (origin && allowedOrigins.includes(origin)) {
    return true;
  }

  if (
    referer &&
    allowedOrigins.some((allowed) => referer.startsWith(allowed))
  ) {
    return true;
  }

  // Pour le développement local, accepter les requêtes sans origin/referer
  if (process.env.NODE_ENV === "development") {
    console.log("Development mode: allowing request without valid origin");
    return true;
  }

  return false;
}
