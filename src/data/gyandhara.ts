import type {
  AttentionItem,
  BrainAgent,
  CompanyEntity,
  CompanyRelationship,
  Metric,
} from "@/domain/company";

const verified = {
  provenance: "verified" as const,
  source: "Gyandhara public information",
  updatedAt: "2026-09-24",
};

const illustrative = {
  provenance: "illustrative" as const,
  source: "Gyandhara One demo model",
  updatedAt: "2026-09-24",
};

export const entities: CompanyEntity[] = [
  {
    id: "gyandhara",
    type: "company",
    name: "Gyandhara Industries",
    description: "Animal nutrition and cattle feed business.",
    attributes: {
      publicRevenue: "₹425Cr+",
      publicFarmerReach: "10 lakh+",
    },
    source: verified,
  },

  { id: "fn-finance", type: "function", name: "Finance", parentId: "gyandhara", source: illustrative },
  { id: "fn-commercial", type: "function", name: "Commercial", parentId: "gyandhara", source: illustrative },
  { id: "fn-operations", type: "function", name: "Operations", parentId: "gyandhara", source: illustrative },
  { id: "fn-supply", type: "function", name: "Supply Chain", parentId: "gyandhara", source: illustrative },

  { id: "plant-hardoi", type: "plant", name: "Hardoi Plant", parentId: "fn-operations", source: verified },
  { id: "plant-amethi", type: "plant", name: "Amethi Plant", parentId: "fn-operations", source: verified },

  { id: "state-up", type: "state", name: "Uttar Pradesh", parentId: "fn-commercial", source: verified },
  { id: "state-bihar", type: "state", name: "Bihar", parentId: "fn-commercial", source: verified },
  { id: "state-mp", type: "state", name: "Madhya Pradesh", parentId: "fn-commercial", source: verified },
  { id: "state-assam", type: "state", name: "Assam", parentId: "fn-commercial", source: verified },

  { id: "sku-doodh-plus", type: "sku", name: "Doodh Plus", source: verified },
  { id: "sku-supreme", type: "sku", name: "Supreme", source: verified },
  { id: "sku-gold-pro", type: "sku", name: "Gold Pro", source: verified },
  {
    id: "sku-diamond-pro",
    type: "sku",
    name: "Diamond Pro",
    description: "Premium nutrition for higher-yield animals.",
    source: verified,
  },

  { id: "rm-soymeal", type: "raw_material", name: "Soymeal", parentId: "fn-supply", source: illustrative },
  { id: "rm-maize", type: "raw_material", name: "Maize", parentId: "fn-supply", source: illustrative },

  {
    id: "person-ritu",
    type: "person",
    name: "Ritu Agarwal",
    description: "Managing Director",
    parentId: "gyandhara",
    source: verified,
  },

  {
    id: "objective-bihar",
    type: "objective",
    name: "Grow Bihar",
    description: "Build Bihar while protecting contribution economics.",
    parentId: "state-bihar",
    source: illustrative,
  },

  {
    id: "initiative-bihar-distribution",
    type: "initiative",
    name: "Bihar Distribution Expansion",
    parentId: "objective-bihar",
    source: illustrative,
  },
];

