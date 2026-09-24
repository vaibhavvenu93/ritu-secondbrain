import { NextRequest, NextResponse } from "next/server";

import {
  askSecondBrain,
  brainDemoQuestions,
  type BrainQueryContext,
} from "@/services/second-brain";

/* =========================================================
   SECOND BRAIN QUERY API

   GET
   /api/brain/query?q=Why%20is%20Bihar%20behind%20plan?

   Optional context:
   &page=company
   &entityId=state-bihar
   &section=commercial

   POST
   {
     "query": "Why is Bihar behind plan?",
     "context": {
       "page": "company",
       "entityId": "state-bihar"
     }
   }
========================================================= */

export async function GET(request: NextRequest) {
  const searchParams =
    request.nextUrl.searchParams;

  const query =
    searchParams.get("q")?.trim();

  /*
   * Opening the endpoint without a query gives us
   * a small discovery payload instead of an error.
   */
  if (!query) {
    return NextResponse.json({
      status: "Second Brain online",

      generatedAt:
        new Date().toISOString(),

      engine:
        "deterministic-company-brain",

      examples:
        brainDemoQuestions,

      usage: {
        method: "GET",
        endpoint:
          "/api/brain/query?q=Why%20is%20Bihar%20behind%20plan?",
      },
    });
  }

  const context: BrainQueryContext = {
    page:
      searchParams.get("page") ??
      undefined,

    entityId:
      searchParams.get("entityId") ??
      undefined,

    section:
      searchParams.get("section") ??
      undefined,
  };

  try {
    const result =
      askSecondBrain(
        query,
        context
      );

    return NextResponse.json({
      status:
        "Second Brain response",

      generatedAt:
        new Date().toISOString(),

      ...result,
    });
  } catch (error) {
    console.error(
      "Second Brain GET error:",
      error
    );

    return NextResponse.json(
      {
        status:
          "Second Brain error",

        message:
          "The Brain could not complete this query.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST

   This is what the floating assistant will eventually use.
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      await request.json();

    const query =
      typeof body.query === "string"
        ? body.query.trim()
        : "";

    if (!query) {
      return NextResponse.json(
        {
          status:
            "Invalid query",

          message:
            "A query is required.",
        },
        {
          status: 400,
        }
      );
    }

    const context: BrainQueryContext =
      body.context &&
      typeof body.context === "object"
        ? {
            page:
              typeof body.context
                .page === "string"
                ? body.context.page
                : undefined,

            entityId:
              typeof body.context
                .entityId === "string"
                ? body.context
                    .entityId
                : undefined,

            section:
              typeof body.context
                .section === "string"
                ? body.context
                    .section
                : undefined,
          }
        : {};

    const result =
      askSecondBrain(
        query,
        context
      );

    return NextResponse.json({
      status:
        "Second Brain response",

      generatedAt:
        new Date().toISOString(),

      ...result,
    });
  } catch (error) {
    console.error(
      "Second Brain POST error:",
      error
    );

    return NextResponse.json(
      {
        status:
          "Second Brain error",

        message:
          "The Brain could not complete this query.",
      },
      {
        status: 500,
      }
    );
  }
}