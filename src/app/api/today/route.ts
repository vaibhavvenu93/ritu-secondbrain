import {
  getStartMyDayBrief,
  getTodayAttention,
  getTodayCounts,
  getTodayHeadline,
  getTodayPulse,
} from "@/services/today";

export async function GET() {
  return Response.json({
    status: "Today briefing online",

    generatedAt: new Date().toISOString(),

    headline: getTodayHeadline(),

    counts: getTodayCounts(),

    pulse: getTodayPulse(),

    attention: getTodayAttention(),

    startMyDay: getStartMyDayBrief(),
  });
}