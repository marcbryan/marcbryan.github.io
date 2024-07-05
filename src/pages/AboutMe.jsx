import { useTranslation } from "react-i18next";

function AboutMe() {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t("aboutMe")}</h1>
    </main>
  );
}
export default AboutMe;