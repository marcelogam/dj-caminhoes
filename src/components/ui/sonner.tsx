import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-900 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl font-sans",
          description: "group-[.toast]:text-slate-500",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-white font-medium",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-700 font-medium",
          success: "group-[.toast]:border-emerald-200",
          error: "group-[.toast]:border-red-200",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
