import Home from "./main-component/Pages/Home";
import Auction from "./main-component/Pages/Auction";
import Contact from "./main-component/Pages/Contact";
import About from "./main-component/Pages/About";
import Shop from "./main-component/Pages/Shop";
import Signin from "./main-component/Pages/Signin";
import Blog from "./main-component/Pages/Blog";
import Signup from "./main-component/Pages/Signup";
import Selectcity from "./main-component/Pages/Selectcity";
import ErrorPage from "./main-component/Pages/Errorpage";
import Navbar from "./main-component/sub-component/Navbar";
import Vendor from "./main-component/Pages/Vendor";
import ProductPage from "./main-component/Pages/ProductPage";
import SuccessPage from "./main-component/Pages/SuccessOrder";
import WishList from "./main-component/Pages/Wishlist";
import Cart from "./main-component/Pages/Cart";
import VendorPage from "./main-component/Pages/VendorPage";
import CheckOut from "./main-component/Pages/CheckOut";
import VendorDashboard from "./main-component/Dashboard/Vendor";
import CustomerDashboard from "./main-component/Dashboard/Customer";
import AdminDashboard from "./main-component/Dashboard/Admin";
// import Dashboard from "./main-component/Pages/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Copyright from "./main-component/sub-component/Copyright";
import { getCookie } from "./main-component/Validator/CookieFunction";
import CustomerOrderDetaillPage from "./main-component/Dashboard/CustomerDashboard/CustomerOrderDetaillPage";
import AuctionPage from "./main-component/Pages/AuctionPage";
const Router = () => {
  const user = getCookie("account") && "ibid";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/selectcity" element={<Selectcity />} />
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/auction" element={<Auction />} />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/ibid/cart" element={<Cart />} />
            <Route path="/ibid/wishlist" element={<WishList />} />
            <Route path="/ibid/checkout" element={<CheckOut />} />
            <Route path="/ibid/products/:id" element={<ProductPage />} />
            <Route path="/ibid/auction/:id" element={<AuctionPage />} />
            <Route path="/ibid/vendor/:id" element={<VendorPage />} />
            <Route path="/ibid/shop/checkout/:id" element={<SuccessPage />} />
            <Route
              path="/ibid/customer/order/:id"
              element={<CustomerOrderDetaillPage />}
            />
            <Route
              path="/dashboard/VendorDashboard/:vid"
              element={<VendorDashboard />}
            />
            <Route
              path="/dashboard/CustomerDashboard/:cid"
              element={<CustomerDashboard />}
            />
            <Route
              path="/dashboard/AdminDashboard/:aid"
              element={<AdminDashboard />}
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
