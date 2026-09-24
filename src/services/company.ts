import {
  attention,
  entities,
  metrics,
  relationships,
} from "@/data/gyandhara";

import {
  getConnectedEntities,
  getEntity,
  getMetricsForEntity,
  getRelationshipsForEntity,
} from "@/services/company-brain";

export type CompanySection =
  | "money"
  | "commercial"
  | "operations"
  | "supply"
  | "customer"
  | "people";

export interface CompanySectionSummary {
  id: CompanySection;
  label: string;
  description: string;
  health: "good" | "watch" | "risk";
  metricCount: number;
  attentionCount: number;
}

function getWorstHealth(
  healthValues: Array<"good" | "watch" | "risk">
): "good" | "watch" | "risk" {
  if (healthValues.includes("risk")) {
    return "risk";
  }

  if (healthValues.includes("watch")) {
    return "watch";
  }

  return "good";
}

export function getCompanyOverview() {
  const company = getEntity("gyandhara");

  return {
    company,

    publicFacts: {
      revenue: "₹425Cr+",
      farmerReach: "10 lakh+",
      plants: 2,
      states: 4,
    },

    model: {
      entities: entities.length,
      relationships: relationships.length,
      metrics: metrics.length,
      attentionItems: attention.length,
    },
  };
}

export function getCompanySections(): CompanySectionSummary[] {
  const sectionDefinitions: Array<{
    id: CompanySection;
    label: string;
    description: string;
    domains: string[];
  }> = [
    {
      id: "money",
      label: "Money",
      description:
        "Revenue, margin, EBITDA, working capital and cash.",
      domains: ["money"],
    },

    {
      id: "commercial",
      label: "Commercial",
      description:
        "States, districts, distributors, retailers and SKUs.",
      domains: ["commercial"],
    },

    {
      id: "operations",
      label: "Operations",
      description:
        "Plants, production, utilisation, quality and cost.",
      domains: ["operations"],
    },

    {
      id: "supply",
      label: "Supply Chain",
      description:
        "Suppliers, raw materials, inventory and dispatch.",
      domains: ["supply"],
    },

    {
      id: "customer",
      label: "Customer & Farmer",
      description:
        "Farmer reach, education, trials, repeat and outcomes.",
      domains: ["customer"],
    },

    {
      id: "people",
      label: "People",
      description:
        "Leadership, ownership, commitments and accountability.",
      domains: ["people"],
    },
  ];

  return sectionDefinitions.map((section) => {
    const sectionMetrics = metrics.filter((metric) =>
      section.domains.includes(metric.domain)
    );

    const sectionEntityIds = new Set(
      sectionMetrics.map((metric) => metric.entityId)
    );

    const sectionAttention = attention.filter((item) =>
      item.relatedEntityIds.some((id) =>
        sectionEntityIds.has(id)
      )
    );

    return {
      id: section.id,
      label: section.label,
      description: section.description,

      health: getWorstHealth(
        sectionMetrics.map((metric) => metric.health)
      ),

      metricCount: sectionMetrics.length,
      attentionCount: sectionAttention.length,
    };
  });
}

export function getSectionMetrics(section: CompanySection) {
  return metrics.filter(
    (metric) => metric.domain === section
  );
}

export function getEntityProfile(entityId: string) {
  const entity = getEntity(entityId);

  if (!entity) {
    return null;
  }

  const entityMetrics =
    getMetricsForEntity(entityId);

  const connected =
    getConnectedEntities(entityId);

  const entityRelationships =
    getRelationshipsForEntity(entityId);

  const relatedAttention =
    attention.filter((item) =>
      item.relatedEntityIds.includes(entityId)
    );

  return {
    entity,

    metrics: entityMetrics,

    connected,

    relationships: entityRelationships,

    attention: relatedAttention,
  };
}

export function getCommercialMap() {
  const states = entities.filter(
    (entity) => entity.type === "state"
  );

  const districts = entities.filter(
    (entity) => entity.type === "district"
  );

  const distributors = entities.filter(
    (entity) => entity.type === "distributor"
  );

  const retailers = entities.filter(
    (entity) => entity.type === "retailer"
  );

  const skus = entities.filter(
    (entity) => entity.type === "sku"
  );

  return {
    states,
    districts,
    distributors,
    retailers,
    skus,
  };
}

export function getOperationsMap() {
  const plants = entities.filter(
    (entity) => entity.type === "plant"
  );

  return plants.map((plant) => ({
    plant,

    metrics:
      getMetricsForEntity(plant.id),

    connected:
      getConnectedEntities(plant.id),

    attention:
      attention.filter((item) =>
        item.relatedEntityIds.includes(plant.id)
      ),
  }));
}

export function getSupplyMap() {
  const suppliers = entities.filter(
    (entity) => entity.type === "supplier"
  );

  const rawMaterials = entities.filter(
    (entity) => entity.type === "raw_material"
  );

  return {
    suppliers,

    rawMaterials: rawMaterials.map((material) => ({
      material,

      connected:
        getConnectedEntities(material.id),

      metrics:
        getMetricsForEntity(material.id),

      attention:
        attention.filter((item) =>
          item.relatedEntityIds.includes(material.id)
        ),
    })),
  };
}

export function getCompanyGraphSummary() {
  const relationshipTypes = relationships.reduce<
    Record<string, number>
  >((summary, relationship) => {
    summary[relationship.type] =
      (summary[relationship.type] ?? 0) + 1;

    return summary;
  }, {});

  return {
    entityCount: entities.length,
    relationshipCount: relationships.length,
    relationshipTypes,
  };
}