export interface CommunityComment {
  id: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  content: string;
  upvotes: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  authorReputation: number;
  type: 'Question' | 'Discussion' | 'Workflow' | 'Benchmark' | 'Review' | 'India AI';
  upvotes: number;
  commentsCount: number;
  publishedAt: string;
  tags: string[];
  comments: CommunityComment[];
  pinned?: boolean;
}

// Initial discussion prompts initiated by the editorial platform team (0 synthetic upvotes per PRD Rule 44)
export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'How are people running DeepSeek R1 locally on Mac Studio without quantization loss?',
    content: 'Looking for optimal Ollama vs vLLM vs MLX benchmarks for DeepSeek R1. Is the 32B Q4 variant sufficient for daily full-stack refactoring compared to the unquantized 70B? What token per second throughput are you seeing on M2/M3 Max chips?',
    author: 'Elena Rostova',
    authorRole: 'Core Maintainer',
    authorReputation: 1420,
    type: 'Question',
    upvotes: 0,
    commentsCount: 2,
    publishedAt: '2 hours ago',
    pinned: true,
    tags: ['DeepSeek', 'Local LLMs', 'Hardware', 'Ollama'],
    comments: [
      {
        id: 'c-101',
        author: 'Arjun Mehta',
        authorRole: 'Workflow Architect',
        publishedAt: '1 hour ago',
        content: 'On an M3 Max (64GB unified memory), Ollama with Q4_K_M runs at roughly 22 tokens/sec. The 32B variant is noticeably faster for interactive IDE completion while retaining ~94% reasoning parity on humaneval benchmarks.',
        upvotes: 0
      },
      {
        id: 'c-102',
        author: 'Sarah Chen',
        authorRole: 'Benchmark Pioneer',
        publishedAt: '30 mins ago',
        content: 'Try MLX-LM instead of standard llama.cpp. MLX utilizes the unified memory bandwidth significantly better on Apple Silicon, pushing throughput to ~28 tok/s for the 32B model.',
        upvotes: 0
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Cursor Composer vs Windsurf Cascade: Production benchmark across 50,000 LOC refactors',
    content: 'We benchmarked Cursor Composer against Windsurf Cascade across multi-file TypeScript refactors. Windsurf handles dependency graph awareness exceptionally well, while Cursor Composer offers superior terminal command execution integration. Full diff breakdown inside.',
    author: 'Devin K.',
    authorRole: 'Senior Staff Engineer',
    authorReputation: 890,
    type: 'Benchmark',
    upvotes: 0,
    commentsCount: 1,
    publishedAt: '5 hours ago',
    tags: ['Cursor', 'Windsurf', 'DevTools', 'Coding AI'],
    comments: [
      {
        id: 'c-201',
        author: 'Nikhil Verma',
        authorRole: 'Verified Architect',
        publishedAt: '3 hours ago',
        content: 'Crucial observation on Windsurf: Cascade handles cross-package imports in monorepos without hallucinating path aliases, which Cursor sometimes confuses when tsconfig paths are nested.',
        upvotes: 0
      }
    ]
  },
  {
    id: 'post-3',
    title: 'Automating multi-lingual podcast dubbing in Hindi, Tamil & Telugu using Sarvam AI + ElevenLabs',
    content: 'Production architecture using n8n webhooks: 1) Whisper API extracts transcript with timestamps, 2) Sarvam Saaras translates into natural Indic phrasing preserving colloquial intent, 3) ElevenLabs cloned voice synthesis, 4) FFmpeg auto-syncs audio ducking.',
    author: 'Priya Sundaram',
    authorRole: 'India AI Pioneer',
    authorReputation: 1250,
    type: 'India AI',
    upvotes: 0,
    commentsCount: 2,
    publishedAt: '1 day ago',
    pinned: true,
    tags: ['Sarvam AI', 'ElevenLabs', 'India AI', 'n8n', 'Voice AI'],
    comments: [
      {
        id: 'c-301',
        author: 'Rohan Sharma',
        authorRole: 'Verified Member',
        publishedAt: '18 hours ago',
        content: 'Sarvam AI phonetic transliteration for regional idioms is genuinely 10x better than standard GPT-4o for Hindi. Are you handling regional slang through custom fine-tuning or system prompt guidance?',
        upvotes: 0
      },
      {
        id: 'c-302',
        author: 'Priya Sundaram',
        authorRole: 'India AI Pioneer',
        publishedAt: '14 hours ago',
        content: 'Pure system prompt guidance with few-shot dictionary pairs. We feed a 50-word glossary of regional colloquialisms into Sarvam Saaras.',
        upvotes: 0
      }
    ]
  },
  {
    id: 'post-4',
    title: 'Production evaluation of Qwen 2.5 Coder 32B vs Claude 3.5 Sonnet for Python Backend APIs',
    content: 'Is an open-weights model finally competitive with Anthropic for complex FastAPI + SQLAlchemy async query generation? We ran 120 production database migrations through both models.',
    author: 'Marcus Vance',
    authorRole: 'Verified Architect',
    authorReputation: 640,
    type: 'Discussion',
    upvotes: 0,
    commentsCount: 1,
    publishedAt: '1 day ago',
    tags: ['Qwen', 'Claude 3.5 Sonnet', 'Open Source', 'FastAPI'],
    comments: [
      {
        id: 'c-401',
        author: 'Elena Rostova',
        authorRole: 'Core Maintainer',
        publishedAt: '22 hours ago',
        content: 'Sonnet still wins by ~12% on complex recursive CTE queries and schema edge-cases, but Qwen 2.5 Coder 32B scored 100% on standard CRUD and foreign key constraints at 1/20th the cost.',
        upvotes: 0
      }
    ]
  },
  {
    id: 'post-5',
    title: 'ComfyUI vs Automatic1111: Memory consumption comparison on 12GB VRAM cards (SDXL)',
    content: 'Node-based modular caching in ComfyUI allows rendering 2048x2048 SDXL images with ControlNet on a single RTX 3060 without running out of CUDA memory. Step-by-step memory optimization guide.',
    author: 'Alexandre Dubois',
    authorRole: 'Visual AI Lead',
    authorReputation: 780,
    type: 'Workflow',
    upvotes: 0,
    commentsCount: 1,
    publishedAt: '2 days ago',
    tags: ['ComfyUI', 'SDXL', 'Image Generation', 'Hardware'],
    comments: [
      {
        id: 'c-501',
        author: 'Vikram Joshi',
        authorRole: 'Verified Member',
        publishedAt: '1 day ago',
        content: 'Using `--lowvram` flag with FP8 checkpoint weights dropped our peak VRAM from 11.2GB down to 7.4GB with zero visible perceptual degradation.',
        upvotes: 0
      }
    ]
  },
  {
    id: 'post-6',
    title: 'vLLM vs Ollama in Docker: Latency under concurrency of 25 simultaneous queries',
    content: 'Ollama is king for single-user local CLI ergonomics, but PagedAttention in vLLM sustains 180 tokens/second total throughput across 25 concurrent users without request queue stalls.',
    author: 'Kavita Patel',
    authorRole: 'Infrastructure Engineer',
    authorReputation: 930,
    type: 'Benchmark',
    upvotes: 0,
    commentsCount: 0,
    publishedAt: '3 days ago',
    tags: ['vLLM', 'Ollama', 'Docker', 'Benchmarking'],
    comments: []
  }
];

