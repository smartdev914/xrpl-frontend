import useSelectedNFTStore from "@/hooks/store/useSelectedNFTStore";
import useSelectedTransferStore from "@/hooks/store/useSelectedTransferStore";
import { useGetAllTransferOffers } from "@/hooks/useGetAllTransferOffers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type AcceptTransferParams = {
  name: string;
  previous: string;
  address: string;
  seed: string;
};

export const useAcceptTransfer = ({
  name,
  previous,
  address,
  seed,
}: AcceptTransferParams) => {
  const queryClient = useQueryClient();

  const { selectedTransfer, setSelectedTransfer } = useSelectedTransferStore(
    (state) => ({
      selectedTransfer: state.selectedTransfer,
      setSelectedTransfer: state.setSelectedTransfer,
    }),
  );

  const setSelectedNFT = useSelectedNFTStore((state) => state.setSelectedNFT);
  const transferOffers = useGetAllTransferOffers(address);

  const acceptTransferOffer = async () => {
    if (transferOffers.data === undefined || transferOffers.data.length === 0) {
      toast.error("Error", {
        description: "No Transfer Offers to accept",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      return;
    }

    if (
      selectedTransfer[address] === undefined ||
      selectedTransfer[address] === ""
    ) {
      toast.error("Error", {
        description: "No Transfer Offer selected to accept",
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/sell/accept`,
      {
        method: "POST",
        body: JSON.stringify({
          address: address,
          seed: seed,
          sellOffer: transferOffers.data[0].offers[0].nft_offer_index,
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
    setSelectedNFT(previous, "");
    setSelectedTransfer(address, "");
    toast.success("Transfer Offer Accepted", {
      description: `A transfer offer was accepted by ${name}`,
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
    await queryClient.refetchQueries({
      queryKey: ["nfts"],
    });
    await queryClient.refetchQueries({
      queryKey: ["allTransferOffers", address],
      exact: true,
    });
  };

  return useMutation({
    mutationFn: acceptTransferOffer,
  });
};
