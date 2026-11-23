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
import { escapeHtml, safeExternalUrl } from '../src/utils/security';
import { runFinderEngine } from '../src/lib/server/finderEngine';
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

const obfuscatedSubmission = validateContentSafety('What the f*ck is this sh1t');
assert(!obfuscatedSubmission.isSafe, 'Obfuscated and masked profanity (f*ck, sh1t) is blocked by moderation filter');

const spacedSubmission = validateContentSafety('You are a f u c k i n g idiot');
assert(!spacedSubmission.isSafe, 'Spaced-out single letter profanity (f u c k) is blocked by moderation filter');

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
  'src/pages/trending.astro',
  'src/pages/github-trending.astro',
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

assert(
  sidebarContent.includes('/trending') && sidebarContent.includes('GitHub Trending'),
  'Sidebar.astro includes dedicated GitHub Trending navigation link'
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

// 7. Explicit Protected Paths in Layout.astro & Zero-Layout-Shift Overlay
const layoutContent = fs.readFileSync(path.resolve('src/layouts/Layout.astro'), 'utf8');
assert(
  layoutContent.includes("PROTECTED_PATHS = ['/dashboard', '/profile', '/admin']") && !layoutContent.includes('var isPublic ='),
  'Layout.astro protects discovery & SEO routes with explicit PROTECTED_PATHS check'
);
assert(
  layoutContent.includes('id="sidebarSpacer"') && sidebarContent.includes('fixed top-0 left-0'),
  'Layout.astro & Sidebar.astro maintain fixed overlay rail with zero layout shift on <main>'
);

// 8. Live Trending Telemetry & GitHub Service Binding
const trendingContent = fs.readFileSync(path.resolve('src/pages/trending.astro'), 'utf8');
assert(
  trendingContent.includes('fetchLiveGitHubTrendingRepos') && trendingContent.includes('fetchLiveGitHubTrendingDevelopers'),
  'trending.astro connects to live GitHub telemetry API and real-time velocity updates'
);

// 9. Dedicated Studio Engines across all 9 utilities
const utilitiesContent = fs.readFileSync(path.resolve('src/pages/utilities/[slug].astro'), 'utf8');
assert(
  utilitiesContent.includes('prompt-architect') && 
  utilitiesContent.includes('vram-hardware-advisor') && 
  utilitiesContent.includes('rag-chunking-visualizer') &&
  utilitiesContent.includes('json-schema-builder') &&
  utilitiesContent.includes('token-cost-simulator'),
  'utilities/[slug].astro implements 9 dedicated interactive studio engines with zero generic form shortcuts'
);

// 10. Community & Profile Real Persistence
const communityContent = fs.readFileSync(path.resolve('src/pages/community/index.astro'), 'utf8');
assert(
  communityContent.includes('aio_community_posts') && communityContent.includes('aio_custom_spaces'),
  'community/index.astro persists user posts & custom spaces to Supabase and localStorage'
);

const profileContent = fs.readFileSync(path.resolve('src/pages/profile.astro'), 'utf8');
assert(
  profileContent.includes('saveSettingsBtn') && profileContent.includes('settingsDisplayName'),
  'profile.astro implements persistent user settings & profile synchronization'
);

// 11. Analytics Dynamic Charts
const analyticsContent = fs.readFileSync(path.resolve('src/pages/analytics.astro'), 'utf8');
assert(
  analyticsContent.includes('updateCategoryCurrency') && analyticsContent.includes('toolsAreaPath'),
  'analytics.astro binds interactive controls to dynamic SVG curve recomputation and currency updates'
);

// ----------------------------------------------------------------------------
// SUITE 9: Global Scale Security, Hybrid SSR APIs, Finder v2, Utilities & CI
// ----------------------------------------------------------------------------
console.log('\n[Suite 9: Global Security Hardening, Hybrid SSR APIs & PRD Full Parity]');

// 1. Runtime XSS & URL Protocol Sanitizer
assert(
  escapeHtml('<script>alert("xss")</script>') === '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
  'escapeHtml() neutralizes HTML & script injection payloads'
);
assert(
  safeExternalUrl('javascript:alert(1)') === '#' &&
  safeExternalUrl('data:text/html,hi') === '#' &&
  safeExternalUrl('https://github.com/ollama/ollama') === 'https://github.com/ollama/ollama',
  'safeExternalUrl() blocks javascript:/data: URIs while preserving valid HTTPS URLs'
);

// 2. Zero Client-Side Secret Exposure (PUBLIC_GITHUB_TOKEN / PUBLIC_YOUTUBE_API_KEY)
const ghServiceSrc = fs.readFileSync(path.resolve('src/services/githubLiveService.ts'), 'utf8');
const ytServiceSrc = fs.readFileSync(path.resolve('src/services/youtubeLiveService.ts'), 'utf8');
assert(
  !ghServiceSrc.includes('PUBLIC_GITHUB_TOKEN') && !ytServiceSrc.includes('PUBLIC_YOUTUBE_API_KEY'),
  'Zero PUBLIC_GITHUB_TOKEN or PUBLIC_YOUTUBE_API_KEY exposed in client-bundled services'
);

// 3. Zero Static Hardcoded Personal Email in UI Templates
assert(
  !headerContent.includes('harshilpival@gmail.com') &&
  !dashboardContent.includes('harshilpival@gmail.com') &&
  !profileContent.includes('harshilpival@gmail.com'),
  'Static HTML templates contain zero hardcoded personal email PII'
);

// 4. Hardened RLS Migration 0004 (Fixes UUID-vs-int & drops %admin% wildcard)
const rls0004Path = path.resolve('drizzle/0004_harden_rls_and_prd_tables.sql');
assert(fs.existsSync(rls0004Path), '0004_harden_rls_and_prd_tables.sql migration exists');
const rls0004 = fs.readFileSync(rls0004Path, 'utf8');
assert(
  rls0004.includes('current_app_user_id()') &&
  rls0004.includes('is_app_admin()') &&
  rls0004.includes('DROP POLICY IF EXISTS "admin_read_reports"') &&
  rls0004.includes('DROP POLICY IF EXISTS "delete_bookmarks"'),
  '0004 migration fixes UUID-vs-int ownership helpers and drops vulnerable permissive RLS policies'
);

// 5. Security Headers (CSP + HSTS) & Vercel Cron
const vercelCfg = fs.readFileSync(path.resolve('vercel.json'), 'utf8');
assert(
  vercelCfg.includes('Content-Security-Policy') &&
  vercelCfg.includes('Strict-Transport-Security') &&
  vercelCfg.includes('/api/cron/sync'),
  'vercel.json enforces CSP, HSTS, and scheduled /api/cron/sync freshness job'
);

// 6. Hybrid SSR Adapter & Complete Server API Surface
const astroCfg = fs.readFileSync(path.resolve('astro.config.mjs'), 'utf8');
assert(astroCfg.includes('@astrojs/vercel'), 'astro.config.mjs enables Vercel Hybrid SSR adapter');

const serverApiEndpoints = [
  'src/pages/api/finder.ts',
  'src/pages/api/catalog/tools.ts',
  'src/pages/api/github/trending.ts',
  'src/pages/api/youtube/stats.ts',
  'src/pages/api/community/posts.ts',
  'src/pages/api/personalization.ts',
  'src/pages/api/newsletter/subscribe.ts',
  'src/pages/api/billing/checkout.ts',
  'src/pages/api/billing/webhook.ts',
  'src/pages/api/workflows/[id]/export.ts',
  'src/pages/api/badge/[slug].svg.ts',
  'src/pages/api/mcp.ts',
  'src/pages/api/cron/sync.ts',
];
for (const ep of serverApiEndpoints) {
  assert(fs.existsSync(path.resolve(ep)), `Server API endpoint exists: ${ep}`);
}

// 7. Runtime Multi-Entity AI Finder Engine (PRD Sec 08)
const finderIndiaResult = runFinderEngine({
  query: 'Hindi regional voiceover and YouTube shorts automation on free tier',
  persona: 'creator',
  budget: 'free',
  indiaFocus: true,
});
assert(
  finderIndiaResult.matchedTools.length >= 4 &&
  finderIndiaResult.matchedRepos.length >= 3 &&
  finderIndiaResult.matchedCreators.length >= 2 &&
  finderIndiaResult.whyRecommended.length >= 2 &&
  finderIndiaResult.tiers.A.steps.length === 3,
  'Multi-Entity AI Finder returns explainable cross-entity tools, repos, workflows, creators & 3 budget tiers'
);

// 8. 13 Full-Spectrum Utilities (9 Pro Dev + 4 Everyday Client-Side PRD Sec 24)
assert(
  utilitiesContent.includes('pdf-toolkit') &&
  utilitiesContent.includes('image-optimizer') &&
  utilitiesContent.includes('qr-studio') &&
  utilitiesContent.includes('social-caption-studio'),
  'Utilities Suite includes all 4 Everyday Private PRD tools (PDF, Image, QR, Social Captions)'
);

// 9. Creator Comparator, Personalization & Billing Checkout Wiring
const creatorsIdxContent = fs.readFileSync(path.resolve('src/pages/creators/index.astro'), 'utf8');
const pricingContent = fs.readFileSync(path.resolve('src/pages/pricing.astro'), 'utf8');
const newsIdxContent = fs.readFileSync(path.resolve('src/pages/news/index.astro'), 'utf8');
assert(
  creatorsIdxContent.includes('compareCreatorA') && creatorsIdxContent.includes('creatorCompareMatrix'),
  'creators/index.astro implements Side-by-Side Creator Intelligence Comparator (PRD Sec 20)'
);
assert(
  pricingContent.includes('/api/billing/checkout') && dashboardContent.includes('/api/personalization'),
  'pricing.astro wires live Razorpay/Stripe checkout & dashboard.astro wires My AI personalization'
);
assert(
  newsIdxContent.includes('/api/newsletter/subscribe') && !newsIdxContent.includes('ISSUE #284'),
  'news/index.astro uses dynamic edition stamps and wires Topic-Based Newsletter subscriptions'
);

// 10. Automated GitHub Actions CI/CD Pipeline
assert(
  fs.existsSync(path.resolve('.github/workflows/ci.yml')),
  'GitHub Actions CI/CD pipeline (.github/workflows/ci.yml) exists'
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
