import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/store/global-state";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useGlobalContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  const data = new FormData(e.currentTarget);
  const url = data.get("url") as string;

    if (user) {
      navigate(`/dashboard?createNew=${url}`);
    } else {
      navigate(`/auth/login?createNew=${url}`);
    }
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
          placeholder="Enter your very long URL"
          name="url"
          className="flex-1 placeholder:text-xs"
          required
        />
        <Button type="submit">Shorten</Button>
      </form>
    </Section>
  );
};

export default Home;
