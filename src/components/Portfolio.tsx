import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { useAllProjectsQuery, useFeaturedProjectsQuery } from "../data/projectQueries";
import { useTilt } from "../hooks/useTilt";
import { useLanguage } from "../i18n/LanguageContext";

export function Portfolio() {
  const { t } = useLanguage();
  const { data: featuredProjects } = useFeaturedProjectsQuery();
  const { data: allProjects } = useAllProjectsQuery();
  const featuredTilt = useTilt({ max: 7, scale: 1.018 });
  const projectTilt = useTilt({ max: 9, scale: 1.02 });

  return (
    <section className="portfolio" id="portfolio">
      <div className="section-container">
        <h2 data-reveal>{t("portfolio.featured")}</h2>

        <div className="featured-grid">
          {featuredProjects.map((project) => (
            <Link
              to={`/portfolio/${project.slug}`}
              className={`featured-card featured-card--${project.slug}`}
              data-cursor="soft"
              data-reveal
              id={project.slug}
              key={project.slug}
              style={{ "--accent": project.color } as CSSProperties}
              {...featuredTilt}
            >
              {project.cover ? <img className="featured-card__cover" src={project.cover} alt="" /> : null}
              <span className="featured-card__wash" />
              <img className="featured-card__logo" src={project.logo} alt={project.titleKey ? t(project.titleKey) : project.title} />
            </Link>
          ))}
        </div>

        <h2 className="all-projects-title" data-reveal>{t("portfolio.all")}</h2>

        <div className="project-grid">
          {allProjects.map((project) => (
            <Link
              to={`/portfolio/${project.slug}`}
              className="project-card"
              data-cursor="soft"
              data-reveal
              key={project.slug}
              {...projectTilt}
            >
              <span className="project-card__logo-wrap" data-cursor-surface>
                <img src={project.logo} alt={project.titleKey ? t(project.titleKey) : project.title} />
              </span>
              <span className="project-card__label">
                {project.titleKey ? t(project.titleKey) : project.title}
                <ArrowRight aria-hidden="true" size={24} strokeWidth={3} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
