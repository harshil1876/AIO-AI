export interface WorkflowItem {
  id: string;
  title: string;
  goal: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  toolsUsed: { name: string; slug: string }[];
  steps: { title: string; desc: string }[];
  output: string;
}

export const WORKFLOWS_DATA: WorkflowItem[] = [
  {
    id: 'shorts-creator-pipeline',
    title: 'Faceless YouTube Shorts Automation',
    goal: 'Generate 5 high-engagement vertical short videos per day from trending topics without filming.',
    difficulty: 'Intermediate',
    time: '20 mins setup',
    toolsUsed: [
      { name: 'ChatGPT', slug: 'chatgpt' },
      { name: 'ElevenLabs', slug: 'elevenlabs' },
      { name: 'Runway', slug: 'runway' },
      { name: 'Make', slug: 'make' }
    ],
    steps: [
      { title: 'Step 1: Script & Hook Generation', desc: 'Use ChatGPT to write 60-second scripts structured with a 3-second visual hook, curiosity gap, and call-to-action.' },
      { title: 'Step 2: Realistic Voiceover Dubbing', desc: 'Pass the script to ElevenLabs via API or web editor to produce natural, human-inflected speech.' },
      { title: 'Step 3: AI B-Roll & Visual Generation', desc: 'Generate relevant cinematic visual cutaways using Runway Gen-3 text-to-video.' },
      { title: 'Step 4: Scheduling & Automated Publishing', desc: 'Wire Make to stitch the subtitles and queue the video into YouTube Shorts.' }
    ],
    output: 'Published high-definition vertical video with auto-synced subtitles and voice.'
  },
  {
    id: 'pr-code-review-bot',
    title: 'Automated GitHub PR Review & Security Scan',
    goal: 'Automatically analyze incoming Pull Requests for subtle bugs, performance bottlenecks, and security flaws.',
    difficulty: 'Intermediate',
    time: '15 mins',
    toolsUsed: [
      { name: 'Claude', slug: 'claude' },
      { name: 'GitHub Copilot', slug: 'github-copilot' },
      { name: 'n8n', slug: 'n8n' }
    ],
    steps: [
      { title: 'Step 1: Webhook Trigger', desc: 'Trigger an n8n webhook when a new Pull Request is opened or updated on GitHub.' },
      { title: 'Step 2: Diff Extraction', desc: 'Fetch the unified code diff and git blame context from the GitHub API.' },
      { title: 'Step 3: Reasoning & Static Analysis', desc: 'Send the diff to Claude 3.5 Sonnet with a strict system prompt targeting security, types, and edge cases.' },
      { title: 'Step 4: Comment Posting', desc: 'Format markdown recommendations and post them directly as review comments.' }
    ],
    output: 'Detailed automated PR comment with actionable code snippet recommendations.'
  },
  {
    id: 'indic-customer-support-agent',
    title: 'Multilingual Customer Voice & Chat Bot',
    goal: 'Provide real-time 24/7 customer support across Hindi, Tamil, Telugu, and English.',
    difficulty: 'Advanced',
    time: '45 mins',
    toolsUsed: [
      { name: 'Sarvam AI', slug: 'sarvam-ai' },
      { name: 'Krutrim', slug: 'krutrim' },
      { name: 'Make', slug: 'make' }
    ],
    steps: [
      { title: 'Step 1: Voice Recognition', desc: 'Use Sarvam AI Indic speech-to-text to transcribe incoming caller audio into text.' },
      { title: 'Step 2: Intent Resolution', desc: 'Route the prompt to Krutrim sovereign cloud with local business FAQ embeddings.' },
      { title: 'Step 3: Native Voice Synthesis', desc: 'Synthesize the response back into natural regional voice.' }
    ],
    output: 'Sub-second vernacular conversational voice interaction for e-commerce and banking.'
  }
];
