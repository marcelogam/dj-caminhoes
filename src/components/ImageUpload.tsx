import { useState, useRef } from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';
import { uploadImage } from '@/lib/api';

interface ImageUploadProps {
  value?: string;
  onUpload: (url: string) => void;
  onRemove: () => void | Promise<void>;
  onBusyChange?: (busy: boolean) => void;
  disabled?: boolean;
  label?: string;
  variant?: 'banner' | 'thumbnail';
}
export function ImageUpload({ value, onUpload, onRemove, onBusyChange, disabled = false, label = 'Imagem', variant = 'banner' }: ImageUploadProps) {
  const [operation, setOperation] = useState<'upload' | 'remove' | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const locked = useRef(false);
  const busy = disabled || operation !== null;
  const banner = variant === 'banner';
  async function run(kind: 'upload' | 'remove', action: () => Promise<void>) {
    if (disabled || locked.current) return;
    locked.current = true;
    setError(null);
    setOperation(kind);
    onBusyChange?.(true);
    try { await action(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível concluir. Tente novamente.'); }
    finally { locked.current = false; setOperation(null); onBusyChange?.(false); }
  }
  async function handleFile(file: File) {
    if (busy || locked.current) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      setError('Use JPG, PNG, WebP ou AVIF.'); return;
    }
    if (file.size > 10 * 1024 * 1024) { setError('Imagem muito grande. Máximo 10MB.'); return; }
    await run('upload', async () => { const result = await uploadImage(file); onUpload(result.url); });
  }
  return (
    <div className="space-y-2" aria-busy={operation !== null}>
      {label && <p className="text-sm font-semibold text-slate-800">{label}</p>}
      {value ? (
        <div className={'relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 ' + (banner ? 'aspect-[16/9]' : 'w-28 h-28')}>
          <img src={value} alt={label || 'Foto do caminhão'} className="w-full h-full object-cover" />
          <button type="button" disabled={busy} onClick={() => void run('remove', async () => { await onRemove(); })}
            aria-label={label ? 'Remover ' + label : 'Remover foto'}
            className="absolute bottom-2 right-2 flex items-center gap-1 bg-red-700 text-white px-2 py-2 rounded-lg text-xs shadow disabled:opacity-60">
            {operation === 'remove' ? <Loader2 size={15} className="animate-spin" /> : <X size={15} />}
            {operation === 'remove' ? 'Removendo…' : 'Remover'}
          </button>
        </div>
      ) : (
        <button type="button" disabled={busy}
          onClick={() => input.current?.click()}
          onDragOver={(event) => { event.preventDefault(); if (!busy) setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => { event.preventDefault(); setDragOver(false); const file = event.dataTransfer.files[0]; if (file) void handleFile(file); }}
          className={'flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl bg-slate-50 disabled:opacity-60 ' + (banner ? 'w-full aspect-[16/9] p-8 ' : 'w-28 h-28 p-2 ') + (dragOver ? 'border-primary' : 'border-slate-300')}>
          {operation === 'upload' ? <Loader2 size={26} className="animate-spin text-primary" /> : banner ? <Upload size={26} className="text-primary" /> : <ImageIcon size={22} className="text-slate-400" />}
          <span className="text-sm">{operation === 'upload' ? 'Enviando…' : banner ? 'Arraste uma foto ou clique para selecionar' : 'Adicionar'}</span>
          {banner && <span className="text-xs text-slate-500">JPG, PNG, WebP ou AVIF · Máx. 10MB</span>}
        </button>
      )}
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden disabled={busy}
        onChange={(event) => { const file = event.target.files?.[0]; event.target.value = ''; if (file) void handleFile(file); }} />
      {error && <p role="alert" className="text-xs text-red-700 max-w-sm">{error}</p>}
    </div>
  );
}
interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void | Promise<void>;
  onBusyChange?: (busy: boolean) => void;
  disabled?: boolean;
  label?: string;
  max?: number;
}
export function MultiImageUpload({ value = [], onChange, onRemove, onBusyChange, disabled, label = 'Galeria de fotos', max = 12 }: MultiImageUploadProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-800">{label} <span className="font-normal text-slate-500">({value.length}/{max})</span></p>
      <div className="flex flex-wrap gap-3">
        {value.map((url, index) => <ImageUpload key={url + index} value={url} variant="thumbnail" label=""
          onUpload={() => {}} onRemove={() => onRemove(url)} onBusyChange={onBusyChange} disabled={disabled} />)}
        {value.length < max && <ImageUpload variant="thumbnail" label="" onUpload={(url) => onChange([...value, url])}
          onRemove={() => {}} onBusyChange={onBusyChange} disabled={disabled} />}
      </div>
    </div>
  );
}
