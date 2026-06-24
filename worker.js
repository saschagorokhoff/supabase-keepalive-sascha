/**
 * Supabase Keepalive Worker — Sascha's Account
 * Cloudflare Account: s.w.gorokhoff@gmail.com (2ba539a953b707dc3ca4ff32b1addd25)
 *
 * Pings all Sascha-side Supabase projects every 5 days via cron.
 *
 * Projects covered:
 *   - CRM / GNS        (mverztarzypogdyugtei) — created June 4 2026
 *
 * ADD MORE: duplicate the object in PROJECTS array as new Supabase projects are created.
 *
 * Secrets required (Cloudflare dashboard → Workers → supabase-keepalive-sascha → Settings → Variables):
 *   SUPABASE_KEY_CRM   → SECRET key (sb_secret_...) for mverztarzypogdyugtei
 *                        Get it from: Supabase → Project Settings → API Keys → Secret key
 *                        ⚠️ NOT the publishable key — that will 401 on server endpoints
 *                        ⚠️ Add via Cloudflare dashboard only, never via CLI (Windows paste truncates)
 */

const PROJECTS = [
  {
    name: "CRM / GNS (mverztarzypogdyugtei)",
    url: "https://mverztarzypogdyugtei.supabase.co/rest/v1/",
    secretEnvKey: "SUPABASE_KEY_CRM",
  },
  // Add future Sascha-side projects here:
  // {
  //   name: "Project Name (supabase-id)",
  //   url: "https://SUPABASE_ID.supabase.co/rest/v1/",
  //   secretEnvKey: "SUPABASE_KEY_PROJECTNAME",
  // },
];

async function pingProject(project, env) {
  const apiKey = env[project.secretEnvKey];

  if (!apiKey) {
    return { name: project.name, status: "SKIPPED", reason: "No API key set" };
  }

  try {
    const res = await fetch(project.url, {
      method: "GET",
      headers: {
        apikey: apiKey,           // sb_secret_... in apikey header ONLY
        "Content-Type": "application/json",
        // ⚠️ No Authorization header — new sb_ keys must NOT go in Bearer
      },
    });

    return {
      name: project.name,
      status: res.ok ? "OK" : "ERROR",
      httpStatus: res.status,
      body: res.ok ? undefined : await res.text(),
    };
  } catch (err) {
    return { name: project.name, status: "FAILED", error: err.message };
  }
}

export default {
  // Cron trigger: runs every 5 days at 08:00 UTC
  async scheduled(event, env, ctx) {
    const results = await Promise.all(
      PROJECTS.map((p) => pingProject(p, env))
    );

    console.log("Supabase Keepalive Results:", JSON.stringify(results, null, 2));

    const failures = results.filter((r) => r.status !== "OK" && r.status !== "SKIPPED");
    if (failures.length > 0) {
      console.error("PING FAILURES:", JSON.stringify(failures));
    }
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/ping") {
      const results = await Promise.all(
        PROJECTS.map((p) => pingProject(p, env))
      );

      return new Response(JSON.stringify({ results, timestamp: new Date().toISOString() }, null, 2), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/debug") {
      return new Response(JSON.stringify({
        SUPABASE_KEY_CRM_present: !!env.SUPABASE_KEY_CRM,
        SUPABASE_KEY_CRM_length: env.SUPABASE_KEY_CRM?.length ?? 0,
        SUPABASE_KEY_CRM_preview: env.SUPABASE_KEY_CRM?.substring(0, 10) ?? "MISSING",
      }, null, 2), { headers: { "Content-Type": "application/json" } });
    }

    return new Response(
      JSON.stringify({
        worker: "supabase-keepalive-sascha",
        routes: {
          "/ping": "Manually trigger keepalive for all projects",
          "/debug": "Check if secrets are loaded correctly",
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  },
};
