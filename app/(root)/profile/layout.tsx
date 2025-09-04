// app/layout.tsx
import { Metadata } from 'next'

// Metadata de base (peuvent être surchargées par les pages)
export const metadata: Metadata = {
  title: {
    default: 'SyncHub - Plateforme de synchronisation',
    template: '%s | SyncHub', // %s sera remplacé par le titre de la page
  },
  description: 'Plateforme de synchronisation et de collaboration',
  keywords: ['sync', 'collaboration', 'plateforme'],
  authors: [{ name: 'Ton Nom' }],
  creator: 'SyncHub Team',
  publisher: 'SyncHub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    siteName: 'SyncHub',
    title: 'SyncHub - Plateforme de synchronisation',
    description: 'Plateforme de synchronisation et de collaboration',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SyncHub - Plateforme de synchronisation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@synchub',
    creator: '@synchub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}