import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { loginAdmin } from "@/lib/api";
import { toast } from "sonner";
import logo from "@/assets/images/logo.jpeg";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/admin/estoque";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Por favor, digite a senha de acesso.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await loginAdmin(password);
      toast.success("Autenticado com sucesso!", {
        description: "Bem-vindo ao painel de estoque DJ Caminhões.",
      });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Senha incorreta. Tente novamente.");
      toast.error("Erro na autenticação", {
        description: err.message || "Senha incorreta.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-950">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,90,0,0.15),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(255,90,0,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoMnY0aC0yem0tNiA2di00aDJ2NGgtMnptMC02di00aDJ2NGgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />

      {/* Card Central de Login */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-slate-400 hover:text-white text-sm mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1 transition-transform" />
            Voltar para o site principal
          </Link>

          <div className="flex justify-center mb-4">
            <div className="w-24 h-16 rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-white/5 flex items-center justify-center p-1">
              <img src={logo} alt="DJ Caminhões" className="w-full h-full object-cover rounded-xl" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
            <Lock size={12} />
            Área Administrativa
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
            Painel de Gestão
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Controle de Estoque & Veículos — DJ Caminhões
          </p>
        </div>

        <Card className="p-6 sm:p-8 bg-slate-900/90 backdrop-blur-xl border-slate-800 shadow-2xl rounded-3xl text-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-sm font-semibold text-slate-200">
                Senha do Administrador
              </Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha de acesso..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                  className="pr-11 py-5 bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-primary focus-visible:border-primary"
                  autoFocus
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-400 font-medium mt-1.5 animate-fade-in">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary-light text-white font-bold py-5 rounded-xl shadow-lg shadow-primary/25 transition-all text-base cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verificando credenciais...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Entrar no Painel
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
            <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
              <Truck size={14} className="text-primary" />
              Acesso exclusivo para administradores da DJ Caminhões.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
