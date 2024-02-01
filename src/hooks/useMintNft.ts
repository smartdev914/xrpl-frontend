import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type MintNftParams = {
  name: string;
  address: string;
  seed: string;
  uri: string;
};

export const useMintNft = () => {
  const queryClient = useQueryClient();

  const mintNFT = async ({ name, address, seed, uri }: MintNftParams) => {
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
      toast.error("NFT Minting Error", {
        description: `An error occured upon registering a Contract`,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
      throw new Error("Error Registering Contract");
    }
    toast.success("Contract Registered", {
      description: `A Contract was registered by ${name}`,
      action: {
        label: "Close",
        onClick: () => {},
      },
    });
  };

  return useMutation({
    mutationFn: mintNFT,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["nfts"],
      });
    },
  });
};
