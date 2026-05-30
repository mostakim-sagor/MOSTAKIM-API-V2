import { json } from "@sveltejs/kit";
import { getCommit, getBranch, getRemote, getVersion } from "@mostakim-dl/version-info";

const safeGet = async (fn: () => Promise<string>, fallback = "unknown") => {
    try {
        const result = await fn();
        return result ?? fallback;
    } catch {
        return fallback;
    }
};

export async function GET() {
    return json({
        commit:  await safeGet(getCommit),
        branch:  await safeGet(getBranch),
        remote:  await safeGet(getRemote),
        version: await safeGet(getVersion, "2.0.0"),
    });
}

// do not prerender — git info is unavailable on static hosts (Render, Vercel).
// web/static/version.json acts as the static fallback.
export const prerender = false;
