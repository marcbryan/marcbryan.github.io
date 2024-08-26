import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useTitle } from "../App";
import { useThemeContext } from '../context/ThemeContext';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider';
import { TECHNOLOGIES } from '../constants';
import StackIcon from "tech-stack-icons";
import { Tooltip } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Scroller from "../components/Scroller";
import LinkTooltip from "../components/LinkTooltip";
import TextTooltip from "../components/TextTooltip";
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Football from '../assets/hobbies/football.webp';
import F1 from '../assets/hobbies/f1.webp';
import Training from '../assets/hobbies/training.webp';
import "./AboutMe.css";

function isDark(mode, whiteInDarkMode) {
  if (mode == "dark" && whiteInDarkMode)
    return true;
  else
    return false;
}

function TechIcon({tech, mode}) {
  if (tech.tsIcon != null) {
    if (tech.whiteInDarkMode != null) {
      if (tech.tsIcon == "markdown")
        return <StackIcon name={tech.tsIcon} className={`tech-icon${isDark(mode, tech.whiteInDarkMode) ? ' tech-icon-white tech-icon-md' : ''}`} />;
      else
        return <StackIcon name={tech.tsIcon} className={`tech-icon${isDark(mode, tech.whiteInDarkMode) ? ' tech-icon-white' : ''}`} />;
    }
    else  
      return <StackIcon name={tech.tsIcon} className="tech-icon" />;
  }
  else {
    const SVGComponent = tech.SVGComponent;
    return <SVGComponent className={`tech-icon${isDark(mode, tech.whiteInDarkMode) ? ` tech-icon-${tech.darkModeClass}` : ''}`} />;
  }
}

function Academics({academics}) {
  return (
    academics.map((academic, academicIndex) => (
      <div key={academicIndex} className={academic.details ? "additional-training" : "academics"}>
        <h4>{academic.name}</h4>
        <div className="d-flex">
          <img src={academic.src} />
          <p>{academic.school}{ academic.location != null && ` (${academic.location})`} | {academic.years}</p>
        </div>
        {academic.details != null &&
          <ul>
            {academic.details.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>}
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
          {exp.src && <img src={exp.src} />}
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

  const { mode } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [open, setOpen] = useState(false);

  return (
    <main className="about-me container">
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
      {isMobile ?
        <>
          <img className="grades" src={`/src/assets/${t("aboutMe_gradesFile")}`} onClick={() => setOpen(true)} />
          <Lightbox
            plugins={[Zoom]}
            open={open}
            close={() => setOpen(false)}
            slides={[{ src: `/src/assets/${t("aboutMe_gradesFile")}` }]}
            carousel={{ finite: true }}
            render={{
              buttonPrev: () => null,
              buttonNext: () => null,
            }}
            styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .9)" }}}
          />
        </>
        : 
        <img className="grades" src={`/src/assets/${t("aboutMe_gradesFile")}`} />}
      <p>{t("aboutMe_text3")}</p>
      <Scroller dataPause="true" style={{"--_gap": "0.5rem"}}>
        {TECHNOLOGIES.map((tech, techIndex) => {
          return (
            <Tooltip key={techIndex} title={tech.name}>
              <div>
                <TechIcon tech={tech} mode={mode} />
              </div>
            </Tooltip>
          )
        })}
      </Scroller>
      <p className="relevant-links">{t("aboutMe_relevantLinks")}</p>
      <div className="social-buttons">
        <Tooltip title="LinkedIn">
          <IconButton component="a" href="https://linkedin.com/in/marc-bryan-boakye-flores" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title="GitHub">
          <IconButton component="a" href="https://github.com/marcbryan" target="_blank" rel="noopener noreferrer">              
            <GitHubIcon fontSize="large" />
          </IconButton>
        </Tooltip>
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
      <h2>{t("aboutMe_hobbies")}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={8}
        pagination={{clickable: true}}
        modules={[Pagination]}
        className="swiper-hobbies"
        style={{"--swiper-pagination-color": "white", "--swiper-pagination-bullet-inactive-color": "white"}}
      >
        <SwiperSlide>
          <h4>{t("aboutMe_hobby1")}</h4>
          <img src={Football} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <h4>F1</h4>
          <img src={F1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <h4>{t("aboutMe_hobby3")}</h4>
          <img src={Training} alt="" />
        </SwiperSlide>
      </Swiper>
    </main>
  );
}
export default AboutMe;