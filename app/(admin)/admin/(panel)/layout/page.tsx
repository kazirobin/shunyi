"use client";

import { useState, useEffect, useTransition } from "react";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  addInput,
  updateInput,
  deleteInput,
  addOutput,
  updateOutput,
  deleteOutput,
  addProcess,
  updateProcess,
  deleteProcess,
  reorderProcesses,
} from "./actions";
import { IProduct, IProcess, IInputEntry, IOutputEntry } from "./types";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxesIcon,
  CheckIcon,
  ChevronsDownIcon,
  ChevronsUpIcon,
  LayersIcon,
  PackageCheckIcon,
  PackageOpenIcon,
  PaletteIcon,
  PencilIcon,
  PlusIcon,
  RulerIcon,
  Trash2Icon,
  WorkflowIcon,
  XIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminI18n } from "@/components/admin/i18n-provider";
import {
  toChineseNumber,
  translateGarmentTerm,
  getColorHex,
  type AdminLocale,
} from "@/components/admin/i18n";

const COMMON_COLORS = ["Black", "White", "Navy", "Red", "Grey", "Blue", "Green", "Yellow"];
const COMMON_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

function withRunningTotal<T extends { pieces: number }>(items: T[]) {
  let running = 0;
  return items.map((item) => {
    running += Number(item.pieces) || 0;
    return { item, total: running };
  });
}

function ColorBadge({ color, locale }: { color?: string; locale: AdminLocale }) {
  if (!color?.trim()) return <span className="text-xs text-muted-foreground">-</span>;
  const hex = getColorHex(color);
  const label = translateGarmentTerm(color, locale, "color");
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border bg-muted/40 px-2 py-0.5 text-xs font-medium">
      {hex && (
        <span
          className="size-2.5 rounded-full border border-black/10 shrink-0"
          style={{ backgroundColor: hex }}
        />
      )}
      <span>{label}</span>
    </span>
  );
}

function SizeBadge({ size, locale }: { size?: string; locale: AdminLocale }) {
  if (!size?.trim()) return <span className="text-xs text-muted-foreground">-</span>;
  const label = translateGarmentTerm(size, locale, "size");
  return (
    <Badge variant="outline" className="font-mono text-xs uppercase tracking-wider">
      {label}
    </Badge>
  );
}

function WorkLabel({ work, locale }: { work?: string; locale: AdminLocale }) {
  if (!work?.trim()) return <span className="text-xs text-muted-foreground">-</span>;
  const label = translateGarmentTerm(work, locale, "work");
  return <span className="font-medium">{label}</span>;
}

function FormattedDate({ dateStr, locale }: { dateStr: string; locale: AdminLocale }) {
  if (!dateStr) return <span className="text-muted-foreground">-</span>;
  if (locale === "zh") {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return (
        <span className="tnum text-xs text-muted-foreground font-medium">
          {`${parts[0]}年${parts[1]}月${parts[2]}日`}
        </span>
      );
    }
  }
  return <span className="tnum text-xs text-muted-foreground">{dateStr}</span>;
}

function PiecesDisplay({
  pieces,
  total,
  locale,
  nf,
}: {
  pieces: number;
  total: number;
  locale: AdminLocale;
  nf: Intl.NumberFormat;
}) {
  if (locale === "zh") {
    return (
      <div className="flex flex-col items-end leading-tight">
        <span className="font-semibold text-foreground">
          {pieces} / {total} 件
        </span>
        <span className="text-[11px] font-normal text-muted-foreground">
          {toChineseNumber(pieces)} / {toChineseNumber(total)}
        </span>
      </div>
    );
  }
  return (
    <span className="tnum font-medium">
      {nf.format(pieces)}
      <span className="font-normal text-muted-foreground">/{nf.format(total)}</span>
    </span>
  );
}

