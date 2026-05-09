"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useMemo, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Users, Briefcase, BarChart3,
  Shield, LogOut, Eye, ChevronDown, X, Sparkles,
} from "lucide-react";
import { SiteLayout } from "@/components/sections/Layout";
import type { Internship } from "@/lib/internships";
import { statusLabels, type ApplicationStatus } from "@/lib/internships";
import {
  getStoredInternships, upsertInternship, deleteInternship,
  getApplications, updateApplicationStatus, deleteApplication,
  isAdminAuthenticated, authenticateAdmin, logoutAdmin,
  type ApplicationRecord,
} from "@/lib/admin-store";



// ─── Main ──────────────────────────────────────────────
export default function AdminPage(props: any) {
  const [authed, setAuthed] = useState(isAdminAuthenticated);
  if (!authed) return <LoginGate onSuccess={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={() => { logoutAdmin(); setAuthed(false); }} />;
}

// ─── Login Gate ────────────────────────────────────────
function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const submit = () => {
    if (authenticateAdmin(pw)) { onSuccess(); }
    else { setErr(true); setTimeout(() => setErr(false), 2000); }
  };
  return (
    <SiteLayout>
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 -z-10 radial-glow" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="card-mint rounded-3xl p-8 md:p-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-mint/35 bg-mint/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-mint">
              <Shield className="h-3.5 w-3.5" /> Admin Access
            </div>
            <h1 className="text-3xl font-medium tracking-tight">Dashboard login</h1>
            <p className="mt-3 text-sm text-foreground/60">Enter the admin password to manage internships and applications.</p>
            <div className="mt-8 space-y-4">
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Password"
                className="w-full rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-mint/60"
              />
              {err && <p className="text-sm text-destructive">Invalid password. Try again.</p>}
              <button onClick={submit} className="btn-pill w-full justify-center px-5! py-3!">
                Sign in
              </button>
            </div>
            <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
              Default: admin
            </p>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}

// ─── Dashboard ─────────────────────────────────────────
type Tab = "internships" | "applications" | "overview";

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("internships");
  const [internshipList, setInternshipList] = useState(getStoredInternships);
  const [appList, setAppList] = useState(getApplications);
  const refresh = useCallback(() => {
    setInternshipList(getStoredInternships());
    setAppList(getApplications());
  }, []);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
    { id: "internships", label: "Internships", icon: <Briefcase className="h-4 w-4" /> },
    { id: "applications", label: "Applications", icon: <Users className="h-4 w-4" /> },
  ];

  return (
    <SiteLayout>
      <section className="relative min-h-svh overflow-hidden pt-36 pb-24">
        <div className="absolute inset-0 -z-10 radial-glow" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-20" />
        <div className="orb orb-mint absolute right-[5%] top-[12%] h-[180px] w-[180px] anim-float-slow" />
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-mint/35 bg-mint/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-mint">
                <Sparkles className="h-3.5 w-3.5" /> Admin Panel
              </p>
              <h1 className="text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.05] tracking-tight">
                Manage <span className="gradient-text-mint">everything</span>
              </h1>
            </div>
            <button onClick={onLogout} className="btn-pill self-start px-4! py-2!">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>

          {/* Tabs */}
          <nav className="mb-8 flex items-center gap-2 overflow-x-auto rounded-2xl border border-border/50 bg-background/40 p-2 backdrop-blur-xl">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all whitespace-nowrap ${
                  tab === t.id
                    ? "border-mint/60 bg-mint/10 text-mint font-medium"
                    : "border-transparent text-foreground/50 hover:text-foreground/70"
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {tab === "overview" && <OverviewTab internships={internshipList} applications={appList} />}
              {tab === "internships" && <InternshipsTab list={internshipList} refresh={refresh} />}
              {tab === "applications" && <ApplicationsTab list={appList} internships={internshipList} refresh={refresh} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </SiteLayout>
  );
}

// ─── Overview Tab ──────────────────────────────────────
function OverviewTab({ internships, applications }: { internships: Internship[]; applications: ApplicationRecord[] }) {
  const byStatus = useMemo(() => {
    const map: Record<string, number> = {};
    applications.forEach((a) => { map[a.status] = (map[a.status] || 0) + 1; });
    return map;
  }, [applications]);

  const stats = [
    { label: "Total internships", value: internships.length },
    { label: "Applications", value: applications.length },
    { label: "Under review", value: byStatus["under_review"] || 0 },
    { label: "Approved", value: byStatus["approved"] || 0 },
    { label: "Rejected", value: byStatus["rejected"] || 0 },
    { label: "Payment completed", value: byStatus["payment_completed"] || 0 },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="stat-glass text-center">
          <div className="text-4xl font-light tracking-tight text-foreground">{s.value}</div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Internships Tab ───────────────────────────────────
function InternshipsTab({ list, refresh }: { list: Internship[]; refresh: () => void }) {
  const [editing, setEditing] = useState<Internship | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleDelete = (id: string) => { deleteInternship(id); setConfirmDelete(null); refresh(); };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-medium">{list.length} internship{list.length !== 1 ? "s" : ""}</h2>
        <button onClick={() => setCreating(true)} className="btn-pill px-4! py-2!">
          <Plus className="h-3.5 w-3.5" /> Add new
        </button>
      </div>

      <div className="grid gap-4">
        {list.map((role) => (
          <div key={role.id} className="card-mint-hover rounded-2xl p-5 transition-all sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                  <span>{role.team}</span><span className="text-foreground/25">·</span>
                  <span>{role.mode}</span><span className="text-foreground/25">·</span>
                  <span>{role.compensation}</span>
                </div>
                <h3 className="text-lg font-medium leading-tight tracking-tight">{role.title}</h3>
                <p className="mt-2 text-sm text-foreground/55 line-clamp-2">{role.summary}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => setEditing(role)} className="rounded-xl border border-border/60 bg-background/40 p-2.5 text-foreground/60 transition-colors hover:border-mint/40 hover:text-mint" title="Edit">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => setConfirmDelete(role.id)} className="rounded-xl border border-border/60 bg-background/40 p-2.5 text-foreground/60 transition-colors hover:border-destructive/40 hover:text-destructive" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {confirmDelete === role.id && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3">
                <p className="flex-1 text-sm text-foreground/75">Delete "{role.title}"?</p>
                <button onClick={() => handleDelete(role.id)} className="rounded-lg bg-destructive/20 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/30">Confirm</button>
                <button onClick={() => setConfirmDelete(null)} className="text-xs text-foreground/50 hover:text-foreground/70">Cancel</button>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {(editing || creating) && (
        <InternshipFormModal
          initial={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSave={(data) => { upsertInternship(data); setEditing(null); setCreating(false); refresh(); }}
        />
      )}
    </>
  );
}

// ─── Internship Form Modal ─────────────────────────────
function InternshipFormModal({ initial, onClose, onSave }: { initial: Internship | null; onClose: () => void; onSave: (d: Internship) => void }) {
  const isNew = !initial;
  const [form, setForm] = useState<Internship>(
    initial ?? {
      id: "", title: "", company: "EveningSideOfTech AI", team: "Engineering",
      location: "Remote", duration: "12 weeks", lastDate: "", stipend: "",
      compensation: "Paid", mode: "Remote", summary: "", description: "", skills: [],
    }
  );
  const [skillsStr, setSkillsStr] = useState((initial?.skills ?? []).join(", "));

  const update = (key: keyof Internship, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSave = () => {
    const id = form.id || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const skills = skillsStr.split(",").map((s) => s.trim()).filter(Boolean);
    onSave({ ...form, id, skills });
  };

  const inputCls = "w-full rounded-xl border border-border/60 bg-background/40 px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-mint/60";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-background/70 p-6 pt-24 backdrop-blur-md" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-2xl rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-mint rounded-3xl p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-medium">{isNew ? "Add internship" : "Edit internship"}</h2>
            <button onClick={onClose} className="rounded-xl border border-border/60 bg-background/40 p-2 text-foreground/60 hover:text-foreground"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField label="Title"><input value={form.title} onChange={(e) => update("title", e.target.value)} className={inputCls} /></FormField>
            <FormField label="Team">
              <select value={form.team} onChange={(e) => update("team", e.target.value)} className={inputCls}>
                {["Strategy", "Engineering", "Adoption", "Product", "Design", "Marketing"].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </FormField>
            <FormField label="Location"><input value={form.location} onChange={(e) => update("location", e.target.value)} className={inputCls} /></FormField>
            <FormField label="Duration"><input value={form.duration} onChange={(e) => update("duration", e.target.value)} className={inputCls} /></FormField>
            <FormField label="Apply by (date)"><input value={form.lastDate} onChange={(e) => update("lastDate", e.target.value)} className={inputCls} /></FormField>
            <FormField label="Stipend"><input value={form.stipend} onChange={(e) => update("stipend", e.target.value)} className={inputCls} /></FormField>
            <FormField label="Mode">
              <select value={form.mode} onChange={(e) => update("mode", e.target.value as Internship["mode"])} className={inputCls}>
                {["Remote", "Hybrid", "Onsite"].map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </FormField>
            <FormField label="Compensation">
              <select value={form.compensation} onChange={(e) => update("compensation", e.target.value as Internship["compensation"])} className={inputCls}>
                {["Paid", "Unpaid"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <div className="md:col-span-2">
              <FormField label="Summary"><textarea rows={2} value={form.summary} onChange={(e) => update("summary", e.target.value)} className={`${inputCls} resize-none`} /></FormField>
            </div>
            <div className="md:col-span-2">
              <FormField label="Description"><textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} className={`${inputCls} resize-none`} /></FormField>
            </div>
            <div className="md:col-span-2">
              <FormField label="Skills (comma-separated)"><input value={skillsStr} onChange={(e) => setSkillsStr(e.target.value)} className={inputCls} /></FormField>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button onClick={onClose} className="rounded-full border border-border/70 bg-background/45 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-mint/40 hover:text-mint">Cancel</button>
            <button onClick={handleSave} className="btn-pill px-5! py-2.5!">{isNew ? "Create" : "Save changes"}</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/50">{label}</span>
      {children}
    </label>
  );
}

// ─── Applications Tab ──────────────────────────────────
function ApplicationsTab({ list, internships, refresh }: { list: ApplicationRecord[]; internships: Internship[]; refresh: () => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = (appId: string, status: ApplicationStatus) => {
    updateApplicationStatus(appId, status);
    refresh();
  };

  const handleDeleteApp = (appId: string) => {
    deleteApplication(appId);
    refresh();
  };

  const getInternshipTitle = (id: string) => internships.find((i) => i.id === id)?.title ?? id;

  if (list.length === 0) {
    return (
      <div className="card-mint rounded-3xl p-10 text-center">
        <Users className="mx-auto h-8 w-8 text-foreground/30" />
        <h3 className="mt-4 text-xl font-medium">No applications yet</h3>
        <p className="mt-2 text-sm text-foreground/55">Applications will appear here once candidates register through the internship flow.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">{list.length} application{list.length !== 1 ? "s" : ""}</h2>
      {list.map((app) => (
        <div key={app.applicationId} className="card-mint-hover rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">{app.applicationId}</div>
              <h3 className="text-lg font-medium leading-tight">{app.fullName || "—"}</h3>
              <p className="mt-1 text-sm text-foreground/55">{app.email} · {getInternshipTitle(app.internshipId)}</p>
              <p className="mt-1 font-mono text-[10px] text-foreground/35">{new Date(app.submittedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={app.status}
                onChange={(e) => handleStatusChange(app.applicationId, e.target.value as ApplicationStatus)}
                className="rounded-xl border border-border/60 bg-background/40 px-3 py-2 text-xs text-foreground outline-none transition-colors focus:border-mint/60"
              >
                {(["submitted", "under_review", "approved", "rejected", "payment_pending", "payment_completed"] as ApplicationStatus[]).map((s) => (
                  <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
              </select>
              <button onClick={() => setExpandedId(expandedId === app.applicationId ? null : app.applicationId)} className="rounded-xl border border-border/60 bg-background/40 p-2 text-foreground/60 transition-colors hover:border-mint/40 hover:text-mint" title="Details">
                <Eye className="h-4 w-4" />
              </button>
              <button onClick={() => handleDeleteApp(app.applicationId)} className="rounded-xl border border-border/60 bg-background/40 p-2 text-foreground/60 transition-colors hover:border-destructive/40 hover:text-destructive" title="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          {expandedId === app.applicationId && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 grid gap-3 rounded-xl border border-border/40 bg-background/30 p-4 sm:grid-cols-2">
              {[
                ["University", app.university], ["Degree", app.degree], ["Graduation", app.graduationYear],
                ["Phone", app.phone], ["Skills", app.skills], ["Portfolio", app.portfolio],
                ["LinkedIn", app.linkedin], ["Resume", app.resumeName || "—"],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">{label}</div>
                  <div className="mt-1 text-sm text-foreground/75">{val || "—"}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
