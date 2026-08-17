-- Ninito redirects the official .no entrypoint to order.ninito.com, whose
-- robots.txt disallows the Fysen crawler. The candidate never passed the
-- fail-closed onboarding gate and must not remain as an enabled due source.
DELETE FROM fysen.restaurants
WHERE slug = 'tunco-st-hanshaugen-oslo'
  AND active = false;
