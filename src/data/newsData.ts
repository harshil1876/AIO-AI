export interface NewsStory {
  id: string;
  title: string;
  summary: string;
  whyItMatters: string;
  source: string;
  sourceUrl: string;
  publishedDate: string;
  category: string;
  relatedEntities: string[];
}

export const NEWS_STORIES: NewsStory[] = [
  {
    id: 'anthropic-sonnet-update',
    title: 'Anthropic Expands Context & Vision Processing on Claude 3.5 Sonnet',
    summary: 'Anthropic announced major architectural refinements to Claude 3.5 Sonnet, enhancing complex code refactoring, system architecture generation, and high-resolution chart analysis.',
    whyItMatters: 'Developers can now process deeper repositories without context degradation, solidifying Anthropic’s lead in coding evaluations.',
    source: 'Anthropic Engineering',
    sourceUrl: 'https://www.anthropic.com/news',
    publishedDate: 'Today',
    category: 'Model Releases',
    relatedEntities: ['Claude', 'Anthropic']
  },
  {
    id: 'meta-llama-ecosystem',
    title: 'Meta Releases New Quantized Weights for Llama 3 on Edge Devices',
    summary: 'Meta’s AI research division released optimized 1-bit and 4-bit quantization benchmarks for Llama 3 models, enabling 70B parameter models to run on high-end laptops without cloud GPU instances.',
    whyItMatters: 'Drastically lowers operational hosting costs for startups while guaranteeing complete local privacy.',
    source: 'Meta AI Research',
    sourceUrl: 'https://ai.meta.com/blog',
    publishedDate: '1 day ago',
    category: 'Open Weights',
    relatedEntities: ['Llama 3', 'Meta', 'Ollama']
  },
  {
    id: 'sarvam-indic-benchmarks',
    title: 'Sarvam AI Unveils Indic Voice Model Benchmark for 10 Regional Languages',
    summary: 'Sarvam AI published open benchmarks demonstrating higher Hindi, Tamil, and Bengali audio comprehension compared to international US-centric models, specifically tailored for Indian noise environments.',
    whyItMatters: 'Catalyzes vernacular voice-commerce and civic service delivery across Tier-2 and Tier-3 Indian cities.',
    source: 'Sarvam AI Blog',
    sourceUrl: 'https://sarvam.ai',
    publishedDate: '2 days ago',
    category: 'Regional Innovation',
    relatedEntities: ['Sarvam AI', 'India AI']
  }
];
