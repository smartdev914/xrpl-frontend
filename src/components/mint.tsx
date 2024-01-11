import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMintNft } from "@/hooks/useMintNft";

type MintProps = {
  name: string;
  address: string;
  seed: string;
};

function Mint({ name, address, seed }: MintProps) {
  const [uri, setUri] = useState("");

  const { mutate, isPending } = useMintNft();

  const mintNFT = () => {
    if (!uri) {
      return;
    }
    mutate({ name, address, seed, uri });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" disabled={isPending}>
          Mint
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mint NFT</DialogTitle>
          <DialogDescription>
            Mint an NFT to {name}. Insert the URI below.
          </DialogDescription>
        </DialogHeader>
        <Input
          className="w-full"
          placeholder="URI"
          onChange={(e) => setUri(e.target.value)}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button
              disabled={uri === "" || uri === undefined}
              className=""
              variant="outline"
              type="submit"
              onClick={mintNFT}
            >
              Mint
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Mint;
