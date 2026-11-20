"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  Plus,
  Search,
  Trash2,
  Users,
  Pencil,
  X,
  Save,
  Wrench,
  GripVertical,
  ImagePlus,
  Phone,
  FileText,
  Maximize2,
  Check,
  MessageCircle,
} from "lucide-react";

import {
  apiGetEmployees as getEmployees,
  apiAddEmployee as addEmployee,
  apiUpdateEmployee as updateEmployee,
  apiDeleteEmployee as deleteEmployee,
  apiReorderEmployees as reorderEmployees,
  apiRepairSerials as repairOldEmployeeSerials,
} from "./employee-api";

import type { Employee } from "./employee-types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { useAdminI18n } from "@/components/admin/i18n-provider";

type PreviewImageState = {
  url: string;
  name: string;
} | null;

function buildWhatsAppUrl(rawNumber: string): string | null {
  const digits = rawNumber.replace(/\D/g, "");
  if (!digits || digits.length < 7) return null;

  let normalizedDigits = digits;
  if (digits.startsWith("00")) {
    normalizedDigits = digits.slice(2);
  } else if (digits.startsWith("0") && digits.length === 11) {
    normalizedDigits = `880${digits.slice(1)}`;
  }

  return `https://wa.me/${normalizedDigits}`;
}

