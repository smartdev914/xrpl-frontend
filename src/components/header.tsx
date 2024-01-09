import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center border-b border-zinc-700">
      <div className="mx-auto flex w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex w-full gap-2">
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <a href="/">NFTruth-XRP</a>
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
