import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Loader2,
  Truck,
  Calendar,
  Gauge,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Trash2,
  Pencil,
  X,
  LogOut,
  Search,
  Fuel,
  ExternalLink,
} from "lucide-react";
import {
  useEstoqueCaminhoes,
  useCreateCaminhao,
  useUpdateCaminhao,
  useDeleteCaminhao,
} from "@/hooks/useEstoqueCaminhoes";
import {
  clearAdminToken,
  type CreateCaminhaoPayload,
  type EstoqueCaminhaoRow,
} from "@/lib/api";
import { ImageUpload, MultiImageUpload } from "@/components/ImageUpload";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { toast } from "sonner";

const STATUS_OPTIONS = [
  "Disponível",
  "Pronta Entrega",
  "Sob encomenda",
  "Reservado",
  "Vendido",
  "Esgotado",
] as const;

const MARCAS_SUGERIDAS = [
  "Volkswagen",
  "Mercedes-Benz",
  "Volvo",
  "Ford",
  "Iveco",
  "Scania",
  "DAF",
  "MAN",
  "Outra",
] as const;

const initialFormState: CreateCaminhaoPayload = {
  nome: "",
  marca: "Volkswagen",
  modelo: "",
  ano: new Date().getFullYear().toString(),
  km: "0",
  combustivel: "Diesel",
  preco: "",
  cor: "Branco",
  status: "Disponível",
  image_banner: "",
  images: [],
  descricao: "",
  motor: "",
  potencia: "",
  torque: "",
  cambio: "",
  eixos: "4x2",
  pbt: "",
  entre_eixos: "",
  cabine: "Curta",
  caracteristicas: [],
};

