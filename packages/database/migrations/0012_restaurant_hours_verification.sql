ALTER TABLE fysen.restaurant_hours_sources
  ADD COLUMN verification_status text NOT NULL DEFAULT 'verified',
  ADD COLUMN verification_note text,
  ADD COLUMN verification_checked_at date;

ALTER TABLE fysen.restaurant_hours_sources
  ADD CONSTRAINT restaurant_hours_sources_verification_status_check
    CHECK (verification_status IN ('verified', 'provisional', 'unverified')),
  ADD CONSTRAINT restaurant_hours_sources_verification_note_length_check
    CHECK (verification_note IS NULL OR char_length(trim(verification_note)) BETWEEN 1 AND 1000),
  ADD CONSTRAINT restaurant_hours_sources_uncertainty_requires_audit_check
    CHECK (
      verification_status = 'verified'
      OR (verification_note IS NOT NULL AND verification_checked_at IS NOT NULL)
    );
