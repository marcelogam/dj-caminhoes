import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  ChevronRight,
  ChevronLeft,
  Share2,
  Heart,
  Phone,
  Shield,
  Cog,
  CheckCircle2,
  Truck,
  Zap,
  Settings,
  RotateCcw,
  Ruler,
  PaintBucket,
  CreditCard,
} from 'lucide-react';
import { getTruckById, getRelatedTrucks } from '../data/trucks';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function AnimatedSection({
  children,
  className = '',
  animation = 'animate-fade-in-up',
}: {
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

export default function CaminhaoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [liked, setLiked] = useState(false);

  const truck = getTruckById(Number(id));
  const relatedTrucks = getRelatedTrucks(Number(id));

  if (!truck) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-black text-slate-900 mb-4">Caminhão não encontrado</h1>
          <p className="text-slate-500 mb-8">O caminhão que você procura não está disponível.</p>
          <Link
            to="/estoque"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft size={18} />
            Voltar ao Estoque
          </Link>
        </div>
      </main>
    );
  }

  const specItems = [
    { icon: Cog, label: 'Motor', value: truck.specs.motor },
    { icon: Zap, label: 'Potência', value: truck.specs.potencia },
    { icon: RotateCcw, label: 'Torque', value: truck.specs.torque },
    { icon: Settings, label: 'Câmbio', value: truck.specs.cambio },
    { icon: Truck, label: 'Eixos', value: truck.specs.eixos },
    { icon: Gauge, label: 'PBT', value: truck.specs.pbt },
    { icon: Ruler, label: 'Entre-Eixos', value: truck.specs.entreEixos },
    { icon: Shield, label: 'Cabine', value: truck.specs.cabine },
    { icon: PaintBucket, label: 'Cor', value: truck.specs.cor },
    { icon: CreditCard, label: 'Placa', value: truck.specs.placa },
  ];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % truck.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + truck.images.length) % truck.images.length);

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <section className="pt-24 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-slate-900 transition-colors">
              Início
            </Link>
            <ChevronRight size={14} />
            <Link to="/estoque" className="hover:text-slate-900 transition-colors">
              Estoque
            </Link>
            <ChevronRight size={14} />
            <span className="text-primary">{truck.name}</span>
          </nav>
        </div>
      </section>

      {/* Back Button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          id="btn-back"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Voltar</span>
        </button>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="animate-fade-in">
            {/* Main Image */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 group mb-4">
              <img
                src={truck.images[currentImage]}
                alt={`${truck.name} - Foto ${currentImage + 1}`}
                className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Tag */}
              <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-lg">
                {truck.tag}
              </span>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                id="gallery-prev"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-slate-900 hover:bg-primary transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                id="gallery-next"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-slate-900 hover:bg-primary transition-colors opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={20} />
              </button>

              {/* Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-slate-900 text-xs px-3 py-1.5 rounded-lg">
                {currentImage + 1} / {truck.images.length}
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {truck.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 flex-1 h-20 sm:h-24 ${currentImage === i
                      ? 'border-primary shadow-lg shadow-primary/20'
                      : 'border-slate-200 hover:border-slate-200/80 opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="animate-fade-in-up">
            {/* Title & Actions */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs text-primary font-semibold tracking-wider uppercase">{truck.brand}</span>
                <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mt-1">{truck.name}</h1>
              </div>
              <div className="flex gap-2">
                <button
                  id="btn-like"
                  onClick={() => setLiked(!liked)}
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 ${liked
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30'
                    }`}
                >
                  <Heart size={18} className={liked ? 'fill-primary' : ''} />
                </button>
                <button
                  id="btn-share"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="w-10 h-10 rounded-xl border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 flex items-center justify-center transition-all"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-primary" />
                {truck.year}
              </span>
              <span className="w-1 h-1 rounded-full bg-dark-border" />
              <span className="flex items-center gap-1.5">
                <Gauge size={16} className="text-primary" />
                {truck.km} km
              </span>
              <span className="w-1 h-1 rounded-full bg-dark-border" />
              <span className="flex items-center gap-1.5">
                <Fuel size={16} className="text-primary" />
                {truck.fuel}
              </span>
            </div>

            {/* Price */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 mb-6">
              <p className="text-sm text-slate-500 mb-1">Preço</p>
              <p className="text-3xl sm:text-4xl font-display font-black text-gradient-primary">{truck.price}</p>
              <p className="text-xs text-slate-400 mt-2">* Consulte condições de financiamento</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-display font-bold text-slate-900 mb-3">Sobre este caminhão</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{truck.description}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no ${truck.name} ${truck.year} (ID: ${truck.id}). Gostaria de mais informações.`}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-whatsapp"
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-0.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chamar no WhatsApp
              </a>
              <a
                href="tel:+5511999999999"
                id="cta-phone"
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                <Phone size={18} />
                Ligar Agora
              </a>
            </div>

            {/* Financing Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard size={20} className="text-primary" />
                <h3 className="text-slate-900 font-semibold">Financiamento Facilitado</h3>
              </div>
              <p className="text-sm text-slate-500">
                Parcelas a partir de <span className="text-primary font-bold">R$ 8.500/mês</span>. Consulte condições
                especiais com nosso time comercial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs & Features Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Specs */}
          <AnimatedSection animation="animate-slide-left">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200">
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Cog size={22} className="text-primary" />
                Ficha Técnica
              </h2>
              <div className="space-y-0">
                {specItems.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-center gap-4 py-4 ${i !== specItems.length - 1 ? 'border-b border-slate-200' : ''
                      }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <spec.icon size={16} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400">{spec.label}</p>
                      <p className="text-sm text-slate-900 font-medium truncate">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Features */}
          <AnimatedSection animation="animate-slide-right">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200">
              <h2 className="text-xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle2 size={22} className="text-primary" />
                Equipamentos e Opcionais
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {truck.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 border border-slate-200/50 hover:border-primary/20 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-primary" />
                    </div>
                    <span className="text-sm text-slate-500">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Trucks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatedSection className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
            Outros Caminhões que Podem te <span className="text-gradient-primary">Interessar</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedTrucks.map((rt, i) => (
            <AnimatedSection key={rt.id} className={`delay-${Math.min((i + 1) * 100, 400)}`}>
              <Link
                to={`/caminhao/${rt.id}`}
                className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={rt.image}
                    alt={rt.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-lg">
                    {rt.tag}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-base font-display font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {rt.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{rt.year}</span>
                    <span className="w-1 h-1 rounded-full bg-dark-border" />
                    <span>{rt.km} km</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-primary font-display font-bold">{rt.price}</span>
                    <ChevronRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </main>
  );
}