export const COMMUNITY_LEADERBOARD = [
  { name: 'Elena Rostova', role: 'Core Maintainer', points: 1420, contributions: '48 Reviews • 12 Workflows' },
  { name: 'Priya Sundaram', role: 'India AI Pioneer', points: 1250, contributions: '34 Reviews • 18 Indic Guides' },
  { name: 'Kavita Patel', role: 'Infrastructure Lead', points: 930, contributions: '26 Benchmarks • 8 Repos' },
  { name: 'Devin K.', role: 'Staff Engineer', points: 890, contributions: '22 Benchmarks • 5 Workflows' },
  { name: 'Alexandre Dubois', role: 'Visual AI Lead', points: 780, contributions: '19 ComfyUI Nodes • 14 Reviews' },
  { name: 'Marcus Vance', role: 'Verified Architect', points: 640, contributions: '15 Reviews • 9 Workflows' }
];

export const REPUTATION_RULES = [
  { action: 'Post Verified Tool Review', points: '+25 pts', desc: 'Thorough evaluation with real use case' },
  { action: 'Publish Production Workflow', points: '+100 pts', desc: 'Step-by-step recipe with validated prompts' },
  { action: 'Submit Accepted Data Correction', points: '+50 pts', desc: 'Price, API status, or spec fix' },
  { action: 'Helpful Community Reply', points: '+5 pts', desc: 'When marked helpful by discussion author' },
  { action: 'Submit New Verified Tool', points: '+35 pts', desc: 'After editorial audit approval' }
];
