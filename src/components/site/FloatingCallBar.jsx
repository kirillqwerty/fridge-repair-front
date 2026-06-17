import { Phone, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPhoneHref } from "@/lib/api";

export default function FloatingCallBar({ phone }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 320);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!phone) return null;

  return (
    <div
      className={`md:hidden fixed left-3 right-3 bottom-3 z-50 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className="flex gap-2 bg-background/95 border border-border soft-shadow rounded-2xl p-2 backdrop-blur-md">
        <a
          href={formatPhoneHref(phone)}
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-medium"
          data-testid="floating-call-button"
        >
          <Phone className="w-4 h-4" /> Позвонить
        </a>
        <a
          href="#lead"
          className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-xl bg-secondary text-secondary-foreground border border-border font-medium"
          data-testid="floating-master-button"
        >
          <Wrench className="w-4 h-4" /> Вызвать мастера
        </a>
      </div>
    </div>
  );
}
