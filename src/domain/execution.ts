import type {
  Provenance,
  SourceMeta,
} from "@/domain/company";

/* =========================================================
   EXECUTION — COMPANY OPERATING MODEL

   Strategy becomes useful only when it resolves into:
   ownership, commitments, decisions and measurable results.

   Objective
      ↓
   Initiative
      ↓
   Milestone
      ↓
   Commitment
      ↓
   Result

   Dependencies and decisions can affect any initiative.
========================================================= */

export type ExecutionHealth =
  | "good"
  | "watch"
  | "risk"
  | "blocked"
  | "complete";

export type ExecutionStatus =
  | "not_started"
  | "in_progress"
  | "at_risk"
  | "blocked"
  | "complete";

export type ExecutionPriority =
  | "critical"
  | "high"
  | "medium"
  | "low";

export type ExecutionFunction =
  | "MD Office"
  | "Finance"
  | "Commercial"
  | "Operations"
  | "Procurement"
  | "Supply Chain"
  | "Marketing"
  | "People"
  | "Quality"
  | "R&D";

export type DecisionStatus =
  | "not_required"
  | "required"
  | "pending"
  | "approved"
  | "rejected";

export type CommitmentStatus =
  | "open"
  | "due_soon"
  | "overdue"
  | "complete";

export type DependencyStatus =
  | "clear"
  | "watch"
  | "blocked";

export type ImpactType =
  | "revenue"
  | "margin"
  | "cost"
  | "cash"
  | "capacity"
  | "risk"
  | "strategic";

/* =========================================================
   OWNER
========================================================= */

export interface ExecutionOwner {
  id: string;
  name: string;
  role: string;
  function: ExecutionFunction;
  entityId?: string;
}

/* =========================================================
   IMPACT
========================================================= */

export interface ExecutionImpact {
  type: ImpactType;

  value?: number;

  unit?:
    | "₹"
    | "₹L"
    | "₹Cr"
    | "%"
    | "days"
    | "MT"
    | "items";

  label: string;

  note?: string;

  provenance: Provenance;
}

/* =========================================================
   OBJECTIVE
========================================================= */

export interface StrategicObjective {
  id: string;

  title: string;
  description: string;

  owner: ExecutionOwner;

  priority: ExecutionPriority;
  status: ExecutionStatus;
  health: ExecutionHealth;

  period: string;

  target?: number;
  current?: number;
  unit?: string;

  initiativeIds: string[];

  linkedEntityIds: string[];
  linkedMetricIds: string[];

  source: SourceMeta;
}

/* =========================================================
   MILESTONE
========================================================= */

export interface ExecutionMilestone {
  id: string;
  initiativeId: string;

  title: string;

  owner: ExecutionOwner;

  dueDate: string;

  status: ExecutionStatus;
  health: ExecutionHealth;

  completedAt?: string;

  note?: string;
}

/* =========================================================
   DEPENDENCY
========================================================= */

export interface ExecutionDependency {
  id: string;
  initiativeId: string;

  title: string;

  owner: ExecutionOwner;

  status: DependencyStatus;

  blockingReason?: string;

  linkedEntityIds?: string[];
}

/* =========================================================
   COMMITMENT

   A commitment is deliberately more explicit than a task.

   "Commercial will close the Patna East availability
   gap by Friday" is a commitment.

   It has:
   WHO + WHAT + WHEN + STATUS.
========================================================= */

export interface ExecutionCommitment {
  id: string;

  initiativeId?: string;
  decisionId?: string;

  owner: ExecutionOwner;

  statement: string;

  createdAt: string;
  dueDate: string;

  status: CommitmentStatus;

  completedAt?: string;

  sourceType:
    | "meeting"
    | "brain"
    | "decision"
    | "manual"
    | "initiative";

  sourceReference?: string;

  escalationRequired: boolean;

  note?: string;
}

/* =========================================================
   DECISION
========================================================= */

export interface ExecutionDecision {
  id: string;

  title: string;
  question: string;

  context: string;

  owner: ExecutionOwner;

  status: DecisionStatus;

  requestedAt: string;
  dueDate?: string;
  decidedAt?: string;

  recommendation?: string;

  options?: Array<{
    id: string;
    label: string;
    description: string;
    impact?: string;
  }>;

  decision?: string;

  rationale?: string;

  linkedInitiativeIds: string[];
  linkedEntityIds: string[];
  linkedMetricIds: string[];

  impact?: ExecutionImpact;

  source: SourceMeta;
}

/* =========================================================
   RESULT
========================================================= */

export interface ExecutionResult {
  id: string;

  initiativeId: string;

  recordedAt: string;

  label: string;

  expected?: number;
  actual?: number;
  unit?: string;

  outcome:
    | "positive"
    | "neutral"
    | "negative";

  learning?: string;

  provenance: Provenance;
}

/* =========================================================
   INITIATIVE

   This is the central execution object.

   It answers:
   - Why are we doing this?
   - Who owns it?
   - What does success mean?
   - Where are we now?
   - What is stuck?
   - What happens next?
   - Does Ritu need to intervene?
========================================================= */

export interface ExecutionInitiative {
  id: string;

  objectiveId: string;

  title: string;
  description: string;

  owner: ExecutionOwner;

  collaborators: ExecutionOwner[];

  priority: ExecutionPriority;
  status: ExecutionStatus;
  health: ExecutionHealth;

  startDate: string;
  deadline: string;

  target?: number;
  current?: number;
  unit?: string;

  progress: number;

  nextAction: string;

  blocker?: string;

  mdDecisionStatus: DecisionStatus;
  decisionIds: string[];

  milestoneIds: string[];
  dependencyIds: string[];
  commitmentIds: string[];
  resultIds: string[];

  linkedEntityIds: string[];
  linkedMetricIds: string[];
  linkedAttentionIds: string[];

  impact?: ExecutionImpact;

  brainOrigin?: {
    query: string;
    finding: string;
    recommendation: string;
    createdAt: string;
  };

  source: SourceMeta;

  createdAt: string;
  updatedAt: string;
}

/* =========================================================
   EXECUTION COMMAND CENTRE
========================================================= */

export interface ExecutionCommandCentre {
  objectives: StrategicObjective[];
  initiatives: ExecutionInitiative[];
  milestones: ExecutionMilestone[];
  dependencies: ExecutionDependency[];
  commitments: ExecutionCommitment[];
  decisions: ExecutionDecision[];
  results: ExecutionResult[];
}