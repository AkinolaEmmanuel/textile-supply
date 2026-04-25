import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-xl font-display font-black text-primary italic lowercase tracking-tight">fab</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The modern marketplace for Nigerian textiles. Connecting designers with top-tier producers.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/marketplace?fabric=Ankara">Find Ankara</Link></li>
              <li><Link to="/marketplace?fabric=Adire">Find Adire</Link></li>
              <li><Link to="/marketplace?fabric=Aso-oke">Find Aso-oke</Link></li>
              <li><Link to="/marketplace">View All Producers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} <span className="italic font-bold">fab</span>. Made with ❤️ in Nigeria.</p>
        </div>
      </div>
    </footer>
  )
}
