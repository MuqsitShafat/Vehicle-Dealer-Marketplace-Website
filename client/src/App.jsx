import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import SpareParts from "./pages/SpareParts";
import SellPage from "./pages/SellPage";
import Admin from "./pages/admin/Admin";
import SearchPage from "./pages/SearchPage";
import VehicleDetail from "./pages/VehicleDetail";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Marketplace from "./pages/Marketplace";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/search"} component={SearchPage} />
      <Route path={"/cars"}>
        <CategoryPage key="cars" category="Car" />
      </Route>
      <Route path={"/bikes"}>
        <CategoryPage key="bikes" category="Bike" />
      </Route>
      <Route path={"/tractors"}>
        <CategoryPage key="tractors" category="Tractor" />
      </Route>
      <Route path={"/spare-parts"} component={SpareParts} />
      <Route path={"/sell"} component={SellPage} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/booking"} component={Booking} />
      <Route path={"/marketplace"} component={Marketplace} />
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
        <ScrollToTop />
        <Toaster />
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
