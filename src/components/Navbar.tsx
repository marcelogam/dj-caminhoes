import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import logo from '../assets/images/logo.png';

const links = [['Início', '/'], ['Estoque', '/estoque'], ['Sobre a DJ', '/sobre'], ['Contato', '/contato']];
export default function Navbar() {
  const location = useLocation();
  return <Navigation key={location.key} />;
}
function Navigation() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="dj-header" id="navbar" onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}>
      <div className="dj-container dj-header-row">
        <Link to="/" className="dj-brand" aria-label="DJ Caminhões — início"><img src={logo} alt="DJ Caminhões" /><span>CAMINHÕES PARA<br />QUEM MOVE O BRASIL.</span></Link>
        <nav className="dj-desktop-nav" aria-label="Navegação principal">
          {links.map(([label, path]) => <Link key={path} to={path} aria-current={pathname === path ? 'page' : undefined}>{label}</Link>)}
        </nav>
        <Link to="/contato" className="dj-header-contact">Fale com a DJ <ArrowUpRight size={17} /></Link>
        <button className="dj-menu-toggle" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} aria-controls="dj-mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <nav id="dj-mobile-nav" className="dj-mobile-nav dj-container" aria-label="Navegação móvel" hidden={!open}>
        {links.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)} aria-current={pathname === path ? 'page' : undefined}>{label}<ArrowUpRight size={22} /></Link>)}
        <a href="tel:+5531973279799">(31) 97327-9799</a>
      </nav>
    </header>
  );
}
