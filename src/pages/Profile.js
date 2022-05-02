import React, { useState, useEffect } from "react";
import ScheduleSelector from "react-schedule-selector";

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
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

import withNavBar from "../hoc/WithNavBar";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import theme from "../theme";

const initialUser = {
  name: "Jane",
  last_name: "Smith",
  photo: null,
  created: new Date(),
  phone_number: "511234098",
  last_active: new Date(),
  avg_rate: 3.6,
  availability: {
    Mon: ["07", "08", "09", "10"],
    Tue: ["12", "14", "13"],
    Wed: [],
    Thu: ["07", "08"],
    Fri: ["11", "12", "13", "14"],
    Sat: [],
    Sun: [],
  },
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
};

const StyledContainer = styled(Grid)({
  marginTop: "100px",
});

const StyledTextField = styled(TextField)({
  marginTop: 15,
  marginBottom: 15,
});

const StyledEditIcon = styled(IconButton)({
  color: "action.active",
  marginLeft: 8,
  marginRight: 8,
});

const StyledAvatar = styled(Avatar)({
  width: 200,
  height: 200,
});

const StyledItalicAuthorData = styled(Typography)({
  width: "75%",
  fontStyle: "italic",
});

const StyledRating = styled(Rating)({
  width: "75%",
});

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "50%",
});

const StyledDivider = styled(Divider)({
  width: "100%",
  marginTop: 30,
  marginBottom: 30,
});

const StyledCommentsSectionTitle = styled(Typography)({
  fontSize: 16,

  textTransform: "uppercase",
});

const StyledCommentsSection = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

