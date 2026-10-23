export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: string;
  type: 'Question' | 'Discussion' | 'Workflow' | 'Benchmark';
  upvotes: number;
  commentsCount: number;
  publishedAt: string;
  tags: string[];
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'How are people running DeepSeek R1 locally on Mac Studio without quantization loss?',
    content: 'Looking for optimal Ollama vs vLLM vs MLX benchmarks for DeepSeek R1. Is the 32B Q4 variant sufficient for daily coding tasks compared to full 70B?',
    author: 'alex_dev',
    type: 'Question',
    upvotes: 48,
    commentsCount: 16,
    publishedAt: '2 hours ago',
    tags: ['DeepSeek', 'Local LLMs', 'Hardware']
  },
  {
    id: 'post-2',
    title: 'Cursor Composer vs Windsurf Cascade: 30-day production benchmark across 5 projects',
    content: 'We migrated our 4-person team from Copilot to Cursor and tested Windsurf side-by-side. Here is the exact data on multi-file refactor success rate and token consumption.',
    author: 'sarah_tech',
    type: 'Benchmark',
    upvotes: 89,
    commentsCount: 32,
    publishedAt: '1 day ago',
    tags: ['Cursor', 'Windsurf', 'DevTools']
  },
  {
    id: 'post-3',
    title: 'Automating multi-lingual podcast dubbing in Hindi and Tamil using Sarvam AI + ElevenLabs',
    content: 'Sharing my complete Make webhook blueprint. Cuts dubbing production time from 4 days to 15 minutes with high cultural naturalness.',
    author: 'rohit_ai',
    type: 'Workflow',
    upvotes: 64,
    commentsCount: 11,
    publishedAt: '2 days ago',
    tags: ['Sarvam AI', 'ElevenLabs', 'India AI']
  }
];