export const relationships: CompanyRelationship[] = [
  { id: "rel-hardoi-company", from: "plant-hardoi", to: "gyandhara", type: "contains", source: verified },
  { id: "rel-amethi-company", from: "plant-amethi", to: "gyandhara", type: "contains", source: verified },

  {
    id: "rel-soy-diamond",
    from: "rm-soymeal",
    to: "sku-diamond-pro",
    type: "impacts",
    weight: 0.8,
    source: illustrative,
  },
  {
    id: "rel-soy-gold",
    from: "rm-soymeal",
    to: "sku-gold-pro",
    type: "impacts",
    weight: 0.6,
    source: illustrative,
  },
  {
    id: "rel-diamond-bihar",
    from: "sku-diamond-pro",
    to: "state-bihar",
    type: "sells",
    source: illustrative,
  },
  {
    id: "rel-bihar-objective",
    from: "objective-bihar",
    to: "state-bihar",
    type: "supports",
    source: illustrative,
  },
  {
    id: "rel-bihar-initiative",
    from: "initiative-bihar-distribution",
    to: "objective-bihar",
    type: "supports",
    source: illustrative,
  },
  {
    id: "rel-ritu-bihar",
    from: "objective-bihar",
    to: "person-ritu",
    type: "decided_by",
    source: illustrative,
  },
];
export const metrics: Metric[] = [
  {
    id: "metric-revenue",
    label: "Revenue MTD",
    domain: "money",
    value: 38.6,
    unit: "₹Cr",
    plan: 36.2,
    previous: 35.8,
    trend: "up",
    health: "good",
    entityId: "gyandhara",
    note: "Revenue is ahead of plan.",
    source: illustrative,
  },
  {
    id: "metric-ebitda",
    label: "EBITDA",
    domain: "money",
    value: 11.8,
    unit: "%",
    plan: 12.6,
    previous: 12.3,
    trend: "down",
    health: "watch",
    entityId: "gyandhara",
    note: "Input cost and commercial mix are creating pressure.",
    source: illustrative,
  },
  {
    id: "metric-bihar-revenue",
    label: "Bihar Revenue MTD",
    domain: "commercial",
    value: 3.72,
    unit: "₹Cr",
    plan: 4.19,
    previous: 3.89,
    trend: "down",
    health: "risk",
    entityId: "state-bihar",
    note: "Below plan for the current period.",
    source: illustrative,
  },
  {
    id: "metric-amethi-util",
    label: "Amethi Utilisation",
    domain: "operations",
    value: 82,
    unit: "%",
    plan: 85,
    previous: 76,
    trend: "up",
    health: "watch",
    entityId: "plant-amethi",
    note: "Recovered from prior interruption.",
    source: illustrative,
  },
  {
    id: "metric-inventory",
    label: "Inventory Days",
    domain: "supply",
    value: 23,
    unit: "days",
    plan: 21,
    previous: 22,
    trend: "up",
    health: "watch",
    entityId: "gyandhara",
    note: "Territory imbalance is increasing inventory days.",
    source: illustrative,
  },
];

export const attention: AttentionItem[] = [
  {
    id: "attention-bihar",
    type: "decision",
    title: "Bihar discount guardrail",
    summary:
      "Commercial wants flexibility on two distributor programs while the current objective protects contribution economics.",
    impact: "₹41L modelled margin exposure",
    ownerEntityId: "fn-commercial",
    relatedEntityIds: [
      "state-bihar",
      "objective-bihar",
      "initiative-bihar-distribution",
    ],
    health: "watch",
    requiresMD: true,
    source: illustrative,
  },
  {
    id: "attention-soy",
    type: "risk",
    title: "Soymeal cost pressure",
    summary:
      "Market movement could flow through premium SKU economics if procurement remains exposed.",
    impact: "₹92L modelled exposure",
    ownerEntityId: "fn-supply",
    relatedEntityIds: [
      "rm-soymeal",
      "sku-gold-pro",
      "sku-diamond-pro",
    ],
    health: "risk",
    requiresMD: false,
    source: illustrative,
  },
];

export const agents: BrainAgent[] = [
  {
    id: "agent-finance",
    name: "Finance Agent",
    scope: ["P&L", "EBITDA", "cash", "working capital"],
    status: "ready",
  },
  {
    id: "agent-commercial",
    name: "Commercial Agent",
    scope: ["states", "districts", "distributors", "retailers", "SKUs"],
    status: "ready",
  },
  {
    id: "agent-plant",
    name: "Plant Agent",
    scope: ["production", "quality", "downtime", "cost per MT"],
    status: "ready",
  },
  {
    id: "agent-supply",
    name: "Supply Agent",
    scope: ["procurement", "inventory", "logistics"],
    status: "ready",
  },
  {
    id: "agent-market",
    name: "Market Agent",
    scope: ["commodities", "competitors", "policy", "opportunities"],
    status: "ready",
  },
  {
    id: "agent-memory",
    name: "MD Memory",
    scope: ["decisions", "meetings", "commitments", "assumptions"],
    status: "ready",
  },
];