import React from "react";
import organic from "../../assets/Images/about.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import team from "../../assets/Images/team3.png";
import team1 from "../../assets/Images/team1.png";
import team2 from "../../assets/Images/team2.png";
import team3 from "../../assets/Images/team3.png";
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
    height: "300px",
    width: "300px",
    marginLeft: "10px",
    marginRight: "10px",
    background: "grey",
    borderRadius: "20%",
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
      backgroundSize: "400px",
      backgroundPosition: "left center",
    },
    "& h2": {
      opacity: "1",
    },
  },
  border: {
    height: "280px",
    width: "230px",
    background: "transparent",
    borderRadius: "20%",
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
const Aboutcontent = () => {
  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          bgcolor: "#fff",
          height: "100vh",
          padding: "50px",
          backgroundImage: `url(${organic}) `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#f9f9f9",
            height: "70%",
            width: "35%",
            position: "absolute",
            float: "right",
            top: "35%",
            right: "15%",
            boxShadow: " 0 4px 8px 0 rgba(0, 0, 0, 0.4)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              color: "#325240",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <h1>ABOUT US</h1>
            <br />

            <div style={{}}>
              Podcasting operational change management inside of workflows to
              establish a framework. Taking seamless key performance indicators
              offline. Quickly maximize timely deliverables for real-time
              schemas.
            </div>

            <div style={{ marginTop: "15px" }}>
              Dynamically procrastinate B2C users after installed base benefits.
              Dramatically visualize customer directed the start-up mentality to
              derive convergence.
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2, bgcolor: "#325240", margin: "20px" }}
            >
              Read More
            </Button>
          </div>
        </Box>
      </Box>
      <Box sx={{ p: 2, bgcolor: "#f9f9f9" }}>
        <Typography
          variant="body2"
          color="#325240"
          sx={{
            fontWeight: "bold",
            fontSize: "50px",
            color: "#f9f9f9",
            textShadow: `-2px 2px 0 #000,
                          2px 2px 0 #000,
                         2px -2px 0 #000,
                        -2px -2px 0 #000`,
          }}
          align="center"
        >
          OUR TEAM
        </Typography>
        <hr
          style={{
            height: "5px",
            borderWidth: "0",
            backgroundColor: "#325240",
          }}
        />
      </Box>
      <Box
        sx={{ flexGrow: 1, bgcolor: "#f9f9f9", padding: "50px 70px 40px 70px" }}
      >
        <div className={classes.container}>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${team})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Name</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${team1})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Name</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${team2})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Name</h2>
            </div>
          </div>
          <div
            className={classes.card}
            style={{
              backgroundImage: `url(${team3})`,
            }}
          >
            <div className={classes.border}>
              <h2 className={classes.title}>Name</h2>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};
export default Aboutcontent;
