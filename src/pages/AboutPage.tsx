import { About } from "../components/About";
import { Hero } from "../components/Hero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../i18n/LanguageContext";

export function AboutPage() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <Hero title={t("hero.aboutTitle")} script={t("hero.aboutScript")} scrollText={t("hero.scroll")} className="about-page-hero" />
      <div id="page-content">
        <About />
      </div>
    </>
  );
}