const Profile = () => {
  const [editMode, setEditMode] = useState({ name: false, lastName: false, phoneNumber: false, city: false });
  const [addCommentMode, setAddCommentMode] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const formattedSchedule = user.availability;
    parseSchedule(formattedSchedule);
  }, [user]);

  const parseSchedule = (formattedSchedule) => {
    const newSchedule = [];
    Object.entries(formattedSchedule).forEach(([weekDay, hours]) => {
      switch (weekDay) {
        case "Mon":
          addDateWithHours(newSchedule, hours);
          break;
        case "Tue":
          addDateWithHours(newSchedule, hours, 1);
          break;
        case "Wed":
          addDateWithHours(newSchedule, hours, 2);
          break;
        case "Thu":
          addDateWithHours(newSchedule, hours, 3);
          break;
        case "Fri":
          addDateWithHours(newSchedule, hours, 4);
          break;
        case "Sat":
          addDateWithHours(newSchedule, hours, 5);
          break;
        case "Sun":
          addDateWithHours(newSchedule, hours, 6);
          break;
        default:
          break;
      }
      setSchedule(newSchedule)
    });
  };

  const addDateWithHours = (newSchedule, hours, distanceFromMonday = 0) => {
    const monday = new Date(getPreviousMonday().setHours(0, 0, 0));
    let day = new Date(monday);
    day = new Date(day.setDate(day.getDate() + distanceFromMonday));
    hours.forEach((hour) => newSchedule.push(new Date(day.setHours(hour))));
  };

  const getPreviousMonday = (date = new Date()) => {
    const previousMonday = new Date();
    previousMonday.setDate(date.getDate() - ((date.getDay() + 6) % 7));
    return previousMonday;
  };

  const handleChangeUser = (e, property) => {
    setUser((user) => ({ ...user, [property]: e.target.value }));
  };

  const changeMode = (parameter) => {
    setEditMode((editMode) => ({
      ...Object.entries(Object.keys(editMode).map((key) => [key, false])),
      [parameter]: !editMode[parameter],
    }));
  };

  const saveComment = (comment) => {
    setAddCommentMode((addCommentMode) => !addCommentMode);
  };

  const handleChangeSchedule = (dates) => {
    setSchedule(dates);
    const weekDayFormat = new Intl.DateTimeFormat("en-GB", { weekday: "short" });
    const hourFormat = new Intl.DateTimeFormat("en-GB", { hour: "numeric" });
    const formattedSchedule = {
      Mon: [],
      Tue: [],
      Wed: [],
      Thu: [],
      Fri: [],
      Sat: [],
      Sun: [],
    };
    dates.forEach((date) => {
      const weekDay = weekDayFormat.format(date);
      const hour = hourFormat.format(date);
      formattedSchedule[weekDay].push(hour);
    });
  };

  // Jesli różnica pomiedzy obecną datą a last seen jest mniejsza niż dzień pokazuje się liczba godzin od tej daty.

  return (
    <Container component="main">
      <CssBaseline />
      <StyledContainer container>
        <Grid item xs={3}>
          <StyledAvatar alt={`${user.name} ${user.last_name} avatar`} src={user.photo} />
          <StyledItalicAuthorData
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >{`Registered ${user.created.toDateString()}`}</StyledItalicAuthorData>
          <StyledItalicAuthorData
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >{`Last seen ${user.last_active.toDateString()}`}</StyledItalicAuthorData>
          <StyledRating name="read-only" value={user.avg_rate} readOnly precision={0.5} sx={{ mt: 3, ml: 4 }} />
        </Grid>
        <Grid item container xs={9}>
          <StyledBox>
            <StyledTextField
              value={user.name}
              label="Name"
              onChange={(e) => handleChangeUser(e, "name")}
              fullWidth
              disabled={!editMode.name}
              variant="outlined"
              error={false}
            />
            <StyledEditIcon onClick={() => changeMode("name")}>
              <ModeEditIcon />
            </StyledEditIcon>
          </StyledBox>
          <StyledBox>
            <StyledTextField
              value={user.last_name}
              label="Last Name"
              onChange={(e) => handleChangeUser(e, "lastName")}
              fullWidth
              disabled={!editMode.lastName}
              variant="outlined"
              error={false}
            />
            <StyledEditIcon onClick={() => changeMode("lastName")}>
              <ModeEditIcon />
            </StyledEditIcon>
          </StyledBox>
          <StyledBox>
            <StyledTextField
              value={user.phone_number}
              label="Phone number"
              type="tel"
              onChange={(e) => handleChangeUser(e, "phoneNumber")}
              fullWidth
              disabled={!editMode.phoneNumber}
              variant="outlined"
              error={false}
            />
            <StyledEditIcon onClick={() => changeMode("phoneNumber")}>
              <ModeEditIcon />
            </StyledEditIcon>
          </StyledBox>
          <StyledBox>
            <StyledTextField
              value={user.city}
              label="City"
              type="city"
              onChange={(e) => handleChangeUser(e, "city")}
              fullWidth
              disabled={!editMode.city}
              variant="outlined"
              error={false}
            />
            <StyledEditIcon onClick={() => changeMode("city")}>
              <ModeEditIcon />
            </StyledEditIcon>
          </StyledBox>

          <StyledDivider />

          <ScheduleSelector
            selection={schedule}
            numDays={7}
            minTime={7}
            maxTime={20}
            dateFormat={"ddd"}
            onChange={handleChangeSchedule}
            unselectedColor={theme.palette.background.paper}
            selectedColor={theme.palette.secondary.main}
            hoveredColor={theme.palette.primary.main}
          />

          <StyledDivider />

          <StyledCommentsSectionTitle variant="caption" align="left" sx={{ mt: 1 }}>
            comments
          </StyledCommentsSectionTitle>
          {addCommentMode ? (
            <CommentInput onSave={saveComment} />
          ) : (
            <StyledCommentsSection sx={{ mb: 2 }}>
              <Tooltip title="Add comment" placement="right">
                <IconButton onClick={() => setAddCommentMode(!addCommentMode)}>
                  <AddCircleIcon />
                </IconButton>
              </Tooltip>
            </StyledCommentsSection>
          )}
          {user.comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </Grid>
      </StyledContainer>
    </Container>
  );
};

export default withNavBar(Profile);
