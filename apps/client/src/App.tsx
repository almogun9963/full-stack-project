import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import "./app.css";
import Login from "./components/login/login";
import Store from "./components/store/store";
import Product from "./components/product/product";
import Checkout from "./components/checkout/checkout";
import Cart from "./components/cart/cart";

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
