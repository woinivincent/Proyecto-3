import React from "react";
import Header from "./Components/Header/Header";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import Products from "./Pages/Products/Products"
import AboutUs from "./Pages/AboutUs/AboutUs"
import Cart from "./Pages/Cart/Cart"
import Login from "./Pages/Login/Login"
import Register from "./Pages/Register/Register"

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>  
          <Route exact path="/" Component={Home} />
          <Route  path="Contact" Component={Contact} />
          <Route  path="Products" Component={Products} />
          <Route  path="AboutUs" Component={AboutUs} />
          <Route  path="Cart" Component={Cart} />
          <Route path = "Login" Component={Login}/>
          <Route path = "Register" Component={Register}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
