import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, verifyAdminSession } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const location = useLocation();
  const [checking, setChecking] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      if (!isAuthenticated()) {
        if (isMounted) {
          setAuthorized(false);
          setChecking(false);
        }
        return;
      }

      // Validar o token no servidor
      const isValid = await verifyAdminSession();
      if (isMounted) {
        setAuthorized(isValid);
        setChecking(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
        <p className="text-sm text-slate-400">Verificando autorização...</p>
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
