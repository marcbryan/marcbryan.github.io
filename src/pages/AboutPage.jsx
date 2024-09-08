import { useTranslation, Trans } from 'react-i18next';
import { useTitle } from '../App';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import reactLogo from '../assets/tech_logos/react.svg';
import viteLogo from '../assets/tech_logos/vite.svg';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { PORTFOLIOS_IDEAS, LINKS_NPM, OTHER_LINKS, YOUTUBE_VIDEOS, DOUBTS_PROBLEMS } from '../constants';
import './AboutPage.css';

function AboutPage() {
  const { t } = useTranslation();
  useTitle(`${t("aboutPage")} | ${t("title")}`);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <main className="about-page container">
      <h2>{t("aboutPage_intro")}</h2>
      <p>
        <Trans i18nKey="aboutPage_text1" />
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
        <Trans i18nKey="aboutPage_text2">MUI:<Link href="https://mui.com/material-ui/" target="_blank" rel="noopener noreferrer"/></Trans>
      </p>
      <List className="p-0">
        {PORTFOLIOS_IDEAS.map((portfolioLink, i) =>
          <ListItem key={i}>
            <Link href={portfolioLink} target="_blank" rel="noopener noreferrer">{portfolioLink}</Link>
          </ListItem>
        )}
      </List>
      <p>{t("aboutPage_text3")}</p>
      <h2>{t("aboutPage_repository")}</h2>
      <p>{t("aboutPage_text4")}</p>
      <div className="d-flex">
        <GitHubIcon fontSize="large" />
        <Link href="https://github.com/marcbryan/marcbryan.github.io" target="_blank" rel="noopener noreferrer">{t("aboutPage_GitHubRepo")}</Link>      
      </div>
      <h2>{t("aboutPage_reasons")}</h2>
      <p>
        <Trans i18nKey="aboutPage_text5">
          Udemy course:<Link href="https://www.udemy.com/course/react-js-inicia-en-el-mundo-de-los-frameworks-de-javascript/" target="_blank" rel="noopener noreferrer" />
        </Trans>
      </p>
      <p>{t("aboutPage_text6")}</p>
      <h2>{t("aboutPage_resources")}</h2>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="npm-content"
            id="npm-header"
          >
            <Typography>NPM</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{t("aboutPage_NPM_text1")}</Typography>
            <List>
              {LINKS_NPM.map((link, i) =>
                <ListItem key={i}>
                  <Link href={link} target="_blank" rel="noopener noreferrer">{isMobile ? link.substring(30) : link}</Link>
                </ListItem>
              )}
            </List>
            <Typography>
              <Trans 
                i18nKey={"aboutPage_NPM_text2"}
                components={{ a: <Link href="https://github.com/marcbryan/marcbryan.github.io/blob/master/package.json" target="_blank" rel="noopener noreferrer" /> }}
              />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="other-content"
            id="other-header"
          >
            <Typography>{t("aboutPage_otherLinks")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className="p-0">
              {OTHER_LINKS.map((link, i) =>
                <ListItem key={i}>
                  <Link href={link} target="_blank" rel="noopener noreferrer">{link}</Link>
                </ListItem>
              )}
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="videos-content"
            id="videos-header"
          >
            <Typography>{t("aboutPage_YouTubeVideos")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className="p-0">
              {YOUTUBE_VIDEOS.map((link, i) =>
                <ListItem key={i}>
                  <Link href={link} target="_blank" rel="noopener noreferrer">{link}</Link>
                </ListItem>
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
      <h2>{t("aboutPage_doubtsProblems")}</h2>
      <p>{t("aboutPage_text7")}</p>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="problems-content"
            id="problems-header"
          >
            <Typography>{t("aboutPage_problems_links")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className="p-0">
              {DOUBTS_PROBLEMS.map((link, i) =>
                <ListItem key={i}>
                  <Link href={link} target="_blank" rel="noopener noreferrer">{link}</Link>
                </ListItem>
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
    </main>
  );
}
export default AboutPage;