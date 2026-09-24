import {
  ArrowRight,
  Banknote,
  Building2,
  ChevronRight,
  CircleAlert,
  Factory,
  MapPin,
  PackageSearch,
  Sprout,
  TrendingDown,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react";

import AppShell from "@/components/app-shell";
import AskBrainButton from "@/components/ask-brain-button";

import {
  getCommercialMap,
  getCompanyOverview,
  getCompanySections,
  getOperationsMap,
  getSupplyMap,
} from "@/services/company";

import { metrics } from "@/data/gyandhara";

function formatMetric(
  value: number,
  unit: string
) {
  if (unit === "₹Cr") {
    return `₹${value}Cr`;
  }

  if (unit === "%") {
    return `${value}%`;
  }

  if (unit === "days") {
    return `${value} days`;
  }

  if (unit === "₹") {
    return `₹${value.toLocaleString("en-IN")}`;
  }

  if (unit === "₹/MT") {
    return `₹${value.toLocaleString(
      "en-IN"
    )}/MT`;
  }

  if (unit === "farmers") {
    return `${value.toLocaleString(
      "en-IN"
    )} farmers`;
  }

  if (unit === "items") {
    return `${value} items`;
  }

  return `${value}${unit}`;
}

function getMetric(metricId: string) {
  return metrics.find(
    (metric) => metric.id === metricId
  );
}

function HealthDot({
  health,
}: {
  health: "good" | "watch" | "risk";
}) {
  return (
    <span
      className={`health-dot health-${health}`}
      aria-label={health}
    />
  );
}

function SectionIcon({
  id,
}: {
  id: string;
}) {
  switch (id) {
    case "money":
      return <Banknote size={20} />;

    case "commercial":
      return <MapPin size={20} />;

    case "operations":
      return <Factory size={20} />;

    case "supply":
      return <Warehouse size={20} />;

    case "customer":
      return <Sprout size={20} />;

    case "people":
      return <Users size={20} />;

    default:
      return <Building2 size={20} />;
  }
}

export default function CompanyPage() {
  const overview = getCompanyOverview();
  const sections = getCompanySections();
  const commercial = getCommercialMap();
  const operations = getOperationsMap();
  const supply = getSupplyMap();

  const revenue = getMetric(
    "metric-revenue"
  );

  const ebitda = getMetric(
    "metric-ebitda"
  );

  const inventory = getMetric(
    "metric-inventory"
  );

  const stateMetrics = [
    {
      name: "Uttar Pradesh",
      metric: getMetric(
        "metric-up-revenue"
      ),
      href: "#commercial",
    },
    {
      name: "Bihar",
      metric: getMetric(
        "metric-bihar-revenue"
      ),
      href: "#bihar",
    },
    {
      name: "Madhya Pradesh",
      metric: getMetric(
        "metric-mp-revenue"
      ),
      href: "#commercial",
    },
    {
      name: "Assam",
      metric: getMetric(
        "metric-assam-revenue"
      ),
      href: "#commercial",
    },
  ];

  const biharDistricts = [
    {
      name: "Patna",
      metric: getMetric(
        "metric-patna-revenue"
      ),
    },
    {
      name: "Muzaffarpur",
      metric: getMetric(
        "metric-muzaffarpur-revenue"
      ),
    },
    {
      name: "Gaya",
      metric: getMetric(
        "metric-gaya-revenue"
      ),
    },
  ];

  const patnaEast = getMetric(
    "metric-patna-east-sales"
  );

  return (
    <AppShell
      active="company"
      context="COMPANY"
    >
      <div className="content company-content">
        <section className="company-hero">
          <div>
            <div className="eyebrow">
              COMPANY
            </div>

            <h1>
              Everything happening
              <br />
              across Gyandhara.
            </h1>

            <p>
              One operating view from money
              to farmer. Follow the number,
              understand the reason, find the
              owner.
            </p>
          </div>

          <div className="company-hero-facts">
            <div className="company-fact">
              <span>Public revenue</span>

              <strong>
                {
                  overview.publicFacts
                    .revenue
                }
              </strong>
            </div>

            <div className="company-fact">
              <span>Farmer reach</span>

              <strong>
                {
                  overview.publicFacts
                    .farmerReach
                }
              </strong>
            </div>

            <div className="company-fact">
              <span>Plants</span>

              <strong>
                {
                  overview.publicFacts
                    .plants
                }
              </strong>
            </div>

            <div className="company-fact">
              <span>Operating model</span>

              <strong>
                {overview.model.entities}{" "}
                objects
              </strong>
            </div>
          </div>
        </section>

        <section className="company-executive-strip">
          {revenue && (
            <article>
              <div className="company-strip-label">
                <HealthDot
                  health={revenue.health}
                />
                Revenue MTD
              </div>

              <strong>
                {formatMetric(
                  revenue.value,
                  revenue.unit
                )}
              </strong>

              <span>
                Plan{" "}
                {formatMetric(
                  revenue.plan ?? 0,
                  revenue.unit
                )}
              </span>
            </article>
          )}

          {ebitda && (
            <article>
              <div className="company-strip-label">
                <HealthDot
                  health={ebitda.health}
                />
                EBITDA
              </div>

              <strong>
                {formatMetric(
                  ebitda.value,
                  ebitda.unit
                )}
              </strong>

              <span>
                Plan{" "}
                {formatMetric(
                  ebitda.plan ?? 0,
                  ebitda.unit
                )}
              </span>
            </article>
          )}

          {inventory && (
            <article>
              <div className="company-strip-label">
                <HealthDot
                  health={inventory.health}
                />
                Inventory
              </div>

              <strong>
                {formatMetric(
                  inventory.value,
                  inventory.unit
                )}
              </strong>

              <span>
                Plan{" "}
                {formatMetric(
                  inventory.plan ?? 0,
                  inventory.unit
                )}
              </span>
            </article>
          )}

          <article>
            <div className="company-strip-label">
              <PackageSearch size={14} />
              Company graph
            </div>

            <strong>
              {
                overview.model
                  .relationships
              }
            </strong>

            <span>
              live relationships
            </span>
          </article>
        </section>

        <section className="section-block company-lenses">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">
                OPERATING LENSES
              </div>

              <h2>
                See the company from any
                angle
              </h2>
            </div>

            <span className="company-small-note">
              Every view resolves to the
              same Company Brain
            </span>
          </div>

          <div className="company-lens-grid">
            {sections.map(
              (section) => (
                <a
                  key={section.id}
                  href={
                    section.id ===
                    "commercial"
                      ? "#commercial"
                      : `#${section.id}`
                  }
                  className={`company-lens-card lens-${section.health}`}
                >
                  <div className="company-lens-top">
                    <div className="company-lens-icon">
                      <SectionIcon
                        id={section.id}
                      />
                    </div>

                    <HealthDot
                      health={
                        section.health
                      }
                    />
                  </div>

                  <h3>
                    {section.label}
                  </h3>

                  <p>
                    {
                      section.description
                    }
                  </p>

                  <div className="company-lens-footer">
                    <span>
                      {
                        section.metricCount
                      }{" "}
                      signals
                    </span>

                    {section.attentionCount >
                      0 && (
                      <span className="company-attention-label">
                        {
                          section.attentionCount
                        }{" "}
                        need attention
                      </span>
                    )}

                    <ChevronRight
                      size={16}
                    />
                  </div>
                </a>
              )
            )}
          </div>
        </section>

        <section
          className="section-block company-commercial"
          id="commercial"
        >
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">
                COMMERCIAL
              </div>

              <h2>
                Where the business is moving
              </h2>
            </div>

            <div className="company-section-stat">
              {commercial.states.length}{" "}
              markets ·{" "}
              {
                commercial.distributors
                  .length
              }{" "}
              modelled distributors
            </div>
          </div>

          <div className="state-grid">
            {stateMetrics.map(
              (state) => {
                if (!state.metric) {
                  return null;
                }

                return (
                  <a
                    key={state.name}
                    href={state.href}
                    className={`state-card state-${state.metric.health}`}
                  >
                    <div className="state-card-top">
                      <span>
                        {state.name}
                      </span>

                      {state.metric
                        .trend === "up" ? (
                        <TrendingUp
                          size={16}
                        />
                      ) : (
                        <TrendingDown
                          size={16}
                        />
                      )}
                    </div>

                    <strong>
                      {formatMetric(
                        state.metric
                          .value,
                        state.metric
                          .unit
                      )}
                    </strong>

                    <div className="state-plan">
                      Plan{" "}
                      {formatMetric(
                        state.metric
                          .plan ?? 0,
                        state.metric
                          .unit
                      )}
                    </div>

                    <div className="state-health">
                      <HealthDot
                        health={
                          state.metric
                            .health
                        }
                      />

                      {state.metric
                        .health ===
                      "good"
                        ? "Ahead"
                        : state.metric
                              .health ===
                            "risk"
                          ? "Needs attention"
                          : "Watch"}
                    </div>
                  </a>
                );
              }
            )}
          </div>
        </section>

        <section
          className="section-block bihar-drilldown"
          id="bihar"
        >
          <div className="bihar-header">
            <div>
              <div className="section-kicker">
                FOLLOW THE SIGNAL
              </div>

              <h2>
                Bihar is below plan.
                <br />
                Where is the gap?
              </h2>
            </div>

            <div className="bihar-summary">
              <span>BIHAR MTD</span>

              <strong>
                ₹3.72Cr
              </strong>

              <div>
                vs ₹4.19Cr plan
              </div>

              <div className="bihar-gap">
                11.2% below plan
              </div>
            </div>
          </div>

          <div className="drill-path">
            <div className="drill-column">
              <div className="drill-column-label">
                DISTRICT
              </div>

              {biharDistricts.map(
                (district) => {
                  if (
                    !district.metric
                  ) {
                    return null;
                  }

                  return (
                    <article
                      key={
                        district.name
                      }
                      className={`drill-item drill-${district.metric.health}`}
                    >
                      <div>
                        <strong>
                          {
                            district.name
                          }
                        </strong>

                        <span>
                          {
                            district
                              .metric.note
                          }
                        </span>
                      </div>

                      <div className="drill-value">
                        {formatMetric(
                          district
                            .metric.value,
                          district
                            .metric.unit
                        )}

                        <small>
                          plan{" "}
                          {formatMetric(
                            district
                              .metric
                              .plan ?? 0,
                            district
                              .metric
                              .unit
                          )}
                        </small>
                      </div>
                    </article>
                  );
                }
              )}
            </div>

            <div className="drill-arrow">
              <ArrowRight
                size={20}
              />
            </div>

            <div className="drill-column">
              <div className="drill-column-label">
                PATNA · DISTRIBUTOR
              </div>

              {patnaEast && (
                <article className="drill-item drill-risk selected-drill">
                  <div>
                    <strong>
                      Patna East
                    </strong>

                    <span>
                      Retailer activity
                      and availability
                      below target.
                    </span>
                  </div>

                  <div className="drill-value">
                    {formatMetric(
                      patnaEast.value,
                      patnaEast.unit
                    )}

                    <small>
                      plan{" "}
                      {formatMetric(
                        patnaEast.plan ??
                          0,
                        patnaEast.unit
                      )}
                    </small>
                  </div>
                </article>
              )}

              <article className="drill-item">
                <div>
                  <strong>
                    Patna Rural
                  </strong>

                  <span>
                    Coverage below plan.
                  </span>
                </div>

                <div className="drill-value">
                  ₹0.64Cr

                  <small>
                    plan ₹0.76Cr
                  </small>
                </div>
              </article>
            </div>

            <div className="drill-arrow">
              <ArrowRight
                size={20}
              />
            </div>

            <div className="drill-column">
              <div className="drill-column-label">
                WHAT THE BRAIN FOUND
              </div>

              <article className="brain-finding">
                <div className="brain-finding-icon">
                  <CircleAlert
                    size={18}
                  />
                </div>

                <div>
                  <span>
                    AVAILABILITY
                  </span>

                  <strong>
                    ₹18L revenue at
                    risk
                  </strong>

                  <p>
                    Patna East is
                    below plan and
                    retailer
                    availability is
                    contributing to
                    the Bihar gap.
                  </p>

                  <AskBrainButton
  question="Why is Bihar behind plan?"
  autoSubmit
  className="brain-finding-button"
>
  Ask why
  <ArrowRight size={14} />
</AskBrainButton>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="company-bottom-grid">
          <div
            className="company-detail-panel"
            id="operations"
          >
            <div className="company-detail-heading">
              <div>
                <div className="section-kicker">
                  OPERATIONS
                </div>

                <h3>
                  Two plants. One view.
                </h3>
              </div>

              <Factory size={20} />
            </div>

            {operations.map(
              (item) => (
                <div
                  className="company-detail-row"
                  key={item.plant.id}
                >
                  <div>
                    <strong>
                      {
                        item.plant
                          .name
                      }
                    </strong>

                    <span>
                      {
                        item.metrics
                          .length
                      }{" "}
                      operating signals
                    </span>
                  </div>

                  <ChevronRight
                    size={17}
                  />
                </div>
              )
            )}
          </div>

          <div
            className="company-detail-panel"
            id="supply"
          >
            <div className="company-detail-heading">
              <div>
                <div className="section-kicker">
                  SUPPLY CHAIN
                </div>

                <h3>
                  Inputs affecting
                  economics.
                </h3>
              </div>

              <Warehouse
                size={20}
              />
            </div>

            {supply.rawMaterials
              .slice(0, 4)
              .map((item) => (
                <div
                  className="company-detail-row"
                  key={
                    item.material.id
                  }
                >
                  <div>
                    <strong>
                      {
                        item.material
                          .name
                      }
                    </strong>

                    <span>
                      {
                        item.connected
                          .length
                      }{" "}
                      connected objects
                    </span>
                  </div>

                  <ChevronRight
                    size={17}
                  />
                </div>
              ))}
          </div>
        </section>

        <section
          className="company-placeholder-section"
          id="money"
        />

        <section
          className="company-placeholder-section"
          id="customer"
        />

        <section
          className="company-placeholder-section"
          id="people"
        />
      </div>
    </AppShell>
  );
}