import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import GitHubIcon from '@mui/icons-material/GitHub';
import MultipleItemsCarousel from "../components/MultipleItemsCarousel";
import './Portfolio.css';

function Portfolio() {
  const { t } = useTranslation();

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  
    function addAnimation() {
      scrollers.forEach(scroller => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller-inner");
        const scrollerContent = Array.from(scrollerInner.children);

        let numElements = scrollerInner.getAttribute("data-elements");
        if (scrollerContent.length == numElements) {
          scrollerContent.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
          });
        }
      });
    }
  }, []);

  return (
    <main className="container">
      <h1>{t("portfolio")}</h1>
      <div className="top-container">
        <p>{t("portfolio_text1")}</p>
        <div className="d-flex">
          <GitHubIcon fontSize="large" sx={{ mr: 1 }} />
          <a href="https://github.com/marcbryan?tab=repositories" target="_blank">https://github.com/marcbryan</a>      
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