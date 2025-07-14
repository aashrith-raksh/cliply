import { GalleryVerticalEnd } from 'lucide-react'
import { Link } from 'react-router-dom'

const AuthHeader = () => {
  return (
    <div className="flex flex-col items-center gap-2">
            <Link
              to="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to &lt;company name&gt;</h1>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
  )
}

export default AuthHeader
