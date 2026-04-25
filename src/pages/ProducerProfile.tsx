import { useParams, Link } from "react-router-dom"
import { MapPin, Star, ShieldCheck, MessageCircle, ArrowLeft, Package, Clock, Phone } from "lucide-react"
import { useProducer } from "@/hooks/useMarketplace"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatNaira, getWhatsAppLink, formatPhoneNG } from "@/lib/utils"

export default function ProducerProfile() {
  const { id } = useParams<{ id: string }>()
  const { data: producer, isLoading } = useProducer(id!)

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

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Cover */}
      <div className="h-64 md:h-80 bg-indigo-900 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="translate-y-12 flex flex-col md:flex-row items-end gap-6 w-full">
            <div className="h-40 w-40 rounded-2xl border-4 border-white bg-white shadow-xl overflow-hidden shrink-0">
              {producer.profileImageUrl ? (
                <img src={producer.profileImageUrl} alt={producer.businessName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-4xl">
                  {producer.businessName[0]}
                </div>
              )}
            </div>
            <div className="pb-4 space-y-2 flex-grow">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white drop-shadow-md">
                  {producer.businessName}
                </h1>
                {producer.isVerified && (
                  <Badge variant="success" className="gap-1 bg-emerald-500 hover:bg-emerald-500 border-none">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-indigo-100 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {producer.locationCity}, {producer.locationState}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{producer.ratingAverage.toFixed(1)} Rating</span>
                </div>
              </div>
            </div>
            <div className="pb-4 hidden md:block">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-lg gap-2" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Contact on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 mt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-8 shadow-sm border space-y-4">
            <h2 className="text-xl font-bold">About the Business</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{producer.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">MOQ</p>
                <div className="flex items-center gap-2 font-medium">
                  <Package className="h-4 w-4 text-primary" />
                  {producer.minimumOrderQuantity} units
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Price Range</p>
                <div className="font-bold text-primary">
                  {producer.priceRangeMin ? formatNaira(producer.priceRangeMin) : "Contact"} - {producer.priceRangeMax ? formatNaira(producer.priceRangeMax) : "Price"}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Delivery</p>
                <div className="flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4 text-primary" />
                  {producer.deliveryAvailable ? "Available" : "Pickup Only"}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl p-8 shadow-sm border space-y-4">
            <h2 className="text-xl font-bold">Fabric Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {producer.fabricTypes.map(type => (
                <Badge key={type} variant="secondary" className="px-4 py-1.5 text-sm uppercase">
                  {type}
                </Badge>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Contact Card */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-bold text-lg">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">Business Address</p>
                    <p className="text-muted-foreground">{producer.address}, {producer.locationCity}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                    <MessageCircle className="h-4 w-4 text-slate-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold">WhatsApp</p>
                    <p className="text-muted-foreground">{formatPhoneNG(producer.whatsappNumber)}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 md:hidden">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2" asChild>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>

              <p className="text-[10px] text-center text-muted-foreground pt-4">
                Mention you found them on <span className="italic font-bold">fab</span> to help us grow!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
