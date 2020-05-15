import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import Jumbotron from "../components/Jumbotron";

const Home = () => (
  <Fragment>
    <Jumbotron />
    <Hero />

    <hr />
    <Content />
  </Fragment>
);

export default Home;
