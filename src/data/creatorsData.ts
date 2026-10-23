export interface CreatorVideo {
  title: string;
  url: string;
  viewsEstimate?: string;
  duration?: string;
}

export interface CreatorData {
  id: string;
  slug: string;
  channelName: string;
  handle: string;
  youtubeUrl: string;
  avatarUrl: string;
  description: string;
  primaryCategory: 'AI Coding' | 'AI Tutorials' | 'AI News' | 'AI Agents' | 'AI Research' | 'Indian AI';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  isIndiaCreator: boolean;
  subscribersEstimate: string;
  avgViewsEstimate: string;
  uploadCadence: string;
  topTopics: string[];
  topVideos: CreatorVideo[];
  toolsTaught: string[]; // Slugs of tools in seedData
  educationalScore: number; // 0-100
  language: string;
}

export const CREATORS_DATA: CreatorData[] = [
  {
    id: 'creator-1',
    slug: 'andrej-karpathy',
    channelName: 'Andrej Karpathy',
    handle: '@karpathy',
    youtubeUrl: 'https://www.youtube.com/@karpathy',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Former Director of AI at Tesla and OpenAI founding scientist. Creates deep, masterclass lectures on building GPT models, neural networks, and micrograd from scratch.',
    primaryCategory: 'AI Research',
    difficulty: 'intermediate',
    isIndiaCreator: false,
    subscribersEstimate: '950K+',
    avgViewsEstimate: '800K',
    uploadCadence: 'Monthly Deep Dives',
    topTopics: ['LLM Architecture from scratch', 'Neural Networks', 'Micrograd', 'Tokenization', 'Backpropagation'],
    topVideos: [
      { title: 'Let build GPT: from scratch, in code, spelled out', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', viewsEstimate: '4.8M', duration: '1h 56m' },
      { title: 'The spelled-out intro to neural networks and backprop: micrograd', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', viewsEstimate: '2.1M', duration: '2h 25m' },
      { title: 'Intro to Large Language Models', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', viewsEstimate: '2.3M', duration: '1h 00m' }
    ],
    toolsTaught: ['llama-3', 'hugging-face', 'ollama'],
    educationalScore: 99,
    language: 'English'
  },
  {
    id: 'creator-2',
    slug: '3blue1brown',
    channelName: '3Blue1Brown',
    handle: '@3blue1brown',
    youtubeUrl: 'https://www.youtube.com/@3blue1brown',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Grant Sanderson creates the world most beautiful visual mathematical explanations, breaking down neural networks, gradient descent, transformers, and linear algebra.',
    primaryCategory: 'AI Research',
    difficulty: 'all-levels',
    isIndiaCreator: false,
    subscribersEstimate: '6.4M+',
    avgViewsEstimate: '1.5M',
    uploadCadence: 'Bi-weekly',
    topTopics: ['Transformer Attention Mechanisms', 'Neural Networks Visualized', 'Calculus for Deep Learning', 'Linear Algebra'],
    topVideos: [
      { title: 'Visualizing Attention, a key component of transformers', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', viewsEstimate: '3.4M', duration: '26m' },
      { title: 'But what is a neural network? | Chapter 1, Deep learning', url: 'https://www.youtube.com/watch?v=aircAruvnKk', viewsEstimate: '15M', duration: '19m' }
    ],
    toolsTaught: ['hugging-face'],
    educationalScore: 99,
    language: 'English'
  },
  {
    id: 'creator-3',
    slug: 'matthew-berman',
    channelName: 'Matthew Berman',
    handle: '@matthew_berman',
    youtubeUrl: 'https://www.youtube.com/@matthew_berman',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    description: 'Daily hands-on tutorials for running open-source LLMs locally, setting up agent frameworks, comparing benchmarks, and testing new open-weights model drops.',
    primaryCategory: 'AI Tutorials',
    difficulty: 'beginner',
    isIndiaCreator: false,
    subscribersEstimate: '600K+',
    avgViewsEstimate: '150K',
    uploadCadence: 'Daily',
    topTopics: ['Local LLMs with Ollama', 'DeepSeek R1 installation', 'CrewAI and AutoGen', 'Open-source model benchmarks'],
    topVideos: [
      { title: 'How to run DeepSeek R1 locally for FREE', url: 'https://www.youtube.com/results?search_query=matthew+berman+deepseek+r1', viewsEstimate: '500K', duration: '22m' },
      { title: 'Ollama Full Tutorial - Run any open model', url: 'https://www.youtube.com/results?search_query=matthew+berman+ollama', viewsEstimate: '450K', duration: '25m' }
    ],
    toolsTaught: ['ollama', 'deepseek', 'crewai', 'llama-3', 'vllm'],
    educationalScore: 94,
    language: 'English'
  },
  {
    slug: 'prompt-engineering',
    id: 'creator-4',
    channelName: 'Prompt Engineering',
    handle: '@promptengineering',
    youtubeUrl: 'https://www.youtube.com/@promptengineering',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    description: 'Technical walk-throughs covering open-source LLM quantization, fine-tuning with Unsloth, local RAG architectures, and model evaluations.',
    primaryCategory: 'AI Tutorials',
    difficulty: 'intermediate',
    isIndiaCreator: false,
    subscribersEstimate: '280K+',
    avgViewsEstimate: '60K',
    uploadCadence: '2-3 videos/week',
    topTopics: ['Fine-tuning LLMs with Unsloth', 'Local RAG with LangChain', 'vLLM high throughput', 'Quantization (GGUF, EXL2)'],
    topVideos: [
      { title: 'Run DeepSeek on Mac and Windows without GPU limits', url: 'https://www.youtube.com/results?search_query=prompt+engineering+deepseek', viewsEstimate: '220K', duration: '18m' }
    ],
    toolsTaught: ['ollama', 'vllm', 'hugging-face', 'deepseek'],
    educationalScore: 93,
    language: 'English'
  },
  {
    slug: 'wes-roth',
    id: 'creator-5',
    channelName: 'Wes Roth',
    handle: '@wesroth',
    youtubeUrl: 'https://www.youtube.com/@wesroth',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    description: 'Thoughtful daily breakdowns of frontier AI papers, AGI research trajectories, chip architecture, and the geopolitical implications of artificial intelligence.',
    primaryCategory: 'AI News',
    difficulty: 'all-levels',
    isIndiaCreator: false,
    subscribersEstimate: '260K+',
    avgViewsEstimate: '90K',
    uploadCadence: 'Daily',
    topTopics: ['Frontier Model Benchmarks', 'Reasoning Models Explained', 'AI Economics & Chips', 'OpenAI & Anthropic roadmap'],
    topVideos: [
      { title: 'DeepSeek R1 changes everything: Paper teardown', url: 'https://www.youtube.com/results?search_query=wes+roth+deepseek', viewsEstimate: '380K', duration: '24m' }
    ],
    toolsTaught: ['chatgpt', 'claude', 'deepseek'],
    educationalScore: 92,
    language: 'English'
  },
  {
    slug: 'yannic-kilcher',
    id: 'creator-6',
    channelName: 'Yannic Kilcher',
    handle: '@ykilcher',
    youtubeUrl: 'https://www.youtube.com/@ykilcher',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    description: 'Rigorous academic reviews of seminal machine learning papers. Founder of Open-Assistant and prominent voice on AI architectures and open research.',
    primaryCategory: 'AI Research',
    difficulty: 'advanced',
    isIndiaCreator: false,
    subscribersEstimate: '250K+',
    avgViewsEstimate: '75K',
    uploadCadence: 'Weekly',
    topTopics: ['Academic Paper Teardowns', 'Attention & Transformers', 'Reinforcement Learning from Human Feedback', 'Open weights auditing'],
    topVideos: [
      { title: 'Attention Is All You Need (Paper Explained)', url: 'https://www.youtube.com/watch?v=iDulhoQ2pro', viewsEstimate: '1.2M', duration: '45m' }
    ],
    toolsTaught: ['hugging-face', 'llama-3'],
    educationalScore: 96,
    language: 'English'
  },
  {
    slug: 'ai-jason',
    id: 'creator-7',
    channelName: 'AI Jason',
    handle: '@aijason',
    youtubeUrl: 'https://www.youtube.com/@aijason',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    description: 'Visual, high-energy tutorials on building autonomous AI agents, multi-agent frameworks, LangChain, Flowise, and practical workflow automations.',
    primaryCategory: 'AI Agents',
    difficulty: 'beginner',
    isIndiaCreator: false,
    subscribersEstimate: '380K+',
    avgViewsEstimate: '180K',
    uploadCadence: 'Weekly',
    topTopics: ['Building AI Agents visually', 'Flowise & Langflow tutorials', 'CrewAI team projects', 'No-code AI automation'],
    topVideos: [
      { title: 'How to build an autonomous AI agent in 20 minutes', url: 'https://www.youtube.com/results?search_query=ai+jason+agents', viewsEstimate: '650K', duration: '21m' }
    ],
    toolsTaught: ['flowise', 'crewai', 'n8n', 'make'],
    educationalScore: 93,
    language: 'English'
  },
  {
    slug: 'sentdex',
    id: 'creator-8',
    channelName: 'sentdex',
    handle: '@sentdex',
    youtubeUrl: 'https://www.youtube.com/@sentdex',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    description: 'Harrison Kinsley is one of the pioneer Python educators on YouTube, authoring comprehensive tutorials on neural networks from scratch and reinforcement learning.',
    primaryCategory: 'AI Coding',
    difficulty: 'intermediate',
    isIndiaCreator: false,
    subscribersEstimate: '1.3M+',
    avgViewsEstimate: '120K',
    uploadCadence: 'Monthly',
    topTopics: ['Neural Networks from Scratch in Python', 'Reinforcement Learning', 'Autonomous Driving Simulation', 'PyTorch fundamentals'],
    topVideos: [
      { title: 'Neural Networks from Scratch - P.1 Intro and Neuron Code', url: 'https://www.youtube.com/watch?v=Wo5dMEP_BbI', viewsEstimate: '2.8M', duration: '17m' }
    ],
    toolsTaught: ['ollama', 'hugging-face'],
    educationalScore: 95,
    language: 'English'
  },
  {
    slug: 'two-minute-papers',
    id: 'creator-9',
    channelName: 'Two Minute Papers',
    handle: '@twominutepapers',
    youtubeUrl: 'https://www.youtube.com/@twominutepapers',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    description: 'Dr. Károly Zsolnai-Fehér covers cutting-edge breakthroughs in generative AI, photorealistic rendering, robotics, and physics simulation with infectious enthusiasm.',
    primaryCategory: 'AI News',
    difficulty: 'all-levels',
    isIndiaCreator: false,
    subscribersEstimate: '1.7M+',
    avgViewsEstimate: '250K',
    uploadCadence: '2-3 videos/week',
    topTopics: ['Generative Video Breakthroughs', '3D Gaussian Splatting', 'Robotics and Physics Simulation', 'Photorealism in CGI'],
    topVideos: [
      { title: 'What a time to be alive! OpenAI Sora explained', url: 'https://www.youtube.com/results?search_query=two+minute+papers+sora', viewsEstimate: '1.8M', duration: '6m' }
    ],
    toolsTaught: ['runway', 'flux', 'midjourney'],
    educationalScore: 91,
    language: 'English'
  },
  {
    slug: 'krish-naik',
    id: 'creator-10',
    channelName: 'Krish Naik',
    handle: '@krishnaik06',
    youtubeUrl: 'https://www.youtube.com/@krishnaik06',
    avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    description: 'Leading Indian AI educator teaching end-to-end data science, Generative AI engineering, LangChain, LlamaIndex, Docker, and MLOps deployment.',
    primaryCategory: 'Indian AI',
    difficulty: 'beginner',
    isIndiaCreator: true,
    subscribersEstimate: '1.1M+',
    avgViewsEstimate: '100K',
    uploadCadence: 'Daily',
    topTopics: ['Generative AI Full Course', 'LangChain and LlamaIndex', 'Building RAG Applications', 'MLOps and Docker'],
    topVideos: [
      { title: 'Complete Generative AI Course With LangChain & HuggingFace', url: 'https://www.youtube.com/results?search_query=krish+naik+generative+ai+course', viewsEstimate: '1.5M', duration: '6h 30m' }
    ],
    toolsTaught: ['hugging-face', 'ollama', 'flowise', 'sarvam-ai'],
    educationalScore: 95,
    language: 'English / Hindi'
  },
  {
    slug: 'code-with-harry',
    id: 'creator-11',
    channelName: 'CodeWithHarry',
    handle: '@codewithharry',
    youtubeUrl: 'https://www.youtube.com/@codewithharry',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    description: 'Haris Khan is India most beloved programming educator, teaching web development, Python, AI APIs, and developer tools in accessible, clear Hindi.',
    primaryCategory: 'Indian AI',
    difficulty: 'beginner',
    isIndiaCreator: true,
    subscribersEstimate: '5.2M+',
    avgViewsEstimate: '400K',
    uploadCadence: 'Weekly',
    topTopics: ['Python for Beginners', 'AI Web Development', 'ChatGPT & OpenAI APIs in Python', 'Full Stack Development'],
    topVideos: [
      { title: 'Python Full Course in Hindi with AI projects', url: 'https://www.youtube.com/results?search_query=code+with+harry+python+ai', viewsEstimate: '8.4M', duration: '12h' }
    ],
    toolsTaught: ['chatgpt', 'github-copilot', 'cursor'],
    educationalScore: 96,
    language: 'Hindi'
  },
  {
    slug: 'krutrim-tech',
    id: 'creator-12',
    channelName: 'Krutrim AI Hub',
    handle: '@olakrutrim',
    youtubeUrl: 'https://www.youtube.com/@olakrutrim',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    description: 'Official developer channel for Krutrim, covering sovereign Indian AI cloud instances, Indic model fine-tuning, and regional enterprise use cases.',
    primaryCategory: 'Indian AI',
    difficulty: 'intermediate',
    isIndiaCreator: true,
    subscribersEstimate: '120K+',
    avgViewsEstimate: '45K',
    uploadCadence: 'Bi-weekly',
    topTopics: ['Sovereign AI Infrastructure', 'Indic LLM Fine-Tuning', 'Krutrim Cloud Deployment', 'Multilingual Speech'],
    topVideos: [
      { title: 'Deploying Indic AI on Krutrim Cloud', url: 'https://www.youtube.com/results?search_query=krutrim+cloud+developer', viewsEstimate: '90K', duration: '28m' }
    ],
    toolsTaught: ['krutrim', 'sarvam-ai', 'bhashini'],
    educationalScore: 90,
    language: 'English / Hindi'
  },
  {
    slug: 'matt-wolfe',
    id: 'creator-13',
    channelName: 'Matt Wolfe',
    handle: '@maborle',
    youtubeUrl: 'https://www.youtube.com/@maborle',
    avatarUrl: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&auto=format&fit=crop&q=80',
    description: 'Founder of FutureTools. Provides weekly comprehensive recaps of the latest AI news, creative tools, image generators, and automation discoveries.',
    primaryCategory: 'AI News',
    difficulty: 'all-levels',
    isIndiaCreator: false,
    subscribersEstimate: '580K+',
    avgViewsEstimate: '140K',
    uploadCadence: '2 videos/week',
    topTopics: ['Weekly AI News Roundups', 'Best New AI Tools', 'Midjourney and Video Models', 'No-code AI stacks'],
    topVideos: [
      { title: 'Top AI Tools this week that will blow your mind', url: 'https://www.youtube.com/results?search_query=matt+wolfe+ai+tools', viewsEstimate: '450K', duration: '18m' }
    ],
    toolsTaught: ['midjourney', 'runway', 'elevenlabs', 'suno'],
    educationalScore: 91,
    language: 'English'
  },
  {
    slug: 'all-about-ai',
    id: 'creator-14',
    channelName: 'All About AI',
    handle: '@allaboutai',
    youtubeUrl: 'https://www.youtube.com/@allaboutai',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    description: 'Kris specializes in advanced prompt engineering, Claude Artifacts workflows, autonomous agents, and system prompt architectures for power users.',
    primaryCategory: 'AI Tutorials',
    difficulty: 'intermediate',
    isIndiaCreator: false,
    subscribersEstimate: '220K+',
    avgViewsEstimate: '70K',
    uploadCadence: 'Weekly',
    topTopics: ['Advanced Prompt Engineering', 'Claude 3.5 Artifacts Workflows', 'System Prompt Optimization', 'n8n AI Automations'],
    topVideos: [
      { title: 'The Ultimate Claude 3.5 Sonnet Masterclass', url: 'https://www.youtube.com/results?search_query=all+about+ai+claude+masterclass', viewsEstimate: '320K', duration: '35m' }
    ],
    toolsTaught: ['claude', 'n8n', 'chatgpt'],
    educationalScore: 92,
    language: 'English'
  },
  {
    slug: 'david-ondrej',
    id: 'creator-15',
    channelName: 'David Ondrej',
    handle: '@davidondrej',
    youtubeUrl: 'https://www.youtube.com/@davidondrej',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    description: 'Fast-paced, highly practical developer tutorials on AI coding IDEs (Cursor, Windsurf), terminal agents, and building real full-stack web applications with AI.',
    primaryCategory: 'AI Coding',
    difficulty: 'all-levels',
    isIndiaCreator: false,
    subscribersEstimate: '240K+',
    avgViewsEstimate: '95K',
    uploadCadence: '2 videos/week',
    topTopics: ['Cursor IDE Masterclass', 'Building Full Stack Apps with Cursor Composer', 'Windsurf vs Cursor', 'Aider terminal coding'],
    topVideos: [
      { title: 'Cursor Composer Complete Guide - Build apps without writing code', url: 'https://www.youtube.com/results?search_query=david+ondrej+cursor+composer', viewsEstimate: '420K', duration: '24m' }
    ],
    toolsTaught: ['cursor', 'windsurf', 'v0', 'bolt-new'],
    educationalScore: 94,
    language: 'English'
  }
];

export function getCreatorBySlug(slug: string): CreatorData | undefined {
  return CREATORS_DATA.find(c => c.slug === slug);
}
