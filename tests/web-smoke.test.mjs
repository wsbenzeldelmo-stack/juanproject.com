import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("JUAN Web hands ordering to JUAN PROJECT Online", () => {
  assert.match(html, /Order Online/);
  assert.match(html, /https:\/\/juan-project-online-juan-codes\.vercel\.app\//);
  assert.doesNotMatch(html, />Cart <span class="cart-badge"/);
  assert.match(html, /function addToCart\(name, price\)\s*\{\s*openJuanOnline\(name\);/);
});

test("JUAN Web includes Workspace-managed flyer and survey surface", () => {
  assert.match(html, /id="web-campaigns"/);
  assert.match(html, /id="webCampaignsGrid"/);
  assert.match(html, /function loadWebCampaigns\(\)/);
  assert.match(html, /channel=eq\.web/);
  assert.match(html, /function renderWebSurvey\(campaign\)/);
});

test("public survey submissions use the dedicated response table", () => {
  assert.match(html, /web_survey_responses/);
  assert.match(html, /promotion_id: promotionId/);
  assert.match(html, /visitor_id: surveyVisitorId\(\)/);
  assert.match(html, /Please answer at least one question/);
  assert.match(html, /already responded to this survey/);
});

test("Web remains a discovery and quick-pricing surface", () => {
  assert.match(html, /Explore Pricing/);
  assert.match(html, /See Portfolio/);
  assert.match(html, /Online Flyers:/);
  assert.match(html, /Ordering and client account tools now live in the dedicated Online experience/);
});


test("Web quick pricelist reads the Workspace-managed Supabase catalog", () => {
  assert.match(html, /id="webPackagesGrid"/);
  assert.match(html, /id="webPricelistBody"/);
  assert.match(html, /function loadWebCatalog\(\)/);
  assert.match(html, /catalog_packages\?select=/);
  assert.match(html, /catalog_package_items\?select=/);
  assert.match(html, /catalog_services\?select=/);
  assert.match(html, /loadWebCatalog\(\);/);
});
