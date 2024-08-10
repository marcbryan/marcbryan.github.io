import { useTranslation } from "react-i18next";
import { useTitle } from "../App";
import { useMediaQuery, useTheme } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import ProfilePic from '../assets/profile_pic.jpg';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import SmallProjectCard from '../components/SmallProjectCard';
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

function Home({lang}) {
  const { t } = useTranslation();
  useTitle(`${t("home")} | ${t("title")}`);

  const projectKeys = [
    "groupProjects.1",
    "groupProjects.5",
    "groupProjects.0"
  ];

  const projects = projectKeys.map(project => t(project, { returnObjects: true }));

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
          <img className="profile-pic" src={ProfilePic} />
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
    </main>
  );
}
export default Home;