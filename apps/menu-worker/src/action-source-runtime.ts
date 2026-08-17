import { HttpMenuClient, type MenuHttpFetchResult } from "./http-client.js";

export interface ActionHttpClient {
  fetchSource(source: {
    readonly url: string;
    readonly userAgent: string;
    readonly etag: null;
    readonly lastModified: null;
  }): Promise<MenuHttpFetchResult>;
}

export interface ActionSourceVerification {
  readonly url: string;
  readonly httpStatus: number;
  readonly fetchedAt: string;
}

export async function verifyActionSource(
  input: { readonly url: string; readonly userAgent: string },
  client: ActionHttpClient = new HttpMenuClient(),
): Promise<ActionSourceVerification> {
  const response = await client.fetchSource({
    url: input.url,
    userAgent: input.userAgent,
    etag: null,
    lastModified: null,
  });
  if (response.kind === "not_modified") {
    throw new Error(`Action verification unexpectedly returned HTTP 304 for ${input.url}`);
  }
  return {
    url: input.url,
    httpStatus: response.status,
    fetchedAt: response.fetchedAt,
  };
}
