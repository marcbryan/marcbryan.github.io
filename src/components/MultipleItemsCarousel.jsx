import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Carousel from 'react-material-ui-carousel';
import ProjectCard from './ProjectCard';

function groupIntoChunks(array, chunkSize) {
  const output = [];
  let currentChunk = [];

  array.forEach((item, index) => {
    currentChunk.push(item);

    if ((index + 1) % chunkSize === 0 || index === array.length - 1) {
      output.push(currentChunk);
      currentChunk = [];
    }
  });

  return output;
}

export default function MultipleItemsCarousel({projects}) {
  // Determine if it's a mobile or tablet device
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Determine the chunk size based on device
  const chunkSize = isTablet ? (isMobile ? 1 : 2) : 3;

  return (
    <Carousel
      animation='slide'
      autoPlay={false}
      indicators={false}
      sx={{ maxWidth: '1090px' }}
      navButtonsProps={{
        style: {
            zIndex: '1',
            backgroundColor: '#0000008a'
        }
      }} 
      navButtonsWrapperProps={{
        style: {
            zIndex: 'inherit'
        }
      }} 
    >
      {groupIntoChunks(projects, chunkSize).map((group, groupIndex) => (
        <Grid container key={groupIndex} sx={{ gap: '20px', justifyContent: 'center', alignItems: 'stretch' }}>
          {group.map((project, projectIndex) => (
            <Grid item key={projectIndex} xl lg md sm xs sx={{ px: '2px', pb: '3px', cursor: 'grab' }}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Carousel>
  );
}