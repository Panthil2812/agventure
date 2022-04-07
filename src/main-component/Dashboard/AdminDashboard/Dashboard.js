import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { BsFillCartFill, BsPlus, BsFillBagFill } from "react-icons/bs";
import Button from "@mui/material/Button";
import { Chart } from "react-google-charts";
import Grid from "@mui/material/Grid";
const Dashboard = () => {
  const getLastWeeksDate = () => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7);
  };
  const startDate = getLastWeeksDate();
  const incrementDate = (increment) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let increasedDate = new Date(startDate.getTime() + increment * 86400000);
    return increasedDate.getDate() + " " + month[increasedDate.getMonth()];
  };
  const data1 = [
    ["Total User", "User Records"],
    ["Customer", parseInt(Math.random() * 100)],
    ["Vendor", parseInt(Math.random() * 100)],
    ["Admin", parseInt(Math.random() * 50)],
  ];
  const data2 = [
    ["date", "sales per day"],
    [incrementDate(1), 15000],
    [incrementDate(2), 83580],
    [incrementDate(3), 43640],
    [incrementDate(4), 62450],
    [incrementDate(5), 32340],
    [incrementDate(6), 65470],
    [incrementDate(7), 18436],
  ];

  const option1 = {
    title: "My User Activities",
    is3D: true,
    backgroundColor: "#f9f9f9",
  };
  const option2 = {
    title: "My Daily Sell Activities",
    is3D: true,
    backgroundColor: "#f9f9f9",
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "50%",
            height: "50%",
            border: "2px solid #325240",
            m: 2,
          }}
        >
          <Box
            sx={{ display: "flex", bgcolor: "#325240", color: "#f0f0f0", p: 2 }}
          >
            <BsFillCartFill size={20} />
            <Typography
              varient="h2"
              sx={{
                ml: "20px",
                textAlign: "center",
              }}
            >
              TOTAL PRODUCTS
            </Typography>
          </Box>
          <Box sx={{}}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                pr: 3,
                pl: 3,
                borderBottom: "2px solid #325240",
              }}
            >
              <Typography>Total</Typography>
              <Typography>348</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                pr: 3,
                pl: 3,
                borderBottom: "2px solid #325240",
              }}
            >
              <Typography>Live</Typography>
              <Typography>348</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                pr: 3,
                pl: 3,
                borderBottom: "2px solid #325240",
              }}
            >
              <Typography>Stock</Typography>
              <Typography>320</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
                pr: 3,
                pl: 3,
              }}
            >
              <Typography>Out Of Stock</Typography>
              <Typography>18</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            border: "2px solid #325240",
            m: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              bgcolor: "#325240",
              color: "#f0f0f0",
              p: 2,
            }}
          >
            <BsFillCartFill size={20} />
            <Typography
              varient="h2"
              sx={{
                ml: "20px",
                textAlign: "center",
              }}
            >
              TOTAL Users
            </Typography>
          </Box>

          <Chart
            chartType="PieChart"
            data={data1}
            options={option1}
            width="500px"
            height="400px"
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            border: "2px solid #325240",
            m: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              bgcolor: "#325240",
              color: "#f0f0f0",
              p: 2,
            }}
          >
            <BsFillBagFill size={20} />
            <Typography
              varient="h2"
              sx={{
                ml: "20px",
                textAlign: "center",
              }}
            >
              SALES THIS LAST WEEK
            </Typography>
          </Box>
          <Chart
            chartType="LineChart"
            data={data2}
            options={option2}
            width="500px"
            height="400px"
          />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
