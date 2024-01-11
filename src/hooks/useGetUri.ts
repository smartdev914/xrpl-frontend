import { useQuery } from "@tanstack/react-query";

export const useGetUri = (uri: string) => {
  const getUri = async () => {
    if (uri === "" || uri === undefined) {
      return;
    }
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/xrp/decode/${uri}`,
      {
        method: "GET",
      },
    );

    const data = await response.json();
    if (data.status !== "OK") {
      throw new Error("Error fetching URI");
    }

    return data.value;
  };

  return useQuery({
    queryKey: [uri],
    queryFn: getUri,
  });
};
