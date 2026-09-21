import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, del } from "@vercel/blob";
import { isRequestAuthorized } from "./auth.js";
import { deleteManagedImage, parseImageBody } from './_image-policy.js';
import { isImageReferenced } from './estoque.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Serverless Function — /api/upload
 *
 * POST   → Faz upload de uma imagem para o Vercel Blob Storage
 * DELETE → Remove uma imagem do Vercel Blob Storage
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Filename, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // ─── Proteção de Autenticação ──────────────────────────────
  if (req.method === "POST" || req.method === "DELETE") {
    if (!isRequestAuthorized(req)) {
      return res.status(401).json({
        error: "Não autorizado: faça login como administrador para gerenciar imagens.",
      });
    }
  }

  // ─── POST: Upload de imagem ─────────────────────────────────
  if (req.method === "POST") {
    try {
      const rawFilename = (req.headers["x-filename"] as string)
        ? decodeURIComponent(req.headers["x-filename"] as string)
        : `image-${Date.now()}.jpg`;

      // Validar extensão
      const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
      const ext = rawFilename.substring(rawFilename.lastIndexOf(".")).toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        return res.status(400).json({
          error: `Tipo de arquivo não permitido: ${ext}. Use: ${allowedExtensions.join(", ")}`,
        });
      }

      const cleanFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const uniqueName = `${Date.now()}-${cleanFilename}`;

      // Upload para Vercel Blob
      const blob = await put(`dj-caminhoes-estoque/${uniqueName}`, req, {
        access: "public",
        contentType: req.headers["content-type"] || "image/jpeg",
      });

      return res.status(200).json({
        url: blob.url,
        pathname: blob.pathname,
      });
    } catch (error) {
      console.error("[POST /api/upload] Erro:", error);
      return res.status(500).json({
        error: "Erro ao fazer upload da imagem",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      });
    }
  }

  // ─── DELETE: Remover imagem ─────────────────────────────────
  if (req.method === "DELETE") {
    try {
      let bodyData: unknown = req.body;
      if (!bodyData) {
        const buffers: Buffer[] = [];
        for await (const chunk of req) {
          buffers.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
        }
        const text = Buffer.concat(buffers).toString("utf-8");
        bodyData = text;
      }

      const parsed = parseImageBody(bodyData);
      const result = await deleteManagedImage(parsed?.url, { isReferenced: isImageReferenced, remove: del });
      return res.status(result.status).json(result.body);
    } catch (error) {
      console.error("[DELETE /api/upload] Erro:", error);
      return res.status(500).json({
        error: "Erro ao remover imagem",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      });
    }
  }

  res.setHeader("Allow", "POST, DELETE, OPTIONS");
  return res.status(405).json({ error: "Método não permitido" });
}
