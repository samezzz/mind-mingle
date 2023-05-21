import './globals.css'
import Nav from './components/Nav'
import { Inter } from 'next/font/google'
import Provider from './components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mind Mingle',
  description: 'Idea something',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
