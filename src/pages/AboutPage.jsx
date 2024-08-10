import { useTranslation, Trans } from "react-i18next";
import { useTitle } from "../App";
import reactLogo from '../assets/tech_logos/react.svg';
import viteLogo from '../assets/tech_logos/vite.svg';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import "./AboutPage.css";

const portfoliosIdeas = [
  "https://www.adhamdannaway.com",
  "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/03/image-49-1024x510.webp",
  "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/06/Portfolio-of-the-front-end-developer-Olaolu-Olawuyi.webp",
  "https://codesandbox.io/s/react-dm2cx",
]

function AboutPage() {
  const { t } = useTranslation();
  useTitle(`${t("aboutPage")} | ${t("title")}`);
  
  return (
    <main className="about-page container">
      <h2>{t("aboutPage_intro")}</h2>
      <p>
        <Trans i18nKey="aboutPage_text1" /><br/>
      </p>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>
        <Trans i18nKey="aboutPage_text2" >MUI:<Link href="https://mui.com/material-ui/" target="_blank" rel="noopener noreferrer"/></Trans>
      </p>
      <ul>
        {portfoliosIdeas.map((portfolioLink, i) => <li key={i}><Link href={portfolioLink} target="_blank" rel="noopener noreferrer">{portfolioLink}</Link></li>)}
      </ul>
      <p>{t("aboutPage_text3")}</p>
      <h2>{t("aboutPage_repository")}</h2>
      <p>{t("aboutPage_text4")}</p>
      <div className="d-flex">
        <GitHubIcon fontSize="large" sx={{ mr: 1 }} />
        <Link href="https://github.com/marcbryan/marcbryan.github.io" target="_blank" rel="noopener noreferrer" style={{ alignSelf: "center" }}>{t("aboutPage_GitHubRepo")}</Link>      
      </div>
      <h2>{t("aboutPage_reasons")}</h2>
      <p>
        <Trans i18nKey="aboutPage_text5" >Udemy course:<Link href="https://www.udemy.com/course/react-js-inicia-en-el-mundo-de-los-frameworks-de-javascript/" target="_blank" rel="noopener noreferrer" /></Trans><br/>
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