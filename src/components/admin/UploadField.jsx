import { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, fullUploadUrl } from "@/lib/api";
import { toast } from "sonner";

export default function UploadField({ value, onChange, label = "Картинка", testid = "upload-image" }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Файл слишком большой (максимум 8 МБ)");
      return;
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const { data } = await api.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange(data.url);
      toast.success("Файл загружен");
    } catch (e) {
      const detail = (e && e.response && e.response.data && e.response.data.detail) || "Ошибка загрузки";
      toast.error(detail);
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="flex items-center gap-3">
        {value ? (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
            <img src={fullUploadUrl(value)} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => onChange("")} className="absolute top-1 right-1 bg-background/90 rounded-full p-1" aria-label="Удалить">
              <X className="w-3 h-3" />
            </button>
          </div>
        ) : (
          <div className="w-20 h-20 rounded-lg border border-dashed border-border bg-secondary/40 flex items-center justify-center text-muted-foreground">
            <ImageIcon className="w-6 h-6" />
          </div>
        )}
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files && e.target.files[0])}
          data-testid={testid + "-input"}
        />
        <Button type="button" variant="outline" disabled={busy} onClick={() => ref.current && ref.current.click()} data-testid={testid + "-button"} className="gap-2">
          <Upload className="w-4 h-4" /> {busy ? "Загрузка…" : "Загрузить"}
        </Button>
      </div>
    </div>
  );
}
