declare module '@remix-run/cloudflare' {
  export interface AppLoadContext { }
  export interface EntryContext {
    // Add necessary properties as needed
  }
  export interface LoaderFunctionArgs {
    context: AppLoadContext
    params: Record<string, string>
    request: Request
  }
  export type MetaFunction = () => Array<{ [key: string]: string | undefined }>
  export function json<T>(data: T, init?: ResponseInit): Response
}

declare module '@remix-run/react' {
  export const RemixServer: React.ComponentType<any>
  export function useLoaderData<T>(): Awaited<T>
  export const Links: React.ComponentType<any>
  export const Meta: React.ComponentType<any>
  export const Outlet: React.ComponentType<any>
  export const Scripts: React.ComponentType<any>
  export const ScrollRestoration: React.ComponentType<any>
}

declare module 'isbot' {
  export function isbot(userAgent: string): boolean
}

declare module 'react-dom/server' {
  export function renderToReadableStream(
    element: React.ReactElement,
    options?: {
      signal?: AbortSignal
      onError?: (error: unknown) => void
    }
  ): ReadableStream
}
