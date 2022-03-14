import React, { Component } from "react";
import photo from "../../assets/Images/india1.png";
import { BsCart4, BsPersonBoundingBox, BsPersonFill } from "react-icons/bs";
import { ImHammer2 } from "react-icons/im";
import { MdOutlineAccountBox } from "react-icons/md";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
const styles = {
  paperContainer: {
    background: `url(https://images.pexels.com/photos/4069291/pexels-photo-4069291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)  no-repeat`,
    backgroundSize: "100%",
    opacity: "0.9",
    height: "250px",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: " 0 -5px",
  },
  title: {
    fontSize: "25px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  border: {
    height: "2px",
    borderWidth: "0",
    backgroundColor: "#fff",
  },
};
export default class Crd extends Component {
  render() {
    return (
      <>
        <div>
          <Box style={styles.paperContainer}>
            <Grid
              sx={{ flexGrow: 1, justifyContent: "center" }}
              container
              spacing={2}
            >
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={5}>
                  <Grid
                    item
                    sx={{
                      height: 200,
                      width: 250,
                      color: "#fff",
                    }}
                  >
                    <div>
                      <div style={styles.subContainer}>
                        <ImHammer2 size={60} />
                        <h1 style={{ padding: "15px" }}>345</h1>
                      </div>
                      <hr style={styles.border} />

                      <a style={styles.title}>Auction</a>
                    </div>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      height: 200,
                      width: 250,
                      color: "#fff",
                    }}
                  >
                    <div>
                      <div style={styles.subContainer}>
                        <MdOutlineAccountBox size={60} />
                        <h1 style={{ padding: "15px" }}>1250</h1>
                      </div>
                      <hr style={styles.border} />

                      <a style={styles.title}>Seller Acounts</a>
                    </div>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      height: 200,
                      width: 250,
                      color: "#fff",
                    }}
                  >
                    <div>
                      <div style={styles.subContainer}>
                        <BsCart4 size={60} />
                        <h1 style={{ padding: "15px" }}>1659</h1>
                      </div>
                      <hr style={styles.border} />

                      <a style={styles.title}>Products</a>
                    </div>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      height: 200,
                      width: 250,
                      color: "#fff",
                    }}
                  >
                    <div>
                      <div style={styles.subContainer}>
                        <BsPersonFill size={60} />
                        <h1 style={{ padding: "15px" }}>538</h1>
                      </div>
                      <hr style={styles.border} />

                      <a style={styles.title}>Vendor Acounts</a>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </div>
      </>
    );
  }
}
