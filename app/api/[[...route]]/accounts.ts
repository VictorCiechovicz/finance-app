import { db } from '@/db/drizzle'
import { accounts, insertAccountsSchema } from '@/db/schema'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { and, eq, inArray } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { z } from 'zod'

const app = new Hono()
  .get('/', clerkMiddleware(), async c => {
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
  .post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertAccountsSchema.pick({ name: true })),
    async c => {
      const auth = getAuth(c)
      const values = c.req.valid('json')

      if (!auth?.userId) {
        return c.json({ error: 'Unauhorized' }, 401)
      }

      const [data] = await db
        .insert(accounts)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values
        })
        .returning()
      return c.json({ data })
    }
  )
  .post(
    '/accounts-delete',
    clerkMiddleware(),
    zValidator(
      'json',
      z.object({
        ids: z.array(z.string())
      })
    ),
    async c => {
      const auth = getAuth(c)
      const values = c.req.valid('json')

      if (!auth?.userId) {
        return c.json({ error: 'Unauhorized' }, 401)
      }

      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({
          id: accounts.id
        })
      return c.json({ data })
    }
  )

export default app
