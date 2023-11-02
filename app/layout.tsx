/* Components */
import { Providers } from '@/lib/providers'

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body>
            <main>{props.children}</main>
        </body>
      </html>
    </Providers>
  )
}
