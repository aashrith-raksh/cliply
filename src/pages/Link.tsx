import { fetchUrlDetails } from "@/lib/supabase/url-utils";
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { URL_Type } from "..";
import Section from "@/components/Section";
import LinkCard from "@/components/link/LinkCard";
import LinkStats from "@/components/link/LinkStats";

const Link = () => {
  const { id: shortUrl } = useParams();
  const [url, setUrl] = useState<URL_Type | null>(null);

  useEffect(() => {
    fetchUrlDetails(shortUrl!).then((url) => setUrl(url));
  }, []);
  return (
    <Section className="!flex-row gap-8 bg-muotated">
      {url ? (
        <>
          <LinkCard url={url} variant={"vertical"} />
          <LinkStats />
        </>
      ) : (
        <p>Loading URL details...</p>
      )}
    </Section>
  );
};

export default Link;
