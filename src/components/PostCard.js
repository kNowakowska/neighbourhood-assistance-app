import React from "react";
import Card from "@mui/material/Card";
import { Typography, Grid, CardContent, CardMedia } from "@mui/material";
import {useNavigate } from "react-router-dom"
import no_photo from "../assets/no-photo.png";
import {theme } from "../theme"

const PostCard = ({ title, date, city, price, currency, photo, id }) => {
    const navigate = useNavigate();

    const selectPost = () => {
        navigate(`/posts/${id}`)
    }
  return (
    //   , 
    <Card sx={{ width: 275,display: "inline-block", m: 2}} onClick={selectPost}>
      <CardMedia component="img" height="140" image={no_photo} alt="post-photo" />
      
      <CardContent sx={{backgroundColor: theme => theme.palette.background.paper}}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Grid container>
        <Typography variant="body2" sx={{ width: "50%" }}>{`${date.toDateString()}, ${city}`}</Typography>
        <Typography variant="body2" sx={{ width: "50%" }}>{`${price} ${currency}`}</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostCard;
