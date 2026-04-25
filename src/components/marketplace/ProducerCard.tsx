import { MapPin, Star, ShieldCheck, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import type { ProducerProfile } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatNaira, getWhatsAppLink } from "@/lib/utils"

interface ProducerCardProps {
  producer: ProducerProfile
}

export function ProducerCard({ producer }: ProducerCardProps) {
  const whatsappUrl = getWhatsAppLink(producer.whatsappNumber, `Hello ${producer.businessName}, I saw your profile on fab.`)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        {producer.profileImageUrl ? (
          <img 
            src={producer.profileImageUrl} 
            alt={producer.businessName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Image
          </div>
        )}
        {producer.isVerified && (
          <Badge variant="success" className="absolute top-2 right-2 gap-1">
            <ShieldCheck className="h-3 w-3" />
            Verified
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg line-clamp-1">{producer.businessName}</h3>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
            <Star className="h-4 w-4 fill-current" />
            {producer.ratingAverage.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {producer.locationCity}, {producer.locationState}
        </div>

        <div className="flex flex-wrap gap-1">
          {producer.fabricTypes.slice(0, 3).map((type) => (
            <Badge key={type} variant="secondary" className="text-[10px] uppercase tracking-wider">
              {type}
            </Badge>
          ))}
          {producer.fabricTypes.length > 3 && (
            <span className="text-[10px] text-muted-foreground">+{producer.fabricTypes.length - 3} more</span>
          )}
        </div>

        <div className="pt-2 border-t flex justify-between items-baseline">
          <span className="text-xs text-muted-foreground uppercase">From</span>
          <span className="font-bold text-primary">
            {producer.priceRangeMin ? formatNaira(producer.priceRangeMin) : "Contact for Price"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link to={`/producer/${producer.id}`}>Profile</Link>
        </Button>
        <Button size="sm" className="flex-1 gap-1 bg-emerald-600 hover:bg-emerald-700" asChild>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-4 w-4" />
            Chat
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
