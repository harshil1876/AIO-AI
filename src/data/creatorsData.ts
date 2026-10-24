export interface CreatorVideo {
  title: string;
  url: string;
  viewsEstimate?: string;
  duration?: string;
  topicTag?: string;
}

export interface CreatorCurriculumPillar {
  pillarTitle: string;
  description: string;
  skillsAcquired: string[];
}

export interface CreatorData {
  id: string;
  slug: string;
  channelName: string;
  handle: string;
  youtubeUrl: string;
  avatarUrl: string;
  description: string;
  primaryCategory: 'AI Coding' | 'AI Tutorials' | 'AI News' | 'AI Agents' | 'AI Research' | 'Indian AI' | 'No-Code & Workflows';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  isIndiaCreator: boolean;
  subscribersEstimate: string;
  avgViewsEstimate: string;
  uploadCadence: string;
  typicalVideoDepth: string;
  educationalScore: number; // 0-100
  language: string;
  curriculumPillars: CreatorCurriculumPillar[];
  topTopics: string[];
  topVideos: CreatorVideo[];
  toolsTaught: string[]; // Slugs of tools in seedData
  inspiredWorkflowIds: string[]; // Slugs of workflows
}

export const CREATORS_DATA: CreatorData[] = [
  {
    id: 'andrej-karpathy',
    slug: 'andrej-karpathy',
    channelName: 'Andrej Karpathy',
    handle: '@karpathy',
    youtubeUrl: 'https://www.youtube.com/@karpathy',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Former Director of AI at Tesla and OpenAI founding research scientist. Creates deep, mathematical and code-first masterclasses on building transformer architectures, micrograd, and autonomous reasoning agents from scratch in Python.',
    primaryCategory: 'AI Research',
    difficulty: 'intermediate',
    isIndiaCreator: false,
    subscribersEstimate: '980K+',
    avgViewsEstimate: '850K',
    uploadCadence: 'Monthly Deep Dives',
    typicalVideoDepth: '1 - 3 hours per lecture',
    educationalScore: 99,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Neural Networks from Scratch',
        description: 'Understand backpropagation, computational graphs, and loss functions by implementing Micrograd in pure Python.',
        skillsAcquired: ['Backpropagation math', 'Automatic differentiation', 'Autograd engines']
      },
      {
        pillarTitle: 'GPT Architecture & Tokenization',
        description: 'Step-by-step construction of the decoder-only transformer architecture and Byte-Pair Encoding (BPE).',
        skillsAcquired: ['Self-attention math', 'Multi-head attention', 'Tokenizer training']
      },
      {
        pillarTitle: 'Autonomous Reasoning & RL',
        description: 'How modern models develop multi-step problem solving via Reinforcement Learning with Verifiable Rewards.',
        skillsAcquired: ['Test-time compute', 'RLVR loops', 'Search-guided generation']
      }
    ],
    topTopics: ['LLM Architecture from scratch', 'Neural Networks', 'Micrograd', 'Tokenization', 'Backpropagation'],
    topVideos: [
      { title: 'Let build GPT: from scratch, in code, spelled out', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', viewsEstimate: '4.9M', duration: '1h 56m', topicTag: 'Transformers' },
      { title: 'The spelled-out intro to neural networks and backprop: micrograd', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', viewsEstimate: '2.2M', duration: '2h 25m', topicTag: 'Neural Networks' },
      { title: 'Intro to Large Language Models (Busy Person Intro)', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', viewsEstimate: '2.5M', duration: '1h 00m', topicTag: 'LLM Foundations' }
    ],
    toolsTaught: ['llama-3', 'hugging-face', 'ollama'],
    inspiredWorkflowIds: ['pr-code-review-bot', 'local-private-rag-knowledgebase']
  },
  {
    id: '3blue1brown',
    slug: '3blue1brown',
    channelName: '3Blue1Brown',
    handle: '@3blue1brown',
    youtubeUrl: 'https://www.youtube.com/@3blue1brown',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Grant Sanderson’s visual mathematics channel. Renowned worldwide for geometric animations explaining linear algebra, neural network calculus, attention mechanisms, and gradient descent intuitively.',
    primaryCategory: 'AI Research',
    difficulty: 'beginner',
    isIndiaCreator: false,
    subscribersEstimate: '6.4M+',
    avgViewsEstimate: '1.8M',
    uploadCadence: 'Bi-weekly / Monthly',
    typicalVideoDepth: '20 - 45 mins',
    educationalScore: 98,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Visual Calculus of Neural Networks',
        description: 'Geometric intuition behind high-dimensional weight matrices and loss landscapes.',
        skillsAcquired: ['Gradient descent geometry', 'Chain rule in matrices', 'Weight updates']
      },
      {
        pillarTitle: 'Attention Mechanism Geometric Visuals',
        description: 'How Queries, Keys, and Values navigate conceptual semantic space.',
        skillsAcquired: ['Vector dot products', 'Semantic embedding spaces', 'Softmax attention']
      }
    ],
    topTopics: ['Transformer Math', 'Linear Algebra for ML', 'Backpropagation Calculus', 'Information Theory'],
    topVideos: [
      { title: 'Visualizing Attention, a key idea in modern AI', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', viewsEstimate: '3.4M', duration: '26m', topicTag: 'Attention Math' },
      { title: 'What is a neural network? | Chapter 1, Deep learning', url: 'https://www.youtube.com/watch?v=aircAruvnKk', viewsEstimate: '16M', duration: '19m', topicTag: 'Deep Learning' },
      { title: 'Gradient descent, how neural networks learn | Chapter 2', url: 'https://www.youtube.com/watch?v=IHZwWFHWa-w', viewsEstimate: '6.8M', duration: '21m', topicTag: 'Calculus' }
    ],
    toolsTaught: ['llama-3', 'hugging-face'],
    inspiredWorkflowIds: ['academic-literature-synthesis']
  },
  {
    id: 'fireship',
    slug: 'fireship',
    channelName: 'Fireship',
    handle: '@Fireship',
    youtubeUrl: 'https://www.youtube.com/@Fireship',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    description: 'Jeff Delaney’s ultra-fast, high-density tech channel delivering 100-second explainers and fast-paced code breakdowns on frontier AI models, developer tools, and framework updates.',
    primaryCategory: 'AI Coding',
    difficulty: 'all-levels',
    isIndiaCreator: false,
    subscribersEstimate: '3.3M+',
    avgViewsEstimate: '600K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '3 - 10 mins',
    educationalScore: 94,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: '100 Seconds Architecture Overviews',
        description: 'Rapid-fire breakdowns of MCP, vector databases, and agentic protocols.',
        skillsAcquired: ['Quick tech stack evaluation', 'Emerging tool awareness']
      },
      {
        pillarTitle: 'Hands-on AI Fullstack Demos',
        description: 'Building apps with Supabase, Next.js/Astro, and frontier LLM APIs in under 10 minutes.',
        skillsAcquired: ['Fullstack AI integration', 'API rate limit handling']
      }
    ],
    topTopics: ['AI Coding Tools', 'Model Context Protocol', 'Cursor vs Windsurf', 'Supabase Vector', 'Ollama'],
    topVideos: [
      { title: 'Cursor AI in 100 Seconds', url: 'https://www.youtube.com/watch?v=yk9lXobJ97E', viewsEstimate: '1.2M', duration: '2m 15s', topicTag: 'Cursor' },
      { title: 'DeepSeek Changed Everything... Here is why', url: 'https://www.youtube.com/watch?v=7u5pP5m6_7A', viewsEstimate: '1.9M', duration: '8m 30s', topicTag: 'DeepSeek' },
      { title: 'The Model Context Protocol explained', url: 'https://www.youtube.com/watch?v=example-mcp', viewsEstimate: '850K', duration: '7m 10s', topicTag: 'MCP' }
    ],
    toolsTaught: ['cursor', 'windsurf', 'deepseek', 'gemini'],
    inspiredWorkflowIds: ['pr-code-review-bot', 'figma-to-production-code-pipeline']
  },
  {
    id: 'theprimeagen',
    slug: 'theprimeagen',
    channelName: 'ThePrimeagen',
    handle: '@ThePrimeagen',
    youtubeUrl: 'https://www.youtube.com/@ThePrimeagen',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    description: 'Former Netflix principal engineer providing unvarnished, high-energy critiques of AI coding agents, terminal tools (Vim, Neovim, Rust, Go), and practical software engineering realities.',
    primaryCategory: 'AI Coding',
    difficulty: 'advanced',
    isIndiaCreator: false,
    subscribersEstimate: '820K+',
    avgViewsEstimate: '350K',
    uploadCadence: 'Daily / 3x Weekly',
    typicalVideoDepth: '15 - 45 mins',
    educationalScore: 92,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Pragmatic AI Code Review',
        description: 'Critiquing AI-generated code for hidden race conditions, bloated abstractions, and memory safety.',
        skillsAcquired: ['Code smell detection', 'Performance profiling', 'Terminal mastery']
      },
      {
        pillarTitle: 'CLI Agent Workflows',
        description: 'Using Aider, local LLMs, and Git diff automation in production development.',
        skillsAcquired: ['Aider CLI mastery', 'Git refactoring scripts', 'Neovim AI plugins']
      }
    ],
    topTopics: ['AI Coding Tools', 'Aider CLI', 'Neovim AI Plugins', 'Software Engineering Integrity', 'Rust AI Tooling'],
    topVideos: [
      { title: 'Cursor vs My Vim Setup: Honest Reaction', url: 'https://www.youtube.com/watch?v=example-prime-cursor', viewsEstimate: '650K', duration: '28m', topicTag: 'IDE Review' },
      { title: 'Is AI Actually Replacing Software Engineers?', url: 'https://www.youtube.com/watch?v=example-prime-future', viewsEstimate: '920K', duration: '34m', topicTag: 'Industry Trends' }
    ],
    toolsTaught: ['cursor', 'github-copilot', 'claude'],
    inspiredWorkflowIds: ['pr-code-review-bot']
  },
  {
    id: 'matthew-berman',
    slug: 'matthew-berman',
    channelName: 'Matthew Berman',
    handle: '@MatthewBerman',
    youtubeUrl: 'https://www.youtube.com/@MatthewBerman',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    description: 'The go-to engineer for local open-source AI models, Ollama setup, Pinokio installations, and step-by-step benchmarks comparing closed frontier APIs with self-hosted weights.',
    primaryCategory: 'AI Tutorials',
    difficulty: 'all-levels',
    isIndiaCreator: false,
    subscribersEstimate: '670K+',
    avgViewsEstimate: '220K',
    uploadCadence: '4x Weekly',
    typicalVideoDepth: '15 - 30 mins',
    educationalScore: 93,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Local AI Setup & Quantization',
        description: 'How to install Ollama, LM Studio, and Open-WebUI on Windows, Mac, and Linux.',
        skillsAcquired: ['GGUF quantization', 'VRAM management', 'Local context setting']
      },
      {
        pillarTitle: 'Open-Source Model Benchmarks',
        description: 'Objective side-by-side evaluations of Llama 3.3, DeepSeek-R1, and Mistral models.',
        skillsAcquired: ['Model benchmark testing', 'Prompt evaluation techniques']
      }
    ],
    topTopics: ['Ollama Guides', 'DeepSeek-R1 Setup', 'Open-WebUI RAG', 'Local Fine-Tuning', 'Uncensored Models'],
    topVideos: [
      { title: 'How to Run DeepSeek-R1 100% Locally on Your Computer', url: 'https://www.youtube.com/watch?v=example-berman-r1', viewsEstimate: '850K', duration: '18m', topicTag: 'DeepSeek' },
      { title: 'Ollama Full Tutorial: The Best Local AI Tool', url: 'https://www.youtube.com/watch?v=example-berman-ollama', viewsEstimate: '620K', duration: '22m', topicTag: 'Ollama' }
    ],
    toolsTaught: ['ollama', 'deepseek', 'llama-3'],
    inspiredWorkflowIds: ['local-private-rag-knowledgebase']
  },
  {
    id: 'cole-medin',
    slug: 'cole-medin',
    channelName: 'Cole Medin',
    handle: '@ColeMedin',
    youtubeUrl: 'https://www.youtube.com/@ColeMedin',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    description: 'Premier educator for autonomous multi-agent systems, n8n automation pipelines, LangChain, and production-grade tool-calling architectures for businesses.',
    primaryCategory: 'AI Agents',
    difficulty: 'intermediate',
    isIndiaCreator: false,
    subscribersEstimate: '280K+',
    avgViewsEstimate: '110K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '20 - 40 mins',
    educationalScore: 95,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'n8n AI Agent Architecture',
        description: 'Constructing robust agents with persistent vector memory, tool calling, and human loops.',
        skillsAcquired: ['n8n AI nodes', 'Webhook routing', 'State management']
      },
      {
        pillarTitle: 'Production RAG & Fallbacks',
        description: 'Handling model hallucination with multi-stage verification and JSON schema parsing.',
        skillsAcquired: ['Guardrail implementation', 'JSON validation', 'Fallback routing']
      }
    ],
    topTopics: ['n8n AI Agents', 'LangChain Production', 'Autonomous Workflows', 'Multi-Agent Teams', 'Tool Calling'],
    topVideos: [
      { title: 'The Complete n8n AI Agent Masterclass', url: 'https://www.youtube.com/watch?v=example-cole-n8n', viewsEstimate: '420K', duration: '45m', topicTag: 'n8n Masterclass' },
      { title: 'Building a Lead Scraping & AI Outreach Bot in n8n', url: 'https://www.youtube.com/watch?v=example-cole-leads', viewsEstimate: '290K', duration: '32m', topicTag: 'Lead Gen' }
    ],
    toolsTaught: ['n8n', 'claude', 'make', 'dify'],
    inspiredWorkflowIds: ['shorts-creator-pipeline', 'indic-customer-support-agent', 'b2b-lead-enrichment-pipeline']
  },
  {
    id: 'ai-jason',
    slug: 'ai-jason',
    channelName: 'AI Jason',
    handle: '@AIJason',
    youtubeUrl: 'https://www.youtube.com/@AIJason',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    description: 'Hands-on practical tutorials building automated AI workflows, Langflow/Dify visual agents, web scraping bots, and AI micro-SaaS products without heavy boilerplate.',
    primaryCategory: 'No-Code & Workflows',
    difficulty: 'beginner',
    isIndiaCreator: false,
    subscribersEstimate: '390K+',
    avgViewsEstimate: '140K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '15 - 25 mins',
    educationalScore: 92,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Visual Agent Builders (Dify & Langflow)',
        description: 'Building enterprise chatbots and scraping pipelines visually in under 30 minutes.',
        skillsAcquired: ['Visual flow design', 'API key routing', 'Prompt template chaining']
      },
      {
        pillarTitle: 'Automated Content & Research Engines',
        description: 'Creating autonomous YouTube research and social media content factories.',
        skillsAcquired: ['Web scraping logic', 'Content formatting', 'Multi-platform scheduling']
      }
    ],
    topTopics: ['Dify.ai Tutorials', 'Langflow Guides', 'AI Automation Pipelines', 'Web Scraping Agents', 'Make.com AI'],
    topVideos: [
      { title: 'Build an AI Agent in 15 Minutes with Dify', url: 'https://www.youtube.com/watch?v=example-jason-dify', viewsEstimate: '380K', duration: '19m', topicTag: 'Dify' },
      { title: 'How to Scrape the Web with AI for Free', url: 'https://www.youtube.com/watch?v=example-jason-scrape', viewsEstimate: '260K', duration: '16m', topicTag: 'Scraping' }
    ],
    toolsTaught: ['dify', 'langflow', 'n8n', 'chatgpt'],
    inspiredWorkflowIds: ['shorts-creator-pipeline', 'seo-content-factory']
  },
  {
    id: 'matt-wolfe',
    slug: 'matt-wolfe',
    channelName: 'Matt Wolfe',
    handle: '@maboris',
    youtubeUrl: 'https://www.youtube.com/@maboris',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    description: 'Creator of FutureTools.io and leading YouTube host reviewing generative art, video generation, music synthesis, and practical creative creator workflows.',
    primaryCategory: 'AI Tutorials',
    difficulty: 'beginner',
    isIndiaCreator: false,
    subscribersEstimate: '610K+',
    avgViewsEstimate: '190K',
    uploadCadence: 'Bi-weekly',
    typicalVideoDepth: '15 - 35 mins',
    educationalScore: 91,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Generative Media & Video Mastery',
        description: 'Comparing Runway, Pika, Kling, and FLUX for creator and marketing production.',
        skillsAcquired: ['Aspect ratio control', 'Motion camera prompts', 'Audio-video syncing']
      }
    ],
    topTopics: ['AI Video Generation', 'Midjourney Updates', 'Weekly AI News', 'Creative AI Tools', 'Suno Music'],
    topVideos: [
      { title: 'The Ultimate Guide to AI Video in 2025', url: 'https://www.youtube.com/watch?v=example-wolfe-video', viewsEstimate: '510K', duration: '24m', topicTag: 'AI Video' },
      { title: 'FLUX vs Midjourney: Full Side-by-Side Test', url: 'https://www.youtube.com/watch?v=example-wolfe-flux', viewsEstimate: '390K', duration: '21m', topicTag: 'Image Gen' }
    ],
    toolsTaught: ['midjourney', 'flux', 'elevenlabs', 'suno'],
    inspiredWorkflowIds: ['shorts-creator-pipeline', 'ecommerce-product-photo-studio', 'youtube-thumbnail-ab-concept-generator']
  },
  {
    id: 'wes-roth',
    slug: 'wes-roth',
    channelName: 'Wes Roth',
    handle: '@WesRoth',
    youtubeUrl: 'https://www.youtube.com/@WesRoth',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Daily executive briefings dissecting frontier AI research papers, compute economics, enterprise AI deployments, and strategic shifts across OpenAI, Anthropic, and Google.',
    primaryCategory: 'AI News',
    difficulty: 'all-levels',
    isIndiaCreator: false,
    subscribersEstimate: '320K+',
    avgViewsEstimate: '130K',
    uploadCadence: 'Daily',
    typicalVideoDepth: '15 - 25 mins',
    educationalScore: 93,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'AI Frontier Paper Analysis',
        description: 'Extracting practical business insights from latest research papers on reasoning and test-time compute.',
        skillsAcquired: ['Research literacy', 'Compute scaling analysis', 'Strategic forecasting']
      }
    ],
    topTopics: ['AI Geopolitics', 'Reasoning Models', 'OpenAI vs Anthropic', 'Compute Infrastructure', 'Enterprise AI'],
    topVideos: [
      { title: 'The Test-Time Compute Revolution Explained', url: 'https://www.youtube.com/watch?v=example-wes-reasoning', viewsEstimate: '280K', duration: '20m', topicTag: 'Reasoning' }
    ],
    toolsTaught: ['perplexity', 'chatgpt', 'claude'],
    inspiredWorkflowIds: ['competitor-pricing-news-digest-bot', 'academic-literature-synthesis']
  },
  {
    id: 'two-minute-papers',
    slug: 'two-minute-papers',
    channelName: 'Two Minute Papers',
    handle: '@twominutepapers',
    youtubeUrl: 'https://www.youtube.com/@twominutepapers',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Dr. Károly Zsolnai-Fehér’s legendary research channel. "What a time to be alive!" brings cutting-edge graphics, physics simulation, and neural rendering breakthroughs to millions with infectious enthusiasm.',
    primaryCategory: 'AI Research',
    difficulty: 'beginner',
    isIndiaCreator: false,
    subscribersEstimate: '1.7M+',
    avgViewsEstimate: '450K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '5 - 10 mins',
    educationalScore: 95,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Neural Rendering & 3D Gaussian Splatting',
        description: 'How neural fields reconstruct photorealistic 3D environments from smartphone video.',
        skillsAcquired: ['NeRF fundamentals', 'Gaussian splatting concepts']
      }
    ],
    topTopics: ['3D Gaussian Splatting', 'Physics Neural Simulators', 'Robotics AI', 'Photorealistic Rendering'],
    topVideos: [
      { title: 'This New AI Video Engine Looks Real', url: 'https://www.youtube.com/watch?v=example-tmp-video', viewsEstimate: '1.4M', duration: '6m', topicTag: 'Generative Video' }
    ],
    toolsTaught: ['hugging-face', 'runway'],
    inspiredWorkflowIds: []
  },
  {
    id: 'yannic-kilcher',
    slug: 'yannic-kilcher',
    channelName: 'Yannic Kilcher',
    handle: '@YannicKilcher',
    youtubeUrl: 'https://www.youtube.com/@YannicKilcher',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    description: 'Deep, line-by-line machine learning paper readings covering model architectures, attention formulations, alignment methodologies, and ML conferences for serious practitioners.',
    primaryCategory: 'AI Research',
    difficulty: 'advanced',
    isIndiaCreator: false,
    subscribersEstimate: '260K+',
    avgViewsEstimate: '80K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '45 - 90 mins',
    educationalScore: 97,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Line-by-Line ML Paper Dissections',
        description: 'Reading official ML paper PDFs directly, analyzing equations, tables, and mathematical proofs.',
        skillsAcquired: ['ArXiv paper comprehension', 'Mathematical rigor in ML', 'Critical benchmark evaluation']
      }
    ],
    topTopics: ['Paper Readings', 'Attention Is All You Need', 'Reinforcement Learning from Human Feedback', 'OpenWeights'],
    topVideos: [
      { title: 'DeepSeek-V3 Architecture Paper Deep Dive', url: 'https://www.youtube.com/watch?v=example-yannic-deepseek', viewsEstimate: '210K', duration: '1h 15m', topicTag: 'Paper Review' }
    ],
    toolsTaught: ['hugging-face', 'deepseek', 'ollama'],
    inspiredWorkflowIds: ['academic-literature-synthesis']
  },
  {
    id: 'networkchuck',
    slug: 'networkchuck',
    channelName: 'NetworkChuck',
    handle: '@NetworkChuck',
    youtubeUrl: 'https://www.youtube.com/@NetworkChuck',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    description: 'Chuck Keith brings high-energy tutorials on self-hosting AI, Docker containers, private VPN tunnels, Raspberry Pi local LLMs, and securing AI infrastructure.',
    primaryCategory: 'AI Tutorials',
    difficulty: 'beginner',
    isIndiaCreator: false,
    subscribersEstimate: '4.1M+',
    avgViewsEstimate: '550K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '15 - 30 mins',
    educationalScore: 92,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'Self-Hosted AI Infrastructure',
        description: 'Running Ollama, Docker, and Open-WebUI securely behind Cloudflare Tunnels.',
        skillsAcquired: ['Docker compose mastery', 'Network security', 'Reverse proxy configuration']
      }
    ],
    topTopics: ['Local LLMs with Ollama', 'Docker for AI', 'Cloudflare Tunnels', 'Raspberry Pi AI', 'Home Lab Setup'],
    topVideos: [
      { title: 'You Need a Private AI Server (It takes 5 minutes)', url: 'https://www.youtube.com/watch?v=example-chuck-ollama', viewsEstimate: '1.8M', duration: '22m', topicTag: 'Home Lab' }
    ],
    toolsTaught: ['ollama', 'open-source'],
    inspiredWorkflowIds: ['local-private-rag-knowledgebase']
  },
  {
    id: 'greg-isenberg',
    slug: 'greg-isenberg',
    channelName: 'Greg Isenberg',
    handle: '@GregIsenberg',
    youtubeUrl: 'https://www.youtube.com/@GregIsenberg',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    description: 'Venture studio founder sharing unbundling blueprints, AI micro-SaaS business models, audience monetization, and frameworks for launching internet businesses with AI tools.',
    primaryCategory: 'No-Code & Workflows',
    difficulty: 'beginner',
    isIndiaCreator: false,
    subscribersEstimate: '210K+',
    avgViewsEstimate: '90K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '25 - 50 mins',
    educationalScore: 90,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'AI Micro-SaaS Ideation',
        description: 'Finding profitable niches by unbundling bloated enterprise software using AI workflows.',
        skillsAcquired: ['Market opportunity mapping', 'Lean startup execution', 'Micro-SaaS economics']
      }
    ],
    topTopics: ['AI Business Ideas', 'Micro-SaaS Playbooks', 'Audience Building', 'Unbundling Reddit', 'Venture Design'],
    topVideos: [
      { title: '10 Profitable AI Business Ideas You Can Build This Weekend', url: 'https://www.youtube.com/watch?v=example-greg-ideas', viewsEstimate: '340K', duration: '31m', topicTag: 'Business Ideas' }
    ],
    toolsTaught: ['cursor', 'chatgpt', 'v0'],
    inspiredWorkflowIds: ['multi-agent-market-research-pitch-deck', 'b2b-lead-enrichment-pipeline']
  },
  // Indian AI Educators
  {
    id: 'krish-naik',
    slug: 'krish-naik',
    channelName: 'Krish Naik',
    handle: '@krishnaik06',
    youtubeUrl: 'https://www.youtube.com/@krishnaik06',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'One of India’s most prolific AI and Data Science educators with 1,500+ free tutorials spanning LangChain, LlamaIndex, End-to-End Generative AI Projects, and cloud deployment on AWS & Azure.',
    primaryCategory: 'Indian AI',
    difficulty: 'all-levels',
    isIndiaCreator: true,
    subscribersEstimate: '1.1M+',
    avgViewsEstimate: '120K',
    uploadCadence: 'Daily / 4x Weekly',
    typicalVideoDepth: '20 - 60 mins',
    educationalScore: 97,
    language: 'English / Hindi',
    curriculumPillars: [
      {
        pillarTitle: 'End-to-End Generative AI Projects',
        description: 'Building complete RAG pipelines, deploying multi-agent systems on AWS ECS, and Dockerizing models.',
        skillsAcquired: ['LangChain production', 'LlamaIndex RAG', 'CI/CD deployment for ML']
      },
      {
        pillarTitle: 'Data Science & Machine Learning Foundations',
        description: 'Complete Python for Data Science, feature engineering, and statistical modeling.',
        skillsAcquired: ['Pandas/NumPy mastery', 'Scikit-Learn', 'Feature engineering']
      }
    ],
    topTopics: ['Generative AI End-to-End', 'LangChain Tutorials', 'RAG Projects', 'MLOps on AWS', 'Interview Prep'],
    topVideos: [
      { title: 'Complete Generative AI Course With Langchain and Huggingface', url: 'https://www.youtube.com/watch?v=example-krish-genai', viewsEstimate: '1.2M', duration: '6h 30m', topicTag: 'Full Course' },
      { title: 'End To End RAG Project Using Llama 3 and Groq API', url: 'https://www.youtube.com/watch?v=example-krish-rag', viewsEstimate: '450K', duration: '48m', topicTag: 'RAG Project' }
    ],
    toolsTaught: ['hugging-face', 'langchain', 'ollama', 'gemini'],
    inspiredWorkflowIds: ['indic-customer-support-agent', 'automated-invoice-financial-extractor']
  },
  {
    id: 'code-with-harry',
    slug: 'code-with-harry',
    channelName: 'CodeWithHarry',
    handle: '@CodeWithHarry',
    youtubeUrl: 'https://www.youtube.com/@CodeWithHarry',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Haris Khan’s beloved Indian programming channel teaching Python, AI coding, web development, and algorithms in simple, accessible conversational Hindi.',
    primaryCategory: 'Indian AI',
    difficulty: 'beginner',
    isIndiaCreator: true,
    subscribersEstimate: '6.2M+',
    avgViewsEstimate: '400K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '20 - 90 mins',
    educationalScore: 96,
    language: 'Hindi',
    curriculumPillars: [
      {
        pillarTitle: 'Python & AI Foundations in Hindi',
        description: 'Zero-to-hero programming tutorials explained with everyday relatable Indian examples.',
        skillsAcquired: ['Python programming', 'Object-oriented design', 'API consumption']
      },
      {
        pillarTitle: 'AI Coding Tools for Web Developers',
        description: 'Using ChatGPT, Cursor, and Copilot to accelerate JavaScript, React, and Python projects.',
        skillsAcquired: ['AI-assisted coding', 'Prompt crafting for bugs', 'Fullstack project building']
      }
    ],
    topTopics: ['Python Full Course', 'AI Tools in Hindi', 'Cursor IDE for Beginners', 'Web Development'],
    topVideos: [
      { title: 'Python for Beginners (Full Course in Hindi)', url: 'https://www.youtube.com/watch?v=example-harry-python', viewsEstimate: '18M', duration: '12h', topicTag: 'Python' },
      { title: 'How to Use AI for Web Development', url: 'https://www.youtube.com/watch?v=example-harry-ai', viewsEstimate: '980K', duration: '32m', topicTag: 'AI Web Dev' }
    ],
    toolsTaught: ['cursor', 'chatgpt', 'github-copilot'],
    inspiredWorkflowIds: ['figma-to-production-code-pipeline']
  },
  {
    id: 'campusx',
    slug: 'campusx',
    channelName: 'CampusX',
    handle: '@campusx-official',
    youtubeUrl: 'https://www.youtube.com/@campusx-official',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    description: 'Nitish Singh’s rigorous Indian data science academy. Deep, semester-grade mathematical lectures on deep learning, transformer math, vector databases, and MLOps in Hindi.',
    primaryCategory: 'Indian AI',
    difficulty: 'intermediate',
    isIndiaCreator: true,
    subscribersEstimate: '380K+',
    avgViewsEstimate: '65K',
    uploadCadence: '3x Weekly',
    typicalVideoDepth: '45 - 90 mins',
    educationalScore: 98,
    language: 'Hindi',
    curriculumPillars: [
      {
        pillarTitle: 'Deep Learning & Neural Network Mathematics',
        description: 'Exhaustive derivation of backpropagation equations, matrix calculus, and activation functions.',
        skillsAcquired: ['Matrix calculus', 'Optimization algorithms', 'Loss function formulation']
      },
      {
        pillarTitle: 'Attention Mechanism & Transformers from Scratch',
        description: 'Detailed code implementation of multi-head attention and positional encodings in PyTorch.',
        skillsAcquired: ['PyTorch implementation', 'Transformer architecture', 'Bilingual LLM training']
      }
    ],
    topTopics: ['Deep Learning Specialization in Hindi', 'Transformer Math', 'Vector Databases', 'MLOps Pipelines'],
    topVideos: [
      { title: 'Attention Mechanism in Deep Learning Spelled Out (Hindi)', url: 'https://www.youtube.com/watch?v=example-campusx-attention', viewsEstimate: '240K', duration: '1h 10m', topicTag: 'Attention' },
      { title: 'Complete Deep Learning Course in Hindi', url: 'https://www.youtube.com/watch?v=example-campusx-dl', viewsEstimate: '820K', duration: '14h', topicTag: 'Deep Learning' }
    ],
    toolsTaught: ['hugging-face', 'llama-3'],
    inspiredWorkflowIds: ['academic-literature-synthesis']
  },
  {
    id: 'chai-aur-code',
    slug: 'chai-aur-code',
    channelName: 'Chai aur Code',
    handle: '@chaiaurcode',
    youtubeUrl: 'https://www.youtube.com/@chaiaurcode',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    description: 'Hitesh Choudhary’s conversational coding sanctuary. Teaches full-stack development, modern JavaScript/TypeScript, Docker, and AI engineering over relaxed cups of tea in Hindi.',
    primaryCategory: 'Indian AI',
    difficulty: 'all-levels',
    isIndiaCreator: true,
    subscribersEstimate: '850K+',
    avgViewsEstimate: '180K',
    uploadCadence: 'Weekly',
    typicalVideoDepth: '25 - 60 mins',
    educationalScore: 95,
    language: 'Hindi',
    curriculumPillars: [
      {
        pillarTitle: 'Fullstack AI Integration',
        description: 'Connecting React, Next.js, and Astro frontends to OpenAI, Gemini, and Ollama backends.',
        skillsAcquired: ['Fullstack API integration', 'Streaming responses', 'Token usage monitoring']
      },
      {
        pillarTitle: 'Backend Architecture & Databases',
        description: 'Designing scalable PostgreSQL and Supabase schemas with Edge Functions.',
        skillsAcquired: ['Supabase mastery', 'PostgreSQL design', 'Docker containers']
      }
    ],
    topTopics: ['JavaScript & TypeScript Mastery', 'Docker for Developers', 'Full Stack AI Apps', 'Supabase Projects'],
    topVideos: [
      { title: 'Build a Fullstack AI Application in Hindi', url: 'https://www.youtube.com/watch?v=example-chai-ai', viewsEstimate: '420K', duration: '1h 45m', topicTag: 'Fullstack AI' },
      { title: 'Docker Complete One Shot in Hindi', url: 'https://www.youtube.com/watch?v=example-chai-docker', viewsEstimate: '650K', duration: '2h 10m', topicTag: 'Docker' }
    ],
    toolsTaught: ['cursor', 'chatgpt', 'gemini'],
    inspiredWorkflowIds: ['figma-to-production-code-pipeline', 'indic-customer-support-agent']
  },
  {
    id: 'varun-mayya',
    slug: 'varun-mayya',
    channelName: 'Varun Mayya',
    handle: '@varunmayya',
    youtubeUrl: 'https://www.youtube.com/@varunmayya',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Indian tech entrepreneur and author analyzing AI macroeconomic trends, India’s AI sovereign compute plans, agentic automation, and how software engineers must pivot to remain competitive.',
    primaryCategory: 'Indian AI',
    difficulty: 'all-levels',
    isIndiaCreator: true,
    subscribersEstimate: '980K+',
    avgViewsEstimate: '260K',
    uploadCadence: '2x Weekly',
    typicalVideoDepth: '15 - 35 mins',
    educationalScore: 93,
    language: 'English',
    curriculumPillars: [
      {
        pillarTitle: 'AI Macroeconomics & Indian Tech',
        description: 'Analyzing compute clusters, IndiaAI mission funding, and startup opportunities.',
        skillsAcquired: ['Macro trends evaluation', 'Startup strategy', 'AI economics']
      }
    ],
    topTopics: ['India AI Mission', 'Sarvam & Krutrim Analysis', 'Future of Software Engineering', 'Autonomous Agents'],
    topVideos: [
      { title: 'India’s Trillion Dollar AI Opportunity Explained', url: 'https://www.youtube.com/watch?v=example-varun-india', viewsEstimate: '680K', duration: '24m', topicTag: 'India AI' },
      { title: 'How Software Engineers Must Adapt to AI in 2025', url: 'https://www.youtube.com/watch?v=example-varun-engineers', viewsEstimate: '510K', duration: '29m', topicTag: 'Careers' }
    ],
    toolsTaught: ['sarvam-ai', 'krutrim', 'claude', 'cursor'],
    inspiredWorkflowIds: ['indic-customer-support-agent', 'multi-agent-market-research-pitch-deck']
  }
];
