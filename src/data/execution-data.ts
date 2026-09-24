import type {
  ExecutionCommandCentre,
  ExecutionCommitment,
  ExecutionDecision,
  ExecutionDependency,
  ExecutionInitiative,
  ExecutionMilestone,
  ExecutionOwner,
  ExecutionResult,
  StrategicObjective,
} from "@/domain/execution";

/* =========================================================
   EXECUTION DATA — GYANDHARA ONE

   PUBLIC DATA DEMO

   Public company facts remain public facts.
   Internal operating numbers, commitments, initiatives,
   decisions and impacts below are illustrative/modelled.

   The purpose of this dataset is not to simulate Jira.
   It models how strategy moves through Gyandhara:

   Objective
      ↓
   Initiative
      ↓
   Owner / Dependency / Commitment
      ↓
   Decision when required
      ↓
   Result
========================================================= */

const illustrativeSource = {
  type: "internal_model" as const,
  label: "Gyandhara One illustrative operating model",
  source: "Gyandhara One demo operating dataset",
  updatedAt: "2026-09-24T12:00:00",
  provenance: "illustrative" as const,
};

const derivedSource = {
  type: "derived" as const,
  label: "Gyandhara One derived operating signal",
  source: "Gyandhara One Company Brain",
  updatedAt: "2026-09-24T12:00:00",
  provenance: "derived" as const,
};

/* =========================================================
   OWNERS

   Named public leaders are used only where already known.
   Functional owners are intentionally used elsewhere rather
   than inventing employee identities.
========================================================= */

export const mdOwner: ExecutionOwner = {
  id: "owner-ritu",
  name: "Ritu Agarwal",
  role: "Managing Director",
  function: "MD Office",
};

export const financeOwner: ExecutionOwner = {
  id: "owner-kushendra",
  name: "Kushendra Singh",
  role: "Finance",
  function: "Finance",
  entityId: "fn-finance",
};

export const commercialOwner: ExecutionOwner = {
  id: "owner-commercial",
  name: "Commercial Lead",
  role: "Commercial",
  function: "Commercial",
  entityId: "fn-commercial",
};

export const biharOwner: ExecutionOwner = {
  id: "owner-bihar",
  name: "Bihar Commercial Lead",
  role: "Regional Commercial",
  function: "Commercial",
  entityId: "state-bihar",
};

export const operationsOwner: ExecutionOwner = {
  id: "owner-operations",
  name: "Operations Lead",
  role: "Plant Operations",
  function: "Operations",
  entityId: "fn-operations",
};

export const amethiOwner: ExecutionOwner = {
  id: "owner-amethi",
  name: "Amethi Plant Lead",
  role: "Plant Operations",
  function: "Operations",
  entityId: "plant-amethi",
};

export const procurementOwner: ExecutionOwner = {
  id: "owner-procurement",
  name: "Procurement Lead",
  role: "Procurement",
  function: "Procurement",
  entityId: "fn-supply",
};

export const supplyOwner: ExecutionOwner = {
  id: "owner-supply",
  name: "Supply Chain Lead",
  role: "Supply Chain",
  function: "Supply Chain",
  entityId: "fn-supply",
};

export const customerOwner: ExecutionOwner = {
  id: "owner-customer",
  name: "Farmer Success Lead",
  role: "Farmer & Customer",
  function: "Commercial",
  entityId: "fn-customer",
};

export const peopleOwner: ExecutionOwner = {
  id: "owner-people",
  name: "People Lead",
  role: "People",
  function: "People",
  entityId: "fn-people",
};

/* =========================================================
   OBJECTIVES
========================================================= */

