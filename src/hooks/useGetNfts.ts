import useTokenStore from "@/hooks/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";

export const useGetNfts = (address: string) => {
  const { tokenIds, addTokenId, setLoading } = useTokenStore((state) => ({
    tokenIds: state.tokenIds,
    addTokenId: state.addTokenId,
    setLoading: state.setLoading,
  }));

  const getNfts = async () => {
    setLoading(address, false);

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

    data.value.result.account_nfts.map((nft: { NFTokenID: string }) => {
      if (!tokenIds.includes(nft.NFTokenID)) {
        addTokenId(nft.NFTokenID);
      }
    });

    setLoading(address, true);

    return data.value.result.account_nfts;
  };

  return useQuery({
    queryKey: ["nfts", address],
    queryFn: getNfts,
  });
};
