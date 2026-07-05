import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import "./app.css";
import Login from "./components/login/login";
import Store from "./components/store/store";
import Product from "./components/product/product";
import Checkout from "./components/checkout/checkout";
import Cart from "./components/cart/cart";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import SignUp from "./components/signUp/signup";

const link = createHttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
