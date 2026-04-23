import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, User, AtSign, FileText, Loader2, AlertCircle } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import emailjs from '@emailjs/browser';

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

export default function Contato() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setErrorMsg('Ocorreu um erro ao enviar a mensagem. Tente novamente ou entre em contato pelo WhatsApp.');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Telefone', value: '(11) 99999-9999', href: 'tel:+5511999999999' },
    { icon: Mail, label: 'E-mail', value: 'contato@djcaminhoes.com.br', href: 'mailto:contato@djcaminhoes.com.br' },
    { icon: MapPin, label: 'Endereço', value: 'Av. Brasil, 1500 - São Paulo, SP', href: '#' },
    { icon: Clock, label: 'Horário', value: 'Seg-Sex: 08h-18h | Sáb: 08h-13h', href: '#' },
  ];

  return (
    <main className="bg-dark min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white mb-4">
              Fale <span className="text-gradient-red">Conosco</span>
            </h1>
            <p className="text-lg text-light-muted max-w-2xl mx-auto">
              Estamos prontos para te atender. Entre em contato e tire todas as suas dúvidas.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info, i) => (
            <AnimatedSection key={info.label} className={`delay-${(i + 1) * 100}`}>
              <a
                href={info.href}
                className="group block p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <info.icon size={22} className="text-primary" />
                </div>
                <h3 className="text-white font-semibold mb-1">{info.label}</h3>
                <p className="text-sm text-light-muted">{info.value}</p>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <AnimatedSection animation="animate-slide-left">
            <div className="p-8 rounded-3xl bg-dark-card border border-dark-border">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-white">Envie uma Mensagem</h2>
                  <p className="text-sm text-light-muted">Responderemos o mais rápido possível</p>
                </div>
              </div>

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-2">
                  ✅ Mensagem enviada com sucesso! Entraremos em contato em breve.
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  {errorMsg}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-dim" />
                  <input
                    id="contact-name"
                    name="from_name"
                    type="text"
                    placeholder="Seu nome"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={status === 'loading'}
                    className="w-full pl-11 pr-4 py-3.5 bg-dark border border-dark-border rounded-xl text-white placeholder-light-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <AtSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-dim" />
                    <input
                      id="contact-email"
                      name="from_email"
                      type="email"
                      placeholder="Seu e-mail"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={status === 'loading'}
                      className="w-full pl-11 pr-4 py-3.5 bg-dark border border-dark-border rounded-xl text-white placeholder-light-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-dim" />
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Seu telefone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={status === 'loading'}
                      className="w-full pl-11 pr-4 py-3.5 bg-dark border border-dark-border rounded-xl text-white placeholder-light-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-light-dim" />
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Assunto"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={status === 'loading'}
                    className="w-full pl-11 pr-4 py-3.5 bg-dark border border-dark-border rounded-xl text-white placeholder-light-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Sua mensagem..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  disabled={status === 'loading'}
                  className="w-full px-4 py-3.5 bg-dark border border-dark-border rounded-xl text-white placeholder-light-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>
          </AnimatedSection>

          {/* Map */}
          <AnimatedSection animation="animate-slide-right">
            <div className="h-full min-h-[500px] rounded-3xl overflow-hidden border border-dark-border relative">
              <iframe
                title="Localização DJ Caminhões"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1976580696626!2d-46.63611632375591!3d-23.561684961671685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c7f481fd9f%3A0x9982bfde638d30a1!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1682000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/5511999999999"
        id="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all hover:scale-110 hover:-translate-y-1"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}
