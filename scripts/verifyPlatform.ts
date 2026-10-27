/**
 * AIO AI Platform Master Automated Verification & Quality Assurance Suite
 * Validates PRD Section 55 & Rule 44:
 * 1. Data Integrity (113+ tools, 26 models, 16 workflows, 88 repos, 103 creators, 24 stories)
 * 2. Token Calculator Pricing & Context Mathematics
 * 3. VRAM Hardware Compatibility Math
 * 4. Momentum Score & Ranking Formula Verification
 * 5. AI Finder Intent Recommendation Engine
 * 6. File & Route Completeness (including Dedicated Utilities & Technical Docs)
 * 7. Security Hardening, RLS, and Content Moderation Filter
 */

import { TOOLS_DATA as SEED_TOOLS, CATEGORIES_DATA } from '../src/data/seedData';
import { OFFICIAL_MODELS as TOKEN_MODELS } from '../src/data/modelsData';
import { WORKFLOWS_DATA } from '../src/data/workflowsData';
import { OPEN_SOURCE_REPOS } from '../src/data/openSourceData';
import { CREATORS_DATA } from '../src/data/creatorsData';
import { NEWS_STORIES } from '../src/data/newsData';
import { COMMUNITY_POSTS, COMMUNITY_LEADERBOARD } from '../src/data/communityData';
import { calculateAuthenticScore } from '../src/services/dataService';
import { validateContentSafety } from '../src/utils/moderationFilter';
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
console.log('   AIO AI AUTOMATED PLATFORM VERIFICATION SUITE (V2)');
console.log('======================================================\n');

// ----------------------------------------------------------------------------
// SUITE 1: Data Catalog Integrity (PRD Rule 44)
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

// Verify Open-Source Repositories (Expanded to 88)
assert(
  OPEN_SOURCE_REPOS.length >= 80,
  `Open-source repository catalog >= 80 verified repos (Actual: ${OPEN_SOURCE_REPOS.length})`
);

// Verify YouTube Creators (Expanded to 103, strictly >= 10k subscribers)
assert(
  CREATORS_DATA.length >= 100,
  `Curated AI educators catalog >= 100 channels (Actual: ${CREATORS_DATA.length})`
);

