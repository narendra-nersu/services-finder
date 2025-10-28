import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Briefcase } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

// ✅ Define enum type directly from Supabase schema
type ServiceType = Database["public"]["Enums"]["service_type"];

const AddWorker = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // ✅ Properly typed form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    occupation: "" as ServiceType | "",
    experience: "",
    description: "",
  });

  const occupations: ServiceType[] = [
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

  const cities = [
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

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to add a service listing.",
          variant: "destructive",
        });
        navigate("/login");
      } else {
        setIsAuthenticated(true);
        setUserId(session.user.id);

        // Pre-fill user info
        supabase
          .from("profiles")
          .select("email, full_name")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setFormData((prev) => ({
                ...prev,
                email: data.email || "",
                full_name: data.full_name || "",
              }));
            }
          });
      }
    });

    // Handle auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      toast({
        title: "Error",
        description: "User not authenticated. Please log in again.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (parseInt(formData.experience) < 0) {
      toast({
        title: "Invalid Experience",
        description: "Experience cannot be negative.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from("workers").insert([
        {
          user_id: userId,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          occupation: formData.occupation as ServiceType,
          experience: parseInt(formData.experience),
          description: formData.description || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your service listing has been created!",
      });
      navigate("/dashboard");
    } catch (error: unknown) {
  if (error instanceof Error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  } else {
    toast({
      title: "Error",
      description: "Failed to create listing. Please try again.",
      variant: "destructive",
    });
  }
} finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Add Your Service</CardTitle>
              <CardDescription>
                Register as a service provider and connect with customers in your area
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Select
                      value={formData.city}
                      onValueChange={(value) =>
                        handleSelectChange("city", value)
                      }
                      disabled={isLoading}
                    >
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
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Service Type *</Label>
                    <Select
                      value={formData.occupation}
                      onValueChange={(value) =>
                        handleSelectChange("occupation", value)
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {occupations.map((occupation) => (
                          <SelectItem key={occupation} value={occupation}>
                            {occupation.charAt(0).toUpperCase() +
                              occupation.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      min="0"
                      placeholder="e.g., 5"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Tell customers about your services, skills, and experience..."
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating listing...
                    </>
                  ) : (
                    "Create Service Listing"
                  )}
                </Button>
              </CardContent>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddWorker;
