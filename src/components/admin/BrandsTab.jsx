import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";

function linesToList(text) {
  return (text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function listToText(list) {
  return (list || []).join("\n");
}

function normalizePriceRows(rows) {
  return (rows || []).map((it, idx) => ({
    id: it.id || "",
    name: it.name || "",
    price_from: Number(it.price_from) || 0,
    price_to: Number(it.price_to) || 0,
    unit: it.unit || "BYN",
    note: it.note || "",
    order: Number(it.order) || idx + 1,
  }));
}

export default function BrandsTab() {
  const [brands, setBrands] = useState([]);
  const [active, setActive] = useState("");
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [draftLoading, setDraftLoading] = useState(false);

  const loadBrands = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/brands");
      setBrands(data);
      setActive((prev) => prev || data[0]?.slug || "");
    } catch {
      toast.error("Не удалось загрузить бренды");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    if (!active || !brands.length) return;

    let mounted = true;
    const loadDraft = async () => {
      setDraftLoading(true);
      try {
        const baseBrand = brands.find((x) => x.slug === active) || brands[0];
        const { data: pageData } = await api.get(`/brands/${active}`);
        if (!mounted) return;

        const brand = pageData.brand || baseBrand;
        setDraft({
          ...brand,
          features_text: listToText(brand.features),
          common_issues_text: listToText(brand.common_issues),
          price_overrides: normalizePriceRows(
            pageData.services || brand.price_overrides || [],
          ),
        });
      } catch {
        if (mounted) toast.error("Не удалось загрузить страницу бренда");
      } finally {
        if (mounted) setDraftLoading(false);
      }
    };

    loadDraft();
    return () => {
      mounted = false;
    };
  }, [active, brands]);

  const setPriceRow = (idx, patch) => {
    setDraft((prev) => ({
      ...prev,
      price_overrides: prev.price_overrides.map((x, i) =>
        i === idx ? { ...x, ...patch } : x,
      ),
    }));
  };

  const addPriceRow = () => {
    setDraft((prev) => ({
      ...prev,
      price_overrides: [
        ...(prev.price_overrides || []),
        {
          id: "",
          name: "Новая услуга",
          price_from: 0,
          price_to: 0,
          unit: "BYN",
          note: "",
          order: (prev.price_overrides || []).length + 1,
        },
      ],
    }));
  };

  const deletePriceRow = (idx) => {
    setDraft((prev) => ({
      ...prev,
      price_overrides: prev.price_overrides.filter((_, i) => i !== idx),
    }));
  };

  const reloadBrandPrices = async () => {
    if (!active) return;
    try {
      const { data } = await api.get(`/brands/${active}`);
      setDraft((prev) => ({
        ...prev,
        price_overrides: normalizePriceRows(data.services || []),
      }));
      toast.success("Прайс обновлён из текущих данных бренда");
    } catch {
      toast.error("Не удалось обновить прайс");
    }
  };

  const save = async () => {
    if (!draft) return;
    try {
      const price_overrides = normalizePriceRows(draft.price_overrides).map(
        (it, idx) => ({
          ...it,
          order: it.order || idx + 1,
          price_from: Number(it.price_from) || 0,
          price_to: Number(it.price_to) || 0,
        }),
      );

      await api.put(`/brands/${active}`, {
        intro: draft.intro,
        meta_description: draft.meta_description,
        features: linesToList(draft.features_text),
        common_issues: linesToList(draft.common_issues_text),
        price_overrides,
      });
      toast.success("Сохранено");
      await loadBrands();
    } catch {
      toast.error("Ошибка сохранения");
    }
  };

  if (loading || !draft || draftLoading) {
    return <div className="text-muted-foreground">Загрузка…</div>;
  }

  return (
    <div className="space-y-5" data-testid="admin-brands">
      <div>
        <h2 className="font-display text-xl font-semibold">Страницы брендов</h2>
        <p className="text-sm text-muted-foreground">
          Изменяйте описание, SEO-мета-теги, отдельные услуги и прайс для
          каждого бренда.
        </p>
      </div>

      <div className="w-full max-w-md">
        <Label>Бренд</Label>
        <Select value={active} onValueChange={setActive}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите бренд" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b.slug} value={b.slug}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className="p-5 bg-card border-border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label>Название</Label>
            <Input value={draft.name} readOnly />
          </div>
          <div>
            <Label>Страна</Label>
            <Input value={draft.country} readOnly />
          </div>
        </div>
        <div>
          <Label>Вводный текст (Intro)</Label>
          <Textarea
            rows={4}
            value={draft.intro || ""}
            onChange={(e) => setDraft({ ...draft, intro: e.target.value })}
          />
        </div>
        <div>
          <Label>Meta description (SEO)</Label>
          <Textarea
            rows={3}
            value={draft.meta_description || ""}
            onChange={(e) =>
              setDraft({ ...draft, meta_description: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Особенности (по строке)</Label>
          <Textarea
            rows={4}
            value={draft.features_text || ""}
            onChange={(e) =>
              setDraft({ ...draft, features_text: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Частые поломки (по строке)</Label>
          <Textarea
            rows={4}
            value={draft.common_issues_text || ""}
            onChange={(e) =>
              setDraft({ ...draft, common_issues_text: e.target.value })
            }
          />
        </div>
      </Card>

      <Card className="p-5 bg-card border-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold">
              Услуги и прайс для {draft.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Эти строки будут показаны только на странице /brand/{active}.
              Главный общий прайс не изменяется.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={reloadBrandPrices}
              className="gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Обновить
            </Button>
            <Button variant="outline" onClick={addPriceRow} className="gap-2">
              <Plus className="w-4 h-4" /> Добавить услугу
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {(draft.price_overrides || []).map((it, idx) => (
            <Card
              key={it.id || idx}
              className="p-4 bg-secondary/20 border-border"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                <div className="md:col-span-3">
                  <Label>Услуга</Label>
                  <Input
                    value={it.name}
                    onChange={(e) => setPriceRow(idx, { name: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Цена от</Label>
                  <Input
                    type="number"
                    min="0"
                    value={it.price_from}
                    onChange={(e) =>
                      setPriceRow(idx, { price_from: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Цена до</Label>
                  <Input
                    type="number"
                    min="0"
                    value={it.price_to}
                    onChange={(e) =>
                      setPriceRow(idx, { price_to: e.target.value })
                    }
                  />
                </div>
                <div className="md:col-span-1">
                  <Label>Валюта</Label>
                  <Input
                    value={it.unit}
                    onChange={(e) => setPriceRow(idx, { unit: e.target.value })}
                  />
                </div>
                <div className="md:col-span-3">
                  <Label>Примечание</Label>
                  <Input
                    value={it.note}
                    onChange={(e) => setPriceRow(idx, { note: e.target.value })}
                  />
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePriceRow(idx)}
                    aria-label="Удалить услугу"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Button onClick={save} className="gap-2" data-testid="admin-brands-save">
        <Save className="w-4 h-4" /> Сохранить страницу бренда
      </Button>
    </div>
  );
}
