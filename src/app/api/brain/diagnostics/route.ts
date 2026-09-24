import {
  getBrainDiagnostics,
  getConnectedEntities,
  getEntity,
  getExecutiveImpact,
  getImpactMap,
  getMDItems,
  getMetricsForEntity,
  getRisks,
  traverseCompanyGraph,
} from "@/services/company-brain";

export async function GET() {
  const soymeal = getEntity("rm-soymeal");
  const bihar = getEntity("state-bihar");

  return Response.json({
    status: "Company Brain online",

    diagnostics: getBrainDiagnostics(),

    tests: {
      soymeal: {
        entity: soymeal,
        connectedTo: getConnectedEntities("rm-soymeal").map(
          (entity) => entity.name
        ),
      },

      bihar: {
        entity: bihar,
        metrics: getMetricsForEntity("state-bihar"),
        connectedTo: getConnectedEntities("state-bihar").map(
          (entity) => entity.name
        ),
      },

      mdAttention: getMDItems(),

      risks: getRisks(),
    },

    graphReasoning: {
      question:
        "If Soymeal changes, what parts of Gyandhara could it affect?",

      soymealImpactPath: traverseCompanyGraph(
        "rm-soymeal",
        4
      ),

      soymealImpactMap: getImpactMap(
        "rm-soymeal",
        4
      ),

      executiveImpact: getExecutiveImpact(
        "rm-soymeal",
        4
      ),
    },
  });
}