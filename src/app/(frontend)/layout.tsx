import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type { ReactNode } from 'react'
import './styles.css'

export const metadata = {
  title: 'Booster AI — AI & Automation Agency',
  description: 'Wdrażamy Automatyzację i AI w procesach sprzedaży.',
}

export default async function RootLayout(props: { children: ReactNode }) {
  const { children } = props

  return (
    <html lang="pl">
      <body className="antialiased">
        <Header />
        <main id="main-content" className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
