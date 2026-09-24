import {
  attention,
  metrics,
} from "@/data/gyandhara";

import {
  getBrainDiagnostics,
  getCompanyHealth,
  getMDItems,
  getRisks,
} from "@/services/company-brain";

export interface TodayPulseItem {
  id: string;
  label: string;
  value: string;
  plan: string;
  variance: number | null;
  trend: "up" | "down" | "flat";
  health: "good" | "watch" | "risk";
  message: string;
}

function formatMetricValue(
  value: number,
  unit: string
) {
  if (unit === "%") {
    return `${value}%`;
  }

  if (unit === "₹Cr") {
    return `₹${value}Cr`;
  }

  return `${value}${unit}`;
}

function calculateVariance(
  value: number,
  plan?: number
) {
  if (plan === undefined || plan === 0) {
    return null;
  }

  return Number(
    (((value - plan) / plan) * 100).toFixed(1)
  );
}

function explainMetric(
  label: string,
  value: number,
  plan: number | undefined,
  health: "good" | "watch" | "risk"
) {
  if (plan === undefined) {
    return `${label} is currently ${value}.`;
  }

  const variance = calculateVariance(value, plan);

  if (variance === null) {
    return `${label} is currently ${value}.`;
  }

  const magnitude = Math.abs(variance);

  /*
   * Most metrics are better when they are ABOVE plan.
   *
   * Some operating metrics are the opposite.
   * For Inventory Days, lower is generally better.
   *
   * We explicitly model that here so the Brain does not
   * say something like:
   *
   * "Inventory Days are 9.5% ahead of plan"
   *
   * when 23 days against a target of 21 is actually worse.
   */

  const lowerIsBetter =
    label === "Inventory Days";

  const favourable = lowerIsBetter
    ? value <= plan
    : value >= plan;

  const position = favourable
    ? "better than plan"
    : "worse than plan";

  if (health === "risk") {
    return `${magnitude}% ${position} and needs attention.`;
  }

  if (health === "watch") {
    return `${magnitude}% ${position}. Watch closely.`;
  }

  return `${magnitude}% ${position}.`;
}

export function getTodayPulse(): TodayPulseItem[] {
  return metrics.map((metric) => ({
    id: metric.id,

    label: metric.label,

    value: formatMetricValue(
      metric.value,
      metric.unit
    ),

    plan:
      metric.plan !== undefined
        ? formatMetricValue(
            metric.plan,
            metric.unit
          )
        : "—",

    variance: calculateVariance(
      metric.value,
      metric.plan
    ),

    trend: metric.trend,

    health: metric.health,

    message: explainMetric(
      metric.label,
      metric.value,
      metric.plan,
      metric.health
    ),
  }));
}

export function getTodayHeadline() {
  /*
   * These IDs must match the actual IDs in
   * src/data/gyandhara.ts.
   */

  const revenue = metrics.find(
    (metric) =>
      metric.id === "metric-revenue"
  );

  const ebitda = metrics.find(
    (metric) =>
      metric.id === "metric-ebitda"
  );

  const revenueAhead =
    revenue?.plan !== undefined &&
    revenue.value >= revenue.plan;

  const profitabilityBehind =
    ebitda?.plan !== undefined &&
    ebitda.value < ebitda.plan;

  /*
   * This is the current demo situation:
   *
   * Revenue:
   * ₹38.6Cr vs ₹36.2Cr plan
   *
   * EBITDA:
   * 11.8% vs 12.6% plan
   *
   * So the MD should immediately understand:
   *
   * We are selling enough.
   * We are not converting enough of that revenue
   * into profitability.
   */

  if (
    revenueAhead &&
    profitabilityBehind
  ) {
    return {
      eyebrow: "TODAY",

      title: "Good morning, Ritu.",

      statement:
        "Revenue is ahead. Profitability isn’t.",

      tone: "watch" as const,
    };
  }

  if (getCompanyHealth() === "risk") {
    return {
      eyebrow: "TODAY",

      title: "Good morning, Ritu.",

      statement:
        "A few things need your attention before the day gets moving.",

      tone: "risk" as const,
    };
  }

  if (getCompanyHealth() === "watch") {
    return {
      eyebrow: "TODAY",

      title: "Good morning, Ritu.",

      statement:
        "Gyandhara is broadly on plan, with a few things worth watching.",

      tone: "watch" as const,
    };
  }

  return {
    eyebrow: "TODAY",

    title: "Good morning, Ritu.",

    statement:
      "Gyandhara is broadly on plan today.",

    tone: "good" as const,
  };
}

export function getTodayAttention() {
  /*
   * MD-required items come first.
   * Then risks.
   * Everything else follows.
   */

  return [...attention].sort((a, b) => {
    if (
      a.requiresMD &&
      !b.requiresMD
    ) {
      return -1;
    }

    if (
      !a.requiresMD &&
      b.requiresMD
    ) {
      return 1;
    }

    if (
      a.health === "risk" &&
      b.health !== "risk"
    ) {
      return -1;
    }

    if (
      a.health !== "risk" &&
      b.health === "risk"
    ) {
      return 1;
    }

    return 0;
  });
}

export function getTodayCounts() {
  const decisions = attention.filter(
    (item) =>
      item.type === "decision"
  );

  const commitments = attention.filter(
    (item) =>
      item.type === "commitment"
  );

  const opportunities = attention.filter(
    (item) =>
      item.type === "opportunity"
  );

  return {
    attention: attention.length,

    decisions: decisions.length,

    commitments: commitments.length,

    opportunities: opportunities.length,

    mdItems: getMDItems().length,

    risks: getRisks().length,
  };
}

export function getStartMyDayBrief() {
  const headline =
    getTodayHeadline();

  const counts =
    getTodayCounts();

  const pulse =
    getTodayPulse();

  const priorityItems =
    getTodayAttention();

  return {
    generatedFor: "Ritu Agarwal",

    headline,

    summary: {
      companyHealth:
        getCompanyHealth(),

      needsAttention:
        counts.attention,

      decisions:
        counts.decisions,

      commitments:
        counts.commitments,

      opportunities:
        counts.opportunities,

      mdItems:
        counts.mdItems,

      risks:
        counts.risks,
    },

    sections: {
      whatChanged: pulse.filter(
        (item) =>
          item.health === "risk" ||
          item.health === "watch"
      ),

      decisions: priorityItems.filter(
        (item) =>
          item.type === "decision"
      ),

      risks: priorityItems.filter(
        (item) =>
          item.type === "risk"
      ),

      opportunities:
        priorityItems.filter(
          (item) =>
            item.type === "opportunity"
        ),

      commitments:
        priorityItems.filter(
          (item) =>
            item.type === "commitment"
        ),
    },

    diagnostics:
      getBrainDiagnostics(),
  };
}