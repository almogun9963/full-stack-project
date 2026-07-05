import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import "./app.css";
import Login from "./components/login/login";
import Store from "./components/store/store";
import Checkout from "./components/checkout/checkout";
import Cart from "./components/cart/cart";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { Cookies } from "react-cookie";
import Product from "./components/product/product";

const link = createHttpLink({
  uri: "http://localhost:3000/graphql",
  credentials: "include",
});

const authLink = new SetContextLink(({ headers }) => {
  const cookies = new Cookies();
  const token = cookies.get("accessToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
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
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
