import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEstoqueCaminhoes,
  fetchCaminhao,
  createEstoqueCaminhao,
  updateEstoqueCaminhao,
  deleteEstoqueCaminhao,
  type EstoqueCaminhaoRow,
  type CreateCaminhaoPayload,
  type UpdateCaminhaoPayload,
} from "@/lib/api";

const ESTOQUE_QUERY_KEY = ["estoque-caminhoes"] as const;

/**
 * Hook para buscar a lista de caminhões do banco de dados.
 * Usa React Query para cache, revalidação e estados de loading/error.
 */
export function useEstoqueCaminhoes() {
  return useQuery({
    queryKey: ESTOQUE_QUERY_KEY,
    queryFn: fetchEstoqueCaminhoes,
    staleTime: 1000 * 60 * 2, // 2 minutos
    retry: 2,
  });
}

/**
 * Hook para buscar um caminhão específico por ID.
 * Tenta obter primeiro do cache da listagem caso já tenha sido carregado.
 */
export function useCaminhao(id: number | string | undefined) {
  const queryClient = useQueryClient();
  const numId = id ? Number(id) : undefined;

  return useQuery({
    queryKey: ["caminhao-detalhe", numId],
    queryFn: () => fetchCaminhao(numId!),
    enabled: !!numId && !isNaN(numId),
    initialData: () => {
      if (!numId) return undefined;
      const list = queryClient.getQueryData<EstoqueCaminhaoRow[]>(ESTOQUE_QUERY_KEY);
      return list?.find((item) => item.id === numId);
    },
    staleTime: 1000 * 60 * 2,
    retry: 2,
  });
}

/**
 * Hook para cadastrar um novo caminhão.
 * Invalida o cache de listagem após sucesso para refletir o novo item.
 */
export function useCreateCaminhao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCaminhaoPayload) => createEstoqueCaminhao(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESTOQUE_QUERY_KEY });
    },
  });
}

/**
 * Hook para atualizar um caminhão existente.
 * Invalida o cache de listagem após sucesso.
 */
export function useUpdateCaminhao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCaminhaoPayload }) =>
      updateEstoqueCaminhao(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESTOQUE_QUERY_KEY });
    },
  });
}

/**
 * Hook para deletar um caminhão.
 * Invalida o cache de listagem após sucesso.
 */
export function useDeleteCaminhao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteEstoqueCaminhao(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ESTOQUE_QUERY_KEY });
    },
  });
}
