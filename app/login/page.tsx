"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { Wrench } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push("/dashboard");
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      alert("Welcome back!");
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold text-white">
            Services Finder
          </Link>
        </div>
      </nav>

      {/* Login Card */}
      <div className="container my-auto py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <div className="bg-primary-subtle p-3 rounded-circle d-inline-block">
                    <Wrench className="text-primary" size={32} />
                  </div>
                  <h3 className="fw-bold mt-3">Sign In</h3>
                  <p className="text-muted">Welcome back to Services Finder</p>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>

                  <div className="text-center mt-3">
                    <Link href="/forgot-password" className="text-decoration-none">
                      Forgot your password?
                    </Link>
                  </div>

                  <div className="text-center mt-4 text-muted">
                    Don`t have an account?{" "}
                    <Link href="/register" className="fw-semibold text-primary text-decoration-none">
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <small>© {new Date().getFullYear()} Services Finder. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}
