"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function GreenhouseLogin() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit implementation
    console.log("Security code requested for:", email)
  }

  return (
    <div className="flex min-h-screen w-full bg-white font-sans text-gray-900">
      {/* Left Column - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-[#183626]">
        <div className="relative w-full h-full max-h-screen flex items-center justify-center p-12">
          <div className="relative w-full max-w-[600px] aspect-square">
            <Image
              src="/images/greenhouse_login_illustration.png"
              alt="Login illustration"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center p-8 sm:p-12 md:p-20 lg:p-24 xl:px-32 xl:py-24">
        <div className="w-full max-w-[440px] mx-auto lg:mx-0">
          {/* Logo */}
          <div className="mb-[15vh] flex items-center text-[22px]">
            <span className="text-[#1f3d2d] font-medium tracking-tight">Hire Flow</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-[3.5rem] leading-[1.1] font-serif text-[#1f3d2d] max-w-[400px] tracking-tight">
            <span className="italic">Apply</span> for<br/>what&apos;s next.
          </h1>

          <p className="text-[14px] text-gray-800 mb-6 leading-relaxed max-w-[380px]">
            Search smarter, apply faster and take control of your job search with Hire Flow.
          </p>
          
          <p className="text-[14px] text-gray-800 mb-10">
            Enter your email address to continue.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full h-12 rounded-md border border-gray-200 px-4 text-[15px] placeholder:text-gray-500 focus:border-[#008060] focus:outline-none focus:ring-1 focus:ring-[#008060] transition-colors"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="h-[42px] rounded-md bg-[#3b82f6] px-6 text-[15px] font-medium text-white hover:bg-[#2563eb] transition-colors shadow-sm"
              >
                Send security code
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-24 text-[13px] text-gray-800">
            Looking for your organization&apos;s Hire Flow account?{" "}
            <Link href="/login" className="text-[#008060] font-medium hover:underline underline-offset-2">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
