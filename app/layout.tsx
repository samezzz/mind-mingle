import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Inter } from 'next/font/google'
import Provider from '../components/Provider'
import type { Session } from "next-auth";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mind Mingle',
  description: 'Idea something',
}

export default function RootLayout({
  children, session
}: {
  children: React.ReactNode
  session: Session
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  )
}
