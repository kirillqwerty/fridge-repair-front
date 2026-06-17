import { Snowflake } from "lucide-react";

export default function AppLoader({
  fullScreen = true,
  title = "Загрузка сайта",
  subtitle = "Подготавливаем страницу и данные сервиса",
}) {
  return (
    <div
      className={`flex items-center justify-center bg-background text-foreground ${
        fullScreen ? "min-h-screen" : "min-h-[280px]"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="text-center px-6">
        <img
          src="/assets/fridge-loader.gif"
          alt=""
          className="mx-auto w-40 sm:w-48 h-auto object-contain"
          draggable="false"
        />

        <div className="mt-5 flex items-center justify-center gap-2 text-primary font-display font-semibold text-lg">
          <Snowflake className="w-5 h-5 animate-spin" />
          {title}
        </div>

        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
