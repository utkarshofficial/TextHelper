import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({imgSrc,title, para}) {
  return (
    <Card sx={{ maxWidth: 1100 }}>
      <CardMedia
        component="img"
        height="140"
        image={imgSrc}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {para}
        </Typography>
      </CardContent>
    </Card>
  );
}
