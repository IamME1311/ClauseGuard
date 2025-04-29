import Link from "next/link";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer py-12 bg-background border-t mt-8">
      <div className="container mx-auto px-4">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="footer-title text-lg font-bold mb-2">ClauseGuard</h3>
            <p className="text-muted-foreground mb-4">Legal AI assistant for modern legal professionals.</p>
            <div className="flex gap-3">
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter"><FaTwitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn"><FaLinkedin /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook"><FaFacebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram"><FaInstagram /></Link>
            </div>
          </div>
          <div>
            <h3 className="footer-title text-lg font-bold mb-2">Product</h3>
            <ul className="footer-links space-y-1">
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="#">Case Studies</Link></li>
              <li><Link href="#">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title text-lg font-bold mb-2">Resources</h3>
            <ul className="footer-links space-y-1">
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Documentation</Link></li>
              <li><Link href="#">API</Link></li>
              <li><Link href="#">Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-title text-lg font-bold mb-2">Company</h3>
            <ul className="footer-links space-y-1">
              <li><Link href="#">About Us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Legal</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} ClauseGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
