import { Hero } from "../components/Hero";
import { LogoStrip } from "../components/LogoStrip";
import { Portfolio } from "../components/Portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../i18n/LanguageContext";

export function PortfolioPage() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <Hero title={t("hero.portfolioTitle")} script={t("hero.portfolioScript")} scrollText={t("hero.scroll")} className="portfolio-hero" />
      <div id="page-content">
        <LogoStrip />
        <Portfolio />
      </div>
    </>
  );
}
