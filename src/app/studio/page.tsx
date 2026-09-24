"use client";

import { useState } from "react";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  FlaskConical,
  Lightbulb,
  MessageSquareText,
  Plus,
  Search,
  ShieldQuestion,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import AppShell from "@/components/app-shell";

const thoughts = [
  {
    eyebrow: "STRATEGY",
    status: "PRIVATE",
    title: "Should we enter Rajasthan?",
    description:
      "Understand market attractiveness, distribution requirements and what would need to be true for entry to make sense.",
    context: ["Market", "Distribution", "Economics"],
    updated: "Thinking",
    icon: Target,
  },
  {
    eyebrow: "GROWTH",
    status: "WORKING",
    title: "Can Diamond Pro become a ₹100Cr product?",
    description:
      "Model the route through geography, farmer segments, distribution depth and production capacity.",
    context: ["Diamond Pro", "Commercial", "Capacity"],
    updated: "Exploring",
    icon: BarChart3,
  },
  {
    eyebrow: "ECONOMICS",
    status: "SCENARIO",
    title: "What would it take to reach 15% EBITDA?",
    description:
      "Find the combination of procurement, product mix, plant utilisation and commercial changes required.",
    context: ["Finance", "Procurement", "Plants"],
    updated: "Modelling",
    icon: BriefcaseBusiness,
  },
  {
    eyebrow: "FARMER",
    status: "RESEARCH",
    title: "How do we make Manthan measurable?",
    description:
      "Connect farmer education to trial, repeat purchase, animal outcomes and farmer economics.",
    context: ["Manthan", "Farmers", "Repeat"],
    updated: "Researching",
    icon: Users,
  },
];

const templates = [
  {
    title: "I have an idea",
    description:
      "Turn a rough thought into a hypothesis, questions, evidence and next steps.",
    icon: Lightbulb,
    prompt: "I have an idea. Help me think it through.",
  },
  {
    title: "Challenge my thinking",
    description:
      "Find weak assumptions, reasons this could fail and the cheapest way to learn.",
    icon: ShieldQuestion,
    prompt: "Challenge this idea. Tell me what I might be missing.",
  },
  {
    title: "Build a business case",
    description:
      "Structure the opportunity, economics, investment, risks and recommendation.",
    icon: BriefcaseBusiness,
    prompt: "Help me build a business case.",
  },
  {
    title: "Research a market",
    description:
      "Explore customers, competitors, regulation, economics and entry options.",
    icon: Search,
    prompt: "Research a market opportunity for Gyandhara.",
  },
  {
    title: "Run a scenario",
    description:
      "Change assumptions and understand what moves across the company.",
    icon: FlaskConical,
    prompt: "I want to run a scenario.",
  },
  {
    title: "Prepare a decision",
    description:
      "Bring together context, evidence, options, trade-offs and a recommendation.",
    icon: CircleHelp,
    prompt: "Prepare a decision for me.",
  },
  {
    title: "Plan an initiative",
    description:
      "Turn an approved idea into ownership, milestones, dependencies and outcomes.",
    icon: Target,
    prompt: "Turn this into an initiative.",
  },
  {
    title: "Meeting room",
    description:
      "Think with a person or team and capture decisions, questions and commitments.",
    icon: MessageSquareText,
    prompt: "Help me prepare a working session.",
  },
];

const companyContext = [
  "Bihar",
  "Diamond Pro",
  "Amethi Plant",
  "Finance",
  "Kushendra",
  "Manthan",
];

const lifecycle = [
  "Thought",
  "Explore",
  "Research",
  "Business case",
  "Decision",
  "Initiative",
  "Execution",
  "Result",
  "Learning",
];

