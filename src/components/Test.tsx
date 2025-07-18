import React, { useRef } from "react";
import Section from "./Section";
import { Button } from "./ui/button";
import { insertUrl } from "@/lib/supabase/url-utils";
import { useGlobalContext } from "@/store/global-state";
import { Input } from "./ui/input";

const Test = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useGlobalContext();
  async function createNewURl() {
    try {
      const file = fileInputRef.current?.files?.[0];
      const res = await insertUrl(
        {
          longUrl: "https://www.google.com",
          customUrl: "dummy-url",
          title: "Test-Google-URL",
          userId: user!.id,
        },
        file!
      );

      console.log(res.data);
    } catch (error) {
      console.log((error as Error).message);
    }
  }
  return (
    <Section className="justify-center items-center">
      <Button onClick={createNewURl}>URL</Button>
      <Input type="file" ref={fileInputRef} />
    </Section>
  );
};

export default Test;
