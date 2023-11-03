/* Components */
import { Providers } from '@/lib/providers'

export default function RootLayout({ children }: {children: React.ReactNode }) {
  return (

      <html lang="en">
        <body>
          <main>
            <Providers>
                {children}
            </Providers>
          </main>
        </body>
      </html>

  )
}
