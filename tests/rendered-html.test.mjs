import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../.next/server/app/index.html", import.meta.url), "utf8");
}

test("server-renders the complete 319Junk landing page", async () => {
  const html = await render();
  assert.match(html, /<title>319Junk \| Junk Removal in Eastern &amp; Southeast Iowa<\/title>/i);
  assert.match(html, /You call/);
  assert.match(html, /We haul/);
  assert.match(html, /\$140/);
  assert.match(html, /tel:\+13194616329/);
  assert.match(html, /sms:\+13194616329/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps business data centralized and production metadata configured", async () => {
  const [page, layout, config, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/site-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(config, /NEXT_PUBLIC_CONTACT_EMAIL/);
  assert.match(config, /NEXT_PUBLIC_SITE_URL/);
  assert.match(config, /minimumPrice:\s*140/);
  assert.match(page, /siteConfig\.phoneHref/);
  assert.match(layout, /metadataBase/);
  assert.match(layout, /openGraph/);
  assert.doesNotMatch(page, /SkeletonPreview|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
