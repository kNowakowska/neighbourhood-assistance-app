import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import PostCard from "../components/PostCard";
import withNavBar from "../hoc/WithNavBar";

const initialPosts = [
  {
    id: 1,
    title: "Układam płytki",
    created: new Date(),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 1,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 2,
    title: "Układam płytki",
    created: new Date(),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 1,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 3,
    title: "Układam płytki",
    created: new Date(),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 1,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 4,
    title: "Układam płytki",
    created: new Date(2021, 11, 5),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 2,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 5,
    title: "Układam panele",
    created: new Date(),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 2,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 6,
    title: "Układam płytki",
    created: new Date(),
    city: "Kielce",
    price: 200,
    currency: "EUR",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 2,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 7,
    title: "Układam płytki",
    created: new Date(),
    city: "Warszawa",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 1,
      phone_number: "123456123",
      photo: null,
    },
  },
];

const StyledContainer = styled(Grid)({
  marginTop: "100px",
  justifyContent: "center",
});

const StyledButton = styled(Button)({
  width: 250,
  fontSize: 20,
});

const StyledTextField = styled(TextField)({
  width: 250,
});

function Home() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [myPostsMode, setMyPostsMode] = useState(false);

  const showMyPosts = (userId) => {
    if (!myPostsMode) setPosts(initialPosts.filter((post) => post.author.id === userId));
    else setPosts(initialPosts);
    setMyPostsMode((prevState) => !prevState);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  useEffect(() => {
    setPosts(
      initialPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.city.toLowerCase().includes(search) ||
          post.created.toLowerCase().toDateString().includes(search) ||
          post.price.toString().includes(search) ||
          post.currency.toLowerCase().includes(search)
      )
    );
  }, [search]);

  return (
    <main style={{ maxWidth: "80%", marginLeft: "auto", marginRight: "auto" }}>
      <CssBaseline />
      <StyledContainer container>
        <Grid item container justifyContent="space-between" mb={4}>
          <StyledButton variant="contained" size="large" onClick={() => showMyPosts(1)} color="secondary" sx={{ ml: 3 }}>
            {myPostsMode ? "All posts" : "My posts"}
          </StyledButton>
          <StyledTextField
            label="Search"
            value={search}
            type="search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
            sx={{ mr: 3 }}
          />
        </Grid>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </StyledContainer>
    </main>
  );
}

export default withNavBar(Home);
