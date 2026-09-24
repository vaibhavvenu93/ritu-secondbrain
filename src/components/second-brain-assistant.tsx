"use client";

import { useState } from "react";
import {
  ArrowRight,
  Brain,
  ChevronDown,
  Search,
  Sparkles,
  X,
} from "lucide-react";

export default function SecondBrainAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className={`assistant-shell ${open ? "assistant-open" : ""}`}>
      {open && (
        <section className="assistant-panel">
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
              onClick={() => setOpen(false)}
              aria-label="Close Second Brain"
            >
              <X size={17} />
            </button>
          </div>

          <div className="assistant-context">
            <div>
              <span className="assistant-context-label">
                CURRENT CONTEXT
              </span>

              <strong>Today · MD&apos;s Office</strong>
            </div>

            <ChevronDown size={15} />
          </div>

          <div className="assistant-body">
            <div className="assistant-greeting">
              <Sparkles size={17} />

              <div>
                <strong>
                  What do you want to understand?
                </strong>

                <p>
                  I can trace numbers, decisions,
                  commitments and dependencies across
                  Gyandhara.
                </p>
              </div>
            </div>

            <div className="assistant-suggestions">
              <button
                onClick={() =>
                  setQuery("Why is EBITDA below plan?")
                }
              >
                Why is EBITDA below plan?
              </button>

              <button
                onClick={() =>
                  setQuery(
                    "What needs my attention in Bihar?"
                  )
                }
              >
                What needs my attention in Bihar?
              </button>

              <button
                onClick={() =>
                  setQuery(
                    "Where are we losing margin?"
                  )
                }
              >
                Where are we losing margin?
              </button>
            </div>
          </div>

          <div className="assistant-input-wrap">
            <Search size={17} />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Ask Gyandhara anything..."
            />

            <button
              className="assistant-submit"
              aria-label="Ask"
            >
              <ArrowRight size={17} />
            </button>
          </div>

          <div className="assistant-modes">
            Search · Analyse · Think · Research · Act
          </div>
        </section>
      )}

      <button
        className="assistant-trigger"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open Second Brain"
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