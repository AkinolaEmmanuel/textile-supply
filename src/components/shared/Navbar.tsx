import { Link } from "react-router-dom"
import { ShoppingBag, User, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-display font-black text-primary italic lowercase tracking-tight">fab</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link>
          <Link to="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
          {isAuthenticated && user?.role === "PRODUCER" && (
            <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
              <Button size="sm" asChild>
                <Link to={user?.role === "PRODUCER" ? "/dashboard" : "/profile"}>
                  <User className="mr-2 h-4 w-4" />
                  Account
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4 animate-in slide-in-from-top">
          <Link to="/marketplace" className="block text-lg font-medium">Marketplace</Link>
          <Link to="/how-it-works" className="block text-lg font-medium">How it Works</Link>
          <div className="pt-4 flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={logout} className="w-full">Logout</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
