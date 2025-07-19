import Section from "@/components/Section";
import { fetchUrlDetails, updateClicksForUrl } from "@/lib/supabase/url-utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectLink = () => {
  const { id } = useParams();
  useEffect(() => {
    topLevelFunc(id!)
  }, [id]);
  return (
    <Section className="justify-center items-center">
      <h1>Redirecting you to the original link...</h1>
    </Section>
  );
};

export default RedirectLink;

async function topLevelFunc(id: string) {
  const urlDetails = await fetchUrlDetails(id);
  await updateClicksForUrl(urlDetails.id);
  window.location.href = urlDetails.original_url!;
}
