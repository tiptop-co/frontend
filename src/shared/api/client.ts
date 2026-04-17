const API_BASE = import.meta.env.VITE_API_URL ?? '/api'
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

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE}${endpoint}`

  if (DEBUG) {
    console.debug('[api →]', options?.method ?? 'GET', url, options?.body)
  }

  let res: Response
  try {
    res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
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
        body = JSON.parse(text)
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

  return res.json() as Promise<T>
}
