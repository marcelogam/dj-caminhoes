import { Shield, Target, Eye, Users, Award, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import fleetImg from '../assets/images/truck-fleet.png';
import serviceImg from '../assets/images/service-center.png';

function AnimatedSection({ children, className = '', animation = 'animate-fade-in-up' }: {
  children: React.ReactNode;
  className?: string;
  animation?: string;
}) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`${className} ${isVisible ? animation : 'opacity-0'}`}>
      {children}
    </div>
  );
}

const values = [
  { icon: Shield, title: 'Confiança', desc: 'Transparência total em cada negociação. Sem surpresas.' },
  { icon: Target, title: 'Compromisso', desc: 'Dedicação máxima para encontrar o caminhão ideal para você.' },
  { icon: Eye, title: 'Transparência', desc: 'Laudos técnicos e histórico completo de cada veículo.' },
  { icon: Users, title: 'Relacionamento', desc: 'Clientes que voltam e indicam. Esse é nosso maior orgulho.' },
  { icon: Award, title: 'Qualidade', desc: 'Apenas caminhões que passam por nossa rigorosa inspeção.' },
  { icon: TrendingUp, title: 'Evolução', desc: 'Sempre buscando melhorar nossos processos e atendimento.' },
];

export default function Sobre() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-slate-900 mb-4">
              Sobre a <span className="text-gradient-primary">DJ Caminhões</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Conheça a história por trás de uma das concessionárias de caminhões mais confiáveis do Brasil.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="animate-slide-left">
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4">
                Nossa História
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-6">
                Mais de <span className="text-gradient-primary">15 anos</span> movendo o Brasil
              </h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>
                  A DJ Caminhões nasceu da paixão pelo transporte rodoviário e da vontade de fazer diferente 
                  no mercado de caminhões. Desde o início, nosso compromisso foi oferecer veículos de qualidade 
                  com atendimento personalizado.
                </p>
                <p>
                  Ao longo dos anos, construímos uma reputação sólida baseada na confiança, transparência e 
                  no cuidado com cada cliente. Cada caminhão que sai da nossa loja passa por uma inspeção 
                  rigorosa, garantindo segurança e tranquilidade.
                </p>
                <p>
                  Hoje, somos referência no setor, com mais de 500 caminhões vendidos e uma base de 
                  clientes fiéis que nos indicam para amigos e parceiros.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="animate-slide-right">
              <div className="relative">
                <img src={fleetImg} alt="Frota DJ Caminhões" className="w-full rounded-3xl shadow-2xl shadow-black/50" />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-3xl font-display font-black">15+</p>
                  <p className="text-sm text-slate-900/80">Anos no mercado</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="animate-slide-left">
              <img src={serviceImg} alt="Missão DJ Caminhões" className="w-full rounded-3xl shadow-2xl shadow-black/50" />
            </AnimatedSection>

            <AnimatedSection animation="animate-slide-right">
              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-white border border-slate-200">
                  <h3 className="text-xl font-display font-bold text-primary mb-2">🎯 Missão</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Oferecer os melhores caminhões do mercado com atendimento humanizado, preços justos 
                    e condições que impulsionam o sucesso dos nossos clientes.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-200">
                  <h3 className="text-xl font-display font-bold text-primary mb-2">👁️ Visão</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Ser a concessionária de caminhões mais confiável e admirada do Brasil, reconhecida 
                    pela excelência no atendimento e qualidade dos veículos.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-slate-200">
                  <h3 className="text-xl font-display font-bold text-primary mb-2">💎 Valores</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Integridade, compromisso, respeito ao cliente e busca constante pela excelência.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-4">
              O que nos <span className="text-gradient-primary">Move</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Nossos valores são o alicerce de tudo que fazemos na DJ Caminhões.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <AnimatedSection key={val.title} className={`delay-${Math.min((i + 1) * 100, 600)}`}>
                <div className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <val.icon size={24} className="text-primary" />
                  </div>
                  <h4 className="text-slate-900 font-display font-bold text-lg mb-2">{val.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
