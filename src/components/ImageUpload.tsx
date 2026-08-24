import { useState, useRef, useCallback } from "react";
import { Upload, X, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/api";

interface ImageUploadProps {
  /** URL da imagem atual (se já existir) */
  value?: string;
  /** Callback chamado quando uma imagem é enviada com sucesso */
  onUpload: (url: string) => void;
  /** Callback chamado quando a imagem é removida */
  onRemove: () => void;
  /** Label exibido acima do componente */
  label?: string;
  /** Variante: "banner" (grande) ou "thumbnail" (pequena) */
  variant?: "banner" | "thumbnail";
}

export function ImageUpload({
  value,
  onUpload,
  onRemove,
  label = "Imagem",
  variant = "banner",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      // Validar tipo
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/avif"];
      if (!allowed.includes(file.type)) {
        setError("Tipo não permitido. Use JPG, PNG ou WebP.");
        return;
      }

      // Validar tamanho (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("Imagem muito grande. Máximo 10MB.");
        return;
      }

      setIsUploading(true);
      try {
        const result = await uploadImage(file);
        onUpload(result.url);
      } catch (err: any) {
        setError(err.message || "Erro ao enviar imagem");
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      // Reset input para permitir re-upload do mesmo arquivo
      e.target.value = "";
    },
    [handleFile]
  );

  const isBanner = variant === "banner";

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-slate-800 leading-none">
          {label}
        </label>
      )}

      {value ? (
        /* ─── Preview da imagem carregada ─── */
        <div
          className={`relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 ${
            isBanner ? "aspect-[16/9]" : "aspect-square w-28 h-28"
          }`}
        >
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onRemove}
              className="shadow-lg rounded-xl"
            >
              <X size={16} className="mr-1" />
              Remover
            </Button>
          </div>
        </div>
      ) : (
        /* ─── Área de upload (drag & drop) ─── */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            relative cursor-pointer rounded-2xl border-2 border-dashed
            transition-all duration-200 flex flex-col items-center justify-center gap-3 bg-slate-50/70
            ${isBanner ? "aspect-[16/9] p-8" : "aspect-square w-28 h-28 p-2"}
            ${
              isDragOver
                ? "border-primary bg-primary/10 scale-[1.01]"
                : "border-slate-300 hover:border-primary/60 hover:bg-primary/5"
            }
            ${isUploading ? "pointer-events-none opacity-60" : ""}
          `}
        >
          {isUploading ? (
            <>
              <Loader2
                size={isBanner ? 32 : 22}
                className="text-primary animate-spin"
              />
              <span className="text-xs text-slate-600 font-medium">
                Enviando...
              </span>
            </>
          ) : (
            <>
              {isBanner ? (
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <Upload size={24} />
                </div>
              ) : (
                <ImageIcon size={22} className="text-slate-400" />
              )}
              <div className="text-center">
                <p className="text-sm font-medium text-slate-700">
                  {isBanner
                    ? "Arraste uma foto ou clique para selecionar"
                    : "Adicionar"}
                </p>
                {isBanner && (
                  <p className="text-xs text-slate-400 mt-1">
                    JPG, PNG ou WebP • Máx. 10MB
                  </p>
                )}
              </div>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            className="hidden"
            onChange={handleInputChange}
          />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-600 font-medium mt-1">{error}</p>
      )}
    </div>
  );
}

/* ─── Componente de upload múltiplo para galeria ─── */

interface MultiImageUploadProps {
  /** URLs das imagens atuais */
  value: string[];
  /** Callback chamado quando a lista muda */
  onChange: (urls: string[]) => void;
  /** Label */
  label?: string;
  /** Máximo de imagens */
  max?: number;
}

export function MultiImageUpload({
  value = [],
  onChange,
  label = "Galeria de Fotos do Caminhão",
  max = 12,
}: MultiImageUploadProps) {
  const handleAddImage = (url: string) => {
    if (value.length < max) {
      onChange([...value, url]);
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-slate-800 leading-none flex items-center justify-between">
          <span>{label}</span>
          <span className="text-xs font-normal text-slate-400">
            {value.length}/{max} fotos
          </span>
        </label>
      )}

      <div className="flex flex-wrap gap-3">
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="relative group w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
          >
            <img
              src={url}
              alt={`Foto ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-700 cursor-pointer"
              title="Remover foto"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {value.length < max && (
          <ImageUpload
            variant="thumbnail"
            label=""
            onUpload={handleAddImage}
            onRemove={() => {}}
          />
        )}
      </div>
    </div>
  );
}
