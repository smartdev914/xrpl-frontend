import { useQuery } from "@tanstack/react-query";

export const useGetTransferOffers = (tokenId: string | undefined) => {
  const getTransferOffers = async () => {
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

    return data.value.result;
  };

  return useQuery({
    queryKey: ["transferOffers", tokenId],
    queryFn: getTransferOffers,
  });
};
