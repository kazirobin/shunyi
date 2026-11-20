import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoxesIcon,
  CircleAlertIcon,
  FactoryIcon,
  PackageCheckIcon,
  PackageOpenIcon,
  PhoneIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react";

import { formatYmd, getAdminDict, INTL, type AdminLocale } from "@/components/admin/i18n";
import { getAdminLocale } from "@/lib/admin-locale";
import { ThroughputChart, type ThroughputPoint } from "@/components/admin/throughput-chart";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

import { getLatestAttendanceSummary } from "../attendance/attendance-actions";
import { connectDB } from "@/lib/db-connect";
import EmployeeModel from "../employee/employee-model";
import type { Employee } from "../employee/employee-types";
import { getProducts } from "../layout/actions";
import type { IProduct } from "../layout/types";

export const metadata: Metadata = { title: "Dashboard" };

const sum = (xs: { pieces: number }[]) => xs.reduce((n, x) => n + (Number(x.pieces) || 0), 0);
const pct = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0);

const STATUS: { key: Employee["status"]; bar: string }[] = [
  { key: "active", bar: "bg-[var(--success)]" },
  { key: "pending", bar: "bg-[var(--warning)]" },
  { key: "inactive", bar: "bg-muted-foreground/50" },
  { key: "rejected", bar: "bg-destructive" },
];
const GRADES: Employee["grade"][] = ["a", "b", "c", "d", "e"];

