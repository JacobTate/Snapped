import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import Jumbotron from "../components/Jumbotron";
import { render } from "react-dom";
import Carousel from "../components/Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => (
  <Fragment>
    <Jumbotron />
    <Hero />

    <hr />

     <Carousel />


  </Fragment>
);

export default Home;
