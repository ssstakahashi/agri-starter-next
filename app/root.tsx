import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

import './styles.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="https://mieru-storage-backend.studiofoods.net/public/file/download/15cbf42c-bfd3-4cde-b4f6-75b9687b6881" />
        <link rel="shortcut icon" type="image/png" href="https://mieru-storage-backend.studiofoods.net/public/file/download/15cbf42c-bfd3-4cde-b4f6-75b9687b6881" />
        <Meta />
        <Links />
        {/* Google Fonts (Inter & Noto Sans JP) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
        {/* Font Awesome for icons */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Noto Sans JPをデフォルトフォントに設定 */
            body {
              font-family: 'Noto Sans JP', 'Inter', sans-serif;
            }
          `
        }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
