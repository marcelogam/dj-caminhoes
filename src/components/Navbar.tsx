import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Truck } from 'lucide-react';
import logo from '../assets/images/dj-logo.jpg';

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Estoque', path: '/estoque' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Contato', path: '/contato' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/95 backdrop-blur-xl shadow-md shadow-black/5 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" id="nav-logo">
            <div className="w-16 h-16">
              <img src={logo} alt="DJ Caminhões" className="w-full h-full object-cover" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                id={`nav-${link.name.toLowerCase().replace(/[^a-z]/g, '')}`}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${location.pathname === link.path
                  ? 'text-primary bg-primary/10'
                  : 'text-slate-900 hover:text-slate-500 hover:bg-white/5'
                  }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+5511999999999"
              id="nav-phone"
              className="flex items-center gap-2 text-sm text-slate-900 hover:text-slate-500 transition-colors"
            >
              <Phone size={16} />
              <span>(11) 99999-9999</span>
            </a>
            <Link
              to="/contato"
              id="nav-cta"
              className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              <Truck size={16} />
              Fale Conosco
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-900 p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-slate-50/95 backdrop-blur-xl border-t border-slate-200 px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                ? 'text-primary bg-primary/10'
                : 'text-slate-500 hover:text-white hover:bg-white/5'
                }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-200">
            <Link
              to="/contato"
              className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl text-sm font-semibold w-full"
            >
              <Truck size={16} />
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
