import { Link } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, FileCheck, CreditCard, Wrench, MapPin, Truck } from 'lucide-react';
import { useEstoqueCaminhoes } from '@/hooks/useEstoqueCaminhoes';
import heroImage from '../assets/images/hero_image.png';
import serviceImage from '../assets/images/service-center.png';
import dealershipImage from '../assets/images/concessionaria.png';

const services = [
  { icon: FileCheck, title: 'Documentação', text: 'Orientação sobre os documentos e a transferência do seu caminhão.' },
  { icon: CreditCard, title: 'Financiamento', text: 'Converse sobre as opções de pagamento para o seu negócio.' },
  { icon: Wrench, title: 'Atenção aos detalhes', text: 'Consulte as informações do veículo e agende sua visita para conhecer de perto.' },
];
export default function Home() {
  const { data: trucks, isLoading, isError, refetch } = useEstoqueCaminhoes();
  const featured = (trucks ?? []).filter((truck) => !['Vendido', 'Esgotado'].includes(truck.status)).slice(0, 6);
  return (
    <main className="dj-home">
      <section className="dj-campaign" aria-labelledby="hero-title">
        <img className="dj-campaign-image" src={heroImage} alt="DJ Caminhões — os melhores caminhões para os melhores negócios. Compra, venda e troca de caminhões." fetchPriority="high" width={1672} height={941} />
        <div className="dj-container dj-campaign-content">
          <div><span className="dj-eyebrow"><span className="dj-dot" /> Contagem, Minas Gerais</span>
            <h1 id="hero-title">Seu próximo caminhão.<br /><span>Seu próximo negócio.</span></h1>
            <p>Conheça nosso estoque de caminhões e converse com a equipe da DJ.</p>
          </div>
          <div className="dj-campaign-actions"><Link className="dj-button" to="/estoque">Encontre seu caminhão <ArrowUpRight size={20} /></Link>
            <a className="dj-text-link" href="#featured-trucks">Explore o estoque <ArrowDown size={17} /></a>
          </div>
        </div>
      </section>
      <div className="dj-marque-strip"><div className="dj-container"><span>Prontos para o seu próximo capítulo.</span><span>Caminhões novos e seminovos <ArrowUpRight size={17} /></span></div></div>
      <section id="featured-trucks" className="dj-section dj-container">
        <div className="dj-section-heading"><div><span className="dj-eyebrow">01 / Nosso estoque</span><h2>O trabalho chama.<br />Escolha seu próximo.</h2></div><Link className="dj-text-link" to="/estoque">Ver todo o estoque <ArrowUpRight size={20} /></Link></div>
        {isLoading && <p className="dj-stock-message" role="status">Carregando os caminhões do estoque…</p>}
        {isError && <div className="dj-stock-message" role="status"><p>Não foi possível carregar o estoque agora.</p><button className="dj-text-link" onClick={() => void refetch()}>Tentar novamente <ArrowUpRight size={18} /></button></div>}
        {!isLoading && !isError && !featured.length && <div className="dj-stock-message"><p>Consulte a equipe para conhecer os caminhões disponíveis.</p><Link to="/contato" className="dj-text-link">Consultar disponibilidade <ArrowUpRight size={18} /></Link></div>}
        <div className="dj-stock-grid">{featured.map((truck, index) => (
          <Link className="dj-truck-card" to={'/caminhao/' + truck.id} key={truck.id}>
            <div className="dj-truck-photo">{truck.image_banner || truck.images?.[0] ? <img src={truck.image_banner || truck.images[0]} alt={truck.nome} loading="lazy" /> : <Truck size={48} />}<span className="dj-card-number">{String(index + 1).padStart(2, '0')}</span><span className="dj-card-arrow"><ArrowUpRight size={21} /></span></div>
            <div className="dj-truck-meta"><span>{truck.marca}</span><span>{truck.ano} · {truck.km} km</span></div>
            <h3>{truck.nome}</h3><p className="dj-truck-price">{truck.preco || 'Sob consulta'}</p>
          </Link>
        ))}</div>
      </section>
      <section className="dj-services"><div className="dj-container dj-section">
        <div className="dj-section-heading"><div><span className="dj-eyebrow">02 / Da escolha à estrada</span><h2>Mais do que vender.<br />Estar junto.</h2></div><p>Uma conversa direta, atenção ao que você precisa e apoio para dar o próximo passo.</p></div>
        <div className="dj-service-layout">
          <figure className="dj-service-photo"><img src={serviceImage} alt="Imagem ilustrativa de atendimento e manutenção em oficina de caminhões" loading="lazy" width={1024} height={1024} /><figcaption>Imagem ilustrativa.</figcaption></figure>
          <div className="dj-service-grid">{services.map(({ icon: Icon, title, text }, index) => <div key={title}><div className="dj-service-top"><Icon size={25} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div>
      </div></section>
      <section className="dj-container dj-section dj-about">
        <figure className="dj-about-photo"><img src={dealershipImage} alt="Fachada e pátio da DJ Caminhões em Contagem" loading="lazy" width={1600} height={900} /><figcaption>DJ Caminhões · Contagem, MG</figcaption></figure>
        <div><span className="dj-eyebrow">03 / Pode chegar</span><h2>Confiança começa<br />numa boa conversa.</h2><p>Um caminhão é parte do seu negócio. Por isso, vale olhar de perto, tirar as dúvidas e conhecer cada detalhe antes de decidir.</p><p>Visite a DJ em Contagem. Nossa equipe está aqui para ajudar você a encontrar o veículo para a sua próxima jornada.</p><div className="dj-address"><MapPin size={21} /><span>Av. Cel. Jove Soares Nogueira, 252<br />Riacho das Pedras · Contagem, MG</span></div><Link className="dj-text-link" to="/sobre">Conheça a DJ <ArrowUpRight size={20} /></Link></div>
      </section>
    </main>
  );
}
