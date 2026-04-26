import { Instagram, Mail, Phone, Send } from "lucide-react";
import { Hero } from "../components/Hero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../i18n/LanguageContext";

export function ContactPage() {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <>
      <Hero title={t("hero.contactTitle")} script={t("hero.contactScript")} scrollText={t("hero.contactScroll")} className="contact-hero" />

      <section className="contact-page" id="page-content">
        <div className="section-container contact-intro" data-reveal>
          <h2>{t("contact.title")}</h2>
          <p>{t("contact.intro")}</p>
        </div>

        <div className="section-container contact-layout">
          <form className="contact-form" data-reveal>
            <label>
              <span>{t("contact.name")}</span>
              <input type="text" name="name" />
            </label>
            <label>
              <span>{t("contact.email")}</span>
              <input type="text" name="contact" />
            </label>
            <label>
              <span>{t("contact.message")}</span>
              <textarea name="message" rows={6} />
            </label>
            <button type="submit" data-cursor="merge">
              <Send aria-hidden="true" size={20} />
              {t("contact.send")}
            </button>
          </form>

          <aside className="contact-card" aria-label={t("contact.detailsLabel")} data-reveal>
            <a href="tel:+32472085890" data-cursor="merge">
              <Phone aria-hidden="true" />
              +32 472 08 58 90
            </a>
            <a href="mailto:weemaels.nolan2005@gmail.com" data-cursor="merge">
              <Mail aria-hidden="true" />
              weemaels.nolan2005@gmail.com
            </a>
            <a href="https://www.instagram.com/nolanweemaelsdesign/" data-cursor="merge">
              <Instagram aria-hidden="true" />
              @nolanweemaelsdesign
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
