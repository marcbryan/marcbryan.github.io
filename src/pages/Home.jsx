import { useEffect, useRef, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useTitle } from "../App";
import { useMediaQuery, useTheme } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ProfilePic from '../assets/profile_pic.jpg';
import useLocalStorage from 'use-local-storage';
import { easterEgg1 } from "../constants";
import SimpleSnackbar from "../components/SimpleSnackbar";
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import SmallProjectCard from '../components/SmallProjectCard';
import Realistic from 'react-canvas-confetti/dist/presets/realistic';
import "./Home.css";

function useAppBarHeight() {
  const {
    mixins: { toolbar },
    breakpoints
  } = useTheme();

  const queryDesktop = breakpoints.up("sm");
  const queryLandscape = `${breakpoints.up("xs")} and (orientation: landscape)`;

  const isDesktop = useMediaQuery(queryDesktop);
  const isLandscape = useMediaQuery(queryLandscape);

  const cssToolbar = toolbar[isDesktop ? queryDesktop : isLandscape ? queryLandscape : ""];

  return (cssToolbar ?? toolbar)?.minHeight ?? 0;
}

const useImageLoaded = (counterRef) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef();

  const onLoad = () => {
    if (imgRef.current.src == easterEgg1.gifURL) {
      setLoaded(true);
      
      setTimeout(() => {
        if (counterRef.current == 3)
          imgRef.current?.click();
      }, easterEgg1.gifDurationMs);
    }
  }

  useEffect(() => {
    if ((imgRef.current.src == easterEgg1.gifURL) && imgRef.current && imgRef.current.complete)
      onLoad();
  });

  return [imgRef, loaded, onLoad];
}

function Home({lang}) {
  const { t } = useTranslation();
  useTitle(`${t("home")} | ${t("title")}`);
  const theme = useTheme();

  const projectKeys = [
    "groupProjects.1",
    "groupProjects.5",
    "groupProjects.0"
  ];
  const projects = projectKeys.map(project => t(project, { returnObjects: true }));

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage("isFirstVisit", true);
  if (isFirstVisit) {
    setOpenSnackbar(true);
    setIsFirstVisit(false);
  }

  const [foundEgg1, setFoundEgg1] = useLocalStorage("foundEgg1", false);
  const [foundEgg2] = useLocalStorage("foundEgg2", false);
  const [foundEgg3] = useLocalStorage("foundEgg3", false);
  const [foundEgg4] = useLocalStorage("foundEgg4", false);
  const [eggsCompleted, setEggsCompleted] = useLocalStorage("eggsCompleted", false);

  const [profilePicSrc, setProfilePicSrc] = useState(ProfilePic);
  const [countEgg1, setCountEgg1] = useState(0);
  const counterRef = useRef();
  counterRef.current = countEgg1;

  const handleImgClick = () => {
    setCountEgg1((countEgg1) => {
      const newCount = countEgg1 + 1;
      if (newCount == 3)
        setProfilePicSrc(easterEgg1.gifURL);
      else if (newCount == 4) {
        setProfilePicSrc(ProfilePic);
        setFoundEgg1(true);
      }

      return newCount;
    });
  };

  const [imgRef, loaded, onLoad] = useImageLoaded(counterRef);

  const handleInit = (e) => {
    e.conductor.shoot();
    setTimeout(() => setEggsCompleted(true), 6000);
  };

  return (
    <main className="home d-flex" style={{ minHeight: `calc(100vh - ${useAppBarHeight()}px)`}}>
      <div className="container d-flex">
        <div className="d-flex top-container">
          <div>
            <h1>Marc Boakye</h1>
            <h2>
              {window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 
                t("home_position") :
                <TypeAnimation
                  key={`typeAnimation-${lang}`}
                  sequence={[
                    t("home_position"),
                    2500,
                    t("home_position2"),
                    2500,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                />}
            </h2>
            <p style={{maxWidth: lang == "ES" ? "526px" : "502px"}}>{t("home_aboutMe")}</p>
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
          </div>
          <img className="profile-pic" src={profilePicSrc} ref={imgRef} onLoad={!foundEgg1 || countEgg1 == 3 ? onLoad : undefined} onClick={!foundEgg1 || countEgg1 == 3 ? handleImgClick : undefined} />
          {(countEgg1 == 3 && !loaded) && <SimpleSnackbar duration={10000} message={t("home_loading")} /> }
          {(countEgg1 == 3 && loaded) &&
            <SimpleSnackbar
              duration={easterEgg1.gifDurationMs}
              message={ 
                <Trans
                  i18nKey="easterEggs.0.text"
                  components={{
                    1: <MusicNoteIcon fontSize="small" sx={{verticalAlign: "middle"}} />,
                    2: <br />,
                    3: <span style={{color: theme.palette.success.main}}>{"\u2714"}</span>
                  }}
                />
              }
            />}
        </div>
        <Divider sx={{marginBottom: "0.5em"}}>{t("home_featuredProjects").toUpperCase()}</Divider>
        <Grid container
          rowSpacing={{xs: 2, sm: 1}}
          columnSpacing={{xs: 0, sm: 2}}
          className="featured-projects"
        >
          {projects.map((project, i) => <Grid item key={i} xs={12} sm={4}><SmallProjectCard project={project} /></Grid>)}
        </Grid>
      </div>
      {(openSnackbar && !foundEgg1) && <SimpleSnackbar duration={5000} message={t("eggsInitialMessage")} />}
      {(foundEgg1 && foundEgg2 && foundEgg3 && foundEgg4 && !eggsCompleted) &&
        <>
          <Realistic onInit={handleInit} />
          <SimpleSnackbar 
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
          />
        </>}
    </main>
  );
}
export default Home;