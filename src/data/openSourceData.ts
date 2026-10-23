export interface OpenSourceRepo {
  name: string;
  repo: string;
  url: string;
  description: string;
  stars: string;
  forks: string;
  language: string;
  license: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const OPEN_SOURCE_REPOS: OpenSourceRepo[] = [
  {
    name: 'Ollama',
    repo: 'ollama/ollama',
    url: 'https://github.com/ollama/ollama',
    description: 'Get up and running with Llama 3.3, Mistral, Gemma 2, and other large language models locally on macOS, Linux, and Windows.',
    stars: '115k',
    forks: '9.8k',
    language: 'Go',
    license: 'MIT',
    category: 'Local LLM Inference',
    difficulty: 'Beginner',
  },
  {
    name: 'vLLM',
    repo: 'vllm-project/vllm',
    url: 'https://github.com/vllm-project/vllm',
    description: 'A high-throughput and memory-efficient inference and serving engine for LLMs featuring PagedAttention.',
    stars: '34k',
    forks: '4.9k',
    language: 'Python / C++',
    license: 'Apache-2.0',
    category: 'Model Serving',
    difficulty: 'Intermediate',
  },
  {
    name: 'n8n',
    repo: 'n8n-io/n8n',
    url: 'https://github.com/n8n-io/n8n',
    description: 'Fair-code workflow automation platform with native AI agent nodes and LangChain integrations.',
    stars: '52k',
    forks: '6.4k',
    language: 'TypeScript',
    license: 'Fair-code',
    category: 'AI Workflow Automation',
    difficulty: 'Intermediate',
  },
  {
    name: 'LangChain',
    repo: 'langchain-ai/langchain',
    url: 'https://github.com/langchain-ai/langchain',
    description: 'Building context-aware reasoning applications with composable components for LLMs and vector datastores.',
    stars: '96k',
    forks: '15.2k',
    language: 'Python',
    license: 'MIT',
    category: 'Agent Framework',
    difficulty: 'Intermediate',
  },
  {
    name: 'Stable Diffusion WebUI',
    repo: 'AUTOMATIC1111/stable-diffusion-webui',
    url: 'https://github.com/AUTOMATIC1111/stable-diffusion-webui',
    description: 'Browser interface based on Gradio library for Stable Diffusion text-to-image generation.',
    stars: '142k',
    forks: '26k',
    language: 'Python',
    license: 'AGPL-3.0',
    category: 'Local Image Generation',
    difficulty: 'Intermediate',
  },
  {
    name: 'AutoGPT',
    repo: 'Significant-Gravitas/AutoGPT',
    url: 'https://github.com/Significant-Gravitas/AutoGPT',
    description: 'AutoGPT is the vision of accessible AI for everyone, enabling continuous multi-step autonomous goal execution.',
    stars: '168k',
    forks: '44k',
    language: 'Python',
    license: 'MIT',
    category: 'Autonomous Agents',
    difficulty: 'Advanced',
  },
];
