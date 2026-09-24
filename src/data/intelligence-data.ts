export type IntelligenceProvenance =
  | "derived"
  | "illustrative"
  | "public";

export type IntelligenceSignal = {
  id: string;
  category:
    | "Procurement"
    | "Commercial"
    | "Operations"
    | "Farmer";
  action: "WATCH" | "ACT" | "EXPLORE" | "LEARN";
  title: string;
  summary: string;
  whyItMatters: string;
  impact: string;
  impactLabel: string;
  source: string;
  provenance: IntelligenceProvenance;
  question: string;
};

export type Opportunity = {
  id: string;
  mode: "RECOVER" | "PROTECT" | "EXPLORE" | "LEARN";
  title: string;
  description: string;
  value: string;
  valueLabel: string;
  confidence: "high" | "medium";
  owner: string;
  question: string;
};

export type MDMemory = {
  id: string;
  date: string;
  type: string;
  title: string;
  decision: string;
  rationale: string;
  assumptions: string[];
  reconsiderWhen: string;
  question: string;
  provenance: IntelligenceProvenance;
};

export const intelligenceSignals: IntelligenceSignal[] = [
  {
    id: "signal-soymeal",
    category: "Procurement",
    action: "WATCH",
    title: "Soymeal is putting pressure on premium SKU economics",
    summary:
      "Modelled purchase cost is ₹42,100/MT against ₹39,800/MT plan. Gold Pro and Diamond Pro are the clearest connected margin exposures.",
    whyItMatters:
      "If the variance persists, the operating model estimates roughly ₹92L of annualised exposure.",
    impact: "₹92L",
    impactLabel: "modelled annual exposure",
    source: "Procurement + Finance",
    provenance: "derived",
    question: "Why should I care about soymeal?",
  },
  {
    id: "signal-bihar",
    category: "Commercial",
    action: "ACT",
    title: "Bihar weakness is concentrated enough to intervene",
    summary:
      "Bihar is 11.2% below plan, but the modelled gap concentrates in Patna and particularly Patna East rather than showing a uniform state-wide decline.",
    whyItMatters:
      "Availability and distributor productivity are therefore a more precise first intervention than broad discounting.",
    impact: "₹18L",
    impactLabel: "modelled revenue at risk",
    source: "Commercial",
    provenance: "derived",
    question: "Why is Bihar behind plan?",
  },
  {
    id: "signal-amethi",
    category: "Operations",
    action: "EXPLORE",
    title: "Amethi capacity could become a growth lever",
    summary:
      "Illustrative utilisation is 82% against an 85% operating target while premium-product and geography growth questions remain open.",
    whyItMatters:
      "The useful question is not simply how to raise utilisation, but which profitable demand should consume the next unit of capacity.",
    impact: "3 pts",
    impactLabel: "utilisation gap",
    source: "Operations",
    provenance: "illustrative",
    question:
      "What opportunities does Amethi capacity create for Gyandhara?",
  },
  {
    id: "signal-manthan",
    category: "Farmer",
    action: "LEARN",
    title: "Education is valuable; repeat behaviour is the missing bridge",
    summary:
      "The operating model tracks Bihar trial-to-repeat at 54% against a 62% target. Manthan gives Gyandhara a natural mechanism to investigate why.",
    whyItMatters:
      "Connecting education, trial, repeat purchase and animal outcomes would make farmer engagement measurable as an economic engine.",
    impact: "8 pts",
    impactLabel: "repeat gap",
    source: "Farmer + Commercial",
    provenance: "illustrative",
    question: "How should we make Manthan measurable?",
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "opp-patna",
    mode: "RECOVER",
    title: "Restore Patna East availability",
    description:
      "Recover retailer and SKU availability before using price as the lever.",
    value: "₹18L",
    valueLabel: "revenue at risk",
    confidence: "high",
    owner: "Commercial + Supply Chain",
    question: "What should we do about Bihar?",
  },
  {
    id: "opp-soymeal",
    mode: "PROTECT",
    title: "Reduce soymeal exposure",
    description:
      "Review purchase positions and premium-SKU contribution sensitivity before input-cost pressure becomes structural.",
    value: "₹92L",
    valueLabel: "annualised exposure",
    confidence: "high",
    owner: "Procurement + Finance",
    question: "What should we do about soymeal exposure?",
  },
  {
    id: "opp-amethi",
    mode: "EXPLORE",
    title: "Use Amethi capacity for profitable growth",
    description:
      "Test which combination of premium-SKU growth and geography expansion creates the best contribution from available capacity.",
    value: "TBD",
    valueLabel: "business case",
    confidence: "medium",
    owner: "Operations + Commercial",
    question:
      "Where could Amethi capacity create profitable growth?",
  },
  {
    id: "opp-manthan",
    mode: "LEARN",
    title: "Turn Manthan into a measurable growth loop",
    description:
      "Connect farmer education to trial, repeat purchase and outcomes so field activity can be prioritised by economic effect.",
    value: "8 pts",
    valueLabel: "repeat gap",
    confidence: "medium",
    owner: "Farmer + Commercial",
    question: "How can Manthan improve repeat purchase?",
  },
];

export const mdMemories: MDMemory[] = [
  {
    id: "memory-rajasthan",
    date: "12 MAR 2026",
    type: "STRATEGY REVIEW",
    title: "Rajasthan expansion held for later review",
    decision: "Do not prioritise Rajasthan entry yet.",
    rationale:
      "Management attention and distribution-building capacity were better deployed into deeper penetration of existing markets before adding another geography.",
    assumptions: [
      "Existing markets still contain material headroom",
      "Distribution depth matters before geographic breadth",
      "Management bandwidth is a scaling constraint",
    ],
    reconsiderWhen:
      "Existing-market execution is stronger and credible anchor distribution can be identified.",
    question:
      "Why did we decide not to prioritise Rajasthan?",
    provenance: "illustrative",
  },
  {
    id: "memory-bihar-discount",
    date: "18 SEP 2026",
    type: "COMMERCIAL REVIEW",
    title: "Bihar discount guardrails retained",
    decision:
      "Do not use broad discounting as the first response to Bihar underperformance.",
    rationale:
      "The modelled problem appears concentrated in availability and distributor productivity, while broad discounting could create ₹41L of margin exposure.",
    assumptions: [
      "Patna availability is recoverable",
      "Price is not yet proven as the primary constraint",
      "Distribution intervention should be measured first",
    ],
    reconsiderWhen:
      "Patna East availability intervention has enough evidence to evaluate.",
    question:
      "Why are we holding Bihar discount guardrails?",
    provenance: "illustrative",
  },
  {
    id: "memory-soymeal",
    date: "22 SEP 2026",
    type: "PROCUREMENT REVIEW",
    title: "Soymeal moved onto the margin watchlist",
    decision:
      "Model premium-SKU contribution sensitivity before changing commercial policy.",
    rationale:
      "Input cost is above plan and directly connected to Gold Pro and Diamond Pro economics.",
    assumptions: [
      "Current cost variance may persist",
      "Premium-SKU contribution is the relevant downstream measure",
      "Procurement and Finance should evaluate together",
    ],
    reconsiderWhen:
      "Supplier positions or the purchase-cost trajectory materially changes.",
    question:
      "What did we decide about soymeal exposure?",
    provenance: "illustrative",
  },
];