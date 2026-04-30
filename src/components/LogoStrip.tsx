import { Link } from "react-router-dom";
import { featuredProjects } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

export function LogoStrip() {
  const { t } = useLanguage();

  return (
    <section className="logo-strip" aria-label={t("portfolio.clients")}>
      <div className="logo-strip__inner">
        <p>{t("portfolio.clients")}</p>
        <div className="logo-rail">
          {[...featuredProjects, ...featuredProjects].map((project, index) => (
            <Link to={`/portfolio/${project.slug}`} data-cursor="soft" key={`${project.slug}-${index}`}>
              <img src={project.logo} alt={project.titleKey ? t(project.titleKey) : project.title} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
