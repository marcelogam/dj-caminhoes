import type { VercelRequest, VercelResponse } from "@vercel/node";
import crypto from "crypto";

function cleanEnv(val?: string) {
  if (!val) return undefined;
  let s = val.trim();
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    s = s.slice(1, -1);
  }
  return s;
}

const ADMIN_PASSWORD = cleanEnv(process.env.ADMIN_PASSWORD) || "admindjcaminhoes2026";
const ADMIN_JWT_SECRET = cleanEnv(process.env.ADMIN_JWT_SECRET) || "dj_caminhoes_secret_jwt_key_2026_x89a";

/**
 * Gera um token assinado com timestamp de expiração (24 horas).
 * Formato: base64(payload).signature
 */
export function generateAuthToken(): string {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 horas
  const payload = Buffer.from(JSON.stringify({ role: "admin", exp: expiresAt })).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_JWT_SECRET)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

/**
 * Valida se um token é autêntico e não expirou.
 */
export function verifyAuthToken(token?: string): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadBase64, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", ADMIN_JWT_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  try {
    const signatureBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (signatureBuffer.length !== expectedBuffer.length) return false;

    const isSignatureValid = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
    if (!isSignatureValid) return false;

    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf-8"));
    if (!payload.exp || Date.now() > payload.exp) {
      return false;
    }

    return payload.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Extrai e valida o token do cabeçalho Authorization: Bearer <token>
 */
export function isRequestAuthorized(req: VercelRequest): boolean {
  const authHeader = req.headers["authorization"] || (req.headers as any)["Authorization"];
  if (!authHeader || typeof authHeader !== "string") return false;

  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  return verifyAuthToken(match[1]);
}

/**
 * Serverless Function — /api/auth
 *
 * POST → Login com senha, retorna token
 * GET  → Verifica se token é válido
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // ─── GET: Verificar status do token ─────────────────────────
  if (req.method === "GET") {
    if (isRequestAuthorized(req)) {
      return res.status(200).json({ authenticated: true });
    }
    return res.status(401).json({
      authenticated: false,
      error: "Sessão inválida ou expirada",
    });
  }

  // ─── POST: Login com senha ──────────────────────────────────
  if (req.method === "POST") {
    const { password } = req.body || {};

    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Senha é obrigatória" });
    }

    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    const token = generateAuthToken();
    return res.status(200).json({
      success: true,
      token,
      expiresIn: 86400, // 24 horas em segundos
    });
  }

  res.setHeader("Allow", "GET, POST, OPTIONS");
  return res.status(405).json({ error: "Método não permitido" });
}
