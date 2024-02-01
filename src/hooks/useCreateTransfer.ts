import useSelectedNFTStore from "@/hooks/store/useSelectedNFTStore";
import { useGetAllTransferOffers } from "@/hooks/useGetAllTransferOffers";
import { useGetNfts } from "@/hooks/useGetNfts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CreateTransferParams = {
  name: string;
  address: string;
  destination: string;
  seed: string;
};

export const useCreateTransfer = ({
  name,
  address,
  seed,
  destination,
}: CreateTransferParams) => {
  const queryClient = useQueryClient();
  const nfts = useGetNfts(address);
  const transferOffers = useGetAllTransferOffers(destination);

  const { selectedNFT, setSelectedNFT } = useSelectedNFTStore((state) => ({
    selectedNFT: state.selectedNFT,
    setSelectedNFT: state.setSelectedNFT,
  }));

  const createTransferOffer = async () => {
    if (nfts.data.length === 0) {
      toast.error("Error", {
        description: "No Contracts to transfer",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      return;
    }
    if (selectedNFT[address] === undefined || selectedNFT[address] === "") {
      toast.error("Error", {
        description: "No Contract selected to transfer",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      return;
    }

    if (transferOffers.data !== undefined && transferOffers.data.length > 0) {
      const transferOffer = transferOffers.data.find(
        (offer) => offer.nft_id === selectedNFT[address],
      );
      if (transferOffer !== undefined) {
        toast.error("Error", {
          description: "Transfer offer already exists",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        return;
      }
    }
    if (nfts.data === undefined || nfts.data.length === 0) {
      toast.error("Error", {
        description: "No Contracts to request",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/sell/create`,
      {
        method: "POST",
        body: JSON.stringify({
          address: address,
          seed: seed,
          tokenId: selectedNFT[address],
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
      throw new Error("Error creating Sign Request");
    }
    setSelectedNFT(address, "");
    toast.success("Sign Request Sent", {
      description: `A Sign Request was sent by ${name}`,
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
  };

  return useMutation({
    mutationFn: createTransferOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allTransferOffers", destination],
      });
    },
  });
};
