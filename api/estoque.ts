import type { VercelRequest, VercelResponse } from "@vercel/node";
import pg from "pg";
import { z } from "zod";
import { isRequestAuthorized } from "./auth.js";

const { Pool } = pg;

// ─── Conexão PostgreSQL (Serverless Pool) ─────────────────────
function cleanEnv(val?: string) {
  if (!val) return undefined;
  let s = val.trim();
  if ((s.startsWith("'") && s.endsWith("'")) || (s.startsWith('"') && s.endsWith('"'))) {
    s = s.slice(1, -1);
  }
  return s;
}

const useSSL = cleanEnv(process.env.DB_SSL) === "true";

const pool = new Pool({
  host: cleanEnv(process.env.DB_HOST),
  port: Number(cleanEnv(process.env.DB_PORT)) || 5432,
  user: cleanEnv(process.env.DB_USER),
  password: cleanEnv(process.env.DB_PASSWORD),
  database: cleanEnv(process.env.DB_NAME),
  ssl: useSSL ? { rejectUnauthorized: false } : false,
  max: 3,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

pool.on("error", (err) => {
  console.error("[PostgreSQL Pool Error]", err);
});

// ─── Inicialização da Tabela estoque_caminhoes ─────────────────
let tableInitialized = false;

async function ensureTableExists() {
  if (tableInitialized) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS estoque_caminhoes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        marca VARCHAR(100) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        ano VARCHAR(50) NOT NULL,
        km VARCHAR(50) NOT NULL,
        combustivel VARCHAR(50) DEFAULT 'Diesel',
        preco VARCHAR(50),
        cor VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'Disponível',
        image_banner TEXT,
        images TEXT[] DEFAULT '{}',
        descricao TEXT,
        motor VARCHAR(255),
        potencia VARCHAR(100),
        torque VARCHAR(100),
        cambio VARCHAR(100),
        eixos VARCHAR(100),
        pbt VARCHAR(100),
        entre_eixos VARCHAR(100),
        cabine VARCHAR(100),
        tipo_carroceria VARCHAR(100),
        caracteristicas TEXT[] DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    tableInitialized = true;
  } catch (err) {
    console.error("[ensureTableExists Error]", err);
  }
}

// ─── Validação Zod ───────────────────────────────────────────
const createCaminhaoSchema = z.object({
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(255, "Nome deve ter no máximo 255 caracteres"),

  marca: z
    .string({ required_error: "Marca é obrigatória" })
    .min(1, "Marca é obrigatória")
    .max(100),

  modelo: z
    .string({ required_error: "Modelo é obrigatório" })
    .min(1, "Modelo é obrigatório")
    .max(100),

  ano: z
    .union([z.string(), z.number()])
    .transform((val) => String(val).trim()),

  km: z
    .union([z.string(), z.number()])
    .transform((val) => String(val).trim()),

  combustivel: z.string().optional().default("Diesel"),

  preco: z
    .union([z.string(), z.number()])
    .optional()
    .nullable()
    .transform((val) => (val !== undefined && val !== null ? String(val) : "")),

  cor: z
    .string({ required_error: "Cor é obrigatória" })
    .min(1, "Cor é obrigatória")
    .max(100),

  status: z.enum(["Disponível", "Pronta Entrega", "Sob encomenda", "Reservado", "Vendido", "Esgotado"], {
    required_error: "Status é obrigatório",
  }).default("Disponível"),

  image_banner: z.string().optional().or(z.literal("")),

  images: z.array(z.string()).optional().default([]),

  descricao: z.string().optional().default(""),

  motor: z.string().max(255).optional().default(""),

  potencia: z.string().max(100).optional().default(""),

  torque: z.string().max(100).optional().default(""),

  cambio: z.string().max(100).optional().default(""),

  eixos: z.string().max(100).optional().default(""),

  pbt: z.string().max(100).optional().default(""),

  entre_eixos: z.string().max(100).optional().default(""),

  cabine: z.string().max(100).optional().default(""),

  tipo_carroceria: z.string().max(100).optional().default(""),

  caracteristicas: z.array(z.string()).optional().default([]),
});

const updateCaminhaoSchema = createCaminhaoSchema.partial();

/**
 * Serverless Function — /api/estoque
 *
 * GET    → Lista todos os caminhões da tabela estoque_caminhoes
 * POST   → Cadastra um novo caminhão (requer auth)
 * PUT    → Atualiza um caminhão existente (requer auth, id via query string)
 * DELETE → Remove um caminhão do estoque (requer auth, id via query string)
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  await ensureTableExists();

  // ─── Proteção de Autenticação para Operações de Escrita ──────
  if (req.method === "POST" || req.method === "PUT" || req.method === "DELETE") {
    if (!isRequestAuthorized(req)) {
      return res.status(401).json({
        error: "Não autorizado: faça login como administrador para realizar alterações.",
      });
    }
  }

  // ─── GET: Listar todos os caminhões ou buscar por ID ─────────
  if (req.method === "GET") {
    const id = req.query.id ? Number(req.query.id) : undefined;

    if (id && !isNaN(id)) {
      try {
        const result = await pool.query(
          "SELECT * FROM estoque_caminhoes WHERE id = $1",
          [id]
        );

        if (result.rowCount === 0) {
          return res.status(404).json({ error: `Caminhão com ID ${id} não encontrado` });
        }

        return res.status(200).json(result.rows[0]);
      } catch (error) {
        console.error("[GET /api/estoque?id] Erro ao consultar banco:", error);
        return res.status(500).json({
          error: "Erro interno ao buscar veículo",
          details:
            process.env.NODE_ENV === "development"
              ? (error as Error).message
              : undefined,
        });
      }
    }

    try {
      const result = await pool.query(
        "SELECT * FROM estoque_caminhoes ORDER BY id DESC"
      );
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error("[GET /api/estoque] Erro ao consultar banco:", error);
      return res.status(500).json({
        error: "Erro interno ao buscar estoque",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      });
    }
  }

  // ─── POST: Cadastrar novo caminhão ───────────────────────────
  if (req.method === "POST") {
    const parsed = createCaminhaoSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.flatten();
      return res.status(400).json({
        error: "Dados inválidos",
        fieldErrors: errors.fieldErrors,
        formErrors: errors.formErrors,
      });
    }

    const data = parsed.data;

    try {
      const result = await pool.query(
        `INSERT INTO estoque_caminhoes
          (nome, marca, modelo, ano, km, combustivel, preco, cor, status,
           image_banner, images, descricao, motor, potencia, torque,
           cambio, eixos, pbt, entre_eixos, cabine, tipo_carroceria, caracteristicas)
        VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9,
           $10, $11, $12, $13, $14, $15,
           $16, $17, $18, $19, $20, $21, $22)
        RETURNING *`,
        [
          data.nome,
          data.marca,
          data.modelo,
          data.ano,
          data.km,
          data.combustivel || "Diesel",
          data.preco || null,
          data.cor,
          data.status || "Disponível",
          data.image_banner || null,
          data.images || [],
          data.descricao || null,
          data.motor || null,
          data.potencia || null,
          data.torque || null,
          data.cambio || null,
          data.eixos || null,
          data.pbt || null,
          data.entre_eixos || null,
          data.cabine || null,
          data.tipo_carroceria || null,
          data.caracteristicas || [],
        ]
      );

      return res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("[POST /api/estoque] Erro ao inserir:", error);
      return res.status(500).json({
        error: "Erro interno ao cadastrar caminhão",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      });
    }
  }

  // ─── PUT: Atualizar caminhão existente ───────────────────────
  if (req.method === "PUT") {
    const id = Number(req.query.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID do caminhão é obrigatório (query param ?id=X)" });
    }

    const parsed = updateCaminhaoSchema.safeParse(req.body);

    if (!parsed.success) {
      const errors = parsed.error.flatten();
      return res.status(400).json({
        error: "Dados inválidos",
        fieldErrors: errors.fieldErrors,
        formErrors: errors.formErrors,
      });
    }

    const data = parsed.data;

    const fields: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    const fieldMap: Record<string, unknown> = {
      nome: data.nome,
      marca: data.marca,
      modelo: data.modelo,
      ano: data.ano,
      km: data.km,
      combustivel: data.combustivel,
      preco: data.preco,
      cor: data.cor,
      status: data.status,
      image_banner: data.image_banner,
      images: data.images,
      descricao: data.descricao,
      motor: data.motor,
      potencia: data.potencia,
      torque: data.torque,
      cambio: data.cambio,
      eixos: data.eixos,
      pbt: data.pbt,
      entre_eixos: data.entre_eixos,
      cabine: data.cabine,
      tipo_carroceria: data.tipo_carroceria,
      caracteristicas: data.caracteristicas,
    };

    for (const [key, value] of Object.entries(fieldMap)) {
      if (value !== undefined) {
        fields.push(`${key} = $${paramIndex}`);
        values.push(value);
        paramIndex++;
      }
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: "Nenhum campo para atualizar" });
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    try {
      const result = await pool.query(
        `UPDATE estoque_caminhoes SET ${fields.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
        values
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: `Caminhão com ID ${id} não encontrado` });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("[PUT /api/estoque] Erro ao atualizar:", error);
      return res.status(500).json({
        error: "Erro interno ao atualizar caminhão",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      });
    }
  }

  // ─── DELETE: Remover caminhão ────────────────────────────────
  if (req.method === "DELETE") {
    const id = Number(req.query.id);

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: "ID do caminhão é obrigatório (query param ?id=X)" });
    }

    try {
      const result = await pool.query(
        "DELETE FROM estoque_caminhoes WHERE id = $1 RETURNING id, nome",
        [id]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: `Caminhão com ID ${id} não encontrado` });
      }

      return res.status(200).json({
        success: true,
        deleted: result.rows[0],
      });
    } catch (error) {
      console.error("[DELETE /api/estoque] Erro ao remover:", error);
      return res.status(500).json({
        error: "Erro interno ao remover caminhão",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      });
    }
  }

  res.setHeader("Allow", "GET, POST, PUT, DELETE, OPTIONS");
  return res.status(405).json({ error: "Método não permitido" });
}
