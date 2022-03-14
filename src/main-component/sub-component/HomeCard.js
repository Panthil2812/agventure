import React from "react";

import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import organic1 from "../../assets/Images/coffees.png";
import organic2 from "../../assets/Images/rice.png";
import organic3 from "../../assets/Images/tomatoes.png";
import organic4 from "../../assets/Images/cotton.png";
import organic5 from "../../assets/Images/apples.png";
import organic6 from "../../assets/Images/mangoes.png";
import organic7 from "../../assets/Images/chili.png";
import organic8 from "../../assets/Images/potatoes.png";
const useStyles = makeStyles(() => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "50px",
    alignItems: "center",
    margin: "0 auto",
  },
  card: {
    height: "320px",
    width: "250px",
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
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "300px",
    "&:hover": {
      backgroundSize: "600px",
      backgroundPosition: "left center",
    },
    "& h2": {
      opacity: "1",
    },
  },
  border: {
    height: "300px",
    width: "230px",
    background: "transparent",
    borderRadius: "10px",
    transition: "border 1s",
    position: "relative",
    "&:hover": {
      border: "3px solid white",
    },
  },
  title: {
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
      <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
        <Typography
          variant="body2"
          color="#325240"
          sx={{
            fontWeight: "bold",
            fontSize: "110px",
            color: "#f9f9f9",
            textShadow: `-2px 2px 0 #000,
                          2px 2px 0 #000,
                         2px -2px 0 #000,
                        -2px -2px 0 #000`,
          }}
          align="center"
        >
          Best Selling Products
        </Typography>
      </Box>
      <Box
        sx={{ flexGrow: 1, bgcolor: "#f9f9f9", padding: "50px 70px 40px 70px" }}
      >
        <div className={classes.container}>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${organic1})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Coffee Beans</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${organic2})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Rice</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${organic3})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Tomatoes</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${organic4})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Cotton</h2>
            </div>
          </div>
        </div>
        <div className={classes.container}>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${organic5})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Apples</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${organic6})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Mangoes</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${organic7})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Red Chili</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${organic8})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Potatoes</h2>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