export default function EmployeePage() {
  const { t: dict } = useAdminI18n();
  const t = dict.emp;
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [serial, setSerial] = useState("1");
  const [photoUrl, setPhotoUrl] = useState("");
  const [status, setStatus] = useState<Employee["status"]>("active");
  const [grade, setGrade] = useState<Employee["grade"]>("a");

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const showForm = formOpen || editingId !== null;
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<PreviewImageState>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [repairing, setRepairing] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [message, setMessage] = useState("");

  async function loadEmployees() {
    setLoading(true);

    const result = await getEmployees();

    if (result.success) {
      setEmployees(result.data);
    } else {
      setMessage(result.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (!previewImage) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setPreviewImage(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

  function toggleNoteExpand(id: string) {
    setExpandedNotes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  async function handleCopyNumber(id: string, phoneNumber: string) {
    if (!phoneNumber) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(phoneNumber);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = phoneNumber;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setCopiedId(id);
      setMessage(t.copiedN(phoneNumber));
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2000);
    } catch (error) {
      console.error("Copy number error:", error);
      setMessage(t.copyFailed);
    }
  }

  function resetForm() {
    setName("");
    setNumber("");
    setNotes("");
    setSerial("1");
    setPhotoUrl("");
    setStatus("active");
    setGrade("a");
    setEditingId(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (saving || repairing || reordering) return;
    setSaving(true);
    setMessage("");

    const input = {
      name: name.trim(),
      number: number.trim(),
      notes: notes.trim(),
      photoUrl: photoUrl.trim(),
      serial: Number(serial),
      status,
      grade,
    };

    try {
      const result = editingId
        ? await updateEmployee(editingId, input)
        : await addEmployee(input);
      setMessage(result.success ? (editingId ? t.updated : t.added) : result.message);
      if (result.success) {
        resetForm();
        await loadEmployees();
      }
    } catch (error) {
      console.error("Save employee error:", error);
      setMessage(t.saveFailed);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(employee: Employee) {
    setEditingId(employee._id);
    setName(employee.name);
    setNumber(employee.number);
    setNotes(employee.notes);
    setSerial(String(employee.serial));
    setPhotoUrl(employee.photoUrl || "");
    setStatus(employee.status || "active");
    setGrade(employee.grade || "a");
    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id: string) {
    if (saving || repairing || reordering) return;
    const confirmed = window.confirm(
      t.confirmDelete
    );

    if (!confirmed) return;

    setSaving(true);
    try {
      const result = await deleteEmployee(id);
      setMessage(result.success ? t.deleted : result.message);
      if (result.success) {
        if (editingId === id) resetForm();
        await loadEmployees();
      }
    } catch (error) {
      console.error("Delete employee error:", error);
      setMessage(t.deleteFailed);
    } finally {
      setSaving(false);
    }
  }

  async function handleRepairOldIds() {
    if (repairing || saving || reordering) return;
    const confirmed = window.confirm(
      t.confirmRepair
    );

    if (!confirmed) return;

    setRepairing(true);
    setMessage("");

    try {
      const result = await repairOldEmployeeSerials();
      setMessage(result.success ? t.serialsRepaired : result.message);
      if (result.success) await loadEmployees();
    } catch (error) {
      console.error("Repair serials error:", error);
      setMessage(t.repairFailed);
    } finally {
      setRepairing(false);
    }
  }

  async function handleDrop(targetId: string) {
    if (!draggedId || draggedId === targetId || reordering || saving || repairing) return;

    if (search.trim()) {
      setMessage(t.clearSearch);
      setDraggedId(null);
      return;
    }

    const oldEmployees = [...employees];
    const updatedEmployees = [...employees];

    const fromIndex = updatedEmployees.findIndex(
      (employee) => employee._id === draggedId
    );

    const toIndex = updatedEmployees.findIndex(
      (employee) => employee._id === targetId
    );

    if (fromIndex === -1 || toIndex === -1) {
      setDraggedId(null);
      return;
    }

    const [movedEmployee] = updatedEmployees.splice(fromIndex, 1);

    updatedEmployees.splice(toIndex, 0, movedEmployee);

    const reordered = updatedEmployees.map((employee, index) => ({
      ...employee,
      serial: index + 1,
    }));

    setEmployees(reordered);
    setDraggedId(null);
    setReordering(true);
    setMessage(t.savingOrder);

    try {
      const result = await reorderEmployees(reordered.map((employee) => employee._id));
      if (result.success) setMessage(t.orderSaved);
      else { setEmployees(oldEmployees); setMessage(result.message); }
    } catch (error) {
      console.error("Reorder employees error:", error);
      setEmployees(oldEmployees);
      setMessage(t.orderFailed);
    } finally {
      setReordering(false);
    }
  }

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.number} ${employee.serial} ${employee.status} ${employee.grade}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.subtitle}
        </p>
      </div>

      {/* Add / Edit Form */}
      <Collapsible
        open={showForm}
        onOpenChange={(open) => {
          if (!open && editingId) resetForm();
          setFormOpen(open);
        }}
        className="rounded-2xl border bg-card"
      >
        <div className="flex items-center justify-between gap-3 px-6 py-4">
          <CollapsibleTrigger className="group/form -mx-2 flex flex-1 items-center gap-3 rounded-lg px-2 py-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className={`flex size-9 items-center justify-center rounded-lg ${editingId ? "bg-[var(--signal)]/10 text-[var(--signal)]" : "bg-primary text-primary-foreground"}`}>
              {editingId ? <Pencil size={16} /> : <Plus size={16} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{editingId ? t.edit(name) : t.addNew}</span>
              <span className="block text-xs text-muted-foreground">
                {editingId ? t.editHint : t.addHint}
              </span>
            </span>
            <ChevronDownIcon className="size-4 text-muted-foreground transition-transform duration-200 group-data-[panel-open]/form:rotate-180" />
          </CollapsibleTrigger>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <X size={17} />
              {t.cancel}
            </button>
          )}
        </div>

        <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
        <form onSubmit={handleSubmit} className="space-y-5 border-t p-6">
          {/* Serial Number */}
          {editingId && (
            <div className="max-w-xs space-y-2">
              <label className="text-sm font-medium">
                {t.serial}
              </label>

              <input
                type="number"
                min="1"
                max={employees.length}
                step="1"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                required
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />

              <p className="text-xs text-muted-foreground">
                {t.serialHint}
              </p>
            </div>
          )}

          {/* Name and Number */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t.name}
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePh}
                required
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t.phone}
              </label>

              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder={t.phonePh}
                required
                maxLength={120}
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* ImgBB Photo URL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <ImagePlus size={17} />
              {t.photoUrl}
            </label>

            <input
              type="url"
              maxLength={2048}
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder={t.photoPh}
              className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
            />

            <p className="text-xs text-muted-foreground">
              {t.photoHint}
            </p>

            {photoUrl && (
              <div className="pt-2">
                <img
                  src={photoUrl}
                  alt={t.previewAlt}
                  onClick={() =>
                    setPreviewImage({
                      url: photoUrl,
                      name: name.trim() || t.previewName,
                    })
                  }
                  className="h-24 w-24 cursor-pointer rounded-xl border object-cover transition-opacity hover:opacity-85"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                />
              </div>
            )}
          </div>

          {/* Status and Grade */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="employee-status" className="text-sm font-medium">{t.status}</label>
              <select
                id="employee-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as Employee["status"])}
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="active">{dict.status.active}</option>
                <option value="inactive">{dict.status.inactive}</option>
                <option value="pending">{dict.status.pending}</option>
                <option value="rejected">{dict.status.rejected}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="employee-grade" className="text-sm font-medium">{t.grade}</label>
              <select
                id="employee-grade"
                value={grade}
                onChange={(e) => setGrade(e.target.value as Employee["grade"])}
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
                <option value="e">E</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">{t.notes}</label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPh}
              rows={3}
              maxLength={2000}
              className="w-full rounded-lg border bg-background p-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {editingId ? <Save size={18} /> : <Plus size={18} />}

            {saving
              ? t.saving
              : editingId
                ? t.update
                : t.add}
          </button>
        </form>
        </CollapsibleContent>

        {message && (
          <p role="status" aria-live="polite" className="border-t px-6 py-3 text-sm text-muted-foreground">
            {message}
          </p>
        )}
      </Collapsible>

      {/* Employee Cards Section */}
      <div className="rounded-2xl border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b p-6">
          <div>
            <h2 className="text-lg font-semibold">
              {t.list}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {t.total(employees.length)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRepairOldIds}
              disabled={repairing || saving || reordering}
              className="flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              <Wrench size={16} />
              {repairing ? t.repairing : t.fixSerials}
            </button>

            <div className="flex h-10 w-full items-center gap-2 rounded-lg border px-3 sm:w-64">
              <Search
                size={17}
                className="text-muted-foreground"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t.searchPh}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-muted-foreground">
            {t.loading}
          </div>
        ) : filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEmployees.map((employee) => {
              const isCopied = copiedId === employee._id;
              const whatsappUrl = buildWhatsAppUrl(employee.number);
              const trimmedNote = employee.notes?.trim() || "";
              const isLongNote = trimmedNote.length > 100 || trimmedNote.split("\n").length > 3;
              const isExpanded = !!expandedNotes[employee._id];

              return (
                <div
                  key={employee._id}
                  draggable={!search.trim() && !reordering && !saving && !repairing}
                  onDragStart={() => setDraggedId(employee._id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(employee._id)}
                  onDragEnd={() => setDraggedId(null)}
                  className={`relative flex flex-col rounded-xl border bg-background p-4 shadow-sm transition-all ${
                    draggedId === employee._id
                      ? "border-primary bg-muted opacity-50"
                      : "hover:border-primary/40 hover:shadow-md"
                  } ${
                    !search.trim() ? "cursor-grab active:cursor-grabbing" : ""
                  }`}
                >
                  {/* Top Bar: Top-Left Edit/Delete Icons + Top-Right Serial & Drag */}
                  <div className="mb-3 flex items-center justify-between gap-2">
                    {/* Top-left Edit & Delete icons */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={saving || repairing || reordering}
                        onClick={() => handleEdit(employee)}
                        aria-label={t.editAria}
                        className="rounded-lg border bg-card p-1.5 text-blue-500 transition-colors hover:bg-blue-500/10 disabled:opacity-50"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        type="button"
                        disabled={saving || repairing || reordering}
                        onClick={() => handleDelete(employee._id)}
                        aria-label={t.deleteAria}
                        className="rounded-lg border bg-card p-1.5 text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Serial & Drag handle */}
                    <div className="flex items-center gap-1.5">
                      <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                        #{employee.serial || "—"}
                      </span>
                      {!search.trim() && (
                        <GripVertical
                          size={16}
                          className="text-muted-foreground"
                        />
                      )}
                    </div>
                  </div>

                  {/* 1st: Clickable Image */}
                  <div className="group relative mb-3.5 overflow-hidden rounded-xl border bg-muted/40">
                    {employee.photoUrl ? (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewImage({
                            url: employee.photoUrl!,
                            name: employee.name,
                          })
                        }
                        aria-label={t.viewPhoto(employee.name)}
                        className="block w-full cursor-zoom-in text-left focus:outline-none"
                      >
                        <img
                          src={employee.photoUrl}
                          alt={employee.name}
                          className="h-44 w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        />
                        <span className="pointer-events-none absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[11px] font-medium text-white opacity-90 transition-opacity group-hover:opacity-100">
                          <Maximize2 size={12} />
                          {t.fullView}
                        </span>
                      </button>
                    ) : (
                      <div className="flex h-44 w-full items-center justify-center bg-muted text-3xl font-bold text-muted-foreground">
                        {employee.name.slice(0, 1).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* 2nd: Name */}
                  <h3 className="text-base font-semibold leading-snug text-foreground">
                    {employee.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                      employee.status === "active" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                      employee.status === "inactive" ? "bg-muted text-muted-foreground" :
                      employee.status === "pending" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" :
                      "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}>
                      {dict.status[employee.status] ?? employee.status}
                    </span>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase text-primary">
                      {dict.grade(employee.grade)}
                    </span>
                  </div>

                  {/* 3rd: Click-to-Copy Blue Phone Number + WhatsApp Icon */}
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyNumber(employee._id, employee.number)}
                      title={t.copyTitle}
                      className="flex min-w-0 items-center gap-1.5 rounded-lg bg-blue-500/10 px-2.5 py-1 text-left text-sm font-medium text-blue-600 transition-colors hover:bg-blue-500/20 dark:text-blue-400"
                    >
                      <Phone size={14} className="shrink-0 text-blue-600 dark:text-blue-400" />
                      <span className="truncate">{employee.number}</span>
                      {isCopied ? (
                        <span className="ml-1 inline-flex shrink-0 items-center gap-0.5 rounded bg-blue-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                          <Check size={10} />
                          {t.copied}
                        </span>
                      ) : null}
                    </button>

                    {whatsappUrl ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={t.whatsappAria(employee.name)}
                        title={t.whatsappTitle}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-600 transition-colors hover:bg-emerald-500/25 dark:text-emerald-400"
                      >
                        <MessageCircle size={16} />
                      </a>
                    ) : (
                      <span
                        title={t.whatsappInvalid}
                        className="inline-flex h-8 w-8 shrink-0 cursor-not-allowed items-center justify-center rounded-lg bg-muted text-muted-foreground/40"
                      >
                        <MessageCircle size={16} />
                      </span>
                    )}
                  </div>

                  {/* 4th: Notes with Show More / Show Less */}
                  <div className="mt-3 flex items-start gap-2 border-t pt-3 text-xs leading-relaxed text-muted-foreground">
                    <FileText size={14} className="mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`whitespace-pre-line break-words ${
                          !isExpanded && isLongNote ? "line-clamp-3" : ""
                        }`}
                      >
                        {trimmedNote || t.noNotes}
                      </p>

                      {isLongNote && (
                        <button
                          type="button"
                          onClick={() => toggleNoteExpand(employee._id)}
                          className="mt-1.5 font-semibold text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {isExpanded ? t.showLess : t.showMore}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <Users
              className="mx-auto mb-3 text-muted-foreground"
              size={36}
            />

            <h3 className="font-semibold">
              {t.noneFound}
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              {t.noneFoundDesc}
            </p>
          </div>
        )}
      </div>

      {/* Full-Screen Image Lightbox */}
      {previewImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.photoPreview(previewImage.name)}
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-4xl flex-col items-center"
          >
            <div className="mb-3 flex w-full items-center justify-between gap-4 text-white">
              <p className="truncate text-sm font-medium sm:text-base">
                {previewImage.name}
              </p>

              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                aria-label={t.closePreview}
                className="flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/25"
              >
                <X size={18} />
                <span>{t.close}</span>
              </button>
            </div>

            <img
              src={previewImage.url}
              alt={previewImage.name}
              className="max-h-[82vh] w-auto max-w-full rounded-xl border border-white/15 bg-black/40 object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}