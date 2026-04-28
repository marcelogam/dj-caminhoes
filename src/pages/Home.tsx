import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Handshake, Truck, Star, ChevronRight, Wrench, FileCheck, CreditCard } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

import heroImg from '../assets/images/Gemini_Generated_Image_mwvuq0mwvuq0mwvu.png';
import serviceImg from '../assets/images/service-center.png';
import fleetImg from '../assets/images/truck-fleet.png';
import { allTrucks } from '../data/trucks';

const featuredTrucks = allTrucks.slice(0, 4);

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
  return (
    <main className="bg-white min-h-screen">
      {/* ========== HERO ========== */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="DJ Caminhões Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Decorative */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-slate-900 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
                <Star size={14} className="fill-primary" />
                Referência em Caminhões
              </span>
            </div>

            <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-5xl lg:text-7xl font-display font-black text-slate-900 leading-[1.1] mb-6">
              Seu Próximo{' '}
              <span className="text-gradient-primary">Caminhão</span>{' '}
              Está Aqui
            </h1>

            <p className="animate-fade-in-up delay-200 text-lg text-slate-900 max-w-lg mb-10 leading-relaxed">
              Na DJ Caminhões você encontra as melhores ofertas em caminhões novos e seminovos,
              com financiamento facilitado e garantia de procedência.
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4">
              <Link
                to="/estoque"
                id="hero-cta-estoque"
                className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 animate-pulse-glow"
              >
                Ver Estoque
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5511999999999"
                id="hero-cta-whatsapp"
                className="flex items-center justify-center gap-2 glass text-slate-900 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-slate-900/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
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

      {/* ========== FEATURED TRUCKS ========== */}
      <section id="featured-trucks" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
              <Truck size={14} />
              Destaques
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-4">
              Caminhões em <span className="text-gradient-primary">Destaque</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Confira os caminhões mais procurados da nossa loja. Qualidade e procedência garantidas.
            </p>
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
                    <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-lg">
                      {truck.tag}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">
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

      {/* ========== SERVICES ========== */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimatedSection animation="animate-slide-left">
                <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
                  <Award size={14} />
                  Nossos Serviços
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-6">
                  Mais do que Vender,{' '}
                  <span className="text-gradient-primary">Cuidamos de Tudo</span>
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
            <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
              <Handshake size={14} />
              Por que nos escolher
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-slate-900 mb-4">
              A <span className="text-gradient-primary">Confiança</span> que Você Precisa
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
