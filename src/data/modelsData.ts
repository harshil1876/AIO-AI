export interface LLMModel {
  id: string;
  name: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'DeepSeek' | 'Mistral';
  providerSlug: string;
  description: string;
  contextWindow: number;
  formattedContext: string;
  maxOutputTokens: number;
  formattedMaxOutput: string;
  inputCostPer1M: number;
  outputCostPer1M: number;
  inputCostPer1K: number;
  outputCostPer1K: number;
  endpointUrl: string;
  modelIdentifier: string;
  status: 'Active' | 'Preview';
  officialDocsUrl: string;
}

export const OFFICIAL_MODELS: LLMModel[] = [
  // --- OpenAI Models ---
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    providerSlug: 'openai',
    description: 'Flagship omni model with high-speed multimodal reasoning and benchmark-leading general intelligence.',
    contextWindow: 128000,
    formattedContext: '128,000',
    maxOutputTokens: 16384,
    formattedMaxOutput: '16,384',
    inputCostPer1M: 2.50,
    outputCostPer1M: 10.00,
    inputCostPer1K: 0.0025,
    outputCostPer1K: 0.0100,
    endpointUrl: 'https://api.openai.com/v1/chat/completions',
    modelIdentifier: 'gpt-4o',
    status: 'Active',
    officialDocsUrl: 'https://platform.openai.com/docs/models/gpt-4o'
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    providerSlug: 'openai',
    description: 'Cost-efficient small model designed for fast, lightweight reasoning and high-volume tasks.',
    contextWindow: 128000,
    formattedContext: '128,000',
    maxOutputTokens: 16384,
    formattedMaxOutput: '16,384',
    inputCostPer1M: 0.15,
    outputCostPer1M: 0.60,
    inputCostPer1K: 0.00015,
    outputCostPer1K: 0.0006,
    endpointUrl: 'https://api.openai.com/v1/chat/completions',
    modelIdentifier: 'gpt-4o-mini',
    status: 'Active',
    officialDocsUrl: 'https://platform.openai.com/docs/models/gpt-4o-mini'
  },
  {
    id: 'o3-mini',
    name: 'o3-mini',
    provider: 'OpenAI',
    providerSlug: 'openai',
    description: 'High-speed reasoning model specialized in STEM, competitive math, and multi-step programming.',
    contextWindow: 200000,
    formattedContext: '200,000',
    maxOutputTokens: 100000,
    formattedMaxOutput: '100,000',
    inputCostPer1M: 1.10,
    outputCostPer1M: 4.40,
    inputCostPer1K: 0.0011,
    outputCostPer1K: 0.0044,
    endpointUrl: 'https://api.openai.com/v1/chat/completions',
    modelIdentifier: 'o3-mini',
    status: 'Active',
    officialDocsUrl: 'https://platform.openai.com/docs/models/o3-mini'
  },
  {
    id: 'o1',
    name: 'o1',
    provider: 'OpenAI',
    providerSlug: 'openai',
    description: 'Deep reasoning model designed to think through complex problems in mathematics, science, and coding before responding.',
    contextWindow: 200000,
    formattedContext: '200,000',
    maxOutputTokens: 100000,
    formattedMaxOutput: '100,000',
    inputCostPer1M: 15.00,
    outputCostPer1M: 60.00,
    inputCostPer1K: 0.0150,
    outputCostPer1K: 0.0600,
    endpointUrl: 'https://api.openai.com/v1/chat/completions',
    modelIdentifier: 'o1',
    status: 'Active',
    officialDocsUrl: 'https://platform.openai.com/docs/models/o1'
  },

  // --- Anthropic Models ---
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    providerSlug: 'anthropic',
    description: 'Industry benchmark in code generation, nuanced reasoning, vision understanding, and autonomous tool use.',
    contextWindow: 200000,
    formattedContext: '200,000',
    maxOutputTokens: 8192,
    formattedMaxOutput: '8,192',
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
    inputCostPer1K: 0.0030,
    outputCostPer1K: 0.0150,
    endpointUrl: 'https://api.anthropic.com/v1/messages',
    modelIdentifier: 'claude-3-5-sonnet-20241022',
    status: 'Active',
    officialDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models'
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    providerSlug: 'anthropic',
    description: 'Ultra-fast, compact model with near-instant response times for low-latency production pipelines.',
    contextWindow: 200000,
    formattedContext: '200,000',
    maxOutputTokens: 8192,
    formattedMaxOutput: '8,192',
    inputCostPer1M: 0.80,
    outputCostPer1M: 4.00,
    inputCostPer1K: 0.0008,
    outputCostPer1K: 0.0040,
    endpointUrl: 'https://api.anthropic.com/v1/messages',
    modelIdentifier: 'claude-3-5-haiku-20241022',
    status: 'Active',
    officialDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    providerSlug: 'anthropic',
    description: 'Anthropic powerful model for highly complex analysis, academic research, and multifaceted technical writing.',
    contextWindow: 200000,
    formattedContext: '200,000',
    maxOutputTokens: 4096,
    formattedMaxOutput: '4,096',
    inputCostPer1M: 15.00,
    outputCostPer1M: 75.00,
    inputCostPer1K: 0.0150,
    outputCostPer1K: 0.0750,
    endpointUrl: 'https://api.anthropic.com/v1/messages',
    modelIdentifier: 'claude-3-opus-20240229',
    status: 'Active',
    officialDocsUrl: 'https://docs.anthropic.com/en/docs/about-claude/models'
  },

  // --- Google DeepMind Models ---
  {
    id: 'gemini-2-0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    providerSlug: 'google',
    description: 'Next-generation multimodal model built for blazing speed, 1M token context, and real-time native streaming.',
    contextWindow: 1048576,
    formattedContext: '1,048,576',
    maxOutputTokens: 8192,
    formattedMaxOutput: '8,192',
    inputCostPer1M: 0.10,
    outputCostPer1M: 0.40,
    inputCostPer1K: 0.0001,
    outputCostPer1K: 0.0004,
    endpointUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    modelIdentifier: 'gemini-2.0-flash',
    status: 'Active',
    officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini'
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    providerSlug: 'google',
    description: 'Breakthrough 2-million-token context window capable of ingesting whole codebases, hours of video, or entire audio archives.',
    contextWindow: 2097152,
    formattedContext: '2,097,152',
    maxOutputTokens: 8192,
    formattedMaxOutput: '8,192',
    inputCostPer1M: 1.25,
    outputCostPer1M: 5.00,
    inputCostPer1K: 0.00125,
    outputCostPer1K: 0.0050,
    endpointUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
    modelIdentifier: 'gemini-1.5-pro',
    status: 'Active',
    officialDocsUrl: 'https://ai.google.dev/gemini-api/docs/models/gemini'
  },

  // --- DeepSeek Official API ---
  {
    id: 'deepseek-v3',
    name: 'DeepSeek-V3',
    provider: 'DeepSeek',
    providerSlug: 'deepseek',
    description: '671B parameter Mixture-of-Experts architecture delivering frontier general performance at an unprecedented low price.',
    contextWindow: 64000,
    formattedContext: '64,000',
    maxOutputTokens: 8192,
    formattedMaxOutput: '8,192',
    inputCostPer1M: 0.14,
    outputCostPer1M: 0.28,
    inputCostPer1K: 0.00014,
    outputCostPer1K: 0.00028,
    endpointUrl: 'https://api.deepseek.com/chat/completions',
    modelIdentifier: 'deepseek-chat',
    status: 'Active',
    officialDocsUrl: 'https://api-docs.deepseek.com/'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1',
    provider: 'DeepSeek',
    providerSlug: 'deepseek',
    description: 'Reinforcement-learning-driven reasoning model providing full visible chain-of-thought tokens on complex math and coding.',
    contextWindow: 64000,
    formattedContext: '64,000',
    maxOutputTokens: 8192,
    formattedMaxOutput: '8,192',
    inputCostPer1M: 0.55,
    outputCostPer1M: 2.19,
    inputCostPer1K: 0.00055,
    outputCostPer1K: 0.00219,
    endpointUrl: 'https://api.deepseek.com/chat/completions',
    modelIdentifier: 'deepseek-reasoner',
    status: 'Active',
    officialDocsUrl: 'https://api-docs.deepseek.com/'
  },

  // --- Mistral AI Official API ---
  {
    id: 'mistral-large',
    name: 'Mistral Large 2',
    provider: 'Mistral',
    providerSlug: 'mistral',
    description: 'Frontier multilingual model with advanced reasoning, mathematics, and multilingual support across 10+ languages.',
    contextWindow: 128000,
    formattedContext: '128,000',
    maxOutputTokens: 8192,
    formattedMaxOutput: '8,192',
    inputCostPer1M: 2.00,
    outputCostPer1M: 6.00,
    inputCostPer1K: 0.0020,
    outputCostPer1K: 0.0060,
    endpointUrl: 'https://api.mistral.ai/v1/chat/completions',
    modelIdentifier: 'mistral-large-latest',
    status: 'Active',
    officialDocsUrl: 'https://docs.mistral.ai/getting-started/models/models_overview/'
  },
  {
    id: 'codestral',
    name: 'Codestral',
    provider: 'Mistral',
    providerSlug: 'mistral',
    description: 'Generative model explicitly designed for code generation, fill-in-the-middle completion, and test automation.',
    contextWindow: 256000,
    formattedContext: '256,000',
    maxOutputTokens: 8192,
    formattedMaxOutput: '8,192',
    inputCostPer1M: 0.30,
    outputCostPer1M: 0.90,
    inputCostPer1K: 0.0003,
    outputCostPer1K: 0.0009,
    endpointUrl: 'https://api.mistral.ai/v1/chat/completions',
    modelIdentifier: 'codestral-latest',
    status: 'Active',
    officialDocsUrl: 'https://docs.mistral.ai/getting-started/models/models_overview/'
  }
];

export function getModelById(id: string): LLMModel | undefined {
  return OFFICIAL_MODELS.find(m => m.id === id);
}

export function getModelsByProvider(provider: string): LLMModel[] {
  if (provider === 'all') return OFFICIAL_MODELS;
  return OFFICIAL_MODELS.filter(m => m.provider.toLowerCase() === provider.toLowerCase());
}
