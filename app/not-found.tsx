"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error — Page not found:", pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 text-center px-4">
      <div className="max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <AlertTriangle className="h-10 w-10 text-primary" />
          </div>
        </div>

        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <Link href="/">
          <Button variant="default" size="lg">
            Go Back Home
          </Button>
        </Link>

        <p className="mt-4 text-sm text-muted-foreground">
          Tried to visit: <code className="bg-muted px-2 py-1 rounded">{pathname}</code>
        </p>
      </div>
    </div>
  );
}
