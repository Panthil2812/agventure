import Home from "./main-component/Pages/Home";
import Auction from "./main-component/Pages/Auction";
import Contact from "./main-component/Pages/Contact";
import About from "./main-component/Pages/About";
import Shop from "./main-component/Pages/Shop";
import Signin from "./main-component/Pages/Signin";
import Blog from "./main-component/Pages/Blog";
import Signup from "./main-component/Pages/Signup";
import Navbar from "./main-component/sub-component/Navbar";
import Vendor from "./main-component/Pages/Vendor";

import Dashboard from "./main-component/Pages/Dashbord";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/dashbord" element={<Dashboard />} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
