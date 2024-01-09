import { useState } from "react";
import { Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type CopyFieldProps = {
  text: string;
  content: string | undefined;
};

export default function CopyField({ text, content }: CopyFieldProps) {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyToClipboard = async (copiedText: string) => {
    try {
      await navigator.clipboard.writeText(copiedText);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    } catch (err) {
      setCopySuccess(false);
    }
  };

  return (
    <div onClick={() => copyToClipboard(content ?? "")}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="max-w-80 truncate hover:bg-secondary/50">
            <span>{text}</span>
            <span>{content}</span>
          </TooltipTrigger>
          <TooltipContent className="ml-20 flex cursor-pointer items-center gap-2 bg-zinc-100/90 dark:bg-zinc-800/80">
            <p>{content}</p>
            {!copySuccess && <Copy size={12} />}
            {copySuccess && <Check size={12} />}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
