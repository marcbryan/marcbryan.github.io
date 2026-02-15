import { useTranslation } from 'react-i18next';
import { useTitle } from '../App';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS, GROUP_PROJECTS } from '../constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Portfolio.css';

function combineWithTranslations(projectsData, projectsTexts, typeTexts) {
  let projects = [];
  for (const project of projectsData) {
    const projectTexts = projectsTexts.find(pTxts => pTxts.id == project.id);
    const combined = { ...projectTexts, ...project }
    
    if (projectTexts.tags != undefined) {   
      if (project.tags.includes("") && project.mlTags == undefined)
        project.mlTags = [];
      
      let j = 0;
      project.tags = project.tags.map((tag, i) => {
        let tagTxt = tag;
        if (tag == "") {
          project.mlTags.push(i);
          tagTxt = projectTexts.tags[j];
          j++;
        }
        else if (project.mlTags != undefined && project.mlTags.includes(i)) {
          tagTxt = projectTexts.tags[j];
          j++;
        }
        
        return tagTxt;
      });
    }

    if (project.type.length > 0)     
      project.typeTxt = project.type.map(ty => typeTexts[ty]);

    projects.push(combined);
  }
  
  return projects.slice().reverse();
}

function Portfolio() {
  const { t } = useTranslation();
  useTitle(`${t("portfolio")} | ${t("title")}`);

  const projectTypes = t("projectTypes", { returnObjects: true });
  const projects = combineWithTranslations(PROJECTS, t("projects", { returnObjects: true }), projectTypes);
  const groupProjects = combineWithTranslations(GROUP_PROJECTS, t("groupProjects", { returnObjects: true }), projectTypes);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileM = useMediaQuery("(max-width:374px)");

  return (
    <main className="portfolio container">
      <h1>{t("portfolio")}</h1>
      <div className="top-container">
        <p>{t("portfolio_text1")}</p>
        <a className="github-card" href="https://github.com/marcbryan?tab=repositories" target="_blank" rel="noopener noreferrer">
          <img src="https://avatars.githubusercontent.com/u/39045542?v=4" />
          <Typography className="gh-username" color="textPrimary">marcbryan</Typography>
        </a>
      </div>
      <h2>{t("portfolio_projects")}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{clickable: true}}
        breakpoints={{
          690: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="swiper-projects"
      >
        {projects.map((project, i) => (
          <SwiperSlide key={i}>
            <ProjectCard project={project} isMobile={isMobile} isMobileM={isMobileM} />
          </SwiperSlide>
        ))}
      </Swiper>
      <h2>{t("portfolio_gp")}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{clickable: true}}
        breakpoints={{
          690: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="swiper-gp"
      >
        {groupProjects.map((project, i) => (
          <SwiperSlide key={i}>
            <ProjectCard project={project} isMobile={isMobile} isMobileM={isMobileM} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
export default Portfolio;