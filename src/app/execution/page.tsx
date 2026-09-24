import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  IndianRupee,
  Link2,
  Target,
  UserRound,
} from "lucide-react";

import AppShell from "@/components/app-shell";
import AskBrainButton from "@/components/ask-brain-button";

import {
  getCommitmentControl,
  getDecisionControl,
  getExecutionMDAttention,
  getExecutionPriorityQueue,
  getExecutionSummary,
  getObjectivePortfolio,
} from "@/services/execution";

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatImpact(
  value?: number,
  unit?: string
) {
  if (value === undefined) {
    return undefined;
  }

  if (unit === "₹L") {
    return `₹${value}L`;
  }

  if (unit === "₹Cr") {
    return `₹${value}Cr`;
  }

  if (unit === "₹") {
    return `₹${value.toLocaleString("en-IN")}`;
  }

  return `${value}${unit ?? ""}`;
}

function formatObjectiveValue(
  value?: number,
  unit?: string
) {
  if (value === undefined) {
    return "—";
  }

  if (unit === "₹Cr MTD") {
    return `₹${value}Cr`;
  }

  if (unit === "%") {
    return `${value}%`;
  }

  if (unit === "inventory days") {
    return `${value} days`;
  }

  return `${value} ${unit ?? ""}`.trim();
}

