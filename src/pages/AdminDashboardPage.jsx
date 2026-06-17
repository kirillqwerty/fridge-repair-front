import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ExternalLink, ShieldCheck, Settings2, Wrench, Star, Phone, ImagePlay, Users, Lightbulb, Tag, BarChart3, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import SeoHead from "@/components/site/SeoHead";
import ServicesTab from "@/components/admin/ServicesTab";
import ReviewsTab from "@/components/admin/ReviewsTab";
import ContactsTab from "@/components/admin/ContactsTab";
import LeadsTab from "@/components/admin/LeadsTab";
import PortfolioTab from "@/components/admin/PortfolioTab";
import MastersTab from "@/components/admin/MastersTab";
import FAQTab from "@/components/admin/FAQTab";
import BrandsTab from "@/components/admin/BrandsTab";
import PasswordTab from "@/components/admin/PasswordTab";
import StatsTab from "@/components/admin/StatsTab";

const TABS = [
  { value: "services", label: "Услуги", icon: Wrench },
  { value: "reviews", label: "Отзывы", icon: Star },
  { value: "leads", label: "Заявки", icon: Phone },
  { value: "contacts", label: "Контакты", icon: Settings2 },
  { value: "portfolio", label: "Портфолио", icon: ImagePlay },
  { value: "masters", label: "Мастера", icon: Users },
  { value: "faq", label: "FAQ", icon: Lightbulb },
  { value: "brands", label: "Бренды", icon: Tag },
  { value: "stats", label: "Статистика", icon: BarChart3 },
  { value: "password", label: "Пароль", icon: KeyRound },
];

export default function AdminDashboardPage() {
  const { username, logout } = useAuth();
  const nav = useNavigate();
  const [tab, setTab] = useState("services");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeoHead title="Админ-панель" description="Управление сайтом" />
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30">
        <div className="container-page py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-semibold text-base">Админ-панель</div>
              <div className="text-xs text-muted-foreground">вход как {username}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" rel="noopener">
              <Button variant="outline" size="sm" className="gap-2" data-testid="admin-open-site"><ExternalLink className="w-4 h-4" /> Сайт</Button>
            </Link>
            <Button variant="ghost" size="sm" className="gap-2" onClick={() => { logout(); nav("/admin/login"); }} data-testid="admin-logout-button">
              <LogOut className="w-4 h-4" /> Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container-page py-6" data-testid="admin-sidebar">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap h-auto bg-card border border-border p-1 gap-1">
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <TabsTrigger key={t.value} value={t.value} className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" data-testid={`admin-tab-${t.value}`}>
                  <Icon className="w-3.5 h-3.5" /> {t.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="mt-6">
            <TabsContent value="services"><ServicesTab /></TabsContent>
            <TabsContent value="reviews"><ReviewsTab /></TabsContent>
            <TabsContent value="leads"><LeadsTab /></TabsContent>
            <TabsContent value="contacts"><ContactsTab /></TabsContent>
            <TabsContent value="portfolio"><PortfolioTab /></TabsContent>
            <TabsContent value="masters"><MastersTab /></TabsContent>
            <TabsContent value="faq"><FAQTab /></TabsContent>
            <TabsContent value="brands"><BrandsTab /></TabsContent>
            <TabsContent value="stats"><StatsTab /></TabsContent>
            <TabsContent value="password"><PasswordTab /></TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}
