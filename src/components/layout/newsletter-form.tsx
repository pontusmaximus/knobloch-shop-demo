"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-lg gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ihre@email.de"
        className="h-12 bg-white"
      />
      <Button type="submit" variant="accent" size="lg" disabled={submitted}>
        {submitted ? (
          <>
            <Check className="h-4 w-4" />
            Danke!
          </>
        ) : (
          "Abonnieren"
        )}
      </Button>
    </form>
  );
}
