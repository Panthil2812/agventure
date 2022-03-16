import React from "react";
import logo from "../../assets/Images/logo1.png";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { ImBlogger } from "react-icons/im";
import { AiFillShopping } from "react-icons/ai";
import styled from "styled-components";
import { BsInfoCircleFill, BsPersonFill } from "react-icons/bs";
import { GoSignIn } from "react-icons/go";
import { GiShop } from "react-icons/gi";

import { MdContacts } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import { getCookie } from "../Validator/CookieFunction";
const NBar = styled.div`
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  padding: 5px;
  border-bottom: 5px solid #325240;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: sticky; /* Set the navbar to fixed position */
  margin: 0;
  top: 0;
  z-index: 99;
  .active {
    background-color: #ddf6e4;
    border-radius: 12px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  @media screen and (max-width: 741px) {
    .navbar a {
      float: none;
      display: block;
      position: inherit;
    }
  }
`;
const Image = styled.img`
  width: 60px;
  float: left;
  padding: 15px;
  display: inline-block;
  color: #325240;
  text-align: center;
  align-items: right;
`;
const NLink = styled(NavLink)`
  padding: 15px;
  float: right;
  margin-right: 5px;
  margin-bottom: 5px;
  display: inline-block;
  color: #325240;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  align-items: right;
  font-size: 18px;
  strong {
    padding-right: 5px;
  }
  :hover {
    background-color: #ddf6e4;
    color: #325240;
    border-radius: 12px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
const NAvatar = styled(NavLink)`
  float: right;
  margin: 2px;
  display: inline-block;
  color: #325240;
  align-items: right;
  :hover {
    background-color: #ddf6e4;
    color: #325240;
    border-radius: 12px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const Navbar = (prop) => {
  const Loginckeck = () => {
    if (getCookie("login") !== "") {
      // console.log("user login");
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <NBar>
        <Link to="/">
          <Image src={logo} alt="Example2" />
        </Link>

        {Loginckeck() ? (
          <NAvatar to="/dashbord">
            <Avatar
              sx={{ m: 1, bgcolor: "#325240", height: "33px", width: "33px" }}
            >
              <BsPersonFill />
            </Avatar>
          </NAvatar>
        ) : (
          <NLink to="/signin">
            <strong>
              <GoSignIn />
            </strong>
            Sign In
          </NLink>
        )}

        <NLink to="/contact">
          <strong>
            <MdContacts />
          </strong>
          Contact
        </NLink>
        <NLink to="/about">
          <strong>
            <BsInfoCircleFill />
          </strong>
          About
        </NLink>
        <NLink to="/blog">
          <strong>
            <ImBlogger />
          </strong>
          Blog
        </NLink>
        <NLink to="/vendor">
          <strong>
            <GiShop />
          </strong>
          Vendor
        </NLink>
        <NLink to="/shop">
          <strong>
            <AiFillShopping />
          </strong>
          Shop
        </NLink>
        <NLink to="/auction">
          <strong>
            <RiAuctionFill />
          </strong>
          Auction
        </NLink>
        <NLink to="/">
          <strong>
            <FaHome />
          </strong>
          Home
        </NLink>
      </NBar>
      <Outlet />
    </>
  );
};

export default Navbar;
