import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

function ScrollToTop() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (hash) return;

    const scrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollTop();
    const frame = window.requestAnimationFrame(scrollTop);
    const timeout = window.setTimeout(scrollTop, 80);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [hash, pathname]);

  return null;
}

export function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navigation />
      <main className="page-shell" key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
