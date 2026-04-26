import { Play } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

type VideoPanelProps = {
  variant?: "dark" | "light";
};

export function VideoPanel({ variant = "light" }: VideoPanelProps) {
  const { t } = useLanguage();

  return (
    <div className={`video-panel video-panel--${variant}`} data-cursor="merge">
      <img src="/assets/design-pages/newDesignPortfolioFinal [Recovered]-04.png" alt="" />
      <button type="button" className="video-play" aria-label={t("video.play")} data-cursor="merge">
        <Play aria-hidden="true" fill="currentColor" strokeWidth={0} />
      </button>
      <span>{t("video.placeholder")}</span>
    </div>
  );
}
