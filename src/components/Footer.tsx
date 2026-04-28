import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Truck, ChevronRight } from 'lucide-react';
import logo from '../assets/images/dj-logo.jpg';

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-50 border-t border-slate-200">
      {/* CTA Band */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-900">
            <Truck size={32} />
            <div>
              <h3 className="text-lg font-display font-bold">Pronto para encontrar seu caminhão ideal?</h3>
              <p className="text-sm text-slate-900/80">Entre em contato e faça seu orçamento sem compromisso</p>
            </div>
          </div>
          <Link
            to="/contato"
            className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 text-sm"
          >
            Falar com Consultor
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 ">
                <img src={logo} alt="DJ Caminhões" className="w-full h-full object-cover" />
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Referência na venda de caminhões novos e seminovos. Qualidade, confiança e as melhores condições do mercado.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:bg-primary/10 transition-all border border-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-500 hover:text-primary hover:bg-primary/10 transition-all border border-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-slate-900 font-display font-semibold mb-6">Navegação</h4>
            <ul className="space-y-3">
              {[
                { name: 'Início', path: '/' },
                { name: 'Estoque', path: '/estoque' },
                { name: 'Sobre Nós', path: '/sobre' },
                { name: 'Contato', path: '/contato' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors group"
                  >
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-slate-900 font-display font-semibold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Av. Brasil, 1500 - São Paulo, SP</span>
              </li>
              <li>
                <a href="tel:+5511999999999" className="flex items-center gap-3 text-sm text-slate-500 hover:text-primary transition-colors">
                  <Phone size={18} className="text-primary shrink-0" />
                  (11) 99999-9999
                </a>
              </li>
              <li>
                <a href="mailto:contato@djcaminhoes.com.br" className="flex items-center gap-3 text-sm text-slate-500 hover:text-primary transition-colors">
                  <Mail size={18} className="text-primary shrink-0" />
                  contato@djcaminhoes.com.br
                </a>
              </li>
            </ul>
          </div>

          {/* Horário */}
          <div>
            <h4 className="text-slate-900 font-display font-semibold mb-6">Horário</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-medium">Seg - Sex</p>
                  <p>08:00 - 18:00</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <Clock size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-900 font-medium">Sábado</p>
                  <p>08:00 - 13:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} DJ Caminhões. Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-400">
            Desenvolvido com ❤️ por Ye7
          </p>
        </div>
      </div>
    </footer>
  );
}