export const objectives: StrategicObjective[] = [
  {
    id: "obj-profitable-growth",
    title: "Grow without giving away margin",
    description:
      "Keep topline momentum while protecting contribution margin and EBITDA quality.",
    owner: mdOwner,
    priority: "critical",
    status: "in_progress",
    health: "watch",
    period: "FY27",
    target: 12.6,
    current: 11.8,
    unit: "%",
    initiativeIds: [
      "init-bihar-recovery",
      "init-bihar-discount-guardrail",
      "init-premium-mix",
    ],
    linkedEntityIds: [
      "gyandhara",
      "fn-finance",
      "fn-commercial",
      "state-bihar",
    ],
    linkedMetricIds: [
      "metric-revenue",
      "metric-ebitda",
    ],
    source: illustrativeSource,
  },

  {
    id: "obj-bihar-recovery",
    title: "Restore Bihar growth",
    description:
      "Close the Bihar revenue gap by fixing distribution, availability and repeat behaviour before using price as the lever.",
    owner: commercialOwner,
    priority: "critical",
    status: "at_risk",
    health: "risk",
    period: "Q2 FY27",
    target: 4.19,
    current: 3.72,
    unit: "₹Cr MTD",
    initiativeIds: [
      "init-bihar-recovery",
      "init-patna-east-availability",
      "init-bihar-repeat",
      "init-bihar-distributor-expansion",
    ],
    linkedEntityIds: [
      "state-bihar",
      "district-patna",
      "dist-patna-east",
      "dist-patna-rural",
    ],
    linkedMetricIds: [
      "metric-bihar-revenue",
      "metric-patna-revenue",
      "metric-patna-east-sales",
    ],
    source: derivedSource,
  },

  {
    id: "obj-margin-protection",
    title: "Protect input-cost economics",
    description:
      "Reduce commodity cost exposure without weakening product quality or premium SKU economics.",
    owner: financeOwner,
    priority: "high",
    status: "in_progress",
    health: "watch",
    period: "Q2 FY27",
    initiativeIds: [
      "init-soymeal-exposure",
      "init-premium-mix",
      "init-procurement-variance",
    ],
    linkedEntityIds: [
      "fn-finance",
      "fn-supply",
      "rm-soymeal",
      "sku-gold-pro",
      "sku-diamond-pro",
    ],
    linkedMetricIds: [],
    source: illustrativeSource,
  },

  {
    id: "obj-plant-reliability",
    title: "Improve plant reliability and utilisation",
    description:
      "Increase productive capacity while controlling cost per MT, downtime and operating variance.",
    owner: operationsOwner,
    priority: "high",
    status: "in_progress",
    health: "watch",
    period: "Q2 FY27",
    target: 85,
    current: 82,
    unit: "%",
    initiativeIds: [
      "init-amethi-utilisation",
      "init-amethi-cost",
      "init-preventive-maintenance",
    ],
    linkedEntityIds: [
      "fn-operations",
      "plant-hardoi",
      "plant-amethi",
    ],
    linkedMetricIds: [],
    source: illustrativeSource,
  },

  {
    id: "obj-working-capital",
    title: "Release cash from working capital",
    description:
      "Improve inventory discipline and collections without constraining commercial growth.",
    owner: financeOwner,
    priority: "high",
    status: "in_progress",
    health: "watch",
    period: "Q2 FY27",
    target: 20,
    current: 23,
    unit: "inventory days",
    initiativeIds: [
      "init-inventory-days",
      "init-receivables-discipline",
    ],
    linkedEntityIds: [
      "fn-finance",
      "fn-supply",
      "fn-commercial",
    ],
    linkedMetricIds: [
      "metric-inventory",
    ],
    source: illustrativeSource,
  },

  {
    id: "obj-farmer-engine",
    title: "Turn farmer education into repeat demand",
    description:
      "Connect education, product trial, retailer availability and repeat purchase into one measurable growth engine.",
    owner: customerOwner,
    priority: "medium",
    status: "in_progress",
    health: "good",
    period: "FY27",
    initiativeIds: [
      "init-bihar-repeat",
      "init-farmer-outcomes",
    ],
    linkedEntityIds: [
      "fn-customer",
      "fn-commercial",
      "sku-doodh-plus",
      "sku-supreme",
      "sku-gold-pro",
      "sku-diamond-pro",
    ],
    linkedMetricIds: [],
    source: illustrativeSource,
  },
];

/* =========================================================
   INITIATIVES
========================================================= */

