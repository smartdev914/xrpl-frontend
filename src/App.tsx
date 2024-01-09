import Home from "@/layout/home";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-background text-primary antialiased">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Home />
        <Toaster />
      </ThemeProvider>
    </main>
  );
}

export default App;
