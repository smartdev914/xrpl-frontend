import NFTs from "@/components/nfts";
import Transfer from "@/components/transfer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransferOffer } from "@/layout/home";
import { useState } from "react";
import { toast } from "sonner";
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
import CopyField from "@/components/copy-field";

type UserProps = {
  name: string;
  mint?: boolean;
  seed: string;
  address: string;
  setTransferOffer: (transferOffers: TransferOffer) => void;
  refreshTransferOffer: (transferOffers: TransferOffer) => void;
  transferOffer: TransferOffer;
  destination: string;
  refreshNfts: boolean;
  setRefreshNfts: (refreshNfts: boolean) => void;
};

export type NFT = {
  NFTokenID: string;
  Issuer: string;
  URI: string;
  decodedUri?: string;
};

export type NFTs = NFT[];

function User({
  name,
  mint,
  seed,
  address,
  destination,
  transferOffer,
  setTransferOffer,
  refreshTransferOffer,
  refreshNfts,
  setRefreshNfts,
}: UserProps) {
  const [nfts, setNfts] = useState<NFTs>([]);
  const [uri, setUri] = useState("");

  const mintNFT = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/mint`,
        {
          method: "POST",
          body: JSON.stringify({
            address: address,
            seed: seed,
            uri: uri,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error("Error minting NFT");
      }
      setUri("");
      setRefreshNfts(!refreshNfts);
      toast.success("NFT Minted", {
        description: `An NFT was minted by ${name}`,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const createTransferOffer = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/sell/create`,
        {
          method: "POST",
          body: JSON.stringify({
            address: address,
            seed: seed,
            tokenId: nfts[0].NFTokenID,
            amount: "0",
            destination: destination,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error("Error creating sell offer");
      }
      getTransferOffers(nfts[0].NFTokenID);
      toast.success("Transfer Offer Created", {
        description: `A transfer offer was created by ${name}`,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getTransferOffers = async (tokenId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/sell/${tokenId}`,
        {
          method: "GET",
        },
      );

      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error("Error fetching sell offers");
      }

      setTransferOffer(data.value.result);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const acceptTransferOffer = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/sell/accept`,
        {
          method: "POST",
          body: JSON.stringify({
            address: address,
            seed: seed,
            sellOffer: transferOffer.offers[0].nft_offer_index,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error("Error accepting sell offer");
      }

      setRefreshNfts(!refreshNfts);
      const newTransferOffer: TransferOffer = {
        ...transferOffer,
        nft_id: "",
        offers: [],
      };
      refreshTransferOffer(newTransferOffer);
      toast.success("Transfer Offer Accepted", {
        description: `A transfer offer was accepted by ${name}`,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="text-md flex w-full flex-col items-center justify-center gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl">{name}</CardTitle>
          <CardDescription>
            <CopyField text="Address: " content={address} />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-around">
          {mint && (
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">Mint</Button>
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
          )}
          <Button variant="outline" onClick={createTransferOffer}>
            Transfer
          </Button>
          <Button variant="outline" onClick={acceptTransferOffer}>
            Accept
          </Button>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">{name}'s Owned NFTs</CardTitle>
          <CardDescription>List of {name}'s Owned NFTs</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="flex h-80 flex-col">
            {address && (
              <NFTs
                address={address}
                mintClicked={refreshNfts}
                nfts={nfts}
                setNfts={setNfts}
              />
            )}
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">{name}'s Transfer Offers</CardTitle>
            <CardDescription>List of {name}'s Transfer Offers</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="flex h-80 flex-col gap-2">
              <Transfer transfer={transferOffer} />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default User;
