import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    categories: [3],
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
    categories: [1, 2, 3],
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
    categories: [2],
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
    categories: [1],
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
    price: 200,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    categories: [3],
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
    city: "Warszawa",
    price: 200,
    currency: "EUR",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    categories: [2, 3],
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
    categories: [1, 2],
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
  const { t } = useTranslation("core");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [myPostsMode, setMyPostsMode] = useState(false);
  const userId = 1;

  let params = useParams();

  useEffect(() => {
    let defaultPosts = [...initialPosts];

    if (myPostsMode) defaultPosts = defaultPosts.filter((post) => post.author.id === userId);

    if (params?.category) {
      setPosts(defaultPosts.filter((post) => post.categories.includes(+params.category)));
    } else {
      setPosts(defaultPosts);
    }
    setSearch("");
  }, [params]);

  const showMyPosts = () => {
    let defaultPosts = [...initialPosts];
    if (params?.category) defaultPosts = defaultPosts.filter((post) => post.categories.includes(+params.category));

    if (!myPostsMode) setPosts(defaultPosts.filter((post) => post.author.id === userId));
    else setPosts(defaultPosts);
    setMyPostsMode((prevState) => !prevState);
    setSearch("");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  useEffect(() => {
    let defaultPosts = [...initialPosts];
    if (myPostsMode) defaultPosts = defaultPosts.filter((post) => post.author.id === userId);
    if (params?.category) defaultPosts = defaultPosts.filter((post) => post.categories.includes(+params.category));

    setPosts(
      defaultPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.city.toLowerCase().includes(search) ||
          post.created.toDateString().toLowerCase().includes(search) ||
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
          <StyledButton variant="contained" size="large" onClick={showMyPosts} color="secondary" sx={{ ml: 3 }}>
            {myPostsMode ? t("home.allPosts") : t("home.myPosts")}
          </StyledButton>
          <StyledTextField
            label={t("home.search")}
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
