import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useProducer } from "@/hooks/useMarketplace"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Package, 
  Settings, 
  LayoutDashboard, 
  ShoppingBag, 
  TrendingUp,
  Trash2,
  Edit2,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"

interface FabricStock {
  id: string
  name: string
  quantity: number
  price: number
  description: string
  imageUrl: string
}

export default function Dashboard() {
  const { user } = useAuth()
  const [fabrics, setFabrics] = useState<FabricStock[]>([
    { 
      id: "1", 
      name: "Ankara Prints", 
      quantity: 150, 
      price: 2500,
      description: "High-quality 100% cotton wax print with vibrant geometric patterns.",
      imageUrl: "/fabrics/ankara.png"
    },
    { 
      id: "2", 
      name: "Indigo Adire", 
      quantity: 45, 
      price: 5000,
      description: "Traditional hand-dyed indigo fabric from Abeokuta.",
      imageUrl: "/fabrics/adire.png"
    },
  ])
  
  const [isAdding, setIsAdding] = useState(false)
  const [newFabric, setNewFabric] = useState({ 
    name: "", 
    quantity: "", 
    price: "", 
    description: "", 
    imageUrl: "" 
  })

  const handleAddFabric = () => {
    if (!newFabric.name || !newFabric.quantity) return
    const fabric: FabricStock = {
      id: Math.random().toString(36).substr(2, 9),
      name: newFabric.name,
      quantity: Number(newFabric.quantity),
      price: Number(newFabric.price) || 0,
      description: newFabric.description,
      imageUrl: newFabric.imageUrl || "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800"
    }
    setFabrics([...fabrics, fabric])
    setNewFabric({ name: "", quantity: "", price: "", description: "", imageUrl: "" })
    setIsAdding(false)
  }

  const removeFabric = (id: string) => {
    setFabrics(fabrics.filter(f => f.id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-8 border-b">
          <h2 className="text-2xl font-display font-black text-primary italic lowercase">fab</h2>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <DashboardNavItem icon={<LayoutDashboard size={20} />} label="Overview" active />
          <DashboardNavItem icon={<Package size={20} />} label="My Fabrics" />
          <DashboardNavItem icon={<ShoppingBag size={20} />} label="Orders" />
          <DashboardNavItem icon={<TrendingUp size={20} />} label="Analytics" />
          <div className="pt-8 mt-8 border-t">
            <DashboardNavItem icon={<Settings size={20} />} label="Settings" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Header */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Producer Dashboard</h1>
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Verified</Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input placeholder="Search fabrics..." className="pl-10 h-10 w-64 rounded-xl border-slate-100" />
            </div>
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {user?.fullName[0]}
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-black text-primary italic lowercase">welcome back, {user?.fullName.split(' ')[0]}</h2>
            <p className="text-muted-foreground">Manage your textile inventory and track your business performance.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total Stock" value={fabrics.reduce((acc, curr) => acc + curr.quantity, 0)} icon={<Package />} color="bg-blue-500" />
            <StatCard label="Fabric Types" value={fabrics.length} icon={<LayoutDashboard />} color="bg-indigo-500" />
            <StatCard label="Active Orders" value={12} icon={<ShoppingBag />} color="bg-emerald-500" />
          </div>

          {/* Inventory Management Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-display font-black text-primary italic lowercase">my fabric stock</h3>
              <Button onClick={() => setIsAdding(!isAdding)} className="rounded-xl font-bold gap-2">
                <Plus size={18} />
                {isAdding ? "Cancel" : "Add New Fabric"}
              </Button>
            </div>

            {isAdding && (
              <Card className="border-2 border-primary/20 bg-primary/5 rounded-3xl animate-in zoom-in-95 duration-300">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <Label className="uppercase font-bold text-[10px] tracking-widest text-muted-foreground">Fabric Name</Label>
                      <Input 
                        placeholder="e.g. Ankara Wax Print" 
                        className="h-12 rounded-xl"
                        value={newFabric.name}
                        onChange={(e) => setNewFabric({ ...newFabric, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase font-bold text-[10px] tracking-widest text-muted-foreground">Quantity (Yards)</Label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        className="h-12 rounded-xl"
                        value={newFabric.quantity}
                        onChange={(e) => setNewFabric({ ...newFabric, quantity: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase font-bold text-[10px] tracking-widest text-muted-foreground">Price per Yard (₦)</Label>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        className="h-12 rounded-xl"
                        value={newFabric.price}
                        onChange={(e) => setNewFabric({ ...newFabric, price: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="uppercase font-bold text-[10px] tracking-widest text-muted-foreground">Image URL</Label>
                      <Input 
                        placeholder="https://..." 
                        className="h-12 rounded-xl"
                        value={newFabric.imageUrl}
                        onChange={(e) => setNewFabric({ ...newFabric, imageUrl: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2 lg:col-span-4 space-y-2">
                      <Label className="uppercase font-bold text-[10px] tracking-widest text-muted-foreground">Description</Label>
                      <Textarea 
                        placeholder="Describe the fabric's pattern, texture, and origin..." 
                        className="rounded-xl min-h-[100px]"
                        value={newFabric.description}
                        onChange={(e) => setNewFabric({ ...newFabric, description: e.target.value })}
                      />
                    </div>
                    <div className="lg:col-span-4 pt-4">
                      <Button onClick={handleAddFabric} className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20">
                        Confirm & Add to Stock
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Inventory List */}
            <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Fabric</th>
                    <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Quantity</th>
                    <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Price</th>
                    <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Status</th>
                    <th className="px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {fabrics.map((fabric) => (
                    <tr key={fabric.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-xl overflow-hidden border bg-slate-100 shrink-0">
                            {fabric.imageUrl ? (
                              <img src={fabric.imageUrl} alt={fabric.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-300">
                                <ImageIcon size={24} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-lg">{fabric.name}</div>
                            <div className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{fabric.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "h-2 w-2 rounded-full",
                            fabric.quantity < 25 ? "bg-red-500" : "bg-emerald-500"
                          )} />
                          <span className="font-bold">{fabric.quantity} Yards</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-medium text-slate-600">
                        ₦{fabric.price.toLocaleString()}
                      </td>
                      <td className="px-8 py-6">
                        {fabric.quantity < 25 ? (
                          <Badge variant="destructive" className="font-bold uppercase text-[10px]">Low Stock</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-emerald-100 font-bold uppercase text-[10px]">In Stock</Badge>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors">
                            <Edit2 size={18} />
                          </Button>
                          <Button 
                            onClick={() => removeFabric(fabric.id)}
                            variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function DashboardNavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl font-bold cursor-pointer transition-all",
      active ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 hover:bg-slate-50"
    )}>
      {icon}
      <span>{label}</span>
    </div>
  )
}

function StatCard({ label, value, icon, color }: { label: string, value: number | string, icon: React.ReactNode, color: string }) {
  return (
    <Card className="rounded-3xl border-none shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
      <CardContent className="p-8 flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</p>
          <div className="text-4xl font-display font-black text-primary">{value}</div>
        </div>
        <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-500", color)}>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
