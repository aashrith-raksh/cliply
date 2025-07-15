import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Toaster />
        <Outlet/>
      </div>
    </main>
  )
}

export default AuthLayout
