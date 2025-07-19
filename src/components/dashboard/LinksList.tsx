import { useDashboardContext } from "@/store/dashboard-state";
import { Card } from "@/components/ui/card";
import LinkCard from "./LinkCard";

const LinksList = () => {
  const { urls } = useDashboardContext();

  const isLoading = !urls;

  return (
    <section className="grid gap-4">
      <ul>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card
                key={`skeleton-${i}`}
                className="flex !flex-row items-center gap-4 p-3 animate-pulse bg-muted"
              >
                <div className="w-16 h-16 bg-muted-foreground/20  rounded mr-auto" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="h-4 w-3/4 bg-muted-foreground/20 rounded" />
                  <div className="h-3 w-1/2 bg-muted-foreground/10 rounded" />
                </div>
              </Card>
            ))
          : urls.map((url) => {
              return (
                <li key={url.id} className="mb-4">
                  <LinkCard url={url} />
                </li>
              );
            })}
      </ul>
    </section>
  );
};

export default LinksList;
