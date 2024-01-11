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

  const { selectedNFT } = useSelectedNFTStore((state) => ({
    selectedNFT: state.selectedNFT,
    // setSelectedNFT: state.setSelectedNFT,
  }));

  const createTransferOffer = async () => {
    console.log("SelectedNFT: ", selectedNFT[address]);
    if (selectedNFT[address] === undefined || selectedNFT[address] === "") {
      toast.error("Error", {
        description: "No NFT selected",
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
        description: "No NFTs to transfer",
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
      throw new Error("Error creating sell offer");
    }
    toast.success("Transfer Offer Created", {
      description: `A transfer offer was created by ${name}`,
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
    await queryClient.refetchQueries({
      queryKey: ["nfts", destination],
      exact: true,
    });
    await queryClient.refetchQueries({
      queryKey: ["allTransferOffers", destination],
      exact: true,
    });
  };

  return useMutation({
    mutationFn: createTransferOffer,
  });
};
