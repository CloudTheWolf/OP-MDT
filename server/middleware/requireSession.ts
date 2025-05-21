import type {MiddlewareHandler} from 'hono'
import {db} from '@server/helpers/database-helper'
import {sessions} from '@server/drizzle/schema'
import {and, eq, gt} from 'drizzle-orm'

export const requireSession: MiddlewareHandler = async (c, next) => {
    const cookieHeader = c.req.header('cookie')
    const sessionToken = cookieHeader?.match(/session=([^;]+)/)?.[1]

    if (!sessionToken) {
        return handleUnauthorized(c)
    }

    const now = new Date()

    const session = await db.query.sessions.findFirst({
        where: and(
            eq(sessions.accessToken, sessionToken),
            eq(sessions.isRevoked, 0),
            gt(sessions.expiresAt, now)
        ),
    })

    if (!session) {
        return handleUnauthorized(c)
    }

    c.set('session', session)

    await next()
}

// 🧠 Respond with JSON for APIs or redirect for HTML
function handleUnauthorized(c: any) {
    const accept = c.req.header('accept') || ''

    if (accept.includes('text/html')) {
        return c.redirect('/')
    }

    return c.json({ error: 'Unauthorized' }, 401)
}
