/**
 * Servidor de desenvolvimento local — simula Vercel Serverless Functions.
 *
 * Roda na porta 3001 e despacha as requisições para os handlers reais,
 * adaptando o req/res do Express para o formato serverless.
 *
 * Uso: npx tsx watch api/_dev-server.ts
 */
import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import estoqueHandler from "./estoque.js";
import authHandler from "./auth.js";

const app = express();
const PORT = 3001;

// Diretório local para uploads (simula Vercel Blob em dev)
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// CORS (para aceitar chamadas do Vite)
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Filename, Authorization");
  if (_req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

// Servir arquivos estáticos de uploads (para dev)
app.use("/uploads", express.static(uploadDir));

// ─── Rota: /api/upload (dev — salva bytes brutos em disco local) ───
app.post(
  "/api/upload",
  express.raw({ type: "*/*", limit: "15mb" }),
  (req, res) => {
    try {
      const rawFilename = req.headers["x-filename"]
        ? decodeURIComponent(req.headers["x-filename"] as string)
        : `image-${Date.now()}.jpg`;

      const cleanFilename = rawFilename.replace(/[^a-zA-Z0-9._-]/g, "_");
      const uniqueName = `${Date.now()}-${cleanFilename}`;
      const filePath = path.join(uploadDir, uniqueName);

      if (!req.body || !Buffer.isBuffer(req.body) || req.body.length === 0) {
        return res.status(400).json({ error: "Nenhum dado de arquivo recebido" });
      }

      fs.writeFileSync(filePath, req.body);

      const url = `http://localhost:${PORT}/uploads/${uniqueName}`;

      return res.status(200).json({
        url,
        pathname: `uploads/${uniqueName}`,
      });
    } catch (error) {
      console.error("[dev-server] Erro no upload:", error);
      res.status(500).json({ error: "Erro interno no upload local" });
    }
  }
);

app.delete("/api/upload", express.json(), (req, res) => {
  try {
    const { url } = req.body as { url: string };
    if (url && url.includes("/uploads/")) {
      const filename = url.split("/uploads/").pop();
      if (filename) {
        const filePath = path.join(uploadDir, filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[dev-server] Erro ao deletar upload:", error);
    res.status(500).json({ error: "Erro ao deletar" });
  }
});

// ─── Rota: /api/auth (Login & Verificação de Sessão) ─────────
app.all("/api/auth", express.json(), async (req, res) => {
  try {
    await (authHandler as any)(req, res);
  } catch (error) {
    console.error("[dev-server] Erro na rota /api/auth:", error);
    res.status(500).json({ error: "Erro interno no servidor de autenticação" });
  }
});

// ─── Rota: /api/estoque (com body JSON) ──────────────────────
app.all("/api/estoque", express.json(), async (req, res) => {
  try {
    await (estoqueHandler as any)(req, res);
  } catch (error) {
    console.error("[dev-server] Erro não tratado:", error);
    res.status(500).json({ error: "Erro interno do servidor de desenvolvimento" });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 API dev server rodando em http://localhost:${PORT}`);
  console.log(`   → /api/auth    (POST login, GET status)`);
  console.log(`   → /api/estoque (GET público, POST/PUT/DELETE protegido)`);
  console.log(`   → /api/upload  (POST, DELETE protegido)`);
  console.log(`   → Uploads salvos em: ${uploadDir}\n`);
});
