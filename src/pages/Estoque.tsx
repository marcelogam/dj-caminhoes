import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, Calendar, Gauge, Fuel } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { allTrucks } from '../data/trucks';

const brands = ['Todos', 'Scania', 'Volvo', 'Mercedes-Benz', 'DAF'];

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      {children}
    </div>
  );
}

export default function Estoque() {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('Todos');

  const filteredTrucks = allTrucks.filter((truck) => {
    const matchSearch = truck.name.toLowerCase().includes(search.toLowerCase());
    const matchBrand = selectedBrand === 'Todos' || truck.brand === selectedBrand;
    return matchSearch && matchBrand;
  });

  return (
    <main className="bg-dark min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-4">
              Nosso <span className="text-gradient-red">Estoque</span>
            </h1>
            <p className="text-lg text-light-muted max-w-2xl mx-auto">
              Explore nosso catálogo completo de caminhões. Todos revisados e prontos para rodar.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-dim" />
            <input
              id="search-input"
              type="text"
              placeholder="Buscar caminhão..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-dark-card border border-dark-border rounded-xl text-white placeholder-light-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          {/* Brand filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <Filter size={18} className="text-light-dim shrink-0" />
            {brands.map((brand) => (
              <button
                key={brand}
                id={`filter-${brand.toLowerCase().replace(/[^a-z]/g, '')}`}
                onClick={() => setSelectedBrand(brand)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedBrand === brand
                    ? 'bg-primary text-white'
                    : 'bg-dark-card border border-dark-border text-light-muted hover:text-white hover:border-primary/30'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredTrucks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-light-muted text-lg">Nenhum caminhão encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrucks.map((truck, i) => (
              <AnimatedSection key={truck.id} className={`delay-${Math.min((i + 1) * 100, 600)}`}>
                <Link
                  to={`/caminhao/${truck.id}`}
                  className="group block bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={truck.image}
                      alt={truck.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />
                    <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-lg">
                      {truck.tag}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-primary transition-colors">
                      {truck.name}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-light-muted">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-primary" />
                        {truck.year}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gauge size={14} className="text-primary" />
                        {truck.km} km
                      </span>
                      <span className="flex items-center gap-1">
                        <Fuel size={14} className="text-primary" />
                        {truck.fuel}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-dark-border flex items-center justify-between">
                      <span className="text-primary font-display font-bold text-lg">{truck.price}</span>
                      <span className="flex items-center gap-1 text-sm text-light-muted group-hover:text-primary transition-colors">
                        Ver detalhes
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
