import type {
  AttentionItem,
  BrainAgent,
  CompanyEntity,
  CompanyRelationship,
  Metric,
} from "@/domain/company";

/*
|--------------------------------------------------------------------------
| SOURCE / PROVENANCE
|--------------------------------------------------------------------------
|
| Verified = based on Gyandhara public information.
| Illustrative = synthetic operating data created only for the demo.
|
| The demo must never imply that illustrative operating numbers are
| actual Gyandhara internal data.
|
*/

const verified = {
  provenance: "verified" as const,
  source: "Gyandhara public information",
  updatedAt: "2026-09-24",
};

const illustrative = {
  provenance: "illustrative" as const,
  source: "Gyandhara One demo model",
  updatedAt: "2026-09-24",
};

/*
|--------------------------------------------------------------------------
| COMPANY ENTITIES
|--------------------------------------------------------------------------
*/

export const entities: CompanyEntity[] = [
  /*
  |--------------------------------------------------------------------------
  | COMPANY
  |--------------------------------------------------------------------------
  */

  {
    id: "gyandhara",
    type: "company",
    name: "Gyandhara Industries",
    description: "Animal nutrition and cattle feed business.",
    attributes: {
      publicRevenue: "₹425Cr+",
      publicFarmerReach: "10 lakh+",
    },
    source: verified,
  },

  /*
  |--------------------------------------------------------------------------
  | FUNCTIONS
  |--------------------------------------------------------------------------
  */

  {
    id: "fn-finance",
    type: "function",
    name: "Finance",
    parentId: "gyandhara",
    source: illustrative,
  },
  {
    id: "fn-commercial",
    type: "function",
    name: "Commercial",
    parentId: "gyandhara",
    source: illustrative,
  },
  {
    id: "fn-operations",
    type: "function",
    name: "Operations",
    parentId: "gyandhara",
    source: illustrative,
  },
  {
    id: "fn-supply",
    type: "function",
    name: "Supply Chain",
    parentId: "gyandhara",
    source: illustrative,
  },
  {
    id: "fn-customer",
    type: "function",
    name: "Customer & Farmer",
    parentId: "gyandhara",
    source: illustrative,
  },
  {
    id: "fn-people",
    type: "function",
    name: "People",
    parentId: "gyandhara",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | PLANTS
  |--------------------------------------------------------------------------
  */

  {
    id: "plant-hardoi",
    type: "plant",
    name: "Hardoi Plant",
    parentId: "fn-operations",
    source: verified,
  },
  {
    id: "plant-amethi",
    type: "plant",
    name: "Amethi Plant",
    parentId: "fn-operations",
    source: verified,
  },

  /*
  |--------------------------------------------------------------------------
  | STATES / COMMERCIAL TERRITORIES
  |--------------------------------------------------------------------------
  */

  {
    id: "state-up",
    type: "state",
    name: "Uttar Pradesh",
    parentId: "fn-commercial",
    source: verified,
  },
  {
    id: "state-bihar",
    type: "state",
    name: "Bihar",
    parentId: "fn-commercial",
    source: verified,
  },
  {
    id: "state-mp",
    type: "state",
    name: "Madhya Pradesh",
    parentId: "fn-commercial",
    source: verified,
  },
  {
    id: "state-assam",
    type: "state",
    name: "Assam",
    parentId: "fn-commercial",
    source: verified,
  },

  /*
  |--------------------------------------------------------------------------
  | DISTRICTS
  |--------------------------------------------------------------------------
  |
  | These are illustrative commercial drill-downs for the demo.
  |
  */

  {
    id: "district-lucknow",
    type: "district",
    name: "Lucknow",
    parentId: "state-up",
    source: illustrative,
  },
  {
    id: "district-hardoi",
    type: "district",
    name: "Hardoi",
    parentId: "state-up",
    source: illustrative,
  },
  {
    id: "district-kanpur",
    type: "district",
    name: "Kanpur",
    parentId: "state-up",
    source: illustrative,
  },

  {
    id: "district-patna",
    type: "district",
    name: "Patna",
    parentId: "state-bihar",
    source: illustrative,
  },
  {
    id: "district-muzaffarpur",
    type: "district",
    name: "Muzaffarpur",
    parentId: "state-bihar",
    source: illustrative,
  },
  {
    id: "district-gaya",
    type: "district",
    name: "Gaya",
    parentId: "state-bihar",
    source: illustrative,
  },

  {
    id: "district-bhopal",
    type: "district",
    name: "Bhopal",
    parentId: "state-mp",
    source: illustrative,
  },
  {
    id: "district-indore",
    type: "district",
    name: "Indore",
    parentId: "state-mp",
    source: illustrative,
  },

  {
    id: "district-guwahati",
    type: "district",
    name: "Guwahati",
    parentId: "state-assam",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | DISTRIBUTORS
  |--------------------------------------------------------------------------
  */

  {
    id: "dist-lucknow-north",
    type: "distributor",
    name: "Lucknow North Distributor",
    parentId: "district-lucknow",
    source: illustrative,
  },
  {
    id: "dist-hardoi-central",
    type: "distributor",
    name: "Hardoi Central Distributor",
    parentId: "district-hardoi",
    source: illustrative,
  },
  {
    id: "dist-kanpur-west",
    type: "distributor",
    name: "Kanpur West Distributor",
    parentId: "district-kanpur",
    source: illustrative,
  },

  {
    id: "dist-patna-east",
    type: "distributor",
    name: "Patna East Distributor",
    parentId: "district-patna",
    source: illustrative,
  },
  {
    id: "dist-patna-rural",
    type: "distributor",
    name: "Patna Rural Distributor",
    parentId: "district-patna",
    source: illustrative,
  },
  {
    id: "dist-muzaffarpur-central",
    type: "distributor",
    name: "Muzaffarpur Central Distributor",
    parentId: "district-muzaffarpur",
    source: illustrative,
  },
  {
    id: "dist-gaya-south",
    type: "distributor",
    name: "Gaya South Distributor",
    parentId: "district-gaya",
    source: illustrative,
  },

  {
    id: "dist-bhopal-central",
    type: "distributor",
    name: "Bhopal Central Distributor",
    parentId: "district-bhopal",
    source: illustrative,
  },
  {
    id: "dist-indore-rural",
    type: "distributor",
    name: "Indore Rural Distributor",
    parentId: "district-indore",
    source: illustrative,
  },

  {
    id: "dist-guwahati-east",
    type: "distributor",
    name: "Guwahati East Distributor",
    parentId: "district-guwahati",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | RETAILERS
  |--------------------------------------------------------------------------
  */

  {
    id: "retailer-lucknow-01",
    type: "retailer",
    name: "Lucknow Retailer 01",
    parentId: "dist-lucknow-north",
    source: illustrative,
  },
  {
    id: "retailer-lucknow-02",
    type: "retailer",
    name: "Lucknow Retailer 02",
    parentId: "dist-lucknow-north",
    source: illustrative,
  },
  {
    id: "retailer-hardoi-01",
    type: "retailer",
    name: "Hardoi Retailer 01",
    parentId: "dist-hardoi-central",
    source: illustrative,
  },
  {
    id: "retailer-hardoi-02",
    type: "retailer",
    name: "Hardoi Retailer 02",
    parentId: "dist-hardoi-central",
    source: illustrative,
  },
  {
    id: "retailer-kanpur-01",
    type: "retailer",
    name: "Kanpur Retailer 01",
    parentId: "dist-kanpur-west",
    source: illustrative,
  },

  {
    id: "retailer-patna-01",
    type: "retailer",
    name: "Patna Retailer 01",
    parentId: "dist-patna-east",
    source: illustrative,
  },
  {
    id: "retailer-patna-02",
    type: "retailer",
    name: "Patna Retailer 02",
    parentId: "dist-patna-east",
    source: illustrative,
  },
  {
    id: "retailer-patna-03",
    type: "retailer",
    name: "Patna Retailer 03",
    parentId: "dist-patna-rural",
    source: illustrative,
  },
  {
    id: "retailer-patna-04",
    type: "retailer",
    name: "Patna Retailer 04",
    parentId: "dist-patna-rural",
    source: illustrative,
  },

  {
    id: "retailer-muzaffarpur-01",
    type: "retailer",
    name: "Muzaffarpur Retailer 01",
    parentId: "dist-muzaffarpur-central",
    source: illustrative,
  },
  {
    id: "retailer-muzaffarpur-02",
    type: "retailer",
    name: "Muzaffarpur Retailer 02",
    parentId: "dist-muzaffarpur-central",
    source: illustrative,
  },

  {
    id: "retailer-gaya-01",
    type: "retailer",
    name: "Gaya Retailer 01",
    parentId: "dist-gaya-south",
    source: illustrative,
  },
  {
    id: "retailer-gaya-02",
    type: "retailer",
    name: "Gaya Retailer 02",
    parentId: "dist-gaya-south",
    source: illustrative,
  },

  {
    id: "retailer-bhopal-01",
    type: "retailer",
    name: "Bhopal Retailer 01",
    parentId: "dist-bhopal-central",
    source: illustrative,
  },
  {
    id: "retailer-bhopal-02",
    type: "retailer",
    name: "Bhopal Retailer 02",
    parentId: "dist-bhopal-central",
    source: illustrative,
  },

  {
    id: "retailer-indore-01",
    type: "retailer",
    name: "Indore Retailer 01",
    parentId: "dist-indore-rural",
    source: illustrative,
  },
  {
    id: "retailer-indore-02",
    type: "retailer",
    name: "Indore Retailer 02",
    parentId: "dist-indore-rural",
    source: illustrative,
  },

  {
    id: "retailer-guwahati-01",
    type: "retailer",
    name: "Guwahati Retailer 01",
    parentId: "dist-guwahati-east",
    source: illustrative,
  },
  {
    id: "retailer-guwahati-02",
    type: "retailer",
    name: "Guwahati Retailer 02",
    parentId: "dist-guwahati-east",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | PRODUCTS / SKUs
  |--------------------------------------------------------------------------
  */

  {
    id: "sku-doodh-plus",
    type: "sku",
    name: "Doodh Plus",
    source: verified,
  },
  {
    id: "sku-supreme",
    type: "sku",
    name: "Supreme",
    source: verified,
  },
  {
    id: "sku-gold-pro",
    type: "sku",
    name: "Gold Pro",
    source: verified,
  },
  {
    id: "sku-diamond-pro",
    type: "sku",
    name: "Diamond Pro",
    description: "Premium nutrition for higher-yield animals.",
    source: verified,
  },

  /*
  | Supporting product families below are illustrative demo objects.
  | They are deliberately labelled as such rather than represented as
  | verified Gyandhara SKU names.
  */

  {
    id: "sku-calf-nutrition",
    type: "sku",
    name: "Calf Nutrition",
    source: illustrative,
  },
  {
    id: "sku-transition-nutrition",
    type: "sku",
    name: "Transition Nutrition",
    source: illustrative,
  },
  {
    id: "sku-buffalo-nutrition",
    type: "sku",
    name: "Buffalo Nutrition",
    source: illustrative,
  },
  {
    id: "sku-mineral-support",
    type: "sku",
    name: "Mineral Support",
    source: illustrative,
  },
  {
    id: "sku-digestive-support",
    type: "sku",
    name: "Digestive Support",
    source: illustrative,
  },
  {
    id: "sku-calcium-support",
    type: "sku",
    name: "Calcium Support",
    source: illustrative,
  },
  {
    id: "sku-reproductive-support",
    type: "sku",
    name: "Reproductive Support",
    source: illustrative,
  },
  {
    id: "sku-specialty-nutrition",
    type: "sku",
    name: "Specialty Nutrition",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | RAW MATERIALS
  |--------------------------------------------------------------------------
  */

  {
    id: "rm-soymeal",
    type: "raw_material",
    name: "Soymeal",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "rm-maize",
    type: "raw_material",
    name: "Maize",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "rm-bran",
    type: "raw_material",
    name: "Bran",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "rm-mineral-mix",
    type: "raw_material",
    name: "Mineral Mix",
    parentId: "fn-supply",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | SUPPLIERS
  |--------------------------------------------------------------------------
  */

  {
    id: "supplier-soy-01",
    type: "supplier",
    name: "Soy Supplier A",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "supplier-soy-02",
    type: "supplier",
    name: "Soy Supplier B",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "supplier-maize-01",
    type: "supplier",
    name: "Maize Supplier A",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "supplier-maize-02",
    type: "supplier",
    name: "Maize Supplier B",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "supplier-bran-01",
    type: "supplier",
    name: "Bran Supplier A",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "supplier-bran-02",
    type: "supplier",
    name: "Bran Supplier B",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "supplier-mineral-01",
    type: "supplier",
    name: "Mineral Supplier A",
    parentId: "fn-supply",
    source: illustrative,
  },
  {
    id: "supplier-mineral-02",
    type: "supplier",
    name: "Mineral Supplier B",
    parentId: "fn-supply",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | PEOPLE
  |--------------------------------------------------------------------------
  */

  {
    id: "person-ritu",
    type: "person",
    name: "Ritu Agarwal",
    description: "Managing Director",
    parentId: "gyandhara",
    source: verified,
  },
  {
    id: "person-kushendra",
    type: "person",
    name: "Kushendra Singh",
    description: "Finance leadership",
    parentId: "fn-finance",
    source: verified,
  },
  {
    id: "person-diva",
    type: "person",
    name: "Diva Pant",
    description: "Marketing and farmer community",
    parentId: "fn-customer",
    source: verified,
  },
  {
    id: "person-jitendra",
    type: "person",
    name: "Jitendra Awasthi",
    description: "Procurement and industry management",
    parentId: "fn-supply",
    source: verified,
  },

  /*
  |--------------------------------------------------------------------------
  | OBJECTIVES
  |--------------------------------------------------------------------------
  */

  {
    id: "objective-bihar",
    type: "objective",
    name: "Grow Bihar",
    description:
      "Build Bihar while protecting contribution economics.",
    parentId: "state-bihar",
    source: illustrative,
  },
  {
    id: "objective-margin",
    type: "objective",
    name: "Protect Contribution Margin",
    description:
      "Protect margin while maintaining commercial momentum.",
    parentId: "fn-finance",
    source: illustrative,
  },
  {
    id: "objective-service",
    type: "objective",
    name: "Improve Market Availability",
    description:
      "Reduce stock-outs and improve distributor service levels.",
    parentId: "fn-commercial",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | INITIATIVES
  |--------------------------------------------------------------------------
  */

  {
    id: "initiative-bihar-distribution",
    type: "initiative",
    name: "Bihar Distribution Expansion",
    parentId: "objective-bihar",
    source: illustrative,
  },
  {
    id: "initiative-soy-sourcing",
    type: "initiative",
    name: "Soymeal Sourcing Reset",
    parentId: "objective-margin",
    source: illustrative,
  },
  {
    id: "initiative-bihar-availability",
    type: "initiative",
    name: "Bihar Availability Recovery",
    parentId: "objective-service",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | DECISIONS
  |--------------------------------------------------------------------------
  */

  {
    id: "decision-bihar-discount",
    type: "decision",
    name: "Bihar Discount Guardrail",
    description:
      "Determine commercial flexibility without weakening contribution economics.",
    parentId: "objective-bihar",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | COMMITMENTS
  |--------------------------------------------------------------------------
  */

  {
    id: "commitment-bihar-distributors",
    type: "commitment",
    name: "Review Bihar Distributor Economics",
    description:
      "Commercial and Finance to review distributor-level economics.",
    parentId: "initiative-bihar-distribution",
    source: illustrative,
  },
  {
    id: "commitment-soy-options",
    type: "commitment",
    name: "Secure Alternate Soymeal Options",
    description:
      "Procurement to evaluate alternate sourcing before the next buying cycle.",
    parentId: "initiative-soy-sourcing",
    source: illustrative,
  },
];

/*
|--------------------------------------------------------------------------
| RELATIONSHIPS
|--------------------------------------------------------------------------
*/

export const relationships: CompanyRelationship[] = [
  /*
  | Plants → Company
  */

  {
    id: "rel-hardoi-company",
    from: "plant-hardoi",
    to: "gyandhara",
    type: "contains",
    source: verified,
  },
  {
    id: "rel-amethi-company",
    from: "plant-amethi",
    to: "gyandhara",
    type: "contains",
    source: verified,
  },

  /*
  | Raw material → SKU economics
  */

  {
    id: "rel-soy-diamond",
    from: "rm-soymeal",
    to: "sku-diamond-pro",
    type: "impacts",
    weight: 0.8,
    source: illustrative,
  },
  {
    id: "rel-soy-gold",
    from: "rm-soymeal",
    to: "sku-gold-pro",
    type: "impacts",
    weight: 0.6,
    source: illustrative,
  },
  {
    id: "rel-maize-doodh",
    from: "rm-maize",
    to: "sku-doodh-plus",
    type: "impacts",
    weight: 0.5,
    source: illustrative,
  },
  {
    id: "rel-maize-supreme",
    from: "rm-maize",
    to: "sku-supreme",
    type: "impacts",
    weight: 0.5,
    source: illustrative,
  },

  /*
  | Suppliers → Raw materials
  */

  {
    id: "rel-supplier-soy-a",
    from: "supplier-soy-01",
    to: "rm-soymeal",
    type: "supplies",
    source: illustrative,
  },
  {
    id: "rel-supplier-soy-b",
    from: "supplier-soy-02",
    to: "rm-soymeal",
    type: "supplies",
    source: illustrative,
  },
  {
    id: "rel-supplier-maize-a",
    from: "supplier-maize-01",
    to: "rm-maize",
    type: "supplies",
    source: illustrative,
  },
  {
    id: "rel-supplier-maize-b",
    from: "supplier-maize-02",
    to: "rm-maize",
    type: "supplies",
    source: illustrative,
  },
  {
    id: "rel-supplier-bran-a",
    from: "supplier-bran-01",
    to: "rm-bran",
    type: "supplies",
    source: illustrative,
  },
  {
    id: "rel-supplier-bran-b",
    from: "supplier-bran-02",
    to: "rm-bran",
    type: "supplies",
    source: illustrative,
  },
  {
    id: "rel-supplier-mineral-a",
    from: "supplier-mineral-01",
    to: "rm-mineral-mix",
    type: "supplies",
    source: illustrative,
  },
  {
    id: "rel-supplier-mineral-b",
    from: "supplier-mineral-02",
    to: "rm-mineral-mix",
    type: "supplies",
    source: illustrative,
  },

  /*
  | Products → Markets
  */

  {
    id: "rel-diamond-bihar",
    from: "sku-diamond-pro",
    to: "state-bihar",
    type: "sells",
    source: illustrative,
  },
  {
    id: "rel-gold-bihar",
    from: "sku-gold-pro",
    to: "state-bihar",
    type: "sells",
    source: illustrative,
  },
  {
    id: "rel-supreme-up",
    from: "sku-supreme",
    to: "state-up",
    type: "sells",
    source: illustrative,
  },
  {
    id: "rel-doodh-up",
    from: "sku-doodh-plus",
    to: "state-up",
    type: "sells",
    source: illustrative,
  },

  /*
  | Bihar commercial chain
  */

  {
    id: "rel-bihar-patna",
    from: "state-bihar",
    to: "district-patna",
    type: "contains",
    source: illustrative,
  },
  {
    id: "rel-bihar-muzaffarpur",
    from: "state-bihar",
    to: "district-muzaffarpur",
    type: "contains",
    source: illustrative,
  },
  {
    id: "rel-bihar-gaya",
    from: "state-bihar",
    to: "district-gaya",
    type: "contains",
    source: illustrative,
  },

  {
    id: "rel-patna-east",
    from: "district-patna",
    to: "dist-patna-east",
    type: "contains",
    source: illustrative,
  },
  {
    id: "rel-patna-rural",
    from: "district-patna",
    to: "dist-patna-rural",
    type: "contains",
    source: illustrative,
  },
  {
    id: "rel-muzaffarpur-central",
    from: "district-muzaffarpur",
    to: "dist-muzaffarpur-central",
    type: "contains",
    source: illustrative,
  },
  {
    id: "rel-gaya-south",
    from: "district-gaya",
    to: "dist-gaya-south",
    type: "contains",
    source: illustrative,
  },

  /*
  | Critical distributor → retailer chain
  */

  {
    id: "rel-patna-east-retailer-1",
    from: "dist-patna-east",
    to: "retailer-patna-01",
    type: "contains",
    source: illustrative,
  },
  {
    id: "rel-patna-east-retailer-2",
    from: "dist-patna-east",
    to: "retailer-patna-02",
    type: "contains",
    source: illustrative,
  },
  {
    id: "rel-patna-rural-retailer-3",
    from: "dist-patna-rural",
    to: "retailer-patna-03",
    type: "contains",
    source: illustrative,
  },
  {
    id: "rel-patna-rural-retailer-4",
    from: "dist-patna-rural",
    to: "retailer-patna-04",
    type: "contains",
    source: illustrative,
  },

  /*
  | Plants → Products
  */

  {
    id: "rel-hardoi-gold",
    from: "plant-hardoi",
    to: "sku-gold-pro",
    type: "produces",
    source: illustrative,
  },
  {
    id: "rel-hardoi-diamond",
    from: "plant-hardoi",
    to: "sku-diamond-pro",
    type: "produces",
    source: illustrative,
  },
  {
    id: "rel-amethi-doodh",
    from: "plant-amethi",
    to: "sku-doodh-plus",
    type: "produces",
    source: illustrative,
  },
  {
    id: "rel-amethi-supreme",
    from: "plant-amethi",
    to: "sku-supreme",
    type: "produces",
    source: illustrative,
  },

  /*
  | Strategy / execution
  */

  {
    id: "rel-bihar-objective",
    from: "objective-bihar",
    to: "state-bihar",
    type: "supports",
    source: illustrative,
  },
  {
    id: "rel-bihar-initiative",
    from: "initiative-bihar-distribution",
    to: "objective-bihar",
    type: "supports",
    source: illustrative,
  },
  {
    id: "rel-availability-bihar",
    from: "initiative-bihar-availability",
    to: "state-bihar",
    type: "supports",
    source: illustrative,
  },
  {
    id: "rel-soy-margin",
    from: "initiative-soy-sourcing",
    to: "objective-margin",
    type: "supports",
    source: illustrative,
  },
  {
    id: "rel-soy-dependency",
    from: "initiative-soy-sourcing",
    to: "rm-soymeal",
    type: "depends_on",
    source: illustrative,
  },

  /*
  | Decisions / ownership
  */

  {
    id: "rel-ritu-bihar",
    from: "objective-bihar",
    to: "person-ritu",
    type: "decided_by",
    source: illustrative,
  },
  {
    id: "rel-decision-ritu",
    from: "decision-bihar-discount",
    to: "person-ritu",
    type: "decided_by",
    source: illustrative,
  },
  {
    id: "rel-decision-bihar",
    from: "decision-bihar-discount",
    to: "objective-bihar",
    type: "supports",
    source: illustrative,
  },

  /*
  | Commitments
  */

  {
    id: "rel-commitment-bihar",
    from: "commitment-bihar-distributors",
    to: "initiative-bihar-distribution",
    type: "supports",
    source: illustrative,
  },
  {
    id: "rel-commitment-soy",
    from: "commitment-soy-options",
    to: "initiative-soy-sourcing",
    type: "supports",
    source: illustrative,
  },
  {
    id: "rel-kushendra-bihar",
    from: "commitment-bihar-distributors",
    to: "person-kushendra",
    type: "assigned_to",
    source: illustrative,
  },
  {
    id: "rel-jitendra-soy",
    from: "commitment-soy-options",
    to: "person-jitendra",
    type: "assigned_to",
    source: illustrative,
  },
];

/*
|--------------------------------------------------------------------------
| METRICS
|--------------------------------------------------------------------------
|
| All internal operating metrics below are illustrative.
|
*/

export const metrics: Metric[] = [
  /*
  |--------------------------------------------------------------------------
  | MONEY
  |--------------------------------------------------------------------------
  */

  {
    id: "metric-revenue",
    label: "Revenue MTD",
    domain: "money",
    value: 38.6,
    unit: "₹Cr",
    plan: 36.2,
    previous: 35.8,
    trend: "up",
    health: "good",
    entityId: "gyandhara",
    note: "Revenue is ahead of plan.",
    source: illustrative,
  },
  {
    id: "metric-ebitda",
    label: "EBITDA",
    domain: "money",
    value: 11.8,
    unit: "%",
    plan: 12.6,
    previous: 12.3,
    trend: "down",
    health: "watch",
    entityId: "gyandhara",
    note: "Input cost and commercial mix are creating pressure.",
    source: illustrative,
  },
  {
    id: "metric-gross-margin",
    label: "Gross Margin",
    domain: "money",
    value: 24.7,
    unit: "%",
    plan: 25.6,
    previous: 25.2,
    trend: "down",
    health: "watch",
    entityId: "gyandhara",
    note: "Premium SKU input costs are reducing margin.",
    source: illustrative,
  },
  {
    id: "metric-receivable-days",
    label: "Receivable Days",
    domain: "money",
    value: 31,
    unit: "days",
    plan: 28,
    previous: 30,
    trend: "up",
    health: "watch",
    entityId: "fn-finance",
    note: "Collections are slightly behind the operating target.",
    source: illustrative,
  },
  {
    id: "metric-cash-conversion",
    label: "Cash Conversion Cycle",
    domain: "money",
    value: 42,
    unit: "days",
    plan: 38,
    previous: 40,
    trend: "up",
    health: "watch",
    entityId: "fn-finance",
    note: "Inventory and receivables are both contributing.",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | COMMERCIAL
  |--------------------------------------------------------------------------
  */

  {
    id: "metric-bihar-revenue",
    label: "Bihar Revenue MTD",
    domain: "commercial",
    value: 3.72,
    unit: "₹Cr",
    plan: 4.19,
    previous: 3.89,
    trend: "down",
    health: "risk",
    entityId: "state-bihar",
    note: "Below plan for the current period.",
    source: illustrative,
  },
  {
    id: "metric-up-revenue",
    label: "UP Revenue MTD",
    domain: "commercial",
    value: 24.4,
    unit: "₹Cr",
    plan: 22.9,
    previous: 22.7,
    trend: "up",
    health: "good",
    entityId: "state-up",
    note: "Core market is ahead of plan.",
    source: illustrative,
  },
  {
    id: "metric-mp-revenue",
    label: "MP Revenue MTD",
    domain: "commercial",
    value: 5.8,
    unit: "₹Cr",
    plan: 5.5,
    previous: 5.3,
    trend: "up",
    health: "good",
    entityId: "state-mp",
    note: "Growth remains slightly ahead of plan.",
    source: illustrative,
  },
  {
    id: "metric-assam-revenue",
    label: "Assam Revenue MTD",
    domain: "commercial",
    value: 2.1,
    unit: "₹Cr",
    plan: 2.2,
    previous: 1.9,
    trend: "up",
    health: "watch",
    entityId: "state-assam",
    note: "Growing, but marginally below plan.",
    source: illustrative,
  },

  {
    id: "metric-patna-revenue",
    label: "Patna Revenue MTD",
    domain: "commercial",
    value: 1.42,
    unit: "₹Cr",
    plan: 1.72,
    previous: 1.55,
    trend: "down",
    health: "risk",
    entityId: "district-patna",
    note: "Largest contributor to the Bihar gap.",
    source: illustrative,
  },
  {
    id: "metric-muzaffarpur-revenue",
    label: "Muzaffarpur Revenue MTD",
    domain: "commercial",
    value: 1.31,
    unit: "₹Cr",
    plan: 1.36,
    previous: 1.29,
    trend: "up",
    health: "watch",
    entityId: "district-muzaffarpur",
    note: "Close to plan.",
    source: illustrative,
  },
  {
    id: "metric-gaya-revenue",
    label: "Gaya Revenue MTD",
    domain: "commercial",
    value: 0.99,
    unit: "₹Cr",
    plan: 1.11,
    previous: 1.05,
    trend: "down",
    health: "watch",
    entityId: "district-gaya",
    note: "Distributor productivity is below target.",
    source: illustrative,
  },

  {
    id: "metric-patna-east-sales",
    label: "Distributor Sales MTD",
    domain: "commercial",
    value: 0.78,
    unit: "₹Cr",
    plan: 0.96,
    previous: 0.88,
    trend: "down",
    health: "risk",
    entityId: "dist-patna-east",
    note: "Retailer activity and availability are below target.",
    source: illustrative,
  },
  {
    id: "metric-patna-rural-sales",
    label: "Distributor Sales MTD",
    domain: "commercial",
    value: 0.64,
    unit: "₹Cr",
    plan: 0.76,
    previous: 0.67,
    trend: "down",
    health: "watch",
    entityId: "dist-patna-rural",
    note: "Coverage remains below plan.",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | OPERATIONS
  |--------------------------------------------------------------------------
  */

  {
    id: "metric-hardoi-util",
    label: "Hardoi Utilisation",
    domain: "operations",
    value: 88,
    unit: "%",
    plan: 86,
    previous: 85,
    trend: "up",
    health: "good",
    entityId: "plant-hardoi",
    note: "Plant is operating ahead of utilisation plan.",
    source: illustrative,
  },
  {
    id: "metric-amethi-util",
    label: "Amethi Utilisation",
    domain: "operations",
    value: 82,
    unit: "%",
    plan: 85,
    previous: 76,
    trend: "up",
    health: "watch",
    entityId: "plant-amethi",
    note: "Recovered from prior interruption.",
    source: illustrative,
  },
  {
    id: "metric-hardoi-cost",
    label: "Cost per MT",
    domain: "operations",
    value: 17840,
    unit: "₹",
    plan: 17400,
    previous: 17590,
    trend: "up",
    health: "watch",
    entityId: "plant-hardoi",
    note: "Raw material cost is flowing into conversion economics.",
    source: illustrative,
  },
  {
    id: "metric-amethi-cost",
    label: "Cost per MT",
    domain: "operations",
    value: 18120,
    unit: "₹",
    plan: 17650,
    previous: 17980,
    trend: "up",
    health: "watch",
    entityId: "plant-amethi",
    note: "Lower utilisation is increasing unit cost.",
    source: illustrative,
  },
  {
    id: "metric-quality-pass",
    label: "First Pass Quality",
    domain: "operations",
    value: 98.4,
    unit: "%",
    plan: 98,
    previous: 98.1,
    trend: "up",
    health: "good",
    entityId: "fn-operations",
    note: "Quality remains above operating target.",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | SUPPLY CHAIN
  |--------------------------------------------------------------------------
  */

  {
    id: "metric-inventory",
    label: "Inventory Days",
    domain: "supply",
    value: 23,
    unit: "days",
    plan: 21,
    previous: 22,
    trend: "up",
    health: "watch",
    entityId: "gyandhara",
    note: "Territory imbalance is increasing inventory days.",
    source: illustrative,
  },
  {
    id: "metric-soy-cost",
    label: "Soymeal Purchase Cost",
    domain: "supply",
    value: 42100,
    unit: "₹/MT",
    plan: 39800,
    previous: 40700,
    trend: "up",
    health: "risk",
    entityId: "rm-soymeal",
    note: "Current purchase economics are above plan.",
    source: illustrative,
  },
  {
    id: "metric-maize-cost",
    label: "Maize Purchase Cost",
    domain: "supply",
    value: 23800,
    unit: "₹/MT",
    plan: 23200,
    previous: 23500,
    trend: "up",
    health: "watch",
    entityId: "rm-maize",
    note: "Moderate input cost pressure.",
    source: illustrative,
  },
  {
    id: "metric-supplier-otif",
    label: "Supplier OTIF",
    domain: "supply",
    value: 91,
    unit: "%",
    plan: 95,
    previous: 93,
    trend: "down",
    health: "watch",
    entityId: "fn-supply",
    note: "Supplier delivery reliability is below target.",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | CUSTOMER & FARMER
  |--------------------------------------------------------------------------
  */

  {
    id: "metric-farmer-reach",
    label: "Farmer Interactions MTD",
    domain: "customer",
    value: 18400,
    unit: "farmers",
    plan: 17500,
    previous: 16900,
    trend: "up",
    health: "good",
    entityId: "fn-customer",
    note: "Field engagement is ahead of plan.",
    source: illustrative,
  },
  {
    id: "metric-trial-conversion",
    label: "Trial to Repeat",
    domain: "customer",
    value: 61,
    unit: "%",
    plan: 64,
    previous: 60,
    trend: "up",
    health: "watch",
    entityId: "fn-customer",
    note: "Repeat conversion is improving but remains below target.",
    source: illustrative,
  },
  {
    id: "metric-bihar-trial",
    label: "Bihar Trial to Repeat",
    domain: "customer",
    value: 54,
    unit: "%",
    plan: 62,
    previous: 57,
    trend: "down",
    health: "risk",
    entityId: "state-bihar",
    note: "Bihar repeat behaviour requires investigation.",
    source: illustrative,
  },

  /*
  |--------------------------------------------------------------------------
  | PEOPLE
  |--------------------------------------------------------------------------
  */

  {
    id: "metric-commitments-on-time",
    label: "Commitments On Time",
    domain: "people",
    value: 78,
    unit: "%",
    plan: 90,
    previous: 81,
    trend: "down",
    health: "watch",
    entityId: "fn-people",
    note: "Cross-functional closure is below the operating target.",
    source: illustrative,
  },
  {
    id: "metric-stale-initiatives",
    label: "Stale Initiatives",
    domain: "people",
    value: 4,
    unit: "items",
    plan: 2,
    previous: 3,
    trend: "up",
    health: "watch",
    entityId: "fn-people",
    note: "Four initiatives have not received a recent update.",
    source: illustrative,
  },
];

/*
|--------------------------------------------------------------------------
| ATTENTION / MD QUEUE
|--------------------------------------------------------------------------
*/

export const attention: AttentionItem[] = [
  {
    id: "attention-bihar",
    type: "decision",
    title: "Bihar discount guardrail",
    summary:
      "Commercial wants flexibility on two distributor programs while the current objective protects contribution economics.",
    impact: "₹41L modelled margin exposure",
    ownerEntityId: "fn-commercial",
    relatedEntityIds: [
      "state-bihar",
      "district-patna",
      "dist-patna-east",
      "objective-bihar",
      "initiative-bihar-distribution",
      "decision-bihar-discount",
    ],
    health: "watch",
    requiresMD: true,
    source: illustrative,
  },

  {
    id: "attention-soy",
    type: "risk",
    title: "Soymeal cost pressure",
    summary:
      "Market movement could flow through premium SKU economics if procurement remains exposed.",
    impact: "₹92L modelled exposure",
    ownerEntityId: "fn-supply",
    relatedEntityIds: [
      "rm-soymeal",
      "supplier-soy-01",
      "supplier-soy-02",
      "sku-gold-pro",
      "sku-diamond-pro",
      "objective-margin",
      "initiative-soy-sourcing",
    ],
    health: "risk",
    requiresMD: false,
    source: illustrative,
  },

  {
    id: "attention-patna-availability",
    type: "risk",
    title: "Patna availability gap",
    summary:
      "Patna East is below plan and retailer availability is contributing to the Bihar revenue gap.",
    impact: "₹18L modelled revenue at risk",
    ownerEntityId: "fn-commercial",
    relatedEntityIds: [
      "district-patna",
      "dist-patna-east",
      "retailer-patna-01",
      "retailer-patna-02",
      "initiative-bihar-availability",
    ],
    health: "risk",
    requiresMD: false,
    source: illustrative,
  },

  {
    id: "attention-commitments",
    type: "commitment",
    title: "Cross-functional commitments slipping",
    summary:
      "Commitment closure has fallen below the operating target and four initiatives are stale.",
    impact: "4 initiatives need intervention",
    ownerEntityId: "fn-people",
    relatedEntityIds: [
      "fn-people",
      "commitment-bihar-distributors",
      "commitment-soy-options",
    ],
    health: "watch",
    requiresMD: false,
    source: illustrative,
  },
];

/*
|--------------------------------------------------------------------------
| SPECIALIST AGENTS
|--------------------------------------------------------------------------
*/

export const agents: BrainAgent[] = [
  {
    id: "agent-finance",
    name: "Finance Agent",
    scope: ["P&L", "EBITDA", "cash", "working capital"],
    status: "ready",
  },
  {
    id: "agent-commercial",
    name: "Commercial Agent",
    scope: [
      "states",
      "districts",
      "distributors",
      "retailers",
      "SKUs",
    ],
    status: "ready",
  },
  {
    id: "agent-plant",
    name: "Plant Agent",
    scope: [
      "production",
      "quality",
      "downtime",
      "cost per MT",
    ],
    status: "ready",
  },
  {
    id: "agent-supply",
    name: "Supply Agent",
    scope: [
      "procurement",
      "inventory",
      "suppliers",
      "logistics",
    ],
    status: "ready",
  },
  {
    id: "agent-customer",
    name: "Farmer Agent",
    scope: [
      "farmer reach",
      "education",
      "trial",
      "repeat",
      "outcomes",
    ],
    status: "ready",
  },
  {
    id: "agent-people",
    name: "People Agent",
    scope: [
      "ownership",
      "commitments",
      "capacity",
      "accountability",
    ],
    status: "ready",
  },
  {
    id: "agent-market",
    name: "Market Agent",
    scope: [
      "commodities",
      "competitors",
      "policy",
      "opportunities",
    ],
    status: "ready",
  },
  {
    id: "agent-memory",
    name: "MD Memory",
    scope: [
      "decisions",
      "meetings",
      "commitments",
      "assumptions",
    ],
    status: "ready",
  },
];