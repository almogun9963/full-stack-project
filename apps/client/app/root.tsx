import { isRouteErrorResponse, Outlet, useLocation } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

export default function App() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <>
      {!isHomePage && <Header />}
      <Outlet />
      {!isHomePage && <Footer />}
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
