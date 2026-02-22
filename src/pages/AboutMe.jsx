import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { useTitle } from '../App';
import { useThemeContext } from '../context/ThemeContext';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { TECHNOLOGIES, EASTER_EGG2, EASTER_EGG3, EASTER_EGG4 } from '../constants';
import useLocalStorage from 'use-local-storage';
import StackIcon from 'tech-stack-icons';
import { Tooltip, useMediaQuery, useTheme } from '@mui/material';
import Scroller from '../components/Scroller';
import LinkTooltip from '../components/LinkTooltip';
import TextTooltip from '../components/TextTooltip';
import Stack from '@mui/material/Stack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import football from '../assets/hobbies/football.webp';
import f1 from '../assets/hobbies/f1.webp';
import training from '../assets/hobbies/training.webp';
import QuestionaryDialog from '../components/QuestionaryDialog';
import SimpleSnackbar from '../components/SimpleSnackbar';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';
import './AboutMe.css';

function isDark(mode, whiteInDarkMode) {
  return (mode == "dark" && whiteInDarkMode) ? true : false;
}

function TechIcon({tech, mode}) {
  if (tech.tsIcon != null) 
    return <StackIcon name={tech.tsIcon} className="tech-icon" {...tech.whiteInDarkMode != null && { variant: mode }} />;
  else {
    const SVGComponent = tech.SVGComponent;
    return <SVGComponent className={`tech-icon${isDark(mode, tech.whiteInDarkMode) ? ` tech-icon-${tech.darkModeClass}` : ""}`} />;
  }
}

