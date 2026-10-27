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
  country?: string;
  subscriberCountNumeric?: number;
  subscriberTier?: '10k-100k' | '100k-500k' | '500k-2m' | '2m+' | '<100k';
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
    "id": "andrej-karpathy",
    "slug": "andrej-karpathy",
    "channelName": "Andrej Karpathy",
    "handle": "@karpathy",
    "youtubeUrl": "https://www.youtube.com/@karpathy",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "description": "Former Director of AI at Tesla and OpenAI founding research scientist. Creates deep, mathematical and code-first masterclasses on building transformer architectures, micrograd, and autonomous reasoning agents from scratch in Python.",
    "primaryCategory": "AI Research",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "subscribersEstimate": "980K+",
    "avgViewsEstimate": "850K",
    "uploadCadence": "Monthly Deep Dives",
    "typicalVideoDepth": "1 - 3 hours per lecture",
    "educationalScore": 99,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Neural Networks from Scratch",
        "description": "Understand backpropagation, computational graphs, and loss functions by implementing Micrograd in pure Python.",
        "skillsAcquired": [
          "Backpropagation math",
          "Automatic differentiation",
          "Autograd engines"
        ]
      },
      {
        "pillarTitle": "GPT Architecture & Tokenization",
        "description": "Step-by-step construction of the decoder-only transformer architecture and Byte-Pair Encoding (BPE).",
        "skillsAcquired": [
          "Self-attention math",
          "Multi-head attention",
          "Tokenizer training"
        ]
      },
      {
        "pillarTitle": "Autonomous Reasoning & RL",
        "description": "How modern models develop multi-step problem solving via Reinforcement Learning with Verifiable Rewards.",
        "skillsAcquired": [
          "Test-time compute",
          "RLVR loops",
          "Search-guided generation"
        ]
      }
    ],
    "topTopics": [
      "LLM Architecture from scratch",
      "Neural Networks",
      "Micrograd",
      "Tokenization",
      "Backpropagation"
    ],
    "topVideos": [
      {
        "title": "Let build GPT: from scratch, in code, spelled out",
        "url": "https://www.youtube.com/watch?v=kCc8FmEb1nY",
        "viewsEstimate": "4.9M",
        "duration": "1h 56m",
        "topicTag": "Transformers"
      },
      {
        "title": "The spelled-out intro to neural networks and backprop: micrograd",
        "url": "https://www.youtube.com/watch?v=VMj-3S1tku0",
        "viewsEstimate": "2.2M",
        "duration": "2h 25m",
        "topicTag": "Neural Networks"
      },
      {
        "title": "Intro to Large Language Models (Busy Person Intro)",
        "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        "viewsEstimate": "2.5M",
        "duration": "1h 00m",
        "topicTag": "LLM Foundations"
      }
    ],
    "toolsTaught": [
      "llama-3",
      "hugging-face",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot",
      "local-private-rag-knowledgebase"
    ],
    "subscriberCountNumeric": 980000,
    "subscriberTier": "500k-2m"
  },
  {
    "id": "3blue1brown",
    "slug": "3blue1brown",
    "channelName": "3Blue1Brown",
    "handle": "@3blue1brown",
    "youtubeUrl": "https://www.youtube.com/@3blue1brown",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Grant Sanderson’s visual mathematics channel. Renowned worldwide for geometric animations explaining linear algebra, neural network calculus, attention mechanisms, and gradient descent intuitively.",
    "primaryCategory": "AI Research",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "subscribersEstimate": "6.4M+",
    "avgViewsEstimate": "1.8M",
    "uploadCadence": "Bi-weekly / Monthly",
    "typicalVideoDepth": "20 - 45 mins",
    "educationalScore": 98,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Visual Calculus of Neural Networks",
        "description": "Geometric intuition behind high-dimensional weight matrices and loss landscapes.",
        "skillsAcquired": [
          "Gradient descent geometry",
          "Chain rule in matrices",
          "Weight updates"
        ]
      },
      {
        "pillarTitle": "Attention Mechanism Geometric Visuals",
        "description": "How Queries, Keys, and Values navigate conceptual semantic space.",
        "skillsAcquired": [
          "Vector dot products",
          "Semantic embedding spaces",
          "Softmax attention"
        ]
      }
    ],
    "topTopics": [
      "Transformer Math",
      "Linear Algebra for ML",
      "Backpropagation Calculus",
      "Information Theory"
    ],
    "topVideos": [
      {
        "title": "Visualizing Attention, a key idea in modern AI",
        "url": "https://www.youtube.com/watch?v=eMlx5fFNoYc",
        "viewsEstimate": "3.4M",
        "duration": "26m",
        "topicTag": "Attention Math"
      },
      {
        "title": "What is a neural network? | Chapter 1, Deep learning",
        "url": "https://www.youtube.com/watch?v=aircAruvnKk",
        "viewsEstimate": "16M",
        "duration": "19m",
        "topicTag": "Deep Learning"
      },
      {
        "title": "Gradient descent, how neural networks learn | Chapter 2",
        "url": "https://www.youtube.com/watch?v=IHZwWFHWa-w",
        "viewsEstimate": "6.8M",
        "duration": "21m",
        "topicTag": "Calculus"
      }
    ],
    "toolsTaught": [
      "llama-3",
      "hugging-face"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ],
    "subscriberCountNumeric": 6400000,
    "subscriberTier": "2m+"
  },
  {
    "id": "fireship",
    "slug": "fireship",
    "channelName": "Fireship",
    "handle": "@Fireship",
    "youtubeUrl": "https://www.youtube.com/@Fireship",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Jeff Delaney’s ultra-fast, high-density tech channel delivering 100-second explainers and fast-paced code breakdowns on frontier AI models, developer tools, and framework updates.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "subscribersEstimate": "3.3M+",
    "avgViewsEstimate": "600K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "3 - 10 mins",
    "educationalScore": 94,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "100 Seconds Architecture Overviews",
        "description": "Rapid-fire breakdowns of MCP, vector databases, and agentic protocols.",
        "skillsAcquired": [
          "Quick tech stack evaluation",
          "Emerging tool awareness"
        ]
      },
      {
        "pillarTitle": "Hands-on AI Fullstack Demos",
        "description": "Building apps with Supabase, Next.js/Astro, and frontier LLM APIs in under 10 minutes.",
        "skillsAcquired": [
          "Fullstack AI integration",
          "API rate limit handling"
        ]
      }
    ],
    "topTopics": [
      "AI Coding Tools",
      "Model Context Protocol",
      "Cursor vs Windsurf",
      "Supabase Vector",
      "Ollama"
    ],
    "topVideos": [
      {
        "title": "Cursor AI in 100 Seconds",
        "url": "https://www.youtube.com/watch?v=yk9lXobJ97E",
        "viewsEstimate": "1.2M",
        "duration": "2m 15s",
        "topicTag": "Cursor"
      },
      {
        "title": "DeepSeek Changed Everything... Here is why",
        "url": "https://www.youtube.com/watch?v=7u5pP5m6_7A",
        "viewsEstimate": "1.9M",
        "duration": "8m 30s",
        "topicTag": "DeepSeek"
      },
      {
        "title": "The Model Context Protocol explained",
        "url": "https://www.youtube.com/watch?v=example-mcp",
        "viewsEstimate": "850K",
        "duration": "7m 10s",
        "topicTag": "MCP"
      }
    ],
    "toolsTaught": [
      "cursor",
      "windsurf",
      "deepseek",
      "gemini"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot",
      "figma-to-production-code-pipeline"
    ],
    "subscriberCountNumeric": 3300000,
    "subscriberTier": "2m+"
  },
  {
    "id": "theprimeagen",
    "slug": "theprimeagen",
    "channelName": "ThePrimeagen",
    "handle": "@ThePrimeagen",
    "youtubeUrl": "https://www.youtube.com/@ThePrimeagen",
    "avatarUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    "description": "Former Netflix principal engineer providing unvarnished, high-energy critiques of AI coding agents, terminal tools (Vim, Neovim, Rust, Go), and practical software engineering realities.",
    "primaryCategory": "AI Coding",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "subscribersEstimate": "820K+",
    "avgViewsEstimate": "350K",
    "uploadCadence": "Daily / 3x Weekly",
    "typicalVideoDepth": "15 - 45 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Pragmatic AI Code Review",
        "description": "Critiquing AI-generated code for hidden race conditions, bloated abstractions, and memory safety.",
        "skillsAcquired": [
          "Code smell detection",
          "Performance profiling",
          "Terminal mastery"
        ]
      },
      {
        "pillarTitle": "CLI Agent Workflows",
        "description": "Using Aider, local LLMs, and Git diff automation in production development.",
        "skillsAcquired": [
          "Aider CLI mastery",
          "Git refactoring scripts",
          "Neovim AI plugins"
        ]
      }
    ],
    "topTopics": [
      "AI Coding Tools",
      "Aider CLI",
      "Neovim AI Plugins",
      "Software Engineering Integrity",
      "Rust AI Tooling"
    ],
    "topVideos": [
      {
        "title": "Cursor vs My Vim Setup: Honest Reaction",
        "url": "https://www.youtube.com/watch?v=example-prime-cursor",
        "viewsEstimate": "650K",
        "duration": "28m",
        "topicTag": "IDE Review"
      },
      {
        "title": "Is AI Actually Replacing Software Engineers?",
        "url": "https://www.youtube.com/watch?v=example-prime-future",
        "viewsEstimate": "920K",
        "duration": "34m",
        "topicTag": "Industry Trends"
      }
    ],
    "toolsTaught": [
      "cursor",
      "github-copilot",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ],
    "subscriberCountNumeric": 820000,
    "subscriberTier": "500k-2m"
  },
  {
    "id": "matthew-berman",
    "slug": "matthew-berman",
    "channelName": "Matthew Berman",
    "handle": "@MatthewBerman",
    "youtubeUrl": "https://www.youtube.com/@MatthewBerman",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "The go-to engineer for local open-source AI models, Ollama setup, Pinokio installations, and step-by-step benchmarks comparing closed frontier APIs with self-hosted weights.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "subscribersEstimate": "670K+",
    "avgViewsEstimate": "220K",
    "uploadCadence": "4x Weekly",
    "typicalVideoDepth": "15 - 30 mins",
    "educationalScore": 93,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Local AI Setup & Quantization",
        "description": "How to install Ollama, LM Studio, and Open-WebUI on Windows, Mac, and Linux.",
        "skillsAcquired": [
          "GGUF quantization",
          "VRAM management",
          "Local context setting"
        ]
      },
      {
        "pillarTitle": "Open-Source Model Benchmarks",
        "description": "Objective side-by-side evaluations of Llama 3.3, DeepSeek-R1, and Mistral models.",
        "skillsAcquired": [
          "Model benchmark testing",
          "Prompt evaluation techniques"
        ]
      }
    ],
    "topTopics": [
      "Ollama Guides",
      "DeepSeek-R1 Setup",
      "Open-WebUI RAG",
      "Local Fine-Tuning",
      "Uncensored Models"
    ],
    "topVideos": [
      {
        "title": "How to Run DeepSeek-R1 100% Locally on Your Computer",
        "url": "https://www.youtube.com/watch?v=example-berman-r1",
        "viewsEstimate": "850K",
        "duration": "18m",
        "topicTag": "DeepSeek"
      },
      {
        "title": "Ollama Full Tutorial: The Best Local AI Tool",
        "url": "https://www.youtube.com/watch?v=example-berman-ollama",
        "viewsEstimate": "620K",
        "duration": "22m",
        "topicTag": "Ollama"
      }
    ],
    "toolsTaught": [
      "ollama",
      "deepseek",
      "llama-3"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ],
    "subscriberCountNumeric": 670000,
    "subscriberTier": "500k-2m"
  },
  {
    "id": "cole-medin",
    "slug": "cole-medin",
    "channelName": "Cole Medin",
    "handle": "@ColeMedin",
    "youtubeUrl": "https://www.youtube.com/@ColeMedin",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "Premier educator for autonomous multi-agent systems, n8n automation pipelines, LangChain, and production-grade tool-calling architectures for businesses.",
    "primaryCategory": "AI Agents",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "subscribersEstimate": "280K+",
    "avgViewsEstimate": "110K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20 - 40 mins",
    "educationalScore": 95,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "n8n AI Agent Architecture",
        "description": "Constructing robust agents with persistent vector memory, tool calling, and human loops.",
        "skillsAcquired": [
          "n8n AI nodes",
          "Webhook routing",
          "State management"
        ]
      },
      {
        "pillarTitle": "Production RAG & Fallbacks",
        "description": "Handling model hallucination with multi-stage verification and JSON schema parsing.",
        "skillsAcquired": [
          "Guardrail implementation",
          "JSON validation",
          "Fallback routing"
        ]
      }
    ],
    "topTopics": [
      "n8n AI Agents",
      "LangChain Production",
      "Autonomous Workflows",
      "Multi-Agent Teams",
      "Tool Calling"
    ],
    "topVideos": [
      {
        "title": "The Complete n8n AI Agent Masterclass",
        "url": "https://www.youtube.com/watch?v=example-cole-n8n",
        "viewsEstimate": "420K",
        "duration": "45m",
        "topicTag": "n8n Masterclass"
      },
      {
        "title": "Building a Lead Scraping & AI Outreach Bot in n8n",
        "url": "https://www.youtube.com/watch?v=example-cole-leads",
        "viewsEstimate": "290K",
        "duration": "32m",
        "topicTag": "Lead Gen"
      }
    ],
    "toolsTaught": [
      "n8n",
      "claude",
      "make",
      "dify"
    ],
    "inspiredWorkflowIds": [
      "shorts-creator-pipeline",
      "indic-customer-support-agent",
      "b2b-lead-enrichment-pipeline"
    ],
    "subscriberCountNumeric": 280000,
    "subscriberTier": "100k-500k"
  },
  {
    "id": "ai-jason",
    "slug": "ai-jason",
    "channelName": "AI Jason",
    "handle": "@AIJason",
    "youtubeUrl": "https://www.youtube.com/@AIJason",
    "avatarUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "description": "Hands-on practical tutorials building automated AI workflows, Langflow/Dify visual agents, web scraping bots, and AI micro-SaaS products without heavy boilerplate.",
    "primaryCategory": "No-Code & Workflows",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "subscribersEstimate": "390K+",
    "avgViewsEstimate": "140K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15 - 25 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Visual Agent Builders (Dify & Langflow)",
        "description": "Building enterprise chatbots and scraping pipelines visually in under 30 minutes.",
        "skillsAcquired": [
          "Visual flow design",
          "API key routing",
          "Prompt template chaining"
        ]
      },
      {
        "pillarTitle": "Automated Content & Research Engines",
        "description": "Creating autonomous YouTube research and social media content factories.",
        "skillsAcquired": [
          "Web scraping logic",
          "Content formatting",
          "Multi-platform scheduling"
        ]
      }
    ],
    "topTopics": [
      "Dify.ai Tutorials",
      "Langflow Guides",
      "AI Automation Pipelines",
      "Web Scraping Agents",
      "Make.com AI"
    ],
    "topVideos": [
      {
        "title": "Build an AI Agent in 15 Minutes with Dify",
        "url": "https://www.youtube.com/watch?v=example-jason-dify",
        "viewsEstimate": "380K",
        "duration": "19m",
        "topicTag": "Dify"
      },
      {
        "title": "How to Scrape the Web with AI for Free",
        "url": "https://www.youtube.com/watch?v=example-jason-scrape",
        "viewsEstimate": "260K",
        "duration": "16m",
        "topicTag": "Scraping"
      }
    ],
    "toolsTaught": [
      "dify",
      "langflow",
      "n8n",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "shorts-creator-pipeline",
      "seo-content-factory"
    ],
    "subscriberCountNumeric": 390000,
    "subscriberTier": "100k-500k"
  },
  {
    "id": "matt-wolfe",
    "slug": "matt-wolfe",
    "channelName": "Matt Wolfe",
    "handle": "@maboris",
    "youtubeUrl": "https://www.youtube.com/@maboris",
    "avatarUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    "description": "Creator of FutureTools.io and leading YouTube host reviewing generative art, video generation, music synthesis, and practical creative creator workflows.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "subscribersEstimate": "610K+",
    "avgViewsEstimate": "190K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "15 - 35 mins",
    "educationalScore": 91,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Generative Media & Video Mastery",
        "description": "Comparing Runway, Pika, Kling, and FLUX for creator and marketing production.",
        "skillsAcquired": [
          "Aspect ratio control",
          "Motion camera prompts",
          "Audio-video syncing"
        ]
      }
    ],
    "topTopics": [
      "AI Video Generation",
      "Midjourney Updates",
      "Weekly AI News",
      "Creative AI Tools",
      "Suno Music"
    ],
    "topVideos": [
      {
        "title": "The Ultimate Guide to AI Video in 2025",
        "url": "https://www.youtube.com/watch?v=example-wolfe-video",
        "viewsEstimate": "510K",
        "duration": "24m",
        "topicTag": "AI Video"
      },
      {
        "title": "FLUX vs Midjourney: Full Side-by-Side Test",
        "url": "https://www.youtube.com/watch?v=example-wolfe-flux",
        "viewsEstimate": "390K",
        "duration": "21m",
        "topicTag": "Image Gen"
      }
    ],
    "toolsTaught": [
      "midjourney",
      "flux",
      "elevenlabs",
      "suno"
    ],
    "inspiredWorkflowIds": [
      "shorts-creator-pipeline",
      "ecommerce-product-photo-studio",
      "youtube-thumbnail-ab-concept-generator"
    ],
    "subscriberCountNumeric": 610000,
    "subscriberTier": "500k-2m"
  },
  {
    "id": "wes-roth",
    "slug": "wes-roth",
    "channelName": "Wes Roth",
    "handle": "@WesRoth",
    "youtubeUrl": "https://www.youtube.com/@WesRoth",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Daily executive briefings dissecting frontier AI research papers, compute economics, enterprise AI deployments, and strategic shifts across OpenAI, Anthropic, and Google.",
    "primaryCategory": "AI News",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "subscribersEstimate": "320K+",
    "avgViewsEstimate": "130K",
    "uploadCadence": "Daily",
    "typicalVideoDepth": "15 - 25 mins",
    "educationalScore": 93,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "AI Frontier Paper Analysis",
        "description": "Extracting practical business insights from latest research papers on reasoning and test-time compute.",
        "skillsAcquired": [
          "Research literacy",
          "Compute scaling analysis",
          "Strategic forecasting"
        ]
      }
    ],
    "topTopics": [
      "AI Geopolitics",
      "Reasoning Models",
      "OpenAI vs Anthropic",
      "Compute Infrastructure",
      "Enterprise AI"
    ],
    "topVideos": [
      {
        "title": "The Test-Time Compute Revolution Explained",
        "url": "https://www.youtube.com/watch?v=example-wes-reasoning",
        "viewsEstimate": "280K",
        "duration": "20m",
        "topicTag": "Reasoning"
      }
    ],
    "toolsTaught": [
      "perplexity",
      "chatgpt",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "competitor-pricing-news-digest-bot",
      "academic-literature-synthesis"
    ],
    "subscriberCountNumeric": 320000,
    "subscriberTier": "100k-500k"
  },
  {
    "id": "two-minute-papers",
    "slug": "two-minute-papers",
    "channelName": "Two Minute Papers",
    "handle": "@twominutepapers",
    "youtubeUrl": "https://www.youtube.com/@twominutepapers",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "description": "Dr. Károly Zsolnai-Fehér’s legendary research channel. \"What a time to be alive!\" brings cutting-edge graphics, physics simulation, and neural rendering breakthroughs to millions with infectious enthusiasm.",
    "primaryCategory": "AI Research",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "subscribersEstimate": "1.7M+",
    "avgViewsEstimate": "450K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "5 - 10 mins",
    "educationalScore": 95,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Neural Rendering & 3D Gaussian Splatting",
        "description": "How neural fields reconstruct photorealistic 3D environments from smartphone video.",
        "skillsAcquired": [
          "NeRF fundamentals",
          "Gaussian splatting concepts"
        ]
      }
    ],
    "topTopics": [
      "3D Gaussian Splatting",
      "Physics Neural Simulators",
      "Robotics AI",
      "Photorealistic Rendering"
    ],
    "topVideos": [
      {
        "title": "This New AI Video Engine Looks Real",
        "url": "https://www.youtube.com/watch?v=example-tmp-video",
        "viewsEstimate": "1.4M",
        "duration": "6m",
        "topicTag": "Generative Video"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "runway"
    ],
    "inspiredWorkflowIds": [],
    "subscriberCountNumeric": 1700000,
    "subscriberTier": "500k-2m"
  },
  {
    "id": "yannic-kilcher",
    "slug": "yannic-kilcher",
    "channelName": "Yannic Kilcher",
    "handle": "@YannicKilcher",
    "youtubeUrl": "https://www.youtube.com/@YannicKilcher",
    "avatarUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    "description": "Deep, line-by-line machine learning paper readings covering model architectures, attention formulations, alignment methodologies, and ML conferences for serious practitioners.",
    "primaryCategory": "AI Research",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "subscribersEstimate": "260K+",
    "avgViewsEstimate": "80K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "45 - 90 mins",
    "educationalScore": 97,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Line-by-Line ML Paper Dissections",
        "description": "Reading official ML paper PDFs directly, analyzing equations, tables, and mathematical proofs.",
        "skillsAcquired": [
          "ArXiv paper comprehension",
          "Mathematical rigor in ML",
          "Critical benchmark evaluation"
        ]
      }
    ],
    "topTopics": [
      "Paper Readings",
      "Attention Is All You Need",
      "Reinforcement Learning from Human Feedback",
      "OpenWeights"
    ],
    "topVideos": [
      {
        "title": "DeepSeek-V3 Architecture Paper Deep Dive",
        "url": "https://www.youtube.com/watch?v=example-yannic-deepseek",
        "viewsEstimate": "210K",
        "duration": "1h 15m",
        "topicTag": "Paper Review"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "deepseek",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ],
    "subscriberCountNumeric": 260000,
    "subscriberTier": "100k-500k"
  },
  {
    "id": "networkchuck",
    "slug": "networkchuck",
    "channelName": "NetworkChuck",
    "handle": "@NetworkChuck",
    "youtubeUrl": "https://www.youtube.com/@NetworkChuck",
    "avatarUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "description": "Chuck Keith brings high-energy tutorials on self-hosting AI, Docker containers, private VPN tunnels, Raspberry Pi local LLMs, and securing AI infrastructure.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "subscribersEstimate": "4.1M+",
    "avgViewsEstimate": "550K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15 - 30 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Self-Hosted AI Infrastructure",
        "description": "Running Ollama, Docker, and Open-WebUI securely behind Cloudflare Tunnels.",
        "skillsAcquired": [
          "Docker compose mastery",
          "Network security",
          "Reverse proxy configuration"
        ]
      }
    ],
    "topTopics": [
      "Local LLMs with Ollama",
      "Docker for AI",
      "Cloudflare Tunnels",
      "Raspberry Pi AI",
      "Home Lab Setup"
    ],
    "topVideos": [
      {
        "title": "You Need a Private AI Server (It takes 5 minutes)",
        "url": "https://www.youtube.com/watch?v=example-chuck-ollama",
        "viewsEstimate": "1.8M",
        "duration": "22m",
        "topicTag": "Home Lab"
      }
    ],
    "toolsTaught": [
      "ollama",
      "open-source"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ],
    "subscriberCountNumeric": 4100000,
    "subscriberTier": "2m+"
  },
  {
    "id": "greg-isenberg",
    "slug": "greg-isenberg",
    "channelName": "Greg Isenberg",
    "handle": "@GregIsenberg",
    "youtubeUrl": "https://www.youtube.com/@GregIsenberg",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "Venture studio founder sharing unbundling blueprints, AI micro-SaaS business models, audience monetization, and frameworks for launching internet businesses with AI tools.",
    "primaryCategory": "No-Code & Workflows",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "subscribersEstimate": "210K+",
    "avgViewsEstimate": "90K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "25 - 50 mins",
    "educationalScore": 90,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "AI Micro-SaaS Ideation",
        "description": "Finding profitable niches by unbundling bloated enterprise software using AI workflows.",
        "skillsAcquired": [
          "Market opportunity mapping",
          "Lean startup execution",
          "Micro-SaaS economics"
        ]
      }
    ],
    "topTopics": [
      "AI Business Ideas",
      "Micro-SaaS Playbooks",
      "Audience Building",
      "Unbundling Reddit",
      "Venture Design"
    ],
    "topVideos": [
      {
        "title": "10 Profitable AI Business Ideas You Can Build This Weekend",
        "url": "https://www.youtube.com/watch?v=example-greg-ideas",
        "viewsEstimate": "340K",
        "duration": "31m",
        "topicTag": "Business Ideas"
      }
    ],
    "toolsTaught": [
      "cursor",
      "chatgpt",
      "v0"
    ],
    "inspiredWorkflowIds": [
      "multi-agent-market-research-pitch-deck",
      "b2b-lead-enrichment-pipeline"
    ],
    "subscriberCountNumeric": 210000,
    "subscriberTier": "100k-500k"
  },
  {
    "id": "krish-naik",
    "slug": "krish-naik",
    "channelName": "Krish Naik",
    "handle": "@krishnaik06",
    "youtubeUrl": "https://www.youtube.com/@krishnaik06",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "description": "One of India’s most prolific AI and Data Science educators with 1,500+ free tutorials spanning LangChain, LlamaIndex, End-to-End Generative AI Projects, and cloud deployment on AWS & Azure.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "subscribersEstimate": "1.1M+",
    "avgViewsEstimate": "120K",
    "uploadCadence": "Daily / 4x Weekly",
    "typicalVideoDepth": "20 - 60 mins",
    "educationalScore": 97,
    "language": "English / Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "End-to-End Generative AI Projects",
        "description": "Building complete RAG pipelines, deploying multi-agent systems on AWS ECS, and Dockerizing models.",
        "skillsAcquired": [
          "LangChain production",
          "LlamaIndex RAG",
          "CI/CD deployment for ML"
        ]
      },
      {
        "pillarTitle": "Data Science & Machine Learning Foundations",
        "description": "Complete Python for Data Science, feature engineering, and statistical modeling.",
        "skillsAcquired": [
          "Pandas/NumPy mastery",
          "Scikit-Learn",
          "Feature engineering"
        ]
      }
    ],
    "topTopics": [
      "Generative AI End-to-End",
      "LangChain Tutorials",
      "RAG Projects",
      "MLOps on AWS",
      "Interview Prep"
    ],
    "topVideos": [
      {
        "title": "Complete Generative AI Course With Langchain and Huggingface",
        "url": "https://www.youtube.com/watch?v=example-krish-genai",
        "viewsEstimate": "1.2M",
        "duration": "6h 30m",
        "topicTag": "Full Course"
      },
      {
        "title": "End To End RAG Project Using Llama 3 and Groq API",
        "url": "https://www.youtube.com/watch?v=example-krish-rag",
        "viewsEstimate": "450K",
        "duration": "48m",
        "topicTag": "RAG Project"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "langchain",
      "ollama",
      "gemini"
    ],
    "inspiredWorkflowIds": [
      "indic-customer-support-agent",
      "automated-invoice-financial-extractor"
    ],
    "subscriberCountNumeric": 1100000,
    "subscriberTier": "500k-2m"
  },
  {
    "id": "code-with-harry",
    "slug": "code-with-harry",
    "channelName": "CodeWithHarry",
    "handle": "@CodeWithHarry",
    "youtubeUrl": "https://www.youtube.com/@CodeWithHarry",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Haris Khan’s beloved Indian programming channel teaching Python, AI coding, web development, and algorithms in simple, accessible conversational Hindi.",
    "primaryCategory": "Indian AI",
    "difficulty": "beginner",
    "isIndiaCreator": true,
    "subscribersEstimate": "6.2M+",
    "avgViewsEstimate": "400K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20 - 90 mins",
    "educationalScore": 96,
    "language": "Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "Python & AI Foundations in Hindi",
        "description": "Zero-to-hero programming tutorials explained with everyday relatable Indian examples.",
        "skillsAcquired": [
          "Python programming",
          "Object-oriented design",
          "API consumption"
        ]
      },
      {
        "pillarTitle": "AI Coding Tools for Web Developers",
        "description": "Using ChatGPT, Cursor, and Copilot to accelerate JavaScript, React, and Python projects.",
        "skillsAcquired": [
          "AI-assisted coding",
          "Prompt crafting for bugs",
          "Fullstack project building"
        ]
      }
    ],
    "topTopics": [
      "Python Full Course",
      "AI Tools in Hindi",
      "Cursor IDE for Beginners",
      "Web Development"
    ],
    "topVideos": [
      {
        "title": "Python for Beginners (Full Course in Hindi)",
        "url": "https://www.youtube.com/watch?v=example-harry-python",
        "viewsEstimate": "18M",
        "duration": "12h",
        "topicTag": "Python"
      },
      {
        "title": "How to Use AI for Web Development",
        "url": "https://www.youtube.com/watch?v=example-harry-ai",
        "viewsEstimate": "980K",
        "duration": "32m",
        "topicTag": "AI Web Dev"
      }
    ],
    "toolsTaught": [
      "cursor",
      "chatgpt",
      "github-copilot"
    ],
    "inspiredWorkflowIds": [
      "figma-to-production-code-pipeline"
    ],
    "subscriberCountNumeric": 6200000,
    "subscriberTier": "2m+"
  },
  {
    "id": "campusx",
    "slug": "campusx",
    "channelName": "CampusX",
    "handle": "@campusx-official",
    "youtubeUrl": "https://www.youtube.com/@campusx-official",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "Nitish Singh’s rigorous Indian data science academy. Deep, semester-grade mathematical lectures on deep learning, transformer math, vector databases, and MLOps in Hindi.",
    "primaryCategory": "Indian AI",
    "difficulty": "intermediate",
    "isIndiaCreator": true,
    "subscribersEstimate": "380K+",
    "avgViewsEstimate": "65K",
    "uploadCadence": "3x Weekly",
    "typicalVideoDepth": "45 - 90 mins",
    "educationalScore": 98,
    "language": "Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "Deep Learning & Neural Network Mathematics",
        "description": "Exhaustive derivation of backpropagation equations, matrix calculus, and activation functions.",
        "skillsAcquired": [
          "Matrix calculus",
          "Optimization algorithms",
          "Loss function formulation"
        ]
      },
      {
        "pillarTitle": "Attention Mechanism & Transformers from Scratch",
        "description": "Detailed code implementation of multi-head attention and positional encodings in PyTorch.",
        "skillsAcquired": [
          "PyTorch implementation",
          "Transformer architecture",
          "Bilingual LLM training"
        ]
      }
    ],
    "topTopics": [
      "Deep Learning Specialization in Hindi",
      "Transformer Math",
      "Vector Databases",
      "MLOps Pipelines"
    ],
    "topVideos": [
      {
        "title": "Attention Mechanism in Deep Learning Spelled Out (Hindi)",
        "url": "https://www.youtube.com/watch?v=example-campusx-attention",
        "viewsEstimate": "240K",
        "duration": "1h 10m",
        "topicTag": "Attention"
      },
      {
        "title": "Complete Deep Learning Course in Hindi",
        "url": "https://www.youtube.com/watch?v=example-campusx-dl",
        "viewsEstimate": "820K",
        "duration": "14h",
        "topicTag": "Deep Learning"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "llama-3"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ],
    "subscriberCountNumeric": 380000,
    "subscriberTier": "100k-500k"
  },
  {
    "id": "chai-aur-code",
    "slug": "chai-aur-code",
    "channelName": "Chai aur Code",
    "handle": "@chaiaurcode",
    "youtubeUrl": "https://www.youtube.com/@chaiaurcode",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Hitesh Choudhary’s conversational coding sanctuary. Teaches full-stack development, modern JavaScript/TypeScript, Docker, and AI engineering over relaxed cups of tea in Hindi.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "subscribersEstimate": "850K+",
    "avgViewsEstimate": "180K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "25 - 60 mins",
    "educationalScore": 95,
    "language": "Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "Fullstack AI Integration",
        "description": "Connecting React, Next.js, and Astro frontends to OpenAI, Gemini, and Ollama backends.",
        "skillsAcquired": [
          "Fullstack API integration",
          "Streaming responses",
          "Token usage monitoring"
        ]
      },
      {
        "pillarTitle": "Backend Architecture & Databases",
        "description": "Designing scalable PostgreSQL and Supabase schemas with Edge Functions.",
        "skillsAcquired": [
          "Supabase mastery",
          "PostgreSQL design",
          "Docker containers"
        ]
      }
    ],
    "topTopics": [
      "JavaScript & TypeScript Mastery",
      "Docker for Developers",
      "Full Stack AI Apps",
      "Supabase Projects"
    ],
    "topVideos": [
      {
        "title": "Build a Fullstack AI Application in Hindi",
        "url": "https://www.youtube.com/watch?v=example-chai-ai",
        "viewsEstimate": "420K",
        "duration": "1h 45m",
        "topicTag": "Fullstack AI"
      },
      {
        "title": "Docker Complete One Shot in Hindi",
        "url": "https://www.youtube.com/watch?v=example-chai-docker",
        "viewsEstimate": "650K",
        "duration": "2h 10m",
        "topicTag": "Docker"
      }
    ],
    "toolsTaught": [
      "cursor",
      "chatgpt",
      "gemini"
    ],
    "inspiredWorkflowIds": [
      "figma-to-production-code-pipeline",
      "indic-customer-support-agent"
    ],
    "subscriberCountNumeric": 850000,
    "subscriberTier": "500k-2m"
  },
  {
    "id": "varun-mayya",
    "slug": "varun-mayya",
    "channelName": "Varun Mayya",
    "handle": "@varunmayya",
    "youtubeUrl": "https://www.youtube.com/@varunmayya",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Indian tech entrepreneur and author analyzing AI macroeconomic trends, India’s AI sovereign compute plans, agentic automation, and how software engineers must pivot to remain competitive.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "subscribersEstimate": "980K+",
    "avgViewsEstimate": "260K",
    "uploadCadence": "2x Weekly",
    "typicalVideoDepth": "15 - 35 mins",
    "educationalScore": 93,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "AI Macroeconomics & Indian Tech",
        "description": "Analyzing compute clusters, IndiaAI mission funding, and startup opportunities.",
        "skillsAcquired": [
          "Macro trends evaluation",
          "Startup strategy",
          "AI economics"
        ]
      }
    ],
    "topTopics": [
      "India AI Mission",
      "Sarvam & Krutrim Analysis",
      "Future of Software Engineering",
      "Autonomous Agents"
    ],
    "topVideos": [
      {
        "title": "India’s Trillion Dollar AI Opportunity Explained",
        "url": "https://www.youtube.com/watch?v=example-varun-india",
        "viewsEstimate": "680K",
        "duration": "24m",
        "topicTag": "India AI"
      },
      {
        "title": "How Software Engineers Must Adapt to AI in 2025",
        "url": "https://www.youtube.com/watch?v=example-varun-engineers",
        "viewsEstimate": "510K",
        "duration": "29m",
        "topicTag": "Careers"
      }
    ],
    "toolsTaught": [
      "sarvam-ai",
      "krutrim",
      "claude",
      "cursor"
    ],
    "inspiredWorkflowIds": [
      "indic-customer-support-agent",
      "multi-agent-market-research-pitch-deck"
    ],
    "subscriberCountNumeric": 980000,
    "subscriberTier": "500k-2m"
  },
  {
    "id": "harkirat-singh-100xdevs",
    "slug": "harkirat-singh",
    "channelName": "Harkirat Singh (100xDevs)",
    "handle": "@kirat_ins",
    "youtubeUrl": "https://www.youtube.com/@kirat_ins",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Founder of 100xDevs and ex-Google/Goldman Sachs engineer. Teaches fullstack web engineering, building local AI agents, LLM memory architectures, and scalable cloud systems in Hinglish.",
    "primaryCategory": "Indian AI",
    "difficulty": "intermediate",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 620000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "620K+",
    "avgViewsEstimate": "180K",
    "uploadCadence": "Weekly Live Cohorts",
    "typicalVideoDepth": "1 - 2 hours per stream",
    "educationalScore": 94,
    "language": "Hinglish / English",
    "curriculumPillars": [
      {
        "pillarTitle": "AI Web Architecture",
        "description": "Deploying LangChain and Ollama microservices with Next.js and Docker.",
        "skillsAcquired": [
          "Ollama orchestration",
          "Vector DB indexing",
          "Docker deployment"
        ]
      },
      {
        "pillarTitle": "Production Agent Systems",
        "description": "Building autonomous workflow bots with function calling.",
        "skillsAcquired": [
          "Function calling",
          "Rate limiting",
          "Redis caching"
        ]
      }
    ],
    "topTopics": [
      "Fullstack AI",
      "Docker for LLMs",
      "LangChain with Node.js",
      "System Design"
    ],
    "topVideos": [
      {
        "title": "Build Full Stack AI SaaS from scratch in Next.js",
        "url": "https://www.youtube.com/watch?v=example1",
        "viewsEstimate": "420K",
        "duration": "2h 10m",
        "topicTag": "Fullstack AI"
      }
    ],
    "toolsTaught": [
      "ollama",
      "supabase",
      "cursor",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "shorts-creator-pipeline",
      "pr-code-review-bot"
    ]
  },
  {
    "id": "edureka-ai",
    "slug": "edureka-ai",
    "channelName": "Edureka AI & Data",
    "handle": "@edurekaIN",
    "youtubeUrl": "https://www.youtube.com/@edurekaIN",
    "avatarUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
    "description": "Premier enterprise upskilling institute in India. Offers exhaustive multi-hour masterclasses on PyTorch, generative AI, Prompt Engineering, and RAG architectures.",
    "primaryCategory": "Indian AI",
    "difficulty": "beginner",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 3900000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "3.9M+",
    "avgViewsEstimate": "120K",
    "uploadCadence": "Daily Tutorials",
    "typicalVideoDepth": "2 - 10 hours mega courses",
    "educationalScore": 91,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Generative AI Foundation",
        "description": "End-to-end transformers, fine-tuning Llama models with PEFT/LoRA.",
        "skillsAcquired": [
          "LoRA fine-tuning",
          "PyTorch",
          "Prompt engineering"
        ]
      }
    ],
    "topTopics": [
      "Generative AI Full Course",
      "Prompt Engineering",
      "LangChain Tutorial",
      "Machine Learning"
    ],
    "topVideos": [
      {
        "title": "Generative AI Full Course 2026 - Masterclass",
        "url": "https://www.youtube.com/watch?v=example2",
        "viewsEstimate": "1.2M",
        "duration": "8h 30m",
        "topicTag": "Generative AI"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "chatgpt",
      "langchain"
    ],
    "inspiredWorkflowIds": [
      "seo-content-factory"
    ]
  },
  {
    "id": "piyush-garg",
    "slug": "piyush-garg",
    "channelName": "Piyush Garg",
    "handle": "@piyushgargdev",
    "youtubeUrl": "https://www.youtube.com/@piyushgargdev",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "Fullstack instructor and developer advocate from India. Specializes in building modern AI web apps using Cursor, v0.dev, Docker, and Supabase vector embeddings.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 280000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "280K+",
    "avgViewsEstimate": "65K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "25 - 50 mins",
    "educationalScore": 93,
    "language": "Hinglish / English",
    "curriculumPillars": [
      {
        "pillarTitle": "AI-Powered Development",
        "description": "10x engineer workflows with Cursor IDE and AI assisted testing.",
        "skillsAcquired": [
          "Cursor workflows",
          "Prompt to UI",
          "API integration"
        ]
      }
    ],
    "topTopics": [
      "Cursor AI Editor",
      "v0.dev UI Generation",
      "Dockerize AI Apps",
      "Vector Databases"
    ],
    "topVideos": [
      {
        "title": "Cursor IDE Complete Guide - 10x Developer with AI",
        "url": "https://www.youtube.com/watch?v=example3",
        "viewsEstimate": "210K",
        "duration": "42m",
        "topicTag": "Cursor IDE"
      }
    ],
    "toolsTaught": [
      "cursor",
      "v0",
      "supabase",
      "bolt-new"
    ],
    "inspiredWorkflowIds": [
      "figma-to-production-code-pipeline"
    ]
  },
  {
    "id": "shradha-khapra-apna-college",
    "slug": "shradha-khapra",
    "channelName": "Shradha Khapra (Apna College)",
    "handle": "@ApnaCollegeOfficial",
    "youtubeUrl": "https://www.youtube.com/@ApnaCollegeOfficial",
    "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    "description": "Ex-Microsoft engineer and co-founder of Apna College. Inspires millions of Indian college students with foundational Python for AI, data structures, and practical AI tooling.",
    "primaryCategory": "Indian AI",
    "difficulty": "beginner",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 5400000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "5.4M+",
    "avgViewsEstimate": "650K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "45 mins - 3 hours",
    "educationalScore": 92,
    "language": "Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "Python for AI & ML",
        "description": "Mastering NumPy, Pandas, and foundational machine learning syntax.",
        "skillsAcquired": [
          "Python syntax",
          "Data manipulation",
          "NumPy vectorization"
        ]
      }
    ],
    "topTopics": [
      "Python for AI",
      "Machine Learning Foundations",
      "Data Structures",
      "Tech Careers"
    ],
    "topVideos": [
      {
        "title": "Python Full Course for Beginners to AI Specialists",
        "url": "https://www.youtube.com/watch?v=example4",
        "viewsEstimate": "3.8M",
        "duration": "4h 15m",
        "topicTag": "Python"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "google-gemini"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "striver-take-u-forward",
    "slug": "striver-take-u-forward",
    "channelName": "take U forward (Striver)",
    "handle": "@takeUforward",
    "youtubeUrl": "https://www.youtube.com/@takeUforward",
    "avatarUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "description": "Raj Vikramaditya (Striver), ex-Google and Media.net engineer. Provides deep algorithmic intuition, graph traversals for AI search trees, and DSA mastery.",
    "primaryCategory": "AI Coding",
    "difficulty": "intermediate",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 950000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "950K+",
    "avgViewsEstimate": "190K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "30 - 60 mins",
    "educationalScore": 95,
    "language": "English / Hinglish",
    "curriculumPillars": [
      {
        "pillarTitle": "Graph Search & AI Planning",
        "description": "A*, BFS, DFS, and beam search mechanics powering reasoning agents.",
        "skillsAcquired": [
          "Search algorithms",
          "Dynamic programming",
          "Tree traversal"
        ]
      }
    ],
    "topTopics": [
      "Algorithms",
      "System Design",
      "AI Search Trees",
      "Interview Prep"
    ],
    "topVideos": [
      {
        "title": "Graph Algorithms & Shortest Path for AI Routing",
        "url": "https://www.youtube.com/watch?v=example5",
        "viewsEstimate": "510K",
        "duration": "55m",
        "topicTag": "Algorithms"
      }
    ],
    "toolsTaught": [
      "github-copilot",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "love-babbar",
    "slug": "love-babbar",
    "channelName": "Love Babbar",
    "handle": "@LoveBabbar",
    "youtubeUrl": "https://www.youtube.com/@LoveBabbar",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "Ex-Amazon engineer who built one of India’s most followed developer education ecosystems. Demystifies AI engineering, fullstack pipelines, and developer career transitions.",
    "primaryCategory": "Indian AI",
    "difficulty": "beginner",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 1400000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.4M+",
    "avgViewsEstimate": "320K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "30 - 90 mins",
    "educationalScore": 90,
    "language": "Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Software Architecture",
        "description": "Integrating AI APIs with backend microservices and databases.",
        "skillsAcquired": [
          "Backend APIs",
          "System scalability",
          "Developer workflows"
        ]
      }
    ],
    "topTopics": [
      "Web Development",
      "AI Developer Tools",
      "Career Roadmaps",
      "System Design"
    ],
    "topVideos": [
      {
        "title": "Complete Web Dev & AI Integration Roadmap",
        "url": "https://www.youtube.com/watch?v=example6",
        "viewsEstimate": "1.1M",
        "duration": "1h 20m",
        "topicTag": "Web Development"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "cursor"
    ],
    "inspiredWorkflowIds": [
      "figma-to-production-code-pipeline"
    ]
  },
  {
    "id": "ws-cube-tech",
    "slug": "ws-cube-tech",
    "channelName": "WsCube Tech",
    "handle": "@wscubetech",
    "youtubeUrl": "https://www.youtube.com/@wscubetech",
    "avatarUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    "description": "Massive practical tech training channel in India. Produces complete hands-on tutorials on Machine Learning, Data Science, Prompt Engineering, and AI automation.",
    "primaryCategory": "Indian AI",
    "difficulty": "beginner",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 3600000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "3.6M+",
    "avgViewsEstimate": "140K",
    "uploadCadence": "Daily",
    "typicalVideoDepth": "45 mins - 4 hours",
    "educationalScore": 89,
    "language": "Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "Machine Learning A to Z",
        "description": "Scikit-learn, regression models, classification, and neural network introduction.",
        "skillsAcquired": [
          "Data cleaning",
          "Model evaluation",
          "Python libraries"
        ]
      }
    ],
    "topTopics": [
      "Machine Learning",
      "Data Science",
      "Python",
      "Digital Marketing with AI"
    ],
    "topVideos": [
      {
        "title": "Machine Learning Complete Course in Hindi",
        "url": "https://www.youtube.com/watch?v=example7",
        "viewsEstimate": "890K",
        "duration": "6h 45m",
        "topicTag": "Machine Learning"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "seo-content-factory"
    ]
  },
  {
    "id": "gate-smashers",
    "slug": "gate-smashers",
    "channelName": "Gate Smashers (Varun Singla)",
    "handle": "@GateSmashers",
    "youtubeUrl": "https://www.youtube.com/@GateSmashers",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "India’s definitive computer science concepts channel. Crystal clear breakdowns of artificial intelligence search heuristics, expert systems, Bayes theorem, and neural nets.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 1800000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.8M+",
    "avgViewsEstimate": "220K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "10 - 25 mins per concept",
    "educationalScore": 96,
    "language": "Hinglish",
    "curriculumPillars": [
      {
        "pillarTitle": "AI Foundations & Heuristic Search",
        "description": "Minimax algorithm, alpha-beta pruning, and knowledge representation.",
        "skillsAcquired": [
          "Heuristic search",
          "Game theory AI",
          "Probability theory"
        ]
      }
    ],
    "topTopics": [
      "Artificial Intelligence Playlist",
      "Neural Network Theory",
      "Bayesian Networks",
      "Search Heuristics"
    ],
    "topVideos": [
      {
        "title": "Introduction to Artificial Intelligence & Search Techniques",
        "url": "https://www.youtube.com/watch?v=example8",
        "viewsEstimate": "1.4M",
        "duration": "18m",
        "topicTag": "AI Theory"
      }
    ],
    "toolsTaught": [
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "liam-ottley",
    "slug": "liam-ottley",
    "channelName": "Liam Ottley",
    "handle": "@LiamOttley",
    "youtubeUrl": "https://www.youtube.com/@LiamOttley",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "AI development agency founder (Morningside AI). Focuses on building autonomous client-facing AI agents, AI automation agency (AAA) frameworks, and Voice AI integrations.",
    "primaryCategory": "AI Agents",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 640000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "640K+",
    "avgViewsEstimate": "150K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15 - 35 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Voice AI & Autonomous Calling",
        "description": "Integrating Vapi, Bland AI, and ElevenLabs into CRM pipelines.",
        "skillsAcquired": [
          "Voice agent setup",
          "Twilio integration",
          "Prompt engineering"
        ]
      }
    ],
    "topTopics": [
      "AI Automation Agency",
      "Voice Agents",
      "Make.com & n8n",
      "Client Acquisition"
    ],
    "topVideos": [
      {
        "title": "How to Build and Sell AI Agents in 2026",
        "url": "https://www.youtube.com/watch?v=example9",
        "viewsEstimate": "680K",
        "duration": "28m",
        "topicTag": "AI Agents"
      }
    ],
    "toolsTaught": [
      "elevenlabs",
      "n8n",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "indic-customer-support-agent",
      "voice-meeting-to-crm-action-items"
    ]
  },
  {
    "id": "david-ondrej",
    "slug": "david-ondrej",
    "channelName": "David Ondrej",
    "handle": "@davidondrej",
    "youtubeUrl": "https://www.youtube.com/@davidondrej",
    "avatarUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    "description": "Hands-on engineer covering cutting-edge open-source AI projects, autonomous coding setups, local LLM fine-tuning, and multi-agent coordination.",
    "primaryCategory": "AI Coding",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 195000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "195K+",
    "avgViewsEstimate": "75K",
    "uploadCadence": "2-3 videos/week",
    "typicalVideoDepth": "15 - 25 mins",
    "educationalScore": 93,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Autonomous Coding Agents",
        "description": "Supercharging VS Code and Cursor with Claude 3.7 and local Ollama models.",
        "skillsAcquired": [
          "Aider configuration",
          "Agentic debugging",
          "Context windows"
        ]
      }
    ],
    "topTopics": [
      "Cursor IDE",
      "Claude 3.7 Coding",
      "Ollama Local Models",
      "Multi-Agent Frameworks"
    ],
    "topVideos": [
      {
        "title": "Best Local AI Coding Setup in 2026 (Free & Open Source)",
        "url": "https://www.youtube.com/watch?v=example10",
        "viewsEstimate": "290K",
        "duration": "22m",
        "topicTag": "AI Coding"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama",
      "claude",
      "vllm"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "worldofai",
    "slug": "worldofai",
    "channelName": "WorldofAI",
    "handle": "@worldofai",
    "youtubeUrl": "https://www.youtube.com/@worldofai",
    "avatarUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    "description": "Fast-paced daily breakdowns of newly released open-source AI GitHub repositories, installation steps, and benchmark evaluations.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 310000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "310K+",
    "avgViewsEstimate": "45K",
    "uploadCadence": "Daily",
    "typicalVideoDepth": "10 - 20 mins",
    "educationalScore": 90,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "GitHub Repo Quickstart",
        "description": "Git cloning, Conda environment setup, and running inference locally.",
        "skillsAcquired": [
          "CLI commands",
          "Conda environments",
          "CUDA troubleshooting"
        ]
      }
    ],
    "topTopics": [
      "GitHub Trending AI",
      "Local Diffusion",
      "Autonomous Agents",
      "Open Source Tools"
    ],
    "topVideos": [
      {
        "title": "Top 5 Open Source AI Repos You Must Try This Week",
        "url": "https://www.youtube.com/watch?v=example11",
        "viewsEstimate": "180K",
        "duration": "14m",
        "topicTag": "Open Source"
      }
    ],
    "toolsTaught": [
      "ollama",
      "comfyui",
      "hugging-face"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ]
  },
  {
    "id": "all-about-ai",
    "slug": "all-about-ai",
    "channelName": "All About AI (Kris)",
    "handle": "@AllAboutAI",
    "youtubeUrl": "https://www.youtube.com/@AllAboutAI",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "Creator focused on prompt engineering architectures, custom GPTs, workflow automations, and practical everyday AI productivity.",
    "primaryCategory": "No-Code & Workflows",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 240000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "240K+",
    "avgViewsEstimate": "55K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15 - 30 mins",
    "educationalScore": 89,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Advanced Prompt Architectures",
        "description": "Chain-of-thought, Few-shot prompting, and JSON structure enforcement.",
        "skillsAcquired": [
          "Chain-of-thought",
          "System prompt engineering",
          "Meta-prompts"
        ]
      }
    ],
    "topTopics": [
      "Prompt Engineering",
      "ChatGPT Workflow Hacks",
      "Automation Recipes",
      "Claude Artifacts"
    ],
    "topVideos": [
      {
        "title": "Master Prompt Engineering: 10 Frameworks That Work",
        "url": "https://www.youtube.com/watch?v=example12",
        "viewsEstimate": "450K",
        "duration": "25m",
        "topicTag": "Prompt Engineering"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "claude",
      "midjourney"
    ],
    "inspiredWorkflowIds": [
      "seo-content-factory"
    ]
  },
  {
    "id": "indydevdan",
    "slug": "indydevdan",
    "channelName": "IndyDevDan",
    "handle": "@indydevdan",
    "youtubeUrl": "https://www.youtube.com/@indydevdan",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "description": "Technical deep-dives into LLM agents, local embeddings, LangChain Python architectures, and production-grade retrieval augmented generation.",
    "primaryCategory": "AI Agents",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 85000,
    "subscriberTier": "<100k",
    "subscribersEstimate": "85K+",
    "avgViewsEstimate": "35K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "20 - 45 mins",
    "educationalScore": 95,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Deterministic Agent Guardrails",
        "description": "Building resilient agent loops with validation layers and structured outputs.",
        "skillsAcquired": [
          "Guardrails AI",
          "Pydantic schemas",
          "Deterministic workflows"
        ]
      }
    ],
    "topTopics": [
      "LLM Agents from Scratch",
      "Production RAG",
      "LangChain Advanced",
      "Embeddings Telemetry"
    ],
    "topVideos": [
      {
        "title": "Building Deterministic AI Agents with Pydantic and Python",
        "url": "https://www.youtube.com/watch?v=example13",
        "viewsEstimate": "110K",
        "duration": "34m",
        "topicTag": "Agent Architecture"
      }
    ],
    "toolsTaught": [
      "ollama",
      "langchain",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "autonomous-customer-support-triage"
    ]
  },
  {
    "id": "the-ai-advantage",
    "slug": "the-ai-advantage",
    "channelName": "The AI Advantage (Igor)",
    "handle": "@aiadvantage",
    "youtubeUrl": "https://www.youtube.com/@aiadvantage",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Practical, highly visual tutorials for knowledge workers, solopreneurs, and creators looking to automate repetitive tasks with generative AI tools.",
    "primaryCategory": "No-Code & Workflows",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 480000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "480K+",
    "avgViewsEstimate": "90K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "10 - 20 mins",
    "educationalScore": 88,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Solopreneur Automation Stack",
        "description": "Connecting ChatGPT, Make.com, and Notion into a frictionless content system.",
        "skillsAcquired": [
          "Zapier/Make integration",
          "Notion databases",
          "Automated drafting"
        ]
      }
    ],
    "topTopics": [
      "ChatGPT Workflows",
      "Midjourney Prompts",
      "Notion AI",
      "Productivity Systems"
    ],
    "topVideos": [
      {
        "title": "10 AI Automations That Save 20+ Hours a Week",
        "url": "https://www.youtube.com/watch?v=example14",
        "viewsEstimate": "720K",
        "duration": "18m",
        "topicTag": "Workflows"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "midjourney",
      "n8n"
    ],
    "inspiredWorkflowIds": [
      "shorts-creator-pipeline"
    ]
  },
  {
    "id": "prompt-engineering-channel",
    "slug": "prompt-engineering",
    "channelName": "Prompt Engineering",
    "handle": "@PromptEngineering",
    "youtubeUrl": "https://www.youtube.com/@PromptEngineering",
    "avatarUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
    "description": "Clear, reproducible walkthroughs of open-source model fine-tuning (Unsloth, QLoRA), local quantization with llama.cpp, and vector database benchmarks.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "Canada",
    "subscriberCountNumeric": 210000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "210K+",
    "avgViewsEstimate": "50K",
    "uploadCadence": "2 videos/week",
    "typicalVideoDepth": "15 - 30 mins",
    "educationalScore": 94,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Fine-Tuning on Consumer GPUs",
        "description": "Running Unsloth 5x faster with 70% less VRAM on RTX 3060/4090.",
        "skillsAcquired": [
          "Unsloth optimization",
          "GGUF quantization",
          "LoRA weights merge"
        ]
      }
    ],
    "topTopics": [
      "Fine-Tuning Open Models",
      "Ollama Setup",
      "Unsloth Guide",
      "RAG Evaluations"
    ],
    "topVideos": [
      {
        "title": "Fine-Tune Any LLM in 20 Mins on Free Google Colab",
        "url": "https://www.youtube.com/watch?v=example15",
        "viewsEstimate": "340K",
        "duration": "24m",
        "topicTag": "Fine-Tuning"
      }
    ],
    "toolsTaught": [
      "ollama",
      "hugging-face",
      "vllm"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ]
  },
  {
    "id": "mckay-wrigley",
    "slug": "mckay-wrigley",
    "channelName": "Mckay Wrigley",
    "handle": "@mckaywrigley",
    "youtubeUrl": "https://www.youtube.com/@mckaywrigley",
    "avatarUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    "description": "Creator of Chatbot UI and prolific AI open-source builder. Teaches rapid prototyping of AI apps, voice agents, and real-time vision pipelines.",
    "primaryCategory": "AI Coding",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 78000,
    "subscriberTier": "<100k",
    "subscribersEstimate": "78K+",
    "avgViewsEstimate": "40K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "15 - 30 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Fullstack AI Prototyping",
        "description": "Next.js 15, Vercel AI SDK, and streaming responses with Supabase vector search.",
        "skillsAcquired": [
          "Vercel AI SDK",
          "Streaming SSE",
          "Chatbot UI setup"
        ]
      }
    ],
    "topTopics": [
      "Vercel AI SDK",
      "Next.js AI Apps",
      "Real-Time Voice",
      "Chatbot UI"
    ],
    "topVideos": [
      {
        "title": "Build a Fullstack Voice AI Agent in 15 Minutes",
        "url": "https://www.youtube.com/watch?v=example16",
        "viewsEstimate": "140K",
        "duration": "19m",
        "topicTag": "Voice AI"
      }
    ],
    "toolsTaught": [
      "supabase",
      "cursor",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "figma-to-production-code-pipeline"
    ]
  },
  {
    "id": "ai-explained",
    "slug": "ai-explained",
    "channelName": "AI Explained",
    "handle": "@AIExplainedOfficial",
    "youtubeUrl": "https://www.youtube.com/@AIExplainedOfficial",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Unbiased, analytical journalism dissecting benchmark saturation, frontier lab claims (OpenAI, Anthropic, DeepSeek, Google), and AGI timelines.",
    "primaryCategory": "AI News",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "United Kingdom",
    "subscriberCountNumeric": 340000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "340K+",
    "avgViewsEstimate": "160K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15 - 35 mins",
    "educationalScore": 97,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Frontier Benchmark Auditing",
        "description": "Deconstructing SWE-bench, MMLU-Pro, and ARC-AGI scores with rigorous methodology.",
        "skillsAcquired": [
          "Benchmark verification",
          "Test-time compute analysis",
          "Model safety checks"
        ]
      }
    ],
    "topTopics": [
      "Frontier Model Benchmarks",
      "Reasoning Tokens (o1/o3/R1)",
      "AGI Analysis",
      "AI Safety"
    ],
    "topVideos": [
      {
        "title": "Has Reasoning Solved Coding? Deep Benchmark Audit",
        "url": "https://www.youtube.com/watch?v=example17",
        "viewsEstimate": "420K",
        "duration": "28m",
        "topicTag": "Benchmarks"
      }
    ],
    "toolsTaught": [
      "claude",
      "chatgpt",
      "deepseek-v3"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "lex-fridman-ai",
    "slug": "lex-fridman",
    "channelName": "Lex Fridman (AI Masterclasses)",
    "handle": "@lexfridman",
    "youtubeUrl": "https://www.youtube.com/@lexfridman",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "MIT AI researcher conducting multi-hour intimate conversations with founding scientists, CEOs, and researchers shaping artificial general intelligence.",
    "primaryCategory": "AI Research",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 4400000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "4.4M+",
    "avgViewsEstimate": "950K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "2 - 5 hours per interview",
    "educationalScore": 98,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Philosophical & Technical Foundations of AGI",
        "description": "Long-form technical discussions on alignment, compute limits, and cognition.",
        "skillsAcquired": [
          "AI Alignment",
          "Deep learning history",
          "Autonomous systems"
        ]
      }
    ],
    "topTopics": [
      "Deep Learning History",
      "Frontier Lab Strategy",
      "Robotics & Vision",
      "AI Consciousness"
    ],
    "topVideos": [
      {
        "title": "Sam Altman & Andrej Karpathy: The Future of Compute",
        "url": "https://www.youtube.com/watch?v=example18",
        "viewsEstimate": "3.1M",
        "duration": "3h 40m",
        "topicTag": "AGI"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "sentdex",
    "slug": "sentdex",
    "channelName": "sentdex (Harrison Kinsley)",
    "handle": "@sentdex",
    "youtubeUrl": "https://www.youtube.com/@sentdex",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "Legendary Python and neural networks educator. Teaches neural networks from raw math, robotics, reinforcement learning, and distributed LLM training.",
    "primaryCategory": "AI Research",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 1300000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.3M+",
    "avgViewsEstimate": "140K",
    "uploadCadence": "Monthly",
    "typicalVideoDepth": "30 - 90 mins",
    "educationalScore": 97,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Neural Networks from Scratch (NNFS)",
        "description": "Writing activation functions, forward and backward propagation without libraries.",
        "skillsAcquired": [
          "Matrix calculus",
          "Loss gradient derivation",
          "Custom backprop"
        ]
      }
    ],
    "topTopics": [
      "Neural Networks from Scratch",
      "Reinforcement Learning",
      "Autonomous Driving Simulation",
      "Distributed Training"
    ],
    "topVideos": [
      {
        "title": "Neural Networks from Scratch in Python - Full Masterclass",
        "url": "https://www.youtube.com/watch?v=example19",
        "viewsEstimate": "2.8M",
        "duration": "3h 15m",
        "topicTag": "Neural Networks"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ]
  },
  {
    "id": "statquest-josh-starmer",
    "slug": "statquest",
    "channelName": "StatQuest with Josh Starmer",
    "handle": "@statquest",
    "youtubeUrl": "https://www.youtube.com/@statquest",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "description": "Renowned for making complex statistics, machine learning, and transformer attention mathematics delightfully visual and easy to understand step by step.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 1200000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.2M+",
    "avgViewsEstimate": "280K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "10 - 25 mins",
    "educationalScore": 99,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Transformer Mathematics Visualized",
        "description": "Step-by-step dot-product attention, positional encoding, and softmax temperature.",
        "skillsAcquired": [
          "Self-attention math",
          "Softmax mechanics",
          "Gradient descent"
        ]
      }
    ],
    "topTopics": [
      "Transformer Math",
      "Neural Network Calculus",
      "Principal Component Analysis",
      "Decision Trees"
    ],
    "topVideos": [
      {
        "title": "Transformer Neural Networks, Clearly Explained!!!",
        "url": "https://www.youtube.com/watch?v=example20",
        "viewsEstimate": "3.6M",
        "duration": "22m",
        "topicTag": "Transformers"
      }
    ],
    "toolsTaught": [
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "jeremy-howard-fastai",
    "slug": "jeremy-howard",
    "channelName": "Jeremy Howard (fast.ai)",
    "handle": "@fastai",
    "youtubeUrl": "https://www.youtube.com/@fastai",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Founding researcher of fast.ai and former Kaggle President. Champion of top-down practical deep learning, fine-tuning computer vision, and NLP models.",
    "primaryCategory": "AI Research",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "Australia",
    "subscriberCountNumeric": 175000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "175K+",
    "avgViewsEstimate": "80K",
    "uploadCadence": "Seasonal Cohorts",
    "typicalVideoDepth": "90 mins per lecture",
    "educationalScore": 98,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Deep Learning for Coders",
        "description": "Train state-of-the-art vision and text models using PyTorch and fastai.",
        "skillsAcquired": [
          "Learning rate finding",
          "Data augmentation",
          "Transfer learning"
        ]
      }
    ],
    "topTopics": [
      "Practical Deep Learning",
      "PyTorch Foundations",
      "Diffusion Model Training",
      "Data Augmentation"
    ],
    "topVideos": [
      {
        "title": "Practical Deep Learning for Coders - Lesson 1",
        "url": "https://www.youtube.com/watch?v=example21",
        "viewsEstimate": "1.4M",
        "duration": "1h 32m",
        "topicTag": "Deep Learning"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "comfyui"
    ],
    "inspiredWorkflowIds": [
      "ecommerce-product-photo-studio"
    ]
  },
  {
    "id": "nicholas-renotte",
    "slug": "nicholas-renotte",
    "channelName": "Nicholas Renotte",
    "handle": "@NicholasRenotte",
    "youtubeUrl": "https://www.youtube.com/@NicholasRenotte",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "IBM AI specialist and educator. Builds end-to-end computer vision apps with MediaPipe, sign language recognizers, and LangChain agents from scratch.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Australia",
    "subscriberCountNumeric": 460000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "460K+",
    "avgViewsEstimate": "85K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "20 - 90 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Real-Time Computer Vision",
        "description": "Pose detection, object tracking, and YOLO deployments in Python.",
        "skillsAcquired": [
          "YOLOv8",
          "OpenCV streaming",
          "TensorFlow Lite"
        ]
      }
    ],
    "topTopics": [
      "Computer Vision",
      "LangChain with Local Models",
      "YOLO Object Detection",
      "MediaPipe"
    ],
    "topVideos": [
      {
        "title": "Real Time Object Detection with YOLOv8 and Python in 30 Mins",
        "url": "https://www.youtube.com/watch?v=example22",
        "viewsEstimate": "780K",
        "duration": "35m",
        "topicTag": "Computer Vision"
      }
    ],
    "toolsTaught": [
      "ollama",
      "hugging-face",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "ecommerce-product-photo-studio"
    ]
  },
  {
    "id": "ai-coffee-break-letitia",
    "slug": "ai-coffee-break",
    "channelName": "AI Coffee Break with Letitia",
    "handle": "@AICoffeeBreak",
    "youtubeUrl": "https://www.youtube.com/@AICoffeeBreak",
    "avatarUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    "description": "Dr. Letitia Parcalabescu conducts delightfully illustrated visual explanations of multimodal AI, vision-language models (CLIP, LLaVA), and research papers.",
    "primaryCategory": "AI Research",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "Europe (Germany)",
    "subscriberCountNumeric": 145000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "145K+",
    "avgViewsEstimate": "45K",
    "uploadCadence": "Monthly",
    "typicalVideoDepth": "10 - 20 mins",
    "educationalScore": 96,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Vision-Language Architectures",
        "description": "Contrastive learning, multimodal projection layers, and cross-attention.",
        "skillsAcquired": [
          "CLIP embeddings",
          "Multimodal LLMs",
          "Visual reasoning"
        ]
      }
    ],
    "topTopics": [
      "Vision Language Models",
      "Multimodal AI",
      "CLIP Architecture",
      "Paper Breakdowns"
    ],
    "topVideos": [
      {
        "title": "How CLIP Works: Multimodal AI Explained Step by Step",
        "url": "https://www.youtube.com/watch?v=example23",
        "viewsEstimate": "260K",
        "duration": "16m",
        "topicTag": "Multimodal AI"
      }
    ],
    "toolsTaught": [
      "hugging-face"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "tech-with-tim",
    "slug": "tech-with-tim",
    "channelName": "Tech With Tim",
    "handle": "@TechWithTim",
    "youtubeUrl": "https://www.youtube.com/@TechWithTim",
    "avatarUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    "description": "Software engineer teaching practical Python applications, AI game development, LangChain bots, and modern web developer tooling.",
    "primaryCategory": "AI Coding",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "Canada",
    "subscriberCountNumeric": 1600000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.6M+",
    "avgViewsEstimate": "110K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20 - 45 mins",
    "educationalScore": 91,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Python AI Bot Development",
        "description": "Integrating Discord/Telegram webhooks with OpenAI and Ollama models.",
        "skillsAcquired": [
          "Bot orchestration",
          "Python async",
          "API integration"
        ]
      }
    ],
    "topTopics": [
      "Python for AI",
      "Discord AI Bots",
      "FastAPI Microservices",
      "LangChain"
    ],
    "topVideos": [
      {
        "title": "Build an AI Discord Bot with Python and OpenAI in 2026",
        "url": "https://www.youtube.com/watch?v=example24",
        "viewsEstimate": "610K",
        "duration": "32m",
        "topicTag": "Python AI"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "autonomous-customer-support-triage"
    ]
  },
  {
    "id": "neuralnine",
    "slug": "neuralnine",
    "channelName": "NeuralNine (Florian)",
    "handle": "@NeuralNine",
    "youtubeUrl": "https://www.youtube.com/@NeuralNine",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Specializes in concise, high-density Python machine learning scripts, custom recurrent neural networks, and algorithmic trading with AI.",
    "primaryCategory": "AI Coding",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "Europe (Germany)",
    "subscriberCountNumeric": 290000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "290K+",
    "avgViewsEstimate": "60K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15 - 30 mins",
    "educationalScore": 93,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Recurrent Neural Networks & Time Series",
        "description": "LSTM and GRU implementations for sequential financial and sensor data.",
        "skillsAcquired": [
          "LSTM mechanics",
          "Time series forecasting",
          "PyTorch sequential"
        ]
      }
    ],
    "topTopics": [
      "PyTorch Neural Networks",
      "AI Financial Modeling",
      "Python ML Projects",
      "Genetic Algorithms"
    ],
    "topVideos": [
      {
        "title": "Neural Networks from Scratch with PyTorch: Fast Guide",
        "url": "https://www.youtube.com/watch?v=example25",
        "viewsEstimate": "410K",
        "duration": "26m",
        "topicTag": "PyTorch"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "hugging-face"
    ],
    "inspiredWorkflowIds": [
      "automated-invoice-financial-extractor"
    ]
  },
  {
    "id": "james-briggs",
    "slug": "james-briggs",
    "channelName": "James Briggs",
    "handle": "@jamesbriggs",
    "youtubeUrl": "https://www.youtube.com/@jamesbriggs",
    "avatarUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    "description": "Staff Developer Advocate at Pinecone. Industry reference for vector database indexing (HNSW), semantic chunking, and production RAG evaluation with RAGAS.",
    "primaryCategory": "AI Research",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "country": "United Kingdom",
    "subscriberCountNumeric": 120000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "120K+",
    "avgViewsEstimate": "38K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "15 - 35 mins",
    "educationalScore": 96,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Vector Indexing & Approximate Nearest Neighbors",
        "description": "HNSW, IVF, and semantic chunking parameters that minimize RAG retrieval noise.",
        "skillsAcquired": [
          "HNSW graph indexing",
          "Semantic chunking",
          "Cosine vs Dot product"
        ]
      }
    ],
    "topTopics": [
      "Vector Databases",
      "Advanced RAG",
      "Pinecone",
      "LangChain Retrieval"
    ],
    "topVideos": [
      {
        "title": "Advanced RAG: Semantic Chunking and Hybrid Search Masterclass",
        "url": "https://www.youtube.com/watch?v=example26",
        "viewsEstimate": "190K",
        "duration": "31m",
        "topicTag": "Vector Search"
      }
    ],
    "toolsTaught": [
      "langchain",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ]
  },
  {
    "id": "shaw-talebi",
    "slug": "shaw-talebi",
    "channelName": "Shaw Talebi",
    "handle": "@shawhintalebi",
    "youtubeUrl": "https://www.youtube.com/@shawhintalebi",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "Data scientist breaking down LLM math, RAG evaluation frameworks, and hands-on Python scripts with crisp, beautifully animated visuals.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 95000,
    "subscriberTier": "<100k",
    "subscribersEstimate": "95K+",
    "avgViewsEstimate": "30K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "10 - 25 mins",
    "educationalScore": 94,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "RAG Triad Evaluation",
        "description": "Context relevance, groundedness, and answer relevance automated scoring.",
        "skillsAcquired": [
          "RAG telemetry",
          "TruLens evaluation",
          "Embedding drift"
        ]
      }
    ],
    "topTopics": [
      "RAG Explained Simply",
      "LLM Evaluations",
      "Data Science with Python",
      "Embeddings Math"
    ],
    "topVideos": [
      {
        "title": "RAG from Scratch in Python (No LangChain Needed)",
        "url": "https://www.youtube.com/watch?v=example27",
        "viewsEstimate": "160K",
        "duration": "21m",
        "topicTag": "RAG"
      }
    ],
    "toolsTaught": [
      "ollama",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ]
  },
  {
    "id": "assembly-ai",
    "slug": "assemblyai",
    "channelName": "AssemblyAI",
    "handle": "@AssemblyAI",
    "youtubeUrl": "https://www.youtube.com/@AssemblyAI",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "description": "Speech AI research lab channel with outstanding coding tutorials covering Whisper, audio transcription, speaker diarization, and LLM reasoning.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 280000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "280K+",
    "avgViewsEstimate": "42K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "10 - 20 mins",
    "educationalScore": 93,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Speech-to-Text & Diarization",
        "description": "Transcribing streaming audio with Whisper and speaker separation.",
        "skillsAcquired": [
          "Whisper architecture",
          "Audio processing",
          "Real-time WebSockets"
        ]
      }
    ],
    "topTopics": [
      "Whisper Speech Recognition",
      "Audio Diarization",
      "Python AI Tutorials",
      "LLM Reasoning"
    ],
    "topVideos": [
      {
        "title": "Transcribe Speech to Text in Real Time with Python and Whisper",
        "url": "https://www.youtube.com/watch?v=example28",
        "viewsEstimate": "310K",
        "duration": "18m",
        "topicTag": "Speech AI"
      }
    ],
    "toolsTaught": [
      "elevenlabs",
      "hugging-face"
    ],
    "inspiredWorkflowIds": [
      "podcast-to-social-clips-factory"
    ]
  },
  {
    "id": "dotcsv",
    "slug": "dotcsv",
    "channelName": "Dot CSV (Carlos Santana)",
    "handle": "@DotCSV",
    "youtubeUrl": "https://www.youtube.com/@DotCSV",
    "avatarUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "description": "Leading Spanish-language AI channel in Europe. Brilliant visual documentaries explaining neural networks, LLM revolution, and robotics.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Europe (Spain)",
    "subscriberCountNumeric": 820000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "820K+",
    "avgViewsEstimate": "190K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "20 - 45 mins",
    "educationalScore": 95,
    "language": "Spanish",
    "curriculumPillars": [
      {
        "pillarTitle": "History & Ethics of Neural Computing",
        "description": "From Perceptrons to Transformers, conceptual clarity without gatekeeping.",
        "skillsAcquired": [
          "AI conceptual history",
          "Model ethics",
          "Visual explanations"
        ]
      }
    ],
    "topTopics": [
      "Transformers in Spanish",
      "AI Philosophy",
      "Robotics",
      "Generative Media"
    ],
    "topVideos": [
      {
        "title": "¿Qué es una Red Neuronal? Explicado desde cero",
        "url": "https://www.youtube.com/watch?v=example29",
        "viewsEstimate": "2.1M",
        "duration": "24m",
        "topicTag": "Neural Networks"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "midjourney"
    ],
    "inspiredWorkflowIds": [
      "shorts-creator-pipeline"
    ]
  },
  {
    "id": "alex-the-analyst",
    "slug": "alex-the-analyst",
    "channelName": "Alex The Analyst",
    "handle": "@AlexTheAnalyst",
    "youtubeUrl": "https://www.youtube.com/@AlexTheAnalyst",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "Definitive data analytics and SQL instructor. Teaches how to harness AI tools (ChatGPT, Cursor) for automated data cleaning, dashboard creation, and Python ETL.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 890000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "890K+",
    "avgViewsEstimate": "150K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15 - 45 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "AI-Assisted Data Analysis",
        "description": "Using LLM Code Interpreters for automated data profiling and visualization.",
        "skillsAcquired": [
          "SQL with AI",
          "Data cleaning with Python",
          "Tableau dashboards"
        ]
      }
    ],
    "topTopics": [
      "Data Analyst Roadmap",
      "SQL with AI",
      "Python for Analysts",
      "Power BI Automation"
    ],
    "topVideos": [
      {
        "title": "How to Use AI for Data Analytics (Complete Beginner Guide)",
        "url": "https://www.youtube.com/watch?v=example30",
        "viewsEstimate": "540K",
        "duration": "28m",
        "topicTag": "Data Analytics"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "cursor"
    ],
    "inspiredWorkflowIds": [
      "automated-invoice-financial-extractor"
    ]
  },
  {
    "id": "sebastian-raschka",
    "slug": "sebastian-raschka",
    "channelName": "Sebastian Raschka (Ahead of AI)",
    "handle": "@rasbt",
    "youtubeUrl": "https://www.youtube.com/@rasbt",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Staff Research Engineer at Lightning AI and author of \"Build a Large Language Model from Scratch\". Peerless educator on pre-training and fine-tuning transformers.",
    "primaryCategory": "AI Research",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 65000,
    "subscriberTier": "<100k",
    "subscribersEstimate": "65K+",
    "avgViewsEstimate": "35K",
    "uploadCadence": "Monthly",
    "typicalVideoDepth": "30 - 60 mins",
    "educationalScore": 99,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "LLM from Scratch",
        "description": "Implementing tokenizer, multi-head attention, and pre-training loop in pure PyTorch.",
        "skillsAcquired": [
          "PyTorch transformer",
          "Weight initialization",
          "Cross-entropy loss"
        ]
      }
    ],
    "topTopics": [
      "Build an LLM from Scratch",
      "LoRA vs QLoRA",
      "Pre-training Math",
      "Lightning AI"
    ],
    "topVideos": [
      {
        "title": "Coding a Transformer from Scratch in PyTorch",
        "url": "https://www.youtube.com/watch?v=example31",
        "viewsEstimate": "220K",
        "duration": "48m",
        "topicTag": "Transformers"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "kevin-stratvert",
    "slug": "kevin-stratvert",
    "channelName": "Kevin Stratvert",
    "handle": "@KevinStratvert",
    "youtubeUrl": "https://www.youtube.com/@KevinStratvert",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "Ex-Microsoft product manager producing the most accessible, high-clarity software guides on Copilot, Microsoft 365 AI, and consumer AI tools.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 3200000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "3.2M+",
    "avgViewsEstimate": "450K",
    "uploadCadence": "2 videos/week",
    "typicalVideoDepth": "10 - 20 mins",
    "educationalScore": 90,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Office & Enterprise AI",
        "description": "Copilot in Excel, PowerPoint, and Outlook for 5x workflow acceleration.",
        "skillsAcquired": [
          "Microsoft Copilot",
          "AI spreadsheet formulas",
          "Automated presentation drafting"
        ]
      }
    ],
    "topTopics": [
      "Microsoft Copilot",
      "ChatGPT for Beginners",
      "Excel AI Formulas",
      "Productivity"
    ],
    "topVideos": [
      {
        "title": "How to Use Microsoft Copilot: Complete Beginner Tutorial",
        "url": "https://www.youtube.com/watch?v=example32",
        "viewsEstimate": "1.8M",
        "duration": "19m",
        "topicTag": "Copilot"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "github-copilot"
    ],
    "inspiredWorkflowIds": [
      "voice-meeting-to-crm-action-items"
    ]
  },
  {
    "id": "jeff-su",
    "slug": "jeff-su",
    "channelName": "Jeff Su",
    "handle": "@JeffSu",
    "youtubeUrl": "https://www.youtube.com/@JeffSu",
    "avatarUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    "description": "Productivity architect and ex-Google employee. Teaches practical workplace prompt engineering, Claude for knowledge management, and AI email triage.",
    "primaryCategory": "No-Code & Workflows",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "Canada",
    "subscriberCountNumeric": 780000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "780K+",
    "avgViewsEstimate": "220K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "8 - 18 mins",
    "educationalScore": 91,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Executive Workplace AI",
        "description": "Automating meeting synthesis, corporate email drafting, and slide deck outlines.",
        "skillsAcquired": [
          "Workplace prompts",
          "Meeting distillation",
          "Claude Projects"
        ]
      }
    ],
    "topTopics": [
      "ChatGPT Productivity",
      "Claude Projects",
      "AI for Executives",
      "Notion AI"
    ],
    "topVideos": [
      {
        "title": "Top 7 Prompts to Save 15 Hours at Work Every Week",
        "url": "https://www.youtube.com/watch?v=example33",
        "viewsEstimate": "1.2M",
        "duration": "14m",
        "topicTag": "Productivity"
      }
    ],
    "toolsTaught": [
      "claude",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "voice-meeting-to-crm-action-items"
    ]
  },
  {
    "id": "1littlecoder",
    "slug": "1littlecoder",
    "channelName": "1LittleCoder (AbdulMajedRaja)",
    "handle": "@1littlecoder",
    "youtubeUrl": "https://www.youtube.com/@1littlecoder",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Rapid open-source AI news and tutorials. Covers Hugging Face model cards, Ollama on Apple Silicon, Gradio UI demos, and Indic NLP.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "intermediate",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 110000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "110K+",
    "avgViewsEstimate": "25K",
    "uploadCadence": "3-4 videos/week",
    "typicalVideoDepth": "10 - 25 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Open Weights Evaluation",
        "description": "Benchmarking newly dropped Hugging Face weights and running quantization.",
        "skillsAcquired": [
          "Gradio UI",
          "Hugging Face Hub",
          "Quantized inference"
        ]
      }
    ],
    "topTopics": [
      "Hugging Face Hub",
      "Ollama Mac Setup",
      "Gradio Demos",
      "Open Source Models"
    ],
    "topVideos": [
      {
        "title": "Run Any Open Source LLM Locally in 5 Minutes with Gradio",
        "url": "https://www.youtube.com/watch?v=example34",
        "viewsEstimate": "170K",
        "duration": "15m",
        "topicTag": "Open Source"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ]
  },
  {
    "id": "murtazas-workshop",
    "slug": "murtazas-workshop",
    "channelName": "Murtaza's Workshop - Robotics and AI",
    "handle": "@murtazasworkshop",
    "youtubeUrl": "https://www.youtube.com/@murtazasworkshop",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "Hardware, computer vision, and robotics maker. Teaches OpenCV, Raspberry Pi AI edge inference, and gesture tracking with clean visual overlays.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 620000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "620K+",
    "avgViewsEstimate": "110K",
    "uploadCadence": "Monthly",
    "typicalVideoDepth": "30 - 120 mins",
    "educationalScore": 94,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Edge Vision on Raspberry Pi",
        "description": "Deploying optimized neural networks on microcontrollers and embedded devices.",
        "skillsAcquired": [
          "Edge AI",
          "OpenCV Python",
          "Robotics control"
        ]
      }
    ],
    "topTopics": [
      "OpenCV Robotics",
      "Edge AI",
      "Computer Vision Course",
      "MediaPipe Projects"
    ],
    "topVideos": [
      {
        "title": "Computer Vision 101 with Python and OpenCV - Full 3-Hour Course",
        "url": "https://www.youtube.com/watch?v=example35",
        "viewsEstimate": "1.9M",
        "duration": "3h 12m",
        "topicTag": "Edge AI"
      }
    ],
    "toolsTaught": [
      "hugging-face"
    ],
    "inspiredWorkflowIds": [
      "ecommerce-product-photo-studio"
    ]
  },
  {
    "id": "luke-barousse",
    "slug": "luke-barousse",
    "channelName": "Luke Barousse",
    "handle": "@LukeBarousse",
    "youtubeUrl": "https://www.youtube.com/@LukeBarousse",
    "avatarUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    "description": "Data engineer and former submarine officer. Breaks down AI data pipelines, Python for data science, and harnessing generative AI for automated analytics.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 460000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "460K+",
    "avgViewsEstimate": "95K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "15 - 35 mins",
    "educationalScore": 91,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Data Engineering with Generative AI",
        "description": "ETL pipelines, database schemas, and prompt assisted data transformations.",
        "skillsAcquired": [
          "Python ETL",
          "SQL schemas",
          "Data pipelines"
        ]
      }
    ],
    "topTopics": [
      "Data Engineering",
      "ChatGPT for Data Science",
      "Python Course",
      "SQL Roadmap"
    ],
    "topVideos": [
      {
        "title": "How I Use AI as a Data Engineer in 2026",
        "url": "https://www.youtube.com/watch?v=example36",
        "viewsEstimate": "380K",
        "duration": "21m",
        "topicTag": "Data Engineering"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "cursor"
    ],
    "inspiredWorkflowIds": [
      "automated-invoice-financial-extractor"
    ]
  },
  {
    "id": "dan-becker-decision-forest",
    "slug": "dan-becker",
    "channelName": "Dan Becker (Decision AI)",
    "handle": "@danbeckerai",
    "youtubeUrl": "https://www.youtube.com/@danbeckerai",
    "avatarUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "description": "Former Kaggle Head of Learning and Google AI contributor. Teaches pragmatic deep learning, model monitoring, and automated feature engineering.",
    "primaryCategory": "AI Research",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 52000,
    "subscriberTier": "<100k",
    "subscribersEstimate": "52K+",
    "avgViewsEstimate": "18K",
    "uploadCadence": "Monthly",
    "typicalVideoDepth": "15 - 30 mins",
    "educationalScore": 95,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Model Interpretability & SHAP Values",
        "description": "Feature attribution, bias detection, and explainable AI in regulated enterprise.",
        "skillsAcquired": [
          "SHAP values",
          "Model explainability",
          "Feature importance"
        ]
      }
    ],
    "topTopics": [
      "Model Interpretability",
      "Deep Learning Pragmatics",
      "Kaggle Winning Techniques",
      "AI Feature Engineering"
    ],
    "topVideos": [
      {
        "title": "SHAP Values: How to Explain Any Machine Learning Model",
        "url": "https://www.youtube.com/watch?v=example37",
        "viewsEstimate": "95K",
        "duration": "24m",
        "topicTag": "Explainable AI"
      }
    ],
    "toolsTaught": [
      "hugging-face"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "bycloud",
    "slug": "bycloud",
    "channelName": "bycloud",
    "handle": "@bycloud",
    "youtubeUrl": "https://www.youtube.com/@bycloud",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "description": "Super-dense, beautifully edited animated breakdowns of AI research papers: LoRA, QLoRA, Mixture-of-Experts, and FlashAttention.",
    "primaryCategory": "AI Research",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 140000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "140K+",
    "avgViewsEstimate": "60K",
    "uploadCadence": "Monthly",
    "typicalVideoDepth": "8 - 16 mins",
    "educationalScore": 97,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Efficient Attention Algorithms",
        "description": "FlashAttention-2, KV caching, and tiling GPU memory hierarchies.",
        "skillsAcquired": [
          "KV cache optimization",
          "Memory bandwidth analysis",
          "FlashAttention math"
        ]
      }
    ],
    "topTopics": [
      "Mixture of Experts",
      "FlashAttention Explained",
      "LoRA Math",
      "DeepSeek Architecture"
    ],
    "topVideos": [
      {
        "title": "Mixture of Experts (MoE) Explained in 10 Minutes",
        "url": "https://www.youtube.com/watch?v=example38",
        "viewsEstimate": "380K",
        "duration": "11m",
        "topicTag": "Architecture"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "vllm"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "weights-biases-official",
    "slug": "weights-and-biases",
    "channelName": "Weights & Biases",
    "handle": "@wandb",
    "youtubeUrl": "https://www.youtube.com/@wandb",
    "avatarUrl": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80",
    "description": "Official channel of the ML developer platform. World-class masterclasses on LLM fine-tuning, RLHF, loss curves monitoring, and model evaluation.",
    "primaryCategory": "AI Research",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 68000,
    "subscriberTier": "<100k",
    "subscribersEstimate": "68K+",
    "avgViewsEstimate": "22K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20 - 60 mins",
    "educationalScore": 96,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "MLOps & Experiment Tracking",
        "description": "Monitoring loss spikes, gradient norms, and hyperparameter sweeps in production.",
        "skillsAcquired": [
          "W&B Sweeps",
          "Loss curve diagnostics",
          "Distributed logging"
        ]
      }
    ],
    "topTopics": [
      "LLM Fine-Tuning Monitoring",
      "RLHF Masterclass",
      "MLOps Best Practices",
      "Evaluation Benchmarks"
    ],
    "topVideos": [
      {
        "title": "How to Fine-Tune Llama 3 with Weights & Biases",
        "url": "https://www.youtube.com/watch?v=example39",
        "viewsEstimate": "110K",
        "duration": "45m",
        "topicTag": "MLOps"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "siraj-raval",
    "slug": "siraj-raval",
    "channelName": "Siraj Raval",
    "handle": "@SirajRaval",
    "youtubeUrl": "https://www.youtube.com/@SirajRaval",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "High-energy AI educator demystifying quantum computing, autonomous agents, generative diffusion, and decentralized AI networks.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 740000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "740K+",
    "avgViewsEstimate": "85K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "15 - 35 mins",
    "educationalScore": 88,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Autonomous Agent Networks",
        "description": "Building peer-to-peer agent swarms and decentralized compute nodes.",
        "skillsAcquired": [
          "Agent swarms",
          "Decentralized compute",
          "Web3 AI"
        ]
      }
    ],
    "topTopics": [
      "AI Agents Swarm",
      "Quantum Machine Learning",
      "Generative Media",
      "Decentralized AI"
    ],
    "topVideos": [
      {
        "title": "Build an Autonomous AI Agent Swarm in Python",
        "url": "https://www.youtube.com/watch?v=example40",
        "viewsEstimate": "420K",
        "duration": "28m",
        "topicTag": "AI Swarms"
      }
    ],
    "toolsTaught": [
      "chatgpt",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "autonomous-customer-support-triage"
    ]
  },
  {
    "id": "tech-dose-india",
    "slug": "tech-dose",
    "channelName": "TECH DOSE (Surya)",
    "handle": "@TECHDOSE",
    "youtubeUrl": "https://www.youtube.com/@TECHDOSE",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "Premier Indian DSA & algorithm channel. Crystal clear breakdowns of algorithmic problem solving, search space optimization, and AI graph algorithms.",
    "primaryCategory": "Indian AI",
    "difficulty": "intermediate",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 320000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "320K+",
    "avgViewsEstimate": "55K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15 - 30 mins",
    "educationalScore": 94,
    "language": "English / Hinglish",
    "curriculumPillars": [
      {
        "pillarTitle": "Dynamic Programming & Graph Traversal",
        "description": "State space formulation and memoization for reasoning systems.",
        "skillsAcquired": [
          "DP optimizations",
          "Graph algorithms",
          "Heuristic search"
        ]
      }
    ],
    "topTopics": [
      "Graph Algorithms",
      "Dynamic Programming",
      "AI Search Heuristics",
      "Interview Prep"
    ],
    "topVideos": [
      {
        "title": "Dijkstra & A* Shortest Path Algorithm Simplified",
        "url": "https://www.youtube.com/watch?v=example41",
        "viewsEstimate": "490K",
        "duration": "22m",
        "topicTag": "Algorithms"
      }
    ],
    "toolsTaught": [
      "github-copilot",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "shrirang-ai",
    "slug": "shrirang-ai",
    "channelName": "Shrirang AI (Data Science)",
    "handle": "@shrirang_ai",
    "youtubeUrl": "https://www.youtube.com/@shrirang_ai",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Indian machine learning practitioner producing in-depth Hindi & English guides on deploying LLMs, LangGraph, and RAG pipelines.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 48000,
    "subscriberTier": "<100k",
    "subscribersEstimate": "48K+",
    "avgViewsEstimate": "15K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20 - 45 mins",
    "educationalScore": 91,
    "language": "Hinglish",
    "curriculumPillars": [
      {
        "pillarTitle": "LangGraph Production Agents",
        "description": "State machines, human-in-the-loop approvals, and cyclical graph agents.",
        "skillsAcquired": [
          "LangGraph states",
          "Human-in-the-loop",
          "Tool calling"
        ]
      }
    ],
    "topTopics": [
      "LangGraph in Hindi",
      "RAG with LlamaIndex",
      "Ollama Hindi Guide",
      "FastAPI with LLMs"
    ],
    "topVideos": [
      {
        "title": "LangGraph Complete Tutorial in Hindi with Projects",
        "url": "https://www.youtube.com/watch?v=example42",
        "viewsEstimate": "85K",
        "duration": "42m",
        "topicTag": "LangGraph"
      }
    ],
    "toolsTaught": [
      "ollama",
      "langchain"
    ],
    "inspiredWorkflowIds": [
      "autonomous-customer-support-triage"
    ]
  },
  {
    "id": "freecodecamp-ai",
    "slug": "freecodecamp",
    "channelName": "freeCodeCamp.org (AI Tracks)",
    "handle": "@freecodecamp",
    "youtubeUrl": "https://www.youtube.com/@freecodecamp",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "The world's most popular free coding education non-profit. Hosts exhaustive 10-hour to 20-hour zero-cost college-level deep learning courses.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 9800000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "9.8M+",
    "avgViewsEstimate": "1.2M",
    "uploadCadence": "Daily",
    "typicalVideoDepth": "3 - 15 hours mega courses",
    "educationalScore": 99,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Comprehensive University AI Curriculum",
        "description": "From linear algebra to transformer attention, completely free for the world.",
        "skillsAcquired": [
          "Fullstack AI",
          "PyTorch certification",
          "Data structures"
        ]
      }
    ],
    "topTopics": [
      "Deep Learning Mega Course",
      "PyTorch for Beginners",
      "AI Math",
      "Machine Learning Full Course"
    ],
    "topVideos": [
      {
        "title": "Harvard CS50's Introduction to Artificial Intelligence with Python",
        "url": "https://www.youtube.com/watch?v=example43",
        "viewsEstimate": "5.2M",
        "duration": "11h 50m",
        "topicTag": "CS50 AI"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "ai-code-king",
    "slug": "ai-code-king",
    "channelName": "AI Code King",
    "handle": "@AICodeKing",
    "youtubeUrl": "https://www.youtube.com/@AICodeKing",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Pioneer in Cursor rules, AI pair programming setups, Claude Sonnet prompting hacks, and building micro-SaaS with modern AI coding editors.",
    "primaryCategory": "AI Coding",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 56000,
    "subscriberTier": "<100k",
    "subscribersEstimate": "56K+",
    "avgViewsEstimate": "28K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "12 - 25 mins",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Cursor Rules & Custom Prompts",
        "description": "Writing custom .cursorrules and system specs to prevent code hallucinations.",
        "skillsAcquired": [
          ".cursorrules syntax",
          "Context pinning",
          "Multi-file edits"
        ]
      }
    ],
    "topTopics": [
      "Cursor Rules Tutorial",
      "Claude 3.7 Coding",
      "AI SaaS Fast",
      "v0 to Code"
    ],
    "topVideos": [
      {
        "title": "The Ultimate .cursorrules File to Make Cursor 10x Smarter",
        "url": "https://www.youtube.com/watch?v=example44",
        "viewsEstimate": "130K",
        "duration": "16m",
        "topicTag": "Cursor"
      }
    ],
    "toolsTaught": [
      "cursor",
      "claude",
      "v0"
    ],
    "inspiredWorkflowIds": [
      "figma-to-production-code-pipeline"
    ]
  },
  {
    "id": "george-hotz",
    "slug": "george-hotz",
    "channelName": "George Hotz Archive / comma.ai",
    "handle": "@georgehotz",
    "youtubeUrl": "https://www.youtube.com/@georgehotz",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "Founder of comma.ai and tinygrad. Live coding sessions building custom neural network frameworks, CUDA kernels, and autonomous driving stacks from scratch.",
    "primaryCategory": "AI Coding",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 420000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "420K+",
    "avgViewsEstimate": "180K",
    "uploadCadence": "Weekly streams",
    "typicalVideoDepth": "3h - 6h Live Coding",
    "educationalScore": 97,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Low-Level Deep Learning",
        "description": "Writing neural network runtimes, compilers, and tensor ops from C and Python.",
        "skillsAcquired": [
          "tinygrad",
          "CUDA Kernels",
          "Compiler Design"
        ]
      },
      {
        "pillarTitle": "Autonomous Driving Robotics",
        "description": "End-to-end computer vision and comma openpilot stack architecture.",
        "skillsAcquired": [
          "Sensor Interfacing",
          "Vision Policy"
        ]
      }
    ],
    "topTopics": [
      "tinygrad",
      "Low-Level ML",
      "Autonomous Driving",
      "CUDA"
    ],
    "topVideos": [
      {
        "title": "Programming a neural network from scratch in Python",
        "url": "https://www.youtube.com/@georgehotz",
        "viewsEstimate": "510K",
        "duration": "4h 12m",
        "topicTag": "tinygrad"
      }
    ],
    "toolsTaught": [
      "ollama",
      "vllm"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "daniel-bourke",
    "slug": "daniel-bourke",
    "channelName": "Daniel Bourke",
    "handle": "@mrdbourke",
    "youtubeUrl": "https://www.youtube.com/@mrdbourke",
    "avatarUrl": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    "description": "Practicing machine learning engineer. Created the internet-famous Zero to Mastery PyTorch and TensorFlow bootcamps with visual diagrams and hands-on projects.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "Australia",
    "subscriberCountNumeric": 195000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "195K+",
    "avgViewsEstimate": "90K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "45m - 2h Coding Masterclasses",
    "educationalScore": 95,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "PyTorch End-to-End",
        "description": "Step-by-step tensor math, loss functions, optimizers, and computer vision models.",
        "skillsAcquired": [
          "PyTorch",
          "Model Evaluation",
          "Data Pipelines"
        ]
      }
    ],
    "topTopics": [
      "PyTorch",
      "Machine Learning",
      "Computer Vision",
      "Nutrify AI"
    ],
    "topVideos": [
      {
        "title": "PyTorch for Deep Learning Bootcamp (Full Course)",
        "url": "https://www.youtube.com/@mrdbourke",
        "viewsEstimate": "1.2M",
        "duration": "24h",
        "topicTag": "PyTorch"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "pytorch"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "ken-jee",
    "slug": "ken-jee",
    "channelName": "Ken Jee",
    "handle": "@KenJee_ds",
    "youtubeUrl": "https://www.youtube.com/@KenJee_ds",
    "avatarUrl": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    "description": "Head of Data Science and educator breaking down AI engineering roadmaps, Kaggle competitions, and production ML pipelines.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 285000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "285K+",
    "avgViewsEstimate": "75K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15m - 30m Career Guides",
    "educationalScore": 91,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Data Science to AI Transition",
        "description": "Practical roadmaps for transitioning from data analytics to AI engineering.",
        "skillsAcquired": [
          "Portfolio Building",
          "Kaggle Workflows"
        ]
      }
    ],
    "topTopics": [
      "AI Roadmaps",
      "Data Science",
      "Portfolio Projects"
    ],
    "topVideos": [
      {
        "title": "How I Would Learn AI & Data Science in 2026",
        "url": "https://www.youtube.com/@KenJee_ds",
        "viewsEstimate": "450K",
        "duration": "18m",
        "topicTag": "Roadmap"
      }
    ],
    "toolsTaught": [
      "cursor",
      "deepseek"
    ],
    "inspiredWorkflowIds": [
      "seo-content-factory"
    ]
  },
  {
    "id": "tina-huang",
    "slug": "tina-huang",
    "channelName": "Tina Huang",
    "handle": "@TinaHuang1",
    "youtubeUrl": "https://www.youtube.com/@TinaHuang1",
    "avatarUrl": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    "description": "Former Meta data scientist demystifying AI productivity, coding workflows, system prompts, and automated study workflows.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "beginner",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 780000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "780K+",
    "avgViewsEstimate": "210K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "12m - 25m Guides",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "AI Productivity & Study Pipelines",
        "description": "Using LLMs to speed up software engineering and academic research.",
        "skillsAcquired": [
          "RAG Search",
          "Prompt Chaining"
        ]
      }
    ],
    "topTopics": [
      "AI Productivity",
      "Prompt Engineering",
      "Tech Careers"
    ],
    "topVideos": [
      {
        "title": "How to Learn Any AI Skill 10x Faster with Claude & GPT",
        "url": "https://www.youtube.com/@TinaHuang1",
        "viewsEstimate": "620K",
        "duration": "16m",
        "topicTag": "Productivity"
      }
    ],
    "toolsTaught": [
      "notion-ai",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "abhishek-thakur",
    "slug": "abhishek-thakur",
    "channelName": "Abhishek Thakur",
    "handle": "@abhishekkrthakur",
    "youtubeUrl": "https://www.youtube.com/@abhishekkrthakur",
    "avatarUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    "description": "World 4x Grandmaster on Kaggle and Hugging Face staff engineer. Hands-on coding tutorials on fine-tuning open-weights models and building RAG pipelines.",
    "primaryCategory": "Indian AI",
    "difficulty": "advanced",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 98000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "98K+",
    "avgViewsEstimate": "42K",
    "uploadCadence": "Bi-weekly",
    "typicalVideoDepth": "30m - 1h Hands-on Code",
    "educationalScore": 96,
    "language": "English / Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "Hugging Face Fine-Tuning",
        "description": "Fine-tuning transformers, LoRA adapters, and vision models.",
        "skillsAcquired": [
          "LoRA",
          "PEFT",
          "Hugging Face Hub"
        ]
      }
    ],
    "topTopics": [
      "Fine-Tuning",
      "Hugging Face",
      "Kaggle Grandmaster",
      "NLP"
    ],
    "topVideos": [
      {
        "title": "Fine-Tuning Llama 3 on Custom Datasets using Hugging Face",
        "url": "https://www.youtube.com/@abhishekkrthakur",
        "viewsEstimate": "140K",
        "duration": "48m",
        "topicTag": "Fine-Tuning"
      }
    ],
    "toolsTaught": [
      "hugging-face",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "tanay-pratap",
    "slug": "tanay-pratap",
    "channelName": "Tanay Pratap",
    "handle": "@tanaypratap",
    "youtubeUrl": "https://www.youtube.com/@tanaypratap",
    "avatarUrl": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "description": "Former Microsoft engineer and tech founder guiding Indian software engineers through AI transformation, full-stack dev, and startup engineering.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 220000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "220K+",
    "avgViewsEstimate": "85K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15m - 35m Tech Talks",
    "educationalScore": 91,
    "language": "Hinglish / English",
    "curriculumPillars": [
      {
        "pillarTitle": "AI-Era Full Stack Engineering",
        "description": "Building modern web products with integrated LLM backends.",
        "skillsAcquired": [
          "Modern Web Architecture",
          "Product AI"
        ]
      }
    ],
    "topTopics": [
      "AI Career",
      "Full Stack Dev",
      "Indian Startup Ecosystem"
    ],
    "topVideos": [
      {
        "title": "The Future of Software Engineers in the Age of AI",
        "url": "https://www.youtube.com/@tanaypratap",
        "viewsEstimate": "310K",
        "duration": "22m",
        "topicTag": "Career"
      }
    ],
    "toolsTaught": [
      "cursor",
      "v0"
    ],
    "inspiredWorkflowIds": [
      "figma-to-production-code-pipeline"
    ]
  },
  {
    "id": "kunal-kushwaha",
    "slug": "kunal-kushwaha",
    "channelName": "Kunal Kushwaha",
    "handle": "@kunalstwt",
    "youtubeUrl": "https://www.youtube.com/@kunalstwt",
    "avatarUrl": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    "description": "Open-source advocate and DevOps educator teaching cloud-native architecture, Kubernetes, Git, and deploying AI models to production.",
    "primaryCategory": "AI Coding",
    "difficulty": "beginner",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 490000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "490K+",
    "avgViewsEstimate": "140K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "1h - 3h Complete Bootcamps",
    "educationalScore": 94,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Cloud Native & DevOps for AI",
        "description": "Containerizing model runtimes and deploying with Docker and Kubernetes.",
        "skillsAcquired": [
          "Docker",
          "Kubernetes",
          "CI/CD"
        ]
      }
    ],
    "topTopics": [
      "Open Source",
      "DevOps",
      "Docker",
      "Kubernetes"
    ],
    "topVideos": [
      {
        "title": "Complete Docker Course for Beginners with AI Deployment",
        "url": "https://www.youtube.com/@kunalstwt",
        "viewsEstimate": "920K",
        "duration": "3h 15m",
        "topicTag": "Docker"
      }
    ],
    "toolsTaught": [
      "vllm",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "apna-college",
    "slug": "apna-college",
    "channelName": "Apna College",
    "handle": "@ApnaCollegeOfficial",
    "youtubeUrl": "https://www.youtube.com/@ApnaCollegeOfficial",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "description": "Founded by Aman Dhattarwal and Shradha Khapra. India premier educational channel for engineering students learning Java, Python, and AI development.",
    "primaryCategory": "Indian AI",
    "difficulty": "beginner",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 5400000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "5.4M+",
    "avgViewsEstimate": "650K",
    "uploadCadence": "2 videos / week",
    "typicalVideoDepth": "1h - 4h Comprehensive Courses",
    "educationalScore": 95,
    "language": "Hindi",
    "curriculumPillars": [
      {
        "pillarTitle": "Computer Science Fundamentals",
        "description": "Core data structures, algorithms, and Python programming.",
        "skillsAcquired": [
          "Python",
          "DSA",
          "Problem Solving"
        ]
      }
    ],
    "topTopics": [
      "Python",
      "Web Dev",
      "AI Engineering",
      "Placement Prep"
    ],
    "topVideos": [
      {
        "title": "Python Full Course for Beginners in Hindi",
        "url": "https://www.youtube.com/@ApnaCollegeOfficial",
        "viewsEstimate": "4.8M",
        "duration": "8h 20m",
        "topicTag": "Python"
      }
    ],
    "toolsTaught": [
      "cursor",
      "chatgpt"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "neetcode",
    "slug": "neetcode",
    "channelName": "NeetCode",
    "handle": "@NeetCode",
    "youtubeUrl": "https://www.youtube.com/@NeetCode",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "description": "Former Google software engineer. The definitive global authority on algorithms, technical system design, and AI-accelerated code preparation.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 840000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "840K+",
    "avgViewsEstimate": "180K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "15m - 40m Problem Breakdowns",
    "educationalScore": 98,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Algorithmic Mastery",
        "description": "NeetCode 150 algorithmic patterns and clean recursive problem solving.",
        "skillsAcquired": [
          "Dynamic Programming",
          "Graph Theory"
        ]
      }
    ],
    "topTopics": [
      "Algorithms",
      "System Design",
      "AI Coding Tools",
      "SWE Interviews"
    ],
    "topVideos": [
      {
        "title": "How I Use AI Tools as a Senior Software Engineer",
        "url": "https://www.youtube.com/@NeetCode",
        "viewsEstimate": "610K",
        "duration": "14m",
        "topicTag": "AI Coding"
      }
    ],
    "toolsTaught": [
      "cursor",
      "claude"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "bytebytego",
    "slug": "bytebytego",
    "channelName": "ByteByteGo",
    "handle": "@ByteByteGo",
    "youtubeUrl": "https://www.youtube.com/@ByteByteGo",
    "avatarUrl": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    "description": "Created by Alex Xu. Visual animations explaining large-scale distributed systems, vector database indexing, and LLM serving infrastructure.",
    "primaryCategory": "AI Research",
    "difficulty": "intermediate",
    "isIndiaCreator": false,
    "country": "United States",
    "subscriberCountNumeric": 1450000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.45M+",
    "avgViewsEstimate": "320K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "10m - 20m Visual Animations",
    "educationalScore": 97,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Large Scale AI Architecture",
        "description": "How vector databases, RAG systems, and GPU clusters operate under the hood.",
        "skillsAcquired": [
          "Vector Indexing",
          "HNSW Math",
          "Distributed Systems"
        ]
      }
    ],
    "topTopics": [
      "System Design",
      "Vector DBs",
      "RAG Architecture",
      "Distributed Systems"
    ],
    "topVideos": [
      {
        "title": "How Vector Databases Work (Visual Step-by-Step)",
        "url": "https://www.youtube.com/@ByteByteGo",
        "viewsEstimate": "890K",
        "duration": "11m",
        "topicTag": "Vector DB"
      }
    ],
    "toolsTaught": [
      "qdrant",
      "chromadb",
      "milvus"
    ],
    "inspiredWorkflowIds": [
      "local-private-rag-knowledgebase"
    ]
  },
  {
    "id": "computerphile",
    "slug": "computerphile",
    "channelName": "Computerphile",
    "handle": "@Computerphile",
    "youtubeUrl": "https://www.youtube.com/@Computerphile",
    "avatarUrl": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "description": "University of Nottingham professors breaking down the deep mathematics, neural network backprop, encryption, and computer science theories.",
    "primaryCategory": "AI Research",
    "difficulty": "advanced",
    "isIndiaCreator": false,
    "country": "United Kingdom",
    "subscriberCountNumeric": 2550000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "2.55M+",
    "avgViewsEstimate": "240K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "12m - 25m Academic Talks",
    "educationalScore": 99,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Mathematical Computer Science",
        "description": "Turing completeness, gradient descent math, and floating point computation.",
        "skillsAcquired": [
          "Discrete Math",
          "Floating Point Architecture"
        ]
      }
    ],
    "topTopics": [
      "Neural Networks",
      "Algorithms",
      "Computer Science History"
    ],
    "topVideos": [
      {
        "title": "How Transformers Work - Computerphile",
        "url": "https://www.youtube.com/@Computerphile",
        "viewsEstimate": "1.5M",
        "duration": "18m",
        "topicTag": "Transformers"
      }
    ],
    "toolsTaught": [
      "pytorch"
    ],
    "inspiredWorkflowIds": [
      "academic-literature-synthesis"
    ]
  },
  {
    "id": "arjancodes",
    "slug": "arjancodes",
    "channelName": "ArjanCodes",
    "handle": "@ArjanCodes",
    "youtubeUrl": "https://www.youtube.com/@ArjanCodes",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Software design patterns, refactoring, and AI-assisted Python architecture.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 390000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "390K+",
    "avgViewsEstimate": "98K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "ArjanCodes - Complete Production Guide",
        "url": "https://www.youtube.com/@ArjanCodes",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "continuous-delivery",
    "slug": "continuous-delivery",
    "channelName": "Continuous Delivery",
    "handle": "@ContinuousDelivery",
    "youtubeUrl": "https://www.youtube.com/@ContinuousDelivery",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Dave Farley on test-driven development, AI engineering, and software delivery pipelines.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 245000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "245K+",
    "avgViewsEstimate": "61K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Continuous Delivery - Complete Production Guide",
        "url": "https://www.youtube.com/@ContinuousDelivery",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "tsoding-daily",
    "slug": "tsoding-daily",
    "channelName": "Tsoding Daily",
    "handle": "@tsoding",
    "youtubeUrl": "https://www.youtube.com/@tsoding",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Live algorithmic C and Python systems programming without bloat or dependencies.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 325000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "325K+",
    "avgViewsEstimate": "81K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Tsoding Daily - Complete Production Guide",
        "url": "https://www.youtube.com/@tsoding",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "low-level-javascript",
    "slug": "low-level-javascript",
    "channelName": "Low Level JavaScript",
    "handle": "@lowleveljavascript",
    "youtubeUrl": "https://www.youtube.com/@lowleveljavascript",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Building compilers, virtual machines, and neural networks in pure JavaScript.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 89000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "89K+",
    "avgViewsEstimate": "22K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Low Level JavaScript - Complete Production Guide",
        "url": "https://www.youtube.com/@lowleveljavascript",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "corey-schafer",
    "slug": "corey-schafer",
    "channelName": "Corey Schafer",
    "handle": "@coreyms",
    "youtubeUrl": "https://www.youtube.com/@coreyms",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "The quintessential Python tutorial library covering virtual environments, Django, and pandas.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 1250000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.3M+",
    "avgViewsEstimate": "313K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Corey Schafer - Complete Production Guide",
        "url": "https://www.youtube.com/@coreyms",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "traversy-media",
    "slug": "traversy-media",
    "channelName": "Traversy Media",
    "handle": "@TraversyMedia",
    "youtubeUrl": "https://www.youtube.com/@TraversyMedia",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Brad Traversy hands-on full-stack development and practical AI web app tutorials.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 2200000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "2.2M+",
    "avgViewsEstimate": "550K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Traversy Media - Complete Production Guide",
        "url": "https://www.youtube.com/@TraversyMedia",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "web-dev-simplified",
    "slug": "web-dev-simplified",
    "channelName": "Web Dev Simplified",
    "handle": "@WebDevSimplified",
    "youtubeUrl": "https://www.youtube.com/@WebDevSimplified",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Kyle Cook visual full-stack tutorials simplifying complex React and AI integrations.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 1650000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.6M+",
    "avgViewsEstimate": "413K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Web Dev Simplified - Complete Production Guide",
        "url": "https://www.youtube.com/@WebDevSimplified",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "kevin-powell",
    "slug": "kevin-powell",
    "channelName": "Kevin Powell",
    "handle": "@KevinPowell",
    "youtubeUrl": "https://www.youtube.com/@KevinPowell",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "CSS evangelist teaching responsive layout systems, modern typography, and clean UI engineering.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 1100000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.1M+",
    "avgViewsEstimate": "275K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Kevin Powell - Complete Production Guide",
        "url": "https://www.youtube.com/@KevinPowell",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "dreams-of-code",
    "slug": "dreams-of-code",
    "channelName": "Dreams of Code",
    "handle": "@dreamsofcode",
    "youtubeUrl": "https://www.youtube.com/@dreamsofcode",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Go, Rust, and modern CLI development for building lightning-fast AI tools.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 155000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "155K+",
    "avgViewsEstimate": "39K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Dreams of Code - Complete Production Guide",
        "url": "https://www.youtube.com/@dreamsofcode",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "james-q-quick",
    "slug": "james-q-quick",
    "channelName": "James Q Quick",
    "handle": "@JamesQQuick",
    "youtubeUrl": "https://www.youtube.com/@JamesQQuick",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Full-stack JavaScript, serverless APIs, and AI workflow integration.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 215000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "215K+",
    "avgViewsEstimate": "54K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "James Q Quick - Complete Production Guide",
        "url": "https://www.youtube.com/@JamesQQuick",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "tanay-pratap-tech",
    "slug": "tanay-pratap-tech",
    "channelName": "Tanay Pratap Tech",
    "handle": "@tanaypratap_dev",
    "youtubeUrl": "https://www.youtube.com/@tanaypratap_dev",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Hinglish engineering breakdowns of system design, AI careers, and Indian tech innovation.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 185000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "185K+",
    "avgViewsEstimate": "46K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "Hindi / Regional",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Tanay Pratap Tech - Complete Production Guide",
        "url": "https://www.youtube.com/@tanaypratap_dev",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "abhishek-nagaraj-ai",
    "slug": "abhishek-nagaraj-ai",
    "channelName": "Abhishek Nagaraj AI",
    "handle": "@abhisheknagaraj",
    "youtubeUrl": "https://www.youtube.com/@abhisheknagaraj",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Kannada and English tech breakdowns on building with local Indic models.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 45000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "45K+",
    "avgViewsEstimate": "11K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "Hindi / Regional",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Abhishek Nagaraj AI - Complete Production Guide",
        "url": "https://www.youtube.com/@abhisheknagaraj",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "tamil-tech-developer",
    "slug": "tamil-tech-developer",
    "channelName": "Tamil Tech Developer",
    "handle": "@tamiltechdev",
    "youtubeUrl": "https://www.youtube.com/@tamiltechdev",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Tamil language AI coding masterclasses covering Python, Ollama, and agent building.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 120000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "120K+",
    "avgViewsEstimate": "30K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "Hindi / Regional",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Tamil Tech Developer - Complete Production Guide",
        "url": "https://www.youtube.com/@tamiltechdev",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "telugu-ai-hub",
    "slug": "telugu-ai-hub",
    "channelName": "Telugu AI Hub",
    "handle": "@teluguaihub",
    "youtubeUrl": "https://www.youtube.com/@teluguaihub",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Telugu comprehensive tutorials on ChatGPT, prompt engineering, and local LLMs.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 85000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "85K+",
    "avgViewsEstimate": "21K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "Hindi / Regional",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Telugu AI Hub - Complete Production Guide",
        "url": "https://www.youtube.com/@teluguaihub",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "codexplore-india",
    "slug": "codexplore-india",
    "channelName": "CodeXplore India",
    "handle": "@codexploreindia",
    "youtubeUrl": "https://www.youtube.com/@codexploreindia",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Hands-on Hindi tutorials on n8n workflows, WhatsApp automation, and AI chatbots.",
    "primaryCategory": "Indian AI",
    "difficulty": "all-levels",
    "isIndiaCreator": true,
    "country": "India",
    "subscriberCountNumeric": 95000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "95K+",
    "avgViewsEstimate": "24K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "Hindi / Regional",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "CodeXplore India - Complete Production Guide",
        "url": "https://www.youtube.com/@codexploreindia",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "nate-black",
    "slug": "nate-black",
    "channelName": "Nate Black",
    "handle": "@nateblack",
    "youtubeUrl": "https://www.youtube.com/@nateblack",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Clean, step-by-step breakdowns of cloud architecture and local AI containerization.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 65000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "65K+",
    "avgViewsEstimate": "16K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Nate Black - Complete Production Guide",
        "url": "https://www.youtube.com/@nateblack",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "daniel-bourke-experiments",
    "slug": "daniel-bourke-experiments",
    "channelName": "Daniel Bourke Experiments",
    "handle": "@mrdbourke_ml",
    "youtubeUrl": "https://www.youtube.com/@mrdbourke_ml",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Nutrify AI experiments and computer vision fine-tuning in production.",
    "primaryCategory": "AI Research",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 78000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "78K+",
    "avgViewsEstimate": "20K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Daniel Bourke Experiments - Complete Production Guide",
        "url": "https://www.youtube.com/@mrdbourke_ml",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "dave-gray-dev",
    "slug": "dave-gray-dev",
    "channelName": "Dave Gray Dev",
    "handle": "@DaveGrayTeachesCode",
    "youtubeUrl": "https://www.youtube.com/@DaveGrayTeachesCode",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Full-stack Node.js, Next.js, and TypeScript engineering courses with AI.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 385000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "385K+",
    "avgViewsEstimate": "96K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Dave Gray Dev - Complete Production Guide",
        "url": "https://www.youtube.com/@DaveGrayTeachesCode",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "anthony-gg",
    "slug": "anthony-gg",
    "channelName": "Anthony GG",
    "handle": "@anthonygg_",
    "youtubeUrl": "https://www.youtube.com/@anthonygg_",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Low-latency Go programming, distributed systems, and local model inference servers.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 88000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "88K+",
    "avgViewsEstimate": "22K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Anthony GG - Complete Production Guide",
        "url": "https://www.youtube.com/@anthonygg_",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "jon-calhoun-go",
    "slug": "jon-calhoun-go",
    "channelName": "Jon Calhoun Go",
    "handle": "@joncalhoun",
    "youtubeUrl": "https://www.youtube.com/@joncalhoun",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Idiomatic Go programming and web development architectures for backend engineering.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 48000,
    "subscriberTier": "10k-100k",
    "subscribersEstimate": "48K+",
    "avgViewsEstimate": "12K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Jon Calhoun Go - Complete Production Guide",
        "url": "https://www.youtube.com/@joncalhoun",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "python-programmer-uk",
    "slug": "python-programmer-uk",
    "channelName": "Python Programmer UK",
    "handle": "@PythonProgrammer",
    "youtubeUrl": "https://www.youtube.com/@PythonProgrammer",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Book reviews, scientific Python tutorials, and deep learning study guides.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 485000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "485K+",
    "avgViewsEstimate": "121K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Python Programmer UK - Complete Production Guide",
        "url": "https://www.youtube.com/@PythonProgrammer",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "neuralnine-ml",
    "slug": "neuralnine-ml",
    "channelName": "NeuralNine ML",
    "handle": "@NeuralNineOfficial",
    "youtubeUrl": "https://www.youtube.com/@NeuralNineOfficial",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Python machine learning projects from scratch: neural nets, games, and automation.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 355000,
    "subscriberTier": "100k-500k",
    "subscribersEstimate": "355K+",
    "avgViewsEstimate": "89K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "NeuralNine ML - Complete Production Guide",
        "url": "https://www.youtube.com/@NeuralNineOfficial",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "derek-banas-tech",
    "slug": "derek-banas-tech",
    "channelName": "Derek Banas Tech",
    "handle": "@derekbanas",
    "youtubeUrl": "https://www.youtube.com/@derekbanas",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Learn Python, C++, and AI in one video. The pioneer of accelerated tech tutorials.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 1320000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.3M+",
    "avgViewsEstimate": "330K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Derek Banas Tech - Complete Production Guide",
        "url": "https://www.youtube.com/@derekbanas",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "programming-with-mosh",
    "slug": "programming-with-mosh",
    "channelName": "Programming with Mosh",
    "handle": "@programmingwithmosh",
    "youtubeUrl": "https://www.youtube.com/@programmingwithmosh",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Clear, concise programming tutorials for beginners and professional developers.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 3850000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "3.9M+",
    "avgViewsEstimate": "963K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Programming with Mosh - Complete Production Guide",
        "url": "https://www.youtube.com/@programmingwithmosh",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "caleb-curry-code",
    "slug": "caleb-curry-code",
    "channelName": "Caleb Curry Code",
    "handle": "@CalebTheVideoMaker2",
    "youtubeUrl": "https://www.youtube.com/@CalebTheVideoMaker2",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Database design, SQL, Python, and foundational machine learning tutorials.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 625000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "625K+",
    "avgViewsEstimate": "156K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Caleb Curry Code - Complete Production Guide",
        "url": "https://www.youtube.com/@CalebTheVideoMaker2",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "tech-with-tim-hub",
    "slug": "tech-with-tim-hub",
    "channelName": "Tech With Tim Hub",
    "handle": "@TechWithTimOfficial",
    "youtubeUrl": "https://www.youtube.com/@TechWithTimOfficial",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Python AI projects, game development, and modern agentic engineering.",
    "primaryCategory": "AI Coding",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 1520000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.5M+",
    "avgViewsEstimate": "380K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Tech With Tim Hub - Complete Production Guide",
        "url": "https://www.youtube.com/@TechWithTimOfficial",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "sentdex-deep-learning",
    "slug": "sentdex-deep-learning",
    "channelName": "Sentdex Deep Learning",
    "handle": "@sentdex_ai",
    "youtubeUrl": "https://www.youtube.com/@sentdex_ai",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Building self-driving cars in GTA, neural networks from scratch, and algorithmic trading.",
    "primaryCategory": "AI Research",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 1340000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.3M+",
    "avgViewsEstimate": "335K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Sentdex Deep Learning - Complete Production Guide",
        "url": "https://www.youtube.com/@sentdex_ai",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "statquest-with-josh-starmer",
    "slug": "statquest-with-josh-starmer",
    "channelName": "StatQuest with Josh Starmer",
    "handle": "@statquest",
    "youtubeUrl": "https://www.youtube.com/@statquest",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "BAM! Silly songs and remarkably clear visual breakdowns of neural networks and statistics.",
    "primaryCategory": "AI Research",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 1250000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "1.3M+",
    "avgViewsEstimate": "313K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "StatQuest with Josh Starmer - Complete Production Guide",
        "url": "https://www.youtube.com/@statquest",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "joma-tech-satire---tech",
    "slug": "joma-tech-satire---tech",
    "channelName": "Joma Tech Satire & Tech",
    "handle": "@jomatech",
    "youtubeUrl": "https://www.youtube.com/@jomatech",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Software engineering culture, Silicon Valley insights, and AI career guidance.",
    "primaryCategory": "AI Tutorials",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 2350000,
    "subscriberTier": "2m+",
    "subscribersEstimate": "2.4M+",
    "avgViewsEstimate": "588K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Joma Tech Satire & Tech - Complete Production Guide",
        "url": "https://www.youtube.com/@jomatech",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  },
  {
    "id": "kalle-hallden-automation",
    "slug": "kalle-hallden-automation",
    "channelName": "Kalle Hallden Automation",
    "handle": "@kallehallden",
    "youtubeUrl": "https://www.youtube.com/@kallehallden",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    "description": "Building automated workflows, productivity tools, and modern software products.",
    "primaryCategory": "No-Code & Workflows",
    "difficulty": "all-levels",
    "isIndiaCreator": false,
    "country": "Global",
    "subscriberCountNumeric": 725000,
    "subscriberTier": "500k-2m",
    "subscribersEstimate": "725K+",
    "avgViewsEstimate": "181K",
    "uploadCadence": "Weekly",
    "typicalVideoDepth": "20m - 45m Masterclasses",
    "educationalScore": 92,
    "language": "English",
    "curriculumPillars": [
      {
        "pillarTitle": "Practical Engineering",
        "description": "Real-world software architecture and AI implementation.",
        "skillsAcquired": [
          "Modern Tooling",
          "Clean Architecture"
        ]
      }
    ],
    "topTopics": [
      "AI Development",
      "Software Architecture",
      "Production Tooling"
    ],
    "topVideos": [
      {
        "title": "Kalle Hallden Automation - Complete Production Guide",
        "url": "https://www.youtube.com/@kallehallden",
        "viewsEstimate": "150K",
        "duration": "28m",
        "topicTag": "Tutorial"
      }
    ],
    "toolsTaught": [
      "cursor",
      "ollama"
    ],
    "inspiredWorkflowIds": [
      "pr-code-review-bot"
    ]
  }
];
