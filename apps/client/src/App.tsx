import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "../components/cart/cart";
import Checkout from "../components/checkout/checkout";
import Login from "../components/login/login";
import Product from "../components/product/product";
import Store from "../components/store/store";
import "./App.css";
import "./app.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
