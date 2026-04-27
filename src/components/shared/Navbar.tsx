import { Link } from "react-router-dom"
import { useState } from "react"
import { ShoppingBag, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useCart } from "@/hooks/useCart"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { totalItems } = useCart()
  const itemCount = totalItems()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-3xl font-display font-black text-primary lowercase tracking-tighter">
          <span className="italic">fab</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/marketplace" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-widest">
            Marketplace
          </Link>

          <Link to="/cart" className="relative group">
            <ShoppingBag className="h-6 w-6 text-slate-600 group-hover:text-primary transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="font-bold text-slate-600" asChild>
                <Link to="/dashboard">
                  <User className="mr-2 h-4 w-4" />
                  {user?.fullName.split(' ')[0]}
                </Link>
              </Button>
              <Button onClick={logout} variant="outline" size="sm">Logout</Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="font-bold text-slate-600" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="font-bold shadow-lg shadow-primary/20" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white p-4 space-y-4 animate-in slide-in-from-top">
          <Link
            to="/marketplace"
            className="block text-lg font-bold text-slate-600"
            onClick={() => setIsOpen(false)}
          >
            Marketplace
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block py-2 font-bold" onClick={() => setIsOpen(false)}>Profile</Link>
                <Button onClick={() => { logout(); setIsOpen(false); }} variant="outline" className="w-full">Logout</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="w-full justify-start font-bold" asChild>
                  <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button className="w-full font-bold" asChild>
                  <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
