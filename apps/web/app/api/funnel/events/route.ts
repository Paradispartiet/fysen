import { conversionEventInputSchema } from "@fysen/contracts";
import { NextResponse } from "next/server";
import { recordConversionEvent } from "../../../../lib/fysen-api";

export async function POST(request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = conversionEventInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ code: "INVALID_CONVERSION_EVENT" }, { status: 400 });
  }

  try {
    const receipt = await recordConversionEvent(parsed.data);
    return NextResponse.json(receipt, { status: 202 });
  } catch {
    return NextResponse.json({ code: "FUNNEL_API_UNAVAILABLE" }, { status: 502 });
  }
}
