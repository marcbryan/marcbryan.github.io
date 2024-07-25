import { useTranslation, Trans } from "react-i18next";
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import GitHubIcon from '@mui/icons-material/GitHub';

function AboutPage() {
  const { t } = useTranslation();

  return (
    <main className="container">
      <h2>{t("aboutPage_intro")}</h2>
      <p>
        <Trans i18nKey="aboutPage_text1" /><br/>
      </p>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>
        <Trans i18nKey="aboutPage_text2" >MUI:<a href="https://mui.com/material-ui/" target="_blank"/></Trans>
      </p>
      <ul></ul>
      <p>{t("aboutPage_text3")}</p>
      <h2>{t("aboutPage_repository")}</h2>
      <p>{t("aboutPage_text4")}</p>
      <div className="d-flex">
        <GitHubIcon fontSize="large" sx={{ mr: 1 }} />
        <a href="https://github.com/marcbryan/marcbryan.github.io" target="_blank" rel="noopener noreferrer" style={{ alignSelf: "center" }}>https://github.com/marcbryan/marcbryan.github.io</a>      
      </div>
      <h2>{t("aboutPage_reasons")}</h2>
      <p>
        <Trans i18nKey="aboutPage_text5" >Udemy course:<a href="https://www.udemy.com/course/react-js-inicia-en-el-mundo-de-los-frameworks-de-javascript/" target="_blank"/></Trans><br/>
      </p>
      <p>{t("aboutPage_text6")}</p>
      <h2>{t("aboutPage_resources")}</h2>
      <ul></ul>
      <h2>{t("aboutPage_doubtsProblems")}</h2>
      <p>{t("aboutPage_text7")}</p>
      <ul></ul>
    </main>
  );
}
export default AboutPage;