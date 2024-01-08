import NFTs from "@/components/nfts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserProps = {
  name: string;
  mint?: boolean;
  seed?: string;
  address?: string;
};

function User({ name, mint, address }: UserProps) {
  return (
    <div className="text-md flex flex-col items-center justify-center gap-4">
      <div className="text-xl">{name}</div>
      <div className="flex gap-6">
        {mint && <Button variant="outline">Mint</Button>}
        <Button variant="outline">Sell</Button>
        <Button variant="outline">Buy</Button>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Owned NFTs</CardTitle>
          <CardDescription>List of Owned NFTs</CardDescription>
        </CardHeader>
        <CardContent className="flex min-h-80 flex-col">
          {address && <NFTs address={address} />}
        </CardContent>
      </Card>
      <div className="flex gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Sell Offers</CardTitle>
            <CardDescription>List of Sell Offers</CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-40 flex-col gap-2">
            <div>Sell Offer 1</div>
            <div>Sell Offer 2</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg">Buy Offers</CardTitle>
            <CardDescription>List of Buy Offers</CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-40 flex-col gap-2">
            <div>Buy Offer 1</div>
            <div>Buy Offer 2</div>
            <div>Buy Offer 3</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default User;
