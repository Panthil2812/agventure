import * as React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import organic1 from "../../assets/Images/organic-01.png";
import organic2 from "../../assets/Images/organic-02.png";
import organic3 from "../../assets/Images/organic-03.png";
import organic4 from "../../assets/Images/organic-04.png";
import organic5 from "../../assets/Images/organic-05.png";
import organic6 from "../../assets/Images/organic-06.png";
import organic7 from "../../assets/Images/organic-07.png";
const Img = styled.img`
  width: 140px;
  height: 90px;
  margin: 5px;
  backgourndcolor: red;
  display: inline;
`;

export const TotalCounter = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#0d4d29",
          height: "100px",
          padding: "50px 70px 40px 70px",
          textAlign: "center",
        }}
      >
        <Img src={organic4} alt="organic4" />
        <Img src={organic5} alt="organic5" />
        <Img src={organic6} alt="organic6" />
        <Img src={organic7} alt="organic7" />
      </Box>
    </>
  );
};

// import React from "react";
// import Image from "react-bootstrap/Image";
// import pexelsphoto2 from "../../assets/Images/success.png";
// import { BsCart4 } from "react-icons/bs";
// import { BiDollarCircle } from "react-icons/bi";
// import { makeStyles } from "@mui/styles";
// import { RiProductHuntLine, RiAccountPinBoxLine } from "react-icons/ri";

// export const TotalCounter = () => {
//   const classes = useStyles();

//   return (
//     <>
//       <div>
//         <Image
//           src={pexelsphoto2}
//           style={{
//             opacity: "0.9",
//             backgroundSize: "cover",
//             height: "40vh",
//             width: "100%",
//             backgroundpPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//           }}
//         />
//         <div className={classes.aSide}>
//           <h4>Nature</h4>
//           <p>What a beautiful sunrise</p>
//         </div>
//       </div>
//     </>
//   );
// };
// // import React, { Component } from 'react';

// // export default class Crd extends Component {
// //     render() {
// //    return
// //     }
// // }
