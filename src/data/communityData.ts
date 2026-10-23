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

// Initial discussion prompts initiated by the editorial platform team (0 synthetic upvotes per PRD Rule 44)
export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    title: 'How are people running DeepSeek R1 locally on Mac Studio without quantization loss?',
    content: 'Looking for optimal Ollama vs vLLM vs MLX benchmarks for DeepSeek R1. Is the 32B Q4 variant sufficient for daily coding tasks compared to full 70B?',
    author: 'Platform Moderator',
    type: 'Question',
    upvotes: 0,
    commentsCount: 0,
    publishedAt: 'Recent',
    tags: ['DeepSeek', 'Local LLMs', 'Hardware']
  },
  {
    id: 'post-2',
    title: 'Cursor Composer vs Windsurf Cascade: Production benchmark across real-world refactors',
    content: 'Share your team observations on multi-file refactor success rate, token consumption, and context management between Cursor Composer and Windsurf Cascade.',
    author: 'Platform Moderator',
    type: 'Benchmark',
    upvotes: 0,
    commentsCount: 0,
    publishedAt: 'Recent',
    tags: ['Cursor', 'Windsurf', 'DevTools']
  },
  {
    id: 'post-3',
    title: 'Automating multi-lingual podcast dubbing in Hindi and Tamil using Sarvam AI + ElevenLabs',
    content: 'Discussion on structuring Make and n8n webhooks for Indic language dubbing with natural phonetic accents and lip synchronization.',
    author: 'Platform Moderator',
    type: 'Workflow',
    upvotes: 0,
    commentsCount: 0,
    publishedAt: 'Recent',
    tags: ['Sarvam AI', 'ElevenLabs', 'India AI']
  }
];
