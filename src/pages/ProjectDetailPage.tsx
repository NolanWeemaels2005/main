import { ArrowLeft } from "lucide-react";
import type { CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useProjectQuery } from "../data/projectQueries";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useLanguage } from "../i18n/LanguageContext";

export function ProjectDetailPage() {
  useScrollReveal();
  const { t } = useLanguage();
  const { slug } = useParams();
  const { data: project } = useProjectQuery(slug);

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const projectTitle = project.titleKey ? t(project.titleKey) : project.title;
  const projectSummary = project.summaryKey ? t(project.summaryKey) : project.summary ?? t("project.defaultSummary");

  return (
    <section className="project-detail section-black">
      <div className="section-container project-detail__hero" data-reveal>
        <Link to="/portfolio" className="back-link" data-cursor="soft">
          <ArrowLeft aria-hidden="true" size={22} />
          {t("project.back")}
        </Link>

        <div className="project-detail__title">
          <p className="eyebrow">{t("project.eyebrow")}</p>
          <h1>{projectTitle}</h1>
          <p>{projectSummary}</p>
        </div>
      </div>

      <div className="section-container project-detail__showcase" data-reveal style={{ "--accent": project.color } as CSSProperties}>
        {project.cover ? <img src={project.cover} alt="" /> : null}
        <span className="project-detail__wash" />
        <img className="project-detail__logo" src={project.logo} alt={projectTitle} />
      </div>

      <div className="section-container project-detail__content" data-reveal>
        <div>
          <p className="eyebrow">{t("project.approach")}</p>
          <p>{t("project.defaultApproach")}</p>
        </div>
        <Link to="/contact" className="btn btn--primary" data-cursor="merge">
          {t("cta.letsTalk")}
        </Link>
      </div>
    </section>
  );
}
