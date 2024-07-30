import { useTranslation } from "react-i18next";
import { useTitle } from "../App";
import GitHubIcon from '@mui/icons-material/GitHub';
import MultipleItemsCarousel from "../components/MultipleItemsCarousel";
import './Portfolio.css';

function Portfolio() {
  const { t } = useTranslation();
  useTitle(`${t("portfolio")} | ${t("title")}`);

  return (
    <main className="container">
      <h1>{t("portfolio")}</h1>
      <div className="top-container">
        <p>{t("portfolio_text1")}</p>
        <div className="d-flex">
          <GitHubIcon fontSize="large" sx={{ mr: 1 }} />
          <a href="https://github.com/marcbryan?tab=repositories" target="_blank" rel="noopener noreferrer">https://github.com/marcbryan</a>      
        </div>
      </div>
      <h2>{t("portfolio_projects")}</h2>
      <MultipleItemsCarousel projects={t("projects", { returnObjects: true })} />
      <h2>{t("portfolio_gp")}</h2>
      <MultipleItemsCarousel projects={t("groupProjects", { returnObjects: true })} />
    </main>
  );
}
export default Portfolio;