export default function AdminEstoquePage() {
  const navigate = useNavigate();
  const { data: caminhoes, isLoading, isError, error, refetch } = useEstoqueCaminhoes();
  const createMutation = useCreateCaminhao();
  const updateMutation = useUpdateCaminhao();
  const deleteMutation = useDeleteCaminhao();

  const [form, setForm] = useState<CreateCaminhaoPayload>(initialFormState);
  const [caracteristicasText, setCaracteristicasText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBrand, setFilterBrand] = useState("Todos");
  const [filterStatus, setFilterStatus] = useState("Todos");

  // Estado de edição
  const [editingId, setEditingId] = useState<number | null>(null);

  // Estado do modal de exclusão
  const [deleteTarget, setDeleteTarget] = useState<EstoqueCaminhaoRow | null>(null);

  const handleLogout = () => {
    clearAdminToken();
    toast.info("Sessão encerrada com sucesso.");
    navigate("/admin/login");
  };

  const handleChange = (field: keyof CreateCaminhaoPayload, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(initialFormState);
    setCaracteristicasText("");
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (caminhao: EstoqueCaminhaoRow) => {
    setForm({
      nome: caminhao.nome,
      marca: caminhao.marca,
      modelo: caminhao.modelo,
      ano: String(caminhao.ano),
      km: String(caminhao.km),
      combustivel: caminhao.combustivel || "Diesel",
      preco: caminhao.preco || "",
      cor: caminhao.cor,
      status: (caminhao.status as CreateCaminhaoPayload["status"]) || "Disponível",
      image_banner: caminhao.image_banner || "",
      images: caminhao.images || [],
      descricao: caminhao.descricao || "",
      motor: caminhao.motor || "",
      potencia: caminhao.potencia || "",
      torque: caminhao.torque || "",
      cambio: caminhao.cambio || "",
      eixos: caminhao.eixos || "4x2",
      pbt: caminhao.pbt || "",
      entre_eixos: caminhao.entre_eixos || "",
      cabine: caminhao.cabine || "Curta",
      caracteristicas: caminhao.caracteristicas || [],
    });
    setCaracteristicasText((caminhao.caracteristicas || []).join("\n"));
    setEditingId(caminhao.id);
    setShowForm(true);

    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const caracteristicas = caracteristicasText
      .split("\n")
      .map((c) => c.trim())
      .filter(Boolean);

    const payload: CreateCaminhaoPayload = {
      ...form,
      caracteristicas,
      ano: String(form.ano),
      km: String(form.km),
      preco: form.preco ? String(form.preco) : "",
    };

    try {
      if (editingId) {
        // ── ATUALIZAR ──
        await updateMutation.mutateAsync({ id: editingId, data: payload });
        toast.success("Caminhão atualizado com sucesso!", {
          description: `${payload.nome} foi atualizado no estoque.`,
        });
      } else {
        // ── CRIAR ──
        await createMutation.mutateAsync(payload);
        toast.success("Caminhão cadastrado com sucesso!", {
          description: `${payload.nome} foi adicionado ao estoque.`,
        });
      }
      resetForm();
    } catch (err: any) {
      if (err.fieldErrors) {
        const messages = Object.entries(err.fieldErrors)
          .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
          .join("\n");
        toast.error("Erro de validação", { description: messages });
      } else {
        toast.error(editingId ? "Erro ao atualizar" : "Erro ao cadastrar", {
          description: err.message || "Tente novamente.",
        });
      }
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success("Caminhão excluído com sucesso!", {
        description: `"${deleteTarget.nome}" foi removido do estoque.`,
      });
      setDeleteTarget(null);

      if (editingId === deleteTarget.id) {
        resetForm();
      }
    } catch (err: any) {
      toast.error("Erro ao excluir caminhão", {
        description: err.message || "Tente novamente.",
      });
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  // Filtragem de caminhões
  const filteredCaminhoes = (caminhoes || []).filter((c) => {
    const matchesSearch =
      !searchTerm ||
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.modelo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand = filterBrand === "Todos" || c.marca === filterBrand;
    const matchesStatus = filterStatus === "Todos" || c.status === filterStatus;

    return matchesSearch && matchesBrand && matchesStatus;
  });

  const totalDisponiveis = (caminhoes || []).filter(
    (c) => c.status === "Disponível" || c.status === "Pronta Entrega"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* Hero / Admin Header */}
      <section className="relative pt-32 pb-12 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,90,0,0.2),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary-light text-xs font-bold uppercase tracking-wider mb-3">
                <Truck size={14} />
                Painel Administrativo
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
                Gestão de Estoque de Caminhões
              </h1>
              <p className="text-slate-400 text-sm sm:text-base mt-1">
                Adicione, edite, gerencie fotos e controle os caminhões cadastrados.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700 hover:text-white"
                onClick={() => refetch()}
              >
                <RefreshCw size={16} className="mr-2" />
                Atualizar Dados
              </Button>

              <Button
                className="bg-primary hover:bg-primary-light text-white font-bold shadow-lg shadow-primary/25"
                onClick={() => {
                  if (showForm && !editingId) {
                    resetForm();
                  } else {
                    resetForm();
                    setShowForm(true);
                  }
                }}
              >
                <Plus size={18} className="mr-2" />
                {showForm && !editingId ? "Fechar Formulário" : "Novo Caminhão"}
              </Button>

              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 bg-red-950/30 hover:bg-red-600 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total em Estoque</p>
              <p className="text-2xl sm:text-3xl font-display font-black text-white mt-1">
                {caminhoes?.length || 0} <span className="text-sm font-normal text-slate-400">veículos</span>
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Disponíveis / Pronta Entrega</p>
              <p className="text-2xl sm:text-3xl font-display font-black text-emerald-400 mt-1">
                {totalDisponiveis}
              </p>
            </div>
            <div className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Site Público</p>
              <Link
                to="/estoque"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-primary-light hover:text-white font-bold text-sm mt-2 transition-colors"
              >
                Visualizar Catálogo <ExternalLink size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário de Cadastro / Edição */}
      {showForm && (
        <section className="py-10 bg-slate-100 border-b border-slate-200 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-6 sm:p-8 bg-white border-slate-200 shadow-xl rounded-3xl">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      editingId ? "bg-amber-100 text-amber-600" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {editingId ? <Pencil size={22} /> : <Plus size={22} />}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
                      {editingId ? `Editando Caminhão #${editingId}` : "Cadastrar Novo Caminhão"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Preencha os campos abaixo para atualizar as informações no catálogo.
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                  className="text-slate-500 hover:text-slate-900"
                >
                  <X size={18} className="mr-1" />
                  Fechar
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Linha 1 — Nome, Marca, Modelo, Status */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="nome">Título / Nome do Caminhão *</Label>
                    <Input
                      id="nome"
                      placeholder="Ex: Volkswagen Constellation 24.280"
                      value={form.nome}
                      onChange={(e) => handleChange("nome", e.target.value)}
                      required
                      minLength={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="marca">Marca *</Label>
                    <Select
                      value={form.marca}
                      onValueChange={(v) => handleChange("marca", v)}
                    >
                      <SelectTrigger id="marca">
                        <SelectValue placeholder="Selecione a marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {MARCAS_SUGERIDAS.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status do Veículo *</Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) =>
                        handleChange("status", v as CreateCaminhaoPayload["status"])
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Linha 2 — Modelo, Ano, Quilometragem, Preço, Cor, Combustível */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="modelo">Modelo / Versão *</Label>
                    <Input
                      id="modelo"
                      placeholder="Ex: 24.280 V-Tronic / Prime"
                      value={form.modelo}
                      onChange={(e) => handleChange("modelo", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ano">Ano Fabricação/Modelo *</Label>
                    <Input
                      id="ano"
                      placeholder="Ex: 2021"
                      value={form.ano}
                      onChange={(e) => handleChange("ano", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="km">Quilometragem (km) *</Label>
                    <Input
                      id="km"
                      placeholder="Ex: 275.000"
                      value={form.km}
                      onChange={(e) => handleChange("km", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cor">Cor *</Label>
                    <Input
                      id="cor"
                      placeholder="Ex: Branco"
                      value={form.cor}
                      onChange={(e) => handleChange("cor", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço de Venda</Label>
                    <Input
                      id="preco"
                      placeholder="Ex: R$ 325.000"
                      value={form.preco || ""}
                      onChange={(e) => handleChange("preco", e.target.value)}
                    />
                  </div>
                </div>

                {/* Linha 3 — Especificações Técnicas (Motor, Potência, Torque, Câmbio, Eixos, PBT, Cabine) */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Gauge size={16} className="text-primary" />
                    Ficha Técnica & Especificações
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="motor" className="text-xs">Motor</Label>
                      <Input
                        id="motor"
                        placeholder="Ex: MAN D08 36 280"
                        value={form.motor}
                        onChange={(e) => handleChange("motor", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="potencia" className="text-xs">Potência</Label>
                      <Input
                        id="potencia"
                        placeholder="Ex: 277 cv"
                        value={form.potencia}
                        onChange={(e) => handleChange("potencia", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="torque" className="text-xs">Torque</Label>
                      <Input
                        id="torque"
                        placeholder="Ex: 107 kgfm"
                        value={form.torque}
                        onChange={(e) => handleChange("torque", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="cambio" className="text-xs">Câmbio / Transmissão</Label>
                      <Input
                        id="cambio"
                        placeholder="Ex: ZF 9S 1110 TD (9 marchas)"
                        value={form.cambio}
                        onChange={(e) => handleChange("cambio", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="eixos" className="text-xs">Tração / Eixos</Label>
                      <Input
                        id="eixos"
                        placeholder="Ex: 6x2"
                        value={form.eixos}
                        onChange={(e) => handleChange("eixos", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="pbt" className="text-xs">PBT (Peso Bruto Total)</Label>
                      <Input
                        id="pbt"
                        placeholder="Ex: 23.000 kg"
                        value={form.pbt}
                        onChange={(e) => handleChange("pbt", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="entre_eixos" className="text-xs">Entre-Eixos</Label>
                      <Input
                        id="entre_eixos"
                        placeholder="Ex: 4.600 mm"
                        value={form.entre_eixos}
                        onChange={(e) => handleChange("entre_eixos", e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="cabine" className="text-xs">Tipo de Cabine</Label>
                      <Input
                        id="cabine"
                        placeholder="Ex: Leito / Teto Alto"
                        value={form.cabine}
                        onChange={(e) => handleChange("cabine", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Linha 4 — Imagem de Capa e Descrição */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <ImageUpload
                    label="Foto Principal (Capa do Caminhão) *"
                    variant="banner"
                    value={form.image_banner || undefined}
                    onUpload={(url) => handleChange("image_banner", url)}
                    onRemove={() => handleChange("image_banner", "")}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição do Veículo</Label>
                    <textarea
                      id="descricao"
                      rows={5}
                      placeholder="Descreva o estado de conservação, revisões, pneus, documentação e diferenciais..."
                      value={form.descricao}
                      onChange={(e) => handleChange("descricao", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>

                {/* Linha 5 — Galeria de Fotos Adicionais */}
                <MultiImageUpload
                  label="Galeria de Fotos Detalhadas (Interior, Motor, Pneus, Carroceria)"
                  value={form.images || []}
                  onChange={(urls) => setForm((prev) => ({ ...prev, images: urls }))}
                  max={12}
                />

                {/* Linha 6 — Características Adicionais */}
                <div className="space-y-2">
                  <Label htmlFor="caracteristicas">
                    Características & Opcionais (um item por linha)
                  </Label>
                  <textarea
                    id="caracteristicas"
                    rows={3}
                    placeholder={"Ar condicionado\nVidros elétricos\nFreio motor Top Brake\nSuspensão a ar"}
                    value={caracteristicasText}
                    onChange={(e) => setCaracteristicasText(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  />
                </div>

                {/* Botões de Ação do Form */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    disabled={isSaving}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className={`min-w-[180px] font-bold ${
                      editingId
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "bg-primary hover:bg-primary-light text-white"
                    }`}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        {editingId ? "Salvando Alterações..." : "Cadastrando..."}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={18} className="mr-2" />
                        {editingId ? "Salvar Alterações" : "Cadastrar Caminhão"}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </section>
      )}

      {/* Listagem de Caminhões */}
      <section className="py-12 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filtros da Listagem */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nome, marca ou modelo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="w-full sm:w-44">
                <Select value={filterBrand} onValueChange={setFilterBrand}>
                  <SelectTrigger className="h-10 bg-slate-50">
                    <SelectValue placeholder="Marca" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todas as Marcas</SelectItem>
                    {MARCAS_SUGERIDAS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-44">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="h-10 bg-slate-50">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos os Status</SelectItem>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={48} className="text-primary animate-spin mb-4" />
              <p className="text-slate-500 font-medium">Carregando catálogo do banco de dados...</p>
            </div>
          )}

          {/* Erro */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <AlertCircle size={48} className="text-red-500 mb-4" />
              <p className="text-lg font-bold text-slate-900 mb-1">Falha ao consultar estoque</p>
              <p className="text-sm text-slate-500 mb-4 max-w-md">
                {(error as Error)?.message || "Não foi possível carregar os dados. Verifique a conexão com o servidor."}
              </p>
              <Button onClick={() => refetch()} variant="outline" className="border-primary text-primary">
                <RefreshCw size={16} className="mr-2" />
                Tentar Novamente
              </Button>
            </div>
          )}

          {/* Cards Grid */}
          {!isLoading && !isError && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-slate-500">
                  Exibindo <span className="font-bold text-slate-900">{filteredCaminhoes.length}</span> de{" "}
                  <span className="font-bold text-slate-900">{caminhoes?.length || 0}</span> caminhões cadastrados
                </p>
              </div>

              {filteredCaminhoes.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                  <Truck size={48} className="text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Nenhum caminhão encontrado</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    {searchTerm || filterBrand !== "Todos" || filterStatus !== "Todos"
                      ? "Nenhum resultado corresponde aos filtros aplicados."
                      : "Seu estoque ainda não possui nenhum veículo cadastrado."}
                  </p>
                  <Button
                    className="bg-primary hover:bg-primary-light text-white font-bold"
                    onClick={() => {
                      resetForm();
                      setShowForm(true);
                    }}
                  >
                    <Plus size={16} className="mr-2" />
                    Cadastrar Primeiro Caminhão
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCaminhoes.map((caminhao) => (
                    <Card
                      key={caminhao.id}
                      className={`overflow-hidden bg-white border group transition-all duration-300 flex flex-col justify-between ${
                        editingId === caminhao.id
                          ? "ring-2 ring-amber-500 border-amber-500 shadow-xl"
                          : "border-slate-200 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1"
                      }`}
                    >
                      <div>
                        {/* Imagem de Capa */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          {caminhao.image_banner ? (
                            <img
                              src={caminhao.image_banner}
                              alt={caminhao.nome}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <Truck size={40} />
                            </div>
                          )}

                          {/* Status Badge */}
                          <Badge
                            className={`absolute top-3 left-3 shadow-md ${
                              caminhao.status === "Disponível" || caminhao.status === "Pronta Entrega"
                                ? "bg-emerald-600 text-white"
                                : caminhao.status === "Vendido" || caminhao.status === "Esgotado"
                                ? "bg-red-600 text-white"
                                : "bg-primary text-white"
                            }`}
                          >
                            {caminhao.status}
                          </Badge>

                          <Badge className="absolute top-3 right-3 bg-black/70 text-white text-[11px]">
                            ID: {caminhao.id}
                          </Badge>

                          {/* Botões de Ação Overlay */}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3">
                            <Button
                              size="sm"
                              className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg text-xs"
                              onClick={() => startEdit(caminhao)}
                            >
                              <Pencil size={14} className="mr-1" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white shadow-lg text-xs"
                              onClick={() => setDeleteTarget(caminhao)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              Excluir
                            </Button>
                            <Link
                              to={`/caminhao/${caminhao.id}`}
                              target="_blank"
                              className="inline-flex items-center justify-center h-9 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-sm transition-colors"
                            >
                              <ExternalLink size={14} className="mr-1" />
                              Ver
                            </Link>
                          </div>
                        </div>

                        {/* Dados do Caminhão */}
                        <div className="p-5 space-y-3">
                          <div>
                            <span className="text-xs font-bold text-primary tracking-wider uppercase">
                              {caminhao.marca}
                            </span>
                            <h3 className="text-base font-bold font-display text-slate-900 line-clamp-1 mt-0.5">
                              {caminhao.nome}
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-y-1 gap-x-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={13} className="text-primary" />
                              {caminhao.ano}
                            </span>
                            <span className="flex items-center gap-1">
                              <Gauge size={13} className="text-primary" />
                              {caminhao.km} km
                            </span>
                            <span className="flex items-center gap-1">
                              <Fuel size={13} className="text-primary" />
                              {caminhao.combustivel || "Diesel"}
                            </span>
                          </div>

                          {caminhao.cor && (
                            <p className="text-xs text-slate-400">
                              Cor: <span className="text-slate-700 font-medium">{caminhao.cor}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer do Card */}
                      <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                        <div>
                          <p className="text-[11px] text-slate-400">Preço</p>
                          <p className="text-lg font-bold font-display text-primary">
                            {caminhao.preco || "Sob Consulta"}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => startEdit(caminhao)}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                            title="Editar"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(caminhao)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Excluir"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Modal de Exclusão */}
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        onConfirm={handleDelete}
        itemName={deleteTarget?.nome || ""}
        isDeleting={deleteMutation.isPending}
      />

      <Footer />
    </div>
  );
}
