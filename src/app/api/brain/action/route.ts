import { NextRequest, NextResponse } from "next/server";

import {
  BrainActionRequest,
  buildBrainExecutionPreview,
} from "@/services/brain-actions";

/* =========================================================
   SECOND BRAIN → EXECUTION ACTION API

   This endpoint does not mutate production data.

   It resolves a Brain recommendation against the
   deterministic execution model and returns the operating
   object that recommendation would act on.
========================================================= */

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (await request.json()) as Partial<BrainActionRequest>;

    if (
      !body.recommendationId ||
      !body.title
    ) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "recommendationId and title are required.",
        },
        {
          status: 400,
        }
      );
    }

    const actionRequest: BrainActionRequest = {
      recommendationId:
        body.recommendationId,

      title:
        body.title,

      rationale:
        body.rationale,

      owner:
        body.owner,

      expectedImpact:
        body.expectedImpact,

      actionType:
        body.actionType,

      context:
        body.context,
    };

    const preview =
      buildBrainExecutionPreview(
        actionRequest
      );

    return NextResponse.json({
      status: "Second Brain action resolved",

      generatedAt:
        new Date().toISOString(),

      preview,
    });
  } catch {
    return NextResponse.json(
      {
        status: "error",
        message:
          "The Brain could not resolve this action.",
      },
      {
        status: 500,
      }
    );
  }
}