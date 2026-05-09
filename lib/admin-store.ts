/**
 * Admin Store — localStorage-based persistence layer
 * for the mock admin panel. Seeds from the static internships
 * array on first access, then reads/writes localStorage.
 */

import {
  internships as seedInternships,
  type Internship,
  type ApplicationDraft,
  type ApplicationStatus,
} from "./internships";

// ─── Keys ──────────────────────────────────────────────
const INTERNSHIPS_KEY = "admin:internships";
const APPLICATIONS_KEY = "admin:applications";
const ADMIN_SESSION_KEY = "admin:authenticated";

// ─── Application record (wraps ApplicationDraft with metadata) ──
export type ApplicationRecord = ApplicationDraft & {
  applicationId: string;
  submittedAt: string;
  status: ApplicationStatus;
};

// ─── Internship CRUD ───────────────────────────────────

/** Read all internships — seeds from static data if localStorage is empty */
export function getStoredInternships(): Internship[] {
  if (typeof window === "undefined") return seedInternships;
  const raw = localStorage.getItem(INTERNSHIPS_KEY);
  if (!raw) {
    // Seed on first access
    localStorage.setItem(INTERNSHIPS_KEY, JSON.stringify(seedInternships));
    return seedInternships;
  }
  try {
    return JSON.parse(raw) as Internship[];
  } catch {
    return seedInternships;
  }
}

/** Persist internships list */
function saveInternships(list: Internship[]) {
  localStorage.setItem(INTERNSHIPS_KEY, JSON.stringify(list));
}

/** Add or update an internship */
export function upsertInternship(data: Internship) {
  const list = getStoredInternships();
  const index = list.findIndex((i) => i.id === data.id);
  if (index >= 0) {
    list[index] = data;
  } else {
    list.push(data);
  }
  saveInternships(list);
  return list;
}

/** Delete an internship by id */
export function deleteInternship(id: string) {
  const list = getStoredInternships().filter((i) => i.id !== id);
  saveInternships(list);
  return list;
}

/** Find a single internship from the store */
export function getStoredInternshipById(id?: string | null): Internship {
  const list = getStoredInternships();
  return list.find((i) => i.id === id) ?? list[0];
}

// ─── Applications ──────────────────────────────────────

/** Read all submitted applications */
export function getApplications(): ApplicationRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(APPLICATIONS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ApplicationRecord[];
  } catch {
    return [];
  }
}

/** Save a new application (called during registration submit) */
export function saveApplication(draft: ApplicationDraft, status: ApplicationStatus = "submitted") {
  const list = getApplications();
  const record: ApplicationRecord = {
    ...draft,
    applicationId: `APP-${Date.now().toString(36).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
    status,
  };
  list.push(record);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(list));
  return record;
}

/** Update the status of an application */
export function updateApplicationStatus(applicationId: string, status: ApplicationStatus) {
  const list = getApplications();
  const idx = list.findIndex((a) => a.applicationId === applicationId);
  if (idx >= 0) {
    list[idx].status = status;
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(list));
  }
  return list;
}

/** Delete an application by id */
export function deleteApplication(applicationId: string) {
  const list = getApplications().filter((a) => a.applicationId !== applicationId);
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(list));
  return list;
}

// ─── Auth (simple session gate) ────────────────────────

const ADMIN_PASSWORD = "admin";

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function authenticateAdmin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function logoutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
