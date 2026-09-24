import {
  attention,
  entities,
  metrics,
} from "@/data/gyandhara";

import {
  getEntity,
  getExecutiveImpact,
  getImpactMap,
  getMetricsForEntity,
  traverseCompanyGraph,
} from "@/services/company-brain";

/* =========================================================
   SECOND BRAIN
   Deterministic reasoning layer.

   The Brain does not invent company truth.

   It:
   1. understands the question
   2. resolves relevant company objects
   3. gathers metrics + graph evidence
   4. reasons over those facts
   5. produces an executive answer
========================================================= */

export type BrainIntent =
  | "why"
  | "what"
  | "attention"
  | "recommend"
  | "impact"
  | "compare"
  | "unknown";

export type BrainConfidence =
  | "high"
  | "medium"
  | "low";

export type BrainEvidenceType =
  | "metric"
  | "attention"
  | "entity"
  | "relationship"
  | "derived";

export interface BrainEvidence {
  id: string;
  type: BrainEvidenceType;
  label: string;
  value?: string;
  detail?: string;
  entityId?: string;
  provenance?: string;
}

export interface BrainDriver {
  rank: number;
  title: string;
  explanation: string;
  impact?: string;
  health?: "good" | "watch" | "risk";
  entityIds: string[];
}

export interface BrainRecommendation {
  id: string;
  title: string;
  rationale: string;
  owner?: string;
  expectedImpact?: string;
  actionType:
    | "investigate"
    | "commercial"
    | "operations"
    | "supply"
    | "finance"
    | "management";
}

export interface BrainQueryContext {
  page?: string;
  entityId?: string;
  section?: string;
}

export interface BrainAnswer {
  query: string;
  intent: BrainIntent;

  subject?: {
    id: string;
    name: string;
    type: string;
  };

  answer: string;
  summary: string;

  confidence: BrainConfidence;

  drivers: BrainDriver[];

  evidence: BrainEvidence[];

  recommendations: BrainRecommendation[];

  graphPath: Array<{
    depth: number;
    id: string;
    name: string;
    type: string;
    relationship?: string;
  }>;

  context: BrainQueryContext;

  generatedBy: "deterministic-company-brain";
}

/* =========================================================
   NORMALISATION
========================================================= */

