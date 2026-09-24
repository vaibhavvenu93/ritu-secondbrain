import type { ReactNode } from "react";

import {
  Brain,
  Building2,
  Command,
  Lightbulb,
  Target,
} from "lucide-react";

import SecondBrainAssistant from "@/components/second-brain-assistant";

type AppSection =
  | "today"
  | "company"
  | "execution"
  | "studio";

interface AppShellProps {
  active: AppSection;
  children: ReactNode;
  context?: string;
}

const navigation = [
  {
    id: "today" as const,
    label: "Today",
    href: "/",
    icon: Command,
  },
  {
    id: "company" as const,
    label: "Company",
    href: "/company",
    icon: Building2,
  },
  {
    id: "execution" as const,
    label: "Execution",
    href: "#",
    icon: Target,
  },
  {
    id: "studio" as const,
    label: "Studio",
    href: "#",
    icon: Lightbulb,
  },
];

export default function AppShell({
  active,
  children,
  context,
}: AppShellProps) {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <a className="brand" href="/">
            <div className="brand-mark">G</div>

            <div>
              <div className="brand-name">
                GYANDHARA ONE
              </div>

              <div className="brand-subtitle">
                MD Operating System
              </div>
            </div>
          </a>

          <nav className="nav">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  className={`nav-item ${
                    active === item.id ? "active" : ""
                  }`}
                  href={item.href}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="brain-status">
            <div className="brain-status-icon">
              <Brain size={17} />
            </div>

            <div>
              <div className="brain-status-title">
                Second Brain
              </div>

              <div className="brain-status-copy">
                Company Brain online
              </div>
            </div>

            <span className="online-dot" />
          </div>

          <div className="demo-label">
            PUBLIC DATA DEMO
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="topbar-context">
            <span>GYANDHARA INDUSTRIES</span>

            <span className="topbar-separator">
              /
            </span>

            <span>
              {context ?? "MD'S OFFICE"}
            </span>
          </div>

          <div className="topbar-right">
            <div className="data-status">
              <span className="online-dot" />
              Brain updated
            </div>

            <div className="avatar">RA</div>
          </div>
        </header>

        {children}

        <SecondBrainAssistant />
      </section>
    </main>
  );
}