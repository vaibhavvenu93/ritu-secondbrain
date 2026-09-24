"use client";

import {
  ArrowRight,
  Brain,
  Building2,
  Clock3,
  History,
  Lightbulb,
  Radar,
  Search,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import AppShell from "@/components/app-shell";

import {
  intelligenceSignals,
  mdMemories,
  opportunities,
} from "@/data/intelligence-data";

function askBrain(question: string) {
  window.dispatchEvent(
    new CustomEvent("gyandhara:open-second-brain", {
      detail: {
        question,
        autoSubmit: true,
      },
    })
  );
}

function signalIcon(category: string) {
  if (category === "Procurement") {
    return TrendingUp;
  }

  if (category === "Commercial") {
    return TrendingDown;
  }

  if (category === "Operations") {
    return Building2;
  }

  return Sparkles;
}

function provenanceLabel(value: string) {
  if (value === "derived") {
    return "DERIVED";
  }

  if (value === "public") {
    return "PUBLIC";
  }

  return "ILLUSTRATIVE";
}

export default function IntelligencePage() {
  return (
    <AppShell active="intelligence" context="INTELLIGENCE">
      <div className="intelligence-page">

        <section className="intelligence-hero">
          <div>
            <div className="intelligence-kicker">
              <Radar size={13} />
              COMPANY INTELLIGENCE
            </div>

            <h1>
              What changed that
              <br />
              matters to Gyandhara?
            </h1>

            <p>
              Not more information. The few signals,
              opportunities and old decisions that should
              change what the company does next.
            </p>
          </div>

          <button
            type="button"
            className="intelligence-ask"
            onClick={() =>
              askBrain(
                "What changed that matters to Gyandhara?"
              )
            }
          >
            <Brain size={16} />
            Ask Second Brain
          </button>
        </section>

        <section className="intelligence-summary">
          <div>
            <span>Signals worth attention</span>
            <strong>{intelligenceSignals.length}</strong>
            <small>Across the operating model</small>
          </div>

          <div>
            <span>Opportunities surfaced</span>
            <strong>{opportunities.length}</strong>
            <small>Recover · protect · grow · learn</small>
          </div>

          <div>
            <span>Largest modelled exposure</span>
            <strong>₹92L</strong>
            <small>Soymeal cost pressure</small>
          </div>

          <div>
            <span>Memory available</span>
            <strong>{mdMemories.length}</strong>
            <small>Illustrative decision records</small>
          </div>
        </section>

        <section className="intelligence-section">
          <div className="intelligence-section-head">
            <div>
              <span>RADAR</span>

              <h2>
                Signals worth understanding
              </h2>
            </div>

            <p>
              Every signal must answer:{" "}
              <b>why should Gyandhara care?</b>
            </p>
          </div>

          <div className="signal-grid">
            {intelligenceSignals.map((signal) => {
              const Icon = signalIcon(
                signal.category
              );

              return (
                <article
                  className="signal-card"
                  key={signal.id}
                >
                  <div className="signal-card-top">
                    <div className="signal-icon">
                      <Icon size={16} />
                    </div>

                    <div className="signal-badges">
                      <span>
                        {signal.category.toUpperCase()}
                      </span>

                      <b>{signal.action}</b>
                    </div>
                  </div>

                  <h3>{signal.title}</h3>

                  <p>{signal.summary}</p>

                  <div className="signal-why">
                    <span>WHY IT MATTERS</span>

                    {signal.whyItMatters}
                  </div>

                  <div className="signal-impact">
                    <div>
                      <strong>
                        {signal.impact}
                      </strong>

                      <span>
                        {signal.impactLabel}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        askBrain(
                          signal.question
                        )
                      }
                    >
                      Investigate
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="signal-source">
                    <span>
                      Company Brain · {signal.source}
                    </span>

                    <b>
                      {provenanceLabel(
                        signal.provenance
                      )}
                    </b>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="opportunity-panel">
          <div className="opportunity-intro">
            <div className="intelligence-kicker">
              <Lightbulb size={13} />
              OPPORTUNITY HUNTER
            </div>

            <h2>
              Where could Gyandhara
              make or save money?
            </h2>

            <p>
              Second Brain turns operating signals into
              questions worth investigating. It does not
              silently approve actions.
            </p>

            <button
              type="button"
              onClick={() =>
                askBrain(
                  "Where can Gyandhara make or save money right now?"
                )
              }
            >
              Ask for opportunities
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="opportunity-list">
            {opportunities.map(
              (opportunity, index) => (
                <article
                  className="opportunity-row"
                  key={opportunity.id}
                >
                  <div className="opportunity-rank">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </div>

                  <div className="opportunity-main">
                    <div className="opportunity-meta">
                      <span>
                        {opportunity.mode}
                      </span>

                      <b>
                        {opportunity.confidence.toUpperCase()}{" "}
                        CONFIDENCE
                      </b>
                    </div>

                    <h3>
                      {opportunity.title}
                    </h3>

                    <p>
                      {opportunity.description}
                    </p>

                    <small>
                      {opportunity.owner}
                    </small>
                  </div>

                  <div className="opportunity-value">
                    <strong>
                      {opportunity.value}
                    </strong>

                    <span>
                      {opportunity.valueLabel}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        askBrain(
                          opportunity.question
                        )
                      }
                    >
                      Explore
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        <section className="memory-section">
          <div className="memory-heading">
            <div>
              <div className="intelligence-kicker">
                <History size={13} />
                MD MEMORY
              </div>

              <h2>
                The company remembers why.
              </h2>

              <p>
                Decisions become more useful when the
                assumptions, trade-offs and conditions
                for reconsidering them survive the
                meeting.
              </p>
            </div>

            <button
              type="button"
              className="memory-search"
              onClick={() =>
                askBrain(
                  "What important past decisions should I remember?"
                )
              }
            >
              <Search size={14} />
              Search memory
            </button>
          </div>

          <div className="memory-timeline">
            {mdMemories.map((memory) => (
              <article
                className="memory-card"
                key={memory.id}
              >
                <div className="memory-rail">
                  <div className="memory-dot" />
                  <div className="memory-line" />
                </div>

                <div className="memory-content">
                  <div className="memory-meta">
                    <span>
                      <Clock3 size={12} />
                      {memory.date}
                    </span>

                    <b>{memory.type}</b>

                    <em>
                      {provenanceLabel(
                        memory.provenance
                      )}
                    </em>
                  </div>

                  <h3>{memory.title}</h3>

                  <div className="memory-decision">
                    <span>DECISION</span>

                    <strong>
                      {memory.decision}
                    </strong>
                  </div>

                  <p>{memory.rationale}</p>

                  <div className="memory-detail-grid">
                    <div>
                      <span>ASSUMPTIONS</span>

                      <ul>
                        {memory.assumptions.map(
                          (assumption) => (
                            <li key={assumption}>
                              {assumption}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <span>
                        RECONSIDER WHEN
                      </span>

                      <p>
                        {memory.reconsiderWhen}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      askBrain(
                        memory.question
                      )
                    }
                  >
                    Ask why
                    <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="intelligence-principle">
          <Brain size={19} />

          <div>
            <strong>
              Observe → understand → think → act → remember.
            </strong>

            <p>
              Intelligence tells Gyandhara what changed.
              Second Brain explains why it matters.
              Execution records what the company does.
              Memory preserves what it learns.
            </p>
          </div>
        </section>

      </div>
    </AppShell>
  );
}