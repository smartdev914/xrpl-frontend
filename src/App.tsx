import Home from "@/layout/home";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-background text-primary antialiased">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Header />
          <Home />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
      {/* <ReactQueryDevtools /> */}
    </main>
  );
}

export default App;
