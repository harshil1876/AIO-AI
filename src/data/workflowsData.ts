export interface WorkflowStep {
  title: string;
  desc: string;
  toolSlug?: string;
  toolName?: string;
  type: 'Trigger' | 'AI Model' | 'Transformation' | 'Output' | 'Logic' | 'Storage';
  promptTemplate?: string;
  inputFormat?: string;
  outputFormat?: string;
}

export interface BudgetVariant {
  name: string;
  stack: string[];
  costUsd: string;
  costInr: string;
  summary: string;
  pros: string;
  cons: string;
}

export interface WorkflowItem {
  id: string;
  title: string;
  goal: string;
  category: 'Content Creation' | 'Engineering & DevOps' | 'Customer Support' | 'Sales & Marketing' | 'Enterprise & Data' | 'Research & Academic' | 'Design & Media';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  estimatedCost: string;
  toolsUsed: { name: string; slug: string }[];
  steps: WorkflowStep[];
  output: string;
  credentialsNeeded: string[];
  systemPromptSnippet: string;
  systemPrompt?: string;
  userPromptTemplate?: string;
  apiPayloadSchema?: Record<string, any>;
  troubleshootingTips: string[];
  budgetVariants: {
    free: BudgetVariant;
    freemium: BudgetVariant;
    paid: BudgetVariant;
  };
  relatedCreatorSlugs: string[];
}

