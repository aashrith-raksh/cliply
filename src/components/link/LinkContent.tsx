import { Link } from "react-router-dom";

type LinkContentProps = {
  fullLinkLabel: string;
  linkTitle: string;
  linkHref: string;
  originalUrl: string;
};

const LinkContent = ({
  fullLinkLabel,
  linkTitle,
  linkHref,
  originalUrl,
}: LinkContentProps) => {
  return (
    <>
      <Link
        to={linkHref}
        className="flex flex-col flex-1 hover:underline cursor-pointer"
      >
        <h2 className="md:text-3xl md:mb-1 text-md font-semibold">
          {linkTitle || "Untitled"}
        </h2>
      </Link>
      <Link
        className="mb-6 inline-block mt-0 !text-blue-400 md:text-sm text-xs hover:underline"
        to={fullLinkLabel}
      >
        {fullLinkLabel}
      </Link>
      <p className="text-muted-foreground text-xs">{`${originalUrl}`}</p>
    </>
  );
};

export default LinkContent;