function throughput(products: IProduct[], locale: AdminLocale): ThroughputPoint[] {
  const days = new Map<string, { received: number; finished: number }>();
  const add = (date: string, k: "received" | "finished", n: number) => {
    if (!date) return;
    const d = days.get(date) ?? { received: 0, finished: 0 };
    d[k] += Number(n) || 0;
    days.set(date, d);
  };
  for (const p of products) {
    p.inputs.forEach((e) => add(e.date, "received", e.pieces));
    p.outputs.forEach((e) => add(e.date, "finished", e.pieces));
  }
  return [...days.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-30)
    .map(([date, v]) => ({ date, label: formatYmd(locale, date, { month: "short", day: "numeric" }), ...v }));
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Kpi({
  label,
  value,
  icon: Icon,
  children,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <Card size="sm" className="gap-3 rounded-2xl shadow-none ring-border">
      <CardHeader>
        <CardDescription className="text-[13px]">{label}</CardDescription>
        <CardAction>
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="size-4" />
          </span>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="tnum text-3xl font-semibold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground">{children}</div>
      </CardContent>
    </Card>
  );
}

function EmptyNote({ children, href, cta }: { children: React.ReactNode; href: string; cta: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center">
      <p className="max-w-xs text-sm text-muted-foreground">{children}</p>
      <Button size="sm" variant="outline" nativeButton={false} render={<Link href={href} />}>
        {cta}
      </Button>
    </div>
  );
}

async function loadEmployees(): Promise<{ ok: true; data: Employee[] } | { ok: false }> {
  try {
    await connectDB();
    const rows = await EmployeeModel.find().sort({ serial: 1, createdAt: 1, _id: 1 }).lean();
    return {
      ok: true,
      data: rows.map((r) => ({
        _id: r._id.toString(),
        serial: Number.isInteger(r.serial) ? r.serial : 0,
        name: r.name,
        number: r.number,
        notes: r.notes ?? "",
        photoUrl: r.photoUrl ?? "",
        status: r.status ?? "active",
        grade: r.grade ?? "a",
      })),
    };
  } catch (error) {
    console.error("Dashboard employees error:", error);
    return { ok: false };
  }
}

async function loadProducts(): Promise<{ ok: true; data: IProduct[] } | { ok: false }> {
  try {
    return { ok: true, data: (await getProducts()) as IProduct[] };
  } catch (error) {
    console.error("Dashboard products error:", error);
    return { ok: false };
  }
}

async function DashboardData() {
  await connection();
  const locale = await getAdminLocale();
  const t = getAdminDict(locale);
  const d = t.dash;
  const nf = new Intl.NumberFormat(INTL[locale]);
  const [empRes, prodRes, att] = await Promise.all([loadEmployees(), loadProducts(), getLatestAttendanceSummary()]);
  const employees: Employee[] = empRes.ok ? empRes.data : [];
  const products: IProduct[] = prodRes.ok ? prodRes.data : [];
  const failed = !empRes.ok || !prodRes.ok;

  const byStatus = Object.fromEntries(STATUS.map((s) => [s.key, employees.filter((e) => e.status === s.key).length]));
  const byGrade = Object.fromEntries(GRADES.map((g) => [g, employees.filter((e) => e.grade === g).length]));
  const received = products.reduce((n, p) => n + sum(p.inputs), 0);
  const finished = products.reduce((n, p) => n + sum(p.outputs), 0);
  const processes = products.reduce((n, p) => n + p.processes.length, 0);
  const rate = pct(finished, received);
  const series = throughput(products, locale);
  const pending = employees.filter((e) => e.status === "pending");
  const maxGrade = Math.max(1, ...Object.values(byGrade));

  return (
    <div className="space-y-6">
      {failed && (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <CircleAlertIcon className="mt-0.5 size-4 shrink-0" />
          {d.loadError}
        </div>
      )}

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label={d.employees} value={nf.format(employees.length)} icon={UsersIcon}>
          <span className="font-medium text-[var(--success)]">{d.active(nf.format(byStatus.active ?? 0))}</span>
          {pending.length > 0 && <> · {d.pendingReview(nf.format(pending.length))}</>}
        </Kpi>
        <Kpi label={d.products} value={nf.format(products.length)} icon={BoxesIcon}>
          {d.stepsDefined(nf.format(processes))}
        </Kpi>
        <Kpi label={d.received} value={nf.format(received)} icon={PackageOpenIcon}>
          {d.acrossEntries(nf.format(products.reduce((n, p) => n + p.inputs.length, 0)))}
        </Kpi>
        <Card size="sm" className="gap-3 rounded-2xl bg-primary text-primary-foreground shadow-none ring-0">
          <CardHeader>
            <CardDescription className="text-[13px] text-primary-foreground/70">{d.finished}</CardDescription>
            <CardAction>
              <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--signal)] text-white">
                <PackageCheckIcon className="size-4" />
              </span>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2.5">
            <div className="tnum text-3xl font-semibold tracking-tight">{nf.format(finished)}</div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-[var(--signal)]" style={{ width: `${Math.min(rate, 100)}%` }} />
            </div>
            <div className="text-xs text-primary-foreground/70">
              <span className="tnum font-medium text-white">{rate}%</span> {d.ofReceived}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart + workforce */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-2xl shadow-none ring-border xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{d.throughput}</CardTitle>
            <CardDescription>{d.throughputDesc}</CardDescription>
            <CardAction>
              <Button size="sm" variant="ghost" nativeButton={false} render={<Link href="/admin/layout" />}>
                {d.logEntry} <ArrowRightIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {series.length > 0 ? (
              <ThroughputChart data={series} labels={{ received: d.seriesReceived, finished: d.seriesFinished }} />
            ) : (
              <EmptyNote href="/admin/layout" cta={d.openProduction}>
                {d.throughputEmpty}
              </EmptyNote>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-none ring-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{d.workforce}</CardTitle>
            <CardDescription>{d.onRecord(nf.format(employees.length))}</CardDescription>
            <CardAction>
              <Button size="icon-sm" variant="ghost" aria-label={d.openEmployees} nativeButton={false} render={<Link href="/admin/employee" />}>
                <ArrowUpRightIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
              {STATUS.map((s) =>
                byStatus[s.key] ? (
                  <div key={s.key} className={s.bar} style={{ width: `${pct(byStatus[s.key], employees.length)}%` }} />
                ) : null,
              )}
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
              {STATUS.map((s) => (
                <li key={s.key} className="flex items-center gap-2 text-sm">
                  <span className={`size-2 rounded-full ${s.bar}`} />
                  <span className="text-muted-foreground">{t.status[s.key]}</span>
                  <span className="tnum ml-auto font-medium">{nf.format(byStatus[s.key] ?? 0)}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-3 border-t pt-5">
              <div className="text-xs font-medium text-muted-foreground">{d.byGrade}</div>
              <div className="flex h-24 items-end gap-2">
                {GRADES.map((g) => (
                  <div key={g} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="tnum text-xs font-medium">{byGrade[g]}</span>
                    <div
                      className="w-full rounded-md bg-[var(--chart-2)]/85"
                      style={{ height: `${Math.max(4, (byGrade[g] / maxGrade) * 56)}px` }}
                    />
                    <span className="text-xs text-muted-foreground uppercase">{g}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Production lines + pending */}
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="rounded-2xl shadow-none ring-border xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{d.lines}</CardTitle>
            <CardDescription>{d.linesDesc}</CardDescription>
            <CardAction>
              <Button size="sm" variant="outline" nativeButton={false} render={<Link href="/admin/layout" />}>
                <PlusIcon /> {d.newProduct}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <EmptyNote href="/admin/layout" cta={d.createProduct}>
                {d.linesEmpty}
              </EmptyNote>
            ) : (
              <Accordion defaultValue={[products[0]._id]} className="rounded-xl">
                {products.map((p) => {
                  const pin = sum(p.inputs);
                  const pout = sum(p.outputs);
                  const prate = pct(pout, pin);
                  const steps = [...p.processes].sort((a, b) => a.serial - b.serial);
                  const recent = [
                    ...p.inputs.map((e) => ({ id: e._id, date: e.date, kind: "in" as const, what: e.workName, pieces: e.pieces })),
                    ...p.outputs.map((e) => ({ id: e._id, date: e.date, kind: "out" as const, what: e.note || d.finishedDefault, pieces: e.pieces })),
                  ]
                    .sort((a, b) => b.date.localeCompare(a.date))
                    .slice(0, 4);
                  return (
                    <AccordionItem key={p._id} value={p._id} className="data-open:bg-muted/40">
                      <AccordionTrigger className="items-center gap-4 hover:no-underline">
                        <span className="flex min-w-0 flex-1 items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                            <FactoryIcon className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate font-medium">{p.name}</span>
                            <span className="tnum block text-xs font-normal text-muted-foreground">
                              {d.piecesSteps(nf.format(pout), nf.format(pin), steps.length)}
                            </span>
                          </span>
                        </span>
                        <span className="hidden w-32 items-center gap-2 sm:flex">
                          <Progress value={Math.min(prate, 100)} className="flex-1 gap-0 [&_[data-slot=progress-track]]:h-1.5" />
                          <span className="tnum w-9 text-right text-xs font-medium">{prate}%</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-6 pt-1 md:grid-cols-2">
                          <div>
                            <div className="mb-3 text-xs font-medium text-muted-foreground">{d.processSteps}</div>
                            {steps.length ? (
                              <ol className="relative space-y-3 border-l pl-5">
                                {steps.map((s) => (
                                  <li key={s._id} className="relative">
                                    <span className="tnum absolute top-0 -left-[31px] flex size-5 items-center justify-center rounded-full border bg-card text-[10px] font-semibold">
                                      {s.serial}
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-medium">{s.title}</span>
                                      {s.label && <Badge variant="secondary">{s.label}</Badge>}
                                    </div>
                                    {s.description && <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>}
                                  </li>
                                ))}
                              </ol>
                            ) : (
                              <p className="text-sm text-muted-foreground">{d.noSteps}</p>
                            )}
                          </div>
                          <div>
                            <div className="mb-3 text-xs font-medium text-muted-foreground">{d.latestEntries}</div>
                            {recent.length ? (
                              <ul className="divide-y rounded-lg border bg-card">
                                {recent.map((r) => (
                                  <li key={`${r.kind}-${r.id}`} className="flex items-center gap-3 px-3 py-2">
                                    <Badge
                                      variant="outline"
                                      className={r.kind === "in" ? "text-[var(--chart-2)]" : "border-[var(--signal)]/30 text-[var(--signal)]"}
                                    >
                                      {d[r.kind]}
                                    </Badge>
                                    <span className="min-w-0 flex-1 truncate">{r.what}</span>
                                    <span className="tnum text-xs text-muted-foreground">{r.date}</span>
                                    <span className="tnum w-14 text-right font-medium">{nf.format(r.pieces)}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground">{d.noEntries}</p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
        <Card className="rounded-2xl shadow-none ring-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{d.latestAttendance}</CardTitle>
            <CardDescription>
              {att
                ? formatYmd(locale, att.date, { weekday: "short", month: "short", day: "numeric", year: "numeric" })
                : d.noRegister}
            </CardDescription>
            <CardAction>
              <Button size="icon-sm" variant="ghost" aria-label={d.openAttendance} nativeButton={false} render={<Link href="/admin/attendance" />}>
                <ArrowUpRightIcon />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            {att ? (
              (() => {
                const parts = [
                  { label: t.att.present, n: att.present, bar: "bg-[var(--success)]" },
                  { label: t.att.late, n: att.late, bar: "bg-[var(--warning)]" },
                  { label: t.att.absent, n: att.absent, bar: "bg-destructive" },
                  { label: t.att.leave, n: att.leave, bar: "bg-[var(--chart-3)]" },
                ];
                const marked = att.present + att.late + att.absent + att.leave;
                const unmarked = Math.max(0, att.active - marked);
                const total = Math.max(1, marked + unmarked);
                return (
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="tnum text-3xl font-semibold tracking-tight">{pct(att.present + att.late, Math.max(1, marked))}%</span>
                      <span className="text-xs text-muted-foreground">{d.attendedOf(nf.format(marked))}</span>
                    </div>
                    <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
                      {parts.map((x) => (x.n ? <div key={x.label} className={x.bar} style={{ width: `${(x.n / total) * 100}%` }} /> : null))}
                    </div>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      {parts.map((x) => (
                        <li key={x.label} className="flex items-center gap-2">
                          <span className={`size-2 rounded-full ${x.bar}`} />
                          <span className="text-muted-foreground">{x.label}</span>
                          <span className="tnum ml-auto font-medium">{x.n}</span>
                        </li>
                      ))}
                      {unmarked > 0 && (
                        <li className="col-span-2 flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="size-2 rounded-full border border-dashed border-muted-foreground" />
                          {d.notMarked(unmarked)}
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })()
            ) : (
              <EmptyNote href="/admin/attendance" cta={d.openAttendance}>
                {d.attendanceEmpty}
              </EmptyNote>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-none ring-border">
          <CardHeader>
            <CardTitle className="text-base font-semibold">{d.pendingTitle}</CardTitle>
            <CardDescription>
              {pending.length ? d.awaiting(pending.length) : d.nothingWaiting}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pending.length ? (
              <ul className="space-y-1">
                {pending.slice(0, 6).map((e) => (
                  <li key={e._id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/60">
                    <Avatar>
                      {e.photoUrl && <AvatarImage src={e.photoUrl} alt="" />}
                      <AvatarFallback className="text-xs">{initials(e.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{e.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <PhoneIcon className="size-3" />
                        <span className="tnum truncate">{e.number}</span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="uppercase">
                      {e.grade}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl bg-muted/60 px-4 py-6 text-center text-sm text-muted-foreground">
                {d.allReviewed}
              </p>
            )}
            <Button variant="outline" className="mt-4 w-full" nativeButton={false} render={<Link href="/admin/employee" />}>
              {d.manageEmployees}
            </Button>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}

function DataSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-36 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Skeleton className="h-96 rounded-2xl xl:col-span-2" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const d = getAdminDict(await getAdminLocale()).dash;
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{d.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{d.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" nativeButton={false} render={<Link href="/admin/employee" />}>
            <UsersIcon /> {d.addEmployee}
          </Button>
          <Button className="bg-[var(--signal)] hover:bg-[var(--signal)]/90" nativeButton={false} render={<Link href="/admin/layout" />}>
            <PlusIcon /> {d.logProduction}
          </Button>
        </div>
      </div>
      <Suspense fallback={<DataSkeleton />}>
        <DashboardData />
      </Suspense>
    </div>
  );
}
