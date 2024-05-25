import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

export const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!)
export const db = drizzle(sql)

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: 'drizzle' })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main()
