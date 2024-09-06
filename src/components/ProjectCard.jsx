import React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import GroupIcon from '@mui/icons-material/Group';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import GitHubUniverse from '../assets/github_universe.png';
import SplitButton from './SplitButton';
import Scroller from './Scroller';
import LinkTooltip from "../components/LinkTooltip";
import TextTooltip from "../components/TextTooltip";
import { FRONTEND } from '../constants';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from "yet-another-react-lightbox/plugins/counter";
import 'yet-another-react-lightbox/styles.css';
import "yet-another-react-lightbox/plugins/counter.css";
import './ProjectCard.css';

let isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

function Type({project, isMobile}) {
  return (
    project.type.map((type, typeIndex) => (
      isMobile ?
        <Tooltip key={typeIndex} title={type}>
          <Chip label={type == FRONTEND ? "Front" : "Back"} color={type == FRONTEND ? "primary" : "secondary"} />
        </Tooltip> :
        <Chip key={typeIndex} label={type} color={type == FRONTEND ? "primary" : "secondary"} />
    )) 
  )
}

function Description({project}) {
  if (isHTML(project.description)) {
    if (project.description.includes("</a>") && project.description.includes("</Tooltip>")) {
      return (
        <Trans 
          i18nKey={project}
          components={{ a: <Link target="_blank" rel="noopener noreferrer" />, Tooltip: <TextTooltip /> }}
          values={{
            DAM_name: t("DAM_name"),
            DAW_name: t("DAW_name")
          }}
        >
          {project.description}
        </Trans>
      )
    }
    else if (project.description.includes("</LinkTooltip>")) {
      return (
        <Trans 
          i18nKey={project}
          components={{ LinkTooltip: <LinkTooltip /> }}
          values={{ 
            DAM_name: t("DAM_name"),
            DAW_name: t("DAW_name"),
            DAM_link: t("DAM_link"),
            DAW_link: t("DAW_link")
          }}
        >
          {project.description}
        </Trans>
      )
    }
    else if (project.description.includes("</a>")) {
      return (
        <Trans 
          i18nKey={project}
          components={{ a: <Link target="_blank" rel="noopener noreferrer" /> }}
        >
          {project.description}
        </Trans>
      )
    }
    else if (project.description.includes("</Tooltip>")) {
      return (
        <Trans 
          i18nKey={project}
          components={{ Tooltip: <TextTooltip /> }}
          values={{ 
            CFGS_more: t("CFGS_more"),
            DAM_name: t("DAM_name"),
            DAW_name: t("DAW_name")
          }}
        >
          {project.description}
        </Trans>
      )
    }
  }
  else
    return project.description;
}

function Tags({project, isMobileM}) {
  let length = project.tags.length;
  if (length > 4 || (length > 4 && isMobileM)) {
    return (
      <Scroller>
        {project.tags.map((tag, tagIndex) => (
          <Chip key={tagIndex} label={tag} color="primary" />
        ))}
      </Scroller>
    )
  }
  else {
    return (
      <div className="d-flex">
        {project.tags.map((tag, tagIndex) => (
          <Chip key={tagIndex} label={tag} color="primary" sx={tagIndex === (project.tags.length - 1) ? undefined : { mr: 0.5 }} />
        ))}
      </div>
    )
  }
}

function Actions({project, t}) {
  return (
    <CardActions sx={{ marginTop: "auto" }}>
      <ActionButtons project={project} t={t} />
      {(project.numPersons != null) &&
        <Tooltip title={t("portfolio_numPersons")}>
          <div className="d-flex project-persons">
            <GroupIcon sx={{ mr: 0.5 }} />
            <span>{project.numPersons}</span>
          </div>
        </Tooltip>}
    </CardActions>
  )
}