function BreakdownSection({
  entries,
  locale,
  nf,
  dict,
  title,
}: {
  entries: { color?: string; size?: string; pieces: number }[];
  locale: AdminLocale;
  nf: Intl.NumberFormat;
  dict: any;
  title: string;
}) {
  const colorMap = new Map<string, number>();
  const sizeMap = new Map<string, number>();
  let totalPieces = 0;

  for (const e of entries) {
    const pcs = Number(e.pieces) || 0;
    totalPieces += pcs;
    const c = (e.color || "").trim() || "Unspecified";
    colorMap.set(c, (colorMap.get(c) || 0) + pcs);
    const s = (e.size || "").trim() || "Unspecified";
    sizeMap.set(s, (sizeMap.get(s) || 0) + pcs);
  }

  if (entries.length === 0) return null;

  return (
    <div className="rounded-xl border bg-muted/20 p-4 space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2.5">
        <div className="flex items-center gap-2">
          <LayersIcon className="size-4 text-[var(--signal)]" />
          <span className="font-semibold text-sm">{title}</span>
        </div>
        <div className="text-xs text-muted-foreground font-medium">
          {dict.totalPieces || "Total"}:{" "}
          <span className="font-bold text-foreground">
            {locale === "zh"
              ? `${nf.format(totalPieces)} 件 (${toChineseNumber(totalPieces)})`
              : `${nf.format(totalPieces)} ${dict.unitPieces || "pcs"}`}
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Color breakdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <PaletteIcon className="size-3.5 text-primary" />
            <span>{dict.colorSummary || "Color Breakdown"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...colorMap.entries()].map(([c, count]) => {
              const hex = getColorHex(c);
              const label =
                c === "Unspecified"
                  ? locale === "zh"
                    ? "未指定"
                    : locale === "bn"
                    ? "অনির্দিষ্ট"
                    : "Unspecified"
                  : translateGarmentTerm(c, locale, "color");
              const pct = totalPieces > 0 ? Math.round((count / totalPieces) * 100) : 0;
              return (
                <div
                  key={c}
                  className="flex items-center gap-2 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xs"
                >
                  {hex && (
                    <span
                      className="size-2.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: hex }}
                    />
                  )}
                  <span className="font-medium">{label}</span>
                  <span className="tnum font-bold text-foreground">
                    {locale === "zh" ? `${count} 件` : `${nf.format(count)}`}
                  </span>
                  <span className="text-[10px] text-muted-foreground">({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Size breakdown */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <RulerIcon className="size-3.5 text-primary" />
            <span>{dict.sizeSummary || "Size Breakdown"}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[...sizeMap.entries()].map(([s, count]) => {
              const label =
                s === "Unspecified"
                  ? locale === "zh"
                    ? "未指定"
                    : locale === "bn"
                    ? "অনির্দিষ্ট"
                    : "Unspecified"
                  : translateGarmentTerm(s, locale, "size");
              const pct = totalPieces > 0 ? Math.round((count / totalPieces) * 100) : 0;
              return (
                <div
                  key={s}
                  className="flex items-center gap-2 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xs"
                >
                  <span className="font-mono font-bold text-primary">{label}</span>
                  <span className="tnum font-bold text-foreground">
                    {locale === "zh" ? `${count} 件` : `${nf.format(count)}`}
                  </span>
                  <span className="text-[10px] text-muted-foreground">({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductionPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selected, setSelected] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [activeTab, setActiveTab] = useState("input");
  const [pending, startTransition] = useTransition();
  const { locale, t: dict, nf } = useAdminI18n();
  const t = dict.prod;

  // Product name edit states
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // ================= DIALOG STATES =================
  // Input Dialog State
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [inputModalMode, setInputModalMode] = useState<"add" | "edit">("add");
  const [inputForm, setInputForm] = useState<{
    _id?: string;
    date: string;
    workName: string;
    color: string;
    size: string;
    pieces: number;
    note: string;
  }>({
    date: "",
    workName: "",
    color: "",
    size: "",
    pieces: 0,
    note: "",
  });

  // Output Dialog State
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);
  const [outputModalMode, setOutputModalMode] = useState<"add" | "edit">("add");
  const [outputForm, setOutputForm] = useState<{
    _id?: string;
    date: string;
    workName: string;
    color: string;
    size: string;
    pieces: number;
    note: string;
  }>({
    date: "",
    workName: "",
    color: "",
    size: "",
    pieces: 0,
    note: "",
  });

  // Process Dialog State
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [processModalMode, setProcessModalMode] = useState<"add" | "edit">("add");
  const [processForm, setProcessForm] = useState<{
    _id?: string;
    title: string;
    description: string;
    label: string;
  }>({
    title: "",
    description: "",
    label: "",
  });

  const getToday = () => new Date().toISOString().slice(0, 10);

  // ---------- Initial Load ----------
  useEffect(() => {
    (async () => {
      const list = await getProducts();
      setProducts(list);
      if (list.length) setSelected(list[0]);
      setLoading(false);
    })();
  }, []);

  const refresh = async () => {
    const list = await getProducts();
    setProducts(list);
    if (selected) {
      setSelected(list.find((p: IProduct) => p._id === selected._id) || null);
    }
  };

  // Scroll helpers
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  // ---------- Product Operations ----------
  const handleCreate = () => {
    if (!newName.trim()) return;
    startTransition(async () => {
      const p = await createProduct(newName.trim());
      setProducts((prev) => [p, ...prev]);
      setSelected(p);
      setNewName("");
    });
  };

  const handleStartEditProduct = (p: IProduct) => {
    setEditingProductId(p._id!);
    setEditingName(p.name);
  };

  const handleCancelEditProduct = () => {
    setEditingProductId(null);
    setEditingName("");
  };

  const handleSaveProductName = () => {
    if (!editingProductId || !editingName.trim()) return;
    const name = editingName.trim();
    startTransition(async () => {
      await updateProduct(editingProductId, name);
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProductId ? { ...p, name } : p))
      );
      if (selected?._id === editingProductId) {
        setSelected({ ...selected, name });
      }
      handleCancelEditProduct();
    });
  };

  const handleDeleteProduct = (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    startTransition(async () => {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      if (selected?._id === id) setSelected(null);
    });
  };

  // ---------- Input Modal Handlers ----------
  const openAddInputModal = () => {
    setInputModalMode("add");
    setInputForm({
      date: getToday(),
      workName: "",
      color: "",
      size: "",
      pieces: 0,
      note: "",
    });
    setIsInputModalOpen(true);
  };

  const openEditInputModal = (entry: IInputEntry) => {
    setInputModalMode("edit");
    setInputForm({
      _id: entry._id,
      date: entry.date,
      workName: entry.workName,
      color: entry.color || "",
      size: entry.size || "",
      pieces: entry.pieces,
      note: entry.note || "",
    });
    setIsInputModalOpen(true);
  };

  const handleSaveInputModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !inputForm.date || !inputForm.workName || !inputForm.pieces) return;

    startTransition(async () => {
      if (inputModalMode === "add") {
        await addInput(selected._id!, {
          date: inputForm.date,
          workName: inputForm.workName.trim(),
          color: inputForm.color.trim(),
          size: inputForm.size.trim(),
          pieces: Number(inputForm.pieces),
          note: inputForm.note,
        });
      } else if (inputForm._id) {
        await updateInput(selected._id!, inputForm._id, {
          date: inputForm.date,
          workName: inputForm.workName.trim(),
          color: inputForm.color.trim(),
          size: inputForm.size.trim(),
          pieces: Number(inputForm.pieces),
          note: inputForm.note,
        });
      }
      setIsInputModalOpen(false);
      await refresh();
    });
  };

  const handleDeleteInput = (id: string) => {
    if (!selected) return;
    startTransition(async () => {
      await deleteInput(selected._id!, id);
      await refresh();
    });
  };

  // ---------- Output Modal Handlers ----------
  const openAddOutputModal = () => {
    setOutputModalMode("add");
    setOutputForm({
      date: getToday(),
      workName: "",
      color: "",
      size: "",
      pieces: 0,
      note: "",
    });
    setIsOutputModalOpen(true);
  };

  const openEditOutputModal = (entry: IOutputEntry) => {
    setOutputModalMode("edit");
    setOutputForm({
      _id: entry._id,
      date: entry.date,
      workName: entry.workName || "",
      color: entry.color || "",
      size: entry.size || "",
      pieces: entry.pieces,
      note: entry.note || "",
    });
    setIsOutputModalOpen(true);
  };

  const handleSaveOutputModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !outputForm.date || !outputForm.pieces) return;

    startTransition(async () => {
      if (outputModalMode === "add") {
        await addOutput(selected._id!, {
          date: outputForm.date,
          workName: outputForm.workName.trim(),
          color: outputForm.color.trim(),
          size: outputForm.size.trim(),
          pieces: Number(outputForm.pieces),
          note: outputForm.note,
        });
      } else if (outputForm._id) {
        await updateOutput(selected._id!, outputForm._id, {
          date: outputForm.date,
          workName: outputForm.workName.trim(),
          color: outputForm.color.trim(),
          size: outputForm.size.trim(),
          pieces: Number(outputForm.pieces),
          note: outputForm.note,
        });
      }
      setIsOutputModalOpen(false);
      await refresh();
    });
  };

  const handleDeleteOutput = (id: string) => {
    if (!selected) return;
    startTransition(async () => {
      await deleteOutput(selected._id!, id);
      await refresh();
    });
  };

  // ---------- Process Modal Handlers ----------
  const openAddProcessModal = () => {
    setProcessModalMode("add");
    setProcessForm({ title: "", description: "", label: "" });
    setIsProcessModalOpen(true);
  };

  const openEditProcessModal = (p: IProcess) => {
    setProcessModalMode("edit");
    setProcessForm({
      _id: p._id,
      title: p.title,
      description: p.description || "",
      label: p.label || "",
    });
    setIsProcessModalOpen(true);
  };

  const handleSaveProcessModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !processForm.title.trim()) return;

    startTransition(async () => {
      if (processModalMode === "add") {
        await addProcess(selected._id!, {
          serial: 0,
          title: processForm.title.trim(),
          description: processForm.description.trim(),
          label: processForm.label.trim(),
        });
      } else if (processForm._id) {
        await updateProcess(selected._id!, processForm._id, {
          title: processForm.title.trim(),
          description: processForm.description.trim(),
          label: processForm.label.trim(),
        });
      }
      setIsProcessModalOpen(false);
      await refresh();
    });
  };

  const handleDeleteProcess = (id: string) => {
    if (!selected) return;
    startTransition(async () => {
      await deleteProcess(selected._id!, id);
      await refresh();
    });
  };

  const handleMoveProcess = (id: string, dir: -1 | 1) => {
    if (!selected) return;
    const list = [...selected.processes].sort((a, b) => a.serial - b.serial);
    const idx = list.findIndex((p) => p._id === id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= list.length) return;
    [list[idx], list[newIdx]] = [list[newIdx], list[idx]];
    startTransition(async () => {
      await reorderProcesses(selected._id!, list.map((p) => p._id!));
      await refresh();
    });
  };

  // ---------- Loading screen ----------
  if (loading) {
    return (
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <Skeleton className="h-96 rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-36 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  const received = selected ? selected.inputs.reduce((n, i) => n + (Number(i.pieces) || 0), 0) : 0;
  const finished = selected ? selected.outputs.reduce((n, o) => n + (Number(o.pieces) || 0), 0) : 0;
  const balance = Math.max(0, received - finished);
  const rate = received > 0 ? Math.round((finished / received) * 100) : 0;
  const steps = selected ? [...selected.processes].sort((a, b) => a.serial - b.serial) : [];

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-24">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
        {/* ================= Product list ================= */}
        <Card size="sm" className="rounded-2xl shadow-none ring-border lg:sticky lg:top-20">
          <CardHeader>
            <CardTitle className="font-semibold">{t.products}</CardTitle>
            <CardDescription>{t.total(products.length)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
              }}
            >
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={t.newProductName}
                aria-label={t.newProductName}
              />
              <Button type="submit" size="icon" disabled={!newName.trim() || pending} aria-label={t.addProduct}>
                <PlusIcon />
              </Button>
            </form>
            <ul className="-mx-1 max-h-[60vh] space-y-0.5 overflow-y-auto">
              {products.map((p) => (
                <li key={p._id} className="group/item flex items-center gap-1">
                  {editingProductId === p._id ? (
                    <div className="flex w-full items-center gap-1 px-1">
                      <Input
                        autoFocus
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveProductName();
                          if (e.key === "Escape") handleCancelEditProduct();
                        }}
                        className="h-8"
                        aria-label={t.productName}
                      />
                      <Button size="icon-sm" variant="ghost" onClick={handleSaveProductName} aria-label={t.saveName}>
                        <CheckIcon />
                      </Button>
                      <Button size="icon-sm" variant="ghost" onClick={handleCancelEditProduct} aria-label={t.cancel}>
                        <XIcon />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelected(p)}
                      aria-current={selected?._id === p._id ? "true" : undefined}
                      className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                        selected?._id === p._id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <BoxesIcon
                        className={`size-4 shrink-0 ${
                          selected?._id === p._id ? "text-[var(--signal)]" : "text-muted-foreground"
                        }`}
                      />
                      <span className="truncate font-medium">{p.name}</span>
                      <span
                        className={`tnum ml-auto text-xs ${
                          selected?._id === p._id ? "text-primary-foreground/60" : "text-muted-foreground"
                        }`}
                      >
                        {p.processes.length}
                      </span>
                    </button>
                  )}
                </li>
              ))}
              {products.length === 0 && (
                <li className="rounded-lg border border-dashed px-3 py-6 text-center text-xs text-muted-foreground">
                  {t.noProducts}
                </li>
              )}
            </ul>
          </CardContent>
        </Card>

        {/* ================= Selected product ================= */}
        {!selected ? (
          <Card className="rounded-2xl shadow-none ring-border">
            <CardContent className="flex flex-col items-center gap-2 py-16 text-center">
              <BoxesIcon className="size-8 text-muted-foreground" />
              <p className="font-medium">{t.selectOrCreate}</p>
              <p className="text-sm text-muted-foreground">{t.selectDesc}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="min-w-0 space-y-4">
            {/* Product Summary Header Card */}
            <Card className="rounded-2xl shadow-none ring-border">
              <CardHeader>
                {editingProductId === selected._id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSaveProductName();
                        if (e.key === "Escape") handleCancelEditProduct();
                      }}
                      className="h-10 max-w-sm text-lg font-semibold"
                      aria-label={t.productName}
                    />
                    <Button size="sm" onClick={handleSaveProductName}>
                      {t.save}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelEditProduct}>
                      {t.cancel}
                    </Button>
                  </div>
                ) : (
                  <CardTitle className="text-xl font-semibold tracking-tight">{selected.name}</CardTitle>
                )}
                <CardDescription>
                  {t.stepsEntries(steps.length, selected.inputs.length + selected.outputs.length)}
                </CardDescription>
                {editingProductId !== selected._id && (
                  <CardAction className="flex gap-1.5">
                    <Button size="sm" variant="outline" onClick={() => handleStartEditProduct(selected)}>
                      <PencilIcon /> {t.rename}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(selected._id!)}>
                      <Trash2Icon /> {t.delete}
                    </Button>
                  </CardAction>
                )}
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <PackageOpenIcon className="size-3.5" /> {t.received}
                  </div>
                  <div className="tnum mt-1 text-2xl font-semibold">
                    {locale === "zh" ? `${nf.format(received)} 件` : nf.format(received)}
                  </div>
                  {locale === "zh" && (
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {toChineseNumber(received)}
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <PackageCheckIcon className="size-3.5" /> {t.finished}
                  </div>
                  <div className="tnum mt-1 text-2xl font-semibold">
                    {locale === "zh" ? `${nf.format(finished)} 件` : nf.format(finished)}
                  </div>
                  {locale === "zh" && (
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {toChineseNumber(finished)}
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <LayersIcon className="size-3.5" /> {t.remaining || "Remaining"}
                  </div>
                  <div className="tnum mt-1 text-2xl font-semibold text-[var(--signal)]">
                    {locale === "zh" ? `${nf.format(balance)} 件` : nf.format(balance)}
                  </div>
                  {locale === "zh" && (
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {toChineseNumber(balance)}
                    </div>
                  )}
                </div>

                <div className="rounded-xl bg-primary p-4 text-primary-foreground">
                  <div className="text-xs text-primary-foreground/70">{t.completion}</div>
                  <div className="tnum mt-1 text-2xl font-semibold">{rate}%</div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full rounded-full bg-[var(--signal)]" style={{ width: `${Math.min(rate, 100)}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Input, Output, Process */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-card ring-1 ring-border">
                <TabsTrigger value="input">
                  {t.inputTab} <span className="tnum ml-1 text-muted-foreground">{selected.inputs.length}</span>
                </TabsTrigger>
                <TabsTrigger value="output">
                  {t.outputTab} <span className="tnum ml-1 text-muted-foreground">{selected.outputs.length}</span>
                </TabsTrigger>
                <TabsTrigger value="process">
                  {t.stepsTab} <span className="tnum ml-1 text-muted-foreground">{steps.length}</span>
                </TabsTrigger>
              </TabsList>

              {/* ---------- INPUT TAB ---------- */}
              <TabsContent value="input" className="space-y-4">
                {/* Color & Size Breakdown for Input */}
                <BreakdownSection
                  entries={selected.inputs}
                  locale={locale}
                  nf={nf}
                  dict={t}
                  title={`${t.inputTab} - ${t.colorSummary || "Breakdown"}`}
                />

                <Card className="rounded-2xl shadow-none ring-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div>
                      <CardTitle className="font-semibold text-lg">{t.inputTab}</CardTitle>
                      <CardDescription>{t.inputDesc}</CardDescription>
                    </div>
                    <CardAction>
                      <Button onClick={openAddInputModal} className="gap-1.5 shadow-sm">
                        <PlusIcon className="size-4" /> {t.addInput}
                      </Button>
                    </CardAction>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="overflow-hidden rounded-xl border">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead>{t.date}</TableHead>
                            <TableHead>{t.work}</TableHead>
                            <TableHead>{t.color}</TableHead>
                            <TableHead>{t.size}</TableHead>
                            <TableHead className="text-right">{t.pieces}</TableHead>
                            <TableHead>{t.note}</TableHead>
                            <TableHead className="w-20 text-right">
                              <span className="sr-only">{t.actions}</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {withRunningTotal(selected.inputs).map(({ item: i, total }) => (
                            <TableRow key={i._id} className="hover:bg-muted/40 transition-colors">
                              <TableCell>
                                <FormattedDate dateStr={i.date} locale={locale} />
                              </TableCell>
                              <TableCell>
                                <WorkLabel work={i.workName} locale={locale} />
                              </TableCell>
                              <TableCell>
                                <ColorBadge color={i.color} locale={locale} />
                              </TableCell>
                              <TableCell>
                                <SizeBadge size={i.size} locale={locale} />
                              </TableCell>
                              <TableCell className="text-right">
                                <PiecesDisplay pieces={i.pieces} total={total} locale={locale} nf={nf} />
                              </TableCell>
                              <TableCell className="max-w-44 truncate text-muted-foreground">
                                {i.note || "-"}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    size="icon-xs"
                                    variant="outline"
                                    onClick={() => openEditInputModal(i)}
                                    aria-label={t.editInput}
                                    title={t.editInput}
                                    className="text-muted-foreground hover:text-[var(--signal)] hover:border-[var(--signal)]/50"
                                  >
                                    <PencilIcon className="size-3.5" />
                                  </Button>
                                  <Button
                                    size="icon-xs"
                                    variant="outline"
                                    onClick={() => handleDeleteInput(i._id!)}
                                    aria-label={t.deleteInput}
                                    title={t.deleteInput}
                                    className="text-muted-foreground hover:text-destructive hover:border-destructive/50"
                                  >
                                    <Trash2Icon className="size-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                          {selected.inputs.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                                <div className="flex flex-col items-center gap-2">
                                  <PackageOpenIcon className="size-8 opacity-40" />
                                  <p>{t.noInput}</p>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={openAddInputModal}
                                    className="mt-1"
                                  >
                                    <PlusIcon className="size-3.5" /> {t.addInput}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ---------- OUTPUT TAB ---------- */}
              <TabsContent value="output" className="space-y-4">
                {/* Color & Size Breakdown for Output */}
                <BreakdownSection
                  entries={selected.outputs}
                  locale={locale}
                  nf={nf}
                  dict={t}
                  title={`${t.outputTab} - ${t.colorSummary || "Breakdown"}`}
                />

                <Card className="rounded-2xl shadow-none ring-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div>
                      <CardTitle className="font-semibold text-lg">{t.outputTab}</CardTitle>
                      <CardDescription>{t.outputDesc}</CardDescription>
                    </div>
                    <CardAction>
                      <Button
                        onClick={openAddOutputModal}
                        className="gap-1.5 bg-[var(--signal)] hover:bg-[var(--signal)]/90 shadow-sm"
                      >
                        <PlusIcon className="size-4" /> {t.addOutput}
                      </Button>
                    </CardAction>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="overflow-hidden rounded-xl border">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead>{t.date}</TableHead>
                            <TableHead>{t.work}</TableHead>
                            <TableHead>{t.color}</TableHead>
                            <TableHead>{t.size}</TableHead>
                            <TableHead className="text-right">{t.pieces}</TableHead>
                            <TableHead>{t.note}</TableHead>
                            <TableHead className="w-20 text-right">
                              <span className="sr-only">{t.actions}</span>
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {withRunningTotal(selected.outputs).map(({ item: o, total }) => (
                            <TableRow key={o._id} className="hover:bg-muted/40 transition-colors">
                              <TableCell>
                                <FormattedDate dateStr={o.date} locale={locale} />
                              </TableCell>
                              <TableCell>
                                <WorkLabel work={o.workName} locale={locale} />
                              </TableCell>
                              <TableCell>
                                <ColorBadge color={o.color} locale={locale} />
                              </TableCell>
                              <TableCell>
                                <SizeBadge size={o.size} locale={locale} />
                              </TableCell>
                              <TableCell className="text-right">
                                <PiecesDisplay pieces={o.pieces} total={total} locale={locale} nf={nf} />
                              </TableCell>
                              <TableCell className="max-w-44 truncate text-muted-foreground">
                                {o.note || "-"}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    size="icon-xs"
                                    variant="outline"
                                    onClick={() => openEditOutputModal(o)}
                                    aria-label={t.editOutput}
                                    title={t.editOutput}
                                    className="text-muted-foreground hover:text-[var(--signal)] hover:border-[var(--signal)]/50"
                                  >
                                    <PencilIcon className="size-3.5" />
                                  </Button>
                                  <Button
                                    size="icon-xs"
                                    variant="outline"
                                    onClick={() => handleDeleteOutput(o._id!)}
                                    aria-label={t.deleteOutput}
                                    title={t.deleteOutput}
                                    className="text-muted-foreground hover:text-destructive hover:border-destructive/50"
                                  >
                                    <Trash2Icon className="size-3.5" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                          {selected.outputs.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                                <div className="flex flex-col items-center gap-2">
                                  <PackageCheckIcon className="size-8 opacity-40 text-[var(--signal)]" />
                                  <p>{t.noOutput}</p>
                                  <Button
                                    size="sm"
                                    onClick={openAddOutputModal}
                                    className="mt-1 bg-[var(--signal)] hover:bg-[var(--signal)]/90"
                                  >
                                    <PlusIcon className="size-3.5" /> {t.addOutput}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ---------- PROCESS TAB ---------- */}
              <TabsContent value="process">
                <Card className="rounded-2xl shadow-none ring-border">
                  <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <div>
                      <CardTitle className="font-semibold text-lg">{t.stepsTab}</CardTitle>
                      <CardDescription>{t.stepsDesc}</CardDescription>
                    </div>
                    <CardAction>
                      <Button onClick={openAddProcessModal} className="gap-1.5 shadow-sm">
                        <PlusIcon className="size-4" /> {t.addStep}
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {steps.length ? (
                      <ol className="space-y-2">
                        {steps.map((p, i) => (
                          <li
                            key={p._id}
                            className="flex items-start gap-3 rounded-xl border bg-card p-3 transition-colors hover:border-primary/40"
                          >
                            <span className="tnum flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                              {p.serial}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium">{p.title}</span>
                                {p.label && <Badge variant="secondary">{p.label}</Badge>}
                              </div>
                              {p.description && (
                                <p className="mt-0.5 text-sm text-muted-foreground">{p.description}</p>
                              )}
                            </div>
                            <div className="flex shrink-0 items-center gap-0.5">
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                disabled={i === 0}
                                onClick={() => handleMoveProcess(p._id!, -1)}
                                aria-label={t.moveUp}
                              >
                                <ArrowUpIcon />
                              </Button>
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                disabled={i === steps.length - 1}
                                onClick={() => handleMoveProcess(p._id!, 1)}
                                aria-label={t.moveDown}
                              >
                                <ArrowDownIcon />
                              </Button>
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                onClick={() => openEditProcessModal(p)}
                                aria-label={t.editStep}
                              >
                                <PencilIcon />
                              </Button>
                              <Button
                                size="icon-sm"
                                variant="ghost"
                                onClick={() => handleDeleteProcess(p._id!)}
                                aria-label={t.deleteStep}
                                className="text-muted-foreground hover:text-destructive"
                              >
                                <Trash2Icon />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-12 text-center">
                        <WorkflowIcon className="size-8 text-muted-foreground opacity-40" />
                        <p className="text-sm text-muted-foreground">{t.noSteps}</p>
                        <Button size="sm" variant="outline" onClick={openAddProcessModal} className="mt-2">
                          <PlusIcon className="size-3.5" /> {t.addStep}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* ================= DIALOG: INPUT MODAL ================= */}
      <Dialog open={isInputModalOpen} onOpenChange={setIsInputModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PackageOpenIcon className="size-5 text-[var(--signal)]" />
              <span>{inputModalMode === "add" ? t.addInput : t.editInput}</span>
            </DialogTitle>
            <DialogDescription>
              {selected?.name} · {inputModalMode === "add" ? t.inputDesc : t.save}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveInputModal} className="space-y-4 py-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">{t.date} *</label>
                <Input
                  type="date"
                  value={inputForm.date}
                  onChange={(e) => setInputForm({ ...inputForm, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">{t.work} *</label>
                <Input
                  placeholder={t.workName}
                  value={inputForm.workName}
                  onChange={(e) => setInputForm({ ...inputForm, workName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">{t.color}</label>
                <Input
                  placeholder={t.colorPlaceholder || "e.g. Black"}
                  value={inputForm.color}
                  onChange={(e) => setInputForm({ ...inputForm, color: e.target.value })}
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {COMMON_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setInputForm({ ...inputForm, color: c })}
                      className="rounded border bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">{t.size}</label>
                <Input
                  placeholder={t.sizePlaceholder || "e.g. M, L"}
                  value={inputForm.size}
                  onChange={(e) => setInputForm({ ...inputForm, size: e.target.value })}
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {COMMON_SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setInputForm({ ...inputForm, size: s })}
                      className="rounded border bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground">{t.pieces} *</label>
                {locale === "zh" && inputForm.pieces > 0 && (
                  <span className="text-xs font-medium text-[var(--signal)]">
                    {toChineseNumber(inputForm.pieces)} 件
                  </span>
                )}
              </div>
              <Input
                type="number"
                min={1}
                placeholder={t.pieces}
                value={inputForm.pieces || ""}
                onChange={(e) => setInputForm({ ...inputForm, pieces: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">{t.note}</label>
              <Input
                placeholder={t.noteOptional}
                value={inputForm.note}
                onChange={(e) => setInputForm({ ...inputForm, note: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsInputModalOpen(false)}
              >
                {t.cancel}
              </Button>
              <Button
                type="submit"
                disabled={pending || !inputForm.date || !inputForm.workName || !inputForm.pieces}
              >
                {inputModalMode === "add" ? (
                  <>
                    <PlusIcon className="size-4" /> {t.addInput}
                  </>
                ) : (
                  <>
                    <CheckIcon className="size-4" /> {t.save}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= DIALOG: OUTPUT MODAL ================= */}
      <Dialog open={isOutputModalOpen} onOpenChange={setIsOutputModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PackageCheckIcon className="size-5 text-[var(--signal)]" />
              <span>{outputModalMode === "add" ? t.addOutput : t.editOutput}</span>
            </DialogTitle>
            <DialogDescription>
              {selected?.name} · {outputModalMode === "add" ? t.outputDesc : t.save}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveOutputModal} className="space-y-4 py-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">{t.date} *</label>
                <Input
                  type="date"
                  value={outputForm.date}
                  onChange={(e) => setOutputForm({ ...outputForm, date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">{t.work}</label>
                <Input
                  placeholder={t.workName}
                  value={outputForm.workName}
                  onChange={(e) => setOutputForm({ ...outputForm, workName: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">{t.color}</label>
                <Input
                  placeholder={t.colorPlaceholder || "e.g. Black"}
                  value={outputForm.color}
                  onChange={(e) => setOutputForm({ ...outputForm, color: e.target.value })}
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {COMMON_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setOutputForm({ ...outputForm, color: c })}
                      className="rounded border bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">{t.size}</label>
                <Input
                  placeholder={t.sizePlaceholder || "e.g. M, L"}
                  value={outputForm.size}
                  onChange={(e) => setOutputForm({ ...outputForm, size: e.target.value })}
                />
                <div className="flex flex-wrap gap-1 pt-1">
                  {COMMON_SIZES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setOutputForm({ ...outputForm, size: s })}
                      className="rounded border bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-muted-foreground">{t.pieces} *</label>
                {locale === "zh" && outputForm.pieces > 0 && (
                  <span className="text-xs font-medium text-[var(--signal)]">
                    {toChineseNumber(outputForm.pieces)} 件
                  </span>
                )}
              </div>
              <Input
                type="number"
                min={1}
                placeholder={t.pieces}
                value={outputForm.pieces || ""}
                onChange={(e) => setOutputForm({ ...outputForm, pieces: Number(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">{t.note}</label>
              <Input
                placeholder={t.noteOptional}
                value={outputForm.note}
                onChange={(e) => setOutputForm({ ...outputForm, note: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOutputModalOpen(false)}
              >
                {t.cancel}
              </Button>
              <Button
                type="submit"
                disabled={pending || !outputForm.date || !outputForm.pieces}
                className="bg-[var(--signal)] hover:bg-[var(--signal)]/90"
              >
                {outputModalMode === "add" ? (
                  <>
                    <PlusIcon className="size-4" /> {t.addOutput}
                  </>
                ) : (
                  <>
                    <CheckIcon className="size-4" /> {t.save}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= DIALOG: PROCESS MODAL ================= */}
      <Dialog open={isProcessModalOpen} onOpenChange={setIsProcessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <WorkflowIcon className="size-5 text-primary" />
              <span>{processModalMode === "add" ? t.addStep : t.editStep}</span>
            </DialogTitle>
            <DialogDescription>
              {selected?.name} · {t.stepsDesc}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProcessModal} className="space-y-4 py-1">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">{t.stepTitle} *</label>
              <Input
                placeholder={t.stepTitle}
                value={processForm.title}
                onChange={(e) => setProcessForm({ ...processForm, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">{t.description}</label>
              <Input
                placeholder={t.description}
                value={processForm.description}
                onChange={(e) => setProcessForm({ ...processForm, description: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">{t.label}</label>
              <Input
                placeholder={t.label}
                value={processForm.label}
                onChange={(e) => setProcessForm({ ...processForm, label: e.target.value })}
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsProcessModalOpen(false)}
              >
                {t.cancel}
              </Button>
              <Button
                type="submit"
                disabled={pending || !processForm.title.trim()}
              >
                {processModalMode === "add" ? (
                  <>
                    <PlusIcon className="size-4" /> {t.addStep}
                  </>
                ) : (
                  <>
                    <CheckIcon className="size-4" /> {t.updateStep}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= BOTTOM STICKY FOOTER FOR EASY SCROLLING ================= */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t bg-background/90 backdrop-blur-md px-4 py-2.5 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          {/* Floor Summary stats */}
          <div className="flex items-center gap-4 text-xs">
            {selected ? (
              <>
                <span className="hidden font-semibold truncate sm:inline max-w-44 text-foreground">
                  {selected.name}
                </span>
                <span className="text-muted-foreground">
                  {t.received}:{" "}
                  <strong className="text-foreground font-mono">
                    {locale === "zh" ? `${received}件` : nf.format(received)}
                  </strong>
                </span>
                <span className="text-muted-foreground">
                  {t.finished}:{" "}
                  <strong className="text-[var(--success)] font-mono">
                    {locale === "zh" ? `${finished}件` : nf.format(finished)}
                  </strong>
                </span>
                <span className="text-muted-foreground">
                  {t.remaining || "Bal"}:{" "}
                  <strong className="text-[var(--signal)] font-mono">
                    {locale === "zh" ? `${balance}件` : nf.format(balance)}
                  </strong>
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">{t.selectOrCreate}</span>
            )}
          </div>

          {/* Quick Scroll & Jump Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {selected && (
              <div className="hidden sm:flex items-center gap-1 mr-2">
                <Button
                  size="xs"
                  variant={activeTab === "input" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("input")}
                  className="h-7 text-xs"
                >
                  {t.inputTab}
                </Button>
                <Button
                  size="xs"
                  variant={activeTab === "output" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("output")}
                  className="h-7 text-xs"
                >
                  {t.outputTab}
                </Button>
                <Button
                  size="xs"
                  variant={activeTab === "process" ? "secondary" : "ghost"}
                  onClick={() => setActiveTab("process")}
                  className="h-7 text-xs"
                >
                  {t.stepsTab}
                </Button>
              </div>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={scrollToTop}
              title={t.scrollToTop || "Scroll to top"}
              className="h-8 gap-1 px-2.5 text-xs shadow-xs"
            >
              <ChevronsUpIcon className="size-3.5" />
              <span>{t.scrollToTop || "Top"}</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={scrollToBottom}
              title={t.scrollToBottom || "Scroll to bottom"}
              className="h-8 gap-1 px-2.5 text-xs shadow-xs"
            >
              <ChevronsDownIcon className="size-3.5" />
              <span>{t.scrollToBottom || "Bottom"}</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
