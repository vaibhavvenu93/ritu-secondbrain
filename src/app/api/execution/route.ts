import { NextResponse } from "next/server";

import {
  getBrainOriginatedWork,
  getCommitmentControl,
  getDecisionControl,
  getExecutionMDAttention,
  getExecutionPriorityQueue,
  getExecutionSummary,
  getObjectivePortfolio,
} from "@/services/execution";

export async function GET() {
  return NextResponse.json({
    status: "Execution online",

    generatedAt:
      new Date().toISOString(),

    summary:
      getExecutionSummary(),

    mdAttention:
      getExecutionMDAttention(),

    objectives:
      getObjectivePortfolio(),

    priorityQueue:
      getExecutionPriorityQueue(),

    commitments:
      getCommitmentControl(),

    decisions:
      getDecisionControl(),

    brainOriginated:
      getBrainOriginatedWork(),
  });
}