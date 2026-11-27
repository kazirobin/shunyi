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
  PackageCheckIcon,
  PackageOpenIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  WorkflowIcon,
  XIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminI18n } from "@/components/admin/i18n-provider";



function withRunningTotal<T extends { pieces: number }>(items: T[]) {
  let running = 0;
  return items.map((item) => {
    running += Number(item.pieces) || 0;
    return { item, total: running };
  });
}

export default function ProductionPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selected, setSelected] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [pending, startTransition] = useTransition();
  const { t: dict, nf } = useAdminI18n();
  const t = dict.prod;

  // Product name edit states
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // INPUT states
  const [inDate, setInDate] = useState("");
  const [inWork, setInWork] = useState("");
  const [inPieces, setInPieces] = useState(0);
  const [inNote, setInNote] = useState("");

  // OUTPUT states
  const [outDate, setOutDate] = useState("");
  const [outPieces, setOutPieces] = useState(0);
  const [outNote, setOutNote] = useState("");

  // PROCESS states
  const [pTitle, setPTitle] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pLabel, setPLabel] = useState("");
  const [editing, setEditing] = useState<IProcess | null>(null);

  // INPUT edit states
  const [editingInput, setEditingInput] = useState<IInputEntry | null>(null);
  const [editInDate, setEditInDate] = useState("");
  const [editInWork, setEditInWork] = useState("");
  const [editInPieces, setEditInPieces] = useState(0);
  const [editInNote, setEditInNote] = useState("");

  // OUTPUT edit states
  const [editingOutput, setEditingOutput] = useState<IOutputEntry | null>(null);
  const [editOutDate, setEditOutDate] = useState("");
  const [editOutPieces, setEditOutPieces] = useState(0);
  const [editOutNote, setEditOutNote] = useState("");

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

  // ---------- Product ----------
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

  // ---------- Input ----------
  const handleAddInput = () => {
    if (!selected || !inDate || !inWork || !inPieces) return;
    startTransition(async () => {
      await addInput(selected._id!, {
        date: inDate,
        workName: inWork,
        pieces: Number(inPieces),
        note: inNote,
      });
      setInDate(""); setInWork(""); setInPieces(0); setInNote("");
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

  const handleEditInput = (entry: IInputEntry) => {
    setEditingInput(entry);
    setEditInDate(entry.date);
    setEditInWork(entry.workName);
    setEditInPieces(entry.pieces);
    setEditInNote(entry.note || "");
  };

  const handleCancelEditInput = () => {
    setEditingInput(null);
    setEditInDate("");
    setEditInWork("");
    setEditInPieces(0);
    setEditInNote("");
  };

  const handleSaveInput = () => {
    if (!selected || !editingInput || !editInDate || !editInWork || !editInPieces) return;
    startTransition(async () => {
      await updateInput(selected._id!, editingInput._id!, {
        date: editInDate,
        workName: editInWork,
        pieces: Number(editInPieces),
        note: editInNote,
      });
      handleCancelEditInput();
      await refresh();
    });
  };

  // ---------- Output ----------
  const handleAddOutput = () => {
    if (!selected || !outDate || !outPieces) return;
    startTransition(async () => {
      await addOutput(selected._id!, {
        date: outDate,
        pieces: Number(outPieces),
        note: outNote,
      });
      setOutDate(""); setOutPieces(0); setOutNote("");
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

  const handleEditOutput = (entry: IOutputEntry) => {
    setEditingOutput(entry);
    setEditOutDate(entry.date);
    setEditOutPieces(entry.pieces);
    setEditOutNote(entry.note || "");
  };

  const handleCancelEditOutput = () => {
    setEditingOutput(null);
    setEditOutDate("");
    setEditOutPieces(0);
    setEditOutNote("");
  };

  const handleSaveOutput = () => {
    if (!selected || !editingOutput || !editOutDate || !editOutPieces) return;
    startTransition(async () => {
      await updateOutput(selected._id!, editingOutput._id!, {
        date: editOutDate,
        pieces: Number(editOutPieces),
        note: editOutNote,
      });
      handleCancelEditOutput();
      await refresh();
    });
  };

  // ---------- Process ----------
  const resetProcessForm = () => {
    setPTitle(""); setPDesc(""); setPLabel(""); setEditing(null);
  };

  const handleSubmitProcess = () => {
    if (!selected || !pTitle.trim()) return;
    startTransition(async () => {
      if (editing) {
        await updateProcess(selected._id!, editing._id!, {
          title: pTitle,
          description: pDesc,
          label: pLabel,
        });
      } else {
        await addProcess(selected._id!, {
          serial: 0,
          title: pTitle,
          description: pDesc,
          label: pLabel,
        });
      }
      resetProcessForm();
      await refresh();
    });
  };

  const handleEditProcess = (p: IProcess) => {
    setEditing(p);
    setPTitle(p.title);
    setPDesc(p.description || "");
    setPLabel(p.label || "");
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
  const rate = received > 0 ? Math.round((finished / received) * 100) : 0;
  const steps = selected ? [...selected.processes].sort((a, b) => a.serial - b.serial) : [];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
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
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder={t.newProductName} aria-label={t.newProductName} />
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
                      <BoxesIcon className={`size-4 shrink-0 ${selected?._id === p._id ? "text-[var(--signal)]" : "text-muted-foreground"}`} />
                      <span className="truncate font-medium">{p.name}</span>
                      <span className={`tnum ml-auto text-xs ${selected?._id === p._id ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
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
                <CardDescription>{t.stepsEntries(steps.length, selected.inputs.length + selected.outputs.length)}</CardDescription>
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
              <CardContent className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><PackageOpenIcon className="size-3.5" /> {t.received}</div>
                  <div className="tnum mt-1 text-2xl font-semibold">{nf.format(received)}</div>
                </div>
                <div className="rounded-xl bg-muted/60 p-4">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><PackageCheckIcon className="size-3.5" /> {t.finished}</div>
                  <div className="tnum mt-1 text-2xl font-semibold">{nf.format(finished)}</div>
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

            <Tabs defaultValue="input">
              <TabsList className="bg-card ring-1 ring-border">
                <TabsTrigger value="input">{t.inputTab} <span className="tnum ml-1 text-muted-foreground">{selected.inputs.length}</span></TabsTrigger>
                <TabsTrigger value="output">{t.outputTab} <span className="tnum ml-1 text-muted-foreground">{selected.outputs.length}</span></TabsTrigger>
                <TabsTrigger value="process">{t.stepsTab} <span className="tnum ml-1 text-muted-foreground">{steps.length}</span></TabsTrigger>
              </TabsList>

              {/* ---------- INPUT ---------- */}
              <TabsContent value="input">
                <Card className="rounded-2xl shadow-none ring-border">
                  <CardHeader>
                    <CardTitle className="font-semibold">{t.inputTab}</CardTitle>
                    <CardDescription>{t.inputDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form
                      className="grid gap-2 sm:grid-cols-[150px_1fr_110px_1fr_auto]"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddInput();
                      }}
                    >
                      <Input type="date" value={inDate} onChange={(e) => setInDate(e.target.value)} aria-label={t.date} required />
                      <Input placeholder={t.workName} value={inWork} onChange={(e) => setInWork(e.target.value)} aria-label={t.workName} required />
                      <Input type="number" min={1} placeholder={t.pieces} value={inPieces || ""} onChange={(e) => setInPieces(Number(e.target.value))} aria-label={t.pieces} required />
                      <Input placeholder={t.noteOptional} value={inNote} onChange={(e) => setInNote(e.target.value)} aria-label={t.note} />
                      <Button type="submit" disabled={pending}><PlusIcon /> {t.addInput}</Button>
                    </form>
                    <div className="overflow-hidden rounded-xl border">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead>{t.date}</TableHead>
                            <TableHead>{t.work}</TableHead>
                            <TableHead className="text-right">{t.pieces}</TableHead>
                            <TableHead>{t.note}</TableHead>
                            <TableHead className="w-10"><span className="sr-only">{t.actions}</span></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {withRunningTotal(selected.inputs).map(({ item: i, total }) => (
                            editingInput?._id === i._id ? (
                              <TableRow key={i._id} className="bg-muted/30">
                                <TableCell><Input type="date" value={editInDate} onChange={(e) => setEditInDate(e.target.value)} className="h-8" aria-label={t.date} /></TableCell>
                                <TableCell><Input value={editInWork} onChange={(e) => setEditInWork(e.target.value)} className="h-8" aria-label={t.workName} /></TableCell>
                                <TableCell><Input type="number" min={1} value={editInPieces || ""} onChange={(e) => setEditInPieces(Number(e.target.value))} className="h-8 text-right" aria-label={t.pieces} /></TableCell>
                                <TableCell><Input value={editInNote} onChange={(e) => setEditInNote(e.target.value)} className="h-8" aria-label={t.note} /></TableCell>
                                <TableCell>
                                  <div className="flex gap-0.5">
                                    <Button size="icon-xs" variant="ghost" onClick={handleSaveInput} disabled={pending} aria-label={t.updateInput} className="text-[var(--signal)]">
                                      <CheckIcon />
                                    </Button>
                                    <Button size="icon-xs" variant="ghost" onClick={handleCancelEditInput} aria-label={t.cancel}>
                                      <XIcon />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ) : (
                            <TableRow key={i._id}>
                              <TableCell className="tnum text-muted-foreground">{i.date}</TableCell>
                              <TableCell className="font-medium">{i.workName}</TableCell>
                              <TableCell className="tnum text-right font-medium">
                                {nf.format(i.pieces)}
                                <span className="font-normal text-muted-foreground">/{nf.format(total)}</span>
                              </TableCell>
                              <TableCell className="max-w-48 truncate text-muted-foreground">{i.note}</TableCell>
                              <TableCell>
                                <div className="flex gap-0.5">
                                  <Button size="icon-xs" variant="ghost" onClick={() => handleEditInput(i)} aria-label={t.editInput} className="text-muted-foreground hover:text-[var(--signal)]">
                                    <PencilIcon />
                                  </Button>
                                  <Button size="icon-xs" variant="ghost" onClick={() => handleDeleteInput(i._id!)} aria-label={t.deleteInput} className="text-muted-foreground hover:text-destructive">
                                    <Trash2Icon />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            )
                          ))}
                          {selected.inputs.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">{t.noInput}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ---------- OUTPUT ---------- */}
              <TabsContent value="output">
                <Card className="rounded-2xl shadow-none ring-border">
                  <CardHeader>
                    <CardTitle className="font-semibold">{t.outputTab}</CardTitle>
                    <CardDescription>{t.outputDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form
                      className="grid gap-2 sm:grid-cols-[150px_110px_1fr_auto]"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddOutput();
                      }}
                    >
                      <Input type="date" value={outDate} onChange={(e) => setOutDate(e.target.value)} aria-label={t.date} required />
                      <Input type="number" min={1} placeholder={t.pieces} value={outPieces || ""} onChange={(e) => setOutPieces(Number(e.target.value))} aria-label={t.pieces} required />
                      <Input placeholder={t.noteOptional} value={outNote} onChange={(e) => setOutNote(e.target.value)} aria-label={t.note} />
                      <Button type="submit" disabled={pending} className="bg-[var(--signal)] hover:bg-[var(--signal)]/90"><PlusIcon /> {t.addOutput}</Button>
                    </form>
                    <div className="overflow-hidden rounded-xl border">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead>{t.date}</TableHead>
                            <TableHead className="text-right">{t.pieces}</TableHead>
                            <TableHead>{t.note}</TableHead>
                            <TableHead className="w-10"><span className="sr-only">{t.actions}</span></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {withRunningTotal(selected.outputs).map(({ item: o, total }) => (
                            editingOutput?._id === o._id ? (
                              <TableRow key={o._id} className="bg-muted/30">
                                <TableCell><Input type="date" value={editOutDate} onChange={(e) => setEditOutDate(e.target.value)} className="h-8" aria-label={t.date} /></TableCell>
                                <TableCell><Input type="number" min={1} value={editOutPieces || ""} onChange={(e) => setEditOutPieces(Number(e.target.value))} className="h-8 text-right" aria-label={t.pieces} /></TableCell>
                                <TableCell><Input value={editOutNote} onChange={(e) => setEditOutNote(e.target.value)} className="h-8" aria-label={t.note} /></TableCell>
                                <TableCell>
                                  <div className="flex gap-0.5">
                                    <Button size="icon-xs" variant="ghost" onClick={handleSaveOutput} disabled={pending} aria-label={t.updateOutput} className="text-[var(--signal)]">
                                      <CheckIcon />
                                    </Button>
                                    <Button size="icon-xs" variant="ghost" onClick={handleCancelEditOutput} aria-label={t.cancel}>
                                      <XIcon />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ) : (
                            <TableRow key={o._id}>
                              <TableCell className="tnum text-muted-foreground">{o.date}</TableCell>
                              <TableCell className="tnum text-right font-medium">
                                {nf.format(o.pieces)}
                                <span className="font-normal text-muted-foreground">/{nf.format(total)}</span>
                              </TableCell>
                              <TableCell className="max-w-64 truncate text-muted-foreground">{o.note}</TableCell>
                              <TableCell>
                                <div className="flex gap-0.5">
                                  <Button size="icon-xs" variant="ghost" onClick={() => handleEditOutput(o)} aria-label={t.editOutput} className="text-muted-foreground hover:text-[var(--signal)]">
                                    <PencilIcon />
                                  </Button>
                                  <Button size="icon-xs" variant="ghost" onClick={() => handleDeleteOutput(o._id!)} aria-label={t.deleteOutput} className="text-muted-foreground hover:text-destructive">
                                    <Trash2Icon />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            )
                          ))}
                          {selected.outputs.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">{t.noOutput}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ---------- PROCESS ---------- */}
              <TabsContent value="process">
                <Card className="rounded-2xl shadow-none ring-border">
                  <CardHeader>
                    <CardTitle className="font-semibold">{t.stepsTab}</CardTitle>
                    <CardDescription>{t.stepsDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form
                      className="grid gap-2 sm:grid-cols-[1fr_1.4fr_140px_auto]"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitProcess();
                      }}
                    >
                      <Input placeholder={t.stepTitle} value={pTitle} onChange={(e) => setPTitle(e.target.value)} aria-label={t.stepTitle} required />
                      <Input placeholder={t.description} value={pDesc} onChange={(e) => setPDesc(e.target.value)} aria-label={t.description} />
                      <Input placeholder={t.label} value={pLabel} onChange={(e) => setPLabel(e.target.value)} aria-label={t.label} />
                      <div className="flex gap-2">
                        <Button type="submit" disabled={pending}>
                          {editing ? <CheckIcon /> : <PlusIcon />} {editing ? t.updateStep : t.addStep}
                        </Button>
                        {editing && (
                          <Button type="button" variant="ghost" onClick={resetProcessForm}>{t.cancel}</Button>
                        )}
                      </div>
                    </form>
                    {steps.length ? (
                      <ol className="space-y-2">
                        {steps.map((p, i) => (
                          <li
                            key={p._id}
                            className={`flex items-start gap-3 rounded-xl border bg-card p-3 transition-colors ${editing?._id === p._id ? "border-[var(--signal)] ring-2 ring-[var(--signal)]/15" : ""}`}
                          >
                            <span className="tnum flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                              {p.serial}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium">{p.title}</span>
                                {p.label && <Badge variant="secondary">{p.label}</Badge>}
                              </div>
                              {p.description && <p className="mt-0.5 text-sm text-muted-foreground">{p.description}</p>}
                            </div>
                            <div className="flex shrink-0 items-center gap-0.5">
                              <Button size="icon-sm" variant="ghost" disabled={i === 0} onClick={() => handleMoveProcess(p._id!, -1)} aria-label={t.moveUp}>
                                <ArrowUpIcon />
                              </Button>
                              <Button size="icon-sm" variant="ghost" disabled={i === steps.length - 1} onClick={() => handleMoveProcess(p._id!, 1)} aria-label={t.moveDown}>
                                <ArrowDownIcon />
                              </Button>
                              <Button size="icon-sm" variant="ghost" onClick={() => handleEditProcess(p)} aria-label={t.editStep}>
                                <PencilIcon />
                              </Button>
                              <Button size="icon-sm" variant="ghost" onClick={() => handleDeleteProcess(p._id!)} aria-label={t.deleteStep} className="text-muted-foreground hover:text-destructive">
                                <Trash2Icon />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-10 text-center">
                        <WorkflowIcon className="size-6 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">{t.noSteps}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