function ImageLightbox({className, src}) {
  const [openLightbox, setOpenLightbox] = useState(false);
  return (
    <>
      <img className={className} src={src} onClick={() => setOpenLightbox(true)} />
      <Lightbox
        plugins={[Zoom]}
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={[{ src: src }]}
        carousel={{ finite: true }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  )
}

function Academics({academics}) {
  return (
    academics.map((academic, i) => (
      <div key={i} className={academic.details ? "additional-training" : "academics"}>
        {academic.badge != null ?
          <Stack direction="row" alignItems="center" gap={0.5}>
            <h4>{academic.name}</h4>
            <Tooltip
              title={<><img src={academic.badge} className="icon" width="128" height="128" /></>}
              slotProps={{
                tooltip: { sx: { backgroundColor: "transparent" } }
              }}
            >
              <InfoOutlinedIcon color="info" fontSize="small" />
            </Tooltip>
          </Stack>
          :
          <h4>{academic.name}</h4>}
        <div className="d-flex">
          <img src={academic.src} className="icon" />
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
    experience.map((exp, i) => (
      <div key={i} className="experience">
        <h4>{exp.job}</h4>
        <div className="d-flex">
          {exp.src && <img src={exp.src} className="icon" />}
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
    languages.map((language, i) => (
      <div key={i} className="lang-div">
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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down(376));

  const [openDialog, setOpenDialog] = useState(false);

  const [foundEgg1] = useLocalStorage("foundEgg1", false);
  const [foundEgg2, setFoundEgg2] = useLocalStorage("foundEgg2", false);
  const [foundEgg3, setFoundEgg3] = useLocalStorage("foundEgg3", false);
  const [foundEgg4, setFoundEgg4] = useLocalStorage("foundEgg4", false);
  const [eggsCompleted, setEggsCompleted] = useLocalStorage("eggsCompleted", false);

  const [countEgg2, setCountEgg2] = useState(0);
  const [countEgg3, setCountEgg3] = useState(0);
  const [countEgg4, setCountEgg4] = useState(0);

  let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const handleInit = (e) => {
    e.conductor.shoot();
    setTimeout(() => setEggsCompleted(true), 6000);
  };

  return (
    <main className="about-me container">
      <div className="d-flex title-container">
        <h1>{t("aboutMe")}</h1>
        <div className={isMobile ? "social-buttons d-flex" : "social-buttons"}>
          <Tooltip title="LinkedIn">
            <IconButton component="a" href="https://linkedin.com/in/marc-bryan-boakye-flores" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon fontSize={isMobile ? "medium" : "large"} />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub">
            <IconButton component="a" href="https://github.com/marcbryan" target="_blank" rel="noopener noreferrer">              
              <GitHubIcon fontSize={isMobile ? "medium" : "large"} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <h2>{t("aboutMe_summary")}</h2>
      <div className="summary">
        <Trans
          i18nKey="aboutMe_summ_text1"
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
        <br />
        <Trans
          i18nKey="aboutMe_summ_text2"
          components={{
            Tooltip: <TextTooltip />
          }}
        />
        <div className="summ-pr-3">
          <Trans
            i18nKey="aboutMe_summ_text3"
            components={{
              knowmadmood: <img src="/assets/logos/knowmad_mood.png" className="icon" />
            }}
          />
        </div>
      </div>
      <p>{t("aboutMe_summ_text4")}</p>
      <Scroller dataPause="true" onClick={!foundEgg2 ? () => setCountEgg2((countEgg2) => countEgg2 + 1) : undefined} style={{"--_gap": "0.5rem"}}>
        {TECHNOLOGIES.map((tech, i) => (
          <Tooltip key={i} title={tech.name}>
            <div>
              <TechIcon tech={tech} mode={mode} />
            </div>
          </Tooltip>
        ))}
      </Scroller>
      {countEgg2 == 3 && <QuestionaryDialog questionObj={EASTER_EGG2} handlerFoundEgg={() => setFoundEgg2(true)} handlerOpen={(bool) => setOpenDialog(bool)} />}
      <h2>{t("aboutMe_achievements")}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={8}
        pagination={{clickable: true}}
        modules={[Pagination]}
        className="swiper-achievements"
      > 
        <SwiperSlide>
          <p>{t("aboutMe_text1")}</p>
          {isSmallScreen ?
            <ImageLightbox className="uoc-pic" src={`/assets/uoc/${t("aboutMe_gradesFile")}`} />
            : 
            <img className="uoc-pic" src={`/assets/uoc/${t("aboutMe_gradesFile")}`} />}
        </SwiperSlide>
        <SwiperSlide>
          <div className="d-flex">
            <h4>{t("aboutMe_text2")}</h4>
            <img src="/assets/projects/fittrackr/img1.png" className="icon" />
          </div>
          <p>
            {t("aboutMe_text3")}
            <br/>
            <Trans
              i18nKey="aboutMe_text4"
              components={{
                a: <Link href="https://openaccess.uoc.edu/handle/10609/152798" target="_blank" rel="noopener noreferrer" />
              }}
            />
          </p>
          {isSmallScreen ?
            <ImageLightbox className="uoc-pic" src={`/assets/uoc/${t("aboutMe_btGradesFile")}`} />
            : 
            <img className="uoc-pic" src={`/assets/uoc/${t("aboutMe_btGradesFile")}`} />}
        </SwiperSlide>
        <SwiperSlide>
          <div className="d-flex">
            {isSmallScreen ?
              <ImageLightbox className="uoc-pic" src={`/assets/uoc/${t("aboutMe_academicProgressFile")}`} />
              : 
              <img className="uoc-pic" src={`/assets/uoc/${t("aboutMe_academicProgressFile")}`} />}
            <p>{t("aboutMe_text5")} ✅🎓</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="d-flex">
            <div className="d-flex">
              <h4>{t("aboutMe_text6")}</h4>
              <ImageLightbox className="uoc-pic" src="/assets/uoc/graduation.jpg" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
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
      >
        <SwiperSlide>
          <h4>{t("aboutMe_hobby1")}</h4>
          <img src={football} alt="" onClick={!foundEgg3 ? () => setCountEgg3((countEgg3) => countEgg3 + 1) : undefined} />
          {countEgg3 == 3 && <QuestionaryDialog questionObj={EASTER_EGG3} handlerFoundEgg={() => setFoundEgg3(true)} handlerOpen={(bool) => setOpenDialog(bool)} />}
        </SwiperSlide>
        <SwiperSlide>
          <h4>F1</h4>
          <img src={f1} alt="" onClick={!foundEgg4 ? () => setCountEgg4((countEgg4) => countEgg4 + 1) : undefined} />
          {countEgg4 == 3 && <QuestionaryDialog questionObj={EASTER_EGG4} handlerFoundEgg={() => setFoundEgg4(true)} handlerOpen={(bool) => setOpenDialog(bool)} />}
        </SwiperSlide>
        <SwiperSlide>
          <h4>{t("aboutMe_hobby3")}</h4>
          <img src={training} alt="" />
        </SwiperSlide>
      </Swiper>
      {(foundEgg1 && foundEgg2 && foundEgg3 && foundEgg4 && !openDialog && !eggsCompleted) &&
        <>
          {!reducedMotion && <Realistic onInit={handleInit} />}
          <SimpleSnackbar 
            duration={6000}
            message={
              <Trans 
                i18nKey="eggsCompleted"
                components={[
                  <br />,
                  <span></span>,
                  <span className="confetti-emoji">&#x1f38a;</span>
                ]}
              />
            }
            setEggsCompleted={reducedMotion ? () => setEggsCompleted(true) : undefined}
          />
        </>}
    </main>
  );
}
export default AboutMe;