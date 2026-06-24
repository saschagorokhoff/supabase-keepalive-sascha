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
 * Secrets required (Cloudflare dashboard → Workers → keepalive-sascha → Settings → Variables):
 *   SUPABASE_KEY_CRM   → anon/service_role key for mverztarzypogdyugtei
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
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    return {
      name: project.name,
      status: res.ok ? "OK" : "ERROR",
      httpStatus: res.status,
    };
  } catch (err) {
    return { name: project.name, status: "FAILED", error: err.message };
  }
}

export default {
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

    return new Response(
      JSON.stringify({
        worker: "supabase-keepalive-sascha",
        routes: { "/ping": "Manually trigger keepalive for all projects" },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  },
};
