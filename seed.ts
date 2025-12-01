import { drizzle } from 'drizzle-orm/d1'
import { users } from './app/db/schema'
import bcrypt from 'bcryptjs'

/**
 * Seed script to create initial users
 * 
 * Usage:
 * 1. Update the INITIAL_USERS array with your desired users
 * 2. Run: bun run seed:local (for local D1)
 *    or: bun run seed:remote (for production D1)
 */

const INITIAL_USERS = [
  {
    email: 'admin@example.com',
    name: '管理者',
    password: 'changeme123', // Change this!
  },
  {
    email: 'user@example.com',
    name: '田中太郎',
    password: 'changeme456', // Change this!
  },
]

async function seed(env: any) {
  const db = drizzle(env.DB)

  console.log('🌱 Seeding users...')

  for (const user of INITIAL_USERS) {
    const passwordHash = await bcrypt.hash(user.password, 10)

    try {
      await db.insert(users).values({
        id: crypto.randomUUID(),
        email: user.email,
        name: user.name,
        passwordHash,
      })
      console.log(`✅ Created user: ${user.email} (${user.name})`)
    } catch (error) {
      console.error(`❌ Failed to create user ${user.email}:`, error)
    }
  }

  console.log('✨ Seeding complete!')
}

// For local development
export async function seedLocal() {
  const { getPlatformProxy } = await import('wrangler')
  const { env } = await getPlatformProxy()
  await seed(env)
}

// For production
export async function seedRemote(env: any) {
  await seed(env)
}

// Run if called directly
if (import.meta.main) {
  seedLocal().catch(console.error)
}
