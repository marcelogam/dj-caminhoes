import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import logo from '../assets/images/logo.png';

export default function Footer() {
  return (
    <footer className="dj-footer" id="footer">
      <div className="dj-container">
        <div className="dj-footer-callout">
          <div><span className="dj-eyebrow">O próximo passo é seu</span><h2>Vamos colocar seu<br />negócio na estrada?</h2></div>
          <Link className="dj-button" to="/contato">Falar com um consultor <ArrowUpRight size={20} /></Link>
        </div>
        <div className="dj-footer-grid">
          <div><Link to="/" className="dj-footer-brand"><img src={logo} alt="DJ Caminhões" /></Link><p>Caminhões, boas conversas<br />e novos caminhos.</p></div>
          <div><h3>Explore</h3><Link to="/">Início</Link><Link to="/estoque">Nosso estoque</Link><Link to="/sobre">Sobre a DJ</Link><Link to="/contato">Contato</Link></div>
          <div><h3>Venha nos visitar</h3><p>Av. Cel. Jove Soares Nogueira, 252<br />Riacho das Pedras · Contagem, MG<br />CEP 32260-470</p><p>Segunda a sexta · 08h às 18h<br />Sábado · 08h às 13h</p></div>
          <div><h3>Converse com a equipe</h3><a href="tel:+5531973279799" className="dj-footer-phone">(31) 97327-9799</a><a href="mailto:contato@djcaminhoes.com.br">contato@djcaminhoes.com.br</a></div>
        </div>
        <div className="dj-footer-bottom"><span>© {new Date().getFullYear()} DJ Caminhões. Todos os direitos reservados.</span><div><Link to="/admin/login">Área administrativa</Link><span>Desenvolvido por Ye7</span></div></div>
      </div>
    </footer>
  );
}
