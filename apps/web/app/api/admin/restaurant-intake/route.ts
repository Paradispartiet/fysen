import { handleRestaurantIntake } from "../../../../lib/restaurant-intake";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<Response> {
  return handleRestaurantIntake(request);
}
