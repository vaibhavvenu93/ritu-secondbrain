import {
  commitments,
  decisions,
  dependencies,
  executionCommandCentre,
  initiatives,
  milestones,
  objectives,
  results,
} from "@/data/execution-data";

import type {
  ExecutionInitiative,
} from "@/domain/execution";

/* =========================================================
   BASIC LOOKUPS
========================================================= */

export function getExecutionCommandCentre() {
  return executionCommandCentre;
}

export function getObjective(id: string) {
  return objectives.find(
    (objective) => objective.id === id
  );
}

export function getInitiative(id: string) {
  return initiatives.find(
    (initiative) => initiative.id === id
  );
}

export function getDecision(id: string) {
  return decisions.find(
    (decision) => decision.id === id
  );
}

/* =========================================================
   INITIATIVE DETAIL
========================================================= */

export function getInitiativeDetail(
  initiativeId: string
) {
  const initiative =
    getInitiative(initiativeId);

  if (!initiative) {
    return undefined;
  }

  return {
    initiative,

    objective: getObjective(
      initiative.objectiveId
    ),

    milestones: milestones.filter(
      (item) =>
        item.initiativeId === initiativeId
    ),

    dependencies: dependencies.filter(
      (item) =>
        item.initiativeId === initiativeId
    ),

    commitments: commitments.filter(
      (item) =>
        item.initiativeId === initiativeId
    ),

    decisions: decisions.filter(
      (decision) =>
        initiative.decisionIds.includes(
          decision.id
        )
    ),

    results: results.filter(
      (result) =>
        result.initiativeId === initiativeId
    ),
  };
}

/* =========================================================
   MD ATTENTION

   The MD should not see everything.

   Only surface:
   - explicit MD decisions
   - blocked work
   - critical risks
   - escalated commitments
========================================================= */

export function getExecutionMDAttention() {
  const pendingDecisions =
    decisions.filter(
      (decision) =>
        decision.status === "required" ||
        decision.status === "pending"
    );

  const blockedInitiatives =
    initiatives.filter(
      (initiative) =>
        initiative.status === "blocked"
    );

  const criticalRisks =
    initiatives.filter(
      (initiative) =>
        initiative.priority === "critical" &&
        initiative.health === "risk"
    );

  const escalatedCommitments =
    commitments.filter(
      (commitment) =>
        commitment.escalationRequired &&
        commitment.status !== "complete"
    );

   const directMDItems =
    pendingDecisions.length;

  const operatingEscalations =
    blockedInitiatives.filter(
      (initiative) =>
        initiative.mdDecisionStatus !== "required" &&
        initiative.mdDecisionStatus !== "pending"
    );

  return {
    pendingDecisions,
    blockedInitiatives,
    criticalRisks,
    escalatedCommitments,
    operatingEscalations,

    directMDItems,

    signalCount:
      blockedInitiatives.length +
      criticalRisks.length +
      escalatedCommitments.length,

    total: directMDItems,
  };
}
/* =========================================================
   EXECUTIVE SUMMARY
========================================================= */

export function getExecutionSummary() {
  const active = initiatives.filter(
    (initiative) =>
      initiative.status !== "complete"
  );

  const atRisk = initiatives.filter(
    (initiative) =>
      initiative.health === "risk" ||
      initiative.health === "blocked"
  );

  const onTrack = initiatives.filter(
    (initiative) =>
      initiative.health === "good"
  );

  const openCommitments =
    commitments.filter(
      (commitment) =>
        commitment.status !== "complete"
    );

  const overdueCommitments =
    commitments.filter(
      (commitment) =>
        commitment.status === "overdue"
    );

  const mdAttention =
    getExecutionMDAttention();

  return {
    objectives: objectives.length,
    activeInitiatives: active.length,
    onTrack: onTrack.length,
    atRisk: atRisk.length,
    openCommitments:
      openCommitments.length,
    overdueCommitments:
      overdueCommitments.length,
    pendingDecisions:
      mdAttention.pendingDecisions.length,
    mdAttention: mdAttention.total,
  };
}


/* =========================================================
   OBJECTIVE PORTFOLIO
========================================================= */

export function getObjectivePortfolio() {
  return objectives.map((objective) => {
    const objectiveInitiatives =
      initiatives.filter(
        (initiative) =>
          initiative.objectiveId ===
          objective.id
      );

    const riskCount =
      objectiveInitiatives.filter(
        (initiative) =>
          initiative.health === "risk" ||
          initiative.health === "blocked"
      ).length;

    const averageProgress =
      objectiveInitiatives.length > 0
        ? Math.round(
            objectiveInitiatives.reduce(
              (sum, initiative) =>
                sum +
                initiative.progress,
              0
            ) /
              objectiveInitiatives.length
          )
        : 0;

    return {
      objective,
      initiatives:
        objectiveInitiatives,
      riskCount,
      averageProgress,
    };
  });
}

/* =========================================================
   PRIORITY QUEUE

   This becomes the "what deserves attention?"
   layer on the Execution page.
========================================================= */

function executionScore(
  initiative: ExecutionInitiative
) {
  let score = 0;

  if (initiative.priority === "critical") {
    score += 40;
  } else if (
    initiative.priority === "high"
  ) {
    score += 25;
  } else if (
    initiative.priority === "medium"
  ) {
    score += 10;
  }

  if (initiative.health === "blocked") {
    score += 40;
  } else if (
    initiative.health === "risk"
  ) {
    score += 30;
  } else if (
    initiative.health === "watch"
  ) {
    score += 15;
  }

  if (
    initiative.mdDecisionStatus ===
      "required" ||
    initiative.mdDecisionStatus ===
      "pending"
  ) {
    score += 50;
  }

  if (initiative.blocker) {
    score += 10;
  }

  return score;
}

export function getExecutionPriorityQueue() {
  return [...initiatives]
    .filter(
      (initiative) =>
        initiative.status !== "complete"
    )
    .sort(
      (a, b) =>
        executionScore(b) -
        executionScore(a)
    )
    .map((initiative) => ({
      ...initiative,
      attentionScore:
        executionScore(initiative),
    }));
}

/* =========================================================
   COMMITMENT CONTROL
========================================================= */

export function getCommitmentControl() {
  return {
    overdue: commitments.filter(
      (commitment) =>
        commitment.status === "overdue"
    ),

    dueSoon: commitments.filter(
      (commitment) =>
        commitment.status === "due_soon"
    ),

    open: commitments.filter(
      (commitment) =>
        commitment.status === "open"
    ),

    complete: commitments.filter(
      (commitment) =>
        commitment.status === "complete"
    ),
  };
}

/* =========================================================
   DECISION CONTROL
========================================================= */

export function getDecisionControl() {
  return {
    waitingOnMD: decisions.filter(
      (decision) =>
        decision.status === "required" ||
        decision.status === "pending"
    ),

    resolved: decisions.filter(
      (decision) =>
        decision.status === "approved" ||
        decision.status === "rejected"
    ),
  };
}

/* =========================================================
   BRAIN-CREATED WORK

   Important for the demo:
   Which execution objects originated from
   Second Brain reasoning?
========================================================= */

export function getBrainOriginatedWork() {
  return initiatives.filter(
    (initiative) =>
      Boolean(initiative.brainOrigin)
  );
}
