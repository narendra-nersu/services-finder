"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WorkerCard } from "@/components/WorkerCard";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Search, Briefcase, Loader2 } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Worker {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  experience: number;
  description?: string;
  average_rating: number;
  total_ratings: number;
  is_active: boolean;
}

export default function DashboardContent() {
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const cities = [
    "All Cities", "Kurnool", "Nellore", "Visakhapatnam", "Vijayawada",
    "Guntur", "Eluru", "Ongole", "Tirumala", "Rajahmundry", "Kakinada"
  ];

  const occupations = [
    "All Services", "Mechanic", "Plumber", "Electrician", "Carpenter",
    "Painter", "Cleaner", "Delivery", "Restaurant", "Chef",
    "Driver", "Gardener", "Other"
  ];

  const fetchWorkers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("workers")
        .select("*")
        .order("average_rating", { ascending: false });

      if (error) throw error;

      const formattedWorkers: Worker[] =
        data?.map((worker) => ({
          id: worker.id,
          full_name: worker.full_name,
          email: worker.email,
          phone: worker.phone,
          city: worker.city,
          occupation: worker.occupation,
          experience: worker.experience ?? 0,
          description: worker.description ?? "",
          average_rating: worker.average_rating ?? 0,
          total_ratings: worker.total_ratings ?? 0,
          is_active: worker.is_active ?? false,
        })) || [];

      setWorkers(formattedWorkers);
    } catch {
      toast({
        title: "Error",
        description: "Failed to load service providers. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const filterWorkers = useCallback(() => {
    let filtered = workers.filter((worker) => worker.is_active);

    if (selectedCity && selectedCity !== "All Cities") {
      filtered = filtered.filter(
        (worker) => worker.city.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    if (selectedOccupation && selectedOccupation !== "All Services") {
      filtered = filtered.filter(
        (worker) =>
          worker.occupation.toLowerCase() === selectedOccupation.toLowerCase()
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (worker) =>
          worker.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredWorkers(filtered);
  }, [workers, selectedCity, selectedOccupation, searchQuery]);

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

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  useEffect(() => {
    filterWorkers();
  }, [filterWorkers]);

  const handleBookService = (workerId: string) => {
    const worker = workers.find((w) => w.id === workerId);
    if (worker) {
      toast({
        title: "Contact Information",
        description: `Call ${worker.phone} or email ${worker.email} to book this service.`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl fw-bold mb-2">
            Find Service Providers
          </h1>
          <p className="text-muted-foreground">
            Browse and connect with skilled professionals in your area
          </p>
        </div>

        {/* ✅ Bootstrap Filters Section */}
        <div className="bg-light rounded-3 shadow-sm p-4 mb-5">
          <div className="row g-4">
            {/* City Dropdown */}
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold d-flex align-items-center gap-2">
                  <MapPin className="h-4 w-4" /> City
                </label>
                <select
                  className="form-select"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Type Dropdown */}
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold d-flex align-items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Service Type
                </label>
                <select
                  className="form-select"
                  value={selectedOccupation}
                  onChange={(e) => setSelectedOccupation(e.target.value)}
                >
                  {occupations.map((occupation) => (
                    <option key={occupation} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Box */}
            <div className="col-md-4">
              <div className="form-group">
                <label className="fw-semibold d-flex align-items-center gap-2">
                  <Search className="h-4 w-4" /> Search
                </label>
                <Input
                  placeholder="Search by name or description"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Workers Grid */}
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredWorkers.length > 0 ? (
          <div className="row g-4">
            {filteredWorkers.map((worker) => (
              <div key={worker.id} className="col-md-6 col-lg-4">
                <WorkerCard worker={worker} onBook={handleBookService} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-3" />
            <h3 className="h5 fw-semibold">No service providers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
