"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Loader2,
  Search,
  Sparkles,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Confidence =
  | "high"
  | "medium"
  | "low";

interface BrainDriver {
  rank?: number;
  title: string;
  explanation?: string;
  impact?: string;
  health?: "good" | "watch" | "risk";
  entityIds?: string[];
}

interface BrainEvidence {
  id: string;
  type: string;
  label: string;
  value?: string;
  detail?: string;
  entityId?: string;
  provenance?: string;
}

interface BrainRecommendation {
  id: string;
  title: string;
  rationale?: string;
  owner?: string;
  expectedImpact?: string;
  actionType?: string;
}

interface BrainResponse {
  status?: string;
  query: string;
  intent?: string;

  subject?: {
    id: string;
    name: string;
    type: string;
  };

  answer: string;
  summary?: string;
  confidence?: Confidence;

  drivers?: BrainDriver[];
  evidence?: BrainEvidence[];
  recommendations?: BrainRecommendation[];

  generatedBy?: string;
}

interface BrainExecutionPreview {
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

interface BrainActionState {
  loading: boolean;
  preview?: BrainExecutionPreview;
  error?: string;
}
interface ConversationTurn {
  id: number;
  query: string;
  response?: BrainResponse;
  error?: string;
}

/* =========================================================
   HELPERS
========================================================= */

const defaultSuggestions = [
  "Why is Bihar behind plan?",
  "What needs my attention?",
  "Why should I care about soymeal?",
];

function confidenceLabel(
  confidence?: Confidence
) {
  if (!confidence) {
    return "Evidence checked";
  }

  if (confidence === "high") {
    return "High confidence";
  }

  if (confidence === "medium") {
    return "Medium confidence";
  }

  return "Low confidence";
}

function getFollowUps(
  response: BrainResponse
) {
  const subject =
    response.subject?.name;

  if (
    response.intent === "attention"
  ) {
    return [
      "Which one needs me first?",
      "What can move without me?",
    ];
  }

  if (
    subject
      ?.toLowerCase()
      .includes("bihar")
  ) {
    return [
      "What should we do about Bihar?",
      "Show me the Patna problem.",
    ];
  }

  if (
    subject
      ?.toLowerCase()
      .includes("soymeal")
  ) {
    return [
      "What is the ₹ impact?",
      "What should Supply Chain do next?",
    ];
  }

  if (
    subject
      ?.toLowerCase()
      .includes("amethi")
  ) {
    return [
      "What is off plan at Amethi?",
      "What is connected to Amethi?",
    ];
  }

  if (
    response.confidence === "low"
  ) {
    return [
      "What needs my attention?",
      "Why is Bihar behind plan?",
    ];
  }

  return [
    "What is driving this?",
    "What should we do next?",
  ];
}

/* =========================================================
   COMPONENT
========================================================= */


function getBrainPageContext(pathname: string) {
  switch (pathname) {
    case "/company":
      return {
        page: "company",
        label: "Company \u00B7 Operating View",
      };

    case "/intelligence":
      return {
        page: "intelligence",
        label: "Intelligence \u00B7 Company Signals",
      };

    case "/execution":
      return {
        page: "execution",
        label: "Execution \u00B7 Commitments & Initiatives",
      };

    case "/studio":
      return {
        page: "studio",
        label: "Studio \u00B7 Thinking Space",
      };

    default:
      return {
        page: "today",
        label: "Today \u00B7 MD's Office",
      };
  }
}
export default function SecondBrainAssistant() {
  const [open, setOpen] =
    useState(false);

  const [query, setQuery] =
    useState("");

  const [turns, setTurns] =
    useState<ConversationTurn[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [showEvidenceFor, setShowEvidenceFor] =
    useState<number | null>(null);

  const [actions, setActions] = useState<
    Record<string, BrainActionState>
  >({});

  const bodyRef =
    useRef<HTMLDivElement | null>(null);
    const latestTurnRef =
  useRef<HTMLDivElement | null>(null);

  /* -------------------------------------------------------
     Keep latest answer visible
  ------------------------------------------------------- */
useEffect(() => {
  if (!latestTurnRef.current) {
    return;
  }

  latestTurnRef.current.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}, [turns.length]);
  /* -------------------------------------------------------
   Allow the rest of Gyandhara One to summon the Brain
------------------------------------------------------- */

useEffect(() => {
  function handleOpenSecondBrain(
    event: Event
  ) {
    const customEvent =
      event as CustomEvent<{
        question?: string;
        autoSubmit?: boolean;
      }>;

    const question =
      customEvent.detail?.question?.trim() ??
      "";

    const autoSubmit =
      customEvent.detail?.autoSubmit ??
      false;

    setOpen(true);

    if (!question) {
      return;
    }

    if (autoSubmit) {
      void askBrain(question);
      return;
    }

    setQuery(question);
  }

  window.addEventListener(
    "gyandhara:open-second-brain",
    handleOpenSecondBrain
  );

  return () => {
    window.removeEventListener(
      "gyandhara:open-second-brain",
      handleOpenSecondBrain
    );
  };
}, []);

  /* -------------------------------------------------------
     Ask Brain
  ------------------------------------------------------- */

  async function askBrain(
    question?: string
  ) {
    const finalQuery =
      (question ?? query).trim();

    if (
      !finalQuery ||
      loading
    ) {
      return;
    }

    setOpen(true);
    setQuery("");
    setLoading(true);

    const turnId = Date.now();

    setTurns((current) => [
      ...current,
      {
        id: turnId,
        query: finalQuery,
      },
    ]);

    try {
      const response =
        await fetch(
          "/api/brain/query",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              query: finalQuery,

              context: {
                page: getBrainPageContext(
                  window.location.pathname
                ).page,
              },
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ??
            "The Brain could not complete this query."
        );
      }

      setTurns((current) =>
        current.map((turn) =>
          turn.id === turnId
            ? {
                ...turn,
                response:
                  data as BrainResponse,
              }
            : turn
        )
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "The Brain could not complete this query.";

      setTurns((current) =>
        current.map((turn) =>
          turn.id === turnId
            ? {
                ...turn,
                error: message,
              }
            : turn
        )
      );
    } finally {
      setLoading(false);
    }
  }

  async function executeRecommendation(
    recommendation: BrainRecommendation,
    turn: ConversationTurn
  ) {
    setActions((current) => ({
      ...current,

      [recommendation.id]: {
        loading: true,
      },
    }));

    try {
      const response = await fetch(
        "/api/brain/action",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            recommendationId:
              recommendation.id,

            title:
              recommendation.title,

            rationale:
              recommendation.rationale,

            owner:
              recommendation.owner,

            expectedImpact:
              recommendation.expectedImpact,

            actionType:
              recommendation.actionType,

            context: {
              query:
                turn.query,

              subjectId:
                turn.response?.subject?.id,

              subjectName:
                turn.response?.subject?.name,
            },
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ??
            "Action could not be resolved."
        );
      }

      setActions((current) => ({
        ...current,

        [recommendation.id]: {
          loading: false,

          preview:
            data.preview as BrainExecutionPreview,
        },
      }));
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "I couldn't connect this recommendation to execution.";

      setActions((current) => ({
        ...current,

        [recommendation.id]: {
          loading: false,
          error: message,
        },
      }));
    }
  }

  function submitQuery(
    event: FormEvent
  ) {
    event.preventDefault();
    void askBrain();
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div
      className={`assistant-shell ${
        open
          ? "assistant-open"
          : ""
      }`}
    >
      {open && (
        <section className="assistant-panel">
          {/* HEADER */}

          <div className="assistant-header">
            <div className="assistant-identity">
              <div className="assistant-logo">
                <Brain size={18} />
              </div>

              <div>
                <div className="assistant-name">
                  Second Brain
                </div>

                <div className="assistant-status">
                  <span className="online-dot" />

                  Gyandhara context loaded
                </div>
              </div>
            </div>

            <button
              className="assistant-close"
              onClick={() =>
                setOpen(false)
              }
              aria-label="Close Second Brain"
            >
              <X size={17} />
            </button>
          </div>

          {/* CONTEXT */}

          <div className="assistant-context">
            <div>
              <span className="assistant-context-label">
                CURRENT CONTEXT
              </span>

              <strong>
                {typeof window !== "undefined"
                  ? getBrainPageContext(
                      window.location.pathname
                    ).label
                  : "Today \u00B7 MD's Office"}
              </strong>
            </div>

            <ChevronDown size={15} />
          </div>

          {/* BODY */}

          <div
            className="assistant-body"
            ref={bodyRef}
          >
            {turns.length === 0 ? (
              <>
                <div className="assistant-greeting">
                  <Sparkles size={17} />

                  <div>
                    <strong>
                      What do you want to
                      understand?
                    </strong>

                    <p>
                      Ask a question. I&apos;ll
                      trace the company before
                      answering.
                    </p>
                  </div>
                </div>

                <div className="assistant-suggestions">
                  {defaultSuggestions.map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() =>
                          void askBrain(
                            suggestion
                          )
                        }
                      >
                        {suggestion}
                      </button>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="brain-conversation">
                {turns.map(
                  (
                    turn,
                    turnIndex
                  ) => {
                    const response =
                      turn.response;

                    const evidence =
                      response?.evidence ??
                      [];

                    const drivers =
                      response?.drivers ??
                      [];

                    const recommendations =
                      response?.recommendations ??
                      [];

                    const followUps =
                      response
                        ? getFollowUps(
                            response
                          )
                        : [];

                    return (
                      <div
  className="brain-turn"
  key={turn.id}
  ref={
    turnIndex === turns.length - 1
      ? latestTurnRef
      : undefined
  }
>
                        {/* USER */}

                        <div className="brain-user-query">
                          <span>
                            You asked
                          </span>

                          <strong>
                            {turn.query}
                          </strong>
                        </div>

                        {/* ERROR */}

                        {turn.error && (
                          <div className="brain-error">
                            <CircleAlert
                              size={16}
                            />

                            <span>
                              {turn.error}
                            </span>
                          </div>
                        )}

                        {/* RESPONSE */}

                        {response && (
                          <div className="brain-answer">
                            <div className="brain-answer-meta">
                              <div className="brain-answer-source">
                                <Brain
                                  size={15}
                                />

                                Second Brain
                              </div>

                              <span
                                className={`brain-confidence brain-confidence-${
                                  response.confidence ??
                                  "high"
                                }`}
                              >
                                {confidenceLabel(
                                  response.confidence
                                )}
                              </span>
                            </div>

                            <div className="brain-answer-primary">
                              {
                                response.answer
                              }
                            </div>

                            {response.summary &&
                              response.summary !==
                                response.answer && (
                                <p className="brain-answer-summary">
                                  {
                                    response.summary
                                  }
                                </p>
                              )}

                            {/* DRIVERS */}

                            {drivers.length >
                              0 && (
                              <div className="brain-section">
                                <div className="brain-section-label">
                                  WHAT&apos;S
                                  DRIVING IT
                                </div>

                                <div className="brain-driver-list">
                                  {drivers
                                    .slice(
                                      0,
                                      3
                                    )
                                    .map(
                                      (
                                        driver,
                                        index
                                      ) => (
                                        <div
                                          className="brain-driver"
                                          key={`${turn.id}-driver-${index}`}
                                        >
                                          <div
                                            className={`brain-driver-rank ${
                                              driver.health ===
                                              "risk"
                                                ? "brain-driver-risk"
                                                : ""
                                            }`}
                                          >
                                            {index +
                                              1}
                                          </div>

                                          <div className="brain-driver-copy">
                                            <strong>
                                              {
                                                driver.title
                                              }
                                            </strong>

                                            {driver.explanation && (
                                              <p>
                                                {
                                                  driver.explanation
                                                }
                                              </p>
                                            )}

                                            {driver.impact && (
                                              <span className="brain-impact">
                                                {
                                                  driver.impact
                                                }
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            )}

                            {/* RECOMMENDATIONS */}

                            {recommendations.length >
                              0 && (
                              <div className="brain-section">
                                <div className="brain-section-label">
                                  WHAT I&apos;D
                                  LOOK AT NEXT
                                </div>

                                <div className="brain-recommendation-list">
                                  {recommendations
                                    .slice(
                                      0,
                                      3
                                    )
                                    .map(
                                      (
                                        recommendation,
                                        index
                                      ) => (
                                        <div
                                          className="brain-recommendation"
                                          key={
                                            recommendation.id ??
                                            `${turn.id}-recommendation-${index}`
                                          }
                                        >
                                          <CheckCircle2
                                            size={
                                              16
                                            }
                                          />

                                          <div>
                                            <strong>
                                              {
                                                recommendation.title
                                              }
                                            </strong>

                                            {recommendation.rationale && (
                                              <p>
                                                {
                                                  recommendation.rationale
                                                }
                                              </p>
                                            )}

                                            {(recommendation.owner ||
                                              recommendation.expectedImpact) && (
                                              <div className="brain-recommendation-meta">
                                                {recommendation.owner && (
                                                  <span>
                                                    Owner{" "}
                                                    <b>
                                                      {
                                                        recommendation.owner
                                                      }
                                                    </b>
                                                  </span>
                                                )}

                                                {recommendation.expectedImpact && (
                                                  <span>
                                                    {
                                                      recommendation.expectedImpact
                                                    }
                                                  </span>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    )}
                                </div>
                              </div>
                            )}

                            {/* EVIDENCE */}

                            {evidence.length >
                              0 && (
                              <div className="brain-evidence-wrap">
                                <button
                                  className="brain-evidence-toggle"
                                  onClick={() =>
                                    setShowEvidenceFor(
                                      showEvidenceFor ===
                                        turn.id
                                        ? null
                                        : turn.id
                                    )
                                  }
                                >
                                  <span>
                                    {evidence.length}{" "}
                                    evidence
                                    {evidence.length ===
                                    1
                                      ? " item"
                                      : " items"}
                                  </span>

                                  <ChevronRight
                                    size={
                                      15
                                    }
                                    className={
                                      showEvidenceFor ===
                                      turn.id
                                        ? "brain-chevron-open"
                                        : ""
                                    }
                                  />
                                </button>

                                {showEvidenceFor ===
                                  turn.id && (
                                  <div className="brain-evidence-list">
                                    {evidence.map(
                                      (
                                        item,
                                        index
                                      ) => (
                                        <div
                                          className="brain-evidence-item"
                                          key={`${item.id}-${index}`}
                                        >
                                          <div>
                                            <strong>
                                              {
                                                item.label
                                              }
                                            </strong>

                                            {item.detail && (
                                              <p>
                                                {
                                                  item.detail
                                                }
                                              </p>
                                            )}
                                          </div>

                                          <div className="brain-evidence-side">
                                            {item.value && (
                                              <strong>
                                                {
                                                  item.value
                                                }
                                              </strong>
                                            )}

                                            {item.provenance && (
                                              <span>
                                                {
                                                  item.provenance
                                                }
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* FOLLOW UPS */}

                            {turnIndex ===
                              turns.length -
                                1 &&
                              followUps.length >
                                0 && (
                                <div className="brain-followups">
                                  <span>
                                    KEEP GOING
                                  </span>

                                  {followUps.map(
                                    (
                                      followUp
                                    ) => (
                                      <button
                                        key={
                                          followUp
                                        }
                                        onClick={() =>
                                          void askBrain(
                                            followUp
                                          )
                                        }
                                      >
                                        {
                                          followUp
                                        }

                                        <ArrowRight
                                          size={
                                            13
                                          }
                                        />
                                      </button>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}

                {loading && (
                  <div className="brain-thinking">
                    <Loader2
                      size={16}
                      className="brain-spinner"
                    />

                    <div>
                      <strong>
                        Tracing Gyandhara
                      </strong>

                      <span>
                        Checking signals,
                        relationships and
                        decisions…
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* INPUT */}

          <form
            className="assistant-input-wrap"
            onSubmit={submitQuery}
          >
            <Search size={17} />

            <input
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Ask Gyandhara anything..."
              disabled={loading}
            />

            <button
              type="submit"
              className="assistant-submit"
              aria-label="Ask"
              disabled={
                loading ||
                !query.trim()
              }
            >
              {loading ? (
                <Loader2
                  size={17}
                  className="brain-spinner"
                />
              ) : (
                <ArrowRight
                  size={17}
                />
              )}
            </button>
          </form>

          <div className="assistant-modes">
            Search · Analyse · Think · Research · Act
          </div>
        </section>
      )}

      {/* FLOATING TRIGGER */}

      <button
        className="assistant-trigger"
        onClick={() =>
          setOpen(
            (current) =>
              !current
          )
        }
        aria-label={
          open
            ? "Close Second Brain"
            : "Open Second Brain"
        }
      >
        {open ? (
          <X size={21} />
        ) : (
          <>
            <Brain size={22} />
            <span className="assistant-trigger-dot" />
          </>
        )}
      </button>
    </div>
  );
}