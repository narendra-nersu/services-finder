"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Shield } from "lucide-react";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const cities = [
    "Kurnool",
    "Nellore",
    "Vishakhapatnam",
    "Vijayawada",
    "Guntur",
    "Eluru",
    "Ongole",
    "Tirumala",
    "Rajahmundry",
    "Kakinada",
  ];

  const handleSearch = () => {
    if (selectedCity) router.push(`/dashboard?city=${selectedCity}`);
    else router.push("/dashboard");
  };

  return (
    <>
      {/* ✅ Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold text-white">
            Services Finder
          </Link>
          <div>
            {isAuthenticated ? (
              <Link href="/dashboard" className="btn btn-light">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="btn btn-light me-2">
                  Login
                </Link>
                <Link href="/register" className="btn btn-outline-light">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Hero Section */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-5 fw-bold mb-3">
            Find Trusted Services Near You
          </h1>
          <p className="lead mb-4 text-muted">
            Connect with skilled professionals — mechanics, plumbers,
            electricians, and more. Anytime, anywhere.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-6">
              <select
                className="form-select form-select-lg mb-3"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Select your city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn btn-primary btn-lg" onClick={handleSearch}>
            Find Services
          </button>
        </div>
      </section>

      {/* ✅ About Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">How Services Finder Helps You</h2>
          <p className="text-muted mb-5">
            Imagine your car breaks down in an unknown city. Services Finder
            connects you instantly with verified professionals nearby.
          </p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-sm p-4 border-0">
                <h5 className="fw-semibold">Easy Search</h5>
                <p className="text-muted">
                  Find professionals quickly based on your city and need.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4 border-0">
                <h5 className="fw-semibold">Verified Ratings</h5>
                <p className="text-muted">
                  Check reviews and ratings before you hire anyone.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm p-4 border-0">
                <h5 className="fw-semibold">Quick Contact</h5>
                <p className="text-muted">
                  Get instant contact details and reach out directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ CTA Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <Shield size={64} className="mb-3" />
          <h2 className="fw-bold mb-3">
            Ready to Find Your Service Provider?
          </h2>
          <p className="mb-4">
            Join thousands of customers who found reliable services.
          </p>

          {isAuthenticated ? (
            <Link href="/dashboard" className="btn btn-light btn-lg">
              Browse Services
            </Link>
          ) : (
            <>
              <Link href="/register" className="btn btn-light btn-lg me-3">
                Get Started
              </Link>
              <Link href="/login" className="btn btn-outline-light btn-lg">
                Sign In
              </Link>
            </>
          )}
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <small>
            © {new Date().getFullYear()} Services Finder. All rights reserved.
          </small>
        </div>
      </footer>
    </>
  );
}
