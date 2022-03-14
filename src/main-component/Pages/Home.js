import React from "react";
import Slider from "../sub-component/slider";
import ImageBar from "../sub-component/ImageBar";
import Footer from "../sub-component/Footer";
import HomeContect from "../sub-component/HomeContent";
import IndiaContect from "../sub-component/IndiaContect";
import TotalCounter from "../sub-component/TotalCounter";
import { HomeCard } from "../sub-component/HomeCard";
const Home = () => {
  return (
    <>
      <Slider />
      <IndiaContect />
      <HomeCard />
      <TotalCounter />
      <HomeContect />
      <ImageBar />
      <Footer />
    </>
  );
};

export default Home;
