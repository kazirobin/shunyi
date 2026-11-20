// app/(admin)/admin/(panel)/employee/employee-api.ts
import type { Employee, EmployeeInput, ActionResult } from "./employee-types";

type ListResponse = ActionResult & { data: Employee[] };

async function parse<T>(res: Response): Promise<T> {
  const json: unknown = await res.json().catch(() => null);
  const obj = (json ?? {}) as { success?: boolean; message?: string };
  if (!res.ok || obj.success === false) {
    return {
      success: false,
      message: obj.message ?? `Request failed (${res.status})`,
    } as T;
  }
  return json as T;
}

export async function apiGetEmployees(): Promise<ListResponse> {
  const res = await fetch("/api/employee", { cache: "no-store" });
  return parse<ListResponse>(res);
}

export async function apiAddEmployee(input: EmployeeInput): Promise<ActionResult> {
  const res = await fetch("/api/employee", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parse<ActionResult>(res);
}

export async function apiUpdateEmployee(
  id: string,
  input: EmployeeInput
): Promise<ActionResult> {
  const res = await fetch(`/api/employee/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parse<ActionResult>(res);
}

export async function apiDeleteEmployee(id: string): Promise<ActionResult> {
  const res = await fetch(`/api/employee/${id}`, { method: "DELETE" });
  return parse<ActionResult>(res);
}

export async function apiReorderEmployees(ids: string[]): Promise<ActionResult> {
  const res = await fetch("/api/employee/reorder", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
  return parse<ActionResult>(res);
}

export async function apiRepairSerials(): Promise<ActionResult> {
  const res = await fetch("/api/employee/repair", { method: "POST" });
  return parse<ActionResult>(res);
}