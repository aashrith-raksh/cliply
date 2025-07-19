import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import LinkActions from "./LinkActions";
import type { URL_Type } from "@/index";
const LinkCard = ({ url }: { url: URL_Type }) => {
  const linkLabel = url.custom_url || url.short_url;
  const fullLinkLabel = `${import.meta.env.VITE_BASE_URL}/${linkLabel}`;
  
  const linkHref = `/link/${url.id}`;

  return (
    <Card key={url.id} className="flex !flex-row items-center gap-12 p-6">
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
        <Link
          className="mb-6 inline-block mt-0 !text-blue-400 md:text-sm text-xs hover:underline"
          to={fullLinkLabel}
        >
          {fullLinkLabel}
        </Link>
        <p className="text-muted-foreground text-xs">{`${url.original_url}`}</p>
      </CardContent>
      <CardFooter className="max-sm:flex max-sm:flex-col px-0">
        <LinkActions url={url} />
      </CardFooter>
    </Card>
  );
};

export default LinkCard;
