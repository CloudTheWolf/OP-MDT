import {Hono} from 'hono'
import {deleteCookie, getCookie, setCookie} from 'hono/cookie'
import {db} from '@server/helpers/database-helper'
import {characters, login, roster, sessions} from '@server/drizzle/schema'
import {eq, gt} from 'drizzle-orm'
import {signJwt, verifyJwt} from '@server/helpers/jwt-helper'
import {nanoid} from 'nanoid'
import bcrypt from 'bcryptjs'

export const authenticationRoute = new Hono()

authenticationRoute.get('/status', async (c) => {
    const sessionToken = getCookie(c,'session')
    if (!sessionToken) return c.json({ loggedIn: false })

    const now = new Date()

    const session = await db.query.sessions.findFirst({
        where: (s) =>
            eq(s.accessToken, sessionToken) &&
            eq(s.isRevoked, 0) &&
            gt(s.expiresAt,now)
    })

    return c.json({ loggedIn: !!session })
})

authenticationRoute.post('/login', async (c) => {
    const { characterId, password } = await c.req.json()

    const user = await db.query.login.findFirst({
        where: eq(login.characterId, characterId),
    })

    if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401)
    }
    const match = bcrypt.compare(password, user.password)
    if (!match) {
        return c.json({ error: 'Invalid credentials' }, 401)
    }

    const accessToken = await signJwt({ userId: user.characterId, apiAccess: true })
    const refreshToken = nanoid()
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    await db.insert(sessions).values({
        userId: Number(user.characterId),
        accessToken,
        refreshToken,
        isRevoked: 0,
        expiresAt
    })

    setCookie(c, 'session', accessToken, {
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60,
        sameSite: 'Strict',
        domain: getDomain(c),
        expires: expiresAt,
    })

    return c.json({ success: true })
})


authenticationRoute.post('/logout', async (c) => {
    const sessionToken = getCookie(c, 'session')
    
    if (sessionToken) {
        await db
            .update(sessions)
            .set({ isRevoked: 1 })
            .where(eq(sessions.accessToken, sessionToken))

        deleteCookie(c, 'session')
    }

    return c.json({ success: true })
})

authenticationRoute.get('/me', async (c) => {
    const token = getCookie(c,'session')
    if (!token) return c.json({ error: 'Not authenticated' }, 401)

    const payload = await verifyJwt(token)
    if (!payload) return c.json({ error: 'Invalid token' }, 401)

    const user = await db.query.login.findFirst({
        where: eq(login.characterId, payload.userId),
    })

    if (!user) return c.json({ error: 'User not found' }, 404)

    const characterInfo: any = await db.query.characters.findFirst({
        where: eq(characters.characterId, user.characterId),
    });

    const rosterInfo: any = await db.query.roster.findFirst({
        where: eq(roster.characterId, user.characterId),
    })

    return c.json({ user: {
            characterId: user.characterId,
            firstName: characterInfo.firstName,
            lastName: characterInfo.lastName,
            callsign: rosterInfo.callsign
        } })
})

function getDomain(c: any): string | undefined {
    const host = c.req.header('host') ?? 'localhost'
    const hostname = host.split(':')[0]
    return hostname === 'localhost' || hostname === '127.0.0.1' ? undefined : hostname
}
