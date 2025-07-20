import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import LinkActions from "./LinkActions";
import type { URL_Type } from "@/index";
import LinkContent from "./LinkContent";
import LinkQR from "./LinkQR";
import { cn } from "@/lib/utils";
const LinkCard = ({
  url,
  variant = "default",
}: {
  url: URL_Type;
  variant?: "default" | "vertical";
}) => {
  const linkLabel = url.custom_url || url.short_url;
  const fullLinkLabel = `${import.meta.env.VITE_BASE_URL}/${linkLabel}`;

  const linkHref = `/link/${linkLabel}`;

  const isVertical = variant === "vertical";

  return (
    <Card
      key={url.id}
      className={cn(
        "p-6",
        isVertical
          ? "gap-6 max-w-4/12 self-start"
          : "!flex-row items-center gap-12"
      )}
    >
      {isVertical ? null : (
        <CardHeader className="max-w-2/12 flex-1 p-2 bg-white rounded-sm flex">
          <LinkQR qrPublicUrl={url.qr!} linkTitle={url.title! ?? "Untitled"} />
        </CardHeader>
      )}
      <CardContent className={cn("!px-0 flex-1", isVertical && "max-w-full")}>
        <LinkContent
          fullLinkLabel={fullLinkLabel}
          linkTitle={url.title}
          linkHref={linkHref}
          originalUrl={url.original_url!}
        />
      </CardContent>
      <CardFooter
        className={cn(
          "px-0",
          isVertical ? "flex flex-col gap-4 items-start mt-4" : "max-sm:flex max-sm:flex-col"
        )}
      >
        {isVertical ? (
          <>
            <div className="max-w-6/12 p-2 bg-white rounded-sm">
              <LinkQR
                qrPublicUrl={url.qr!}
                linkTitle={url.title! ?? "Untitled"}
              />
            </div>

            <div className="flex">
              <LinkActions url={url} />
            </div>
          </>
        ) : (
          <LinkActions url={url} />
        )}
      </CardFooter>
    </Card>
  );
};

export default LinkCard;
