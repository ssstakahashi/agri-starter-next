import type { LoaderFunctionArgs } from '@remix-run/cloudflare'

export async function loader({ request, params, context }: LoaderFunctionArgs) {
  const key = params.key
  if (!key) {
    return new Response('Image ID not found', { status: 404 })
  }

  const object = await context.cloudflare.env.IMAGES.get(key)

  if (!object) {
    return new Response('Image not found', { status: 404 })
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)

  // Set Content-Type header if not already set by R2
  if (!headers.has('Content-Type')) {
    // Default to image/jpeg, but this will work for most image types
    headers.set('Content-Type', 'image/jpeg')
  }

  return new Response(object.body, {
    headers,
  })
}
