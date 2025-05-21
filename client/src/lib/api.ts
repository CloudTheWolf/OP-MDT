import {hc} from "hono/client";
import {ApiRoutes} from "@server/api";

const client = hc<ApiRoutes>('/')

export const api = client.api