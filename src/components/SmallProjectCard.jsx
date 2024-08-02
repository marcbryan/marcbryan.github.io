import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GitHubUniverse from '../assets/github-universe.png';
import './ProjectCard.css';

export default function SmallProjectCard({project}) {
  const { t } = useTranslation();

  return (
    <Card className="d-flex" sx={{ maxWidth: "345px", flexDirection: "column", height: "100%", flexGrow: 1 }}>
      <CardActionArea href={project.repository} target="_blank" rel="noopener noreferrer">
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          image={GitHubUniverse}
          title={t("portfolio_projectImg")}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}