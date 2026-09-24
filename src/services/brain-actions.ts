import {
  getInitiative,
  getObjective,
} from "@/services/execution";

export interface BrainActionRequest {
  recommendationId: string;
  title: string;
  rationale?: string;
  owner?: string;
  expectedImpact?: string;
  actionType?: string;

  context?: {
    query?: string;
    subjectId?: string;
    subjectName?: string;
  };
}

export interface BrainExecutionPreview {
  actionId: string;

  status:
    | "ready"
    | "already_in_execution"
    | "needs_review";

  title: string;

  message: string;

  initiative: {
    id: string;
    title: string;
    owner: string;
    collaborator?: string;
    objective: string;
    deadline: string;
    nextAction: string;
    impact?: string;
    progress: number;
    health: string;
  };

  commitments: Array<{
    label: string;
    owner: string;
    dueDate: string;
  }>;

  provenance: {
    recommendationId: string;
    query?: string;
    mode: "deterministic-demo";
  };
}

/* =========================================================
   KNOWN BRAIN → EXECUTION MAPPINGS

   Important:
   These mappings connect recommendations produced by the
   deterministic Second Brain to execution objects already
   represented in the demo operating model.

   We are not pretending to write to a production database.
========================================================= */

const recommendationToInitiative: Record<
  string,
  string
> = {
  "bihar-action-1":
    "init-patna-east-availability",

  "soy-action-1":
    "init-soymeal-exposure",

  "soy-action-2":
    "init-premium-mix",
};

/* =========================================================
   HELPERS
========================================================= */

function ownerLabel(
  owner:
    | {
        name?: string;
        function?: string;
      }
    | undefined
) {
  if (!owner) {
    return "Owner to confirm";
  }

  return (
    owner.name ??
    owner.function ??
    "Owner to confirm"
  );
}

function getCollaborator(
  initiative: {
    collaborators?: Array<{
      name?: string;
      function?: string;
    }>;
  }
) {
  const collaborator =
    initiative.collaborators?.[0];

  if (!collaborator) {
    return undefined;
  }

  return ownerLabel(collaborator);
}

function impactLabel(
  impact:
    | {
        label?: string;
        value?: number;
        unit?: string;
      }
    | undefined,
  fallback?: string
) {
  if (
    impact?.value !== undefined &&
    impact.unit
  ) {
    if (impact.unit === "₹L") {
      return `₹${impact.value}L ${impact.label ?? ""}`.trim();
    }

    if (impact.unit === "₹Cr") {
      return `₹${impact.value}Cr ${impact.label ?? ""}`.trim();
    }

    return `${impact.value}${impact.unit} ${impact.label ?? ""}`.trim();
  }

  return fallback;
}

/* =========================================================
   BUILD EXECUTION PREVIEW
========================================================= */

export function buildBrainExecutionPreview(
  request: BrainActionRequest
): BrainExecutionPreview {
  const initiativeId =
    recommendationToInitiative[
      request.recommendationId
    ];

  /*
   * For V1 we only operationalise recommendations that
   * have an explicit mapping into the execution model.
   *
   * Unknown recommendations are not silently invented.
   */
  if (!initiativeId) {
    return {
      actionId: `brain-action-${request.recommendationId}`,

      status: "needs_review",

      title: request.title,

      message:
        "I can turn this recommendation into execution, but its owner, deadline and operating links need to be confirmed first.",

      initiative: {
        id: "",
        title: request.title,
        owner:
          request.owner ??
          "Owner to confirm",
        objective:
          "Objective to confirm",
        deadline:
          "Deadline to confirm",
        nextAction:
          request.rationale ??
          "Define the first measurable action.",
        impact:
          request.expectedImpact,
        progress: 0,
        health: "watch",
      },

      commitments: [],

      provenance: {
        recommendationId:
          request.recommendationId,
        query: request.context?.query,
        mode: "deterministic-demo",
      },
    };
  }

  const initiative =
    getInitiative(initiativeId);

  if (!initiative) {
    return {
      actionId: `brain-action-${request.recommendationId}`,

      status: "needs_review",

      title: request.title,

      message:
        "The recommendation is recognised, but its linked execution object could not be resolved.",

      initiative: {
        id: initiativeId,
        title: request.title,
        owner:
          request.owner ??
          "Owner to confirm",
        objective:
          "Objective to confirm",
        deadline:
          "Deadline to confirm",
        nextAction:
          request.rationale ??
          "Review recommendation.",
        impact:
          request.expectedImpact,
        progress: 0,
        health: "watch",
      },

      commitments: [],

      provenance: {
        recommendationId:
          request.recommendationId,
        query: request.context?.query,
        mode: "deterministic-demo",
      },
    };
  }

  const objective =
    getObjective(
      initiative.objectiveId
    );

  return {
    actionId: `brain-action-${request.recommendationId}`,

    status: "already_in_execution",

    title: initiative.title,

    message:
      "This recommendation is already represented in the execution model. I can take you directly to the operating object instead of creating a duplicate.",

    initiative: {
      id: initiative.id,
      title: initiative.title,

      owner: ownerLabel(
        initiative.owner
      ),

      collaborator:
        getCollaborator(initiative),

      objective:
        objective?.title ??
        "Linked objective",

      deadline:
        initiative.deadline,

      nextAction:
        initiative.nextAction,

      impact:
        impactLabel(
          initiative.impact,
          request.expectedImpact
        ),

      progress:
        initiative.progress,

      health:
        initiative.health,
    },

    commitments: [],

    provenance: {
      recommendationId:
        request.recommendationId,

      query:
        request.context?.query,

      mode: "deterministic-demo",
    },
  };
}