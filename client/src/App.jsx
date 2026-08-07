import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import SpareParts from "./pages/SpareParts";
import SellPage from "./pages/SellPage";
import Admin from "./pages/Admin";
import SearchPage from "./pages/SearchPage";
import VehicleDetail from "./pages/VehicleDetail";
import Contact from "./pages/Contact";
import Lenis from "lenis";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/search"} component={SearchPage} />
      <Route path={"/cars"}>
        <CategoryPage category="Car" />
      </Route>
      <Route path={"/bikes"}>
        <CategoryPage category="Bike" />
      </Route>
      <Route path={"/tractors"}>
        <CategoryPage category="Tractor" />
      </Route>
      <Route path={"/spare-parts"} component={SpareParts} />
      <Route path={"/sell"} component={SellPage} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/vehicle/:id"} component={VehicleDetail} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <Toaster />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
