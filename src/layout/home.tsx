import User from "@/components/user";

function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 ">
      <div className="mx-auto flex w-full max-w-7xl justify-between gap-4">
        <User
          name="Platform"
          mint
          seed={import.meta.env.VITE_PLATFORM_SEED}
          previous={import.meta.env.VITE_B_ADDRESS}
          address={import.meta.env.VITE_PLATFORM_ADDRESS}
          destination={import.meta.env.VITE_A_ADDRESS}
        />
        <User
          name="User A"
          seed={import.meta.env.VITE_A_SEED}
          previous={import.meta.env.VITE_PLATFORM_ADDRESS}
          address={import.meta.env.VITE_A_ADDRESS}
          destination={import.meta.env.VITE_B_ADDRESS}
        />
        <User
          name="User B"
          seed={import.meta.env.VITE_B_SEED}
          previous={import.meta.env.VITE_A_ADDRESS}
          address={import.meta.env.VITE_B_ADDRESS}
          destination={import.meta.env.VITE_PLATFORM_ADDRESS}
        />
      </div>
    </main>
  );
}

export default Home;
