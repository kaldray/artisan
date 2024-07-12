import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Navbar } from "../components/Navbar";
import { Container } from "@mui/material";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <TanStackRouterDevtools />
    </>
  ),
});
