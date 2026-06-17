import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/site/SeoHead";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center hero-bg px-4">
      <SeoHead title="Страница не найдена" description="Страница не существует или была перемещена" />
      <div className="text-center">
        <div className="font-display text-7xl font-semibold text-primary">404</div>
        <div className="mt-3 font-display text-xl">Страница не найдена</div>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
          Проверьте адрес или вернитесь на главную.
        </p>
        <Link to="/" className="inline-block mt-4">
          <Button>На главную</Button>
        </Link>
      </div>
    </div>
  );
}