export default function StudioPage() {
  const [draft, setDraft] = useState("");
  const [selectedContext, setSelectedContext] =
    useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<string | null>(null);

  function toggleContext(item: string) {
    setSelectedContext((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    );
  }

  function useTemplate(
    title: string,
    prompt: string
  ) {
    setSelectedTemplate(title);
    setDraft(prompt);

    window.setTimeout(() => {
      document
        .getElementById("studio-thought-input")
        ?.focus();
    }, 0);
  }

  function openBrain() {
    const question =
      draft.trim() ||
      "Help me think through a new idea for Gyandhara.";

    window.dispatchEvent(
      new CustomEvent(
        "gyandhara:open-second-brain",
        {
          detail: {
            question,
            autoSubmit: false,
          },
        }
      )
    );
  }

  return (
    <AppShell
      active="studio"
      context="STUDIO"
    >
      <div className="studio-page">
        <section className="studio-hero">
          <div className="studio-hero-copy">
            <div className="studio-kicker">
              <Sparkles size={13} />
              PRIVATE WORKSPACE
            </div>

            <h1>
              Think here.
              <br />
              We&apos;ll figure out the rest.
            </h1>

            <p>
              Your space for ideas, questions,
              research and decisions. Nothing moves
              into the company until you say so.
            </p>
          </div>

          <div className="studio-private-note">
            <div className="studio-private-icon">
              <Brain size={17} />
            </div>

            <div>
              <strong>
                Ritu&apos;s private space
              </strong>

              <span>
                Second Brain can bring company
                context into your thinking without
                turning every thought into work.
              </span>
            </div>
          </div>
        </section>

        <section className="studio-composer">
          <div className="studio-composer-label">
            WHAT ARE YOU THINKING ABOUT?
          </div>

          <textarea
            id="studio-thought-input"
            value={draft}
            onChange={(event) =>
              setDraft(event.target.value)
            }
            placeholder="Start with an idea, question, problem or possibility..."
          />

          {selectedContext.length > 0 && (
            <div className="studio-selected-context">
              <span>Thinking with</span>

              {selectedContext.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    toggleContext(item)
                  }
                >
                  {item}
                  <span>×</span>
                </button>
              ))}
            </div>
          )}

          <div className="studio-composer-footer">
            <div className="studio-mode-row">
              <button
                type="button"
                onClick={() =>
                  setDraft(
                    "I have an idea. Help me explore what would need to be true for it to work."
                  )
                }
              >
                <Lightbulb size={14} />
                Explore an idea
              </button>

              <button
                type="button"
                onClick={() =>
                  setDraft(
                    "Research this for Gyandhara and tell me what matters."
                  )
                }
              >
                <Search size={14} />
                Research something
              </button>

              <button
                type="button"
                onClick={() =>
                  setDraft(
                    "Help me turn this into a practical plan."
                  )
                }
              >
                <Target size={14} />
                Build a plan
              </button>

              <button
                type="button"
                onClick={() =>
                  setDraft(
                    "Run a scenario and show me what changes."
                  )
                }
              >
                <FlaskConical size={14} />
                Run a scenario
              </button>
            </div>

            <button
              type="button"
              className="studio-think-button"
              onClick={openBrain}
            >
              Think with Second Brain
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        <section className="studio-section">
          <div className="studio-section-heading">
            <div>
              <span>RITU&apos;S WORKSPACE</span>
              <h2>
                Things worth thinking about
              </h2>
            </div>

            <button
              type="button"
              className="studio-text-action"
              onClick={() => {
                setDraft("");
                document
                  .getElementById(
                    "studio-thought-input"
                  )
                  ?.focus();
              }}
            >
              <Plus size={14} />
              New thought
            </button>
          </div>

          <div className="studio-thought-grid">
            {thoughts.map((thought) => {
              const Icon = thought.icon;

              return (
                <article
                  className="studio-thought-card"
                  key={thought.title}
                >
                  <div className="studio-thought-top">
                    <div className="studio-thought-icon">
                      <Icon size={16} />
                    </div>

                    <div className="studio-thought-state">
                      <span>
                        {thought.eyebrow}
                      </span>
                      <b>
                        {thought.status}
                      </b>
                    </div>
                  </div>

                  <h3>{thought.title}</h3>

                  <p>
                    {thought.description}
                  </p>

                  <div className="studio-thought-context">
                    {thought.context.map(
                      (item) => (
                        <span key={item}>
                          {item}
                        </span>
                      )
                    )}
                  </div>

                  <div className="studio-thought-footer">
                    <span>
                      {thought.updated}
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setDraft(
                          thought.title
                        );

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      Open thought
                      <ChevronRight
                        size={14}
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="studio-context-panel">
          <div className="studio-context-copy">
            <div className="studio-kicker">
              <Brain size={13} />
              COMPANY CONTEXT
            </div>

            <h2>
              Bring the company into the room.
            </h2>

            <p>
              Pull the relevant part of Gyandhara
              into a thought. Second Brain can use
              its numbers, relationships, history
              and operating context while you think.
            </p>
          </div>

          <div className="studio-context-controls">
            <span>
              ADD CONTEXT TO THIS THOUGHT
            </span>

            <div className="studio-context-chips">
              {companyContext.map((item) => {
                const selected =
                  selectedContext.includes(
                    item
                  );

                return (
                  <button
                    key={item}
                    type="button"
                    className={
                      selected
                        ? "selected"
                        : ""
                    }
                    onClick={() =>
                      toggleContext(item)
                    }
                  >
                    {selected ? (
                      <Check size={12} />
                    ) : (
                      <Plus size={12} />
                    )}

                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="studio-section">
          <div className="studio-section-heading">
            <div>
              <span>STARTING POINTS</span>
              <h2>
                Don&apos;t start with a blank page.
              </h2>
            </div>

            {selectedTemplate && (
              <div className="studio-template-selected">
                Using: {selectedTemplate}
              </div>
            )}
          </div>

          <div className="studio-template-grid">
            {templates.map((template) => {
              const Icon = template.icon;

              return (
                <button
                  type="button"
                  className="studio-template"
                  key={template.title}
                  onClick={() =>
                    useTemplate(
                      template.title,
                      template.prompt
                    )
                  }
                >
                  <div className="studio-template-icon">
                    <Icon size={17} />
                  </div>

                  <div>
                    <strong>
                      {template.title}
                    </strong>

                    <p>
                      {template.description}
                    </p>
                  </div>

                  <ChevronRight
                    className="studio-template-arrow"
                    size={15}
                  />
                </button>
              );
            })}
          </div>
        </section>

        <section className="studio-lifecycle">
          <div className="studio-lifecycle-copy">
            <span>
              FROM THOUGHT TO REALITY
            </span>

            <h2>
              Studio doesn&apos;t replace
              Execution.
              <br />
              It feeds it.
            </h2>

            <p>
              When an idea becomes real, its
              assumptions, evidence and decisions
              can travel with it into Execution —
              and eventually become part of
              Gyandhara&apos;s memory.
            </p>
          </div>

          <div className="studio-lifecycle-flow">
            {lifecycle.map(
              (stage, index) => (
                <div
                  className="studio-life-stage"
                  key={stage}
                >
                  <div>
                    <span>
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <strong>
                      {stage}
                    </strong>
                  </div>

                  {index <
                    lifecycle.length -
                      1 && (
                    <ArrowRight
                      size={13}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </section>

        <section className="studio-philosophy">
          <BookOpen size={18} />

          <div>
            <strong>
              The company remembers what
              happened. Studio remembers why.
            </strong>

            <p>
              Ideas, rejected options, assumptions
              and lessons become useful context for
              the next decision instead of
              disappearing into meetings and
              documents.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}