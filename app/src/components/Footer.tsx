import { Wrench } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Services Finder</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting you with trusted service providers in your city. Find mechanics,
              plumbers, electricians, and more.
            </p>
          </div>

          {/* <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@servicesfinder.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Available nationwide</span>
              </div>
            </div>
          </div> */}

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/add-worker" className="hover:text-primary transition-colors">
                  Become a Provider
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Services Finder. All rights reserved.</p>
        </div>

        {/* Developer credit section */}
        <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
          <p>
            Developed by <span className="font-semibold">Narendra</span>
          </p>
          <div className="space-x-4">
            <a
              href="https://github.com/narendra-nersu"
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/narendra-nersu"
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