export const initiatives: ExecutionInitiative[] = [
  {
    id: "init-bihar-recovery",
    objectiveId: "obj-bihar-recovery",
    title: "Bihar commercial recovery",
    description:
      "Coordinate district recovery across distribution, retailer activity, availability and repeat purchase.",
    owner: biharOwner,
    collaborators: [
      commercialOwner,
      supplyOwner,
      financeOwner,
    ],
    priority: "critical",
    status: "at_risk",
    health: "risk",
    startDate: "2026-09-15",
    deadline: "2026-10-15",
    target: 4.19,
    current: 3.72,
    unit: "₹Cr MTD",
    progress: 46,
    nextAction:
      "Close Patna availability gaps before considering incremental discounting.",
    blocker:
      "Patna East retailer availability remains below target.",
    mdDecisionStatus: "not_required",
    decisionIds: [
      "decision-bihar-discount",
    ],
    milestoneIds: [
      "milestone-bihar-diagnosis",
      "milestone-patna-recovery",
    ],
    dependencyIds: [
      "dep-bihar-stock",
    ],
    commitmentIds: [
      "commit-bihar-review",
    ],
    resultIds: [],
    linkedEntityIds: [
      "state-bihar",
      "district-patna",
      "district-muzaffarpur",
      "district-gaya",
    ],
    linkedMetricIds: [
      "metric-bihar-revenue",
      "metric-patna-revenue",
    ],
    linkedAttentionIds: [],
    impact: {
      type: "revenue",
      value: 47,
      unit: "₹L",
      label: "Current modelled Bihar MTD gap",
      note: "Difference between illustrative actual and plan.",
      provenance: "illustrative",
    },
    brainOrigin: {
      query: "Why is Bihar behind plan?",
      finding:
        "The shortfall is concentrated in Patna, with Patna East availability emerging as the clearest immediate constraint.",
      recommendation:
        "Recover Patna East availability before changing Bihar discount policy.",
      createdAt: "2026-09-24T09:30:00",
    },
    source: derivedSource,
    createdAt: "2026-09-15T09:00:00",
    updatedAt: "2026-09-24T09:30:00",
  },

  {
    id: "init-patna-east-availability",
    objectiveId: "obj-bihar-recovery",
    title: "Restore Patna East availability",
    description:
      "Identify priority retailer and SKU gaps, replenish them and recover distributor productivity.",
    owner: biharOwner,
    collaborators: [
      supplyOwner,
      commercialOwner,
    ],
    priority: "critical",
    status: "in_progress",
    health: "risk",
    startDate: "2026-09-24",
    deadline: "2026-09-30",
    target: 96,
    current: 78,
    unit: "₹L MTD",
    progress: 35,
    nextAction:
      "Complete retailer-by-retailer availability review and issue replenishment plan.",
    blocker:
      "SKU-level replenishment visibility is incomplete.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [
      "milestone-patna-audit",
      "milestone-patna-replenish",
    ],
    dependencyIds: [
      "dep-patna-replenishment",
    ],
    commitmentIds: [
      "commit-patna-audit",
      "commit-patna-stock",
    ],
    resultIds: [],
    linkedEntityIds: [
      "state-bihar",
      "district-patna",
      "dist-patna-east",
      "retailer-patna-01",
      "retailer-patna-02",
    ],
    linkedMetricIds: [
      "metric-patna-east-sales",
    ],
    linkedAttentionIds: [],
    impact: {
      type: "revenue",
      value: 18,
      unit: "₹L",
      label: "Modelled revenue at risk",
      provenance: "illustrative",
    },
    brainOrigin: {
      query: "What should we do about Bihar?",
      finding:
        "Patna East is materially below plan and retailer availability is the clearest near-term intervention.",
      recommendation:
        "Recover Patna East availability first.",
      createdAt: "2026-09-24T10:00:00",
    },
    source: derivedSource,
    createdAt: "2026-09-24T10:00:00",
    updatedAt: "2026-09-24T10:00:00",
  },

  {
    id: "init-bihar-discount-guardrail",
    objectiveId: "obj-profitable-growth",
    title: "Resolve Bihar discount guardrail",
    description:
      "Decide whether Bihar requires a temporary commercial exception without allowing revenue recovery to erode contribution margin.",
    owner: financeOwner,
    collaborators: [
      commercialOwner,
      biharOwner,
    ],
    priority: "critical",
    status: "blocked",
    health: "blocked",
    startDate: "2026-09-22",
    deadline: "2026-09-26",
    progress: 70,
    nextAction:
      "MD to approve or reject the proposed Bihar exception after reviewing availability recovery.",
    blocker:
      "Commercial action is waiting on MD guardrail decision.",
    mdDecisionStatus: "required",
    decisionIds: [
      "decision-bihar-discount",
    ],
    milestoneIds: [],
    dependencyIds: [
      "dep-bihar-availability-evidence",
    ],
    commitmentIds: [
      "commit-finance-scenario",
    ],
    resultIds: [],
    linkedEntityIds: [
      "state-bihar",
      "fn-finance",
      "fn-commercial",
    ],
    linkedMetricIds: [
      "metric-bihar-revenue",
      "metric-ebitda",
    ],
    linkedAttentionIds: [],
    impact: {
      type: "margin",
      value: 41,
      unit: "₹L",
      label: "Modelled margin exposure",
      provenance: "illustrative",
    },
    source: illustrativeSource,
    createdAt: "2026-09-22T11:00:00",
    updatedAt: "2026-09-24T08:30:00",
  },

  {
    id: "init-bihar-repeat",
    objectiveId: "obj-farmer-engine",
    title: "Improve Bihar trial-to-repeat",
    description:
      "Identify why product trial is not converting into repeat demand at the expected rate.",
    owner: customerOwner,
    collaborators: [
      biharOwner,
      commercialOwner,
    ],
    priority: "high",
    status: "in_progress",
    health: "watch",
    startDate: "2026-09-18",
    deadline: "2026-10-10",
    target: 62,
    current: 54,
    unit: "%",
    progress: 42,
    nextAction:
      "Segment non-repeat farmers by product, district and retailer availability.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [
      "commit-repeat-analysis",
    ],
    resultIds: [],
    linkedEntityIds: [
      "state-bihar",
      "fn-customer",
      "sku-doodh-plus",
      "sku-supreme",
      "sku-gold-pro",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    impact: {
      type: "revenue",
      label: "Repeat-demand upside",
      note: "Value to be quantified after cohort analysis.",
      provenance: "illustrative",
    },
    source: illustrativeSource,
    createdAt: "2026-09-18T09:00:00",
    updatedAt: "2026-09-23T17:00:00",
  },

  {
    id: "init-bihar-distributor-expansion",
    objectiveId: "obj-bihar-recovery",
    title: "Close Bihar white-space distribution",
    description:
      "Prioritise high-potential uncovered pockets only after productivity in the existing network is stabilised.",
    owner: commercialOwner,
    collaborators: [
      biharOwner,
      financeOwner,
    ],
    priority: "medium",
    status: "not_started",
    health: "good",
    startDate: "2026-10-01",
    deadline: "2026-11-15",
    progress: 0,
    nextAction:
      "Rank district white spaces by farmer density, retailer potential and serviceability.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [
      "dep-existing-network-productivity",
    ],
    commitmentIds: [],
    resultIds: [],
    linkedEntityIds: [
      "state-bihar",
      "district-patna",
      "district-muzaffarpur",
      "district-gaya",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    source: illustrativeSource,
    createdAt: "2026-09-24T11:00:00",
    updatedAt: "2026-09-24T11:00:00",
  },

  {
    id: "init-soymeal-exposure",
    objectiveId: "obj-margin-protection",
    title: "Reduce soymeal cost exposure",
    description:
      "Review open purchase exposure and protect premium SKU economics from elevated soymeal cost.",
    owner: procurementOwner,
    collaborators: [
      financeOwner,
      supplyOwner,
    ],
    priority: "high",
    status: "at_risk",
    health: "risk",
    startDate: "2026-09-20",
    deadline: "2026-10-03",
    target: 39800,
    current: 42100,
    unit: "₹/MT",
    progress: 38,
    nextAction:
      "Review exposed purchase positions and alternate supplier scenarios.",
    blocker:
      "Current purchase cost remains above planning assumption.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [
      "commit-soymeal-scenario",
    ],
    resultIds: [],
    linkedEntityIds: [
      "rm-soymeal",
      "fn-supply",
      "sku-gold-pro",
      "sku-diamond-pro",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    impact: {
      type: "cost",
      value: 92,
      unit: "₹L",
      label: "Modelled annualised exposure",
      provenance: "illustrative",
    },
    brainOrigin: {
      query: "Why should I care about soymeal?",
      finding:
        "Soymeal cost is above plan and the company graph connects the exposure to premium SKU economics.",
      recommendation:
        "Review purchase exposure and model contribution sensitivity before changing product economics.",
      createdAt: "2026-09-24T09:45:00",
    },
    source: derivedSource,
    createdAt: "2026-09-20T09:00:00",
    updatedAt: "2026-09-24T09:45:00",
  },

  {
    id: "init-premium-mix",
    objectiveId: "obj-margin-protection",
    title: "Protect premium SKU contribution",
    description:
      "Track Gold Pro and Diamond Pro contribution sensitivity to input-cost movement and regional discounting.",
    owner: financeOwner,
    collaborators: [
      procurementOwner,
      commercialOwner,
    ],
    priority: "high",
    status: "in_progress",
    health: "watch",
    startDate: "2026-09-21",
    deadline: "2026-10-05",
    progress: 55,
    nextAction:
      "Complete SKU-by-state contribution sensitivity model.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [],
    resultIds: [],
    linkedEntityIds: [
      "sku-gold-pro",
      "sku-diamond-pro",
      "rm-soymeal",
      "fn-finance",
    ],
    linkedMetricIds: [
      "metric-ebitda",
    ],
    linkedAttentionIds: [],
    source: illustrativeSource,
    createdAt: "2026-09-21T09:00:00",
    updatedAt: "2026-09-24T08:00:00",
  },

  {
    id: "init-procurement-variance",
    objectiveId: "obj-margin-protection",
    title: "Supplier cost variance control",
    description:
      "Create weekly visibility into raw-material purchase variance, rejection and concentration risk.",
    owner: procurementOwner,
    collaborators: [
      financeOwner,
      supplyOwner,
    ],
    priority: "medium",
    status: "in_progress",
    health: "good",
    startDate: "2026-09-10",
    deadline: "2026-10-15",
    progress: 68,
    nextAction:
      "Add supplier concentration and incoming-QC exception view.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [],
    resultIds: [],
    linkedEntityIds: [
      "rm-soymeal",
      "rm-maize",
      "rm-bran",
      "rm-mineral-mix",
      "fn-supply",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    source: illustrativeSource,
    createdAt: "2026-09-10T09:00:00",
    updatedAt: "2026-09-23T17:00:00",
  },

  {
    id: "init-amethi-utilisation",
    objectiveId: "obj-plant-reliability",
    title: "Lift Amethi utilisation",
    description:
      "Close the gap between current plant utilisation and operating plan.",
    owner: amethiOwner,
    collaborators: [
      operationsOwner,
      supplyOwner,
    ],
    priority: "high",
    status: "in_progress",
    health: "watch",
    startDate: "2026-09-16",
    deadline: "2026-10-07",
    target: 85,
    current: 82,
    unit: "%",
    progress: 61,
    nextAction:
      "Separate demand constraints from downtime and scheduling loss.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [
      "commit-amethi-loss-tree",
    ],
    resultIds: [],
    linkedEntityIds: [
      "plant-amethi",
      "fn-operations",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    source: derivedSource,
    createdAt: "2026-09-16T09:00:00",
    updatedAt: "2026-09-24T07:30:00",
  },

  {
    id: "init-amethi-cost",
    objectiveId: "obj-plant-reliability",
    title: "Reduce Amethi cost per MT",
    description:
      "Identify the operating drivers keeping cost per MT above plan.",
    owner: amethiOwner,
    collaborators: [
      financeOwner,
      operationsOwner,
    ],
    priority: "medium",
    status: "in_progress",
    health: "watch",
    startDate: "2026-09-18",
    deadline: "2026-10-10",
    target: 17650,
    current: 18120,
    unit: "₹/MT",
    progress: 48,
    nextAction:
      "Quantify energy, utilisation and scheduling contribution to variance.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [],
    resultIds: [],
    linkedEntityIds: [
      "plant-amethi",
      "fn-finance",
      "fn-operations",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    source: illustrativeSource,
    createdAt: "2026-09-18T09:00:00",
    updatedAt: "2026-09-23T16:00:00",
  },

  {
    id: "init-preventive-maintenance",
    objectiveId: "obj-plant-reliability",
    title: "Prevent repeat downtime",
    description:
      "Convert recurring stoppages into a preventive-maintenance rhythm across both plants.",
    owner: operationsOwner,
    collaborators: [
      amethiOwner,
    ],
    priority: "medium",
    status: "in_progress",
    health: "good",
    startDate: "2026-09-05",
    deadline: "2026-10-20",
    progress: 72,
    nextAction:
      "Close the top three recurring failure-mode actions.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [],
    resultIds: [],
    linkedEntityIds: [
      "plant-hardoi",
      "plant-amethi",
      "fn-operations",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    source: illustrativeSource,
    createdAt: "2026-09-05T09:00:00",
    updatedAt: "2026-09-23T17:30:00",
  },

  {
    id: "init-inventory-days",
    objectiveId: "obj-working-capital",
    title: "Bring inventory back to 20 days",
    description:
      "Reduce excess inventory while protecting service levels and production continuity.",
    owner: supplyOwner,
    collaborators: [
      financeOwner,
      operationsOwner,
    ],
    priority: "high",
    status: "in_progress",
    health: "watch",
    startDate: "2026-09-12",
    deadline: "2026-10-15",
    target: 20,
    current: 23,
    unit: "days",
    progress: 58,
    nextAction:
      "Identify excess by raw material, finished goods and slow-moving SKU.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [
      "commit-inventory-aging",
    ],
    resultIds: [],
    linkedEntityIds: [
      "fn-supply",
      "fn-finance",
      "plant-hardoi",
      "plant-amethi",
    ],
    linkedMetricIds: [
      "metric-inventory",
    ],
    linkedAttentionIds: [],
    impact: {
      type: "cash",
      label: "Working-capital release",
      note: "To be quantified after inventory-aging analysis.",
      provenance: "illustrative",
    },
    source: derivedSource,
    createdAt: "2026-09-12T09:00:00",
    updatedAt: "2026-09-24T08:00:00",
  },

  {
    id: "init-receivables-discipline",
    objectiveId: "obj-working-capital",
    title: "Tighten distributor collections",
    description:
      "Prioritise overdue exposure without disrupting strategically important distributor relationships.",
    owner: financeOwner,
    collaborators: [
      commercialOwner,
    ],
    priority: "high",
    status: "in_progress",
    health: "watch",
    startDate: "2026-09-17",
    deadline: "2026-10-08",
    progress: 51,
    nextAction:
      "Review top overdue distributor accounts with Commercial.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [],
    resultIds: [],
    linkedEntityIds: [
      "fn-finance",
      "fn-commercial",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    source: illustrativeSource,
    createdAt: "2026-09-17T09:00:00",
    updatedAt: "2026-09-23T18:00:00",
  },

  {
    id: "init-farmer-outcomes",
    objectiveId: "obj-farmer-engine",
    title: "Connect farmer education to outcomes",
    description:
      "Track whether education and product trials translate into repeat purchase and measurable farmer value.",
    owner: customerOwner,
    collaborators: [
      commercialOwner,
    ],
    priority: "medium",
    status: "in_progress",
    health: "good",
    startDate: "2026-09-01",
    deadline: "2026-11-15",
    progress: 44,
    nextAction:
      "Define minimum outcome dataset for education-to-repeat cohorts.",
    mdDecisionStatus: "not_required",
    decisionIds: [],
    milestoneIds: [],
    dependencyIds: [],
    commitmentIds: [],
    resultIds: [],
    linkedEntityIds: [
      "fn-customer",
      "sku-doodh-plus",
      "sku-supreme",
      "sku-gold-pro",
      "sku-diamond-pro",
    ],
    linkedMetricIds: [],
    linkedAttentionIds: [],
    source: illustrativeSource,
    createdAt: "2026-09-01T09:00:00",
    updatedAt: "2026-09-22T17:00:00",
  },
];

/* =========================================================
   MILESTONES
========================================================= */

export const milestones: ExecutionMilestone[] = [
  {
    id: "milestone-bihar-diagnosis",
    initiativeId: "init-bihar-recovery",
    title: "Identify district-level drivers",
    owner: biharOwner,
    dueDate: "2026-09-23",
    status: "complete",
    health: "complete",
    completedAt: "2026-09-23",
    note: "Patna identified as largest modelled contributor.",
  },

  {
    id: "milestone-patna-recovery",
    initiativeId: "init-bihar-recovery",
    title: "Return Patna to recovery trajectory",
    owner: biharOwner,
    dueDate: "2026-10-05",
    status: "in_progress",
    health: "risk",
  },

  {
    id: "milestone-patna-audit",
    initiativeId: "init-patna-east-availability",
    title: "Complete retailer availability audit",
    owner: biharOwner,
    dueDate: "2026-09-26",
    status: "in_progress",
    health: "watch",
  },

  {
    id: "milestone-patna-replenish",
    initiativeId: "init-patna-east-availability",
    title: "Replenish priority retailer gaps",
    owner: supplyOwner,
    dueDate: "2026-09-29",
    status: "not_started",
    health: "watch",
  },
];

/* =========================================================
   DEPENDENCIES
========================================================= */

export const dependencies: ExecutionDependency[] = [
  {
    id: "dep-bihar-stock",
    initiativeId: "init-bihar-recovery",
    title: "Priority SKU availability",
    owner: supplyOwner,
    status: "watch",
    blockingReason:
      "Patna East availability remains below target.",
    linkedEntityIds: [
      "dist-patna-east",
      "sku-gold-pro",
      "sku-diamond-pro",
    ],
  },

  {
    id: "dep-patna-replenishment",
    initiativeId: "init-patna-east-availability",
    title: "SKU-level replenishment visibility",
    owner: supplyOwner,
    status: "watch",
    blockingReason:
      "Retailer-level gaps need to be consolidated before replenishment is released.",
    linkedEntityIds: [
      "dist-patna-east",
      "retailer-patna-01",
      "retailer-patna-02",
    ],
  },

  {
    id: "dep-bihar-availability-evidence",
    initiativeId: "init-bihar-discount-guardrail",
    title: "Availability recovery evidence",
    owner: commercialOwner,
    status: "blocked",
    blockingReason:
      "MD decision should distinguish a distribution problem from a pricing problem.",
    linkedEntityIds: [
      "state-bihar",
      "dist-patna-east",
    ],
  },

  {
    id: "dep-existing-network-productivity",
    initiativeId: "init-bihar-distributor-expansion",
    title: "Existing network productivity",
    owner: commercialOwner,
    status: "watch",
    blockingReason:
      "Expansion should follow recovery of existing distributor productivity.",
    linkedEntityIds: [
      "state-bihar",
      "dist-patna-east",
      "dist-patna-rural",
    ],
  },
];

/* =========================================================
   DECISIONS
========================================================= */

export const decisions: ExecutionDecision[] = [
  {
    id: "decision-bihar-discount",
    title: "Bihar discount exception",
    question:
      "Should Gyandhara temporarily widen Bihar discounting to accelerate recovery?",
    context:
      "Bihar is below plan, but the current diagnosis indicates a meaningful part of the problem is retailer availability rather than price alone.",
    owner: mdOwner,
    status: "pending",
    requestedAt: "2026-09-24T08:30:00",
    dueDate: "2026-09-26",
    recommendation:
      "Keep existing discount guardrails unchanged until the Patna East availability intervention is measured.",
    options: [
      {
        id: "option-hold",
        label: "Hold current guardrail",
        description:
          "Fix availability first and reassess pricing after the recovery window.",
        impact:
          "Protects margin while isolating whether distribution is the primary constraint.",
      },
      {
        id: "option-targeted",
        label: "Targeted exception",
        description:
          "Permit a tightly bounded exception for selected accounts only.",
        impact:
          "Potentially accelerates recovery with controlled margin exposure.",
      },
      {
        id: "option-broad",
        label: "Broad Bihar exception",
        description:
          "Increase discount flexibility across the state.",
        impact:
          "Fastest commercial lever but creates the largest modelled margin exposure.",
      },
    ],
    linkedInitiativeIds: [
      "init-bihar-recovery",
      "init-bihar-discount-guardrail",
    ],
    linkedEntityIds: [
      "state-bihar",
      "fn-finance",
      "fn-commercial",
    ],
    linkedMetricIds: [
      "metric-bihar-revenue",
      "metric-ebitda",
    ],
    impact: {
      type: "margin",
      value: 41,
      unit: "₹L",
      label: "Modelled margin exposure",
      provenance: "illustrative",
    },
    source: illustrativeSource,
  },
];

/* =========================================================
   COMMITMENTS
========================================================= */

export const commitments: ExecutionCommitment[] = [
  {
    id: "commit-bihar-review",
    initiativeId: "init-bihar-recovery",
    owner: biharOwner,
    statement:
      "Bihar team will review district recovery progress and escalate unresolved constraints.",
    createdAt: "2026-09-23T16:00:00",
    dueDate: "2026-09-26",
    status: "due_soon",
    sourceType: "initiative",
    escalationRequired: false,
  },

  {
    id: "commit-patna-audit",
    initiativeId: "init-patna-east-availability",
    owner: biharOwner,
    statement:
      "Commercial will complete the Patna East retailer availability review.",
    createdAt: "2026-09-24T10:00:00",
    dueDate: "2026-09-26",
    status: "due_soon",
    sourceType: "brain",
    sourceReference:
      "What should we do about Bihar?",
    escalationRequired: false,
  },

  {
    id: "commit-patna-stock",
    initiativeId: "init-patna-east-availability",
    owner: supplyOwner,
    statement:
      "Supply Chain will issue a replenishment plan for priority Patna East SKU gaps.",
    createdAt: "2026-09-24T10:05:00",
    dueDate: "2026-09-27",
    status: "open",
    sourceType: "initiative",
    escalationRequired: false,
  },

  {
    id: "commit-finance-scenario",
    initiativeId: "init-bihar-discount-guardrail",
    decisionId: "decision-bihar-discount",
    owner: financeOwner,
    statement:
      "Finance will quantify the margin impact of hold, targeted and broad Bihar discount scenarios.",
    createdAt: "2026-09-23T14:00:00",
    dueDate: "2026-09-24",
    status: "overdue",
    sourceType: "decision",
    escalationRequired: true,
    note:
      "Decision pack is waiting on final scenario comparison.",
  },

  {
    id: "commit-repeat-analysis",
    initiativeId: "init-bihar-repeat",
    owner: customerOwner,
    statement:
      "Customer team will segment Bihar non-repeat farmers by product, district and availability.",
    createdAt: "2026-09-22T12:00:00",
    dueDate: "2026-09-29",
    status: "open",
    sourceType: "initiative",
    escalationRequired: false,
  },

  {
    id: "commit-soymeal-scenario",
    initiativeId: "init-soymeal-exposure",
    owner: procurementOwner,
    statement:
      "Procurement will compare open soymeal positions against alternate supplier scenarios.",
    createdAt: "2026-09-23T11:00:00",
    dueDate: "2026-09-27",
    status: "open",
    sourceType: "brain",
    sourceReference:
      "Why should I care about soymeal?",
    escalationRequired: false,
  },

  {
    id: "commit-amethi-loss-tree",
    initiativeId: "init-amethi-utilisation",
    owner: amethiOwner,
    statement:
      "Amethi will separate utilisation loss into demand, downtime and scheduling drivers.",
    createdAt: "2026-09-22T10:00:00",
    dueDate: "2026-09-28",
    status: "open",
    sourceType: "initiative",
    escalationRequired: false,
  },

  {
    id: "commit-inventory-aging",
    initiativeId: "init-inventory-days",
    owner: supplyOwner,
    statement:
      "Supply Chain will publish excess inventory by raw material, finished goods and slow-moving SKU.",
    createdAt: "2026-09-22T15:00:00",
    dueDate: "2026-09-26",
    status: "due_soon",
    sourceType: "initiative",
    escalationRequired: false,
  },
];

/* =========================================================
   RESULTS

   Sparse intentionally. Most initiatives are still live.
   Over time this becomes the institutional learning layer:
   what we expected, what actually happened, and what we
   should remember next time.
========================================================= */

export const results: ExecutionResult[] = [
  {
    id: "result-bihar-diagnosis",
    initiativeId: "init-bihar-recovery",
    recordedAt: "2026-09-23T18:00:00",
    label: "District diagnosis completed",
    outcome: "positive",
    learning:
      "The modelled Bihar gap is concentrated enough that a targeted Patna intervention should precede broad state-wide commercial action.",
    provenance: "derived",
  },
];

/* =========================================================
   COMMAND CENTRE
========================================================= */

export const executionCommandCentre: ExecutionCommandCentre = {
  objectives,
  initiatives,
  milestones,
  dependencies,
  commitments,
  decisions,
  results,
};