/**
 * Cliente HTTP para comunicação com a API de estoque e autenticação.
 * Todas as chamadas usam caminhos relativos (/api/...) para
 * funcionar perfeitamente em dev (proxy Vite) e em produção (Vercel Serverless).
 */

const TOKEN_KEY = "dj_caminhoes_admin_token";

/** Retorna o token de admin armazenado na sessão do navegador */
export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

/** Salva o token de admin na sessão do navegador */
export function setAdminToken(token: string): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
}

/** Remove o token de admin da sessão */
export function clearAdminToken(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(TOKEN_KEY);
  }
}

/** Verifica se há uma sessão de admin ativa */
export function isAuthenticated(): boolean {
  return Boolean(getAdminToken());
}

/** Gera os headers HTTP incluindo o token de autorização caso disponível */
function getAuthHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const token = getAdminToken();
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/** Tipo de um registro de Caminhão retornado pelo banco */
export interface EstoqueCaminhaoRow {
  id: number;
  nome: string;
  marca: string;
  modelo: string;
  ano: string | number;
  km: string | number;
  combustivel?: string;
  preco?: string | null;
  cor: string;
  status: string;
  image_banner: string | null;
  images: string[];
  descricao: string | null;
  motor: string | null;
  potencia: string | null;
  torque: string | null;
  cambio: string | null;
  eixos: string | null;
  pbt: string | null;
  entre_eixos: string | null;
  cabine: string | null;
  caracteristicas: string[];
  created_at?: string;
  updated_at?: string;
}

/** Payload para criação de um novo caminhão */
export interface CreateCaminhaoPayload {
  nome: string;
  marca: string;
  modelo: string;
  ano: string | number;
  km: string | number;
  combustivel?: string;
  preco?: string | null;
  cor: string;
  status: "Disponível" | "Pronta Entrega" | "Sob encomenda" | "Reservado" | "Vendido" | "Esgotado";
  image_banner?: string;
  images?: string[];
  descricao?: string;
  motor?: string;
  potencia?: string;
  torque?: string;
  cambio?: string;
  eixos?: string;
  pbt?: string;
  entre_eixos?: string;
  cabine?: string;
  caracteristicas?: string[];
}

/** Payload para atualização parcial de um caminhão */
export type UpdateCaminhaoPayload = Partial<CreateCaminhaoPayload>;

/** Resposta de erro da API */
export interface ApiError {
  error: string;
  fieldErrors?: Record<string, string[]>;
  formErrors?: string[];
}

/** Resposta do upload */
export interface UploadResponse {
  url: string;
  pathname: string;
}

/**
 * Autentica o administrador com senha.
 * POST /api/auth
 */
export async function loginAdmin(password: string): Promise<{ success: boolean; token: string }> {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Senha incorreta.");
  }

  if (data.token) {
    setAdminToken(data.token);
  }

  return data;
}

/**
 * Verifica se o token atual é válido no servidor.
 * GET /api/auth
 */
export async function verifyAdminSession(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;

  try {
    const response = await fetch("/api/auth", {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      clearAdminToken();
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Busca todos os caminhões do estoque (Público).
 * GET /api/estoque
 */
export async function fetchEstoqueCaminhoes(): Promise<EstoqueCaminhaoRow[]> {
  const response = await fetch("/api/estoque");

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as ApiError).error || `Erro ao buscar estoque (${response.status})`
    );
  }

  return response.json();
}

/**
 * Busca um único caminhão do estoque por ID (Público).
 * GET /api/estoque?id=X
 */
export async function fetchCaminhao(id: number | string): Promise<EstoqueCaminhaoRow> {
  const response = await fetch(`/api/estoque?id=${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as ApiError).error || `Erro ao buscar caminhão (${response.status})`
    );
  }

  return response.json();
}

/**
 * Cadastra um novo caminhão no estoque (Requer Autenticação).
 * POST /api/estoque
 */
export async function createEstoqueCaminhao(
  data: CreateCaminhaoPayload
): Promise<EstoqueCaminhaoRow> {
  const response = await fetch("/api/estoque", {
    method: "POST",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      error: "Erro desconhecido ao cadastrar caminhão",
    }));
    throw Object.assign(new Error(errorData.error), {
      fieldErrors: errorData.fieldErrors,
      formErrors: errorData.formErrors,
      status: response.status,
    });
  }

  return response.json();
}

/**
 * Atualiza um caminhão existente (Requer Autenticação).
 * PUT /api/estoque?id=X
 */
export async function updateEstoqueCaminhao(
  id: number,
  data: UpdateCaminhaoPayload
): Promise<EstoqueCaminhaoRow> {
  const response = await fetch(`/api/estoque?id=${id}`, {
    method: "PUT",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      error: "Erro desconhecido ao atualizar caminhão",
    }));
    throw Object.assign(new Error(errorData.error), {
      fieldErrors: errorData.fieldErrors,
      formErrors: errorData.formErrors,
      status: response.status,
    });
  }

  return response.json();
}

/**
 * Remove um caminhão do estoque (Requer Autenticação).
 * DELETE /api/estoque?id=X
 */
export async function deleteEstoqueCaminhao(
  id: number
): Promise<{ success: boolean; deleted: { id: number; nome: string } }> {
  const response = await fetch(`/api/estoque?id=${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      error: "Erro desconhecido ao remover caminhão",
    }));
    throw new Error(errorData.error);
  }

  return response.json();
}

/**
 * Faz upload de uma imagem enviando os bytes brutos do arquivo (Requer Autenticação).
 * POST /api/upload
 */
export async function uploadImage(file: File): Promise<UploadResponse> {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: getAuthHeaders({
      "Content-Type": file.type || "application/octet-stream",
      "X-Filename": encodeURIComponent(file.name),
    }),
    body: file,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as ApiError).error || `Erro ao fazer upload (${response.status})`
    );
  }

  return response.json();
}

/**
 * Remove uma imagem do storage (Requer Autenticação).
 * DELETE /api/upload
 */
export async function deleteImage(url: string): Promise<void> {
  const response = await fetch("/api/upload", {
    method: "DELETE",
    headers: getAuthHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      (errorData as ApiError).error || `Erro ao remover imagem (${response.status})`
    );
  }
}