export default function ExecutionPage() {
  const summary = getExecutionSummary();
  const mdAttention = getExecutionMDAttention();
  const objectivePortfolio = getObjectivePortfolio();
  const priorityQueue =
    getExecutionPriorityQueue();
  const commitmentControl =
    getCommitmentControl();
  const decisionControl =
    getDecisionControl();

  const visibleQueue =
    priorityQueue.slice(0, 7);

  const visibleCommitments = [
    ...commitmentControl.overdue,
    ...commitmentControl.dueSoon,
    ...commitmentControl.open,
  ].slice(0, 6);

  return (
    <AppShell
      active="execution"
      context="EXECUTION"
    >
      <div className="execution-page">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="execution-hero">
          <div>
            <div className="execution-eyebrow">
              EXECUTION COMMAND CENTRE
            </div>

            <h1>
              Everything we said we&apos;d make
              happen.
            </h1>

            <p>
              Strategy, ownership, commitments and
              decisions — connected in one place.
            </p>
          </div>

          <AskBrainButton
            question="What is at risk in execution right now?"
            autoSubmit
            className="execution-ask-button"
          >
            <Brain size={16} />
            Ask about execution
          </AskBrainButton>
        </section>

        {/* =================================================
            SUMMARY
        ================================================= */}

        <section className="execution-summary-grid">
          <div className="execution-summary-card">
            <span>Strategic priorities</span>
            <strong>{summary.objectives}</strong>
            <small>
              Company-level outcomes
            </small>
          </div>

          <div className="execution-summary-card">
            <span>Active initiatives</span>
            <strong>
              {summary.activeInitiatives}
            </strong>
            <small>
              {summary.onTrack} currently on track
            </small>
          </div>

          <div className="execution-summary-card risk">
            <span>Need intervention</span>
            <strong>{summary.atRisk}</strong>
            <small>
              Risk or blocked
            </small>
          </div>

          <div className="execution-summary-card">
            <span>Open commitments</span>
            <strong>
              {summary.openCommitments}
            </strong>
            <small>
              {summary.overdueCommitments} overdue
            </small>
          </div>

          <div className="execution-summary-card md">
            <span>Waiting on Ritu</span>
            <strong>{summary.mdAttention}</strong>
            <small>
              Direct MD decision
            </small>
          </div>
        </section>

        {/* =================================================
            NEEDS RITU
        ================================================= */}

        <section className="execution-section">
          <div className="execution-section-heading">
            <div>
              <div className="execution-section-kicker">
                NEEDS YOU
              </div>

              <h2>
                One decision. Everything else can
                keep moving.
              </h2>
            </div>

            <div className="execution-signal-note">
              {mdAttention.signalCount} operating
              signals being watched
            </div>
          </div>

          {decisionControl.waitingOnMD.map(
            (decision) => (
              <article
                className="md-decision-card"
                key={decision.id}
              >
                <div className="md-decision-icon">
                  <CircleAlert size={20} />
                </div>

                <div className="md-decision-main">
                  <div className="md-decision-meta">
                    <span>DECISION REQUIRED</span>

                    {decision.dueDate && (
                      <span>
                        Due {decision.dueDate}
                      </span>
                    )}
                  </div>

                  <h3>{decision.title}</h3>

                  <p className="md-decision-question">
                    {decision.question}
                  </p>

                  <div className="md-decision-context">
                    {decision.context}
                  </div>

                  {decision.recommendation && (
                    <div className="md-recommendation">
                      <Brain size={15} />

                      <div>
                        <span>
                          Brain recommendation
                        </span>

                        <p>
                          {
                            decision.recommendation
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="md-decision-side">
                  {decision.impact && (
                    <div className="decision-impact">
                      <span>
                        {decision.impact.label}
                      </span>

                      <strong>
                        {formatImpact(
                          decision.impact.value,
                          decision.impact.unit
                        )}
                      </strong>
                    </div>
                  )}

                  <AskBrainButton
                    question={`Walk me through the ${decision.title} decision.`}
                    autoSubmit
                    className="decision-review-button"
                  >
                    Review decision
                    <ArrowRight size={15} />
                  </AskBrainButton>
                </div>
              </article>
            )
          )}
        </section>

        {/* =================================================
            PRIORITIES
        ================================================= */}

        <section className="execution-section">
          <div className="execution-section-heading">
            <div>
              <div className="execution-section-kicker">
                COMPANY PRIORITIES
              </div>

              <h2>
                Is the company moving where we
                said it would?
              </h2>
            </div>

            <span className="execution-section-count">
              {objectivePortfolio.length} strategic
              priorities
            </span>
          </div>

          <div className="objective-grid">
            {objectivePortfolio.map(
              ({
                objective,
                initiatives,
                riskCount,
                averageProgress,
              }) => (
                <article
                  className={`objective-card objective-${objective.health}`}
                  key={objective.id}
                >
                  <div className="objective-top">
                    <div className="objective-status">
                      <span
                        className={`execution-health-dot ${objective.health}`}
                      />

                      {formatStatus(
                        objective.health
                      )}
                    </div>

                    <span className="objective-period">
                      {objective.period}
                    </span>
                  </div>

                  <h3>{objective.title}</h3>

                  <p>
                    {objective.description}
                  </p>

                  {objective.current !==
                    undefined &&
                    objective.target !==
                      undefined && (
                      <div className="objective-number-row">
                        <div>
                          <span>Current</span>
                          <strong>
                            {formatObjectiveValue(
                              objective.current,
                              objective.unit
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>Target</span>
                          <strong>
                            {formatObjectiveValue(
                              objective.target,
                              objective.unit
                            )}
                          </strong>
                        </div>
                      </div>
                    )}

                  <div className="objective-progress">
                    <div className="objective-progress-meta">
                      <span>
                        {initiatives.length}{" "}
                        initiatives
                      </span>

                      <span>
                        {riskCount > 0
                          ? `${riskCount} at risk`
                          : "No critical risk"}
                      </span>
                    </div>

                    <div className="execution-progress-track">
                      <div
                        className="execution-progress-fill"
                        style={{
                          width: `${averageProgress}%`,
                        }}
                      />
                    </div>

                    <div className="objective-progress-value">
                      {averageProgress}% moving
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* =================================================
            EXECUTION QUEUE
        ================================================= */}

        <section className="execution-section">
          <div className="execution-section-heading">
            <div>
              <div className="execution-section-kicker">
                EXECUTION QUEUE
              </div>

              <h2>
                What deserves attention now?
              </h2>
            </div>

            <span className="execution-section-count">
              Ranked by urgency + impact
            </span>
          </div>

          <div className="execution-queue">
            {visibleQueue.map(
              (initiative, index) => (
                <article
                  className="execution-row"
                  key={initiative.id}
                >
                  <div className="execution-rank">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div className="execution-row-main">
                    <div className="execution-row-meta">
                      <span
                        className={`execution-health-pill ${initiative.health}`}
                      >
                        {formatStatus(
                          initiative.health
                        )}
                      </span>

                      <span>
                        {initiative.owner.function}
                      </span>

                      <span>
                        Due {initiative.deadline}
                      </span>

                      {initiative.brainOrigin && (
                        <span className="brain-origin-label">
                          <Brain size={12} />
                          Brain-originated
                        </span>
                      )}
                    </div>

                    <h3>
                      {initiative.title}
                    </h3>

                    <p>
                      {initiative.description}
                    </p>

                    <div className="execution-next-action">
                      <span>Next</span>
                      {initiative.nextAction}
                    </div>

                    <div className="execution-row-progress">
                      <div className="execution-progress-track">
                        <div
                          className="execution-progress-fill"
                          style={{
                            width: `${initiative.progress}%`,
                          }}
                        />
                      </div>

                      <span>
                        {initiative.progress}%
                      </span>
                    </div>
                  </div>

                  <div className="execution-row-side">
                    {initiative.impact && (
                      <div className="execution-impact">
                        <span>
                          {
                            initiative.impact
                              .label
                          }
                        </span>

                        <strong>
                          {formatImpact(
                            initiative.impact
                              .value,
                            initiative.impact
                              .unit
                          ) ?? "Being quantified"}
                        </strong>
                      </div>
                    )}

                    <div className="execution-owner">
                      <UserRound size={14} />

                      <span>
                        {initiative.owner.name}
                      </span>
                    </div>

                    {initiative.blocker && (
                      <div className="execution-blocker">
                        <AlertTriangle
                          size={14}
                        />
                        {initiative.blocker}
                      </div>
                    )}

                    <AskBrainButton
                      question={`Why is ${initiative.title} ${initiative.health === "good" ? "important" : "at risk"}?`}
                      autoSubmit
                      className="execution-row-brain"
                    >
                      Ask Brain
                      <ChevronRight size={14} />
                    </AskBrainButton>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* =================================================
            COMMITMENTS + DECISIONS
        ================================================= */}

        <section className="execution-bottom-grid">
          <div className="execution-section execution-bottom-section">
            <div className="execution-section-heading compact">
              <div>
                <div className="execution-section-kicker">
                  COMMITMENTS
                </div>

                <h2>
                  What did we promise?
                </h2>
              </div>

              <span className="execution-section-count">
                {summary.openCommitments} open
              </span>
            </div>

            <div className="commitment-list">
              {visibleCommitments.map(
                (commitment) => (
                  <article
                    className="commitment-item"
                    key={commitment.id}
                  >
                    <div
                      className={`commitment-status-icon ${commitment.status}`}
                    >
                      {commitment.status ===
                      "overdue" ? (
                        <AlertTriangle
                          size={15}
                        />
                      ) : commitment.status ===
                        "complete" ? (
                        <CheckCircle2
                          size={15}
                        />
                      ) : (
                        <Clock3 size={15} />
                      )}
                    </div>

                    <div className="commitment-copy">
                      <div className="commitment-owner">
                        {commitment.owner.name}
                        <span>
                          {
                            commitment.owner
                              .function
                          }
                        </span>
                      </div>

                      <p>
                        {commitment.statement}
                      </p>

                      <div className="commitment-footer">
                        <span>
                          Due{" "}
                          {commitment.dueDate}
                        </span>

                        <span
                          className={`commitment-state ${commitment.status}`}
                        >
                          {formatStatus(
                            commitment.status
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>

          <div className="execution-section execution-bottom-section">
            <div className="execution-section-heading compact">
              <div>
                <div className="execution-section-kicker">
                  DECISION TRAIL
                </div>

                <h2>
                  What requires judgment?
                </h2>
              </div>
            </div>

            {decisionControl.waitingOnMD.map(
              (decision) => (
                <article
                  className="decision-trail-card"
                  key={decision.id}
                >
                  <div className="decision-trail-top">
                    <div className="decision-trail-icon">
                      <Target size={17} />
                    </div>

                    <span>
                      {formatStatus(
                        decision.status
                      )}
                    </span>
                  </div>

                  <h3>{decision.title}</h3>

                  <p>{decision.question}</p>

                  <div className="decision-trail-links">
                    <div>
                      <Link2 size={13} />
                      {
                        decision
                          .linkedInitiativeIds
                          .length
                      }{" "}
                      linked initiatives
                    </div>

                    {decision.impact && (
                      <div>
                        <IndianRupee
                          size={13}
                        />
                        {
                          decision.impact
                            .label
                        }
                      </div>
                    )}
                  </div>

                  <AskBrainButton
                    question={`What evidence should I consider before deciding on ${decision.title}?`}
                    autoSubmit
                    className="decision-trail-button"
                  >
                    Open decision context
                    <ArrowRight size={14} />
                  </AskBrainButton>
                </article>
              )
            )}

            <div className="execution-memory-note">
              <Brain size={17} />

              <div>
                <strong>
                  Decisions become memory.
                </strong>

                <p>
                  Once resolved, the rationale,
                  assumptions and outcome stay
                  connected to the initiatives they
                  affected.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}