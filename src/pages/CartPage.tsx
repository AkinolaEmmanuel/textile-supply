import { Link } from "react-router-dom"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react"
import { formatNaira } from "@/lib/utils"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()
  const priceTotal = totalPrice()
  const itemsTotal = totalItems()

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center space-y-6">
        <div className="h-24 w-24 rounded-full bg-slate-50 flex items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-slate-300" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-black text-primary italic lowercase tracking-tight">your cart is empty</h2>
          <p className="text-muted-foreground max-w-xs">Looks like you haven't added any beautiful fabrics yet.</p>
        </div>
        <Button asChild className="h-12 px-8 rounded-xl font-bold shadow-lg shadow-primary/20">
          <Link to="/marketplace">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-6 md:px-32">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl font-display font-black text-primary italic lowercase tracking-tighter">your shopping bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-center group">
                <div className="h-24 w-24 rounded-2xl overflow-hidden shrink-0 border">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.producerName}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-400 hover:text-red-500 rounded-full h-8 w-8"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between items-end pt-2">
                    <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1 border">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-lg"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="text-primary font-black text-lg">{formatNaira(item.price * item.quantity)}</div>
                      <div className="text-[10px] text-muted-foreground font-medium">({formatNaira(item.price)} / yard)</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-primary/5 space-y-6 sticky top-24">
              <h3 className="font-display font-black text-2xl italic lowercase text-primary">order summary</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subtotal ({itemsTotal} items)</span>
                  <span>{formatNaira(priceTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-600">Calculated at next step</span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between">
                  <span className="font-bold text-lg">Estimated Total</span>
                  <span className="font-black text-2xl text-primary">{formatNaira(priceTotal)}</span>
                </div>
              </div>

              <Button className="w-full h-14 rounded-2xl font-black text-lg gap-3 shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
                Proceed to Checkout
                <ArrowRight size={20} />
              </Button>
              
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="h-1 w-1 bg-slate-300 rounded-full" />
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest text-center">
                  Secure checkout with Paystack
                </p>
                <div className="h-1 w-1 bg-slate-300 rounded-full" />
              </div>
            </div>

            <Link to="/marketplace" className="block text-center text-xs font-bold text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
