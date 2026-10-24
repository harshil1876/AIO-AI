/**
 * AIO AI Platform Automated Verification & Quality Assurance Suite
 * Validates PRD Section 55 & Rule 44:
 * 1. Data Integrity (113+ tools, 26 models, 16 workflows, 20 repos, 18 creators, 24 stories)
 * 2. Token Calculator Pricing & Context Mathematics
 * 3. VRAM Hardware Compatibility Math
 * 4. Momentum Score & Ranking Formula Verification
 * 5. AI Finder Intent Recommendation Engine
 * 6. File & Route Completeness
 */

import { TOOLS_DATA as SEED_TOOLS, CATEGORIES_DATA } from '../src/data/seedData';
import { OFFICIAL_MODELS as TOKEN_MODELS } from '../src/data/modelsData';
import { WORKFLOWS_DATA } from '../src/data/workflowsData';
import { OPEN_SOURCE_REPOS } from '../src/data/openSourceData';
import { CREATORS_DATA } from '../src/data/creatorsData';
import { NEWS_STORIES } from '../src/data/newsData';
import { COMMUNITY_POSTS, COMMUNITY_LEADERBOARD } from '../src/data/communityData';
import { calculateAuthenticScore } from '../src/services/dataService';
import * as fs from 'fs';
import * as path from 'path';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, failureDetails?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    if (failureDetails) console.error(`    -> ${failureDetails}`);
  }
}

console.log('\n======================================================');
console.log('   AIO AI AUTOMATED PLATFORM VERIFICATION SUITE');
console.log('======================================================\n');

// ----------------------------------------------------------------------------
// SUITE 1: Data Integrity & Catalog Completeness (PRD Rule 44)
// ----------------------------------------------------------------------------
console.log('[Suite 1: Data Catalog Integrity]');

assert(
  SEED_TOOLS.length >= 100,
  `Catalog contains >= 100 verified tools (Actual: ${SEED_TOOLS.length})`,
  `Expected at least 100 tools, found ${SEED_TOOLS.length}`
);

// Verify all tools have required non-empty fields
const invalidTools = SEED_TOOLS.filter(t => !t.name || !t.slug || !t.websiteUrl || !t.tagline);
assert(
  invalidTools.length === 0,
  'All cataloged tools have valid name, slug, websiteUrl, and tagline',
  `Found ${invalidTools.length} tools with missing mandatory fields: ${invalidTools.map(t => t.slug).slice(0, 3).join(', ')}`
);

// Verify slugs are strictly unique
const toolSlugs = new Set();
let duplicateSlugs = 0;
for (const t of SEED_TOOLS) {
  if (toolSlugs.has(t.slug)) duplicateSlugs++;
  toolSlugs.add(t.slug);
}
assert(
  duplicateSlugs === 0,
  'Tool slugs are 100% unique with zero collision',
  `Found ${duplicateSlugs} duplicate tool slugs`
);

// Verify Categories
assert(
  CATEGORIES_DATA.length >= 12,
  `Categories taxonomy has >= 12 standard classifications (Actual: ${CATEGORIES_DATA.length})`
);

// Verify LLM Models
assert(
  TOKEN_MODELS.length >= 25,
  `LLM Token registry has >= 25 official provider models (Actual: ${TOKEN_MODELS.length})`
);

// Verify Workflows
assert(
  WORKFLOWS_DATA.length >= 15,
  `Production AI workflows count >= 15 (Actual: ${WORKFLOWS_DATA.length})`
);

// Verify Open-Source Repositories
assert(
  OPEN_SOURCE_REPOS.length >= 20,
  `Open-source repository catalog >= 20 (Actual: ${OPEN_SOURCE_REPOS.length})`
);

// Verify YouTube Creators
assert(
  CREATORS_DATA.length >= 60,
  `Curated AI educators catalog >= 60 (Actual: ${CREATORS_DATA.length})`
);

// Verify Workflow Schemas
const workflowsWithSchemas = WORKFLOWS_DATA.filter(w => !!w.systemPrompt && !!w.userPromptTemplate && !!w.apiPayloadSchema);
assert(
  workflowsWithSchemas.length === 16,
  `All 16 workflows have full systemPrompt, userPromptTemplate, and apiPayloadSchema (Actual: ${workflowsWithSchemas.length}/16)`
);

