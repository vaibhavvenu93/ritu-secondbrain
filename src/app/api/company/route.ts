import { NextResponse } from "next/server";

import {
  getCommercialMap,
  getCompanyGraphSummary,
  getCompanyOverview,
  getCompanySections,
  getOperationsMap,
  getSupplyMap,
} from "@/services/company";

export async function GET() {
  const overview = getCompanyOverview();
  const sections = getCompanySections();
  const graph = getCompanyGraphSummary();

  const commercial = getCommercialMap();
  const operations = getOperationsMap();
  const supply = getSupplyMap();

  return NextResponse.json({
    status: "Company intelligence online",

    generatedAt: new Date().toISOString(),

    overview,

    sections,

    companyModel: {
      commercial: {
        states: commercial.states,
        districts: commercial.districts,
        distributors: commercial.distributors,
        retailers: commercial.retailers,
        skus: commercial.skus,
      },

      operations,

      supply,
    },

    graph,
  });
}