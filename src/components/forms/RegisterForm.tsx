import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShoppingBag, Store, ArrowRight, Loader2 } from "lucide-react"
import { registerBaseSchema, registerProducerSchema } from "@/lib/validators"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { NIGERIAN_STATES, FABRIC_TYPES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"

type Step = "ROLE" | "DETAILS"

export function RegisterForm() {
  const [step, setStep] = useState<Step>("ROLE")
  const [role, setRole] = useState<"DESIGNER" | "PRODUCER">("DESIGNER")
  const { register: registerUser, isLoading } = useAuth()
  const [allFabrics, setAllFabrics] = useState<string[]>([...FABRIC_TYPES])
  const [customFabric, setCustomFabric] = useState("")

  const schema = role === "DESIGNER" ? registerBaseSchema : registerProducerSchema
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "DESIGNER",
      fabricTypes: [] as string[],
    } as any
  })

  const selectedFabrics = watch("fabricTypes") || []

  const onSubmit = async (data: any) => {
    try {
      await registerUser({ ...data, role })
    } catch (err) {
      console.error(err)
    }
  }

  const handleRoleSelect = (selectedRole: "DESIGNER" | "PRODUCER") => {
    setRole(selectedRole)
    setValue("role", selectedRole)
    setStep("DETAILS")
  }

  const handleAddCustomFabric = () => {
    const trimmed = customFabric.trim()
    if (!trimmed) return
    
    if (!allFabrics.includes(trimmed)) {
      setAllFabrics(prev => [...prev, trimmed])
    }
    
    if (!selectedFabrics.includes(trimmed)) {
      setValue("fabricTypes", [...selectedFabrics, trimmed], { shouldValidate: true })
    }
    
    setCustomFabric("")
  }

  if (step === "ROLE") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-bold">How will you use <span className="italic">fab</span>?</h2>
          <p className="text-muted-foreground">Select your primary role to get started.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className={cn(
              "cursor-pointer hover:border-primary transition-all group",
              role === "DESIGNER" && "border-primary bg-primary/5"
            )}
            onClick={() => handleRoleSelect("DESIGNER")}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ShoppingBag className="h-6 w-6 text-slate-600 group-hover:text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">I am a Designer</h3>
                <p className="text-sm text-muted-foreground">Looking for high-quality fabrics and producers.</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={cn(
              "cursor-pointer hover:border-primary transition-all group",
              role === "PRODUCER" && "border-primary bg-primary/5"
            )}
            onClick={() => handleRoleSelect("PRODUCER")}
          >
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Store className="h-6 w-6 text-slate-600 group-hover:text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">I am a Producer</h3>
                <p className="text-sm text-muted-foreground">I want to showcase my textiles and find buyers.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setStep("ROLE")} type="button">
          ← Back
        </Button>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {role} Registration
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} placeholder="e.g. Tunde Johnson" />
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message as string}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="name@example.com" />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message as string}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" {...register("phone")} placeholder="08012345678" />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message as string}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && <p className="text-xs text-destructive">{errors.password.message as string}</p>}
          </div>
        </div>

        {role === "PRODUCER" && (
          <>
            <div className="pt-4 border-t space-y-4">
              <h4 className="font-bold text-sm uppercase text-muted-foreground">Business Details</h4>
              
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" {...register("businessName")} placeholder="e.g. Lagos Prints Ltd" />
                {errors.businessName && <p className="text-xs text-destructive">{errors.businessName.message as string}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select onValueChange={(v) => setValue("state", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {NIGERIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-xs text-destructive">{errors.state.message as string}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register("city")} placeholder="e.g. Ikeja" />
                  {errors.city && <p className="text-xs text-destructive">{errors.city.message as string}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number (for buyers)</Label>
                <Input id="whatsappNumber" {...register("whatsappNumber")} placeholder="08012345678" />
                {errors.whatsappNumber && <p className="text-xs text-destructive">{errors.whatsappNumber.message as string}</p>}
              </div>

              <div className="space-y-3">
                <Label>Fabric Specialties</Label>
                <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-48 overflow-y-auto">
                  {allFabrics.map(fabric => (
                    <div key={fabric} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`reg-fabric-${fabric}`} 
                        checked={selectedFabrics.includes(fabric)}
                        onCheckedChange={(checked) => {
                          const current = watch("fabricTypes") || []
                          const next = checked 
                            ? [...current, fabric]
                            : current.filter((f: string) => f !== fabric)
                          setValue("fabricTypes", next, { shouldValidate: true })
                        }}
                      />
                      <label htmlFor={`reg-fabric-${fabric}`} className="text-sm cursor-pointer">{fabric}</label>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input 
                    placeholder="Other fabric type..." 
                    value={customFabric}
                    onChange={(e) => setCustomFabric(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddCustomFabric()
                      }
                    }}
                    className="h-9"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={handleAddCustomFabric}
                  >
                    Add
                  </Button>
                </div>
                {errors.fabricTypes && <p className="text-xs text-destructive">{errors.fabricTypes.message as string}</p>}
              </div>
            </div>
          </>
        )}
      </div>

      <Button className="w-full h-11 text-lg" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            Complete Registration
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
