import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Workflow Dashboard',
  description: 'Track collaborative projects and workflows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-navy to-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <h1 className="text-2xl font-bold text-navy">Workflow</h1>
            </div>
            <div className="text-sm text-gray-600">
              Managing projects with precision
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
