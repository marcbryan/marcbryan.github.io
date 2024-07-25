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
import { useTranslation, Trans } from 'react-i18next';
import GitHubUniverse from '../assets/github-universe.png';
import SplitButton from './SplitButton';
import parse from 'html-react-parser';
import { FRONTEND } from '../constants';
import './ProjectCard.css';
import { t } from 'i18next';

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
          components={{ a: <a target="_blank" rel="noopener noreferrer" />, Tooltip: <TextTooltip /> }}
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
        >
          {project.description}
        </Trans>
      )
    }
    else if (project.description.includes("</a>")) {
      return (
        <Trans 
          i18nKey={project}
          components={{ a: <a target="_blank" rel="noopener noreferrer" /> }}
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
        >
          {project.description}
        </Trans>
      )
    }
  }
  else
    return project.description;
}

function TextTooltip({title, text}) {
  if (title == null)
    title = getTitleKey(text) + " " + t("CFGS_more");

  return (
    <Tooltip title={title} style={{ cursor: "initial" }}>
      <span>{text}</span>
    </Tooltip>
  )
}

function LinkTooltip({href, title, text}) {
  return (
    <Tooltip title={ title == null ? getTitleKey(text) : title }>
      <a href={href == null ? getHrefKey(text) : href } target="_blank" rel="noopener noreferrer">{text}</a>
    </Tooltip>
  )
}

function getTitleKey(text) {
  if (text === "DAW" || text === "WAD")
    return t("DAW_name");
  else
    return t("DAM_name");
}

function getHrefKey(text) {
  if (text === "DAW" || text === "WAD")
    return t("DAW_link");
  else
    return t("DAM_link");
}

function Tags({project}) {
  let length = project.tags.length;
  if (length > 5) {
    return (
      <div className="d-flex custom-scrollbar scroller">
        <div className="d-flex scroller-inner" data-elements={project.tags.length}>
          {project.tags.map((tag, tagIndex) => (
            <Chip key={tagIndex} label={tag} color="primary" />
          ))}
        </div>
      </div>
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
    if (project.webURL != null && project.webURL != "") {
      return (
        <>
          <RepositoryButton project={project} />
          <Tooltip disableFocusListener title={parse(project.moreInfo)}>
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
          <Tooltip disableFocusListener title={parse(project.moreInfo)}>
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