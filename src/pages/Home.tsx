import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, ChevronRight, Wrench, FileCheck, CreditCard } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import heroImage from '../assets/images/hero_image.png'
import serviceImg from '../assets/images/service-center.png';
import fleetImg from '../assets/images/truck-fleet.png';
import { allTrucks, type Truck } from '../data/trucks';
import { useEstoqueCaminhoes } from '@/hooks/useEstoqueCaminhoes';


const stats = [
  { value: '500+', label: 'Caminhões Vendidos' },
  { value: '15+', label: 'Anos de Mercado' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '50+', label: 'Modelos Disponíveis' },
];

const services = [
  {
    icon: FileCheck,
    title: 'Documentação',
    desc: 'Cuidamos de toda a documentação e transferência para você.',
  },
  {
    icon: CreditCard,
    title: 'Financiamento',
    desc: 'Parcelas que cabem no seu bolso. Até 60x com taxa especial.',
  },
  {
    icon: Wrench,
    title: 'Revisão Completa',
    desc: 'Todos os caminhões passam por inspeção rigorosa.',
  },
  {
    icon: Shield,
    title: 'Garantia',
    desc: 'Garantia de motor e câmbio em todos os seminovos.',
  },
];

function AnimatedSection({ children, className = '', animation = 'animate-fade-in-up' }: {
  children: React.ReactNode;
  className?: string;
  animation?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animation : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const { data: dbTrucks } = useEstoqueCaminhoes();

  const featuredTrucks: Truck[] = useMemo(() => {
    if (dbTrucks && dbTrucks.length > 0) {
      return dbTrucks.slice(0, 8).map((t) => ({
        id: t.id,
        name: t.nome,
        year: String(t.ano),
        km: String(t.km),
        fuel: t.combustivel || 'Diesel',
        price: t.preco || 'Sob Consulta',
        image: t.image_banner || (t.images && t.images[0]) || '',
        images: t.images || (t.image_banner ? [t.image_banner] : []),
        brand: t.marca,
        description: t.descricao || '',
        specs: {
          motor: t.motor || '',
          potencia: t.potencia || '',
          torque: t.torque || '',
          cambio: t.cambio || '',
          eixos: t.eixos || '4x2',
          pbt: t.pbt || '',
          entreEixos: t.entre_eixos || '',
          cabine: t.cabine || 'Curta',
          tipo_carroceria: t.tipo_carroceria || 'Não especificado',
          cor: t.cor || 'Branco',
        },
      }));
    }
    return allTrucks.slice(0, 8);
  }, [dbTrucks]);

  return (
    <main className="bg-white min-h-screen">
      {/* ========== HERO ========== */}
      <section id="hero" className="relative h-auto md:h-[65vh] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="DJ Caminhões Hero"
          className="w-full h-auto pt-10 object-contain md:absolute md:inset-0 md:h-full md:object-cover"
        />
      </section>

      {/* ========== FEATURED TRUCKS ========== */}
      <section id="featured-trucks" className="py-6 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-display font-black mb-4">
              Caminhões em <span className="text-primary">Destaque</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTrucks.map((truck, i) => (
              <AnimatedSection key={truck.id} className={`delay-${(i + 1) * 100}`}>
                <Link
                  to={`/caminhao/${truck.id}`}
                  className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={truck.image}
                      alt={truck.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-3 space-y-3">
                    <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {truck.name}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{truck.year}</span>
                      <span className="w-1 h-1 rounded-full bg-dark-border" />
                      <span>{truck.km} km</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-primary font-display font-bold text-lg">{truck.price}</span>
                      <span className="text-slate-500 group-hover:text-primary transition-colors">
                        <ChevronRight size={20} />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              to="/estoque"
              id="featured-see-all"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold transition-colors group"
            >
              Ver todo o estoque
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section id="stats" className="relative py-20 border-y border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} className={`text-center delay-${(i + 1) * 100}`}>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-gradient-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection animation="animate-slide-left">
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-6">
                  Mais do que Vender, Cuidamos de Tudo
                </h2>
                <p className="text-slate-500 mb-10 leading-relaxed">
                  Do financiamento à documentação, da revisão à entrega, a DJ Caminhões oferece
                  uma experiência completa para você sair rodando com tranquilidade.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service, i) => (
                  <AnimatedSection key={service.title} className={`delay-${(i + 1) * 100}`} animation="animate-fade-in-up">
                    <div className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <service.icon size={20} className="text-primary" />
                      </div>
                      <h4 className="text-slate-900 font-semibold mb-1">{service.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection animation="animate-slide-right">
              <div className="relative">
                <img
                  src={serviceImg}
                  alt="Centro de Serviços DJ Caminhões"
                  className="w-full rounded-3xl shadow-2xl shadow-black/50"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-3xl font-display font-black">100%</p>
                  <p className="text-sm text-slate-900/80">Inspecionados</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== WHY US ========== */}
      <section id="why-us" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-4">
              A Confiança que Você Precisa
            </h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <AnimatedSection animation="animate-slide-left">
              <img
                src={fleetImg}
                alt="Frota DJ Caminhões"
                className="w-full rounded-3xl shadow-2xl shadow-black/50"
              />
            </AnimatedSection>

            <div className="space-y-6">
              {[
                {
                  title: 'Procedência Garantida',
                  desc: 'Todos os caminhões possuem histórico completo verificado e documentação em dia.',
                },
                {
                  title: 'Financiamento Facilitado',
                  desc: 'Parcerias com os melhores bancos para oferecer as menores taxas do mercado.',
                },
                {
                  title: 'Pós-Venda Dedicado',
                  desc: 'Nosso compromisso não termina na venda. Conte com suporte contínuo.',
                },
                {
                  title: 'Melhor Custo-Benefício',
                  desc: 'Preços competitivos e condições exclusivas para você investir com segurança.',
                },
              ].map((item, i) => (
                <AnimatedSection key={item.title} className={`delay-${(i + 1) * 100}`} animation="animate-fade-in-up">
                  <div className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 transition-all group">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1 group-hover:bg-primary/30 transition-colors">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section id="cta" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-dark" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTEydjRoMTJ6TTI0IDI0aDEydi0ySDI0djJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-6">
              Encontre o Caminhão Perfeito Para o Seu Negócio
            </h2>
            <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
              Fale com um dos nossos consultores e descubra as melhores condições de pagamento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/estoque"
                id="cta-estoque"
                className="bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Ver Estoque Completo
              </Link>
              <Link
                to="/contato"
                id="cta-contato"
                className="border-2 border-slate-900 text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                Falar com Consultor
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
