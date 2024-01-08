import { useEffect, useState } from "react";

type UriProps = {
  uri: string;
};

function Uri({ uri }: UriProps) {
  const [decodedUri, setDecodedUri] = useState<string>("");

  useEffect(() => {
    const fetchUri = async () => {
      try {
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

        setDecodedUri(data.value);
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    if (uri && !decodedUri) {
      fetchUri();
    }
  }, [uri, decodedUri]);

  return <p className="truncate">URI: {decodedUri}</p>;
}

export default Uri;
