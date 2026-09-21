import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Shield, Users, Target } from 'lucide-react';
import dealershipImage from '../assets/images/concessionaria.png';

export default function Sobre() {
  return (
    <main className="dj-home dj-about-page">
      <section className="dj-container dj-page-intro"><span className="dj-eyebrow">Sobre a DJ / Contagem, MG</span><h1>O seu negócio<br />move o nosso.</h1><p>Caminhões para trabalhar. Uma equipe para conversar.<br />Um novo caminho para seguir.</p></section>
      <section className="dj-container dj-section dj-about">
        <figure className="dj-about-photo"><img src={dealershipImage} alt="Fachada e pátio da DJ Caminhões em Contagem" width={1600} height={900} /><figcaption>DJ Caminhões · Contagem, MG</figcaption></figure>
        <div><span className="dj-eyebrow">Nossa maneira de trabalhar</span><h2>De perto.<br />De verdade.</h2><p>Escolher um caminhão é uma decisão que acompanha você por muitos quilômetros. Na DJ, o atendimento começa entendendo o que você precisa transportar e como o veículo vai fazer parte da sua rotina.</p><p>Conheça o estoque, tire suas dúvidas e venha conversar com a equipe em Contagem. Queremos ajudar você a fazer uma escolha bem informada.</p><Link className="dj-text-link" to="/estoque">Explore nosso estoque <ArrowUpRight size={20} /></Link></div>
      </section>
      <section className="dj-services"><div className="dj-container dj-section"><div className="dj-section-heading"><div><span className="dj-eyebrow">O que nos move</span><h2>Boas relações.<br />Novos caminhos.</h2></div></div><div className="dj-service-grid">
        {[{icon: Shield, title: 'Transparência', text: 'Uma conversa clara sobre o veículo e as condições de compra.'}, {icon: Users, title: 'Proximidade', text: 'Atendimento para entender a sua operação e responder às suas dúvidas.'}, {icon: Target, title: 'Compromisso', text: 'Atenção ao que importa para você escolher o próximo caminhão.'}].map(({icon: Icon, title, text}, index) => <div key={title}><div className="dj-service-top"><Icon size={25} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></div>)}
      </div></div></section>
      <section className="dj-container dj-section"><span className="dj-eyebrow">Nossa casa é em Contagem</span><h2>Passe aqui.<br />O café é por nossa conta.</h2><div className="dj-address"><MapPin size={22} /><span>Av. Cel. Jove Soares Nogueira, 252<br />Riacho das Pedras · Contagem, MG</span></div><Link className="dj-text-link" to="/contato">Planeje sua visita <ArrowUpRight size={20} /></Link></section>
    </main>
  );
}
