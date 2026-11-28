import { draftInternationalArticles1 } from "./international-review-1.ts";
import { draftInternationalArticles2 } from "./international-review-2.ts";
import { draftInternationalArticles3 } from "./international-review-3.ts";
import { draftInternationalArticles4 } from "./international-review-4.ts";
import { draftInternationalArticles5 } from "./international-review-5.ts";

// Review-only translations; split into manageable modules.
export const draftInternationalArticles = {
  ...draftInternationalArticles1,
  ...draftInternationalArticles2,
  ...draftInternationalArticles3,
  ...draftInternationalArticles4,
  ...draftInternationalArticles5,
} as const;
