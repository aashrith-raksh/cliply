import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "@/store/global-state";
import { BackgroundLines } from "@/components/ui/background-lines";

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
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <>
        <div className="text-center mb-8">
          <h1 className="text-5xl font-semibold text-foreground mb-2">
            Shorten Your URL
          </h1>
          <p className="text-muted-foreground max-w-8/12 mx-auto">
            Enter your long URL below and we’ll generate a shorter one for you.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 w-6/12 z-40">
          <Input
            type="url"
            placeholder="Enter your very long URL"
            name="url"
            className="flex-1 placeholder:text-xs"
            required
          />
          <Button type="submit">Shorten</Button>
        </form>
      </>
    </BackgroundLines>
  );
};

export default Home;
