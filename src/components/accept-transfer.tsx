import { Button } from "@/components/ui/button";

import { useAcceptTransfer } from "@/hooks/useAcceptTransfer";

type AcceptTransferProps = {
  name: string;
  previous: string;
  address: string;
  seed: string;
};

function AcceptTransfer({
  name,
  previous,
  address,
  seed,
}: AcceptTransferProps) {
  const { mutate, isPending } = useAcceptTransfer({
    name: name,
    previous: previous,
    address: address,
    seed: seed,
  });

  const acceptTransfer = () => {
    mutate();
  };

  return (
    <Button variant="outline" onClick={acceptTransfer} disabled={isPending}>
      Sign
    </Button>
  );
}

export default AcceptTransfer;
