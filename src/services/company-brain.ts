import {
  agents,
  attention,
  entities,
  metrics,
  relationships,
} from "@/data/gyandhara";

export function getEntity(id: string) {
  return entities.find((entity) => entity.id === id);
}

export function getChildren(parentId: string) {
  return entities.filter((entity) => entity.parentId === parentId);
}

export function getMetricsForEntity(entityId: string) {
  return metrics.filter((metric) => metric.entityId === entityId);
}

export function getRelationshipsForEntity(entityId: string) {
  return relationships.filter(
    (relationship) =>
      relationship.from === entityId ||
      relationship.to === entityId
  );
}

export function getConnectedEntities(entityId: string) {
  const links = getRelationshipsForEntity(entityId);

  const connectedIds = new Set(
    links.map((link) =>
      link.from === entityId ? link.to : link.from
    )
  );

  return entities.filter((entity) =>
    connectedIds.has(entity.id)
  );
}

export function getMDItems() {
  return attention.filter((item) => item.requiresMD);
}

export function getRisks() {
  return attention.filter((item) => item.type === "risk");
}

export function getCompanyHealth() {
  const risks = metrics.filter(
    (metric) => metric.health === "risk"
  ).length;

  const watch = metrics.filter(
    (metric) => metric.health === "watch"
  ).length;

  if (risks > 1) return "risk";
  if (risks > 0 || watch > 2) return "watch";

  return "good";
}

export function getBrainDiagnostics() {
  return {
    entityCount: entities.length,
    relationshipCount: relationships.length,
    metricCount: metrics.length,
    attentionCount: attention.length,
    agentCount: agents.length,
    mdItems: getMDItems().length,
    health: getCompanyHealth(),
  };
}

/* =========================================================
   COMPANY GRAPH
   Allows the Brain to move beyond direct connections.

   Example:
   Soymeal
   -> Diamond Pro
   -> Bihar
   -> Grow Bihar
   -> Distribution Initiative
   -> Ritu
========================================================= */

export interface GraphPathStep {
  depth: number;
  entityId: string;
  entityName: string;
  entityType: string;
  viaRelationship?: string;
  fromEntityId?: string;
}

export function traverseCompanyGraph(
  startEntityId: string,
  maxDepth = 4
): GraphPathStep[] {
  const visited = new Set<string>([startEntityId]);

  const start = getEntity(startEntityId);

  if (!start) {
    return [];
  }

  const results: GraphPathStep[] = [
    {
      depth: 0,
      entityId: start.id,
      entityName: start.name,
      entityType: start.type,
    },
  ];

  let frontier = [startEntityId];

  for (let depth = 1; depth <= maxDepth; depth++) {
    const nextFrontier: string[] = [];

    for (const currentId of frontier) {
      const links = getRelationshipsForEntity(currentId);

      for (const link of links) {
        const nextId =
          link.from === currentId
            ? link.to
            : link.from;

        if (visited.has(nextId)) {
          continue;
        }

        const entity = getEntity(nextId);

        if (!entity) {
          continue;
        }

        visited.add(nextId);
        nextFrontier.push(nextId);

        results.push({
          depth,
          entityId: entity.id,
          entityName: entity.name,
          entityType: entity.type,
          viaRelationship: link.type,
          fromEntityId: currentId,
        });
      }
    }

    frontier = nextFrontier;

    if (frontier.length === 0) {
      break;
    }
  }

  return results;
}

/* =========================================================
   IMPACT MAP

   Takes every entity discovered during graph traversal and
   enriches it with:
   - metrics
   - risks
   - opportunities
   - decisions
   - commitments

   This eventually powers questions such as:
   "Why should I care?"
========================================================= */

export function getImpactMap(
  startEntityId: string,
  maxDepth = 4
) {
  const path = traverseCompanyGraph(
    startEntityId,
    maxDepth
  );

  return path.map((step) => {
    const entityMetrics = getMetricsForEntity(
      step.entityId
    );

    const entityAttention = attention.filter((item) =>
      item.relatedEntityIds.includes(step.entityId)
    );

    return {
      ...step,

      metrics: entityMetrics.map((metric) => ({
        label: metric.label,
        value: metric.value,
        unit: metric.unit,
        plan: metric.plan,
        previous: metric.previous,
        trend: metric.trend,
        health: metric.health,
      })),

      attention: entityAttention.map((item) => ({
        type: item.type,
        title: item.title,
        impact: item.impact,
        health: item.health,
        requiresMD: item.requiresMD,
      })),
    };
  });
}

/* =========================================================
   EXECUTIVE IMPACT SUMMARY

   Converts a graph traversal into something closer to what
   an MD actually cares about.
========================================================= */

export function getExecutiveImpact(
  startEntityId: string,
  maxDepth = 4
) {
  const impactMap = getImpactMap(
    startEntityId,
    maxDepth
  );

  const affectedEntities = impactMap.filter(
    (item) => item.depth > 0
  );

  const affectedMetrics = impactMap.flatMap(
    (item) =>
      item.metrics.map((metric) => ({
        entity: item.entityName,
        ...metric,
      }))
  );

  const attentionItems = impactMap.flatMap(
    (item) =>
      item.attention.map((attentionItem) => ({
        entity: item.entityName,
        ...attentionItem,
      }))
  );

  const mdItems = attentionItems.filter(
    (item) => item.requiresMD
  );

  const risks = attentionItems.filter(
    (item) => item.type === "risk"
  );

  const decisions = attentionItems.filter(
    (item) => item.type === "decision"
  );

  return {
    startingPoint: getEntity(startEntityId)?.name,
    affectedEntityCount: affectedEntities.length,

    affectedEntities: affectedEntities.map(
      (item) => ({
        name: item.entityName,
        type: item.entityType,
        depth: item.depth,
        relationship: item.viaRelationship,
      })
    ),

    affectedMetrics,

    risks,

    decisions,

    mdAttentionRequired: mdItems.length > 0,

    mdItems,
  };
}