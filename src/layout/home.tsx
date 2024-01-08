import User from "@/components/user";

function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-7xl justify-between gap-4">
        <User
          name="Platform"
          mint
          seed="sEdVBCsTxhBUHYhjT8cfMRapVyvJAQY"
          address="rnZvbZFDP2rEnDFP8MG1YfiwKe4VEmhZhB"
        />
        <User name="A" />
        <User name="B" />
      </div>
    </main>
  );
}

export default Home;
