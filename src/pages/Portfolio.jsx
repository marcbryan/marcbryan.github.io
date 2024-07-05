import { useTranslation } from "react-i18next";

function Portfolio() {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t("portfolio")}</h1>
    </main>
  );
}
export default Portfolio;