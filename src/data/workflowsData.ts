export interface WorkflowStep {
  title: string;
  desc: string;
  toolSlug?: string;
  toolName?: string;
  type: 'Trigger' | 'AI Model' | 'Transformation' | 'Output';
  promptTemplate?: string;
}

export interface WorkflowItem {
  id: string;
  title: string;
  goal: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  time: string;
  estimatedCost: string;
  toolsUsed: { name: string; slug: string }[];
  steps: WorkflowStep[];
  output: string;
}

export const WORKFLOWS_DATA: WorkflowItem[] = [
  {
    id: 'shorts-creator-pipeline',
    title: 'Faceless YouTube Shorts Automation',
    goal: 'Generate 5 high-engagement vertical short videos per day from trending topics without filming.',
    difficulty: 'Intermediate',
    time: '20 mins setup',
    estimatedCost: '~$17/mo (ElevenLabs + Runway starter) or $0 (free tiers)',
    toolsUsed: [
      { name: 'ChatGPT', slug: 'chatgpt' },
      { name: 'ElevenLabs', slug: 'elevenlabs' },
      { name: 'Runway', slug: 'runway' },
      { name: 'Make', slug: 'make' }
    ],
    steps: [
      { 
        title: 'Trending Topic Discovery', 
        desc: 'Extract trending topic or RSS headline from Google Trends.', 
        type: 'Trigger', 
        promptTemplate: 'N/A (Webhook trigger)' 
      },
      { 
        title: 'Script & Hook Synthesis', 
        desc: 'Generate viral 50-second narration with 3-second visual pattern interrupt.', 
        type: 'AI Model', 
        toolName: 'ChatGPT', 
        toolSlug: 'chatgpt',
        promptTemplate: 'Write a 50-word narration script about [TOPIC]. Rule 1: First 3 seconds must challenge a common belief. Rule 2: Fast tempo. End with a question.' 
      },
      { 
        title: 'Emotional Voice Synthesis', 
        desc: 'Clone high-energy narrator voice with realistic breath marks.', 
        type: 'Transformation', 
        toolName: 'ElevenLabs', 
        toolSlug: 'elevenlabs',
        promptTemplate: 'Voice: Adam (Pre-made) | Stability: 0.45 | Clarity: 0.85' 
      },
      { 
        title: 'Cinematic B-Roll Video', 
        desc: 'Generate 4x 4-second cinematic vertical visuals.', 
        type: 'AI Model', 
        toolName: 'Runway', 
        toolSlug: 'runway',
        promptTemplate: 'Cinematic drone tracking shot, dark mood, volumetric lighting, photorealistic 8k --ar 9:16' 
      },
      { 
        title: 'Auto-Stitch & Publish', 
        desc: 'Assemble audio, video, and auto-subtitles; post to YouTube Shorts via webhook.', 
        type: 'Output', 
        toolName: 'Make', 
        toolSlug: 'make' 
      }
    ],
    output: 'Published high-definition vertical video with auto-synced subtitles and voice.'
  },
  {
    id: 'pr-code-review-bot',
    title: 'Automated GitHub PR Review & Security Scan',
    goal: 'Automatically analyze incoming Pull Requests for subtle bugs, performance bottlenecks, and security flaws.',
    difficulty: 'Intermediate',
    time: '15 mins',
    estimatedCost: 'Free (under free tier)',
    toolsUsed: [
      { name: 'Claude', slug: 'claude' },
      { name: 'GitHub Copilot', slug: 'github-copilot' },
      { name: 'n8n', slug: 'n8n' }
    ],
    steps: [
      { 
        title: 'GitHub Webhook Trigger', 
        desc: 'Fires when a pull_request event is opened or updated on GitHub.', 
        type: 'Trigger' 
      },
      { 
        title: 'Diff & Context Extraction', 
        desc: 'Extract the modified file chunks, author history, and project dependencies.', 
        type: 'Transformation', 
        toolName: 'n8n', 
        toolSlug: 'n8n' 
      },
      { 
        title: 'Architectural & Security Audit', 
        desc: 'Analyze git diff for race conditions, SQL injections, and performance leaks.', 
        type: 'AI Model', 
        toolName: 'Claude', 
        toolSlug: 'claude',
        promptTemplate: 'Analyze this unified git diff. Check: 1) Potential memory leaks or async unhandled rejections, 2) SQL injection / unsanitized params, 3) Edge case missing unit tests.' 
      },
      { 
        title: 'Markdown Comment Posting', 
        desc: 'Post actionable inline review comments back to the GitHub PR thread.', 
        type: 'Output', 
        toolName: 'GitHub Copilot', 
        toolSlug: 'github-copilot' 
      }
    ],
    output: 'Detailed automated PR comment with actionable code snippet recommendations.'
  },
  {
    id: 'indic-customer-support-agent',
    title: 'Multilingual Customer Voice & Chat Bot',
    goal: 'Provide real-time 24/7 customer support across Hindi, Tamil, Telugu, and English.',
    difficulty: 'Advanced',
    time: '45 mins',
    estimatedCost: 'Pay-as-you-go (~$0.002 per interaction)',
    toolsUsed: [
      { name: 'Sarvam AI', slug: 'sarvam-ai' },
      { name: 'Krutrim', slug: 'krutrim' },
      { name: 'Make', slug: 'make' }
    ],
    steps: [
      { 
        title: 'Inbound Audio Stream', 
        desc: 'Captures caller speech over WebRTC or telephony SIP trunk.', 
        type: 'Trigger' 
      },
      { 
        title: 'Indic Speech Transcription', 
        desc: 'Converts mixed vernacular audio (Hinglish/Tamil) into clean structured text.', 
        type: 'AI Model', 
        toolName: 'Sarvam AI', 
        toolSlug: 'sarvam-ai' 
      },
      { 
        title: 'Intent & FAQ Resolution', 
        desc: 'Resolves customer query with localized domain knowledge and cultural grounding.', 
        type: 'AI Model', 
        toolName: 'Krutrim', 
        toolSlug: 'krutrim',
        promptTemplate: 'You are a helpful customer assistant for Indian retail banking. Answer politely in the user’s regional language.' 
      },
      { 
        title: 'Regional Voice Synthesis', 
        desc: 'Streams natural Indic spoken response with low latency back to caller.', 
        type: 'Output', 
        toolName: 'Sarvam AI', 
        toolSlug: 'sarvam-ai' 
      }
    ],
    output: 'Sub-second vernacular conversational voice interaction for e-commerce and banking.'
  }
];
