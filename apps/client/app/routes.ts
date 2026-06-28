import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("store", "routes/store.tsx"),
  route("product", "routes/product.tsx"),
  route("checkout", "routes/checkout.tsx"),
  route("cart", "routes/cart.tsx"),
] satisfies RouteConfig;