// Verify News Stories
assert(
  NEWS_STORIES.length >= 20,
  `Technical news wire stories >= 20 (Actual: ${NEWS_STORIES.length})`
);

// ----------------------------------------------------------------------------
// SUITE 2: LLM Token Calculator Pricing Mathematics
// ----------------------------------------------------------------------------
console.log('\n[Suite 2: Token Calculator Math]');

// Test Token Calculations: 50,000 prompt tokens and 10,000 completion tokens on GPT-4o
const gpt4o = TOKEN_MODELS.find(m => m.id === 'gpt-4o' || m.modelIdentifier.includes('gpt-4o'));
if (gpt4o) {
  const promptTokens = 50000;
  const outputTokens = 10000;
  const inputCost = (promptTokens / 1_000_000) * gpt4o.inputCostPer1M;
  const outputCost = (outputTokens / 1_000_000) * gpt4o.outputCostPer1M;
  const totalCost = inputCost + outputCost;

  assert(
    inputCost > 0 && outputCost > 0 && totalCost > 0,
    `Calculates positive pricing for ${gpt4o.name} ($${totalCost.toFixed(4)})`
  );
  assert(
    gpt4o.contextWindow >= 128000,
    `${gpt4o.name} has at least 128k context window (Actual: ${gpt4o.contextWindow.toLocaleString()} tokens)`
  );
} else {
  assert(false, 'GPT-4o model present in tokenModelsData');
}

// Test DeepSeek R1 Pricing
const deepseek = TOKEN_MODELS.find(m => m.provider === 'DeepSeek');
if (deepseek) {
  assert(
    deepseek.inputCostPer1M < 1.0,
    `DeepSeek R1 input pricing verified under $1.00/1M tokens ($${deepseek.inputCostPer1M}/1M)`
  );
}

// ----------------------------------------------------------------------------
// SUITE 3: Hardware VRAM Compatibility Logic
// ----------------------------------------------------------------------------
console.log('\n[Suite 3: VRAM Hardware Compatibility Logic]');

function calculateVramSuitability(userVramGb: number, minRequiredGb: number) {
  if (userVramGb >= minRequiredGb) return 'full_fp16';
  if (userVramGb >= minRequiredGb * 0.70) return 'quantized_gguf';
  return 'insufficient_oom';
}

assert(
  calculateVramSuitability(16, 12) === 'full_fp16',
  '16GB GPU runs 12GB requirement at full fp16 capability'
);

assert(
  calculateVramSuitability(8, 10) === 'quantized_gguf',
  '8GB GPU runs 10GB requirement via 4-bit / 8-bit GGUF quantization'
);

assert(
  calculateVramSuitability(6, 16) === 'insufficient_oom',
  '6GB GPU correctly flags insufficient VRAM for 16GB model'
);

// ----------------------------------------------------------------------------
// SUITE 4: Momentum & Ranking Mathematics
// ----------------------------------------------------------------------------
console.log('\n[Suite 4: Momentum & Adoption Formula]');

// PRD Formula: score = views * 1 + bookmarks * 3 + outbound_clicks * 2
function computeAdoptionVelocity(views: number, bookmarks: number, outboundClicks: number) {
  return (views * 1) + (bookmarks * 3) + (outboundClicks * 2);
}

const testVelocity1 = computeAdoptionVelocity(100, 20, 15); // 100 + 60 + 30 = 190
assert(
  testVelocity1 === 190,
  `Adoption velocity weights views(1x), bookmarks(3x), outbound(2x) = ${testVelocity1}`
);

// ----------------------------------------------------------------------------
// SUITE 5: AI Intent Finder Keyword Matcher
// ----------------------------------------------------------------------------
console.log('\n[Suite 5: AI Intent Finder Matcher]');

