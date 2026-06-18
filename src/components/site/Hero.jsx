import { useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  MessageCircle,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import {
  BELARUS_PHONE_PLACEHOLDER,
  formatBelarusPhone,
  isValidBelarusPhone,
} from "@/lib/phoneMask";

export default function Hero({ stats }) {
  const [phoneValue, setPhoneValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const rating = (stats && stats.rating) || 5.0;
  const reviewsCount = (stats && stats.reviews_count) || 234;
  const years = (stats && stats.years_experience) || 19;
  const arrival = (stats && stats.arrival_minutes) || 30;
  const guaranteeMonths = (stats && stats.guarantee_months) || 12;

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!isValidBelarusPhone(phoneValue)) {
      toast.error("Укажите телефон в формате +375 (__) ___-__-__");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/leads", {
        name: "Клиент",
        phone: phoneValue.trim(),
        brand: "",
        problem: "Расчет стоимости ремонта",
        message:
          "Заявка с первого экрана: клиент просит рассчитать стоимость ремонта по телефону.",
        consent: true,
        source: "hero",
      });

      toast.success("Заявка принята. Перезвоним в ближайшее время.");
      setPhoneValue("");
    } catch (err) {
      const detail =
        (err &&
          err.response &&
          err.response.data &&
          err.response.data.detail) ||
        "Ошибка отправки заявки";
      toast.error(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-slate-950 text-white"
      data-testid="hero-section"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 85% 20%, rgba(56,189,248,0.16), transparent 34%), linear-gradient(135deg, #1e293b 0%, #0f172a 55%, #020617 100%)",
        }}
      />
      <div className="absolute -right-28 bottom-[-20%] h-[520px] w-[520px] rounded-full bg-sky-400/10 blur-3xl" />
      <div className="absolute left-0 top-0 h-px w-full bg-white/10" />

      <div className="container-page relative z-10 py-8 sm:py-10 lg:py-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-white/5 px-3 py-1.5 text-sm text-sky-100 backdrop-blur">
              <Clock className="h-4 w-4 text-sky-300" />
              Выезд мастера в день обращения
            </div>

            <h1 className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Ремонт холодильников{" "}
              <span className="text-sky-300">в Минске на дому</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Оригинальные запчасти и выезд мастера от{" "}
              <strong className="text-white">30 BYN</strong>. Узнайте точную
              стоимость ремонта по симптомам поломки за 2 минуты.
            </p>

            <div className="mt-7 max-w-xl rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur sm:p-6">
              <div className="mb-4 text-sm font-semibold text-white sm:text-base">
                Введите номер телефона для расчета стоимости ремонта:
              </div>

              <form
                className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]"
                onSubmit={onSubmit}
              >
                <input
                  type="tel"
                  value={phoneValue}
                  onChange={(event) => {
                    const { value, selectionStart } = event.target;

                    setPhoneValue((previousValue) =>
                      formatBelarusPhone(value, previousValue, selectionStart),
                    );
                  }}
                  placeholder={BELARUS_PHONE_PLACEHOLDER}
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={19}
                  className="h-12 rounded-xl border border-white/15 bg-slate-950/60 px-4 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-sky-300"
                  data-testid="hero-phone-input"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-xl bg-sky-400 px-6 font-semibold text-slate-950 hover:bg-sky-300"
                  data-testid="hero-price-submit-button"
                >
                  {submitting ? "Отправляем…" : "Рассчитать цену"}
                </Button>
              </form>

              <div className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate-400">
                <MessageCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sky-300" />
                Перезвоним в течение 2 минут. Консультация бесплатна.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-2xl shadow-slate-950/30 sm:p-6">
              <div className="border-b border-slate-200 pb-5">
                <div className="font-display text-3xl font-bold leading-none text-slate-950">
                  {years}+ лет
                </div>
                <div className="mt-2 text-sm font-medium text-slate-500">
                  успешной работы сервиса
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-amber-700">
                  <span className="inline-flex items-center gap-0.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </span>
                  {rating.toFixed(1)} / 5 ({reviewsCount}+ отзывов)
                </div>
              </div>

              <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
                <li className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>
                    Мастер приедет через{" "}
                    <strong className="text-slate-950">
                      {arrival}–60 минут
                    </strong>{" "}
                    после звонка
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>
                    Официальная гарантия{" "}
                    <strong className="text-slate-950">
                      {guaranteeMonths} месяцев
                    </strong>{" "}
                    на работу и детали
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Wrench className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span>
                    Устраняем{" "}
                    <strong className="text-slate-950">90% поломок</strong> за
                    один визит
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:grid-cols-3 sm:p-5">
          <div className="p-2">
            <div className="flex items-center gap-2 font-semibold text-sky-300">
              <CheckCircle2 className="h-4 w-4" /> Диагностика — 0 BYN
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Найдем точную причину неисправности бесплатно при выполнении
              ремонта.
            </p>
          </div>
          <div className="p-2">
            <div className="flex items-center gap-2 font-semibold text-sky-300">
              <CheckCircle2 className="h-4 w-4" /> Официальный чек и БСО
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Работаем официально, выдаем квитанцию и гарантийный талон.
            </p>
          </div>
          <div className="p-2">
            <div className="flex items-center gap-2 font-semibold text-sky-300">
              <CheckCircle2 className="h-4 w-4" /> Запчасти с собой
            </div>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              Мастер приезжает с комплектом деталей под популярные модели
              холодильников.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
