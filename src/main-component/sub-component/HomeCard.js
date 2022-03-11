import React from "react";
import "./HomeCard.css";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import classNames from "classnames";
const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "0 auto",
  },
  card: {
    height: "379px",
    width: "300px",
    background: "grey",
    borderRadius: "10px",
    transition: "background 0.8s",
    overflow: "hidden",
    background: "black",
    boxShadow: "0 70px 63px -60px #000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  border: {
    height: "369px",
    width: "290px",
    background: "transparent",
    borderRadius: "10px",
    transition: "border 1s",
    position: "relative",
    "&:hover": {
      border: "3px solid white",
    },
  },
  card0: {
    background: `url("https://images.pexels.com/photos/5085407/pexels-photo-5085407.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
      center center no-repeat`,
    backgroundSize: "300px",
    "& h2": {
      opacity: "1",
    },
    fa: {
      opacity: "1",
    },
    "&:hover": {
      background: `url("https://images.pexels.com/photos/5085407/pexels-photo-5085407.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500")
        left center no-repeat`,
      backgroundSize: "600px",
    },
  },
  card1: {
    background: `url("https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg")
      center center no-repeat`,
    backgroundSize: "300px",
    "&:hover": {
      background: `url("https://i.pinimg.com/originals/ee/85/08/ee850842e68cfcf6e3943c048f45c6d1.jpg")
        left center no-repeat`,
      backgroundSize: "600px",
    },
  },
  card2: {
    background: `url("https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg")
      center center no-repeat`,
    backgroundSize: "300px",
    "&:hover": {
      background: `url("https://i.pinimg.com/originals/28/d2/e6/28d2e684e7859a0dd17fbd0cea00f8a9.jpg")
        left center no-repeat`,
      backgroundSize: "600px",
    },
  },
  "& h2": {
    fontFamily: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
    color: "white",
    margin: "20px",
    opacity: "0",
    transition: "opacity 1s",
  },
}));
export const HomeCard = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <div className={classNames(classes.card, classes.card0)}>
          <div className={classes.border}>
            <h2 className={classes.h}>Al Pacino</h2>
          </div>
        </div>

        <div className="card card1">
          <div className="border">
            <h2>Ben Stiller</h2>
          </div>
        </div>
        <div className="card card2">
          <div className="border">
            <h2>Patrick Stewart</h2>
          </div>
        </div>
      </div>
    </>
  );
};
