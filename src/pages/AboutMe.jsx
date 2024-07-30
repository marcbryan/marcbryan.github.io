import { useTranslation, Trans } from "react-i18next";
import { useTitle } from "../App";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider';
import { TECHNOLOGIES } from '../constants';
import StackIcon from "tech-stack-icons";
import { Tooltip } from "@mui/material";
import LinkTooltip from "../components/LinkTooltip";
import TextTooltip from "../components/TextTooltip";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import "./AboutMe.css";

function Technologies({ariaHidden}) {
  const height = 52.75;
  
  return TECHNOLOGIES.map((tech, techIndex) => {
    return (
      <Tooltip key={techIndex} title={tech.name} aria-hidden={ariaHidden ? "true" : undefined}>
        {tech.tsIcon != null ?
          <div><StackIcon name={tech.tsIcon} style={{ width:`${height}px`, height:`${height}px` }} /></div> :
          <img src={tech.imageURL} alt={tech.name} height={`${height}px`} /> }
      </Tooltip>
    )
  })
}

function Academics({academics}) {
  return (
    academics.map((academic, academicIndex) => (
      <div key={academicIndex} className={academic.details ? "additional-training" : "academics"}>
        <h4>{academic.name}</h4>
        <div className="d-flex">
          <img src={academic.src} />
          <p>{academic.school}{ academic.location != null ? ` (${academic.location})` : "" } | {academic.years}</p>
        </div>
        {academic.details != null ?
          <ul>
            {academic.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
        : ""}
      </div>
    ))
  );
}

function ProfessionalExperience({experience}) {
  return (
    experience.map((exp, expIndex) => (
      <div key={expIndex} className="experience">
        <h4>{exp.job}</h4>
        <div className="d-flex">
          {exp.src ? <img src={exp.src} /> : ""}
          <p>{exp.company} | {exp.years}</p>
        </div>
        <ul>
          {exp.details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </div>
    ))
  );
}

function Languages({languages}) {
  return (
    languages.map((language, langIndex) => (
      <div key={langIndex} className="lang-div">
        <h4>
          <Trans 
            i18nKey={language}
            components={{ span: <span /> }}
          >
            {language.lang}:
          </Trans>
        </h4>
        <p>{language.level}</p>
      </div>
    ))
  )
}

function AboutMe() {
  const { t } = useTranslation();
  useTitle(`${t("aboutMe")} | ${t("title")}`);

  return (
    <main className="container">
      <h1>{t("aboutMe")}</h1>
      <h2>{t("aboutMe_summary")}</h2>
      <p>
        <Trans
          i18nKey="aboutMe_text1"
          components={{ 
            LinkTooltip: <LinkTooltip />,
            Tooltip: <TextTooltip />
          }}
          values={{ 
            CFGS_more: t("CFGS_more"),
            DAM_name: t("DAM_name"),
            DAW_name: t("DAW_name"),
            DAM_link: t("DAM_link"),
            DAW_link: t("DAW_link")
          }}
        />
      </p>
      <p>{t("aboutMe_text2")}</p>
      <Zoom>
        <img className="grades" src={`/src/assets/${t("aboutMe_gradesFile")}`} />
      </Zoom>
      <p>{t("aboutMe_text3")}</p>
      <div className="d-flex custom-scrollbar scroller" data-animated={!window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "true" : undefined}>
        <div className="d-flex scroller-inner technologies" data-elements={TECHNOLOGIES.length}>
          <Technologies />
          {!window.matchMedia("(prefers-reduced-motion: reduce)").matches ?
          <Technologies ariaHidden="true" /> : ""}
        </div>
      </div>
      <p className="relevant-links">{t("aboutMe_relevantLinks")}</p>
      <div className="relevant-links">
        <div className="d-flex">
          <LinkedInIcon fontSize="large" sx={{ mr: 1 }} />
          <a href="https://linkedin.com/in/marc-bryan-boakye-flores" target="_blank" rel="noopener noreferrer">LinkedIn</a> 
        </div>
        <div className="d-flex">
          <GitHubIcon fontSize="large" sx={{ mr: 1 }} />
          <a href="https://github.com/marcbryan" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <Divider />
      <h2>{t("aboutMe_academicTraining")}</h2>
      <div>
        <Academics academics={t("academicTraining", { returnObjects: true })} />
      </div>
      <Divider />
      <h2>{t("aboutMe_additionalTraining")}</h2>
      <Academics academics={t("additionalTraining", { returnObjects: true })} />
      <Divider />
      <h2>{t("aboutMe_professionalExperience")}</h2>
      <ProfessionalExperience experience={t("experience", { returnObjects: true })} />
      <Divider />
      <h2>{t("aboutMe_languages")}</h2>
      <Languages languages={t("myLanguages", { returnObjects: true })} />
      <Divider />
    </main>
  );
}
export default AboutMe;