function normalise(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s₹%.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================================================
   INTENT
========================================================= */

export function detectBrainIntent(
  query: string
): BrainIntent {
  const q = normalise(query);

  if (
    q.startsWith("why") ||
    q.includes("reason") ||
    q.includes("behind") ||
    q.includes("below plan") ||
    q.includes("what happened")
  ) {
    return "why";
  }

  if (
    q.includes("what needs my attention") ||
    q.includes("needs attention") ||
    q.includes("need my attention") ||
    q.includes("what needs me")
  ) {
    return "attention";
  }

  if (
    q.includes("what should") ||
    q.includes("what can we do") ||
    q.includes("recommend") ||
    q.includes("fix this") ||
    q.includes("improve")
  ) {
    return "recommend";
  }

  if (
    q.includes("impact") ||
    q.includes("affect") ||
    q.includes("exposure") ||
    q.includes("why should i care")
  ) {
    return "impact";
  }

  if (
    q.includes("compare") ||
    q.includes("versus") ||
    q.includes(" vs ")
  ) {
    return "compare";
  }

  if (
    q.startsWith("what") ||
    q.startsWith("show") ||
    q.startsWith("tell")
  ) {
    return "what";
  }

  return "unknown";
}

/* =========================================================
   ENTITY RESOLUTION

   We deliberately keep this transparent.

   Later an LLM can resolve ambiguous language, but company
   truth still resolves back to these entity IDs.
========================================================= */

const aliases: Record<string, string[]> = {
  "state-bihar": [
    "bihar",
    "bihar market",
    "bihar business",
  ],

  "district-patna": [
    "patna",
    "patna district",
  ],

  "dist-patna-east": [
    "patna east",
    "east patna",
  ],

  "dist-patna-rural": [
    "patna rural",
    "rural patna",
  ],

  "rm-soymeal": [
    "soymeal",
    "soy meal",
    "soya",
    "soy",
  ],

  "rm-maize": [
    "maize",
    "corn",
  ],

  "plant-hardoi": [
    "hardoi",
    "hardoi plant",
  ],

  "plant-amethi": [
    "amethi",
    "amethi plant",
  ],

  "sku-gold-pro": [
    "gold pro",
  ],

  "sku-diamond-pro": [
    "diamond pro",
  ],

  "objective-bihar": [
    "grow bihar",
    "bihar objective",
  ],

  "initiative-bihar-distribution": [
    "bihar distribution",
    "bihar distribution expansion",
  ],
};

export function resolveBrainEntity(
  query: string,
  context?: BrainQueryContext
) {
  if (context?.entityId) {
    const contextEntity = getEntity(
      context.entityId
    );

    if (contextEntity) {
      return contextEntity;
    }
  }

  const q = normalise(query);

  const aliasMatches: Array<{
    entityId: string;
    alias: string;
  }> = [];

  for (const [entityId, entityAliases] of Object.entries(
    aliases
  )) {
    for (const alias of entityAliases) {
      if (q.includes(alias)) {
        aliasMatches.push({
          entityId,
          alias,
        });
      }
    }
  }

  aliasMatches.sort(
    (a, b) => b.alias.length - a.alias.length
  );

  if (aliasMatches.length > 0) {
    return getEntity(aliasMatches[0].entityId);
  }

  const entityMatches = entities
    .filter((entity) =>
      q.includes(
        normalise(entity.name)
      )
    )
    .sort(
      (a, b) =>
        b.name.length - a.name.length
    );

  if (entityMatches.length > 0) {
    return entityMatches[0];
  }

  return undefined;
}

/* =========================================================
   METRIC HELPERS
========================================================= */

function formatMetricValue(
  value: number,
  unit: string
) {
  if (unit === "₹Cr") {
    return `₹${value}Cr`;
  }

  if (unit === "₹L") {
    return `₹${value}L`;
  }

  if (unit === "%") {
    return `${value}%`;
  }

  if (unit === "days") {
    return `${value} days`;
  }

  if (unit === "₹/MT") {
    return `₹${value.toLocaleString(
      "en-IN"
    )}/MT`;
  }

  if (unit === "farmers") {
    return `${value.toLocaleString(
      "en-IN"
    )} farmers`;
  }

  if (unit === "items") {
    return `${value} items`;
  }

  return `${value}${unit}`;
}

function metricVariance(
  value: number,
  plan?: number
) {
  if (
    plan === undefined ||
    plan === 0
  ) {
    return undefined;
  }

  return (
    ((value - plan) / plan) *
    100
  );
}

function metricEvidence(
  metric: (typeof metrics)[number]
): BrainEvidence {
  const variance = metricVariance(
    metric.value,
    metric.plan
  );

  return {
    id: metric.id,
    type: "metric",
    label: metric.label,
    value: formatMetricValue(
      metric.value,
      metric.unit
    ),
    detail:
      metric.plan !== undefined
        ? `Plan ${formatMetricValue(
            metric.plan,
            metric.unit
          )}${
            variance !== undefined
              ? ` · ${Math.abs(
                  variance
                ).toFixed(1)}% ${
                  variance >= 0
                    ? "above"
                    : "below"
                } plan`
              : ""
          }`
        : metric.note,
    entityId: metric.entityId,
    provenance:
      metric.source.provenance,
  };
}

/* =========================================================
   COMPANY-SPECIFIC REASONING

   These are not LLM guesses.
   They encode relationships already represented by our
   illustrative demo company model.
========================================================= */

function buildBiharReasoning(): {
  drivers: BrainDriver[];
  evidence: BrainEvidence[];
  recommendations: BrainRecommendation[];
} {
  const biharRevenue = metrics.find(
    (metric) =>
      metric.id ===
      "metric-bihar-revenue"
  );

  const patnaRevenue = metrics.find(
    (metric) =>
      metric.id ===
      "metric-patna-revenue"
  );

  const patnaEast = metrics.find(
    (metric) =>
      metric.id ===
      "metric-patna-east-sales"
  );

  const trialRepeat = metrics.find(
    (metric) =>
      metric.id ===
      "metric-bihar-trial"
  );

  const biharAttention =
    attention.filter((item) =>
      item.relatedEntityIds.some(
        (id) =>
          id === "state-bihar" ||
          id === "district-patna" ||
          id === "dist-patna-east"
      )
    );

  const evidence: BrainEvidence[] = [
    biharRevenue,
    patnaRevenue,
    patnaEast,
    trialRepeat,
  ]
    .filter(
      (
        metric
      ): metric is (typeof metrics)[number] =>
        Boolean(metric)
    )
    .map(metricEvidence);

  for (const item of biharAttention) {
    evidence.push({
      id: item.id,
      type: "attention",
      label: item.title,
      value: item.impact,
      detail: item.summary,
      provenance:
        item.source.provenance,
    });
  }

  const drivers: BrainDriver[] = [
    {
      rank: 1,
      title:
        "Patna is carrying the largest part of the Bihar gap",
      explanation:
        "Patna is materially below its current revenue plan and is the largest modelled district contributor to Bihar's shortfall.",
      health: "risk",
      entityIds: [
        "state-bihar",
        "district-patna",
      ],
    },

    {
      rank: 2,
      title:
        "Patna East distributor productivity is below target",
      explanation:
        "Patna East is below plan, with retailer activity and product availability represented as the immediate operating constraint.",
      impact:
        "₹18L modelled revenue at risk",
      health: "risk",
      entityIds: [
        "district-patna",
        "dist-patna-east",
      ],
    },

    {
      rank: 3,
      title:
        "Trial-to-repeat conversion is weaker than plan",
      explanation:
        "Bihar's modelled trial-to-repeat rate is below target, suggesting the issue is not only distribution reach but conversion into repeat demand.",
      health: "risk",
      entityIds: [
        "state-bihar",
      ],
    },
  ];

  const recommendations: BrainRecommendation[] = [
    {
      id: "bihar-action-1",
      title:
        "Recover Patna East availability first",
      rationale:
        "It is the clearest modelled commercial bottleneck connected to the largest district gap.",
      owner: "Commercial",
      expectedImpact:
        "Recover part of ₹18L modelled revenue at risk",
      actionType: "commercial",
    },

    {
      id: "bihar-action-2",
      title:
        "Run a retailer-level availability review across Patna",
      rationale:
        "Determine whether the Patna East issue is isolated or a wider stock, coverage or retailer-activity problem before changing commercial terms.",
      owner: "Commercial",
      actionType: "investigate",
    },

    {
      id: "bihar-action-3",
      title:
        "Separate distribution recovery from discount policy",
      rationale:
        "The existing Bihar objective explicitly protects contribution economics, so discount flexibility should not become the default response to a distribution problem.",
      owner: "Commercial + Finance",
      expectedImpact:
        "Protect modelled margin exposure",
      actionType: "finance",
    },
  ];

  return {
    drivers,
    evidence,
    recommendations,
  };
}

function buildSoymealReasoning(): {
  drivers: BrainDriver[];
  evidence: BrainEvidence[];
  recommendations: BrainRecommendation[];
} {
  const soymealCost = metrics.find(
    (metric) =>
      metric.id ===
      "metric-soy-cost"
  );

  const soyAttention = attention.find(
    (item) =>
      item.id ===
      "attention-soy"
  );

  const evidence: BrainEvidence[] = [];

  if (soymealCost) {
    evidence.push(
      metricEvidence(soymealCost)
    );
  }

  if (soyAttention) {
    evidence.push({
      id: soyAttention.id,
      type: "attention",
      label: soyAttention.title,
      value: soyAttention.impact,
      detail: soyAttention.summary,
      provenance:
        soyAttention.source.provenance,
    });
  }

  return {
    drivers: [
      {
        rank: 1,
        title:
          "Soymeal purchase cost is above plan",
        explanation:
          "The model shows soymeal procurement cost running above plan, creating direct input-cost pressure.",
        health: "risk",
        entityIds: ["rm-soymeal"],
      },

      {
        rank: 2,
        title:
          "Premium SKU economics are exposed",
        explanation:
          "The company graph connects soymeal to Gold Pro and Diamond Pro, so sustained input inflation can flow into premium SKU contribution economics.",
        impact:
          soyAttention?.impact,
        health: "risk",
        entityIds: [
          "rm-soymeal",
          "sku-gold-pro",
          "sku-diamond-pro",
        ],
      },
    ],

    evidence,

    recommendations: [
      {
        id: "soy-action-1",
        title:
          "Review exposed purchase positions",
        rationale:
          "Determine how much near-term soymeal requirement remains unprotected at current market prices.",
        owner: "Supply Chain",
        actionType: "supply",
      },

      {
        id: "soy-action-2",
        title:
          "Model SKU contribution sensitivity",
        rationale:
          "Quantify how sustained soymeal inflation changes Gold Pro and Diamond Pro contribution before changing pricing or formulation.",
        owner:
          "Finance + Supply Chain",
        actionType: "finance",
      },
    ],
  };
}

/* =========================================================
   ATTENTION BRIEF
========================================================= */

function buildAttentionAnswer() {
  const mdItems = attention.filter(
    (item) => item.requiresMD
  );

  const risks = attention.filter(
    (item) =>
      item.type === "risk"
  );

  const commitments = attention.filter(
    (item) =>
      item.type === "commitment"
  );

  const drivers: BrainDriver[] =
    attention
      .filter(
        (item) =>
          item.health === "risk" ||
          item.requiresMD
      )
      .slice(0, 5)
      .map((item, index) => ({
        rank: index + 1,
        title: item.title,
        explanation: item.summary,
        impact: item.impact,
        health: item.health,
        entityIds:
          item.relatedEntityIds,
      }));

  const evidence: BrainEvidence[] =
    attention.map((item) => ({
      id: item.id,
      type: "attention",
      label: item.title,
      value: item.impact,
      detail: item.summary,
      provenance:
        item.source.provenance,
    }));

  return {
    answer:
      `${attention.length} items currently deserve attention. ` +
      `${mdItems.length} requires an MD decision, ` +
      `${risks.length} are active risks and ` +
      `${commitments.length} are commitments.`,

    summary:
      mdItems.length > 0
        ? `${mdItems.length} item is explicitly waiting on you.`
        : "Nothing is explicitly waiting on an MD decision.",

    drivers,

    evidence,
  };
}

/* =========================================================
   GENERIC ENTITY REASONING
========================================================= */

function buildGenericEntityReasoning(
  entityId: string
) {
  const entity = getEntity(entityId);

  const entityMetrics =
    getMetricsForEntity(entityId);

  const impact =
    getExecutiveImpact(
      entityId,
      4
    );

  const map =
    getImpactMap(
      entityId,
      3
    );

  const evidence: BrainEvidence[] =
    entityMetrics.map(
      metricEvidence
    );

  for (const item of impact.risks) {
    evidence.push({
      id: `risk-${item.entity}-${item.title}`,
      type: "attention",
      label: item.title,
      value: item.impact,
      detail: `Connected through ${item.entity}.`,
    });
  }

  const unhealthyMetrics =
    impact.affectedMetrics.filter(
      (metric) =>
        metric.health === "risk" ||
        metric.health === "watch"
    );

  const drivers: BrainDriver[] =
    unhealthyMetrics
      .slice(0, 4)
      .map((metric, index) => ({
        rank: index + 1,
        title: `${metric.entity}: ${metric.label}`,
        explanation:
          metric.plan !== undefined
            ? `${formatMetricValue(
                metric.value,
                metric.unit
              )} against plan ${formatMetricValue(
                metric.plan,
                metric.unit
              )}.`
            : `${formatMetricValue(
                metric.value,
                metric.unit
              )}.`,
        health: metric.health,
        entityIds: [],
      }));

  if (
    drivers.length === 0 &&
    map.length > 1
  ) {
    drivers.push({
      rank: 1,
      title:
        `${entity?.name ?? "This area"} is connected to ${impact.affectedEntityCount} other company objects`,
      explanation:
        "The Company Brain can trace its operational and commercial dependencies, but no material exception is currently represented in the demo data.",
      health: "good",
      entityIds: map
        .slice(1, 5)
        .map(
          (item) =>
            item.entityId
        ),
    });
  }

  return {
    entity,
    impact,
    evidence,
    drivers,
  };
}

/* =========================================================
   RECOMMENDATION ROUTING
========================================================= */

function recommendationsForSubject(
  entityId?: string
): BrainRecommendation[] {
  if (
    entityId === "state-bihar" ||
    entityId === "district-patna" ||
    entityId === "dist-patna-east" ||
    entityId === "objective-bihar" ||
    entityId ===
      "initiative-bihar-distribution"
  ) {
    return buildBiharReasoning()
      .recommendations;
  }

  if (
    entityId === "rm-soymeal"
  ) {
    return buildSoymealReasoning()
      .recommendations;
  }

  return [];
}

/* =========================================================
   MAIN QUERY ENGINE
========================================================= */

export function askSecondBrain(
  query: string,
  context: BrainQueryContext = {}
): BrainAnswer {
  const intent =
    detectBrainIntent(query);

  const subject =
    resolveBrainEntity(
      query,
      context
    );

  /* -------------------------------------------------------
     ATTENTION QUERY
  ------------------------------------------------------- */

  if (intent === "attention") {
    const result =
      buildAttentionAnswer();

    return {
      query,
      intent,

      answer: result.answer,
      summary: result.summary,

      confidence: "high",

      drivers: result.drivers,
      evidence: result.evidence,

      recommendations: [],

      graphPath: [],

      context,

      generatedBy:
        "deterministic-company-brain",
    };
  }

  /* -------------------------------------------------------
     BIHAR
  ------------------------------------------------------- */

  if (
    subject &&
    [
      "state-bihar",
      "district-patna",
      "dist-patna-east",
      "dist-patna-rural",
      "objective-bihar",
      "initiative-bihar-distribution",
    ].includes(subject.id)
  ) {
    const reasoning =
      buildBiharReasoning();

    const path =
      traverseCompanyGraph(
        subject.id,
        4
      );

    const answer =
      intent === "recommend"
        ? "The fastest modelled recovery path is to fix Patna availability before changing Bihar commercial terms."
        : "Bihar is below plan primarily because the modelled shortfall concentrates in Patna, with Patna East distributor productivity and retailer availability emerging as the clearest immediate constraint.";

    return {
      query,
      intent,

      subject: {
        id: subject.id,
        name: subject.name,
        type: subject.type,
      },

      answer,

      summary:
        "The issue appears operationally concentrated rather than a uniform Bihar-wide decline.",

      confidence: "high",

      drivers:
        reasoning.drivers,

      evidence:
        reasoning.evidence,

      recommendations:
        intent === "recommend" ||
        intent === "why" ||
        intent === "impact"
          ? reasoning.recommendations
          : [],

      graphPath: path.map(
        (step) => ({
          depth: step.depth,
          id: step.entityId,
          name: step.entityName,
          type: step.entityType,
          relationship:
            step.viaRelationship,
        })
      ),

      context,

      generatedBy:
        "deterministic-company-brain",
    };
  }

  /* -------------------------------------------------------
     SOYMEAL
  ------------------------------------------------------- */

  if (
    subject?.id ===
    "rm-soymeal"
  ) {
    const reasoning =
      buildSoymealReasoning();

    const path =
      traverseCompanyGraph(
        subject.id,
        4
      );

    return {
      query,
      intent,

      subject: {
        id: subject.id,
        name: subject.name,
        type: subject.type,
      },

      answer:
        "Soymeal is an input-cost risk because purchase cost is above plan and the company graph connects that exposure to premium SKU economics.",

      summary:
        "The modelled exposure is concentrated through Gold Pro and Diamond Pro.",

      confidence: "high",

      drivers:
        reasoning.drivers,

      evidence:
        reasoning.evidence,

      recommendations:
        reasoning.recommendations,

      graphPath: path.map(
        (step) => ({
          depth: step.depth,
          id: step.entityId,
          name: step.entityName,
          type: step.entityType,
          relationship:
            step.viaRelationship,
        })
      ),

      context,

      generatedBy:
        "deterministic-company-brain",
    };
  }

  /* -------------------------------------------------------
     GENERIC COMPANY ENTITY
  ------------------------------------------------------- */

  if (subject) {
    const generic =
      buildGenericEntityReasoning(
        subject.id
      );

    const path =
      traverseCompanyGraph(
        subject.id,
        4
      );

    const unhealthy =
      generic.drivers.filter(
        (driver) =>
          driver.health ===
            "risk" ||
          driver.health ===
            "watch"
      );

    return {
      query,
      intent,

      subject: {
        id: subject.id,
        name: subject.name,
        type: subject.type,
      },

      answer:
        unhealthy.length > 0
          ? `${subject.name} has ${unhealthy.length} connected signal${unhealthy.length === 1 ? "" : "s"} that currently deserve attention.`
          : `I found ${generic.impact.affectedEntityCount} company objects connected to ${subject.name}, with no major exception represented in the current demo model.`,

      summary:
        unhealthy.length > 0
          ? generic.drivers[0]
              ?.explanation ??
            "There are connected exceptions worth reviewing."
          : "No material exception is represented in the current demo data.",

      confidence:
        generic.evidence.length > 0
          ? "high"
          : "medium",

      drivers:
        generic.drivers,

      evidence:
        generic.evidence,

      recommendations:
        recommendationsForSubject(
          subject.id
        ),

      graphPath: path.map(
        (step) => ({
          depth: step.depth,
          id: step.entityId,
          name: step.entityName,
          type: step.entityType,
          relationship:
            step.viaRelationship,
        })
      ),

      context,

      generatedBy:
        "deterministic-company-brain",
    };
  }

  /* -------------------------------------------------------
     COMPANY-LEVEL FALLBACK

     Important:
     We do not hallucinate an answer when the deterministic
     model cannot resolve the question.
  ------------------------------------------------------- */

  return {
    query,
    intent,

    answer:
      "I can reason over the company model, but I could not confidently resolve what part of Gyandhara this question refers to.",

    summary:
      "Try asking about Bihar, Patna, soymeal, a plant, a SKU, or what needs your attention.",

    confidence: "low",

    drivers: [],

    evidence: [],

    recommendations: [],

    graphPath: [],

    context,

    generatedBy:
      "deterministic-company-brain",
  };
}

/* =========================================================
   DEMO QUESTION SUITE

   These become our regression tests for the Brain.
========================================================= */

export const brainDemoQuestions = [
  "Why is Bihar behind plan?",
  "What needs my attention?",
  "Why is Patna behind?",
  "What should we do about Bihar?",
  "Why should I care about soymeal?",
  "What is happening at Amethi?",
  "What is connected to Diamond Pro?",
];