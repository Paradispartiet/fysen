export function assertLocalOperatorEnvironment(
  environment: Readonly<Record<string, string | undefined>> = process.env,
): void {
  if (environment.GITHUB_ACTIONS?.trim().toLowerCase() === "true") {
    throw new Error(
      "Privileged Fysen operator commands must not run in GitHub Actions because they may expose claimant PII or one-time setup secrets in logs/artifacts.",
    );
  }
}
