import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import { TOOLS_DATA, CATEGORIES_DATA } from '../data/seedData';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Please provide DATABASE_URL in .env to run the seed script.");
  process.exit(1);
}

const client = postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });

async function seed() {
  console.log("Starting database seed...");

  // 1. Seed Categories
  for (const cat of CATEGORIES_DATA) {
    await db.insert(schema.categories)
      .values({
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
      })
      .onConflictDoNothing({ target: schema.categories.slug });
  }
  console.log(`Seeded ${CATEGORIES_DATA.length} categories.`);

  // Fetch inserted categories to get their IDs
  const allCategories = await db.select().from(schema.categories);
  const categoryMap = new Map(allCategories.map(c => [c.slug, c.id]));

  // 2. Seed Tools
  let toolsInserted = 0;
  for (const toolData of TOOLS_DATA) {
    const { categorySlugs, id, valueScore, valueVerdict, freeTierGenerosity, pricingScalability, hiddenCosts, openSourceAlternative, rating, reviewCount, features, useCases, pros, cons, startingPrice, freeTier, isIndianAI, badge, ...toolInfo } = toolData;
    
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

  console.log(`Seeded ${toolsInserted} new tools with category links.`);
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
