import type {Context} from 'hono'
import * as process from "node:process";

const memoryCache = new Map<string, { data: any; expires: number }>()

export const FetchFiveM = async (name: string, c: Context) => {
    console.log(`${name}`);
    const url = `${process.env.OPFW_HTTP_API}/${name}.json`
    console.log(`${url}`)
    const cached = memoryCache.get(name)
    const now = Date.now()
    if (cached && cached.expires > now) {
        console.log(`Cached ${name} expires ${now - cached.expires} ms`)
        return c.json(cached.data)
    }
    console.log(`Cached ${name} expired`)
    try {

        const response = await fetch(url, {headers: {'authorization': `Bearer ${process.env.OPFW_API_KEY}`}})
        console.log(`${response.status}: ${response.statusText}`)
        if (!response.ok) {
            return c.text(`Failed to fetch: ${response.statusText}`, 500)
        }

        const data = await response.json()
        console.log(data)
        memoryCache.set(name, {
            data,
            expires: now + 10 * 60 * 1000,
        })
        console.log(data);
        return c.json(data)
    } catch (err) {
        return c.text(`Error: ${(err as Error).message}`, 500)
    }
}