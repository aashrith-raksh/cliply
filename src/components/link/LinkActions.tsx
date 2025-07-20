import { Button } from "../ui/button";
import { Copy, DownloadIcon } from "lucide-react";
import DeleteLink from "../dashboard/DeleteLink";
import { toast } from "sonner";
import type { URL_Type } from "@/index";

type LinkActionsPropsType = {
  url: URL_Type;
};

const LinkActions = ({ url }: LinkActionsPropsType) => {
  const linkLabel = url.custom_url || url.short_url;
  const fullLinkLabel = `${import.meta.env.VITE_BASE_URL}/${linkLabel}`;

  function downloadQR(imageUrl: string, filename: string) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <>
      <Button
        variant={"ghost"}
        onClick={() => {
          navigator.clipboard.writeText(fullLinkLabel).then((_) => {
            toast("Link copied..😉🤝");
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
    </>
  );
};

export default LinkActions;
