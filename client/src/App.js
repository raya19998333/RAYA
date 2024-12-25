import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import Home from "./component/Home";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
// Use BrowserRouter instead of Router
import Products from "./component/Products";
import About from "./component/About";
import Footer from "./component/Footer";
import Register from "./component/Register";
import Login from "./component/Login";
import Liptint from "./component/Liptint";
import Profile from "./component/Profile";
import Order from "./component/Order";
import { useSelector } from "react-redux";
import Cart from "./component/Cart";
import SharePost from "./component/SharePost";
import Manage from "./component/Admin/Manage";
import ManageProfile from "./component/Admin/ManageProfile";
import DisplayPosts from "./component/Posts";
import AdminPostsTable from "./component/Admin/Feedbacks";
import ManageProducts from "./component/Admin/ManageProducts";
import UpdateProduct from "./component/Admin/UpdateProduct";
import AdminCartDashboard from "./component/Admin/AdminCarts";

function App() {
  const email = useSelector((state) => state.users.user.email);
  return (
    <div>
      <Router>
        <Row>
          {email ? (
            <>
              <Header />
            </>
          ) : null}
        </Row>
        <Container>
          <Routes>
            {" "}
            <Route path="/login" element={<Login />} />
            <Route path="/allcarts" element={<AdminCartDashboard />} />
            <Route path="/manage" element={<Manage />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/registerUser" element={<Register />} />
            <Route path="/Liptint" element={<Liptint />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order/:orderId" element={<Order />} />
            <Route path="/SharePost" element={<SharePost />}></Route>
            <Route path="/posts" element={<AdminPostsTable />}></Route>
            <Route path="/managep" element={<ManageProducts />}></Route>
            <Route path="/update/:prod_id" element={<UpdateProduct />}></Route>
          </Routes>
        </Container>
      </Router>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Row>
        {email ? (
          <>
            <Footer />
          </>
        ) : null}
      </Row>
    </div>
  );
}

export default App;
