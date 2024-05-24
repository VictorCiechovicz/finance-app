import { db } from '@/db/drizzle'
import { accounts } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { HTTPException } from 'hono/http-exception'
import { Hono } from 'hono'
import { eq } from 'drizzle-orm'

const app = new Hono().get('/', clerkMiddleware(), async c => {
  const auth = getAuth(c)

  if (!auth?.userId) {
    return c.json({ error: 'Unauhorized' }, 401)
  }

  const data = await db
    .select({
      id: accounts.id,
      name: accounts.name
    })
    .from(accounts)
    .where(eq(accounts.userId, auth.userId))

  return c.json({ data })
})

export default app
