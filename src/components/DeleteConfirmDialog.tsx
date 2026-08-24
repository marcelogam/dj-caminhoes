import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  /** Se true, o dialog está aberto */
  open: boolean;
  /** Callback para fechar o dialog */
  onOpenChange: (open: boolean) => void;
  /** Callback quando o usuário confirma a exclusão */
  onConfirm: () => void;
  /** Nome do item a ser excluído */
  itemName: string;
  /** Se true, mostra loading no botão de confirmar */
  isDeleting?: boolean;
}

export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  itemName,
  isDeleting = false,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white border-slate-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-slate-900">
            <Trash2 size={20} className="text-red-600" />
            Excluir Caminhão do Estoque
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600 text-sm">
            Tem certeza que deseja excluir o caminhão{" "}
            <span className="font-bold text-slate-900">"{itemName}"</span>?
            <br />
            <br />
            Esta ação é <span className="text-red-600 font-semibold">irreversível</span> e 
            removerá permanentemente o veículo do banco de dados e do site.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            className="border-slate-200"
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Excluindo...
              </>
            ) : (
              <>
                <Trash2 size={16} className="mr-2" />
                Sim, excluir
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
