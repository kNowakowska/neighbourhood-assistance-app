import React, { useState, useEffect } from "react";
import ScheduleSelector from "react-schedule-selector";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import usePrevious from "../hooks/usePrevious";
import { API_URL, API_KEY } from "../conf";
import axios from "axios";

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
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import withNavBar from "../hoc/WithNavBar";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import theme from "../theme";
import { updateUser, createComment, getUsers, deleteUser } from "../redux/actions/users";
import no_photo from "../assets/no-photo.png";

const Input = styled("input")({
  display: "none",
});

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
  width: "100%",
  fontStyle: "italic",
  textAlign: "center",
});

const StyledRating = styled(Rating)({
  width: 120,
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

const Profile = ({ users, getUsers, updateUser, createComment, loggedUser, deleteUser }) => {
  const { t } = useTranslation("core");
  const params = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState({ name: false, lastName: false, phoneNumber: false, city: false });
  const [addCommentMode, setAddCommentMode] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [formattedSchedule, setFormattedSchedule] = useState({});

  const prevFormattedSchedule = usePrevious(formattedSchedule);

  useEffect(() => {
    if (!users.length) {
      getUsers();
    }
  }, []);

  useEffect(() => {
    let user = null;
    if (+params.id === loggedUser.id) {
      user = { ...loggedUser };
    } else {
      user = users.find((user) => user.id === +params.id);
    }
    setUser(user);
    setName(user.name);
    setLastName(user.lastName);
    setCity(user.city);
    setPhone(user.phoneNumber);
    setPhoto(user.photoUrl);
    setComments(user.comments || []);

    const formatted = user.availability;
    parseSchedule(formatted);
  }, [params]);

  useEffect(() => {
    if (Object.keys(formattedSchedule).length && JSON.stringify(prevFormattedSchedule) !== JSON.stringify(formattedSchedule))
      updateUser({ ...user, availability: { ...formattedSchedule } });
  }, [formattedSchedule]);

  const parseSchedule = (formatted) => {
    const newSchedule = [];
    if (formatted)
      Object.entries(formatted).forEach(([weekDay, hours]) => {
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
        setSchedule(newSchedule);
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
    switch (property) {
      case "name":
        setName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "phoneNumber":
        setPhone(e.target.value);
        break;
      default:
    }
  };

  const changeMode = (parameter) => {
    if (Object.values(editMode).includes(true)) {
      switch (parameter) {
        case "name":
          updateUser({ ...user, name: name }, (responseData) => {
            setUser(responseData);
          });
          break;
        case "lastName":
          updateUser({ ...user, lastName: lastName }, (responseData) => {
            setUser(responseData);
          });
          break;
        case "city":
          updateUser({ ...user, city: city }, (responseData) => {
            setUser(responseData);
          });
          break;
        case "phoneNumber":
          updateUser({ ...user, phoneNumber: phone }, (responseData) => {
            setUser(responseData);
          });
          break;
        default:
      }
    }
    setEditMode((editMode) => ({
      ...Object.entries(Object.keys(editMode).map((key) => [key, false])),
      [parameter]: !editMode[parameter],
    }));
  };

  const saveComment = (comment) => {
    createComment({ ...comment, authorId: loggedUser.id }, user.id, (responseData) => {
      setUser({ ...responseData });
      setComments(responseData.comments);
    });
    setAddCommentMode((addCommentMode) => !addCommentMode);
  };

  const handleChangeSchedule = (dates) => {
    setSchedule(dates);
    const weekDayFormat = new Intl.DateTimeFormat("en-GB", { weekday: "short" });
    const hourFormat = new Intl.DateTimeFormat("en-GB", { hour: "numeric" });
    const formatted = {
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
      const hour = +hourFormat.format(date);
      formatted[weekDay].push(hour);
    });
    setFormattedSchedule(formatted);
  };

  const handleDeleteUser = () => {
    deleteUser(loggedUser.id, () => {
      navigate("/");
    });
  };

  const uploadPhoto = (e) => {
    console.log(e.target.files);
    if (e.target.files?.length) {
      const file = e.target.files[0];
      console.log("file");
      const formData = new FormData();
      formData.append("image", file);

      axios
        .post(API_URL, formData, {
          headers: {
            Authorization: "Client-ID " + API_KEY,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          updateUser({ ...user, photoUrl: response.data.data.link }, (responseData) => {
            setUser(responseData);
            setPhoto(responseData.photoUrl);
          });
        })
        .catch((error) => {
          setPhoto("");
        });
    }
  };

  // Jesli różnica pomiedzy obecną datą a last seen jest mniejsza niż dzień pokazuje się liczba godzin od tej daty.

  return (
    <Container component="main">
      <CssBaseline />
      <StyledContainer container>
        <Grid item xs={3}>
          {loggedUser.id === user?.id ? (
            <>
              <label htmlFor="upload-photo-input">
                <Input accept="image/jpeg,image/png" id="upload-photo-input" type="file" onChange={uploadPhoto} />
                <IconButton
                  onClick={uploadPhoto}
                  component="span"
                  sx={{
                    width: 200,
                    height: 200,
                    "&:hover": { cursor: "pointer", opacity: "0.4" },
                    "&:hover > .icon": { visibility: "visible" },
                  }}
                >
                  <FileUploadIcon
                    size="large"
                    className="icon"
                    sx={{ width: 50, height: 50, position: "absolute", left: 75, zIndex: 100, visibility: "hidden" }}
                  />
                  <StyledAvatar alt={`${name} ${lastName} avatar`} src={photo || no_photo} />
                </IconButton>
              </label>
            </>
          ) : (
            <span>
              <StyledAvatar
                alt={`${name} ${lastName} avatar`}
                src={photo || no_photo}
                sx={{ marginLeft: "auto", marginRight: "auto" }}
              />
            </span>
          )}

          <StyledItalicAuthorData variant="body2" align="center" sx={{ mt: 3 }}>
            {t("profile.registered", { date: user?.created ? new Date(user.created).toDateString() : "" })}
          </StyledItalicAuthorData>
          <StyledItalicAuthorData variant="body2" align="center" sx={{ mt: 3 }}>
            {t("profile.lastSeen", { date: user?.lastActive ? new Date(user.lastActive).toDateString() : "" })}
          </StyledItalicAuthorData>
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <StyledRating name="read-only" value={user?.averageRate || 0} readOnly precision={0.5} sx={{ mt: 3 }} />
          </Box>
          {loggedUser.id === user?.id && (
            <Button onClick={handleDeleteUser} variant="contained" color="primary" sx={{ mt: 3 }} align="center">
              {t("profile.deleteUser")}
            </Button>
          )}
        </Grid>
        <Grid item container xs={9}>
          <StyledBox>
            <StyledTextField
              value={name}
              label={t("profile.name")}
              onChange={(e) => handleChangeUser(e, "name")}
              fullWidth
              disabled={!editMode.name}
              variant="outlined"
              error={false}
            />
            {user && loggedUser.id === user?.id && (
              <StyledEditIcon onClick={() => changeMode("name")}>
                <ModeEditIcon />
              </StyledEditIcon>
            )}
          </StyledBox>
          <StyledBox>
            <StyledTextField
              value={lastName}
              label={t("profile.lastName")}
              onChange={(e) => handleChangeUser(e, "lastName")}
              fullWidth
              disabled={!editMode.lastName}
              variant="outlined"
              error={false}
            />
            {user && loggedUser.id === user?.id && (
              <StyledEditIcon onClick={() => changeMode("lastName")}>
                <ModeEditIcon />
              </StyledEditIcon>
            )}
          </StyledBox>
          <StyledBox>
            <StyledTextField
              value={phone}
              label={t("profile.phoneNumber")}
              type="tel"
              onChange={(e) => handleChangeUser(e, "phoneNumber")}
              fullWidth
              disabled={!editMode.phoneNumber}
              variant="outlined"
              error={false}
            />
            {user && loggedUser.id === user?.id && (
              <StyledEditIcon onClick={() => changeMode("phoneNumber")}>
                <ModeEditIcon />
              </StyledEditIcon>
            )}
          </StyledBox>
          <StyledBox>
            <StyledTextField
              value={city}
              label={t("profile.city")}
              type="city"
              onChange={(e) => handleChangeUser(e, "city")}
              fullWidth
              disabled={!editMode.city}
              variant="outlined"
              error={false}
            />
            {user && loggedUser.id === user?.id && (
              <StyledEditIcon onClick={() => changeMode("city")}>
                <ModeEditIcon />
              </StyledEditIcon>
            )}
          </StyledBox>

          <StyledDivider />

          <ScheduleSelector
            startDate={getPreviousMonday()}
            selection={schedule}
            numDays={7}
            minTime={7}
            maxTime={20}
            dateFormat={"ddd"}
            onChange={loggedUser.id === user?.id ? handleChangeSchedule : () => null}
            unselectedColor={theme.palette.background.paper}
            selectedColor={theme.palette.secondary.main}
            hoveredColor={loggedUser.id === user?.id ? theme.palette.secondary.main : theme.palette.background.paper}
          />
          <StyledDivider />

          <StyledCommentsSectionTitle variant="caption" align="left" sx={{ mt: 1 }}>
            {t("profile.comments")}
          </StyledCommentsSectionTitle>
          {user && loggedUser.id !== user?.id ? (
            addCommentMode ? (
              <CommentInput onSave={saveComment} />
            ) : (
              <StyledCommentsSection sx={{ mb: 2 }}>
                <Tooltip title={t("profile.addComment")} placement="right">
                  <IconButton onClick={() => setAddCommentMode(!addCommentMode)}>
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
              </StyledCommentsSection>
            )
          ) : null}
          {comments.map((comment) => (
            <Comment key={comment.id} author={users.find((user) => user.id === comment.authorId)} {...comment} />
          ))}
        </Grid>
      </StyledContainer>
    </Container>
  );
};

const mapDispatchToProps = {
  updateUser,
  createComment,
  getUsers,
  deleteUser,
};
const mapStateToProps = (state) => ({
  categories: state.categories,
  loggedUser: state.system,
  posts: state.posts,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavBar(Profile));
