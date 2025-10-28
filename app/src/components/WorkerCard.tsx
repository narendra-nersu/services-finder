import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Phone, Mail, MapPin, Briefcase } from "lucide-react";

export interface WorkerCardProps {
  worker: {
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
  };
  onBook: (workerId: string) => void;
}

export const WorkerCard = ({ worker, onBook }: WorkerCardProps) => {
  const {
    id,
    full_name,
    email,
    phone,
    city,
    occupation,
    experience,
    description,
    average_rating,
    total_ratings,
  } = worker;

  return (
    <Card className="transition-shadow hover:shadow-lg border border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {full_name}
        </CardTitle>
        <p className="text-sm text-muted-foreground capitalize flex items-center gap-1">
          <Briefcase className="h-4 w-4 text-primary" />
          {occupation}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {description}
          </p>
        )}

        <div className="text-sm space-y-1">
          <p className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{city}</span>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span>{phone}</span>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4 text-primary" />
            <span>{email}</span>
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            🧰 Experience: <span>{experience} years</span>
          </p>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          <span className="font-medium">{average_rating.toFixed(1)}</span>
          <span className="text-muted-foreground">
            ({total_ratings} {total_ratings === 1 ? "review" : "reviews"})
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => onBook(id)}
          className="w-full bg-primary text-white hover:bg-primary-hover transition-all"
        >
          Book Service
        </Button>
      </CardFooter>
    </Card>
  );
};