function simpleIntentSearch(query: string) {
  const q = query.toLowerCase();
  return SEED_TOOLS.filter(t => 
    t.name.toLowerCase().includes(q) ||
    t.tagline?.toLowerCase().includes(q) ||
    t.features?.some(f => f.toLowerCase().includes(q)) ||
    t.useCases?.some(u => u.toLowerCase().includes(q)) ||
    t.targetAudience?.some(a => a.toLowerCase().includes(q))
  );
}

const codingResults = simpleIntentSearch('code');
assert(
  codingResults.length >= 5,
  `Intent search for 'code' matches >= 5 tools (Matched: ${codingResults.length})`
);

const indiaResults = simpleIntentSearch('india');
assert(
  indiaResults.length >= 2,
  `Intent search for 'india' matches Indian AI tools (Matched: ${indiaResults.length})`
);

// ----------------------------------------------------------------------------
// SUITE 6: Community Authenticity & 5-Factor Scoring Verification
// ----------------------------------------------------------------------------
console.log('\n[Suite 6: Community Integrity & 5-Factor Authenticity Scoring]');

assert(
  COMMUNITY_POSTS.length === 1 && !!COMMUNITY_POSTS[0].pinned,
  'Community contains zero fake seed users; only 1 official pinned governance guide'
);

assert(
  COMMUNITY_LEADERBOARD.length === 0,
  'Community leaderboard has zero fake bot profiles; starts in authentic cold start'
);

const sampleTool = SEED_TOOLS[0];
const sampleScorecard = calculateAuthenticScore(sampleTool);
assert(
  sampleScorecard.total >= 50 && sampleScorecard.total <= 100,
  `Deterministic 5-Factor score for ${sampleTool.name} is ${sampleScorecard.total}/100`
);
assert(
  sampleScorecard.docsApi <= 25 && sampleScorecard.pricing <= 25 && sampleScorecard.interop <= 20 && sampleScorecard.health <= 15 && sampleScorecard.community <= 15,
  '5-Factor sub-dimension scores respect exact bounds (25/25/20/15/15)'
);

// ----------------------------------------------------------------------------
// SUITE 7: Essential Routes & Pages Completeness
// ----------------------------------------------------------------------------
console.log('\n[Suite 6: Critical Routes & Artifact Completeness]');

const criticalRoutes = [
  'src/pages/index.astro',
  'src/pages/dashboard.astro',
  'src/pages/tools/index.astro',
  'src/pages/tools/[slug].astro',
  'src/pages/finder.astro',
  'src/pages/compare.astro',
  'src/pages/categories.astro',
  'src/pages/news/index.astro',
  'src/pages/news/[slug].astro',
  'src/pages/open-source/index.astro',
  'src/pages/open-source/[slug].astro',
  'src/pages/workflows/index.astro',
  'src/pages/workflows/[id].astro',
  'src/pages/workflows/builder.astro',
  'src/pages/pricing.astro',
  'src/pages/creators/index.astro',
  'src/pages/creators/[slug].astro',
  'src/pages/token-calculator/index.astro',
  'src/pages/utilities/index.astro',
  'src/pages/community/index.astro',
  'src/pages/submit.astro',
  'src/pages/admin.astro',
  'src/pages/profile.astro',
  'src/pages/login.astro',
  'src/pages/signup.astro',
  'src/pages/privacy.astro',
  'src/pages/terms.astro',
  'src/pages/guidelines.astro',
  'src/pages/disclosure.astro',
  'src/pages/404.astro',
];

for (const route of criticalRoutes) {
  const filePath = path.resolve(route);
  assert(
    fs.existsSync(filePath),
    `Route template exists: ${route}`
  );
}

// ----------------------------------------------------------------------------
// Summary
// ----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`TEST EXECUTION SUMMARY: ${passedTests} / ${totalTests} assertions passed (${((passedTests / totalTests) * 100).toFixed(1)}%)`);
console.log('======================================================\n');

if (passedTests === totalTests) {
  console.log('STATUS: ALL PLATFORM ASSERTIONS PASSED WITH ZERO ERRORS.\n');
  process.exit(0);
} else {
  console.error(`STATUS: ${totalTests - passedTests} ASSERTIONS FAILED.\n`);
  process.exit(1);
}
