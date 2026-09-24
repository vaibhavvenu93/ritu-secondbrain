export type Provenance = "verified" | "derived" | "illustrative";
export type Health = "good" | "watch" | "risk";
export type Trend = "up" | "down" | "flat";

export type EntityType =
  | "company"
  | "function"
  | "plant"
  | "state"
  | "district"
  | "distributor"
  | "retailer"
  | "sku"
  | "supplier"
  | "raw_material"
  | "person"
  | "objective"
  | "initiative"
  | "decision"
  | "commitment";

export interface SourceMeta {
  provenance: Provenance;
  source: string;
  updatedAt: string;
}

export interface CompanyEntity {
  id: string;
  type: EntityType;
  name: string;
  description?: string;
  parentId?: string;
  attributes?: Record<string, string | number | boolean>;
  source: SourceMeta;
}

export type RelationshipType =
  | "contains"
  | "owns"
  | "supplies"
  | "produces"
  | "sells"
  | "located_in"
  | "depends_on"
  | "impacts"
  | "assigned_to"
  | "supports"
  | "decided_by";

export interface CompanyRelationship {
  id: string;
  from: string;
  to: string;
  type: RelationshipType;
  weight?: number;
  source: SourceMeta;
}

export interface Metric {
  id: string;
  label: string;
  domain:
    | "money"
    | "commercial"
    | "operations"
    | "supply"
    | "customer"
    | "people";
  value: number;
  unit: string;
  plan?: number;
  previous?: number;
  trend: Trend;
  health: Health;
  entityId: string;
  note?: string;
  source: SourceMeta;
}

export interface AttentionItem {
  id: string;
  type: "decision" | "risk" | "opportunity" | "commitment";
  title: string;
  summary: string;
  impact: string;
  ownerEntityId: string;
  relatedEntityIds: string[];
  health: Health;
  requiresMD: boolean;
  source: SourceMeta;
}

export interface BrainAgent {
  id: string;
  name: string;
  scope: string[];
  status: "ready" | "working" | "blocked";
}

export interface CompanyBrain {
  entities: CompanyEntity[];
  relationships: CompanyRelationship[];
  metrics: Metric[];
  attention: AttentionItem[];
  agents: BrainAgent[];
}