import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";

const Home = () => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted URL:", url);
    // You can add your shortening logic here
  };

  return (
    <Section className="gap-12 justify-center items-center">
      <div className="text-center">
        <h1 className="text-5xl font-semibold text-foreground mb-2">
          Shorten Your URL
        </h1>
        <p className="text-muted-foreground max-w-8/12 mx-auto">
          Enter your long URL below and we’ll generate a shorter one for you.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 w-6/12">
        <Input
          type="url"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 placeholder:text-xs"
          required
        />
        <Button type="submit">Shorten</Button>
      </form>
    </Section>
  );
};

export default Home;
