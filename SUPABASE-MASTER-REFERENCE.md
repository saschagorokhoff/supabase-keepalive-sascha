# Supabase Master Reference
*Last updated: June 24, 2026*
*This is the single source of truth for all Supabase accounts, projects, and keepalive status.*

---

## Account 1 — Sascha (GitHub login)
**Login:** GitHub → `s.w.gorokhoff@gmail.com`

| Project | Ref ID | URL | Status |
|---------|--------|-----|--------|
| Sascha Leadership | `qfmmmbwvuvewafwwdifr` | https://qfmmmbwvuvewafwwdifr.supabase.co | Empty, ready for saschagorokhoff.com ecosystem |

**Keepalive Worker:** `supabase-keepalive-sascha` (Sascha's Cloudflare)
**Secret var:** `SUPABASE_KEY_SASCHA_LEADERSHIP`

---

## Account 2 — Gemma Main (GitHub login)
**Login:** GitHub → `gorokhoff.gemma@gmail.com`

| Project | Ref ID | URL | Status |
|---------|--------|-----|--------|
| PRS Main + LinkedIn AI Agent + Mailer + Forge | `jjeqijptbfutrziykoff` | https://jjeqijptbfutrziykoff.supabase.co | Active — main production DB |
| Paradise Valley Life (PV App) | `rrpudrznkwfqwcqlbfdx` | https://rrpudrznkwfqwcqlbfdx.supabase.co | Active |

**Keepalive Worker:** `supabase-keepalive-gemma` (Gemma's Cloudflare)
**Secret vars:** `SUPABASE_KEY_PRS`, `SUPABASE_KEY_PV`

---

## Account 3 — Gemma CRM
**Login:** `gemma@prs.gemmaserenity.com`
**GitHub:** `gemmaserenity/Claude-Code-Cloud`

| Project | Ref ID | URL | Deployed site |
|---------|--------|-----|---------------|
| CRM (unified inbox: email, WhatsApp, SMS, LinkedIn, web form) | `mverztarzypogdyugtei` | https://mverztarzypogdyugtei.supabase.co | https://crm.gemmaserenity.com |

**Access:** Cloudflare Zero Trust magic link — works on `gemma@prs.gemmaserenity.com` only
**Keepalive:** Has its own ping every 15 min — no worker needed
**Future:** Wire all services under one authentication → all-in-one in-house CRM (replace GoHighLevel)
**Note:** Nothing to do with GNS. GNS may be revived for the online community project (VANTHARI).

---

## Account 4 — The Manifesting Queen
**Login:** `gemmathemanifestingqueen@gmail.com`

| Project | Ref ID | URL | Status |
|---------|--------|-----|--------|
| vault_tmq | `lfnbieuxckocweiiqtbn` | https://lfnbieuxckocweiiqtbn.supabase.co | Active — TMQ course membership area |

**Keepalive Worker:** `supabase-keepalive-gemma` (Gemma's Cloudflare)
**Secret var:** `SUPABASE_KEY_VAULT_TMQ`
**Priority:** Finish wiring the entire online course membership area ← still needs to get done!

---

## Account 5 — WinWin / Household (gemser111)
**Login:** `gemser111@gmail.com`

| Project | Ref ID | URL | Deployed site |
|---------|--------|-----|---------------|
| WinWin — Food for Tech | `dqcdxwhgsodumwbwwcki` | https://dqcdxwhgsodumwbwwcki.supabase.co | https://winwin.gemmaserenity.com |

**What it is:** HELP Outreach tracker — food banks, churches, pet rescue orgs, personal contacts helping financially/materially during transition after JJ left.
**Keepalive:** ⚠️ NOT yet in any worker — needs to be added to `supabase-keepalive-gemma`
**Future projects on this account:**
- Household financial tracking (bills table + business bills table)
- Potentially full accounting system in Supabase instead of QuickBooks
  *(Gemma is a former tax accountant — full in-house accounting is very doable)*

---

## Keepalive Worker Summary

### supabase-keepalive-gemma (Gemma's Cloudflare `gorokhoff.gemma@gmail.com`)
| Secret var | Project | Account |
|------------|---------|---------|
| `SUPABASE_KEY_VAULT_TMQ` | vault_tmq | gemmathemanifestingqueen@gmail.com |
| `SUPABASE_KEY_PRS` | PRS Main | GitHub Gemma |
| `SUPABASE_KEY_PV` | Paradise Valley | GitHub Gemma |
| `SUPABASE_KEY_WINWIN` | WinWin | gemser111@gmail.com ← **TO ADD** |

### supabase-keepalive-sascha (Sascha's Cloudflare `s.w.gorokhoff@gmail.com`)
| Secret var | Project | Account |
|------------|---------|---------|
| `SUPABASE_KEY_SASCHA_LEADERSHIP` | Sascha Leadership | GitHub Sascha |

### Self-managed (no worker needed)
| Project | Reason |
|---------|--------|
| CRM (`mverztarzypogdyugtei`) | Has its own ping every 15 min |

---

## Future Supabase Projects (Ideas)
- Household + business financial tracking → `gemser111` account
- Full in-house accounting system (Gemma is a former tax accountant!)
- VANTHARI / online community backend → TBD account
