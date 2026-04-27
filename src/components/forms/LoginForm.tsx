import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate, Link } from "react-router-dom"
import { loginSchema } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"

export function LoginForm() {
  const { login, isLoading } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: any) => {
    setError(null)
    try {
      await login(data)
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.")
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-2xl text-center font-medium">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold text-muted-foreground ml-1">Email Address</Label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                type="email"
                placeholder="name@example.com"
                className="pl-11 h-12 rounded-2xl border-2 border-slate-100 focus:border-primary transition-all bg-slate-50/30"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-[10px] font-bold text-destructive ml-1">{errors.email.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <Label className="text-xs uppercase font-bold text-muted-foreground">Password</Label>
              <Link 
                to="/forgot-password" 
                className="text-xs font-bold text-primary hover:underline underline-offset-4"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-11 h-12 rounded-2xl border-2 border-slate-100 focus:border-primary transition-all bg-slate-50/30"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-[10px] font-bold text-destructive ml-1">{errors.password.message as string}</p>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99]" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>

        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground font-medium">
            New to <span className="italic">fab</span>?{" "}
            <Link to="/register" className="font-black text-primary hover:underline underline-offset-4 decoration-2">
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
