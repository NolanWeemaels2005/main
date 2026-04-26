import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { featuredProjects } from "../data/projects";
import { useTilt } from "../hooks/useTilt";
import { useLanguage } from "../i18n/LanguageContext";
import type { Project } from "../types/project";

type ScrollProjectCardProps = {
  project: Project;
  index: number;
  setCardRef: (index: number, element: HTMLAnchorElement | null) => void;
};

function ScrollProjectCard({ project, index, setCardRef }: ScrollProjectCardProps) {
  const tilt = useTilt({ max: 7, scale: 1.015 });
  const { t } = useLanguage();
  const projectTitle = project.titleKey ? t(project.titleKey) : project.title;

  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="scroll-project-card"
      data-cursor="soft"
      ref={(element) => setCardRef(index, element)}
      style={{
        "--offset": index,
        "--abs-offset": Math.min(index, 3),
        "--z": 20 - Math.round(index * 2),
      } as CSSProperties}
      {...tilt}
    >
      <span className="scroll-project-card__surface">
        {project.cover ? (
          <img className="scroll-project-card__cover" src={project.cover} alt={projectTitle} loading="lazy" decoding="async" />
        ) : null}
        <span className="scroll-project-card__shade" />
        <img className="scroll-project-card__logo" src={project.logo} alt="" loading="lazy" decoding="async" />
      </span>
    </Link>
  );
}

export function HomeProjectScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  function setCardRef(index: number, element: HTMLAnchorElement | null) {
    cardRefs.current[index] = element;
  }

  useEffect(() => {
    function updateCards(progress: number) {
      const active = progress * (featuredProjects.length - 1);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const offset = index - active;
        const absOffset = Math.abs(offset);
        const clamped = Math.min(absOffset, 3);

        card.style.setProperty("--offset", offset.toFixed(4));
        card.style.setProperty("--abs-offset", clamped.toFixed(4));
        card.style.setProperty("--z", String(20 - Math.round(absOffset * 2)));
        card.style.setProperty("--intro-delay", `${Math.min(index * 70, 360)}ms`);
      });
    }

    function measureProgress() {
      frameRef.current = null;
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      updateCards(nextProgress);
    }

    function requestProgressUpdate() {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(measureProgress);
    }

    measureProgress();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        sectionRef.current?.classList.add("is-ready");
      });
    });
    window.addEventListener("scroll", requestProgressUpdate, { passive: true });
    window.addEventListener("resize", requestProgressUpdate);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", requestProgressUpdate);
      window.removeEventListener("resize", requestProgressUpdate);
    };
  }, []);

  return (
    <section
      className="home-project-scroll"
      id="home-project-strip"
      ref={sectionRef}
      style={{ "--project-count": featuredProjects.length } as CSSProperties}
    >
      <div className="home-project-scroll__sticky">
        <div className="home-project-scroll__stage">
          {featuredProjects.map((project, index) => (
            <ScrollProjectCard project={project} index={index} setCardRef={setCardRef} key={project.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
