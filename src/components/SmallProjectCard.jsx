import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useTranslation } from 'react-i18next';
import githubUniverse from '../assets/github_universe.png';

export default function SmallProjectCard({project}) {
  const { t } = useTranslation();

  return (
    <Card className="d-flex" sx={{ maxWidth: "345px", flexDirection: "column", height: "100%", flexGrow: 1 }}>
      <CardActionArea href={project.webURL != null ? project.webURL : project.repository} target="_blank" rel="noopener noreferrer">
        <CardMedia
          component="img"
          sx={{ height: 140, ...project.objectPosition != null && { objectPosition: project.objectPosition } }}
          image={project.imagesFolder != null && project.imagesExt != null ? `/assets/projects/${project.imagesFolder}/img1.${project.imagesExt[0]}` : githubUniverse}
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