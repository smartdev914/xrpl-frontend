import { useQuery } from "@tanstack/react-query";

export const useGetAllNfts = (addresses: string[]) => {
  const getAllNfts = async () => {
    const allTokenIds = addresses.map(async (address) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/xrp/nfts/${address}`,
        {
          method: "GET",
        },
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const tokenIds = data.value.result.account_nfts.map(
        (nft: { NFTokenID: string }) => {
          return nft.NFTokenID;
        },
      );

      return tokenIds;
    });

    return allTokenIds;
  };

  return useQuery({
    queryKey: ["nfts"],
    queryFn: getAllNfts,
  });
};
