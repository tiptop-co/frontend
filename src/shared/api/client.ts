const API_BASE = import.meta.env.VITE_API_URL ?? '/api/v1'
const DEBUG = import.meta.env.VITE_DEBUG === 'true'

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public url: string,
    public body?: unknown,
  ) {
    super(`API error: ${status} ${statusText} — ${url}`)
    this.name = 'ApiError'
  }
}

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  v !== null &&
  typeof v === 'object' &&
  !Array.isArray(v) &&
  (v as object).constructor === Object

const toCamel = (s: string) =>
  s.replace(/_([a-z0-9])/gi, (_, c: string) => c.toUpperCase())
const toSnake = (s: string) =>
  s.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase())

const camelizeKeys = (input: unknown): unknown => {
  if (Array.isArray(input)) return input.map(camelizeKeys)
  if (isPlainObject(input)) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(input)) {
      out[toCamel(k)] = camelizeKeys(v)
    }
    return out
  }
  return input
}

const snakeifyKeys = (input: unknown): unknown => {
  if (Array.isArray(input)) return input.map(snakeifyKeys)
  if (isPlainObject(input)) {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(input)) {
      out[toSnake(k)] = snakeifyKeys(v)
    }
    return out
  }
  return input
}

const transformBody = (body: BodyInit | null | undefined): BodyInit | null | undefined => {
  if (typeof body !== 'string' || body.length === 0) return body
  const ch = body[0]
  if (ch !== '{' && ch !== '[') return body
  try {
    const parsed = JSON.parse(body)
    return JSON.stringify(snakeifyKeys(parsed))
  } catch {
    return body
  }
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE}${endpoint}`

  const transformedBody = transformBody(options?.body)

  if (DEBUG) {
    console.debug('[api →]', options?.method ?? 'GET', url, transformedBody)
  }

  let res: Response
  try {
    res = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
      body: transformedBody,
    })
  } catch (err) {
    if (DEBUG) console.error('[api ✗ network]', url, err)
    throw err
  }

  if (!res.ok) {
    let body: unknown
    try {
      const text = await res.text()
      try {
        body = camelizeKeys(JSON.parse(text))
      } catch {
        body = text
      }
    } catch {
      body = undefined
    }
    if (DEBUG) {
      console.error('[api ✗]', res.status, res.statusText, url, body)
    }
    throw new ApiError(res.status, res.statusText, url, body)
  }

  if (DEBUG) console.debug('[api ←]', res.status, url)

  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T
  }
  const text = await res.text()
  if (!text) return undefined as T
  return camelizeKeys(JSON.parse(text)) as T
}
