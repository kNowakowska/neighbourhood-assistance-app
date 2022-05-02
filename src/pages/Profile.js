import React, { useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Tooltip from "@mui/material/Tooltip";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import withNavBar from "../hoc/WithNavBar"

import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import { styled } from "@mui/material/styles";

import logo_small from "../assets/logo_small.png";

// const StyledTypography = styled(Typography)(({ theme }) => ({
//     textAlign: "center",
//         fontWeight: "bold",
//         letterSpacing: 1,
//         marginBottom: 30
//   }));

const StyledCardContent = styled(CardContent)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "30px 50px",
  textAlign: "center",
});

const StyledTextField = styled(TextField)({
  marginTop: 15,
  marginBottom: 15,
});

const StyledButton = styled(Button)({
  margin: 10,
  float: "right",
});

const StyledEditIcon = styled(IconButton)({
  color: "action.active",
  marginLeft: 8,
  marginRight: 8,
});

const Profile = () => {
  const [editMode, setEditMode] = useState({ name: false, lastName: false, phoneNumber: false });
  const [addCommentMode, setAddCommentMode] = useState(false);
  const [user, setUser] = useState({
    name: "Jane",
    last_name: "Smith",
    photo: null,
    created: new Date(),
    phone_number: "511234098",
    last_active: new Date(),
    avg_rate: 3.6,
    comments: [
      {
        comment:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
        created: new Date(),
        author: {
          name: "John",
          last_name: "Smith",
        },
        rate: 3.5,
        id: 1,
      },
      {
        comment:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
        created: new Date(),
        author: {
          name: "Harry",
          last_name: "Potter",
        },
        rate: 5.0,
        id: 2,
      },
      
    ],
  });

  const handleChangeName = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const handleChangeLastName = () => {};

  const handleChangePhoneNumber = () => {};

  const changeMode = (parameter) => {
    setEditMode({ ...editMode, [parameter]: !editMode[parameter] });
  };

  const saveComment = (comment) => {
    setAddCommentMode(!addCommentMode);
  };

  // Jesli różnica pomiedzy obecną datą a last seen jest mniejsza niż dzień pokazuje się liczba godzin od tej daty.

  return (
    <Container component="main">
      <CssBaseline />
      <Grid container sx={{ marginTop: "100px" }}>
        <Grid item xs={3}>
          <Avatar alt={`${user.name} ${user.last_name} avatar`} src={user.photo} sx={{ width: 200, height: 200 }} />
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", mt: 3, width: "75%" }}
            align="center"
          >{`Registered ${user.created.toDateString()}`}</Typography>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", mt: 1, width: "75%" }}
            align="center"
          >{`Last seen ${user.last_active.toDateString()}`}</Typography>
          <Rating name="read-only" value={user.avg_rate} readOnly precision={0.5} sx={{mt:3, ml:4}}/>
        </Grid>
        <Grid item container xs={9}>
          <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
            <StyledTextField
              value={user.name}
              label="Name"
              onChange={handleChangeName}
              fullWidth
              disabled={!editMode.name}
              variant="outlined"
              error={false}
            />
            <StyledEditIcon onClick={() => changeMode("name")}>
              <ModeEditIcon />
            </StyledEditIcon>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", width: "50%" }}>
            <StyledTextField
              value={user.last_name}
              label="Last Name"
              onChange={handleChangeLastName}
              fullWidth
              disabled={!editMode.lastName}
              variant="outlined"
              error={false}
            />
            <StyledEditIcon onClick={() => changeMode("lastName")}>
              
              <ModeEditIcon />
            </StyledEditIcon>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", width: "100%", mb: 3 }}>
            <StyledTextField
              value={user.phone_number}
              label="Phone number"
              type="tel"
              onChange={handleChangePhoneNumber}
              fullWidth
              disabled={!editMode.phoneNumber}
              variant="outlined"
              error={false}
            />
            <StyledEditIcon onClick={() => changeMode("phoneNumber")}>
              <ModeEditIcon />
            </StyledEditIcon>
          </Box>
          <Divider sx={{width:'95%'}} />

          <Typography variant="caption" sx={{fontSize: 16, mt: 1}} align="left">COMMENTS</Typography>
          {addCommentMode ? (
            <CommentInput onSave={saveComment} />
          ) : (
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: 2 }}>
              <Tooltip title="Add comment" placement="right">
                <IconButton onClick={() => setAddCommentMode(!addCommentMode)}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          {user.comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default withNavBar(Profile);