export const WORKFLOWS_DATA: WorkflowItem[] = [
  {
    id: 'shorts-creator-pipeline',
    title: 'Faceless YouTube Shorts & Reels Automation Pipeline',
    goal: 'Generate 5 high-engagement vertical short videos per day from trending topics without manual filming.',
    category: 'Content Creation',
    difficulty: 'Intermediate',
    time: '25 mins setup',
    estimatedCost: '~$17/mo (Freemium) or $0 (Local Open-Source)',
    toolsUsed: [
      { name: 'ChatGPT', slug: 'chatgpt' },
      { name: 'ElevenLabs', slug: 'elevenlabs' },
      { name: 'Runway', slug: 'runway' },
      { name: 'n8n', slug: 'n8n' }
    ],
    budgetVariants: {
      free: {
        name: '100% Free / Self-Hosted',
        stack: ['Ollama (Llama 3.3)', 'Kokoro TTS (Local)', 'ComfyUI (FLUX Schnell)', 'n8n (Self-Hosted)'],
        costUsd: '$0 / month',
        costInr: '₹0 / month',
        summary: 'Runs entirely on local GPU without any external cloud subscriptions or API fees.',
        pros: 'Zero recurring cost, unlimited generations, 100% data privacy.',
        cons: 'Requires 16GB+ VRAM GPU and initial local setup time.'
      },
      freemium: {
        name: 'Freemium Hybrid Stack',
        stack: ['Claude 3.5 Haiku', 'ElevenLabs (Free tier)', 'Pika / InVideo', 'n8n Cloud Starter'],
        costUsd: '~$15 - $20 / month',
        costInr: '₹1,250 - ₹1,700 / month',
        summary: 'Uses lightweight API tokens for scripts and starter voice allocation.',
        pros: 'Ultra-fast setup, professional voice quality, runs in the cloud.',
        cons: 'Limited to ~30 video voiceovers per month before upgrading voice tier.'
      },
      paid: {
        name: 'Paid Production SaaS',
        stack: ['OpenAI GPT-4o API', 'ElevenLabs Pro', 'Runway Gen-3 Alpha', 'Make Enterprise'],
        costUsd: '~$95 / month',
        costInr: '₹7,900 / month',
        summary: 'High-throughput enterprise setup producing 150+ 4K videos monthly.',
        pros: 'Maximum cinematic quality, instant cloud rendering, priority API bandwidth.',
        cons: 'Ongoing SaaS commitment required.'
      }
    },
    steps: [
      {
        title: 'Trending Topic Discovery',
        desc: 'Polls Google Trends or Reddit API for viral topics matching your channel niche.',
        type: 'Trigger',
        inputFormat: 'RSS / Webhook Event',
        outputFormat: 'JSON (Topic, Keywords, Angle)',
        promptTemplate: 'N/A (Automated Webhook)'
      },
      {
        title: 'Script & Viral Hook Synthesis',
        desc: 'Generates a 50-second narrative script structured with a 3-second psychological hook.',
        type: 'AI Model',
        toolName: 'ChatGPT',
        toolSlug: 'chatgpt',
        inputFormat: 'Topic Keyword',
        outputFormat: 'Markdown Script (Voice, Visual Direction)',
        promptTemplate: 'Act as a top 1% YouTube Shorts creator. Write a 50-second script about [TOPIC]. Rule 1: The first 3 seconds must challenge a widely held assumption. Rule 2: Fast tempo without filler. Rule 3: End with an open-ended debate question.'
      },
      {
        title: 'Realistic Voiceover Generation',
        desc: 'Converts generated script into audio with dynamic emotional tone shifts.',
        type: 'AI Model',
        toolName: 'ElevenLabs',
        toolSlug: 'elevenlabs',
        inputFormat: 'Text Script',
        outputFormat: 'MP3 / WAV Audio (44.1kHz)'
      },
      {
        title: 'B-Roll Visual Synthesis',
        desc: 'Creates visual clips matching the script timestamps via diffusion or stock clips.',
        type: 'AI Model',
        toolName: 'Runway',
        toolSlug: 'runway',
        inputFormat: 'Visual Prompt List',
        outputFormat: '9:16 Vertical Video MP4'
      },
      {
        title: 'Auto-Assembly & Social Publish',
        desc: 'Combines voiceover, background music, captions, and b-roll into final vertical MP4.',
        type: 'Output',
        toolName: 'n8n',
        toolSlug: 'n8n',
        inputFormat: 'Audio + Video Assets',
        outputFormat: 'YouTube Shorts / Instagram Reel'
      }
    ],
    output: 'Final 1080x1920 MP4 vertical video with synced dynamic captions, ready for multi-channel scheduling.',
    credentialsNeeded: ['OpenAI API Key', 'ElevenLabs API Key', 'YouTube Data API v3 OAuth', 'n8n Instance'],
    systemPromptSnippet: 'You are an automated YouTube Shorts retention engineer. Always maintain a pacing of 145-160 words per minute. Output strict JSON with fields: hook, body_paragraphs, visual_prompts, caption_text.',
    troubleshootingTips: [
      'If ElevenLabs quota exhausts mid-run, configure an n8n error-router fallback to Kokoro TTS.',
      'Ensure video prompt aspect ratios explicitly specify 9:16 (1080x1920) to prevent black pillarboxing.',
      'Add a random delay between 45-90 seconds before publishing to avoid automated platform spam flags.'
    ],
    relatedCreatorSlugs: ['matt-wolfe', 'ai-jason', 'cole-medin']
  },
  {
    id: 'pr-code-review-bot',
    title: 'Automated GitHub PR Code Review & Security Audit Agent',
    goal: 'Review every pull request within 60 seconds with AST security analysis, test generation, and style suggestions.',
    category: 'Engineering & DevOps',
    difficulty: 'Intermediate',
    time: '15 mins setup',
    estimatedCost: '~$5/mo (API tokens) or $0 (Ollama)',
    toolsUsed: [
      { name: 'Claude', slug: 'claude' },
      { name: 'GitHub Copilot', slug: 'github-copilot' },
      { name: 'n8n', slug: 'n8n' }
    ],
    budgetVariants: {
      free: {
        name: 'Local Ollama Runner',
        stack: ['Ollama (DeepSeek-R1 14B)', 'GitHub Action Runner (Self-Hosted)'],
        costUsd: '$0 / month',
        costInr: '₹0 / month',
        summary: 'Executes reasoning analysis on on-premise hardware with zero external code leakage.',
        pros: '100% private code never touches third-party cloud servers.',
        cons: 'Requires 16GB RAM on runner instance.'
      },
      freemium: {
        name: 'Claude 3.5 Haiku Cloud API',
        stack: ['Claude 3.5 Haiku API', 'GitHub Webhooks', 'n8n Cloud'],
        costUsd: '~$3 - $8 / month',
        costInr: '₹250 - ₹670 / month',
        summary: 'Ultra-fast sub-second reviews across hundreds of repo commits monthly.',
        pros: 'Near-zero maintenance, excellent linting, deeply context-aware.',
        cons: 'Small per-PR API token cost.'
      },
      paid: {
        name: 'Frontier Claude 3.7 + Sonar Suite',
        stack: ['Claude 3.7 Sonnet (Thinking mode)', 'Snyk API', 'GitHub Enterprise'],
        costUsd: '~$40 / month',
        costInr: '₹3,300 / month',
        summary: 'Deep architectural verification, formal vulnerability scanning, and regression test generation.',
        pros: 'Catches subtle race conditions and memory leaks before merge.',
        cons: 'Thinking tokens increase cost on 2,000+ line diffs.'
      }
    },
    steps: [
      {
        title: 'GitHub PR Webhook Trigger',
        desc: 'Fires whenever a Pull Request is opened or synchronized with new commits.',
        type: 'Trigger',
        inputFormat: 'GitHub PullRequestEvent Payload',
        outputFormat: 'JSON (PR Number, Diff URL, Author)'
      },
      {
        title: 'Git Diff & AST Analysis',
        desc: 'Extracts unified git diff, filters out lockfiles, and parses modified syntax trees.',
        type: 'Transformation',
        inputFormat: 'Git Diff string',
        outputFormat: 'Clean Code Context chunks'
      },
      {
        title: 'Security & Bug Analysis',
        desc: 'Deep inspection for OWASP Top 10 vulnerabilities, edge cases, and missing error handlers.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'PR Diff Chunks',
        outputFormat: 'Structured Review Comments',
        promptTemplate: 'You are a Principal Security & Software Architect. Review the following Git Diff. Flag only genuine security risks, memory leaks, concurrency issues, or severe regressions. For each issue, provide file path, line number, issue explanation, and replacement code.'
      },
      {
        title: 'Post Markdown Review Comment',
        desc: 'Submits inline comments directly onto the GitHub PR timeline using GitHub REST API.',
        type: 'Output',
        inputFormat: 'Markdown Review',
        outputFormat: 'GitHub PR Comment with Diff Suggestions'
      }
    ],
    output: 'Automated GitHub PR review comment with inline suggestions, security score, and unit test snippets.',
    credentialsNeeded: ['GitHub Personal Access Token (repo scope)', 'Anthropic API Key'],
    systemPromptSnippet: 'Never leave generic praise comments like "looks good". Always focus on: 1) Security vulnerability, 2) Performance bottleneck, 3) Edge-case failure. Return valid GitHub markdown.',
    troubleshootingTips: [
      'Exclude package-lock.json, pnpm-lock.yaml, and dist/ files to save 90% of token compute.',
      'Check GitHub webhook secret HMAC validation in n8n to prevent unauthorized spoofing.'
    ],
    relatedCreatorSlugs: ['theprimeagen', 'fireship', 'andrej-karpathy']
  },
  {
    id: 'indic-customer-support-agent',
    title: 'Indic Multilingual Voice Customer Agent (Sarvam + n8n + WhatsApp)',
    goal: 'Automate Tier-1 customer support in Hindi, Tamil, Telugu, and English via WhatsApp voice notes and text.',
    category: 'Customer Support',
    difficulty: 'Advanced',
    time: '45 mins setup',
    estimatedCost: '~$25/mo or ₹2,000/mo',
    toolsUsed: [
      { name: 'Sarvam AI', slug: 'sarvam-ai' },
      { name: 'Bhashini', slug: 'bhashini' },
      { name: 'n8n', slug: 'n8n' },
      { name: 'DeepSeek', slug: 'deepseek' }
    ],
    budgetVariants: {
      free: {
        name: 'Community Open Stack',
        stack: ['Bhashini Public API', 'Ollama (Llama 3 Indic)', 'WhatsApp Cloud API Free Tier'],
        costUsd: '$0 / month',
        costInr: '₹0 / month',
        summary: 'Leverages government Bhashini endpoints and open weights for free tier testing.',
        pros: 'Zero infrastructure cost for low-volume civic or student projects.',
        cons: 'Government API rate limits during peak hours.'
      },
      freemium: {
        name: 'Sarvam AI + DeepSeek Stack',
        stack: ['Sarvam Voice 2.0 API', 'DeepSeek-V3 API', 'n8n Cloud', 'Gupshup WhatsApp'],
        costUsd: '~$20 - $35 / month',
        costInr: '₹1,700 - ₹2,900 / month',
        summary: 'Sub-250ms voice synthesis tailored specifically for Indian regional accents and Hinglish.',
        pros: 'Flawless comprehension of mixed Indian languages, sovereign cloud hosting.',
        cons: 'Requires WhatsApp Business API account verification.'
      },
      paid: {
        name: 'Enterprise Omnichannel Suite',
        stack: ['Yellow.ai', 'Sarvam Enterprise Voice', 'Salesforce CRM Integration'],
        costUsd: '~$250 / month',
        costInr: '₹20,000 / month',
        summary: 'Enterprise contact center handling 50,000+ customer queries across telephony & WhatsApp.',
        pros: 'SLA guarantees, human agent escalation, live call transfers.',
        cons: 'Annual contract commitment.'
      }
    },
    steps: [
      {
        title: 'WhatsApp Incoming Voice Note',
        desc: 'Receives customer audio message via WhatsApp Cloud Webhook.',
        type: 'Trigger',
        inputFormat: 'WhatsApp Webhook (Audio URL)',
        outputFormat: 'OGG Audio File'
      },
      {
        title: 'Indic Speech-to-Text Transcription',
        desc: 'Converts noisy regional voice into accurate text with dialect awareness.',
        type: 'AI Model',
        toolName: 'Sarvam AI',
        toolSlug: 'sarvam-ai',
        inputFormat: 'Audio buffer',
        outputFormat: 'Transcribed text + Detected Language (e.g. hi-IN, te-IN)'
      },
      {
        title: 'Knowledge Base Retrieval (RAG)',
        desc: 'Searches company FAQs, order statuses, and policy docs in Supabase vector store.',
        type: 'Logic',
        inputFormat: 'Transcribed User Query',
        outputFormat: 'Top 3 Relevant Policy Context Chunks'
      },
      {
        title: 'Resolution Generation',
        desc: 'Synthesizes accurate, polite answer in customer’s native language.',
        type: 'AI Model',
        toolName: 'DeepSeek',
        toolSlug: 'deepseek',
        inputFormat: 'Context + Query',
        outputFormat: 'Answer Text in Customer Language'
      },
      {
        title: 'Indic Voice Synthesis & Reply',
        desc: 'Converts answer into natural regional voice audio and sends voice note back on WhatsApp.',
        type: 'Output',
        toolName: 'Sarvam AI',
        toolSlug: 'sarvam-ai',
        inputFormat: 'Text response',
        outputFormat: 'WhatsApp Outgoing Voice Note + Text transcript'
      }
    ],
    output: 'Automated bilingual voice & text resolution delivered directly inside customer’s WhatsApp thread.',
    credentialsNeeded: ['Sarvam AI API Key', 'Meta WhatsApp Business Cloud API', 'Supabase Database URL'],
    systemPromptSnippet: 'You are a warm, helpful customer support representative for [COMPANY]. Always reply in the exact language the customer used. If customer is speaking Hinglish, reply in conversational Hinglish.',
    troubleshootingTips: [
      'Ensure WhatsApp audio format (.ogg with opus codec) is converted to 16kHz WAV before passing to speech models.',
      'Set confidence threshold at 0.7; escalate to human ticketing when confidence is low.'
    ],
    relatedCreatorSlugs: ['krish-naik', 'varun-mayya', 'krutrim-tech']
  },
  {
    id: 'seo-content-factory',
    title: 'SEO Research-to-Published Blog Content Factory',
    goal: 'Turn keyword search intent into a deeply researched, verified 2,500-word blog post with schema markup.',
    category: 'Content Creation',
    difficulty: 'Intermediate',
    time: '20 mins setup',
    estimatedCost: '~$10/mo',
    toolsUsed: [
      { name: 'Perplexity', slug: 'perplexity' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Notion AI', slug: 'notion-ai' },
      { name: 'Make', slug: 'make' }
    ],
    budgetVariants: {
      free: {
        name: 'Local Open Source',
        stack: ['Crawl4AI', 'Ollama (DeepSeek-R1)', 'Local Markdown'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Extracts SERP data via Crawl4AI and synthesizes content locally.',
        pros: 'Zero cost, full content ownership.',
        cons: 'Requires manual upload to CMS.'
      },
      freemium: {
        name: 'Hybrid Cloud',
        stack: ['Perplexity Sonar API', 'Claude 3.5 Sonnet', 'WordPress / Ghost Webhook'],
        costUsd: '~$10 - $15 / month',
        costInr: '₹850 - ₹1,250 / month',
        summary: 'Live web citations combined with frontier prose quality.',
        pros: 'Verified live facts, automatic CMS publishing, high search rankings.',
        cons: 'Occasional manual image selection needed.'
      },
      paid: {
        name: 'Enterprise SEO Suite',
        stack: ['Ahrefs API', 'Perplexity Pro', 'Jasper', 'Webflow CMS'],
        costUsd: '~$120 / month',
        costInr: '₹9,900 / month',
        summary: 'Full automated keyword cluster ranking engine for high-traffic media sites.',
        pros: 'Automatic internal linking, SERP competitor gap analysis.',
        cons: 'Heavy SaaS costs.'
      }
    },
    steps: [
      {
        title: 'Keyword Intent & SERP Scraping',
        desc: 'Analyzes top 10 Google search results to map user questions, headings, and keyword gaps.',
        type: 'AI Model',
        toolName: 'Perplexity',
        toolSlug: 'perplexity',
        inputFormat: 'Target Keyword',
        outputFormat: 'Competitor Outline + Missing Intent Gaps'
      },
      {
        title: 'Editorial Outline & Structure',
        desc: 'Builds comprehensive H2/H3 hierarchy targeting Google Featured Snippet boxes.',
        type: 'Transformation',
        inputFormat: 'SERP Analysis',
        outputFormat: 'Structured JSON Outline'
      },
      {
        title: 'In-Depth Chapter Drafting',
        desc: 'Generates thorough, nuance-rich sections with concrete examples, code, and case studies.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Section Outline + Source Facts',
        outputFormat: '2,500-word Markdown Article'
      },
      {
        title: 'Schema.org JSON-LD Generation',
        desc: 'Appends Article and FAQPage structured data schemas for instant search indexing.',
        type: 'Logic',
        inputFormat: 'Final Article Content',
        outputFormat: 'JSON-LD Schema Script'
      },
      {
        title: 'Publish to CMS as Draft',
        desc: 'Pushes complete article, metadata, and tags directly to Webflow, WordPress, or Ghost.',
        type: 'Output',
        toolName: 'Make',
        toolSlug: 'make',
        inputFormat: 'Markdown + Schema',
        outputFormat: 'CMS Draft Post'
      }
    ],
    output: 'Production-ready 2,500-word blog draft with structured FAQ markup and meta description.',
    credentialsNeeded: ['Perplexity API Key', 'Anthropic API Key', 'CMS Webhook Token'],
    systemPromptSnippet: 'Write with extreme density. Ban cliché AI phrases like "In conclusion", "delve into", "tapestry", or "testament to". Use active voice and concrete case data.',
    troubleshootingTips: [
      'Split articles into 3 separate generation prompts (Intro + Part 1, Part 2, Conclusion) to prevent context degradation.',
      'Always run automated plagiarism and hallucination checks on cited statistics.'
    ],
    relatedCreatorSlugs: ['wes-roth', 'ai-jason']
  },
  {
    id: 'b2b-lead-enrichment-pipeline',
    title: 'B2B Lead Enrichment & Personalized Cold Outreach Pipeline',
    goal: 'Scrape new target company websites, summarize value propositions, and draft bespoke email intros.',
    category: 'Sales & Marketing',
    difficulty: 'Intermediate',
    time: '20 mins setup',
    estimatedCost: '~$15/mo',
    toolsUsed: [
      { name: 'Clay', slug: 'clay' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Apollo.io', slug: 'apollo-ai' },
      { name: 'n8n', slug: 'n8n' }
    ],
    budgetVariants: {
      free: {
        name: 'Open Source Scraper',
        stack: ['Crawl4AI', 'Ollama (Llama 3.3)', 'Google Sheets', 'n8n'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Crawls company domains with Crawl4AI and scores ICP fit locally.',
        pros: 'Zero per-lead credits, unlimited prospecting.',
        cons: 'Requires your own email sending domain setup.'
      },
      freemium: {
        name: 'Apollo + Claude Hybrid',
        stack: ['Apollo Free Tier (100 credits)', 'Claude 3.5 Haiku', 'Gmail Workspace'],
        costUsd: '~$15 / month',
        costInr: '₹1,250 / month',
        summary: 'Verified B2B email discovery paired with hyper-personalized 2-sentence icebreakers.',
        pros: 'High response rate, verified email deliverability.',
        cons: 'Limited to free Apollo credit allocations.'
      },
      paid: {
        name: 'Clay Enterprise Waterfall',
        stack: ['Clay Starter ($149/mo)', 'Instantly.ai', 'Claude 3.5 Sonnet'],
        costUsd: '~$180 / month',
        costInr: '₹15,000 / month',
        summary: 'Multi-provider waterfall enrichment covering LinkedIn, Clearbit, and Dropcontact.',
        pros: 'Maximum data completeness and automated sequence warmups.',
        cons: 'Substantial monthly platform subscription.'
      }
    },
    steps: [
      {
        title: 'New Lead Ingestion',
        desc: 'Captures domain URL and Founder LinkedIn profile from Google Sheet or form.',
        type: 'Trigger',
        inputFormat: 'Company Domain URL',
        outputFormat: 'JSON (Domain, Target Role)'
      },
      {
        title: 'Deep Website Crawl',
        desc: 'Extracts home page, pricing page, and recent press announcements into clean text.',
        type: 'Transformation',
        inputFormat: 'Domain URL',
        outputFormat: 'Markdown Company Summary'
      },
      {
        title: 'ICP Fit & Problem Synthesis',
        desc: 'Identifies target company’s core bottlenecks and maps how your product saves them time.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Company Summary + Your Pitch',
        outputFormat: 'Specific Pain Point Insight',
        promptTemplate: 'Read this company summary: [SUMMARY]. Find 1 specific operational challenge they likely face regarding [TOPIC]. Draft a 2-sentence conversational observation without being pushy.'
      },
      {
        title: 'Cold Outreach Draft Generation',
        desc: 'Compiles personalized 80-word email draft directly into sales CRM draft queue.',
        type: 'Output',
        inputFormat: 'Pain Point Insight',
        outputFormat: 'Ready-to-send CRM Draft'
      }
    ],
    output: 'Tailored 80-word cold email draft in CRM with company-specific pain point reference.',
    credentialsNeeded: ['Apollo.io API Key', 'Anthropic API Key', 'Google Sheets Integration'],
    systemPromptSnippet: 'Never start with "I hope this email finds you well". Start immediately with an observation about their specific product feature or recent company hiring update.',
    troubleshootingTips: [
      'Always verify email bounce rate via Hunter or NeverBounce before sending to protect domain reputation.',
      'Limit automated drafts to 35 sends per inbox per day to maintain 98%+ deliverability.'
    ],
    relatedCreatorSlugs: ['greg-isenberg', 'ai-jason']
  },
  {
    id: 'local-private-rag-knowledgebase',
    title: 'Local Private RAG Knowledge Base over Company Docs (Ollama + Open-WebUI)',
    goal: 'Query internal confidential PDFs, contracts, and code without sending a single byte to external cloud APIs.',
    category: 'Enterprise & Data',
    difficulty: 'Intermediate',
    time: '25 mins setup',
    estimatedCost: '$0 (100% Free & Self-Hosted)',
    toolsUsed: [
      { name: 'Ollama', slug: 'ollama' },
      { name: 'Open-WebUI', slug: 'open-webui' },
      { name: 'DeepSeek', slug: 'deepseek' }
    ],
    budgetVariants: {
      free: {
        name: '100% On-Premise / Local',
        stack: ['Ollama', 'Open-WebUI (Docker)', 'Chroma Vector DB', 'DeepSeek-R1 14B Q4'],
        costUsd: '$0 / month',
        costInr: '₹0 / month',
        summary: 'Complete local deployment running on workstation or on-premise server.',
        pros: 'Zero data leakage risk, HIPAA/GDPR safe, unlimited queries forever.',
        cons: 'Requires 16GB–32GB RAM.'
      },
      freemium: {
        name: 'Private VPC Hosted',
        stack: ['Hetzner / DigitalOcean $20 VPS', 'Ollama', 'Open-WebUI'],
        costUsd: '~$20 / month',
        costInr: '₹1,700 / month',
        summary: 'Company-accessible internal server with team login accounts.',
        pros: 'Accessible to all remote employees, isolated cloud network.',
        cons: 'Requires basic Linux server administration.'
      },
      paid: {
        name: 'Enterprise GPU Dedicated',
        stack: ['Dedicated 8x A100 GPU Instance', 'vLLM', 'Milvus', 'Dify Enterprise'],
        costUsd: '~$600 / month',
        costInr: '₹50,000 / month',
        summary: 'Supports 500+ employees simultaneously querying 100,000+ internal documents.',
        pros: 'Sub-second response times on massive document corpuses.',
        cons: 'Significant monthly compute investment.'
      }
    },
    steps: [
      {
        title: 'Document Ingestion & Chunking',
        desc: 'Parses internal PDFs, Word files, and Markdown with recursive character splitting.',
        type: 'Transformation',
        inputFormat: 'PDF / DOCX files',
        outputFormat: 'Normalized Text Chunks (500 tokens, 10% overlap)'
      },
      {
        title: 'Local Vector Embeddings',
        desc: 'Generates 768-dimensional vector embeddings using local Nomic-Embed-Text model.',
        type: 'AI Model',
        toolName: 'Ollama',
        toolSlug: 'ollama',
        inputFormat: 'Text Chunks',
        outputFormat: 'Vector Floats'
      },
      {
        title: 'Chroma / PGVector Indexing',
        desc: 'Stores embeddings in high-speed local vector database with cosine similarity indexing.',
        type: 'Storage',
        inputFormat: 'Vectors + Metadata',
        outputFormat: 'Persisted Index'
      },
      {
        title: 'User Question & Context Retrieval',
        desc: 'Matches incoming employee query against top 5 most relevant document chunks.',
        type: 'Logic',
        inputFormat: 'Natural Language Question',
        outputFormat: 'Top 5 Context Chunks'
      },
      {
        title: 'Local Synthesis & Direct Citations',
        desc: 'Synthesizes accurate answer citing exact document names and page numbers.',
        type: 'AI Model',
        toolName: 'Open-WebUI',
        toolSlug: 'open-webui',
        inputFormat: 'Retrieved Chunks + Question',
        outputFormat: 'Cited Answer with Page References'
      }
    ],
    output: 'Accurate, cited answer generated completely offline with page-specific document references.',
    credentialsNeeded: ['None (100% Local / Self-Hosted)'],
    systemPromptSnippet: 'You are an internal company knowledge assistant. You must answer ONLY using the provided retrieved context. If the answer is not explicitly stated in the context, reply "This information is not present in company documentation."',
    troubleshootingTips: [
      'Use nomic-embed-text for local embeddings: high accuracy and 8192 token context window.',
      'Enable Hybrid Search (BM25 Keyword + Dense Vector) in Open-WebUI to catch exact part numbers and acronyms.'
    ],
    relatedCreatorSlugs: ['matthew-berman', 'networkchuck', 'andrej-karpathy']
  },
  {
    id: 'automated-invoice-financial-extractor',
    title: 'Automated Invoice, Receipt & PDF Financial Data Extractor',
    goal: 'Extract line items, GST numbers, vendor data, and totals from unstructured invoices into accounting databases.',
    category: 'Enterprise & Data',
    difficulty: 'Beginner',
    time: '15 mins setup',
    estimatedCost: '~$5/mo',
    toolsUsed: [
      { name: 'Gemini', slug: 'gemini' },
      { name: 'n8n', slug: 'n8n' },
      { name: 'Notion AI', slug: 'notion-ai' }
    ],
    budgetVariants: {
      free: {
        name: 'Google AI Studio Free Tier',
        stack: ['Gemini 2.0 Flash API (Free Tier)', 'n8n (Self-Hosted)', 'Google Sheets'],
        costUsd: '$0 / month',
        costInr: '₹0 / month',
        summary: 'Free tier permits up to 1,500 daily invoice extractions at zero cost.',
        pros: 'Massive free tier allowance, near-perfect OCR on blurry scans.',
        cons: 'Must use personal Google AI Studio API key.'
      },
      freemium: {
        name: 'Supabase + Gemini Stack',
        stack: ['Gemini 2.0 Flash', 'Supabase PostgreSQL', 'n8n Cloud'],
        costUsd: '~$5 / month',
        costInr: '₹420 / month',
        summary: 'Structured relational storage with SQL reporting and audit logs.',
        pros: 'Automated tax calculations, duplicate invoice detection.',
        cons: 'Requires basic SQL knowledge.'
      },
      paid: {
        name: 'Enterprise FinTech Suite',
        stack: ['Amazon Textract', 'OpenAI GPT-4o Vision', 'QuickBooks / Xero API'],
        costUsd: '~$50 / month',
        costInr: '₹4,100 / month',
        summary: 'Direct bidirectional reconciliation with enterprise accounting ledgers.',
        pros: 'Native bank reconciliation and automated tax filing.',
        cons: 'Per-page pricing scales on high invoice volume.'
      }
    },
    steps: [
      {
        title: 'Invoice Ingestion',
        desc: 'Triggers on incoming email attachment or files dropped in Google Drive / S3.',
        type: 'Trigger',
        inputFormat: 'PDF / JPEG / PNG File',
        outputFormat: 'Binary File Buffer'
      },
      {
        title: 'Multimodal Vision Extraction',
        desc: 'Extracts vendor name, GST/Tax ID, invoice date, line items, and totals into strict JSON schema.',
        type: 'AI Model',
        toolName: 'Gemini',
        toolSlug: 'gemini',
        inputFormat: 'Invoice Image/PDF',
        outputFormat: 'Strict JSON Schema',
        promptTemplate: 'Extract all financial data from this invoice. Return strict JSON matching schema: { vendor_name, invoice_number, date, currency, line_items: [{ description, quantity, unit_price, total }], subtotal, tax_amount, total_amount, payment_terms }.'
      },
      {
        title: 'Mathematical Verification Check',
        desc: 'Verifies that sum of line items + tax equals the total amount to prevent hallucinated numbers.',
        type: 'Logic',
        inputFormat: 'Extracted JSON',
        outputFormat: 'Validated Financial Record'
      },
      {
        title: 'Insert into Ledger / Database',
        desc: 'Inserts validated transaction record into PostgreSQL, QuickBooks, or Google Sheets.',
        type: 'Output',
        inputFormat: 'Validated JSON',
        outputFormat: 'Database Row ID'
      }
    ],
    output: 'Validated accounting record with line items, tax IDs, and totals verified against OCR discrepancies.',
    credentialsNeeded: ['Google AI Studio API Key', 'n8n Instance', 'Database URL'],
    systemPromptSnippet: 'Never guess numbers. If an invoice line item is obscured or illegible, set field value to null and flag "needs_human_review: true".',
    troubleshootingTips: [
      'Gemini 2.0 Flash processes PDFs directly without requiring preliminary image conversion.',
      'Always add a mathematical sum verification node in n8n before inserting into production ledgers.'
    ],
    relatedCreatorSlugs: ['fireship', 'krish-naik']
  },
  {
    id: 'podcast-to-social-clips-factory',
    title: 'Podcast & Long-Form Video to 10 Social Clips & Newsletter Repurposer',
    goal: 'Transform a 1-hour YouTube interview into 10 viral vertical clips, an X thread, and a Substack newsletter.',
    category: 'Content Creation',
    difficulty: 'Intermediate',
    time: '30 mins setup',
    estimatedCost: '~$20/mo',
    toolsUsed: [
      { name: 'Whisper', slug: 'whisper-openai' },
      { name: 'Claude', slug: 'claude' },
      { name: 'InVideo', slug: 'invideo' },
      { name: 'n8n', slug: 'n8n' }
    ],
    budgetVariants: {
      free: {
        name: 'Local Whisper + Ollama',
        stack: ['Whisper.cpp (Local)', 'Ollama (Llama 3.3)', 'FFmpeg'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Transcribes with local Whisper and slices video clips using FFmpeg scripts.',
        pros: 'Zero recurring fees, unlimited video length.',
        cons: 'Requires CLI knowledge to run FFmpeg script.'
      },
      freemium: {
        name: 'Whisper API + Claude',
        stack: ['OpenAI Whisper API', 'Claude 3.5 Sonnet', 'InVideo AI Starter'],
        costUsd: '~$15 - $25 / month',
        costInr: '₹1,250 - ₹2,100 / month',
        summary: 'Fast cloud processing with automatic aspect ratio re-framing for viral clips.',
        pros: 'Sub-5 minute turnaround for a 1-hour episode.',
        cons: 'Video rendering credits cap monthly output.'
      },
      paid: {
        name: 'OpusClip + Descript Pro',
        stack: ['OpusClip Pro', 'Descript Enterprise', 'Beehiiv API'],
        costUsd: '~$75 / month',
        costInr: '₹6,200 / month',
        summary: 'Automatic AI virality score ranking with active speaker face-tracking.',
        pros: 'One-click automated publishing to TikTok, Reels, and Shorts.',
        cons: 'Higher monthly cost.'
      }
    },
    steps: [
      {
        title: 'Audio Stream Download',
        desc: 'Extracts high-fidelity audio stream from long-form video URL.',
        type: 'Trigger',
        inputFormat: 'YouTube Video URL',
        outputFormat: 'MP3 Audio Stream'
      },
      {
        title: 'Word-Level Timestamp Transcription',
        desc: 'Generates verbatim transcript with exact microsecond timestamps for every spoken word.',
        type: 'AI Model',
        toolName: 'Whisper',
        toolSlug: 'whisper-openai',
        inputFormat: 'MP3 Audio',
        outputFormat: 'JSON Transcript with Timestamps'
      },
      {
        title: 'Viral Clip & Hook Identification',
        desc: 'Analyzes transcript to isolate 10 highest-intensity soundbites between 30–60 seconds.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Full Transcript',
        outputFormat: 'List of Top 10 Timestamps + Viral Hook Scores'
      },
      {
        title: 'Video Slicing & Vertical Cropping',
        desc: 'Crops 16:9 video to 9:16 vertical frame focused on current speaker.',
        type: 'Transformation',
        inputFormat: 'Timestamp Ranges + Source Video',
        outputFormat: '10 MP4 Vertical Video Clips'
      },
      {
        title: 'Newsletter & Social Repurposing',
        desc: 'Converts full interview takeaways into a 500-word newsletter and 8-tweet thread.',
        type: 'Output',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Transcript Summary',
        outputFormat: 'Substack Newsletter Draft + X Thread'
      }
    ],
    output: '10 edited vertical clips with animated captions + complete Substack newsletter draft.',
    credentialsNeeded: ['OpenAI API Key', 'Anthropic API Key', 'FFmpeg / Cloudflare Stream'],
    systemPromptSnippet: 'Identify moments where the speaker reveals an counterintuitive truth, shares a quantifiable financial result, or tells an emotionally intense story.',
    troubleshootingTips: [
      'Use Whisper word_timestamps=True to ensure video subtitles sync perfectly with speech tempo.',
      'Check speaker diarization if interviewing multiple guests in overlapping cross-talk.'
    ],
    relatedCreatorSlugs: ['matt-wolfe', 'ai-jason', 'wes-roth']
  },
  {
    id: 'academic-literature-synthesis',
    title: 'Academic Literature Review & Citation Synthesis Pipeline',
    goal: 'Analyze 30 research papers on a technical topic, extract methodologies, and generate a synthesized review.',
    category: 'Research & Academic',
    difficulty: 'Intermediate',
    time: '20 mins setup',
    estimatedCost: '~$5/mo',
    toolsUsed: [
      { name: 'Consensus', slug: 'consensus' },
      { name: 'Elicit', slug: 'elicit' },
      { name: 'Claude', slug: 'claude' }
    ],
    budgetVariants: {
      free: {
        name: 'ArXiv API + Local DeepSeek',
        stack: ['ArXiv Open API', 'Crawl4AI', 'Ollama (DeepSeek-R1 14B)'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Pulls open-access ArXiv papers and analyzes citations locally.',
        pros: 'Zero cost, 100% open scientific access.',
        cons: 'Limited to papers available on ArXiv / open-access repos.'
      },
      freemium: {
        name: 'Semantic Scholar + Claude',
        stack: ['Semantic Scholar API', 'Claude 3.5 Sonnet', 'Zotero Integration'],
        costUsd: '~$5 - $10 / month',
        costInr: '₹420 - ₹840 / month',
        summary: 'Pulls peer-reviewed citation graphs with deep reasoning synthesis.',
        pros: 'High scientific rigor, verified BibTeX citation keys.',
        cons: 'Requires Zotero client setup.'
      },
      paid: {
        name: 'Elicit + Scite Enterprise',
        stack: ['Elicit Enterprise', 'Scite.ai API', 'Notion Team'],
        costUsd: '~$45 / month',
        costInr: '₹3,700 / month',
        summary: 'Automated systematic literature matrix generation for biomedical and tech labs.',
        pros: 'Smart citation badges (supporting vs contrasting evidence).',
        cons: 'Monthly subscription required.'
      }
    },
    steps: [
      {
        title: 'Research Query Definition',
        desc: 'Accepts scientific question or hypothesis to investigate.',
        type: 'Trigger',
        inputFormat: 'Research Question',
        outputFormat: 'Semantic Search Terms'
      },
      {
        title: 'Paper Discovery & Metadata Retrieval',
        desc: 'Searches Semantic Scholar and ArXiv for top 30 peer-reviewed papers by citation momentum.',
        type: 'Transformation',
        inputFormat: 'Search Query',
        outputFormat: 'List of 30 Paper Abstracts + PDFs'
      },
      {
        title: 'Methodology & Benchmark Extraction',
        desc: 'Extracts sample sizes, datasets, baseline models, and numerical performance metrics.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Paper Full Texts',
        outputFormat: 'Structured Comparison Matrix JSON'
      },
      {
        title: 'Contradiction & Consensus Synthesis',
        desc: 'Identifies where scientific studies agree, disagree, or leave unanswered research questions.',
        type: 'AI Model',
        toolName: 'Consensus',
        toolSlug: 'consensus',
        inputFormat: 'Comparison Matrix',
        outputFormat: 'Consensus Analysis'
      },
      {
        title: 'Formal Review Generation & BibTeX Export',
        desc: 'Produces formatted academic literature review with valid BibTeX citation keys.',
        type: 'Output',
        inputFormat: 'Synthesized Findings',
        outputFormat: 'LaTeX / Markdown Literature Review'
      }
    ],
    output: 'Formatted literature review with methodology comparison table and verified BibTeX citations.',
    credentialsNeeded: ['Semantic Scholar API Key', 'Anthropic API Key'],
    systemPromptSnippet: 'Never fabricate study findings or authors. Every assertion must cite the exact paper title, lead author, publication year, and DOI.',
    troubleshootingTips: [
      'Filter out non-peer-reviewed pre-prints when researching clinical or safety-critical fields.',
      'Use Claude 3.5 Sonnet’s 200K context window to ingest 5 entire papers simultaneously.'
    ],
    relatedCreatorSlugs: ['3blue1brown', 'yannic-kilcher', 'andrej-karpathy']
  },
  {
    id: 'figma-to-production-code-pipeline',
    title: 'Figma UI Mockup to Production Astro & Tailwind Code Pipeline',
    goal: 'Convert Figma component mockups into production-grade, accessible Astro 5 & Tailwind CSS v4 code.',
    category: 'Engineering & DevOps',
    difficulty: 'Intermediate',
    time: '20 mins setup',
    estimatedCost: '~$10/mo',
    toolsUsed: [
      { name: 'v0 by Vercel', slug: 'v0' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Cursor', slug: 'cursor' }
    ],
    budgetVariants: {
      free: {
        name: 'Open Source Vision Coder',
        stack: ['Llama 3.2 Vision (Local)', 'Cursor Free Tier'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Analyzes screenshots locally and writes initial HTML/CSS.',
        pros: 'Zero cost.',
        cons: 'Requires manual refinement for responsive breakpoints.'
      },
      freemium: {
        name: 'v0 + Claude 3.5 Sonnet',
        stack: ['v0 Free Tier', 'Claude 3.5 Sonnet API', 'Cursor IDE'],
        costUsd: '~$10 / month',
        costInr: '₹850 / month',
        summary: 'Vercel’s v0 generates component tokens; Claude refactors to Astro 5 standards.',
        pros: 'Pixel-perfect alignment, clean Tailwind v4 utility tokens.',
        cons: 'Limited free v0 generation credits.'
      },
      paid: {
        name: 'Enterprise Design-to-Code',
        stack: ['Figma Dev Mode API', 'v0 Enterprise', 'Claude 3.7 Sonnet'],
        costUsd: '~$50 / month',
        costInr: '₹4,100 / month',
        summary: 'Direct Figma token extraction syncing design systems with GitHub repos.',
        pros: 'Automatic PR creation whenever designers update Figma components.',
        cons: 'Figma Dev Mode seat subscription required.'
      }
    },
    steps: [
      {
        title: 'Figma Component Screenshot / SVG Export',
        desc: 'Extracts high-resolution design frame with layout annotations.',
        type: 'Trigger',
        inputFormat: 'Figma Node ID or PNG Screenshot',
        outputFormat: 'High-Res Design Image'
      },
      {
        title: 'Design System Token Mapping',
        desc: 'Maps colors, font sizes, paddings, and borders to our project’s DESIGN.md tokens.',
        type: 'Transformation',
        inputFormat: 'Design Image',
        outputFormat: 'Token Match JSON'
      },
      {
        title: 'Component Code Generation',
        desc: 'Writes clean Astro component template adhering to zero-emoji and semantic HTML rules.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Tokens + Design Image',
        outputFormat: 'Production .astro Component Code',
        promptTemplate: 'Convert this design into an Astro 5 component. Use Tailwind CSS v4. Adhere strictly to the color palette in DESIGN.md. Ensure full keyboard accessibility (a11y) and responsive breakpoints.'
      },
      {
        title: 'Automated Lint & Syntax Verification',
        desc: 'Runs astro check and prettier to verify zero compilation errors.',
        type: 'Output',
        inputFormat: '.astro File',
        outputFormat: 'Validated Component in src/components/'
      }
    ],
    output: 'Production-ready, accessible .astro component file matching project design tokens.',
    credentialsNeeded: ['Anthropic API Key', 'GitHub Token'],
    systemPromptSnippet: 'Never use inline style tags. Use semantic HTML (nav, article, aside, main, button). Never insert emojis. Use crisp SVG icons.',
    troubleshootingTips: [
      'Pass the DESIGN.md color token definitions in the prompt context to ensure brand consistency.',
      'Always test component behavior at 320px mobile viewport width.'
    ],
    relatedCreatorSlugs: ['fireship', 'theprimeagen']
  },
  {
    id: 'voice-meeting-to-crm-action-items',
    title: 'Voice Meeting Recorder to CRM Action Items & Follow-Up Drafter',
    goal: 'Transcribe sales or sprint meetings, extract commitments and owners, and generate personalized follow-up emails.',
    category: 'Sales & Marketing',
    difficulty: 'Beginner',
    time: '15 mins setup',
    estimatedCost: '~$5/mo',
    toolsUsed: [
      { name: 'Whisper', slug: 'whisper-openai' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Notion AI', slug: 'notion-ai' }
    ],
    budgetVariants: {
      free: {
        name: 'Local Whisper Meeting Bot',
        stack: ['Whisper.cpp (Local)', 'Ollama (Llama 3.3)', 'Local Markdown'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Transcribes recorded audio offline and formats action items into markdown.',
        pros: 'Complete privacy for sensitive board and client meetings.',
        cons: 'Requires meeting audio file upload manually.'
      },
      freemium: {
        name: 'Whisper API + Claude 3.5 Haiku',
        stack: ['Whisper API', 'Claude 3.5 Haiku', 'Slack Webhook'],
        costUsd: '~$5 / month',
        costInr: '₹420 / month',
        summary: 'Processes 20+ hours of meeting recordings monthly for under $5.',
        pros: 'Extremely fast, posts action items directly into team Slack channel.',
        cons: 'Audio passes through OpenAI Whisper API.'
      },
      paid: {
        name: 'Otter / Fireflies Enterprise',
        stack: ['Fireflies.ai', 'Salesforce CRM Integration', 'Gmail Auto-Draft'],
        costUsd: '~$35 / month',
        costInr: '₹2,900 / month',
        summary: 'Autonomous bot joins Zoom/Google Meet calls automatically and syncs with CRM.',
        pros: 'Zero manual recording uploads required.',
        cons: 'Meeting bot presence visible to all attendees.'
      }
    },
    steps: [
      {
        title: 'Meeting Recording Ingestion',
        desc: 'Triggers when a Google Meet or Zoom audio file finishes uploading.',
        type: 'Trigger',
        inputFormat: 'MP4 / M4A Audio File',
        outputFormat: 'Audio Stream'
      },
      {
        title: 'Diarized Speech Transcription',
        desc: 'Transcribes conversation with speaker separation (Speaker 1, Speaker 2).',
        type: 'AI Model',
        toolName: 'Whisper',
        toolSlug: 'whisper-openai',
        inputFormat: 'Audio Stream',
        outputFormat: 'Diarized Meeting Transcript'
      },
      {
        title: 'Action Item & Owner Extraction',
        desc: 'Isolates concrete commitments made, deadline dates, and assigned owners.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Diarized Transcript',
        outputFormat: 'JSON List of Action Items'
      },
      {
        title: 'Client Follow-Up Email Drafting',
        desc: 'Drafts professional follow-up email summarizing agreed decisions and next steps.',
        type: 'Transformation',
        inputFormat: 'Action Items + Transcript',
        outputFormat: 'Ready-to-send Follow-Up Email Draft'
      },
      {
        title: 'Team Notification & CRM Sync',
        desc: 'Posts formatted summary into Slack channel and updates CRM deal stage.',
        type: 'Output',
        inputFormat: 'Action Items + Email Draft',
        outputFormat: 'Slack Notification + CRM Update'
      }
    ],
    output: 'Executive meeting summary, prioritized action items table with owners, and tailored client follow-up email.',
    credentialsNeeded: ['OpenAI API Key', 'Anthropic API Key', 'Slack Incoming Webhook'],
    systemPromptSnippet: 'Extract only explicit commitments where a speaker said they would complete an action. Ignore vague hypotheticals.',
    troubleshootingTips: [
      'Instruct participants to state their name before speaking in audio files with multiple new voices.',
      'Check time zones explicitly when assigning deadline dates from conversation context.'
    ],
    relatedCreatorSlugs: ['cole-medin', 'wes-roth']
  },
  {
    id: 'competitor-pricing-news-digest-bot',
    title: 'Real-Time Competitor Pricing & AI News Slack/Discord Digest Bot',
    goal: 'Monitor 15 competitor pricing tables and frontier AI research daily; alert team of changes and shifts.',
    category: 'Sales & Marketing',
    difficulty: 'Beginner',
    time: '15 mins setup',
    estimatedCost: '~$3/mo',
    toolsUsed: [
      { name: 'Perplexity', slug: 'perplexity' },
      { name: 'n8n', slug: 'n8n' },
      { name: 'Claude', slug: 'claude' }
    ],
    budgetVariants: {
      free: {
        name: 'Crawl4AI + Local Ollama',
        stack: ['Crawl4AI', 'Ollama (Llama 3.3)', 'Discord Webhook'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Scrapes competitor domains daily on cron schedule with zero external fees.',
        pros: 'Free forever, unlimited competitors monitored.',
        cons: 'Must run on a local machine or server with constant uptime.'
      },
      freemium: {
        name: 'Perplexity + n8n Cloud',
        stack: ['Perplexity Sonar API', 'n8n Cloud Starter', 'Slack Webhook'],
        costUsd: '~$3 - $5 / month',
        costInr: '₹250 - ₹420 / month',
        summary: 'Real-time web search queries checking competitor changes with source citations.',
        pros: 'Catches press releases and hidden feature updates across the web.',
        cons: 'Small API query cost.'
      },
      paid: {
        name: 'VisualPing Enterprise',
        stack: ['VisualPing Enterprise', 'Claude 3.5 Sonnet', 'Slack Enterprise Grid'],
        costUsd: '~$60 / month',
        costInr: '₹5,000 / month',
        summary: 'Pixel-level visual change tracking with AI summary of UI shifts.',
        pros: 'Catches subtle pricing tier layout changes instantly.',
        cons: 'Enterprise pricing.'
      }
    },
    steps: [
      {
        title: 'Daily Cron Schedule Trigger',
        desc: 'Triggers automatically every morning at 08:00 AM local time.',
        type: 'Trigger',
        inputFormat: 'Cron Expression (0 8 * * *)',
        outputFormat: 'Timestamp Event'
      },
      {
        title: 'Competitor Web Scraping',
        desc: 'Extracts pricing cards, feature lists, and announcement banners from 15 target websites.',
        type: 'Transformation',
        inputFormat: 'List of Competitor URLs',
        outputFormat: 'Clean Markdown Snapshots'
      },
      {
        title: 'Diff & Impact Analysis',
        desc: 'Compares today’s snapshot with yesterday’s database record to detect price hikes or new tiers.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Today Snapshot vs Yesterday Snapshot',
        outputFormat: 'Summary of Pricing Changes & Strategic Meaning'
      },
      {
        title: 'Executive Digest Formatting',
        desc: 'Formats changes into an actionable 3-point briefing with links to changed pages.',
        type: 'Logic',
        inputFormat: 'Analysis Data',
        outputFormat: 'Rich Slack/Discord Message Blocks'
      },
      {
        title: 'Dispatch to Team Channel',
        desc: 'Sends formatted alert into #product-strategy Slack or Discord channel.',
        type: 'Output',
        inputFormat: 'Message Blocks',
        outputFormat: 'Posted Channel Message'
      }
    ],
    output: 'Morning Slack notification highlighting any competitor price changes, tier updates, or feature launches.',
    credentialsNeeded: ['Anthropic API Key', 'Slack/Discord Webhook URL'],
    systemPromptSnippet: 'If zero competitor changes occurred over the last 24 hours, respond with "NO_SIGNIFICANT_CHANGES" to avoid cluttering team notification channels.',
    troubleshootingTips: [
      'Store previous snapshots in a lightweight Supabase table to make diff calculations instantaneous.',
      'Add user-agent headers in scrapers to prevent being blocked by standard Cloudflare WAF challenges.'
    ],
    relatedCreatorSlugs: ['ai-jason', 'wes-roth']
  },
  {
    id: 'multi-agent-market-research-pitch-deck',
    title: 'Multi-Agent Market Research & Pitch Deck Generator',
    goal: 'Conduct autonomous TAM/SAM/SOM market research, competitor benchmarking, and generate a 10-slide investor pitch deck.',
    category: 'Research & Academic',
    difficulty: 'Advanced',
    time: '40 mins setup',
    estimatedCost: '~$12/mo',
    toolsUsed: [
      { name: 'Perplexity', slug: 'perplexity' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Gamma', slug: 'gamma-ai' }
    ],
    budgetVariants: {
      free: {
        name: 'Local AutoGen / CrewAI',
        stack: ['CrewAI (Open Source)', 'Ollama (Llama 3.3)', 'Markdown Deck'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Multi-agent crew running locally with specialized researcher and writer personas.',
        pros: 'Zero cost, fully customizable agent personas.',
        cons: 'Requires Python installation and CLI execution.'
      },
      freemium: {
        name: 'Perplexity + Claude + Gamma',
        stack: ['Perplexity API', 'Claude 3.5 Sonnet', 'Gamma App (Free tier)'],
        costUsd: '~$10 - $15 / month',
        costInr: '₹850 - ₹1,250 / month',
        summary: 'Verified live market statistics exported directly into presentation-ready visual slides.',
        pros: 'Produces designer-grade presentation slides in minutes with accurate market data.',
        cons: 'Limited free export credits in Gamma.'
      },
      paid: {
        name: 'Pitch Enterprise Suite',
        stack: ['Pitch Pro', 'Claude 3.7 Sonnet', 'CB Insights / PitchBook API'],
        costUsd: '~$150 / month',
        costInr: '₹12,500 / month',
        summary: 'Institutional-grade investment memo generation with verified venture funding rounds.',
        pros: 'Cites exact venture funding data and cap table comparables.',
        cons: 'High enterprise subscription costs.'
      }
    },
    steps: [
      {
        title: 'Venture Concept Definition',
        desc: 'Accepts startup premise, target customer, problem statement, and pricing thesis.',
        type: 'Trigger',
        inputFormat: 'Concept Summary',
        outputFormat: 'Research Directives'
      },
      {
        title: 'Autonomous Market Research (TAM / SAM / SOM)',
        desc: 'Queries verified market reports, industry CAGR estimates, and regulatory tailwinds.',
        type: 'AI Model',
        toolName: 'Perplexity',
        toolSlug: 'perplexity',
        inputFormat: 'Industry Sector Keywords',
        outputFormat: 'Cited Market Sizing Data'
      },
      {
        title: 'Competitor Moat & Defensibility Analysis',
        desc: 'Constructs competitive 2x2 matrix evaluating incumbents and emerging AI-native startups.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Market Data + Concept',
        outputFormat: 'Competitive Advantage Analysis'
      },
      {
        title: '10-Slide Investor Narrative Structure',
        desc: 'Drafts exact slide-by-slide copy adhering to standard Sequoia capital seed deck format.',
        type: 'Transformation',
        inputFormat: 'Research Synthesis',
        outputFormat: 'Structured Slide Deck JSON'
      },
      {
        title: 'Slide Deck Generation & Export',
        desc: 'Converts JSON narrative into visual presentation deck with charts and speaker notes.',
        type: 'Output',
        toolName: 'Gamma',
        toolSlug: 'gamma-ai',
        inputFormat: 'Slide JSON',
        outputFormat: 'Presentation Deck (PDF / PPTX / Web)'
      }
    ],
    output: '10-slide investment pitch deck with cited market sizing, competitor matrix, and financial projections.',
    credentialsNeeded: ['Perplexity API Key', 'Anthropic API Key', 'Gamma Account'],
    systemPromptSnippet: 'Follow the 10-slide Sequoia Capital format: 1) Company Purpose, 2) Problem, 3) Solution, 4) Why Now, 5) Market Size, 6) Competition, 7) Product, 8) Business Model, 9) Team, 10) Financials.',
    troubleshootingTips: [
      'Cross-check market CAGR numbers across at least 2 independent research sources before presenting to investors.',
      'Keep slide word counts under 45 words per slide to prevent text-crowding.'
    ],
    relatedCreatorSlugs: ['greg-isenberg', 'varun-mayya']
  },
  {
    id: 'youtube-thumbnail-ab-concept-generator',
    title: 'Automated YouTube Thumbnail A/B Concept & Title Generator',
    goal: 'Generate 5 high-CTR visual thumbnail concepts and 10 curiosity-gap titles from video scripts.',
    category: 'Content Creation',
    difficulty: 'Beginner',
    time: '15 mins setup',
    estimatedCost: '~$5/mo',
    toolsUsed: [
      { name: 'ChatGPT', slug: 'chatgpt' },
      { name: 'FLUX.1', slug: 'flux' },
      { name: 'Midjourney', slug: 'midjourney' }
    ],
    budgetVariants: {
      free: {
        name: 'Local FLUX Schnell',
        stack: ['Ollama (Llama 3.3)', 'ComfyUI (FLUX.1 Schnell)'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Generates concepts and renders 4 visual thumbnail mockups locally for $0.',
        pros: 'Unlimited generation, high local quality.',
        cons: 'Requires 12GB VRAM GPU.'
      },
      freemium: {
        name: 'Claude + Ideogram / Recraft',
        stack: ['Claude 3.5 Haiku', 'Recraft AI (Free credits)'],
        costUsd: '~$5 / month',
        costInr: '₹420 / month',
        summary: 'Superior thumbnail text rendering with vector and raster asset export.',
        pros: 'Clean, legible text rendered directly inside thumbnail graphics.',
        cons: 'Free credits expire after monthly limit.'
      },
      paid: {
        name: 'Midjourney Pro + ThumbnailTest Suite',
        stack: ['Midjourney Pro Plan', 'ThumbnailTest.com API', 'Claude 3.5 Sonnet'],
        costUsd: '~$60 / month',
        costInr: '₹5,000 / month',
        summary: 'Automated A/B thumbnail switching on live YouTube videos based on real CTR analytics.',
        pros: 'Maximizes YouTube algorithmic recommendations automatically.',
        cons: 'Requires active YouTube channel with regular video volume.'
      }
    },
    steps: [
      {
        title: 'Video Topic or Script Ingestion',
        desc: 'Accepts finished video script, draft title, or core concept.',
        type: 'Trigger',
        inputFormat: 'Text Script or Topic',
        outputFormat: 'Core Narrative Hook'
      },
      {
        title: 'Psychological Hook & Title Brainstorming',
        desc: 'Generates 10 titles using psychological triggers (negativity bias, curiosity gap, extreme specificity).',
        type: 'AI Model',
        toolName: 'ChatGPT',
        toolSlug: 'chatgpt',
        inputFormat: 'Script Hook',
        outputFormat: '10 High-CTR Titles',
        promptTemplate: 'Analyze this video concept: [CONCEPT]. Generate 10 YouTube video titles under 50 characters. Use psychological patterns: 3 curiosity-gap titles, 3 fear-of-missing-out titles, 2 beginner-friendly titles, 2 authoritative bold claim titles.'
      },
      {
        title: 'Thumbnail Visual Composition Prompts',
        desc: 'Designs 5 distinct thumbnail layouts with high contrast focal points, expression, and minimal text.',
        type: 'Transformation',
        inputFormat: 'Top 3 Selected Titles',
        outputFormat: '5 Diffusion Prompts (16:9 aspect ratio)'
      },
      {
        title: 'Visual Mockup Rendering',
        desc: 'Renders photorealistic thumbnail concept art ready for photo manipulation or direct use.',
        type: 'AI Model',
        toolName: 'FLUX.1',
        toolSlug: 'flux',
        inputFormat: 'Visual Prompts',
        outputFormat: '5 High-Res 1280x720 PNG Mockups'
      }
    ],
    output: '10 high-CTR video titles and 5 photorealistic 16:9 thumbnail concept mockups.',
    credentialsNeeded: ['OpenAI API Key', 'Black Forest Labs or Midjourney Account'],
    systemPromptSnippet: 'Never recommend thumbnails with more than 3 words of text. The thumbnail must complement the title, not duplicate it.',
    troubleshootingTips: [
      'Preview thumbnails at 150px thumbnail size to ensure facial expressions and main objects remain legible on mobile feeds.',
      'Maintain strong complementary color contrast (blue vs orange, yellow vs dark violet) to stand out against YouTube dark mode.'
    ],
    relatedCreatorSlugs: ['matt-wolfe', 'ai-jason']
  },
  {
    id: 'ecommerce-product-photo-studio',
    title: 'E-Commerce Product Photo Studio & Ad Variant Generator',
    goal: 'Turn flat-lay product photos into 20 photorealistic lifestyle scenes and social ad variants in minutes.',
    category: 'Design & Media',
    difficulty: 'Beginner',
    time: '20 mins setup',
    estimatedCost: '~$10/mo',
    toolsUsed: [
      { name: 'Photoroom', slug: 'photoroom' },
      { name: 'FLUX.1', slug: 'flux' },
      { name: 'Canva AI', slug: 'canva-ai' }
    ],
    budgetVariants: {
      free: {
        name: 'Local ComfyUI Inpainting',
        stack: ['RMBG 1.4 Background Remover', 'ComfyUI (FLUX Inpainting)'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Removes background with open RMBG model and inpaints commercial studio backgrounds locally.',
        pros: 'Zero cost, complete resolution control.',
        cons: 'Requires 12GB VRAM and ComfyUI setup.'
      },
      freemium: {
        name: 'Photoroom + Recraft Stack',
        stack: ['Photoroom Free Tier', 'Recraft AI Vector/Raster'],
        costUsd: '~$9 / month',
        costInr: '₹750 / month',
        summary: 'One-click background isolation paired with commercial lighting presets.',
        pros: 'Mobile-friendly, instant studio shadows, clean reflections.',
        cons: 'Free exports include watermark.'
      },
      paid: {
        name: 'Flair.ai + AdCreative Suite',
        stack: ['Flair.ai Pro', 'AdCreative.ai Enterprise'],
        costUsd: '~$49 / month',
        costInr: '₹4,100 / month',
        summary: 'Complete multi-channel ad variant generator generating conversion-scored banners.',
        pros: 'Generates Instagram, Facebook, and Amazon compliant ad ratios simultaneously.',
        cons: 'Subscription cost.'
      }
    },
    steps: [
      {
        title: 'Product Image Upload',
        desc: 'Accepts raw smartphone photo of product on any plain surface.',
        type: 'Trigger',
        inputFormat: 'Raw Product JPG/PNG',
        outputFormat: 'Image Buffer'
      },
      {
        title: 'Precision Background Removal',
        desc: 'Isolates product edges, handles transparency, and preserves fine shadows.',
        type: 'Transformation',
        toolName: 'Photoroom',
        toolSlug: 'photoroom',
        inputFormat: 'Raw Image',
        outputFormat: 'Isolated Product PNG (Transparent)'
      },
      {
        title: 'Scene Environment Generation',
        desc: 'Places product into contextual lifestyle scenes (marble bathroom, sunny kitchen counter, minimalist studio).',
        type: 'AI Model',
        toolName: 'FLUX.1',
        toolSlug: 'flux',
        inputFormat: 'Isolated PNG + Scene Prompt',
        outputFormat: 'Composed Lifestyle Image with Realistic Shadows'
      },
      {
        title: 'Ad Copy & Banner Overlay',
        desc: 'Overlays promotional badge, price tag, and headline formatted for Instagram story and feed.',
        type: 'Output',
        inputFormat: 'Composed Image + Promo Copy',
        outputFormat: '20 High-Res Ad Variants (1:1, 9:16, 4:5)'
      }
    ],
    output: '20 high-resolution lifestyle product ad assets formatted for Instagram, Amazon, and Shopify.',
    credentialsNeeded: ['Photoroom API Key or Local ComfyUI'],
    systemPromptSnippet: 'Ensure product geometry, labels, and logos remain 100% unaltered. Only alter lighting, reflections, and surrounding environment.',
    troubleshootingTips: [
      'Maintain correct contact shadow beneath the product to prevent it from looking like a floating sticker.',
      'Check that bottle text or logos are not reversed when generating mirrored surface reflections.'
    ],
    relatedCreatorSlugs: ['matt-wolfe', 'ai-jason']
  },
  {
    id: 'autonomous-customer-support-triage',
    title: 'Autonomous Customer Support Triage & RAG Ticket Resolver',
    goal: 'Classify incoming Zendesk/Intercom support tickets, resolve 40% autonomously, and draft replies for agents.',
    category: 'Customer Support',
    difficulty: 'Intermediate',
    time: '30 mins setup',
    estimatedCost: '~$15/mo',
    toolsUsed: [
      { name: 'Intercom Fin', slug: 'intercom-fin' },
      { name: 'Claude', slug: 'claude' },
      { name: 'n8n', slug: 'n8n' }
    ],
    budgetVariants: {
      free: {
        name: 'Ollama + Open-Source Helpdesk',
        stack: ['Chatwoot (Open Source)', 'Ollama (Llama 3.3)', 'n8n'],
        costUsd: '$0',
        costInr: '₹0',
        summary: 'Connects open-source Chatwoot to local LLM with zero per-ticket charges.',
        pros: 'Zero cost per ticket, keeps all customer PII on your own server.',
        cons: 'Requires self-hosting Chatwoot.'
      },
      freemium: {
        name: 'Zendesk + Claude 3.5 Haiku',
        stack: ['Zendesk Webhook', 'Claude 3.5 Haiku API', 'n8n Cloud'],
        costUsd: '~$12 / month',
        costInr: '₹1,000 / month',
        summary: 'Triages 2,000 tickets monthly; drafts human-like responses for agent review.',
        pros: 'Cuts human response time from hours to seconds.',
        cons: 'Requires existing Zendesk seat.'
      },
      paid: {
        name: 'Intercom Fin AI Copilot',
        stack: ['Intercom Fin ($0.99 per resolution)', 'Salesforce Service Cloud'],
        costUsd: '~$150 / month',
        costInr: '₹12,500 / month',
        summary: 'Fully autonomous resolution engine with native CRM order cancellation actions.',
        pros: 'Resolves complex refund flows without human intervention.',
        cons: 'Per-resolution billing model.'
      }
    },
    steps: [
      {
        title: 'New Support Ticket Ingestion',
        desc: 'Fires when customer submits support request via email, chat widget, or web portal.',
        type: 'Trigger',
        inputFormat: 'Ticket Webhook JSON',
        outputFormat: 'Customer Message + Ticket Metadata'
      },
      {
        title: 'Sentiment & Urgency Classification',
        desc: 'Classifies ticket into categories (Billing, Technical Bug, Feature Request, Churn Risk) with urgency score 1-5.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Ticket Body',
        outputFormat: 'Category, Urgency Score, Churn Risk Boolean'
      },
      {
        title: 'Customer Data & Knowledge Search',
        desc: 'Looks up customer subscription tier in database and fetches matching help center guides.',
        type: 'Logic',
        inputFormat: 'Customer ID + Topic',
        outputFormat: 'Customer Plan + Relevant Doc Chunks'
      },
      {
        title: 'Autonomous Resolution or Draft Reply',
        desc: 'If confidence > 85%, replies directly to customer; otherwise saves draft for human agent approval.',
        type: 'AI Model',
        toolName: 'Claude',
        toolSlug: 'claude',
        inputFormat: 'Ticket + Help Docs + Customer Tier',
        outputFormat: 'Polite, Actionable Resolution Email'
      },
      {
        title: 'Ticket Status Update',
        desc: 'Applies tags (e.g. #billing, #resolved-by-ai), sets priority, and notifies on-call engineer if urgent.',
        type: 'Output',
        inputFormat: 'Updated Ticket State',
        outputFormat: 'Updated Helpdesk Ticket'
      }
    ],
    output: 'Instant autonomous ticket resolution or high-accuracy internal draft with verified account context.',
    credentialsNeeded: ['Helpdesk API Token (Zendesk / Intercom / Chatwoot)', 'Anthropic API Key'],
    systemPromptSnippet: 'If a customer expresses extreme frustration or threatens legal action, immediately set "escalate_to_human: true" and do not attempt automated deflection.',
    troubleshootingTips: [
      'Strip customer credit card numbers, passwords, and sensitive PII before passing body to LLM APIs.',
      'Track deflection rate weekly; refine help center documentation for questions that frequently require human escalation.'
    ],
    relatedCreatorSlugs: ['cole-medin', 'ai-jason']
  }
];

// Production-Grade Prompts and API Schemas for all 16 Flagship Workflows
export const WORKFLOW_PROMPT_SCHEMAS: Record<string, { systemPrompt: string; userPromptTemplate: string; apiPayloadSchema: Record<string, any> }> = {
  'shorts-creator-pipeline': {
    systemPrompt: `You are an automated YouTube Shorts retention engineer and viral short-form scriptwriter. Maintain a pacing of 145-160 words per minute. Output strict RFC 8259 JSON format with zero conversational filler. Structure scripts with: 1) A 3-second pattern-interrupt hook, 2) Context & stakes, 3) 3 fast narrative beats, and 4) Organic loop CTA.`,
    userPromptTemplate: `Draft a 50-second YouTube Shorts script for topic: "{{topic}}".\nInclude 5 visual b-roll prompts (1080x1920) formatted for Midjourney/Flux, and dynamic caption emphasis cues.\n\nInput Topic Payload: {{input_json}}`,
    apiPayloadSchema: {
      model: "gpt-4o",
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are an automated YouTube Shorts retention engineer..." },
        { role: "user", content: "Draft a 50-second YouTube Shorts script for topic: {{topic}}..." }
      ],
      max_tokens: 1500
    }
  },
  'pr-code-review-bot': {
    systemPrompt: `You are a Principal Security & Staff Software Engineer conducting an automated code review on GitHub pull requests. Inspect git diffs for: 1) OWASP Top 10 vulnerabilities (SQLi, SSRF, XSS, ReDoS), 2) Memory/resource leaks, 3) Big-O time and space complexity regressions, and 4) Missing unit tests. Provide actionable markdown diff suggestions with exact file paths and line numbers.`,
    userPromptTemplate: `Review PR #{{pr_number}} for repository {{repo_name}}.\n\nGit Diff:\n{{git_diff}}\n\nCommit Message: {{commit_message}}`,
    apiPayloadSchema: {
      model: "claude-3-7-sonnet",
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are a Principal Security & Staff Software Engineer..." },
        { role: "user", content: "Review PR #{{pr_number}} for repository {{repo_name}}..." }
      ],
      max_tokens: 3000
    }
  },
  'indic-customer-support-agent': {
    systemPrompt: `You are a multilingual AI support representative specializing in Indian languages (Hindi, Hinglish, Tamil, Telugu, Kannada, Bengali, and English). Maintain polite, helpful, and empathetic tone. Never hallucinate refund amounts or shipping guarantees outside the provided merchant policy document. If sentiment is hostile or issue is legal/fraud, route to human specialist.`,
    userPromptTemplate: `User message: "{{customer_query}}"\nDetected language: {{language_code}}\nCustomer Tier: {{customer_tier}}\nKnowledge Base Context:\n{{kb_chunks}}`,
    apiPayloadSchema: {
      model: "sarvam-2b-indic",
      temperature: 0.3,
      messages: [
        { role: "system", content: "You are a multilingual AI support representative specializing in Indian languages..." },
        { role: "user", content: "User message: {{customer_query}}..." }
      ],
      max_tokens: 800
    }
  },
  'seo-content-factory': {
    systemPrompt: `You are an elite programmatic SEO content architect and technical writer. You produce comprehensive, highly authoritative pillar pages that rank for high-intent search queries. Adhere strictly to Google Helpful Content guidelines: include real code examples, comparison tables, FAQ schema in JSON-LD, and zero repetitive fluff.`,
    userPromptTemplate: `Target Keyword: "{{keyword}}"\nSearch Intent: {{intent}}\nCompetitor Word Counts: {{avg_words}}\nSERP Headings to Outrank: {{serp_outlines}}`,
    apiPayloadSchema: {
      model: "gpt-4o",
      temperature: 0.5,
      messages: [
        { role: "system", content: "You are an elite programmatic SEO content architect..." },
        { role: "user", content: "Target Keyword: {{keyword}}..." }
      ],
      max_tokens: 4000
    }
  },
  'b2b-lead-enrichment-pipeline': {
    systemPrompt: `You are a B2B Revenue Operations & Data Enrichment Specialist. Given raw lead inputs (work email, company domain), analyze company headcount, tech stack, funding round, and ICP tier (Tier A/B/C). Output strict JSON suitable for instant Salesforce / HubSpot webhook ingest.`,
    userPromptTemplate: `Enrich lead:\nName: {{lead_name}}\nEmail: {{lead_email}}\nCompany Domain: {{company_domain}}\nRaw Scrape: {{website_text}}`,
    apiPayloadSchema: {
      model: "claude-3-5-haiku",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a B2B Revenue Operations & Data Enrichment Specialist..." },
        { role: "user", content: "Enrich lead: {{lead_name}}..." }
      ],
      max_tokens: 1000
    }
  },
  'local-private-rag-knowledgebase': {
    systemPrompt: `You are an on-premise RAG Assistant running locally via Ollama. You have zero access to the public internet. You must answer user inquiries using ONLY the provided chunk excerpts from private internal documentation. If the information is not contained in the context, explicitly reply: "Information not found in provided internal documents." Never speculate or extrapolate beyond the text.`,
    userPromptTemplate: `Query: {{user_question}}\n\nRetrieved Context Chunks (Top 5):\n{{retrieved_context}}`,
    apiPayloadSchema: {
      model: "deepseek-r1-14b",
      temperature: 0.1,
      messages: [
        { role: "system", content: "You are an on-premise RAG Assistant running locally via Ollama..." },
        { role: "user", content: "Query: {{user_question}}..." }
      ],
      max_tokens: 1500
    }
  },
  'automated-invoice-financial-extractor': {
    systemPrompt: `You are a financial OCR auditor. Extract all structured accounting data from unstructured invoice text or PDF vision OCR. Output strict JSON with: invoice_id, vendor_name, vendor_tax_id, issue_date, due_date, line_items (description, quantity, unit_price, total), subtotal, tax_amount, total_amount, currency. Verify that sum(line_items) equals subtotal.`,
    userPromptTemplate: `Invoice OCR Text:\n{{ocr_raw_text}}\n\nExpected Currency: {{currency_code}}`,
    apiPayloadSchema: {
      model: "gpt-4o",
      temperature: 0.0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a financial OCR auditor..." },
        { role: "user", content: "Invoice OCR Text: {{ocr_raw_text}}..." }
      ],
      max_tokens: 2000
    }
  },
  'podcast-to-social-clips-factory': {
    systemPrompt: `You are a podcast media producer. Given full audio transcript with timestamps, identify the top 3 highest-energy, most insightful standalone clips (each 30-90 seconds). Provide exact start and end timestamps, viral hook caption, and Twitter thread / LinkedIn carousel summary for each clip.`,
    userPromptTemplate: `Podcast Title: {{podcast_title}}\nTranscript with Timestamps:\n{{transcript_chunk}}`,
    apiPayloadSchema: {
      model: "claude-3-5-sonnet",
      temperature: 0.6,
      messages: [
        { role: "system", content: "You are a podcast media producer..." },
        { role: "user", content: "Podcast Title: {{podcast_title}}..." }
      ],
      max_tokens: 2500
    }
  },
  'academic-literature-synthesis': {
    systemPrompt: `You are an academic research fellow and systematic literature review engine. Given research paper abstracts and methodology sections, synthesize key findings, sample sizes, benchmark datasets used, statistical significance (p-values), and open research limitations. Output structured comparative matrix in Markdown.`,
    userPromptTemplate: `Research Topic: {{research_topic}}\nPapers Input (BibTeX + Abstracts):\n{{papers_data}}`,
    apiPayloadSchema: {
      model: "claude-3-7-sonnet",
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are an academic research fellow..." },
        { role: "user", content: "Research Topic: {{research_topic}}..." }
      ],
      max_tokens: 3500
    }
  },
  'figma-to-production-code-pipeline': {
    systemPrompt: `You are a Senior Frontend Engineer. Convert Figma design tokens and component hierarchy into clean, accessible Tailwind CSS v4 and semantic Astro/React components. Follow strict mobile-first design, WCAG AAA contrast, semantic HTML tags, and clean TypeScript props interfaces.`,
    userPromptTemplate: `Figma Component Schema:\n{{figma_json_tree}}\nTarget Framework: {{framework}} (Tailwind CSS v4)`,
    apiPayloadSchema: {
      model: "claude-3-5-sonnet",
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are a Senior Frontend Engineer..." },
        { role: "user", content: "Figma Component Schema: {{figma_json_tree}}..." }
      ],
      max_tokens: 3000
    }
  },
  'voice-meeting-to-crm-action-items': {
    systemPrompt: `You are an Executive Chief of Staff and CRM Administrator. Parse meeting transcripts to extract: 1) Decisions made, 2) Action items with assigned owners and deadlines, 3) Unresolved objections, and 4) Structured CRM deal update notes formatted for HubSpot/Salesforce activity log.`,
    userPromptTemplate: `Meeting Subject: {{meeting_subject}}\nParticipants: {{attendees}}\nTranscript:\n{{meeting_transcript}}`,
    apiPayloadSchema: {
      model: "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are an Executive Chief of Staff..." },
        { role: "user", content: "Meeting Subject: {{meeting_subject}}..." }
      ],
      max_tokens: 1500
    }
  },
  'competitor-pricing-news-digest-bot': {
    systemPrompt: `You are a Competitive Intelligence Analyst. Monitor competitor website changelogs, pricing page snapshots, and press releases. Flag price increases, tier restructurings, feature deprecations, and new feature announcements. Classify threat level: High / Medium / Low.`,
    userPromptTemplate: `Competitor: {{competitor_name}}\nPrevious Pricing HTML Snapshot vs Current HTML Snapshot:\n{{diff_payload}}`,
    apiPayloadSchema: {
      model: "deepseek-v3",
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are a Competitive Intelligence Analyst..." },
        { role: "user", content: "Competitor: {{competitor_name}}..." }
      ],
      max_tokens: 2000
    }
  },
  'multi-agent-market-research-pitch-deck': {
    systemPrompt: `You are a Venture Partner and Market Sizing Strategist. Conduct top-down and bottom-up TAM/SAM/SOM calculations for startup pitch decks. Cite industry benchmarks (Gartner, IDC, PitchBook) where available, outline 3 distinct revenue models, and generate 10 slide outline ready for investment review.`,
    userPromptTemplate: `Startup Idea: {{startup_pitch}}\nTarget Geography: {{geography}}\nBusiness Model: {{business_model}}`,
    apiPayloadSchema: {
      model: "o3-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: "You are a Venture Partner and Market Sizing Strategist..." },
        { role: "user", content: "Startup Idea: {{startup_pitch}}..." }
      ],
      max_tokens: 3000
    }
  },
  'youtube-thumbnail-ab-concept-generator': {
    systemPrompt: `You are an elite YouTube Creative Director & CTR Specialist. Given video title and target audience, produce 3 radically contrasting thumbnail visual concepts (Concept A: High Emotion/Face close-up, Concept B: Storyboard/Before-After, Concept C: Intriguing Minimalist Curiosity Gap). Provide Midjourney v6.1 generation prompt and 3-word bold overlay text for each.`,
    userPromptTemplate: `Video Title: "{{video_title}}"\nNiche: {{channel_niche}}\nTarget Audience: {{audience_demographic}}`,
    apiPayloadSchema: {
      model: "gpt-4o",
      temperature: 0.8,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are an elite YouTube Creative Director & CTR Specialist..." },
        { role: "user", content: "Video Title: {{video_title}}..." }
      ],
      max_tokens: 1500
    }
  },
  'ecommerce-product-photo-studio': {
    systemPrompt: `You are an e-commerce commercial photographer and prompt engineer for ComfyUI and Flux.1. Given a plain white-background product catalog photo and category, generate 4 commercial lifestyle scene prompts (e.g. Scandinavian marble kitchen, luxury studio gradient, outdoor natural daylight, cyberpunk neon display) with precise lighting, camera lens parameters, and negative prompts.`,
    userPromptTemplate: `Product: {{product_name}}\nCategory: {{category}}\nPrimary Color: {{color_palette}}`,
    apiPayloadSchema: {
      model: "claude-3-5-haiku",
      temperature: 0.6,
      messages: [
        { role: "system", content: "You are an e-commerce commercial photographer..." },
        { role: "user", content: "Product: {{product_name}}..." }
      ],
      max_tokens: 1200
    }
  },
  'autonomous-customer-support-triage': {
    systemPrompt: `You are an autonomous tier-1 helpdesk triage agent. Classify inbound tickets by intent (Billing, Bug, Feature Request, How-To, Account Access), detect customer churn risk (Low / Medium / High / Critical), and extract user platform/browser info. If confidence >= 90%, draft immediate resolution reply citing official docs; otherwise route to human agent with triage notes.`,
    userPromptTemplate: `Customer Ticket #{{ticket_id}}:\nSubject: {{ticket_subject}}\nBody: {{ticket_body}}\nCustomer Tier: {{account_tier}}`,
    apiPayloadSchema: {
      model: "claude-3-5-sonnet",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are an autonomous tier-1 helpdesk triage agent..." },
        { role: "user", content: "Customer Ticket #{{ticket_id}}..." }
      ],
      max_tokens: 1500
    }
  }
};

// Augment all 16 workflows with authentic production prompt schemas
WORKFLOWS_DATA.forEach(wf => {
  const schema = WORKFLOW_PROMPT_SCHEMAS[wf.id];
  if (schema) {
    wf.systemPrompt = schema.systemPrompt;
    wf.userPromptTemplate = schema.userPromptTemplate;
    wf.apiPayloadSchema = schema.apiPayloadSchema;
  }
});