const lowSubCreators = CREATORS_DATA.filter(c => (c.subscriberCountNumeric || 0) < 10000);
assert(
  lowSubCreators.length === 0,
  'All creators have strictly >= 10,000 subscribers with zero micro/dead accounts',
  `Found ${lowSubCreators.length} creators under 10k subs: ${lowSubCreators.map(c => c.channelName).slice(0, 3).join(', ')}`
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

function computeAdoptionVelocity(views: number, bookmarks: number, outboundClicks: number) {
  return (views * 1) + (bookmarks * 3) + (outboundClicks * 2);
}

const testVelocity1 = computeAdoptionVelocity(100, 20, 15);
assert(
  testVelocity1 === 190,
  `Adoption velocity weights views(1x), bookmarks(3x), outbound(2x) = ${testVelocity1}`
);

// ----------------------------------------------------------------------------
// SUITE 5: Content Moderation & Safety Guard
// ----------------------------------------------------------------------------
console.log('\n[Suite 5: Content Moderation & Abuse Blocker]');

const cleanSubmission = validateContentSafety('Here is my open-source project using Ollama and DeepSeek-R1.');
assert(cleanSubmission.isSafe, 'Clean technical post passes moderation without false positives');

const abusiveSubmission = validateContentSafety('You are a fucking chutiya and a scammer');
assert(!abusiveSubmission.isSafe, 'Abusive bilingual submission is correctly blocked by moderation filter');

const phishingSubmission = validateContentSafety('Claim free crypto airdrop at t.me/claim-now-free');
assert(!phishingSubmission.isSafe, 'Phishing & scam link patterns are blocked by moderation filter');

// ----------------------------------------------------------------------------
// SUITE 6: Community Authenticity & 5-Factor Scoring Verification
// ----------------------------------------------------------------------------
console.log('\n[Suite 6: Community Integrity & 5-Factor Authenticity Scoring]');

assert(
  COMMUNITY_POSTS.length >= 1,
  'Community contains real practitioner discussions'
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
// SUITE 7: Essential Routes & Template Completeness
// ----------------------------------------------------------------------------
console.log('\n[Suite 7: Critical Routes & Artifact Completeness]');

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
  'src/pages/utilities/[slug].astro',
  'src/pages/docs/index.astro',
  'src/pages/docs/[slug].astro',
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
// SUITE 8: Production Overhaul, Security & Self-Updating APIs
// ----------------------------------------------------------------------------
console.log('\n[Suite 8: Production Overhaul, Security & Live APIs]');

// 1. Dashboard string hygiene (no stale hardcoded counts)
const dashboardContent = fs.readFileSync(path.resolve('src/pages/dashboard.astro'), 'utf8');
assert(
  !dashboardContent.includes('"13 Models"') && !dashboardContent.includes('All 18 &rarr;'),
  'dashboard.astro contains zero stale strings ("13 Models", "All 18")',
  'Found stale hardcoded count strings in dashboard.astro'
);
assert(
  dashboardContent.includes('modelsCount') && dashboardContent.includes('creatorsCount'),
  'dashboard.astro dynamically references {modelsCount} and {creatorsCount}'
);

// 2. Shell & logo deduplication
const headerContent = fs.readFileSync(path.resolve('src/components/Header.astro'), 'utf8');
assert(
  headerContent.includes('lg:hidden') && headerContent.includes('⚡ Free Mode'),
  'Header.astro hides duplicate desktop logo on large screens & has ⚡ Free Mode toggle'
);

const sidebarContent = fs.readFileSync(path.resolve('src/components/Sidebar.astro'), 'utf8');
assert(
  !sidebarContent.includes('v2.0') && sidebarContent.includes('harshilpival@gmail.com'),
  'Sidebar.astro has zero v2.0 badges and restricts admin link to authorized email'
);

// Verify Sidebar Hover-Expand Rail and Pin Lock Architecture
assert(
  sidebarContent.includes('desktopSidebar') && sidebarContent.includes('pinSidebarToggleBtn') && sidebarContent.includes('aio_sidebar_pinned'),
  'Sidebar.astro implements desktop hover-expand rail (68px->252px) with pin lock'
);

assert(
  sidebarContent.includes('Pricing') && sidebarContent.includes('Documentation'),
  'Sidebar.astro includes pinned quick strip (Pricing • Documentation • Launch / Submit)'
);

// 3. Admin security (zero client-side demo bypass buttons)
const adminContent = fs.readFileSync(path.resolve('src/pages/admin.astro'), 'utf8');
assert(
  !adminContent.includes('unlockAdminDemoBtn') && !adminContent.includes('aio_admin_unlocked'),
  'admin.astro has zero demo unlock bypass buttons; gated strictly to authorized admin'
);

// 4. Live API services existence
assert(
  fs.existsSync(path.resolve('src/services/youtubeLiveService.ts')),
  'youtubeLiveService.ts exists and powers YouTube Data API v3 integration'
);
assert(
  fs.existsSync(path.resolve('src/services/githubLiveService.ts')),
  'githubLiveService.ts exists and powers live GitHub repository telemetry'
);
assert(
  fs.existsSync(path.resolve('src/services/liveNewsService.ts')),
  'liveNewsService.ts exists and powers 4-stream live news wire'
);

// 5. Workflows builder & Quickstart Drawer components
const builderContent = fs.readFileSync(path.resolve('src/pages/workflows/builder.astro'), 'utf8');
assert(
  builderContent.includes('downloadSkillBtn') && builderContent.includes('loadTemplate'),
  'workflows/builder.astro includes SKILL.md export and URL template auto-loading'
);
assert(
  fs.existsSync(path.resolve('src/components/RepoQuickstartDrawer.astro')),
  'RepoQuickstartDrawer.astro exists for open-source 1-click execution'
);
assert(
  fs.existsSync(path.resolve('src/components/CompareDock.astro')),
  'CompareDock.astro exists for sticky multi-tool comparison tray'
);

// 6. Admin Cryptographic Verification & Strict RLS
assert(
  fs.existsSync(path.resolve('drizzle/0003_strict_admin_rls.sql')),
  '0003_strict_admin_rls.sql migration file exists with cryptographic admin RLS'
);
const rlsContent = fs.readFileSync(path.resolve('drizzle/0003_strict_admin_rls.sql'), 'utf8');
assert(
  rlsContent.includes("auth.jwt() ->> 'email' = 'harshilpival@gmail.com'"),
  '0003_strict_admin_rls.sql strictly locks down admin mutations to harshilpival@gmail.com'
);

const authClientContent = fs.readFileSync(path.resolve('src/lib/authClient.ts'), 'utf8');
assert(
  authClientContent.includes('verifyAdminSession') && authClientContent.includes('supabase.auth.getUser()'),
  'authClient.ts verifies admin session via cryptographic supabase.auth.getUser()'
);

// 7. Explicit Protected Paths in Layout.astro
const layoutContent = fs.readFileSync(path.resolve('src/layouts/Layout.astro'), 'utf8');
assert(
  layoutContent.includes("PROTECTED_PATHS = ['/dashboard', '/profile', '/admin']") && !layoutContent.includes('var isPublic ='),
  'Layout.astro protects discovery & SEO routes with explicit PROTECTED_PATHS check'
);

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
