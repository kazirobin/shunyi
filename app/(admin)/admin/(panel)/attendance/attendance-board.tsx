"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, useTransition } from "react";
import {
  CalendarCheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCheckIcon,
  DownloadIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  clearAttendance,
  getAttendanceDay,
  getAttendanceMonth,
  markAllPresent,
  setAttendance,
} from "./attendance-actions";
import {
  ATTENDANCE_STATUSES,
  type AttendanceEmployee,
  type AttendanceRecord,
  type AttendanceStatus,
} from "./attendance-types";
import { useAdminI18n } from "@/components/admin/i18n-provider";

const SHORT = { present: "shortPresent", late: "shortLate", absent: "shortAbsent", leave: "shortLeave" } as const;
const META: Record<AttendanceStatus, { on: string; dot: string; cell: string }> = {
  present: { on: "bg-[var(--success)] text-white", dot: "bg-[var(--success)]", cell: "bg-[var(--success)]/15 text-[var(--success)]" },
  late: { on: "bg-[var(--warning)] text-white", dot: "bg-[var(--warning)]", cell: "bg-[var(--warning)]/15 text-[var(--warning)]" },
  absent: { on: "bg-destructive text-white", dot: "bg-destructive", cell: "bg-destructive/12 text-destructive" },
  leave: { on: "bg-[var(--chart-3)] text-white", dot: "bg-[var(--chart-3)]", cell: "bg-[var(--chart-3)]/15 text-[var(--chart-2)]" },
};

const pad = (n: number) => String(n).padStart(2, "0");
const ymd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const shiftDay = (date: string, by: number) => {
  const d = new Date(`${date}T00:00:00`);
  d.setDate(d.getDate() + by);
  return ymd(d);
};
const LONG_DATE: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric", year: "numeric" };
const MONTH_LABEL: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

const noop = () => () => {};
function useToday() {
  return useSyncExternalStore(noop, () => ymd(new Date()), () => "");
}

type DayData = { date: string; ok: boolean; message: string; employees: AttendanceEmployee[]; records: AttendanceRecord[] };
type MonthData = DayData & { month: string };

// ─── Daily register ──────────────────────────────────────────────────────────

function StatusPicker({
  value,
  disabled,
  onPick,
}: {
  value?: AttendanceStatus;
  disabled?: boolean;
  onPick: (s: AttendanceStatus) => void;
}) {
  const { t } = useAdminI18n();
  return (
    <div role="radiogroup" aria-label={t.att.statusGroup} className="inline-flex rounded-full bg-muted p-1">
      {ATTENDANCE_STATUSES.map((s) => {
        const on = value === s;
        return (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={disabled}
            onClick={() => onPick(s)}
            className={`h-7 rounded-full px-3 text-xs font-medium transition-colors disabled:opacity-50 ${
              on ? META[s].on : "text-muted-foreground hover:bg-card hover:text-foreground"
            }`}
          >
            {t.att[s]}
          </button>
        );
      })}
    </div>
  );
}

