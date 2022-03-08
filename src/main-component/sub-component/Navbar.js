import React from "react";
import logo from "../../assets/logo.png";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { RiAuctionFill, RiLoginBoxFill } from "react-icons/ri";
import { ImBlogger } from "react-icons/im";
import { AiFillShopping } from "react-icons/ai";
import styled, { css } from "styled-components";
import { BsInfoCircleFill } from "react-icons/bs";
import { GoSignIn } from "react-icons/go";
import { MdContacts } from "react-icons/md";
const NBar = styled.div`
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  padding: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: sticky; /* Set the navbar to fixed position */
  margin: 0;
  top: 0;
  z-index: 99;
  .active {
    background-color: rgb(221 246 228);
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
  width: 50px;
  float: left;
  padding: 12px;
  margin: 5px;
  display: inline-block;
  color: rgb(13, 77, 41);
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  align-items: right;
  font-size: 20px;
`;
const NLink = styled(NavLink)`
  padding: 15px;
  float: right;
  margin: 2px;
  display: inline-block;
  color: rgb(13, 77, 41);
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  align-items: right;
  font-size: 20px;
  strong {
    padding: 5px;
  }
  :hover {
    background-color: rgb(221 246 228);
    color: rgb(13, 77, 41);
    border-radius: 12px;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
  ${(props) =>
    props.active &&
    css`
      background-color: rgb(221 246 228);
      border-radius: 12px;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    `}
`;

const Navbar = (prop) => {
  return (
    <>
      <NBar>
        <Link to="/">
          <Image src={logo} alt="Example2" />
        </Link>
        <NLink to="/signin">
          <strong>
            <GoSignIn />
          </strong>
          Sign In
        </NLink>
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
