import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type UriProps = {
  uri: string;
};

function Uri({ uri }: UriProps) {
  const [decodedUri, setDecodedUri] = useState<string>("");

  useEffect(() => {
    const fetchUri = async () => {
      try {
        if (uri === "" || uri === undefined) {
          return;
        }
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/xrp/decode/${uri}`,
          {
            method: "GET",
          },
        );

        const data = await response.json();
        if (data.status !== "OK") {
          throw new Error("Error fetching URI");
        }

        setDecodedUri(data.value);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (uri && !decodedUri) {
      fetchUri();
    }
  }, [uri, decodedUri]);

  return (
    <TooltipProvider>
      <Tooltip>
        <a href={decodedUri}>
          <TooltipTrigger>
            <p className="max-w-80 truncate text-left">URI: {decodedUri}</p>
          </TooltipTrigger>
          <TooltipContent className="bg-zinc-100/90 dark:bg-zinc-800/80">
            <p>{decodedUri}</p>
          </TooltipContent>
        </a>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Uri;
