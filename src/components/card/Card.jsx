import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Sortinggif from '../../assets/sorting.gif';
import Sortingimg from '../../assets/sorting.png';
import Pathinggif from '../../assets/pathing.gif';
import Pathingimg from '../../assets/pathing.jpg';
import Schedulinggif from '../../assets/cpu.gif';
import Schedulingimg from '../../assets/cpu.png';
import { useState } from 'react';

import './Card.css'

export default function ImgCard({title, description, image, linkTo, sorting, path, scheduling}) {



    const [hover, setHover] = useState(false);
    

    const imgSrc = sorting ? Sortingimg : path? Pathingimg : scheduling? Schedulingimg : null;
    const imgSrcHover = sorting ? Sortinggif : path? Pathinggif : scheduling? Schedulinggif : null;

    const handleHover = () => {
        setHover(!hover);
    }
    
  return (
    <Card sx={{ maxWidth: 345 }}
    className='cardBox'
    >
      <CardMedia
        className={`static ${hover}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        component="img"
        alt="Sorting Visualizer"
        height="160"
        image={hover ? imgSrcHover : imgSrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color='whitesmoke'>
        {title}
        </Typography>
        <Typography variant="body2" color="whitesmoke">
            {description}
        </Typography>
      </CardContent>
        <Button href={linkTo} className='button-nav' size="small">Visualize Here</Button>
    </Card>
  );
}