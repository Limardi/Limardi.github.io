export const metadata = {
  title: 'Vincent Limardi - Developer Portfolio',
  description: 'personal website of Vincent Limardi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 