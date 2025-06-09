/**
 * Utility function to extract the WORKSPACE_ID from a URL,
 * returning only the 'ws-' portion
 */

export function getWorkspaceId(url: string): string | null {
  const regex = /workspaces-(ws-[a-z0-9]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

/**
 * Converts a full URL into the workspace base URL by removing the port and 'port' prefix.
 */
export function getWorkspaceBaseUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    const cleanedHost = hostname.replace(/^port\d+-/, "");

    return `${parsedUrl.protocol}//${cleanedHost}/`;
  } catch (e) {
    console.error("Invalid URL:", e);
    return null;
  }
}

/**
 * Converts a full URL into the H20 url.
 */
export function getH2OUrl(url: string): string | null {
  console.log("getH2OUrl called with:", url);
  return "https://bas-extensions.stg10cf.int.applicationstudio.cloud.sap";
}

/**
 * Builds the chat panel iframe URL. Temporary method.
 */
export function buildChatPanelUrl(baseUrl: string, prompt: string): string | null {
  try {
    const parsedUrl = new URL(baseUrl);
    const originalHost = parsedUrl.hostname;

    const portPrefixedHost = /^port10126-/.test(originalHost) ? originalHost : `port10126-${originalHost}`;

    parsedUrl.hostname = portPrefixedHost;
    parsedUrl.searchParams.set("prompt", prompt);

    return parsedUrl.toString();
  } catch (err) {
    console.error("Error building chat panel URL:", err);
    return null;
  }
}
