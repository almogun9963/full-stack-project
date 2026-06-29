import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("components/login/login.tsx"),
  route("store", "components/store/store.tsx"),
  route("product", "components/product/product.tsx"),
  route("checkout", "components/checkout/checkout.tsx"),
  route("cart", "components/cart/cart.tsx"),
] satisfies RouteConfig;