function ActionButtons({project, t}) {
  if (project.moreInfo != null) {
    let moreInfo = null;
    if (project.moreInfo.includes("</a>")) {
      moreInfo = (
        <Trans 
          i18nKey={project}
          components={{ a: <a target="_blank" rel="noopener noreferrer" className="tooltip-link" /> }}
        >
          {project.moreInfo}
        </Trans>
      )
    }

    if (project.webURL != null) {
      return (
        <>
          <RepositoryButton project={project} />
          <Tooltip disableFocusListener title={moreInfo != null ? moreInfo : project.moreInfo}>
            <Button size="small" sx={{ cursor: "initial" }}>{t("portfolio_knowMore")}</Button>
          </Tooltip>
          <Tooltip disableFocusListener title={t("portfolio_seeProject")}>
            <Button size="small" href={project.webURL} target="_blank" rel="noopener noreferrer">Web</Button>
          </Tooltip>
        </>
      )
    }
    else {
      return (
        <>
          <RepositoryButton project={project} />
          <Tooltip disableFocusListener title={moreInfo != null ? moreInfo : project.moreInfo}>
            <Button size="small" sx={{ cursor: "initial" }}>{t("portfolio_knowMore")}</Button>
          </Tooltip>
        </>
      )
    }
  }
  else {
    if (project.webURL != null) {
      return (
        <>
          <RepositoryButton project={project} />
          <Tooltip disableFocusListener title={t("portfolio_seeProject")}>
            <Button size="small" href={project.webURL} target="_blank" rel="noopener noreferrer">Web</Button>
          </Tooltip>
        </>
      )
    }
    else
      return <RepositoryButton project={project} />;
  }
}

function RepositoryButton({project}) {
  if (Array.isArray(project.repository)) {
    let repositories = [];
    project.repository.forEach((repo, index) => {
      repositories.push({name: "Repo "+(index + 1), repository: repo})
    });
    return <SplitButton options={repositories} />
  }
  else 
    return <Button size="small" href={project.repository} target="_blank">GitHub</Button>
}

export default function ProjectCard({project, isMobile, isMobileM}) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      className={`project-card d-flex prevent-select${project.status != null ? " pending-project" : ""}`}
      sx={{ maxWidth: "345px", flexDirection: "column", height: "100%", cursor: "default" }}
    >
      {project.imagesFolder != null && project.imagesExt != null ?
        <>
          <Tooltip title={ project.imagesExt.length > 1 ? t("portfolio_viewImages") : t("portfolio_viewImage") }>
            <CardMedia
              component="img"
              sx={{ height: 140, cursor: "pointer", ...project.objectPosition != null && { objectPosition: project.objectPosition } }}
              image={`/src/assets/projects/${project.imagesFolder}/img1.${project.imagesExt[0]}`}
              onClick={() => setOpen(true)}
            />
          </Tooltip>
          <Lightbox
            plugins={[Zoom, Counter]}
            open={open}
            close={() => setOpen(false)}
            slides={
              project.imagesExt.map((ext, i) => {
                return { src: `/src/assets/projects/${project.imagesFolder}/img${i+1}.${ext}` }
              })
            }
            carousel={{ finite: project.imagesExt.length <= 1 }}
            render={{
              buttonPrev: project.imagesExt.length <= 1 ? () => null : undefined,
              buttonNext: project.imagesExt.length <= 1 ? () => null : undefined,
            }}
            styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, .9)" }}}
          />
        </>
        :
        <CardMedia component="img" sx={{ height: 140 }} image={GitHubUniverse} />}
      <CardContent>
        <div className="d-flex">
          <Typography gutterBottom variant="h5" component="div" sx={{ mr: "0.25rem" }}>
            {project.name}
          </Typography>
          {project.type.length > 0 &&
            <div className="d-flex project-type">
              <Type project={project} isMobile={isMobile} />
            </div>}
          {(project.status != null && project.type.length == 0) && 
            <div className="d-flex project-status">
              <Chip label={project.status.text} color={project.status.id == 1 ? "warning" : project.status.id == 2 ? "success" : undefined } />
            </div>}
        </div>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.35em" }}>
          <Description project={project}></Description>
        </Typography>
        <Tags project={project} isMobileM={isMobileM} />
      </CardContent>
      <Actions project={project} t={t} />
    </Card>
  );
}