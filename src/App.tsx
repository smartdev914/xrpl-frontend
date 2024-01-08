import Home from "@/layout/home";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

function App() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-background text-primary antialiased">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Home />
      </ThemeProvider>
    </main>
  );
}

export default App;
