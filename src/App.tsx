import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Navbar } from "@/components/shared/Navbar"
import { Footer } from "@/components/shared/Footer"
import Marketplace from "@/pages/Marketplace"
import ProducerProfile from "@/pages/ProducerProfile"
import { RegisterForm } from "@/components/forms/RegisterForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const queryClient = new QueryClient()

function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative min-h-[85vh] flex items-center bg-slate-900 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/fabrics/hero.png"
            alt="Nigerian Fabrics"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="w-full px-6 md:px-32 z-10">
          <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left duration-1000">
            <Badge className="bg-secondary text-white border-none px-4 py-1.5 uppercase tracking-widest text-[10px]">
              The #1 Textile Marketplace in Nigeria
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-white leading-tight">
              Find the perfect <span className="text-secondary italic">Fabric</span> on <span className="italic">fab</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              Connecting fashion designers with verified Nigerian producers and suppliers of Ankara, Adire, Lace, and more. Authentic textiles, directly from the source.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20" asChild>
                <Link to="/marketplace">Find Producers</Link>
              </Button>
              <Button size="lg" className="h-14 px-8 text-lg font-bold border-white text-white hover:bg-white hover:text-slate-900 transition-all" asChild>
                <Link to="/register">Join as Producer</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Fabric Category */}
      <div className="w-full px-6 md:px-32 py-20 space-y-12 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-display font-black text-primary italic lowercase tracking-tight">fabric categories</h2>
            <p className="text-muted-foreground max-w-xl">Discover the richness of Nigerian textiles through our curated collections.</p>
          </div>
          <Button variant="link" asChild className="text-primary font-bold p-0">
            <Link to="/marketplace">View All Fabrics →</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: "Ankara", img: "/fabrics/ankara.png", desc: "Vibrant wax prints" },
            { name: "Adire", img: "/fabrics/adire.png", desc: "Traditional indigo tie-dye" },
            { name: "Aso-oke", img: "/fabrics/aso-oke.png", desc: "Premium hand-woven cloth" },
            { name: "Lace", img: "/fabrics/lace.png", desc: "Luxurious embroidered fabrics" },
            { name: "Silk", img: "/fabrics/silk.png", desc: "Smooth & elegant crepe" },
            { name: "Velvet", img: "/fabrics/velvet.png", desc: "Rich & plush textures" },
            { name: "Chiffon", img: "/fabrics/chiffon.png", desc: "Lightweight & flowing" },
            { name: "Brocade", img: "/fabrics/silk.png", desc: "Intricate woven patterns" },
          ].map((fabric) => (
            <Link
              key={fabric.name}
              to={`/marketplace?fabric=${fabric.name}`}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={fabric.img}
                alt={fabric.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-display font-bold">{fabric.name}</h3>
                <p className="text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                  {fabric.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Browse by Location */}
      <div className="w-full px-6 md:px-32 py-24 space-y-12 bg-slate-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-display font-black text-primary italic lowercase tracking-tight">find by location</h2>
            <p className="text-muted-foreground max-w-xl">Connect with verified producers in your city for faster delivery.</p>
          </div>
          <Button variant="link" asChild className="text-primary font-bold p-0">
            <Link to="/marketplace">View All Cities →</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {[
            { name: "Lagos", img: "/fabrics/lagos.png", state: "Lagos" },
            { name: "Abuja", img: "/fabrics/abuja.png", state: "Federal Capital Territory" },
            { name: "Kano", img: "/fabrics/kano.png", state: "Kano" },
            { name: "Ibadan", img: "/fabrics/ibadan.png", state: "Oyo" },
            { name: "Rivers", img: "/fabrics/rivers.png", state: "Rivers" },
          ].map((city) => (
            <Link
              key={city.name}
              to={`/marketplace?state=${city.state}`}
              className="group relative aspect-square sm:h-96 rounded-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border-4 border-white"
            >
              <img
                src={city.img}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-primary/40 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-display font-black text-white drop-shadow-lg tracking-tighter uppercase">{city.name}</h3>
                  <div className="h-1 w-0 bg-white mx-auto group-hover:w-full transition-all duration-500 mt-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import { LoginForm } from "@/components/forms/LoginForm"
import Dashboard from "@/pages/Dashboard"
import CartPage from "@/pages/CartPage"
import { useAuth } from "@/hooks/useAuth"

// Auth Page Wrapper
function AuthPage({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6 md:px-32 bg-slate-50">
      <Card className="w-full max-w-lg shadow-xl border-none rounded-3xl overflow-hidden">
        <CardHeader className="text-center pb-2 pt-8">
          <CardTitle className="text-3xl font-display font-black text-primary italic lowercase tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/producer/:id" element={<ProducerProfile />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/register" element={
                <AuthPage title="create account">
                  <RegisterForm />
                </AuthPage>
              } />
              <Route path="/login" element={
                <AuthPage title="welcome back">
                  <LoginForm />
                </AuthPage>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
