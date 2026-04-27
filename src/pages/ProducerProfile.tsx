import { useParams, Link } from "react-router-dom"
import { useState } from "react"
import { MapPin, Star, ShieldCheck, MessageCircle, Package, Clock, ShoppingBag, Check } from "lucide-react"
import { useProducer } from "@/hooks/useMarketplace"
import { useCart } from "@/hooks/useCart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatNaira, getWhatsAppLink, formatPhoneNG, cn } from "@/lib/utils"

export default function ProducerProfile() {
  const { id } = useParams<{ id: string }>()
  const { data: producer, isLoading } = useProducer(id!)
  const { addItem } = useCart()
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({})

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground">Loading business profile...</p>
      </div>
    )
  }

  if (!producer) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Profile Not Found</h2>
        <Button asChild className="mt-4"><Link to="/marketplace">Back to Marketplace</Link></Button>
      </div>
    )
  }

  const whatsappUrl = getWhatsAppLink(producer.whatsappNumber)

  // Generate mock fabric styles based on their specialties
  const mockStyles = producer.fabricTypes.map((type, idx) => ({
    id: `${producer.id}-style-${idx}`,
    name: `${type} - ${["Premium Wax", "Hand-Dyed", "Classic Weave", "Heavy Duty"][idx % 4]}`,
    price: (producer.priceRangeMin || 2500) + (idx * 500),
    imageUrl: `https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=400&sig=${idx}`,
    description: `High-quality ${type.toLowerCase()} directly from ${producer.businessName}. Perfect for traditional wear and modern fashion.`
  }))

  const handleAddToCart = (style: any) => {
    addItem({
      id: style.id,
      name: style.name,
      price: style.price,
      quantity: 1,
      imageUrl: style.imageUrl,
      producerName: producer.businessName
    })
    
    setAddedItems({ ...addedItems, [style.id]: true })
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [style.id]: false }))
    }, 2000)
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Cover */}
      <div className="h-64 md:h-96 bg-primary relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-10%] w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        
        <div className="w-full px-6 md:px-32 pt-8 relative z-10">
          <Link to="/marketplace" className="inline-flex items-center text-indigo-100 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest gap-2">
            <span className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">←</span>
            Back to Marketplace
          </Link>
        </div>

        <div className="w-full px-6 md:px-32 h-full flex items-end pb-12 relative z-10">
          <div className="translate-y-20 flex flex-col md:flex-row items-center md:items-end gap-8 w-full text-center md:text-left">
            <div className="h-44 w-44 rounded-[2rem] border-8 border-white bg-white shadow-2xl overflow-hidden shrink-0 transform hover:scale-105 transition-transform duration-500">
              {producer.profileImageUrl ? (
                <img src={producer.profileImageUrl} alt={producer.businessName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-50 text-primary/20 font-black text-6xl">
                  {producer.businessName[0]}
                </div>
              )}
            </div>
            
            <div className="pb-4 space-y-3 flex-grow">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <h1 className="text-4xl md:text-6xl font-display font-black text-white tracking-tighter drop-shadow-sm">
                  {producer.businessName}
                </h1>
                {producer.isVerified && (
                  <Badge className="bg-emerald-500 hover:bg-emerald-500 text-white border-none px-3 py-1 font-bold uppercase text-[10px] tracking-widest gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-indigo-100">
                <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
                  <MapPin className="h-4 w-4 text-secondary" />
                  {producer.locationCity}, {producer.locationState}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold tracking-tight">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span>{producer.ratingAverage.toFixed(1)} <span className="opacity-60 font-medium">Rating</span></span>
                </div>
              </div>
            </div>

            <div className="pb-4 hidden md:block">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white h-14 px-8 rounded-2xl shadow-xl shadow-secondary/20 gap-3 font-bold text-lg transition-all hover:translate-y-[-2px]" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-6 w-6" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-6 md:px-32 mt-32 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          {/* Shop Sections */}
          <section className="space-y-6">
            <h2 className="text-3xl font-display font-black text-primary italic lowercase tracking-tight">fabrics for sale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mockStyles.map((style) => (
                <div key={style.id} className="group bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                  <div className="h-56 relative overflow-hidden">
                    <img src={style.imageUrl} alt={style.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 backdrop-blur-md text-primary border-none shadow-lg font-black italic lowercase">
                        {formatNaira(style.price)} / yd
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{style.name}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{style.description}</p>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(style)}
                      disabled={addedItems[style.id]}
                      className={cn(
                        "w-full h-11 rounded-xl font-bold gap-2 shadow-lg transition-all",
                        addedItems[style.id] 
                          ? "bg-emerald-500 hover:bg-emerald-500 shadow-emerald-200" 
                          : "shadow-primary/20"
                      )}
                    >
                      {addedItems[style.id] ? (
                        <>
                          <Check size={18} />
                          Added to Bag
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} />
                          Add to Bag
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-display font-black text-primary italic lowercase tracking-tight">about the business</h2>
            <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{producer.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">MOQ</p>
                  <div className="flex items-center gap-2 font-bold">
                    <Package className="h-4 w-4 text-primary" />
                    {producer.minimumOrderQuantity} units
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Pricing</p>
                  <div className="font-bold text-primary">
                    {producer.priceRangeMin ? formatNaira(producer.priceRangeMin) : "Contact"}+
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Delivery</p>
                  <div className="flex items-center gap-2 font-bold">
                    <Clock className="h-4 w-4 text-primary" />
                    {producer.deliveryAvailable ? "Available" : "Pickup Only"}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Contact Card */}
        <div className="space-y-6">
          <Card className="sticky top-24 rounded-[2rem] border-none shadow-2xl shadow-primary/5 overflow-hidden">
            <CardContent className="p-8 space-y-8">
              <h3 className="font-display font-black text-2xl italic lowercase text-primary">contact details</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-black uppercase text-[10px] tracking-widest text-muted-foreground mb-1">Business Address</p>
                    <p className="font-bold text-slate-700">{producer.address}, {producer.locationCity}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                    <MessageCircle className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="text-sm">
                    <p className="font-black uppercase text-[10px] tracking-widest text-muted-foreground mb-1">WhatsApp Business</p>
                    <p className="font-bold text-slate-700">{formatPhoneNG(producer.whatsappNumber)}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 md:hidden">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-14 rounded-2xl font-bold gap-2 shadow-xl shadow-emerald-200" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-6 w-6" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
                <p className="text-[10px] text-muted-foreground font-medium">
                  Mention you found them on <span className="italic font-black text-primary">fab</span> for special designer rates!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
