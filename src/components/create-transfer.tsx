import { Button } from "@/components/ui/button";
import { useCreateTransfer } from "@/hooks/useCreateTransfer";

type CreateTransferProps = {
  name: string;
  address: string;
  seed: string;
  destination: string;
};

function CreateTransfer({
  name,
  address,
  seed,
  destination,
}: CreateTransferProps) {
  const { mutate, isPending } = useCreateTransfer({
    name: name,
    address: address,
    seed: seed,
    destination: destination,
  });

  const createTransfer = () => {
    mutate();
  };

  return (
    <Button variant="outline" onClick={createTransfer} disabled={isPending}>
      Transfer
    </Button>
  );
}

export default CreateTransfer;
