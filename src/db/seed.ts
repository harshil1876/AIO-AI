import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Please provide DATABASE_URL in .env to run the seed script.");
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client, { schema });

const INITIAL_CATEGORIES = [
  // A. Content & Creative
  { slug: 'video-generation', name: 'Video Generation', description: 'Create shorts, edit videos, and generate avatars.' },
  { slug: 'image-art', name: 'Image & Art', description: 'Generate logos, stock photos, and edit images.' },
  { slug: 'audio-voice', name: 'Audio & Voice', description: 'Voiceovers, music generation, and podcast editing.' },
  { slug: 'writing-copy', name: 'Writing & Copy', description: 'SEO articles, emails, and social media captions.' },
  
  // B. Development & IT
  { slug: 'code-assistants', name: 'Code Assistants', description: 'Autocomplete code, refactoring, and code explanation.' },
  { slug: 'web-app-builders', name: 'Web & App Builders', description: 'No-code apps and landing page generation.' },
  { slug: 'open-source-models', name: 'Open Source Models', description: 'Open-weights LLMs and vision models.' },
  
  // C. Business & Productivity
  { slug: 'research-analysis', name: 'Research & Analysis', description: 'Summarize PDFs and analyze data.' },
  { slug: 'automation-workflows', name: 'Automation & Workflows', description: 'Connecting apps and scheduling tasks.' },
  { slug: 'sales-marketing', name: 'Sales & Marketing', description: 'Lead generation and CRM automation.' },
  
  // D. Conversational & Agents
  { slug: 'general-chatbots', name: 'General Chatbots', description: 'General purpose chatting and custom GPTs.' },
  { slug: 'autonomous-agents', name: 'Autonomous Agents', description: 'Autonomous task execution and planning.' },
  
  // E. Specialized & Regional
  { slug: 'india-first', name: 'India-First AI', description: 'Regional language translation and localized AI.' },
];

const INITIAL_TOOLS = [
  // The Giants
  { slug: 'chatgpt', name: 'ChatGPT', tagline: 'The most capable general-purpose AI chatbot by OpenAI.', websiteUrl: 'https://chat.openai.com', pricingType: 'Freemium', isVerified: true, platformScore: 99, categorySlugs: ['general-chatbots', 'writing-copy'] },
  { slug: 'claude', name: 'Claude', tagline: 'Next-generation AI assistant by Anthropic, excellent for long context.', websiteUrl: 'https://claude.ai', pricingType: 'Freemium', isVerified: true, platformScore: 98, categorySlugs: ['general-chatbots', 'code-assistants'] },
  { slug: 'midjourney', name: 'Midjourney', tagline: 'Industry-leading AI image generation through Discord.', websiteUrl: 'https://midjourney.com', pricingType: 'Paid', isVerified: true, platformScore: 97, categorySlugs: ['image-art'] },
  { slug: 'github-copilot', name: 'GitHub Copilot', tagline: 'Your AI pair programmer.', websiteUrl: 'https://github.com/features/copilot', pricingType: 'Paid', isVerified: true, platformScore: 95, categorySlugs: ['code-assistants'] },
  { slug: 'notion-ai', name: 'Notion AI', tagline: 'Access the limitless power of AI, right inside Notion.', websiteUrl: 'https://notion.so/product/ai', pricingType: 'Paid', isVerified: true, platformScore: 90, categorySlugs: ['writing-copy', 'research-analysis'] },

  // The Connectors / Workflows
  { slug: 'make', name: 'Make', tagline: 'Design, build, and automate anything from tasks to workflows.', websiteUrl: 'https://www.make.com', pricingType: 'Freemium', isVerified: true, platformScore: 94, categorySlugs: ['automation-workflows'] },
  { slug: 'zapier', name: 'Zapier', tagline: 'Automate your work today.', websiteUrl: 'https://zapier.com', pricingType: 'Freemium', isVerified: true, platformScore: 93, categorySlugs: ['automation-workflows'] },
  { slug: 'n8n', name: 'n8n', tagline: 'Fair-code workflow automation tool.', websiteUrl: 'https://n8n.io', pricingType: 'Open Source', isVerified: true, platformScore: 92, categorySlugs: ['automation-workflows'] },
  { slug: 'elevenlabs', name: 'ElevenLabs', tagline: 'The most realistic and versatile AI speech software.', websiteUrl: 'https://elevenlabs.io', pricingType: 'Freemium', isVerified: true, platformScore: 96, categorySlugs: ['audio-voice'] },
  { slug: 'runway', name: 'Runway', tagline: 'Advancing creativity with artificial intelligence.', websiteUrl: 'https://runwayml.com', pricingType: 'Freemium', isVerified: true, platformScore: 95, categorySlugs: ['video-generation'] },

  // Open Source & India-First
  { slug: 'sarvam-ai', name: 'Sarvam AI', tagline: 'Building foundational AI models for Indian languages.', websiteUrl: 'https://www.sarvam.ai', pricingType: 'Free', isVerified: true, platformScore: 88, categorySlugs: ['india-first', 'open-source-models'] },
  { slug: 'krutrim', name: 'Krutrim', tagline: 'India’s own AI, fluent in multiple Indian languages.', websiteUrl: 'https://chat.olakrutrim.com', pricingType: 'Free', isVerified: true, platformScore: 85, categorySlugs: ['india-first', 'general-chatbots'] },
  { slug: 'llama-3', name: 'Llama 3 (Meta)', tagline: 'The most capable open weight models to date.', websiteUrl: 'https://llama.meta.com', pricingType: 'Open Source', isVerified: true, platformScore: 97, categorySlugs: ['open-source-models'] },
  { slug: 'hugging-face', name: 'Hugging Face', tagline: 'The AI community building the future.', websiteUrl: 'https://huggingface.co', pricingType: 'Free', isVerified: true, platformScore: 98, categorySlugs: ['open-source-models', 'research-analysis'] },
];

async function seed() {
  console.log("🌱 Starting database seed...");

  // 1. Seed Categories
  for (const cat of INITIAL_CATEGORIES) {
    await db.insert(schema.categories)
      .values(cat)
      .onConflictDoNothing({ target: schema.categories.slug });
  }
  console.log(`✅ Seeded ${INITIAL_CATEGORIES.length} categories.`);

  // Fetch inserted categories to get their IDs
  const allCategories = await db.select().from(schema.categories);
  const categoryMap = new Map(allCategories.map(c => [c.slug, c.id]));

  // 2. Seed Tools
  let toolsInserted = 0;
  for (const toolData of INITIAL_TOOLS) {
    const { categorySlugs, ...toolInfo } = toolData;
    
    // Check if tool exists
    const existingTool = await db.select().from(schema.tools).where(eq(schema.tools.slug, toolInfo.slug));
    
    if (existingTool.length === 0) {
      const [insertedTool] = await db.insert(schema.tools).values(toolInfo).returning();
      toolsInserted++;

      // 3. Link Tools to Categories
      for (const catSlug of categorySlugs) {
        const catId = categoryMap.get(catSlug);
        if (catId && insertedTool) {
          await db.insert(schema.toolCategories)
            .values({ toolId: insertedTool.id, categoryId: catId })
            .onConflictDoNothing();
        }
      }
    }
  }

  console.log(`✅ Seeded ${toolsInserted} new tools with category links.`);
  console.log("🎉 Seeding complete!");
  process.exit(0);
}

seed().catch(err => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
