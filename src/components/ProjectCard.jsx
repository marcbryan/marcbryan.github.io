import React from 'react';
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
import { useTranslation, Trans } from 'react-i18next';
import GitHubUniverse from '../assets/github_universe.png';
import SplitButton from './SplitButton';
import Scroller from './Scroller';
import LinkTooltip from "../components/LinkTooltip";
import TextTooltip from "../components/TextTooltip";
import { FRONTEND } from '../constants';
import { t } from 'i18next';
import './ProjectCard.css';

let isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

function Type({project}) {
  return (
    project.type.map((type, typeIndex) => (
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
    if (project.description.includes("</LinkTooltip>")) {
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

function Tags({project}) {
  let length = project.tags.length;
  if (length > 5) {
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
          <Chip key={tagIndex} label={tag} color="primary" sx={{ mr: 0.5 }} />
        ))}
      </div>
    )
  }
}

function Actions({project, t}) {
  if (project.numPersons != null) {
    return (
      <CardActions sx={{ marginTop: "auto" }}>
        <ActionButtons project={project} t={t} />
        <Tooltip title={t("portfolio_numPersons")}>
          <div className="d-flex project-persons">
            <GroupIcon sx={{ mr: 0.5 }}></GroupIcon>
            <span>{project.numPersons}</span>
          </div>
        </Tooltip>
      </CardActions>
    )
  }
  else {
    return (
      <CardActions sx={{ marginTop: "auto" }}>
        <ActionButtons project={project} t={t} />
      </CardActions>
    )
  }
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

    if (project.webURL != null && project.webURL != "") {
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
    if (project.webURL != null && project.webURL != "") {
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

export default function ProjectCard({project}) {
  const { t } = useTranslation();

  return (
    <Card className="d-flex" sx={{ maxWidth: "345px", flexDirection: "column", height: "100%" }}>
      <CardMedia
        component="img"
        sx={{ height: 140 }}
        image={GitHubUniverse}
        title={t("portfolio_projectImg")}
      />
      <CardContent>
        <div className="d-flex">
          <Typography gutterBottom variant="h5" component="div">
            {project.name}
          </Typography>
          <div className="d-flex project-type">
            <Type project={project} />
          </div>
        </div>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: "0.35em" }}>
          <Description project={project}></Description>
        </Typography>
        <Tags project={project} />
      </CardContent>
      <Actions project={project} t={t} />
    </Card>
  );
}