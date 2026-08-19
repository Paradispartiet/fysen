import { restaurantClaimRequestSchema } from "@fysen/contracts/restaurant-claims";
import { NextResponse } from "next/server";
import { submitRestaurantClaim } from "../../../../../lib/fysen-api";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: "INVALID_JSON" }, { status: 400 });
  }

  const parsed = restaurantClaimRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        code: "INVALID_RESTAURANT_CLAIM",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          code: issue.code,
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  const { slug } = await params;
  try {
    const receipt = await submitRestaurantClaim(slug, parsed.data);
    return NextResponse.json(receipt, { status: 202 });
  } catch {
    return NextResponse.json({ code: "RESTAURANT_CLAIM_API_UNAVAILABLE" }, { status: 502 });
  }
}
