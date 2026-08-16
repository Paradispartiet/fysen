import { lookup } from "node:dns/promises";
import ipaddr from "ipaddr.js";

export interface ResolvedAddress {
  readonly address: string;
}

export type HostResolver = (hostname: string) => Promise<readonly ResolvedAddress[]>;

export class UnsafeUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsafeUrlError";
  }
}

export function isPublicIpAddress(value: string): boolean {
  try {
    return ipaddr.parse(value).range() === "unicast";
  } catch {
    return false;
  }
}

export const resolvePublicHost: HostResolver = async (hostname) =>
  lookup(hostname, { all: true, verbatim: true });

export async function assertPublicHttpUrl(
  value: string | URL,
  resolver: HostResolver = resolvePublicHost,
): Promise<URL> {
  const url = value instanceof URL ? new URL(value.href) : new URL(value);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new UnsafeUrlError(`Unsupported URL protocol: ${url.protocol}`);
  }
  if (url.username || url.password) {
    throw new UnsafeUrlError("Crawler URLs must not contain credentials");
  }

  if (ipaddr.isValid(url.hostname)) {
    if (!isPublicIpAddress(url.hostname)) {
      throw new UnsafeUrlError(`Blocked non-public IP address: ${url.hostname}`);
    }
    return url;
  }

  const addresses = await resolver(url.hostname);
  if (addresses.length === 0) {
    throw new UnsafeUrlError(`Hostname did not resolve: ${url.hostname}`);
  }
  const unsafe = addresses.find((candidate) => !isPublicIpAddress(candidate.address));
  if (unsafe) {
    throw new UnsafeUrlError(`Hostname resolves to a non-public address: ${unsafe.address}`);
  }

  return url;
}
