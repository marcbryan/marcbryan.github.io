import { useTranslation } from "react-i18next";

function AboutPage() {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t("aboutPage")}</h1>
    </main>
  );
}
export default AboutPage;