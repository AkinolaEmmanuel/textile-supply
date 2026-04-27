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
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
  const [error, setError] = useState<string | null>(null)

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
      deliveryAvailable: true,
      minimumOrderQuantity: 1,
    } as any
  })

  const selectedFabrics = watch("fabricTypes") || []

  const onSubmit = async (data: any) => {
    setError(null)
    try {
      await registerUser({ ...data, role })
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
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
      <div className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card 
            className={cn(
              "cursor-pointer hover:border-primary transition-all duration-300 group border-2 rounded-3xl",
              role === "DESIGNER" ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-slate-100"
            )}
            onClick={() => handleRoleSelect("DESIGNER")}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <ShoppingBag className="h-8 w-8 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl uppercase tracking-tighter">Designer</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Finding high-quality fabrics and verified producers.</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={cn(
              "cursor-pointer hover:border-primary transition-all duration-300 group border-2 rounded-3xl",
              role === "PRODUCER" ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-slate-100"
            )}
            onClick={() => handleRoleSelect("PRODUCER")}
          >
            <CardContent className="p-8 text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Store className="h-8 w-8 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xl uppercase tracking-tighter">Producer</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">Showcase your textiles and find fashion buyers.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between border-b pb-4">
        <Button variant="ghost" size="sm" onClick={() => setStep("ROLE")} type="button" className="font-bold hover:bg-transparent hover:text-primary p-0">
          ← Change Role
        </Button>
        <Badge variant="secondary" className="font-black italic lowercase px-4 py-1 text-[10px]">
          {role} registration
        </Badge>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl text-center font-medium">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold text-muted-foreground">Full Name</Label>
            <Input className="h-11 rounded-xl" {...register("fullName")} placeholder="Tunde Johnson" />
            {errors.fullName && <p className="text-[10px] font-medium text-destructive">{errors.fullName.message as string}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold text-muted-foreground">Email</Label>
            <Input className="h-11 rounded-xl" type="email" {...register("email")} placeholder="name@example.com" />
            {errors.email && <p className="text-[10px] font-medium text-destructive">{errors.email.message as string}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold text-muted-foreground">Phone Number</Label>
            <Input className="h-11 rounded-xl" {...register("phoneNumber")} placeholder="08012345678" />
            {errors.phoneNumber && <p className="text-[10px] font-medium text-destructive">{errors.phoneNumber.message as string}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase font-bold text-muted-foreground">Password</Label>
            <Input className="h-11 rounded-xl" type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && <p className="text-[10px] font-medium text-destructive">{errors.password.message as string}</p>}
          </div>
        </div>

        {role === "PRODUCER" && (
          <div className="space-y-6 pt-6 border-t">
            <h4 className="text-lg font-display font-black text-primary italic lowercase tracking-tight">business details</h4>
            
            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold text-muted-foreground">Business Name</Label>
              <Input className="h-11 rounded-xl" {...register("businessName")} placeholder="Lagos Prints Ltd" />
              {errors.businessName && <p className="text-[10px] font-medium text-destructive">{errors.businessName.message as string}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold text-muted-foreground">Business Description</Label>
              <Textarea 
                className="rounded-xl min-h-[100px]" 
                {...register("description")} 
                placeholder="Tell us about your textiles, specialties, and business history..." 
              />
              {errors.description && <p className="text-[10px] font-medium text-destructive">{errors.description.message as string}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-muted-foreground">State</Label>
                <Select onValueChange={(v) => setValue("locationState", v)}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {NIGERIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.locationState && <p className="text-[10px] font-medium text-destructive">{errors.locationState.message as string}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-muted-foreground">City</Label>
                <Input className="h-11 rounded-xl" {...register("locationCity")} placeholder="Ikeja" />
                {errors.locationCity && <p className="text-[10px] font-medium text-destructive">{errors.locationCity.message as string}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase font-bold text-muted-foreground">Business Address</Label>
              <Input className="h-11 rounded-xl" {...register("address")} placeholder="12 Commercial Ave, Yaba" />
              {errors.address && <p className="text-[10px] font-medium text-destructive">{errors.address.message as string}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-muted-foreground">WhatsApp Number</Label>
                <Input className="h-11 rounded-xl" {...register("whatsappNumber")} placeholder="08012345678" />
                {errors.whatsappNumber && <p className="text-[10px] font-medium text-destructive">{errors.whatsappNumber.message as string}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-xs uppercase font-bold text-muted-foreground">Min Order Qty (MOQ)</Label>
                <Input 
                  className="h-11 rounded-xl" 
                  type="number" 
                  {...register("minimumOrderQuantity", { valueAsNumber: true })} 
                  placeholder="10" 
                />
                {errors.minimumOrderQuantity && <p className="text-[10px] font-medium text-destructive">{errors.minimumOrderQuantity.message as string}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="deliveryAvailable" 
                checked={watch("deliveryAvailable")}
                onCheckedChange={(checked) => setValue("deliveryAvailable", !!checked)}
              />
              <Label htmlFor="deliveryAvailable" className="text-sm font-bold cursor-pointer">Delivery available nationwide</Label>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-xs uppercase font-bold text-muted-foreground">Fabric Specialties</Label>
              <div className="grid grid-cols-2 gap-3 border rounded-2xl p-4 max-h-48 overflow-y-auto custom-scrollbar bg-slate-50/50">
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
                    <label htmlFor={`reg-fabric-${fabric}`} className="text-sm font-medium cursor-pointer">{fabric}</label>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                <Input 
                  placeholder="Add other fabric..." 
                  value={customFabric}
                  onChange={(e) => setCustomFabric(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddCustomFabric()
                    }
                  }}
                  className="h-10 rounded-xl"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddCustomFabric}
                  className="h-10 rounded-xl px-4"
                >
                  Add
                </Button>
              </div>
              {errors.fabricTypes && <p className="text-[10px] font-medium text-destructive">{errors.fabricTypes.message as string}</p>}
            </div>
          </div>
        )}
      </div>

      <Button className="w-full h-14 text-lg font-bold rounded-xl shadow-xl shadow-primary/20 mt-8" type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            Complete Registration
            <ArrowRight className="ml-2 h-5 w-5" />
          </>
        )}
      </Button>
    </form>
  )
}
