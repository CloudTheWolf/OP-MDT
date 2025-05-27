import type {MiddlewareHandler} from 'hono'
import {requireSession} from './requireSession'

export const requireSessionWithApiAccess: MiddlewareHandler = async (c, next) => {
    await requireSession(c, async () => {})
    const session = c.get('session')
    const hasHeader = c.req.header('x-opfw')
    if (!session || !hasHeader) {
        return c.json({ error: 'API access denied' }, 403)
    }
    await next()
}
