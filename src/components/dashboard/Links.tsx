import { useDashboardContext } from "@/store/dashboard-state";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Copy, DownloadIcon } from "lucide-react";
import DeleteLink from "./DeleteLink";

const Links = () => {
  const { urls } = useDashboardContext();

  const isLoading = !urls;

  function downloadQR(imageUrl: string, filename: string) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <section className="grid gap-4">
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
            const linkLabel = url.custom_url || url.short_url;
            const linkHref = `/link/${url.id}`; // adjust this path as needed

            const fullLinkLabel = `https://shortner.com/${linkLabel}`;

            return (
              <Card
                key={url.id}
                className="flex !flex-row items-center gap-12 p-6"
              >
                {/* QR Image */}
                <CardHeader className="max-w-2/12 flex-1 p-2 bg-white rounded-sm flex">
                  <img
                    src={url.qr!}
                    alt={`QR for ${linkLabel}`}
                    className="w-full object-contain mx-auto"
                    width={96}
                    height={96}
                  />
                </CardHeader>
                <CardContent className="!px-0 flex-1">
                  <Link
                    to={linkHref}
                    className="flex flex-col flex-1 hover:underline cursor-pointer"
                  >
                    <h2 className="md:text-3xl md:mb-1 text-md font-semibold">
                      {url.title || "Untitled"}
                    </h2>
                  </Link>
                  <p className="mb-6 !text-blue-400 md:text-sm text-xs">
                    {fullLinkLabel}
                  </p>
                  <p className="text-muted-foreground text-xs">{`${url.original_url}`}</p>
                </CardContent>
                <CardFooter className="max-sm:flex max-sm:flex-col px-0">
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      navigator.clipboard.writeText(fullLinkLabel).then((_) => {
                        alert("link copied..😉🤝");
                      });
                    }}
                  >
                    <Copy />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => downloadQR(url.qr!, `qr-${url.title}.png`)}
                  >
                    <DownloadIcon />
                  </Button>
                  <DeleteLink urlId={url.id} />
                </CardFooter>
              </Card>
            );
          })}
    </section>
  );
};

export default Links;
