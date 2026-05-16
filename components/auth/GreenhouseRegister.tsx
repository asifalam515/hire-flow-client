"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function GreenhouseRegister() {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit implementation
    console.log("Email submitted:", email)
  }

  const handleGoogleSignIn = () => {
    // Mock google sign in
    console.log("Google Sign In")
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-gray-900">
      {/* Left Column - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-[#FDE5CA]">
        <div className="relative w-full h-full max-h-screen flex items-center justify-center p-12">
          <div className="relative w-full max-w-[600px] aspect-square">
            <Image
              src="/images/greenhouse_illustration.png"
              alt="Interview illustration"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center p-8 sm:p-12 md:p-20 lg:p-24 xl:px-32 xl:py-24">
        <div className="w-full max-w-[440px] mx-auto lg:mx-0">
          {/* Logo */}
          <div className="mb-[15vh] flex items-center gap-1.5 text-[22px]">
            <span className="text-[#1f3d2d] font-medium tracking-tight">greenhouse</span>
            <span className="text-[#4b8b6f] font-light">Recruiting</span>
          </div>

          {/* Heading */}
          <h1 className="mb-10 text-[3.5rem] leading-[1.05] font-serif text-[#1f3d2d] max-w-[380px] tracking-tight">
            Better hiring,<br/>all-together.
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-12 rounded-md border border-gray-300 px-4 text-[15px] placeholder:text-gray-500 focus:border-[#4285f4] focus:outline-none focus:ring-1 focus:ring-[#4285f4] transition-colors"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="h-[42px] rounded-md bg-[#3b82f6] px-8 text-[15px] font-medium text-white hover:bg-[#2563eb] transition-colors shadow-sm"
              >
                Next
              </button>
              
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex h-[42px] items-center gap-3 rounded-md border border-gray-200 bg-[#f9fafb] px-5 text-[15px] font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-24 text-[13px] text-gray-800">
            Looking for your MyGreenhouse account?{" "}
            <Link href="/login" className="text-[#3b82f6] font-medium hover:underline underline-offset-2">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
