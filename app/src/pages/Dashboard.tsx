"use client";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WorkerCard } from "@/components/WorkerCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Search, Briefcase, Loader2 } from "lucide-react";

// ✅ Worker type (mirrors WorkerCard, ensures data consistency)
interface Worker {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  occupation: string;
  experience: number;
  description?: string;
  average_rating: number; // normalized to number (no null)
  total_ratings: number;
  is_active: boolean; // normalized to boolean
}

const Dashboard = () => {
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
    "All Cities",
    "kurnool",
    "Nellore",
    "Viskhapatnam",
    "vijayawada",
    "Guntur",
    "Eluru",
    "ongole",
    "Tirumala",
    "Rajahmundry",
    "Kakinada",
  ];

  const occupations = [
    "All Services",
    "mechanic",
    "plumber",
    "electrician",
    "carpenter",
    "painter",
    "cleaner",
    "delivery",
    "restaurant",
    "chef",
    "driver",
    "gardener",
    "other",
  ];

  // ✅ useCallback fixes dependency warning
  const fetchWorkers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("workers")
        .select("*")
        .order("average_rating", { ascending: false });

      if (error) throw error;

      // ✅ Normalize nullable Supabase fields to match Worker interface
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
        (worker) => worker.occupation === selectedOccupation
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Find Service Providers
          </h1>
          <p className="text-muted-foreground">
            Browse and connect with skilled professionals in your area
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                City
              </label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Service Type
              </label>
              <Select
                value={selectedOccupation}
                onValueChange={setSelectedOccupation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {occupations.map((occupation) => (
                    <SelectItem key={occupation} value={occupation}>
                      {occupation.charAt(0).toUpperCase() + occupation.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </label>
              <Input
                placeholder="Search by name or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Workers Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredWorkers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                onBook={handleBookService}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              No service providers found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
