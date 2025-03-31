export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-xl">Page Not Found</p>
      <a href="/" className="text-blue-500 hover:text-blue-700">
        Return Home
      </a>
    </div>
  )
} 