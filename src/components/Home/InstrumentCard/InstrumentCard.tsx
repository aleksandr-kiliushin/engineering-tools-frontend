import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';
import {Link} from "react-router-dom";


const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
  },
  media: {
    height: 220,
  },
  root: {
    width: 400,
    margin: '20px 0px 20px 20px',
  },
});



type MediaCardPropsType = {
  description: string
  imgSrc: string
  linkTo: string
  title: string
};



export default function InstrumentCard(props: MediaCardPropsType) {
  const classes = useStyles();
  return (
    <Link to={props.linkTo} className={classes.link}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.imgSrc}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}