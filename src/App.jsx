import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactLenis } from "lenis/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Sonner } from "./components/ui/sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReactLenis
      root
      options={{
        autoRaf: true,
        smoothWheel: true,
        duration: 1.2,
        wheelMultiplier: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        syncTouch: true,
        syncTouchLerp: 0.15,
        touchMultiplier: 1.2,
        touchInertiaExponent: 1.55,
      }}
    >
      <BrowserRouter basename="/eylulguvenlik">
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  </QueryClientProvider>
);

export default App;
