import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {serveStatic} from 'hono/bun'
import {healthRoute} from './routes/health'
import {authenticationRoute} from './routes/authentication'

import {requireSession} from './middleware/requireSession'
import {requireSessionWithApiAccess} from './middleware/requireSessionWithApiAccess'
import {pdRoute} from "@server/routes/pdRoutes";

const app = new Hono()



app.use('*', logger())

const apiRoutes = app.basePath('/api')
    .route('/health', healthRoute)
    .route('/authentication', authenticationRoute)
    .route('/pd', pdRoute)

app.use('*', async (c, next) => {
    const path = new URL(c.req.url).pathname

    // Allow public/static routes
    if (
        path === '/' ||
        path.startsWith('/api/health') ||
        path.startsWith('/api/authentication') ||
        path.startsWith('/public') ||
        path.startsWith('/assets') ||
        path.startsWith('/vite.svg')
    ) {
        return next()
    }

    if (path.startsWith('/api/')) {
        return requireSessionWithApiAccess(c, next)
    }

    return requireSession(c, next)
})

app.use('*', serveStatic({ root: './client/dist' }))
app.use('*', serveStatic({ path: './client/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes
