/**
 * React Native reports logical screen width in density-independent points.
 * The breakpoint tracks the available viewport (including iPad split view),
 * not Platform.OS or a device model.
 */
export function isWideLayout(viewportWidth: number): boolean {
  return Number.isFinite(viewportWidth) && viewportWidth >= 760;
}
