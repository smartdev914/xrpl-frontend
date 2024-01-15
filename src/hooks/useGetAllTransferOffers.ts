import useTokenStore from "@/hooks/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";

type TransferType = {
  nft_id: string;
  offers: Offer[];
};

type Offer = {
  amount: string;
  destination: string;
  nft_offer_index: string;
  owner: string;
};

export const useGetAllTransferOffers = (destination: string) => {
  const tokenIds = useTokenStore((state) => state.tokenIds);

  const getAllTransferOffers = async (): Promise<TransferType[]> => {
    if (tokenIds.length === 0) {
      return [];
    }

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/xrp/offer/all/sell`,
      {
        method: "POST",
        body: JSON.stringify({ tokenIds: tokenIds, destination: destination }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    if (data.value === null) {
      throw new Error("Error fetching sell offers");
    }

    return data.value;
  };

  return useQuery({
    queryKey: ["allTransferOffers", destination],
    queryFn: getAllTransferOffers,
    enabled: false,
  });
};
