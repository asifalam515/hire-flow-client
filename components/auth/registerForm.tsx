"use client"

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  User,
} from "lucide-react"
import { useState, type FormEvent } from "react"

/**
 * PremiumSignUp
 * A drop-in, dependency-light sign-up card.
 * Requirements: react, lucide-react, tailwindcss.
 * Just drop into a page: <PremiumSignUp onSubmit={(v) => ...} />
 */

type SignUpValues = {
  name: string
  email: string
  password: string
}

type Props = {
  onSubmit?: (values: SignUpValues) => Promise<void> | void
  onGoogle?: () => void
  onGithub?: () => void
  onSignIn?: () => void
}

export default function SignUp({
  onSubmit,
  onGoogle,
  onGithub,
  onSignIn,
}: Props) {
  const [values, setValues] = useState<SignUpValues>({
    name: "",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const strength = getStrength(values.password)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (!values.name || !values.email || !values.password) {
      setError("Please fill in all fields.")
      return
    }
    if (!agree) {
      setError("Please accept the terms to continue.")
      return
    }
    try {
      setLoading(true)
      await onSubmit?.(values)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0f] p-4 font-sans text-white">
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-violet-600/30 blur-[120px]" />
        <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div
          className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/20 to-white/5"
          aria-hidden
        />
        <div className="relative rounded-3xl bg-[#0d0d14]/80 p-8 shadow-2xl backdrop-blur-xl">
          {/* Brand */}
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium tracking-wide text-white/80">
              YOUR BRAND
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Join thousands building the future. Free forever, no credit card.
          </p>

          {/* OAuth */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <SocialButton
              onClick={onGoogle}
              label="Google"
              icon={<GoogleIcon />}
            />
            <SocialButton
              onClick={onGithub}
              label="GitHub"
              icon={<GitHubIcon />}
            />
          </div>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs tracking-wider text-white/40 uppercase">
              or
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              icon={<User className="h-4 w-4" />}
              type="text"
              placeholder="Full name"
              value={values.name}
              onChange={(v) => setValues((s) => ({ ...s, name: v }))}
              autoComplete="name"
            />
            <Field
              icon={<Mail className="h-4 w-4" />}
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(v) => setValues((s) => ({ ...s, email: v }))}
              autoComplete="email"
            />
            <div>
              <Field
                icon={<Lock className="h-4 w-4" />}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={values.password}
                onChange={(v) => setValues((s) => ({ ...s, password: v }))}
                autoComplete="new-password"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-white/50 transition hover:text-white"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
              />
              {values.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex h-1 flex-1 gap-1">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-full transition-all ${
                          i < strength.score
                            ? strength.score <= 1
                              ? "bg-red-500"
                              : strength.score === 2
                                ? "bg-amber-500"
                                : strength.score === 3
                                  ? "bg-lime-500"
                                  : "bg-emerald-500"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="w-16 text-right text-[11px] text-white/50">
                    {strength.label}
                  </span>
                </div>
              )}
            </div>

            <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-sm text-white/70">
              <span
                onClick={() => setAgree((a) => !a)}
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                  agree
                    ? "border-violet-500 bg-violet-500"
                    : "border-white/20 bg-white/5"
                }`}
              >
                {agree && (
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                )}
              </span>
              <span className="leading-snug">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-white underline-offset-4 hover:underline"
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-white underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </span>
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="sr-only"
              />
            </label>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition hover:shadow-violet-600/50 disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {loading ? "Creating account…" : "Create account"}
              {!loading && (
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSignIn}
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

/* ---------- Subcomponents ---------- */

function Field({
  icon,
  trailing,
  value,
  onChange,
  ...rest
}: {
  icon: React.ReactNode
  trailing?: React.ReactNode
  value: string
  onChange: (v: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <div className="group relative">
      <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-white/40 transition group-focus-within:text-white/80">
        {icon}
      </span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pr-10 pl-10 text-sm text-white placeholder-white/40 transition outline-none focus:border-violet-500/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-violet-500/20"
      />
      {trailing && (
        <span className="absolute top-1/2 right-3.5 -translate-y-1/2">
          {trailing}
        </span>
      )}
    </div>
  )
}

function SocialButton({
  onClick,
  label,
  icon,
}: {
  onClick?: () => void
  label: string
  icon: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm font-medium text-white/90 transition hover:border-white/20 hover:bg-white/10"
    >
      {icon}
      {label}
    </button>
  )
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.96h5.5c-.24 1.42-1.7 4.16-5.5 4.16-3.31 0-6-2.74-6-6.12s2.69-6.12 6-6.12c1.88 0 3.14.8 3.86 1.49l2.63-2.54C16.84 3.5 14.66 2.5 12 2.5 6.98 2.5 2.92 6.56 2.92 11.6S6.98 20.7 12 20.7c6.92 0 9.18-4.86 9.18-7.34 0-.5-.05-.86-.13-1.16H12z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.6-.8 1.9-1.3-.3-.4-.7-1-.9-1.2-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0C17.8 4.1 18.8 4.4 18.8 4.4c.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1 .8 2v3c0 .4.2.7.8.6A12 12 0 0012 .5z"
      />
    </svg>
  )
}

/* ---------- Helpers ---------- */

function getStrength(pw: string): { score: number; label: string } {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"]
  return { score, label: labels[score] }
}
