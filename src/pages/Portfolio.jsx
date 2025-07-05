import { useTranslation } from 'react-i18next';
import { useTitle } from '../App';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';
import ProjectCard from '../components/ProjectCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './Portfolio.css';

function Portfolio() {
  const { t } = useTranslation();
  useTitle(`${t("portfolio")} | ${t("title")}`);

  const projects = t("projects", { returnObjects: true }).slice().reverse();
  const groupProjects = t("groupProjects", { returnObjects: true }).slice().reverse();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileM = useMediaQuery("(max-width:374px)");

  return (
    <main className="portfolio container">
      <h1>{t("portfolio")}</h1>
      <div className="top-container">
        <p>{t("portfolio_text1")}</p>
        <a className="github-container" href="https://github.com/marcbryan?tab=repositories" target="_blank" rel="noopener noreferrer">
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