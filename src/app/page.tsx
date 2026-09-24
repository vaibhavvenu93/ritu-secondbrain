import {
  ArrowRight,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  Clock3,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import AppShell from "@/components/app-shell";

import {
  getTodayAttention,
  getTodayCounts,
  getTodayHeadline,
  getTodayPulse,
} from "@/services/today";

function HealthDot({
  health,
}: {
  health: "good" | "watch" | "risk";
}) {
  return (
    <span
      className={`health-dot health-${health}`}
      aria-label={health}
    />
  );
}

function TrendIcon({
  trend,
}: {
  trend: "up" | "down" | "flat";
}) {
  if (trend === "up") {
    return (
      <TrendingUp
        size={15}
        strokeWidth={1.8}
      />
    );
  }

  if (trend === "down") {
    return (
      <TrendingDown
        size={15}
        strokeWidth={1.8}
      />
    );
  }

  return (
    <ArrowRight
      size={15}
      strokeWidth={1.8}
    />
  );
}

export default function HomePage() {
  const headline = getTodayHeadline();
  const pulse = getTodayPulse();
  const attention = getTodayAttention();
  const counts = getTodayCounts();

  const revenue = pulse.find(
    (item) => item.id === "metric-revenue"
  );

  const ebitda = pulse.find(
    (item) => item.id === "metric-ebitda"
  );

  const bihar = pulse.find(
    (item) =>
      item.id === "metric-bihar-revenue"
  );

  const utilisation = pulse.find(
    (item) =>
      item.id === "metric-amethi-util"
  );

  const inventory = pulse.find(
    (item) => item.id === "metric-inventory"
  );

  const primaryMetrics = [
    revenue,
    ebitda,
    bihar,
    utilisation,
    inventory,
  ].filter(Boolean) as typeof pulse;

  const mdDecision = attention.find(
    (item) => item.requiresMD
  );

  const topRisk = attention.find(
    (item) => item.type === "risk"
  );

  return (
    <AppShell
      active="today"
      context="MD'S OFFICE"
    >
      <div className="content">
        <section className="hero">
          <div className="eyebrow">
            {headline.eyebrow}
          </div>

          <h1>{headline.title}</h1>

          <p className="hero-statement">
            {headline.statement}
          </p>

          <div className="hero-summary">
            <span>
              <strong>
                {counts.attention}
              </strong>{" "}
              things deserve attention
            </span>

            <span className="summary-divider" />

            <span>
              <strong>
                {counts.decisions}
              </strong>{" "}
              decision
            </span>

            <span className="summary-divider" />

            <span>
              <strong>{counts.risks}</strong>{" "}
              active risk
            </span>
          </div>

          <div className="hero-actions">
            <button className="primary-button">
              <Sparkles size={17} />

              Start my day

              <ArrowRight size={16} />
            </button>

            <button className="secondary-button">
              Ask anything
            </button>
          </div>
        </section>

        <section className="section-block">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">
                COMPANY PULSE
              </div>

              <h2>
                What changed since you last
                looked
              </h2>
            </div>

            <a
              className="text-button"
              href="/company"
            >
              Explore company
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="metric-grid">
            {primaryMetrics.map((metric) => (
              <article
                className={`metric-card metric-${metric.health}`}
                key={metric.id}
              >
                <div className="metric-top">
                  <div className="metric-label">
                    <HealthDot
                      health={metric.health}
                    />

                    {metric.label}
                  </div>

                  <div
                    className={`trend trend-${metric.health}`}
                  >
                    <TrendIcon
                      trend={metric.trend}
                    />
                  </div>
                </div>

                <div className="metric-value">
                  {metric.value}
                </div>

                <div className="metric-plan">
                  Plan {metric.plan}
                </div>

                <div className="metric-message">
                  {metric.message}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="attention-layout">
          <div className="attention-main">
            <div className="section-heading-row compact">
              <div>
                <div className="section-kicker">
                  NEEDS YOU
                </div>

                <h2>
                  Your attention, not your
                  inbox
                </h2>
              </div>

              <div className="attention-count">
                {counts.mdItems} MD decision
              </div>
            </div>

            {mdDecision && (
              <article className="decision-card">
                <div className="decision-icon">
                  <CircleAlert size={20} />
                </div>

                <div className="decision-content">
                  <div className="decision-meta">
                    DECISION · COMMERCIAL
                  </div>

                  <h3>
                    {mdDecision.title}
                  </h3>

                  <p>
                    {mdDecision.summary}
                  </p>

                  <div className="decision-impact">
                    <span>
                      Modelled impact
                    </span>

                    <strong>
                      {mdDecision.impact}
                    </strong>
                  </div>
                </div>

                <button
                  className="decision-arrow"
                  aria-label="Open decision"
                >
                  <ArrowRight size={19} />
                </button>
              </article>
            )}

            {topRisk && (
              <article className="risk-row">
                <div className="risk-icon">
                  <ShieldAlert size={18} />
                </div>

                <div className="risk-copy">
                  <div className="risk-title">
                    {topRisk.title}
                  </div>

                  <div className="risk-summary">
                    {topRisk.summary}
                  </div>
                </div>

                <div className="risk-impact">
                  {topRisk.impact}
                </div>

                <ChevronRight size={18} />
              </article>
            )}
          </div>

          <aside className="morning-brief">
            <div className="brief-top">
              <div className="brief-icon">
                <Sparkles size={18} />
              </div>

              <div>
                <div className="section-kicker">
                  START MY DAY
                </div>

                <h3>
                  Your 5-minute brief
                </h3>
              </div>
            </div>

            <p className="brief-intro">
              The Brain has already checked
              the company. Here&apos;s what
              changed, what matters and what
              needs you.
            </p>

            <div className="brief-list">
              <div className="brief-item">
                <CircleCheck size={17} />

                <span>
                  Revenue is ahead of plan
                </span>
              </div>

              <div className="brief-item">
                <CircleAlert size={17} />

                <span>
                  EBITDA is below plan
                </span>
              </div>

              <div className="brief-item">
                <ShieldAlert size={17} />

                <span>
                  Bihar and soymeal need
                  attention
                </span>
              </div>

              <div className="brief-item">
                <Clock3 size={17} />

                <span>
                  {counts.mdItems} item waiting
                  on you
                </span>
              </div>
            </div>

            <button className="brief-button">
              Start briefing
              <ArrowRight size={16} />
            </button>
          </aside>
        </section>
      </div>
    </AppShell>
  );
}