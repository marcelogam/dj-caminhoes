import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Estoque from './pages/Estoque';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import CaminhaoDetalhe from './pages/CaminhaoDetalhe';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminEstoquePage from './pages/AdminEstoquePage';
import { AdminRouteGuard } from './components/AdminRouteGuard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: false,
    },
  },
});

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/estoque"
          element={
            <>
              <Navbar />
              <Estoque />
              <Footer />
            </>
          }
        />
        <Route
          path="/sobre"
          element={
            <>
              <Navbar />
              <Sobre />
              <Footer />
            </>
          }
        />
        <Route
          path="/contato"
          element={
            <>
              <Navbar />
              <Contato />
              <Footer />
            </>
          }
        />
        <Route
          path="/caminhao/:id"
          element={
            <>
              <Navbar />
              <CaminhaoDetalhe />
              <Footer />
            </>
          }
        />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin/estoque"
          element={
            <AdminRouteGuard>
              <AdminEstoquePage />
            </AdminRouteGuard>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router>
        <AppRoutes />
      </Router>
    </QueryClientProvider>
  );
}

