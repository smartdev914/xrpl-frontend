import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetUri } from "@/hooks/useGetUri";

type UriProps = {
  uri: string;
};

function Uri({ uri }: UriProps) {
  const { data, isLoading, isError, error } = useGetUri(uri);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message}</p>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <a href={data}>
          <TooltipTrigger>
            <p className="max-w-80 truncate text-left">URI: {data}</p>
          </TooltipTrigger>
          <TooltipContent className="bg-zinc-100/90 dark:bg-zinc-800/80">
            <p>{data}</p>
          </TooltipContent>
        </a>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Uri;
