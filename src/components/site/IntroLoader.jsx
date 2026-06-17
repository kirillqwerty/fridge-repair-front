import { useEffect, useState } from "react";
import { Snowflake } from "lucide-react";

const INTRO_STORAGE_KEY = "fridge_site_intro_seen";
const INTRO_SHOW_TIME = 1800;
const INTRO_EXIT_TIME = 700;

export default function IntroLoader({ onFinish }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem(INTRO_STORAGE_KEY) !== "1";
  });

  const [entered, setEntered] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!visible) {
      onFinish?.();
      return undefined;
    }

    const enterTimer = window.setTimeout(() => {
      setEntered(true);
    }, 50);

    const closeTimer = window.setTimeout(() => {
      setClosing(true);

      window.setTimeout(() => {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
        setVisible(false);
        onFinish?.();
      }, INTRO_EXIT_TIME);
    }, INTRO_SHOW_TIME);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(closeTimer);
    };
  }, [visible, onFinish]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-100 transition-all duration-700 ease-out ${
        closing ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"
      }`}
      role="status"
      aria-label="Загрузка сайта"
    >
      <div
        className={`text-center px-6 transition-all duration-700 ease-out ${
          entered && !closing
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-5 scale-95"
        }`}
      >
        <img
          src="/assets/fridge-loader.gif"
          alt=""
          className="mx-auto w-44 sm:w-56 h-auto object-contain"
          draggable="false"
        />

        <div className="mt-6 flex items-center justify-center gap-2 font-display text-xl sm:text-2xl font-semibold text-foreground">
          <Snowflake className="w-6 h-6 text-primary animate-spin" />
          Ремонт холодильников
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Загружаем сервис и актуальные цены
        </p>
      </div>
    </div>
  );
}
