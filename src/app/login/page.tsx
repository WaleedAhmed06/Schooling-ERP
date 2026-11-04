"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Users,
  UserRound,
  Check,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { demoUsers, roles, roleTitles, demoPassword } from "@/config/roles";
import { useAuthStore } from "@/stores/auth.store";
import type { Role } from "@/types/domain";
const icons = {
  admin: ShieldCheck,
  teacher: BookOpen,
  parent: Users,
  student: UserRound,
};
export default function Login() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [selected, setSelected] = useState<Role>("admin");
  const [email, setEmail] = useState<string>(demoUsers.admin.email);
  const [password, setPassword] = useState(demoPassword);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  function select(role: Role) {
    setSelected(role);
    setEmail(demoUsers[role].email);
    setPassword(demoPassword);
    setError("");
  }
  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (login(email, password)) {
      router.replace(
        `/${Object.values(demoUsers).find((u) => u.email === email)?.role ?? selected}`,
      );
    } else setError("Invalid demo email or password. Please try again.");
  }
  return (
    <main className="login-page">
      <section className="login-aside">
        <div className="brand brand-light">
          <BrandLogo />
        </div>
        <div className="login-aside-center">
          <div className="aside-pill">THE COMPLETE SCHOOL ECOSYSTEM</div>
          <h1>
            One platform.
            <br />
            <span>Every school moment.</span>
          </h1>
          <p>
            Bring your school community together with a modern, connected
            experience for administrators, teachers, parents and students.
          </p>
          <div className="login-preview">
            <div className="preview-top">
              <span className="preview-dot" />
              <span className="preview-dot" />
              <span className="preview-dot" />
              <span className="preview-title">School overview</span>
            </div>
            <div className="preview-stats">
              <div>
                <small>Students</small>
                <strong>1,248</strong>
                <em>↗ 8.2%</em>
              </div>
              <div>
                <small>Attendance</small>
                <strong>94.8%</strong>
                <em>↗ 2.4%</em>
              </div>
              <div>
                <small>Teachers</small>
                <strong>64</strong>
                <em>Active</em>
              </div>
            </div>
            <div className="preview-bars">
              {[30, 52, 42, 67, 49, 78, 65, 88, 72, 92, 81, 95].map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="aside-footer">
          Designed for smarter school management <span>© 2026 School ERP</span>
        </div>
      </section>
      <section className="login-main">
        <div className="login-top">
          <span className="demo-label">
            <span className="live-dot" /> Interactive demo environment
          </span>
          <ThemeToggle />
        </div>
        <div className="login-form-wrap">
          <div className="login-mobile-brand">
            <BrandLogo />
          </div>
          <div className="eyebrow">WELCOME BACK</div>
          <h2>Sign in to your portal</h2>
          <p className="muted intro">
            Choose a demo role to explore the complete school management
            experience.
          </p>
          <div className="role-grid">
            {roles.map((role) => {
              const Icon = icons[role];
              return (
                <button
                  key={role}
                  className={`role-choice ${selected === role ? "selected" : ""}`}
                  onClick={() => select(role)}
                >
                  <span className="role-icon">
                    <Icon size={20} />
                  </span>
                  <span>{roleTitles[role]}</span>
                  {selected === role && (
                    <Check className="role-check" size={14} />
                  )}
                </button>
              );
            })}
          </div>
          <form onSubmit={submit} className="login-form">
            <label htmlFor="email">Email address</label>
            <div className="input-wrap">
              <Mail size={18} />
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.com"
              />
            </div>
            <label htmlFor="password">Password</label>
            <div className="input-wrap">
              <LockKeyhole size={18} />
              <input
                id="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShow(!show)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button type="submit" className="login-submit">
              Enter {roleTitles[selected]} Portal <ArrowRight size={19} />
            </button>
          </form>
          <div className="demo-hint">
            <ShieldCheck size={18} />
            <span>
              Demo credentials are prefilled. All data is simulated and stays in
              your browser.
            </span>
          </div>
        </div>
        <p className="login-bottom">
          Frontend-only demonstration · No real payments or personal records
        </p>
      </section>
    </main>
  );
}