function DayRow({
  employee,
  record,
  date,
  onSaved,
  onError,
}: {
  employee: AttendanceEmployee;
  record?: AttendanceRecord;
  date: string;
  onSaved: (r: AttendanceRecord | null) => void;
  onError: (message: string) => void;
}) {
  const [checkIn, setCheckIn] = useState(record?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(record?.checkOut ?? "");
  const [note, setNote] = useState(record?.note ?? "");
  const [saving, startSaving] = useTransition();
  const { t } = useAdminI18n();

  function save(next: Partial<AttendanceRecord> & { status: AttendanceStatus }) {
    const merged: AttendanceRecord = {
      employeeId: employee._id,
      date,
      checkIn,
      checkOut,
      note,
      ...next,
    };
    const previous = record ?? null;
    onSaved(merged);
    startSaving(async () => {
      const res = await setAttendance(employee._id, date, merged);
      if (!res.success) {
        onSaved(previous);
        onError(res.message);
      }
    });
  }

  function pick(status: AttendanceStatus) {
    if (record?.status === status) {
      const previous = record;
      onSaved(null);
      setCheckIn("");
      setCheckOut("");
      setNote("");
      startSaving(async () => {
        const res = await clearAttendance(employee._id, date);
        if (!res.success) {
          onSaved(previous);
          onError(res.message);
        }
      });
      return;
    }
    save({ status });
  }

  const commit = () => {
    if (!record) return;
    if (checkIn === record.checkIn && checkOut === record.checkOut && note.trim() === record.note) return;
    save({ status: record.status, checkIn, checkOut, note: note.trim() });
  };

  return (
    <li className="grid gap-3 px-4 py-3 md:grid-cols-[minmax(180px,1.2fr)_auto_minmax(250px,1fr)] md:items-center md:gap-4 md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <Avatar>
          {employee.photoUrl && <AvatarImage src={employee.photoUrl} alt="" />}
          <AvatarFallback className="text-xs">{initials(employee.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate font-medium">{employee.name}</span>
            {saving && <span className="size-1.5 animate-pulse rounded-full bg-[var(--signal)]" aria-label={t.att.saving} />}
          </div>
          <div className="tnum text-xs text-muted-foreground">
            #{employee.serial} · {t.grade(employee.grade)}
          </div>
        </div>
      </div>

      <StatusPicker value={record?.status} onPick={pick} />

      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
        <Input
          type="time"
          value={checkIn}
          disabled={!record}
          onChange={(e) => setCheckIn(e.target.value)}
          onBlur={commit}
          aria-label={t.att.checkInFor(employee.name)}
          className="h-8 tnum"
        />
        <Input
          type="time"
          value={checkOut}
          disabled={!record}
          onChange={(e) => setCheckOut(e.target.value)}
          onBlur={commit}
          aria-label={t.att.checkOutFor(employee.name)}
          className="h-8 tnum"
        />
        <Input
          value={note}
          disabled={!record}
          maxLength={500}
          placeholder={record ? t.att.note : t.att.setStatusFirst}
          onChange={(e) => setNote(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          aria-label={t.att.noteFor(employee.name)}
          className="h-8"
        />
      </div>
    </li>
  );
}

function DailyRegister({ today }: { today: string }) {
  const [picked, setPicked] = useState<string | null>(null);
  const date = picked ?? today;
  const [data, setData] = useState<DayData | null>(null);
  const [reload, setReload] = useState(0);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [bulk, startBulk] = useTransition();
  const { t, date: fmtDate } = useAdminI18n();

  useEffect(() => {
    let live = true;
    getAttendanceDay(date).then((res) => {
      if (live) setData({ date, ok: res.success, message: res.message, employees: res.employees, records: res.records });
    });
    return () => {
      live = false;
    };
  }, [date, reload]);

  const loading = !data || data.date !== date;
  const records = useMemo(() => new Map((data?.records ?? []).map((r) => [r.employeeId, r])), [data]);
  const employees = data?.employees ?? [];
  const visible = employees.filter((e) => `${e.name} ${e.number} ${e.serial}`.toLowerCase().includes(search.toLowerCase()));
  const counts = ATTENDANCE_STATUSES.map((s) => ({ s, n: employees.filter((e) => records.get(e._id)?.status === s).length }));
  const unmarked = employees.filter((e) => !records.has(e._id)).length;

  function upsertLocal(employeeId: string, r: AttendanceRecord | null) {
    setData((d) => {
      if (!d) return d;
      const rest = d.records.filter((x) => x.employeeId !== employeeId);
      return { ...d, records: r ? [...rest, r] : rest };
    });
  }

  function markRest() {
    if (!confirm(t.att.confirmMarkRest(unmarked, fmtDate(date, LONG_DATE)))) return;
    startBulk(async () => {
      const res = await markAllPresent(date);
      setMessage(res.message);
      setReload((n) => n + 1);
    });
  }

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl shadow-none ring-border">
        <CardContent className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <Button size="icon-sm" variant="outline" onClick={() => setPicked(shiftDay(date, -1))} aria-label={t.att.prevDay}>
              <ChevronLeftIcon />
            </Button>
            <Input
              type="date"
              value={date}
              max={today}
              onChange={(e) => e.target.value && setPicked(e.target.value)}
              className="h-8 w-40 tnum"
              aria-label={t.att.dateLabel}
            />
            <Button
              size="icon-sm"
              variant="outline"
              disabled={date >= today}
              onClick={() => setPicked(shiftDay(date, 1))}
              aria-label={t.att.nextDay}
            >
              <ChevronRightIcon />
            </Button>
            {date !== today && (
              <Button size="sm" variant="ghost" onClick={() => setPicked(null)}>
                {t.att.today}
              </Button>
            )}
          </div>
          <div className="font-medium">{fmtDate(date, LONG_DATE)}</div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            {counts.map(({ s, n }) => (
              <span key={s} className="inline-flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs">
                <span className={`size-2 rounded-full ${META[s].dot}`} />
                {t.att[s]}
                <span className="tnum font-semibold">{loading ? "–" : n}</span>
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-2.5 py-1 text-xs text-muted-foreground">
              {t.att.unmarked} <span className="tnum font-semibold text-foreground">{loading ? "–" : unmarked}</span>
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="gap-0 rounded-2xl pb-0 shadow-none ring-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-semibold">{t.att.registerTitle}</CardTitle>
          <CardDescription>
            {t.att.registerDesc}
          </CardDescription>
        </CardHeader>
        <div className="flex flex-wrap items-center gap-2 px-(--card-spacing) pb-4">
            <div className="relative min-w-0 flex-1 sm:flex-none">
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.att.searchPh}
                className="h-8 w-full pl-9 sm:w-56"
                aria-label={t.att.searchLabel}
              />
            </div>
            <Button size="sm" disabled={loading || unmarked === 0 || bulk} onClick={markRest}>
              <CheckCheckIcon /> {t.att.markRest}
            </Button>
        </div>

        <div className="hidden grid-cols-[minmax(180px,1.2fr)_auto_minmax(250px,1fr)] gap-4 border-y bg-muted/50 px-5 py-2 text-xs font-medium text-muted-foreground md:grid">
          <span>{t.att.employee}</span>
          <span className="w-[262px]">{t.att.status}</span>
          <span className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
            <span>{t.att.checkIn}</span>
            <span>{t.att.checkOut}</span>
            <span>{t.att.note}</span>
          </span>
        </div>

        {(message || (data && !data.ok && !loading)) && (
          <p role="status" className={`border-b px-5 py-2.5 text-sm ${data && !data.ok ? "text-destructive" : "text-muted-foreground"}`}>
            {data && !data.ok ? data.message : message}
          </p>
        )}

        {loading ? (
          <div className="space-y-px p-4">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-12 rounded-lg" />
            ))}
          </div>
        ) : employees.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-14 text-center">
            <UsersIcon className="size-7 text-muted-foreground" />
            <p className="font-medium">{t.att.noActive}</p>
            <p className="text-sm text-muted-foreground">{t.att.noActiveDesc}</p>
          </div>
        ) : (
          <ul className="divide-y">
            {visible.map((e) => (
              <DayRow
                key={`${date}-${e._id}`}
                employee={e}
                record={records.get(e._id)}
                date={date}
                onSaved={(r) => upsertLocal(e._id, r)}
                onError={setMessage}
              />
            ))}
            {visible.length === 0 && <li className="py-10 text-center text-sm text-muted-foreground">{t.att.noMatch(search)}</li>}
          </ul>
        )}
      </Card>
    </div>
  );
}

// ─── Monthly report ──────────────────────────────────────────────────────────

function MonthlyReport({ today }: { today: string }) {
  const [picked, setPicked] = useState<string | null>(null);
  const month = picked ?? today.slice(0, 7);
  const [data, setData] = useState<MonthData | null>(null);
  const { t, date: fmtDate } = useAdminI18n();

  useEffect(() => {
    let live = true;
    getAttendanceMonth(month).then((res) => {
      if (live)
        setData({ month, date: "", ok: res.success, message: res.message, employees: res.employees, records: res.records });
    });
    return () => {
      live = false;
    };
  }, [month]);

  const loading = !data || data.month !== month;
  const [y, m] = month.split("-").map(Number);
  const days = new Date(y, m, 0).getDate();
  const dayList = Array.from({ length: days }, (_, i) => `${month}-${pad(i + 1)}`);
  const grid = useMemo(() => {
    const map = new Map<string, AttendanceRecord>();
    (data?.records ?? []).forEach((r) => map.set(`${r.employeeId}|${r.date}`, r));
    return map;
  }, [data]);

  const rows = (data?.employees ?? []).map((e) => {
    const tot = { present: 0, late: 0, absent: 0, leave: 0 } as Record<AttendanceStatus, number>;
    dayList.forEach((d) => {
      const r = grid.get(`${e._id}|${d}`);
      if (r) tot[r.status] += 1;
    });
    const marked = tot.present + tot.late + tot.absent + tot.leave;
    const rate = marked ? Math.round(((tot.present + tot.late) / marked) * 100) : null;
    return { e, tot, marked, rate };
  });

  function exportCsv() {
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const [hSerial, hName, hPhone, ...hTotals] = t.att.csvHead;
    const head = [hSerial, hName, hPhone, ...dayList.map((d) => d.slice(8)), ...hTotals];
    const lines = rows.map(({ e, tot, rate }) => [
      e.serial,
      e.name,
      e.number,
      ...dayList.map((d) => {
        const r = grid.get(`${e._id}|${d}`);
        return r ? t.att[SHORT[r.status]] : "";
      }),
      tot.present,
      tot.late,
      tot.absent,
      tot.leave,
      rate ?? "",
    ]);
    const csv = [head, ...lines].map((row) => row.map(esc).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-${month}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="gap-0 rounded-2xl pb-0 shadow-none ring-border">
      <CardHeader className="pb-3">
        <CardTitle className="font-semibold">{t.att.monthTitle}</CardTitle>
        <CardDescription>{t.att.monthDesc(fmtDate(`${month}-01`, MONTH_LABEL))}</CardDescription>
      </CardHeader>
      <div className="flex flex-wrap items-center gap-2 px-(--card-spacing) pb-4">
          <Input
            type="month"
            value={month}
            max={today.slice(0, 7)}
            onChange={(e) => e.target.value && setPicked(e.target.value)}
            className="h-8 w-40 tnum"
            aria-label={t.att.monthLabel}
          />
          <Button size="sm" variant="outline" disabled={loading || rows.length === 0} onClick={exportCsv}>
            <DownloadIcon /> {t.att.exportCsv}
          </Button>
      </div>

      <div className="flex flex-wrap gap-3 border-t px-5 py-2.5 text-xs text-muted-foreground">
        {ATTENDANCE_STATUSES.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className={`inline-flex size-5 items-center justify-center rounded text-[10px] font-semibold ${META[s].cell}`}>
              {t.att[SHORT[s]]}
            </span>
            {t.att[s]}
          </span>
        ))}
      </div>

      {loading ? (
        <div className="p-4">
          <Skeleton className="h-64 rounded-xl" />
        </div>
      ) : !data.ok ? (
        <p className="border-t px-5 py-6 text-sm text-destructive">{data.message}</p>
      ) : rows.length === 0 ? (
        <p className="border-t px-5 py-10 text-center text-sm text-muted-foreground">{t.att.noActiveReport}</p>
      ) : (
        <div className="overflow-x-auto border-t">
          <table className="w-full border-separate border-spacing-0 text-xs">
            <thead>
              <tr className="text-muted-foreground">
                <th className="sticky left-0 z-10 min-w-36 border-b bg-card px-4 py-2 text-left font-medium">Employee</th>
                {dayList.map((d) => (
                  <th key={d} className={`tnum min-w-[26px] border-b px-0 py-2 text-center font-medium ${d === today ? "text-[var(--signal)]" : ""}`}>
                    {Number(d.slice(8))}
                  </th>
                ))}
                {ATTENDANCE_STATUSES.map((st) => t.att[SHORT[st]]).map((h) => (
                  <th key={h} className="min-w-8 border-b border-l bg-muted/40 px-1 py-2 text-center font-medium">
                    {h}
                  </th>
                ))}
                <th className="min-w-14 border-b bg-muted/40 px-3 py-2 text-right font-medium">{t.att.rate}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ e, tot, rate }) => (
                <tr key={e._id} className="group">
                  <td className="sticky left-0 z-10 border-b bg-card px-4 py-1.5 group-hover:bg-muted">
                    <div className="truncate text-sm font-medium">{e.name}</div>
                    <div className="tnum text-[11px] text-muted-foreground">#{e.serial}</div>
                  </td>
                  {dayList.map((d) => {
                    const r = grid.get(`${e._id}|${d}`);
                    return (
                      <td key={d} className="border-b px-0 py-1.5 text-center group-hover:bg-muted/50">
                        {r ? (
                          <span
                            title={`${t.att[r.status]}${r.checkIn ? ` · ${t.att.in} ${r.checkIn}` : ""}${r.checkOut ? ` · ${t.att.out} ${r.checkOut}` : ""}${r.note ? ` · ${r.note}` : ""}`}
                            className={`inline-flex size-5 items-center justify-center rounded text-[9px] font-semibold ${META[r.status].cell}`}
                          >
                            {t.att[SHORT[r.status]]}
                          </span>
                        ) : (
                          <span className="inline-block size-1 rounded-full bg-border" />
                        )}
                      </td>
                    );
                  })}
                  {ATTENDANCE_STATUSES.map((s) => (
                    <td key={s} className="tnum border-b border-l bg-muted/20 px-1 text-center font-medium">
                      {tot[s]}
                    </td>
                  ))}
                  <td className="tnum border-b bg-muted/20 px-3 text-right">
                    {rate === null ? (
                      <span className="text-muted-foreground">–</span>
                    ) : (
                      <Badge variant="secondary" className={rate >= 90 ? "text-[var(--success)]" : rate < 75 ? "text-destructive" : ""}>
                        {rate}%
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export function AttendanceBoard() {
  const today = useToday();
  const { t } = useAdminI18n();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t.att.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t.att.subtitle}</p>
        </div>
        <CalendarCheckIcon className="hidden size-5 text-muted-foreground sm:block" />
      </div>
      {!today ? (
        <Skeleton className="h-96 rounded-2xl" />
      ) : (
        <Tabs defaultValue="day">
          <TabsList className="bg-card ring-1 ring-border">
            <TabsTrigger value="day">{t.att.dayTab}</TabsTrigger>
            <TabsTrigger value="month">{t.att.monthTab}</TabsTrigger>
          </TabsList>
          <TabsContent value="day">
            <DailyRegister today={today} />
          </TabsContent>
          <TabsContent value="month">
            <MonthlyReport today={today} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
